"use client"

import { useState, useEffect } from "react"
import { contentService, type ContentCategory } from "@/lib/api/api-services"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Pencil, Trash2, Plus } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Form schema for category validation
const categorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    slug: z.string().optional(),
    description: z.string().optional(),
    parent_id: z.number().nullable().optional(),
    type: z.string().optional(),
})

export default function CategoriesPage() {
    const [categories, setCategories] = useState<ContentCategory[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<ContentCategory | null>(null)
    const { toast } = useToast()

    // Form for creating/editing categories
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            parent_id: null,
            type: "blog",
        },
    })

    // Load categories on component mount
    useEffect(() => {
        fetchCategories()
    }, [])

    // Reset form when dialog opens/closes
    useEffect(() => {
        if (isCreateDialogOpen) {
            form.reset({
                name: "",
                slug: "",
                description: "",
                parent_id: null,
                type: "blog",
            })
        }
    }, [isCreateDialogOpen, form])

    // Set form values when editing a category
    useEffect(() => {
        if (currentCategory && isEditDialogOpen) {
            form.reset({
                id: currentCategory.id,
                name: currentCategory.name,
                slug: currentCategory.slug || "",
                description: currentCategory.description || "",
                parent_id: currentCategory.parent_id || null,
                type: currentCategory.type || "blog",
            })
        }
    }, [currentCategory, isEditDialogOpen, form])
    
    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            setLoading(true)
            const response = await contentService.getCategoriesAdmin()
            if (response.data?.success) {
                setCategories(response.data.categories || [])
            } else {
                toast({
                    title: "Error fetching categories",
                    description: response.data?.message || "An error occurred",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Error fetching categories:", error)
            toast({
                title: "Error",
                description: "Failed to fetch categories",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    // Handle form submission for creating/editing categories
    const onSubmit = async (values: z.infer<typeof categorySchema>) => {
        try {
            // console.log(values)
            const action = values.id ? "update" : "create"
            const response = await contentService.manageCategory(action, values)

            if (response.data?.success) {
                toast({
                    title: "Success",
                    description: response.data.message,
                })

                // Close dialogs and refresh categories
                setIsCreateDialogOpen(false)
                setIsEditDialogOpen(false)
                fetchCategories()
            } else {
                toast({
                    title: "Error",
                    description: response.data?.message || "An error occurred",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Error managing category:", error)
            toast({
                title: "Error",
                description: "Failed to manage category",
                variant: "destructive",
            })
        }
    }

    // Handle category deletion
    const handleDeleteCategory = async (id: number) => {
        try {
            const response = await contentService.manageCategory("delete", { id })

            if (response.data?.success) {
                toast({
                    title: "Success",
                    description: response.data.message,
                })
                fetchCategories()
            } else {
                toast({
                    title: "Error",
                    description: response.data?.message || "An error occurred",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Error deleting category:", error)
            toast({
                title: "Error",
                description: "Failed to delete category",
                variant: "destructive",
            })
        }
    }

    // Get parent category name by ID
    const getParentCategoryName = (parentId: number | null | undefined) => {
        if (!parentId) return "None"
        const parent = categories.find((cat) => cat.id === parentId)
        return parent ? parent.name : "Unknown"
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Blog Categories</h1>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                            <DialogDescription>Add a new category for blog posts. Fill out the form below.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Category name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="category-slug" {...field} />
                                            </FormControl>
                                            <FormDescription>Leave empty to auto-generate from name</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Category description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parent_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parent Category (Optional)</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(value ? Number.parseInt(value) : null)}
                                                value={field.value?.toString() || ""}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a parent category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="none">None</SelectItem>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id?.toString() || ""}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type (Optional)</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value || "blog"}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="blog">Blog</SelectItem>
                                                    <SelectItem value="resource">Resource</SelectItem>
                                                    <SelectItem value="news">News</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="submit">Create Category</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Edit Category Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>Update the category details below.</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="category-slug" {...field} />
                                        </FormControl>
                                        <FormDescription>Leave empty to auto-generate from name</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Category description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parent_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parent Category (Optional)</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(value ? Number.parseInt(value) : null)}
                                            value={field.value?.toString() || ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a parent category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="none">None</SelectItem>
                                                {categories
                                                    .filter((category) => category.id !== currentCategory?.id)
                                                    .map((category) => (
                                                        <SelectItem key={category.id} value={category.id?.toString() || ""}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type (Optional)</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value || "blog"}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="blog">Blog</SelectItem>
                                                <SelectItem value="resource">Resource</SelectItem>
                                                <SelectItem value="news">News</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Update Category</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Categories Table */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Parent</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">
                                    Loading categories...
                                </TableCell>
                            </TableRow>
                        ) : categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">
                                    No categories found. Create your first category.
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell>{getParentCategoryName(category.parent_id)}</TableCell>
                                    <TableCell>{category.type || "blog"}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setCurrentCategory(category)
                                                    setIsEditDialogOpen(true)
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete the category "{category.name}"? This action cannot be
                                                            undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => category.id && handleDeleteCategory(category.id)}
                                                            className="bg-red-500 hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
