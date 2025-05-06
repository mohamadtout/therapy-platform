"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Search, User, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { contentService, type ContentItem, type ContentTag } from "@/lib/api/api-services"
import { Skeleton } from "@/components/ui/skeleton"


interface TocElement {
  id: string
  level: number
  text: string
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = use(params);
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [post, setPost] = useState<ContentItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true)
        const response = await contentService.getContentBySlug(slug)

        // The response structure might be different with the new API
        // Adjust accordingly based on your actual API response
        setPost(response.data.content)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching blog post:", err)
        setError("Failed to load blog post")
        setIsLoading(false)
      }
    }

    fetchBlogPost()
  }, [slug])

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/blogs?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const textContent = content.replace(/<[^>]*>/g, "")
    const wordCount = textContent.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }
  function extractHeadings(content: string) {
    const headings: { id: string; text: string; level: number }[] = []
    const regex = /<h([1-2-3])\s+id="([^"]+)">(.+?)<\/h\1>/g
    let match
  
    while ((match = regex.exec(content)) !== null) {
      const level = Number.parseInt(match[1], 10)
      const id = match[2]
      const text = match[3]
      headings.push({ id, text, level })
    }
  
    return headings
  }
  let headings: TocElement[] = [];
  if(post && post.table_of_content == 1)
  headings = extractHeadings(post.content)

  // console.log(headings)

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learning Center
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <Skeleton className="h-10 w-3/4 mb-6" />

                <div className="mb-8">
                  <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-y-2">
                    <Skeleton className="h-10 w-10 rounded-full mr-2" />
                    <Skeleton className="h-4 w-32 mr-6" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Skeleton className="h-40 w-full rounded-lg mb-8" />
              <Skeleton className="h-60 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render error state
  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
        <p className="mb-6">The learning resource you're looking for doesn't exist or has been removed.</p>
        <Link href="/blogs" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Learning Center
        </Link>
      </div>
    )
  }

  // Calculate reading time for the post
  const readingTime = calculateReadingTime(post.content)

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Center
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

              <div className="mb-8">
                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-y-2">
                  {post.author_name && (
                    <div className="flex items-center mr-6">
                      {post.author_image ? (
                        <div className="relative w-10 h-10 overflow-hidden rounded-full mr-2">
                          <Image
                            src={post.author_image || "/placeholder.svg"}
                            alt={post.author_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                      <span>{post.author_name}</span>
                    </div>
                  )}

                  <div className="flex items-center mr-6">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.publish_date)}</span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                {post.featured_image && (
                  <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
                    <Image
                      src={post.featured_image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Table of Contents:</h3>
                  <ul className="space-y-2">
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        className="text-primary hover:underline"
                        style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}
                      >
                        <a href={`#${heading.id}`}>{heading.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Content */}
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

              

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: ContentTag) => (
                      <Link
                        key={tag.id}
                        href={`/blogs?tag=${encodeURIComponent(tag.tag)}`}
                        className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-800"
                      >
                        {tag.tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Section */}
              {post.author_name && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">About Author</h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    {post.author_image ? (
                      <div className="relative w-[120px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.author_image || "/placeholder.svg"}
                          alt={post.author_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-[120px] h-[120px] rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-12 w-12 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{post.author_name}</h3>
                      <p className="text-gray-700">
                        {/* Author bio would go here if available */}
                        Expert in child development and early intervention strategies.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search Box */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button type="submit" className="absolute inset-y-0 right-0 px-3 flex items-center">
                    <Search className="h-5 w-5 text-blue-500" />
                  </button>
                </div>
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Categories</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <Link href="/blogs?category=child-development" className="text-gray-700 hover:text-primary">
                    Child Development
                  </Link>
                  <span className="text-gray-500">(8)</span>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="/blogs?category=therapy-approaches" className="text-gray-700 hover:text-primary">
                    Therapy Approaches
                  </Link>
                  <span className="text-gray-500">(6)</span>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="/blogs?category=parenting-support" className="text-gray-700 hover:text-primary">
                    Parenting Support
                  </Link>
                  <span className="text-gray-500">(5)</span>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="/blogs?category=special-needs" className="text-gray-700 hover:text-primary">
                    Special Needs
                  </Link>
                  <span className="text-gray-500">(4)</span>
                </li>
              </ul>
            </div>

            {/* Related Posts */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Related Posts</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image src="/images/child-development.jpeg" alt="Child Development" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Understanding Developmental Milestones</h4>
                    <p className="text-xs text-gray-600 mt-1">March 15, 2025</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image src="/images/speech-therapy.jpeg" alt="Speech Therapy" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Early Intervention for Speech Delays</h4>
                    <p className="text-xs text-gray-600 mt-1">February 22, 2025</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image src="/images/therapy-session.jpeg" alt="Therapy Session" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Choosing the Right Therapy Approach</h4>
                    <p className="text-xs text-gray-600 mt-1">January 10, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
