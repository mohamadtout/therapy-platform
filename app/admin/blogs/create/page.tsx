"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Send, Plus, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import AdminHeader from "@/components/admin/admin-header"
import RichTextEditor from "@/components/content/rich-text-editor"
import TiptapEditor from "@/components/content/tiptap-editor"
import { contentService, type ContentCategory, ContentAuthor } from "@/lib/api/api-services"

export default function CreateBlogPage() {
const router = useRouter()
const { toast } = useToast()

// Form state
const [title, setTitle] = useState("")
const [excerpt, setExcerpt] = useState("")
const [content, setContent] = useState("")
const [category, setCategory] = useState("")
const [author, setAuthor] = useState("")
const [newAuthor, setNewAuthor] = useState("")
const [isAddingAuthor, setIsAddingAuthor] = useState(false)
const [featuredImage, setFeaturedImage] = useState<string | null>(null)
const [showToc, setShowToc] = useState(true)
const [isSubmitting, setIsSubmitting] = useState(false)
const [tags, setTags] = useState<string[]>([])
const [newTag, setNewTag] = useState("")
const [publishMode, setPublishMode] = useState<"draft" | "publish">("draft")
const [seoTitle, setSeoTitle] = useState("")
const [seoDescription, setSeoDescription] = useState("")
const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
)
const [uploadedFeaturedImage, setUploadedFeaturedImage] = useState<File | null>(null)

// Data for dropdowns
const [categories, setCategories] = useState<ContentCategory[]>([])
const [authors, setAuthors] = useState<ContentAuthor[]>([])
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
const [isLoading, setIsLoading] = useState(true)

// Load categories, authors, and tags
useEffect(() => {
    const fetchData = async () => {
    try {
        setIsLoading(true)

        // Use the new consolidated endpoint to get all requirements
        const requirementsResponse = await contentService.getContentRequirements("blog")

        // Update state with the response data
        if (requirementsResponse.data) {
        const { categories, tags, authors } = requirementsResponse.data
        setCategories(categories || [])
        setPredefinedTags(tags)

        // If authors are returned from API, use them
        if (authors && authors.length > 0) {
            setAuthors([...authors,
            // {
            //   name: "Add New Author..."
            // }
            ])
          }
        }
        setIsLoading(false)
    } catch (error) {
        console.error("Error fetching data:", error)
        toast({
        title: "Error",
        description: "Failed to load form data. Please try again.",
        variant: "destructive",
        })
        setIsLoading(false)
    }
    }

    fetchData()
}, [toast])

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
    setAuthor("")
}

// Handle adding a new tag
const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
    setTags([...tags, newTag.trim()])
    setNewTag("")
    }
}

const handleContentChange = (newContent: string) => {
  setContent(newContent)
}

// Handle removing a tag
const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
}

// Auto-generate SEO title and description if empty
useEffect(() => {
    if (!seoTitle && title) {
    setSeoTitle(`${title} | [COMPANY]`)
    }

    if (!seoDescription && excerpt) {
    setSeoDescription(excerpt.length > 160 ? excerpt.substring(0, 157) + "..." : excerpt)
    }
}, [title, excerpt, seoTitle, seoDescription])

// Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title || !content || !category || !author) {
    toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
    })
    return
    }

    setIsSubmitting(true)

    try {
    // Prepare data for API
    const blogData = {
        title,
        excerpt,
        content,
        type: "blog" as const,
        seo_title: seoTitle || `${title} | [COMPANY]`,
        meta_description: seoDescription || (excerpt.length > 160 ? excerpt.substring(0, 157) + "..." : excerpt),
        category_id: Number.parseInt(category),
        publish_date: publishDate,
        status: publishMode == "publish" ? "published" : "draft" as "draft" | "published",
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
    } catch (error) {
    console.error("Error creating blog post:", error)
    toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
    })
    } finally {
    setIsSubmitting(false)
    }
}

