"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, X, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import AdminHeader from "@/components/admin/admin-header"
import { useToast } from "@/components/ui/use-toast"
import { ContentAuthor, contentService } from "@/lib/api/api-services"
import TiptapEditor from "@/components/content/tiptap-editor"

export default function EditBlogPage({params} : {params: Promise<{slug: string}>}) {
  // Use the useParams hook to get the id parameter from the URL
  // const params = useParams<{ id: string }>()
  const { slug } = use(params)
  const router = useRouter()
  const { toast } = useToast()

  // Add mounting state to prevent hydration mismatches
  const [mounted, setMounted] = useState(false)

  // Blog state
  const [title, setTitle] = useState("Understanding Child Development Milestones")
  const [id, setId] = useState(0)
  const [category, setCategory] = useState("Child Development")
  const [author, setAuthor] = useState("Dr. Sarah Johnson")
  const [newAuthor, setNewAuthor] = useState("")
  const [isAddingAuthor, setIsAddingAuthor] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<string | null>("/placeholder.svg?height=400&width=600")
  const [isPublished, setIsPublished] = useState(true)
  const [showToc, setShowToc] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>(["development", "milestones", "children", "growth"])
  const [newTag, setNewTag] = useState("")
  const [publishMode, setPublishMode] = useState<"draft" | "publish">("publish")
  const [excerpt, setExcerpt] = useState(
    "Learn about the key developmental milestones for children and how to track them effectively.",
  )
  const [content, setContent] = useState<string|null>(
    null
  )
  const [publishDate, setPublishDate] = useState("2023-03-15")
  const [seoTitle, setSeoTitle] = useState("Child Development Milestones: A Complete Guide | [COMPANY]")
  const [seoDescription, setSeoDescription] = useState(
    "Learn about key developmental milestones for children from birth to 5 years. Our comprehensive guide helps parents track and support healthy development.",
  )
  const [uploadedFeaturedImage, setUploadedFeaturedImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for categories and authors
  const [categories, setCategories] = useState([
    {
      name: "Add new category...",
      id: 0
    }
  ])
  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add this useEffect after the mounting effect:
  useEffect(() => {
    const fetchBlogData = async () => {
      if (!mounted) return

      try {
        setIsLoading(true)

        // Fetch blog post data
        const response = await contentService.getContentBySlug(slug)
        const blogData = response.data.content
        // Set form state with blog data
        setId(blogData.id)
        setTitle(blogData.title || "")
        setExcerpt(blogData.excerpt || "")
        
        setContent(blogData.content || "")
        setCategory(blogData.category_id?.toString() || "")
        setAuthor(blogData.author_name || "")
        setFeaturedImage(blogData.featured_image || null)
        setIsPublished(blogData.status === "published")
        setShowToc(blogData.table_of_content || false)
        setPublishDate(blogData.publish_date?.split("T")[0] || new Date().toISOString().split("T")[0])
        setSeoTitle(blogData.seo_title || "")
        setSeoDescription(blogData.meta_description || "")

        // Set tags if available
        if (blogData.tags && Array.isArray(blogData.tags)) {
          setTags(blogData.tags.map((tag: any) => tag.tag))
        }

        // Fetch requirements (categories, predefined tags, authors)
        const requirementsResponse = await contentService.getContentRequirements("blog")

        if (requirementsResponse.data) {
          const { categories, tags, authors } = requirementsResponse.data
          // Set categories
          if (categories && Array.isArray(categories)) {
            setCategories(categories)
          }

          // Set predefined tags
          // if (tags && Array.isArray(tags)) {
          //   setPredefinedTags(tags.map((tag: any) => tag.tag))
          // }

          // Set authors
          if (authors && Array.isArray(authors)) {
            setAuthors([...authors, {
              name: "Add New Author..."
            }])
          } else {
            // Fallback to mock data
            setAuthors([{
              name: "Add New Author...",
            }
              
              
            ])
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching blog data:", error)
        toast({
          title: "Error",
          description: "Failed to load blog data. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    if (mounted && slug) {
      fetchBlogData()
    }
  }, [mounted, slug, toast])

  // Predefined tag options
  const [predefinedTags, setPredefinedTags] = useState([
    "Child Development",
    "Milestones",
    "Cognitive Development",
    "Language Skills",
    "Motor Skills",
    "Social Emotional",
    "Early Childhood",
    "Learning Activities",
    "Autism Spectrum Disorder",
    "ADHD",
    "Speech Delay",
    "Sensory Processing",
    "Behavioral Challenges",
    "Early Signs",
    "Special Needs",
    "Early Intervention",
    "Developmental Screening",
    "Assessment Tools",
    "Intervention Strategies",
    "Therapy Options",
    "Professional Guidance",
    "Parenting Tips",
    "Daily Routines",
    "Bedtime Routines",
    "Healthy Eating",
    "Toilet Training",
    "Emotional Support",
    "Behavioral Management",
    "Family Support",
    "Speech Therapy",
    "Occupational Therapy",
    "Play Therapy",
    "Behavioral Therapy",
    "Therapy Approaches",
    "Specialist Advice",
    "Professional Development",
    "Workshops and Trainings",
    "Teletherapy",
    "Online Sessions",
    "Virtual Therapy",
    "Remote Learning",
    "Parent Guidance Online",
    "Online Resources",
  ])
  const [authors, setAuthors] = useState<ContentAuthor[]>([{
    name: "Add New Author...",
}])

  // Handle featured image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Store the file object for later upload
      setUploadedFeaturedImage(file)

      // Create a preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setFeaturedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove featured image
  const removeFeaturedImage = () => {
    setFeaturedImage(null)
    setUploadedFeaturedImage(null)
  }

  // Handle author selection or addition
  const handleAuthorChange = (value: string) => {
    if (value === "Add New Author...") {
      setIsAddingAuthor(true)
    } else {
      setAuthor(value)
    }
  }

  // Save new author
  const saveNewAuthor = () => {
    if (newAuthor.trim()) {
      setAuthor(newAuthor)
      setIsAddingAuthor(false)
      setNewAuthor("")
    }
  }

  // Cancel adding new author
  const cancelAddAuthor = () => {
    setIsAddingAuthor(false)
    setNewAuthor("")
  }

  const addCommonTag = async (newTag : string) => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      
      const addData = {
        id: Number(id),
        tag: newTag
      }
      try {
        await contentService.manageTags("create", addData)
        toast({
          title: "Success",
          description: `Tags Updated Successfully.`,
        })
        setTags([...tags, newTag.trim()])
        setNewTag("")
      } catch (error) {
        toast({
          title: "Error",
          description: `${error}`,
          variant: "destructive"
        })
      }
    }
  }

  // Handle adding a new tag
  const addTag = async () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      
      const addData = {
        id: Number(id),
        tag: newTag
      }
      try {
        await contentService.manageTags("create", addData)
        toast({
          title: "Success",
          description: `Tag Added Successfully.`,
        })
        setTags([...tags, newTag.trim()])
        setNewTag("")
      } catch (error) {
        toast({
          title: "Error Adding Tag",
          description: `${error}`,
          variant: "destructive"
        })
      }
    }
  }

  // Handle removing a tag
  const removeTag = async (tagToRemove: string) => {
    const removeData = {
      id: Number(id),
      tag: tagToRemove
    }
    try {
      await contentService.manageTags("delete", removeData)
      toast({
        title: "Success",
        description: `Tag Removed Successfully.`,
      })
      setTags(tags.filter((tag) => tag !== tagToRemove))
    } catch (error) {
      toast({
        title: "Error Deleting Tag",
        description: `${error}`,
        variant: "destructive"
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for API
      if(content){
      const blogData = {
        id: Number(id), // Include ID for update
        title,
        excerpt,
        content,
        type: "blog" as const,
        seo_title: seoTitle || `${title} | [COMPANY]`,
        meta_description: seoDescription || (excerpt.length > 160 ? excerpt.substring(0, 157) + "..." : excerpt),
        category_id: Number.parseInt(category),
        publish_date: publishDate,
        status: publishMode === "publish" ? "published" : "draft" as "published" | "draft",
        table_of_content: showToc ? 1 : 0,
        featured_image: featuredImage,
        author_id: 1, // This would be the actual author ID in a real implementation
        // If featuredImage is a File object from upload, include it
        featuredImageFile: uploadedFeaturedImage || null,
      }

      // Use the new saveContent method that handles both create and update
      await contentService.saveContent(blogData, tags)

      toast({
        title: "Success",
        description: `Blog post ${publishMode === "publish" ? "published" : "saved as draft"} successfully.`,
      })

      // Redirect to blogs list
      router.push("/admin/blogs")
      }
    } catch (error) {
      console.error("Error updating blog post:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle content change from the Tiptap editor
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Edit Blog Post" description={`Editing blog post ID: ${id}`} />

      <main className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/admin/blogs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog List
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline">Preview</Button>
            <Button variant="outline" onClick={() => setPublishMode("draft")} disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button
              onClick={(e) => {
                setPublishMode("publish")
                handleSubmit(e)
              }}
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Updating...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update
                </>
              )}
            </Button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setPublishMode("publish")
            handleSubmit(e)
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the essential information for your blog post</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a compelling title"
                      required
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Write a brief summary of your post"
                      rows={3}
                      suppressHydrationWarning
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Editor Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>Write and format your blog post content</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  {/* Tiptap Editor */}
                  {content &&(
                  <TiptapEditor
                    initialContent={content}
                    onChange={handleContentChange}
                    placeholder="Start writing your blog post..."
                    minHeight="400px"
                    showPreview={true}
                  />
                  )}
                </CardContent>
              </Card>

              {/* SEO Card */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize your post for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">SEO Title</Label>
                    <Input
                      id="seo-title"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="SEO-friendly title (55-60 characters ideal)"
                      suppressHydrationWarning
                    />
                    <p className="text-xs text-muted-foreground">Characters: {seoTitle.length}/60</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-description">Meta Description</Label>
                    <Textarea
                      id="seo-description"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder="Brief description for search results (150-160 characters ideal)"
                      rows={3}
                      suppressHydrationWarning
                    />
                    <p className="text-xs text-muted-foreground">Characters: {seoDescription.length}/160</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue={isPublished ? "published" : "draft"}
                      onValueChange={(value) => setIsPublished(value === "published")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-toc"
                      checked={showToc}
                      onCheckedChange={(checked) => setShowToc(checked as boolean)}
                    />
                    <Label htmlFor="show-toc" className="cursor-pointer">
                      Show Table of Contents
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Category & Author */}
              <Card>
                <CardHeader>
                  <CardTitle>Category & Author</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={`${cat.id}`}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    {isAddingAuthor ? (
                      <div className="space-y-2">
                        <Input
                          id="new-author"
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="Enter author name"
                        />
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={cancelAddAuthor}>
                            Cancel
                          </Button>
                          <Button type="button" size="sm" onClick={saveNewAuthor}>
                            <Check className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Select value={author} onValueChange={handleAuthorChange}>
                        <SelectTrigger id="author">
                          <SelectValue placeholder="Select author" />
                        </SelectTrigger>
                        <SelectContent>
                          {authors.map((auth) => (
                            <SelectItem key={auth.id} value={`${auth.id}` ?? "0"}>
                              {auth.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-md p-4 text-center">
                    {featuredImage ? (
                      <div className="space-y-2">
                        <img
                          src={featuredImage || "/placeholder.svg"}
                          alt="Featured"
                          className="max-h-48 mx-auto rounded"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={removeFeaturedImage}>
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="featured-image-upload"
                        />
                        <label
                          htmlFor="featured-image-upload"
                          className="cursor-pointer text-primary hover:text-primary/80"
                        >
                          Click to upload featured image
                        </label>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <div key={tag} className="inline-flex items-center bg-muted px-2 py-1 rounded-md text-sm">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <Label className="mb-2 block">Common Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {predefinedTags.slice(0, 10).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded-md"
                          onClick={() => {
                            if (!tags.includes(tag)) {
                              addCommonTag(tag)
                            }
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
