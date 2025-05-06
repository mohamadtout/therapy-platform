"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { contentService, ContentItem } from "@/lib/api/api-services"

export default function AdminBlogsPage() {
  const { toast } = useToast()
  const [blogPosts, setBlogPosts] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true)

        const filters = {
          search: searchTerm || null,
          status: statusFilter !== "all" ? statusFilter : null,
          category: categoryFilter !== "all" ? categoryFilter : null,
          page: currentPage,
          limit: itemsPerPage,
        }

        const response = await contentService.getAllContent("blog", filters)
        if (response.data) {
          setBlogPosts(response.data.items || [])
          setTotalItems(response.data.total || 0)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        toast({
          title: "Error",
          description: "Failed to load blogs. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [searchTerm, statusFilter, categoryFilter, currentPage, itemsPerPage, toast])

  const handleDeleteBlog = async (id: number) => {
    try {
      setIsDeleting(true)
      await contentService.deleteContent(id)

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })

      // Refresh the blog list
      setBlogPosts(blogPosts.filter((blog) => blog.id !== id))
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-gray-500">Manage your blog content</p>
        </div>

        <Link href="/admin/blogs/create">
          <Button className="bg-onesti-purple hover:bg-onesti-purple/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Post
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogPosts.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={blog.featured_image || "/placeholder.svg"}
                          alt={blog.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{blog.author_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{blog.category_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        blog.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.created_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                        target="_blank"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/blogs/edit/${blog.slug}`}
                        className="text-amber-600 hover:text-amber-900 p-1 rounded-full hover:bg-amber-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