return (
    <div className="flex-1">
    <AdminHeader title="Create Blog Post" description="Write and publish a new blog article" />

    <main className="p-6">
        <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
            <Link href="/admin/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
            </Link>
        </Button>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Blog Content</CardTitle>
                <CardDescription>Write your blog post content and apply formatting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog post title"
                    required
                    />
                    <p className="text-xs text-muted-foreground">
                    SEO optimized, clearly descriptive (max 70 characters).
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief summary of your post (shown in previews)"
                    rows={3}
                    required
                    />
                    <p className="text-xs text-muted-foreground">
                    Concise summary that encourages readers to click (max 160 characters).
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="content">Content *</Label>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                        id="show-toc"
                        checked={showToc}
                        onCheckedChange={(checked) => setShowToc(checked as boolean)}
                        />
                        <Label htmlFor="show-toc" className="text-sm font-normal">
                        Show Table of Contents
                        </Label>
                    </div>
                    </div>

                    <TiptapEditor
                    initialContent={content}
                    onChange={handleContentChange}
                    placeholder="Start writing your blog post..."
                    minHeight="400px"
                    showPreview={true}
                    />
                </div>
                </CardContent>
            </Card>

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
                    />
                    <p className="text-xs text-muted-foreground">
                    Characters: {seoTitle.length}/60
                    {seoTitle.length > 60 && <span className="text-red-500"> (Too long)</span>}
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="seo-description">Meta Description</Label>
                    <Textarea
                    id="seo-description"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Brief description for search results (150-160 characters ideal)"
                    rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                    Characters: {seoDescription.length}/160
                    {seoDescription.length > 160 && <span className="text-red-500"> (Too long)</span>}
                    </p>
                </div>
                </CardContent>
            </Card>
            </div>

            <div className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Blog Settings</CardTitle>
                <CardDescription>Configure blog post metadata and publishing options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Each article must belong to one primary category.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    {isAddingAuthor ? (
                    <div className="space-y-2">
                        <Input
                        id="new-author"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="Enter new author name"
                        />
                        <div className="flex space-x-2">
                        <Button type="button" variant="outline" size="sm" onClick={cancelAddAuthor}>
                            Cancel
                        </Button>
                        <Button type="button" size="sm" onClick={saveNewAuthor} disabled={!newAuthor.trim()}>
                            Save Author
                        </Button>
                        </div>
                    </div>
                    ) : (
                    <Select value={author} onValueChange={handleAuthorChange} required>
                        <SelectTrigger id="author">
                        <SelectValue placeholder="Select an author" />
                        </SelectTrigger>
                        <SelectContent>
                        {authors.map((auth) => (
                            <SelectItem key={auth.id} value={`${auth.id}` ?? '0'}>
                            {auth.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    )}
                    <p className="text-xs text-muted-foreground">
                    Expert or specialist name (linked to author profile if available).
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="publish-date">Publish Date</Label>
                    <Input
                    id="publish-date"
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Featured Image</Label>
                    {featuredImage ? (
                    <div className="relative rounded-md overflow-hidden border">
                        <img
                        src={featuredImage || "/placeholder.svg"}
                        alt="Featured"
                        className="w-full h-40 object-cover"
                        />
                        <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeFeaturedImage}
                        >
                        <X className="h-4 w-4" />
                        </Button>
                    </div>
                    ) : (
                    <div className="border border-dashed rounded-md p-4 text-center">
                        <Label
                        htmlFor="featured-image"
                        className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 block"
                        >
                        Upload Featured Image
                        </Label>
                        <Input
                        id="featured-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Recommended: 1200x630px</p>
                    </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                    High-quality, relevant image consistent with branding.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                        <div key={index} className="flex items-center bg-muted rounded-md px-2 py-1 text-sm">
                        <Tag className="h-3 w-3 mr-1" />
                        <span>{tag}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1"
                            onClick={() => removeTag(tag)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                        </div>
                    ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <div className="flex space-x-2">
                        <Input
                        id="new-tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag..."
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" size="sm" variant="outline" onClick={addTag} disabled={!newTag.trim()}>
                        <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Select
                        onValueChange={(value) => {
                        if (value && !tags.includes(value)) {
                            setTags([...tags, value])
                        }
                        }}
                    >
                        <SelectTrigger>
                        <SelectValue placeholder="Select predefined tag" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                        {predefinedTags.map((tag) => (
                            <SelectItem key={tag} value={tag}>
                            {tag}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
                    <p className="text-xs text-muted-foreground">
                    Multiple tags (2-5 recommended) to improve searchability.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Publication Status</Label>
                    <div className="grid grid-cols-2 gap-2">
                    <Button
                        type="button"
                        variant={publishMode === "draft" ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setPublishMode("draft")}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Save as Draft
                    </Button>
                    <Button
                        type="button"
                        variant={publishMode === "publish" ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setPublishMode("publish")}
                    >
                        <Send className="mr-2 h-4 w-4" />
                        Publish Now
                    </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                    {publishMode === "publish"
                        ? "This post will be visible to all users immediately upon saving"
                        : "This post will be saved and can be published later"}
                    </p>
                </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/admin/blogs")}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {publishMode === "publish" ? <Send className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                    {isSubmitting ? "Saving..." : publishMode === "publish" ? "Publish Post" : "Save Draft"}
                </Button>
                </CardFooter>
            </Card>
            </div>
        </div>
        </form>
    </main>
    </div>
)
}
