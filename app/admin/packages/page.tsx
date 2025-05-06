"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Edit, Trash2, MoreHorizontal, DollarSign, Check, X } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { adminPackagesService, type Package, type PackageFeature } from "@/lib/api/api-services"

// Package categories
const packageCategories = [
    "Developmental Interventions",
    "Routine-Based Interventions",
    "Applied Behavior Analysis (ABA)",
    "Counseling & Single Sessions",
]

export default function PackagesPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [mounted, setMounted] = useState(false)
    const [packages, setPackages] = useState<Package[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentPackage, setCurrentPackage] = useState<Package | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [newFeature, setNewFeature] = useState("")
    const [featuresToAdd, setFeaturesToAdd] = useState<string[]>([])
    const [featuresToRemove, setFeaturesToRemove] = useState<number[]>([])

    const [newPackage, setNewPackage] = useState<{
        package_category: string
        package_name: string
        short_description: string
        session_count: number
        global_cost: number | null
        regional_cost: number | null
        is_recommended: number
        is_active: number
        additional_features: string[]
    }>({
        package_category: "Developmental Interventions",
        package_name: "",
        short_description: "",
        session_count: 1,
        global_cost: 0,
        regional_cost: 0,
        is_recommended: 0,
        is_active: 1,
        additional_features: [],
    })

    // Fetch packages on component mount
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setIsLoading(true)
                const response = await adminPackagesService.getPackages()
                setPackages(response.data.packages)
            } catch (error) {
                console.error("Error fetching packages:", error)
                toast({
                    title: "Error",
                    description: "Failed to load packages. Please try again.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        if (!mounted) {
            setMounted(true)
            fetchPackages()
        }
    }, [mounted, toast])

    // Filter packages based on search term and category
    const filteredPackages = packages.filter((pkg) => {
        const matchesSearch =
            pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.short_description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = categoryFilter === "all" || pkg.package_category === categoryFilter

        return matchesSearch && matchesCategory
    })

    // Handle input change for new package
    const handleNewPackageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewPackage((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle number input change for new package
    const handleNumberChange = (name: string, value: string) => {
        const numValue = value === "" ? null : Number(value)
        setNewPackage((prev) => ({
            ...prev,
            [name]: numValue,
        }))
    }

    // Handle boolean input change for new package
    const handleBooleanChange = (name: string, value: number) => {
        setNewPackage((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle adding a feature to new package
    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setNewPackage((prev) => ({
                ...prev,
                additional_features: [...prev.additional_features, newFeature.trim()],
            }))
            setNewFeature("")
        }
    }

    // Handle removing a feature from new package
    const handleRemoveFeature = (index: number) => {
        setNewPackage((prev) => ({
            ...prev,
            additional_features: prev.additional_features.filter((_, i) => i !== index),
        }))
    }

    // Handle adding a feature to existing package
    const handleAddFeatureToExisting = () => {
        if (newFeature.trim()) {
            setFeaturesToAdd((prev) => [...prev, newFeature.trim()])
            setNewFeature("")
        }
    }

    // Handle removing a feature from existing package
    const handleRemoveFeatureFromExisting = (feature: PackageFeature) => {
        setFeaturesToRemove((prev) => [...prev, feature.pf_id])
    }

    // Handle package creation
    const handleCreatePackage = async () => {
        try {
            setIsLoading(true)
            await adminPackagesService.createPackage(newPackage)
            toast({
                title: "Success",
                description: "Package created successfully",
            })
            setIsAddDialogOpen(false)
            setNewPackage({
                package_category: "Developmental Interventions",
                package_name: "",
                short_description: "",
                session_count: 1,
                global_cost: 0,
                regional_cost: 0,
                is_recommended: 0,
                is_active: 1,
                additional_features: [],
            })

            // Refresh packages
            const response = await adminPackagesService.getPackages()
            setPackages(response.data.packages)
        } catch (error) {
            console.error("Error creating package:", error)
            toast({
                title: "Error",
                description: "Failed to create package. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Handle package update
    const handleUpdatePackage = async () => {
        if (!currentPackage) return

        try {
            setIsLoading(true)
            await adminPackagesService.updatePackage({
                pkg_id: currentPackage.pkg_id,
                package_category: currentPackage.package_category,
                package_name: currentPackage.package_name,
                short_description: currentPackage.short_description,
                session_count: currentPackage.session_count,
                global_cost: currentPackage.global_cost || 0,
                regional_cost: currentPackage.regional_cost || 0,
                is_recommended: currentPackage.is_recommended,
                is_active: currentPackage.is_active,
                features_remove: featuresToRemove,
                features_add: featuresToAdd,
            })

            toast({
                title: "Success",
                description: "Package updated successfully",
            })
            setIsEditDialogOpen(false)
            setCurrentPackage(null)
            setFeaturesToAdd([])
            setFeaturesToRemove([])

            // Refresh packages
            const response = await adminPackagesService.getPackages()
            setPackages(response.data.packages)
        } catch (error) {
            console.error("Error updating package:", error)
            toast({
                title: "Error",
                description: "Failed to update package. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Handle package deletion
    const handleDeletePackage = async () => {
        if (!currentPackage) return

        try {
            setIsLoading(true)
            await adminPackagesService.deletePackage(currentPackage.pkg_id)
            toast({
                title: "Success",
                description: "Package deleted successfully",
            })
            setIsDeleteDialogOpen(false)
            setCurrentPackage(null)

            // Refresh packages
            const response = await adminPackagesService.getPackages()
            setPackages(response.data.packages)
        } catch (error) {
            console.error("Error deleting package:", error)
            toast({
                title: "Error",
                description: "Failed to delete package. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Open edit dialog for a package
    const openEditDialog = (pkg: Package) => {
        setCurrentPackage({ ...pkg })
        setFeaturesToAdd([])
        setFeaturesToRemove([])
        setIsEditDialogOpen(true)
    }

    // Open delete dialog for a package
    const openDeleteDialog = (pkg: Package) => {
        setCurrentPackage(pkg)
        setIsDeleteDialogOpen(true)
    }

    return (
        <div className="flex-1">
            <AdminHeader title="Therapy Packages" description="Manage therapy packages, pricing, and details" />

            <main className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search packages..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full sm:w-60">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {packageCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="button" onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Package
                    </Button>
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>All Packages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading && packages.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-muted-foreground">Loading packages...</p>
                            </div>
                        ) : filteredPackages.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-muted-foreground">No packages found</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Sessions</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPackages.map((pkg) => (
                                        <TableRow key={pkg.pkg_id} className={pkg.is_recommended != 0 ? "bg-yellow-50" : ""}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <div className="font-medium">{pkg.package_name}</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1">{pkg.short_description}</div>
                                                    </div>
                                                    {pkg.is_recommended != 0 && (
                                                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                                            Recommended
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{pkg.package_category}</TableCell>
                                            <TableCell>{pkg.session_count}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                                                    {pkg.global_cost === null ? (
                                                        <span className="text-blue-600 font-medium">Contact for pricing</span>
                                                    ) : (
                                                        <>
                                                            <span className={pkg.regional_cost ? "line-through text-muted-foreground mr-2" : ""}>
                                                                ${pkg.global_cost}
                                                            </span>
                                                            {pkg.regional_cost && (
                                                                <span className="text-green-600 font-medium">${pkg.regional_cost}</span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${pkg.is_active == 1 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {pkg.is_active == 1 ? "Active" : "Inactive"}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button type="button" variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditDialog(pkg)}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => openDeleteDialog(pkg)} className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </main>

            {/* Add Package Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add New Package</DialogTitle>
                        <DialogDescription>Create a new therapy package with pricing and session details.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto">
                        <div className="space-y-2">
                            <Label htmlFor="package_name">Package Name *</Label>
                            <Input
                                id="package_name"
                                name="package_name"
                                value={newPackage.package_name}
                                onChange={handleNewPackageChange}
                                placeholder="e.g., Developmental Thrive Path"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="package_category">Category *</Label>
                            <Select
                                name="package_category"
                                value={newPackage.package_category}
                                onValueChange={(value) => setNewPackage((prev) => ({ ...prev, package_category: value }))}
                            >
                                <SelectTrigger id="package_category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {packageCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="short_description">Description *</Label>
                            <Textarea
                                id="short_description"
                                name="short_description"
                                value={newPackage.short_description}
                                onChange={handleNewPackageChange}
                                placeholder="Package details and included services"
                                rows={3}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="global_cost">Global Price ($) *</Label>
                                <Input
                                    id="global_cost"
                                    type="number"
                                    value={newPackage.global_cost === null ? "" : newPackage.global_cost}
                                    onChange={(e) => handleNumberChange("global_cost", e.target.value)}
                                    min={0}
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="regional_cost">Regional Price ($) *</Label>
                                <Input
                                    id="regional_cost"
                                    type="number"
                                    value={newPackage.regional_cost === null ? "" : newPackage.regional_cost}
                                    onChange={(e) => handleNumberChange("regional_cost", e.target.value)}
                                    min={0}
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="session_count">Number of Sessions *</Label>
                            <Input
                                id="session_count"
                                type="number"
                                value={newPackage.session_count}
                                onChange={(e) => handleNumberChange("session_count", e.target.value)}
                                min={1}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Features</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a feature"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            handleAddFeature()
                                        }
                                    }}
                                />
                                <Button type="button" onClick={handleAddFeature} variant="outline">
                                    Add
                                </Button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {newPackage.additional_features.map((feature, index) => (
                                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                                        <span className="text-sm">{feature}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveFeature(index)}
                                            className="h-8 w-8 p-0 text-red-500"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {newPackage.additional_features.length === 0 && (
                                    <p className="text-sm text-muted-foreground">No features added yet</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={newPackage.is_active == 1}
                                    onCheckedChange={(checked) => handleBooleanChange("is_active", checked ? 1 : 0)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_recommended"
                                    checked={newPackage.is_recommended == 1}
                                    onCheckedChange={(checked) => handleBooleanChange("is_recommended", checked ? 1 : 0)}
                                />
                                <Label htmlFor="is_recommended">Recommended Option</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="button" onClick={handleCreatePackage} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="animate-spin mr-2">⏳</span>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Package
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Package Dialog */}
            {currentPackage && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Edit Package</DialogTitle>
                            <DialogDescription>Update the details of this therapy package.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto">
                            <div className="space-y-2">
                                <Label htmlFor="edit-package_name">Package Name *</Label>
                                <Input
                                    id="edit-package_name"
                                    value={currentPackage.package_name}
                                    onChange={(e) => setCurrentPackage({ ...currentPackage, package_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-package_category">Category *</Label>
                                <Select
                                    value={currentPackage.package_category}
                                    onValueChange={(value) => setCurrentPackage({ ...currentPackage, package_category: value })}
                                >
                                    <SelectTrigger id="edit-package_category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {packageCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-short_description">Description *</Label>
                                <Textarea
                                    id="edit-short_description"
                                    value={currentPackage.short_description}
                                    onChange={(e) => setCurrentPackage({ ...currentPackage, short_description: e.target.value })}
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-global_cost">Global Price ($) *</Label>
                                    <Input
                                        id="edit-global_cost"
                                        type="number"
                                        value={currentPackage.global_cost === null ? "" : currentPackage.global_cost}
                                        onChange={(e) => {
                                            const value = e.target.value === "" ? null : Number(e.target.value)
                                            setCurrentPackage({ ...currentPackage, global_cost: value })
                                        }}
                                        min={0}
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-regional_cost">Regional Price ($) *</Label>
                                    <Input
                                        id="edit-regional_cost"
                                        type="number"
                                        value={currentPackage.regional_cost === null ? "" : currentPackage.regional_cost}
                                        onChange={(e) => {
                                            const value = e.target.value === "" ? null : Number(e.target.value)
                                            setCurrentPackage({ ...currentPackage, regional_cost: value })
                                        }}
                                        min={0}
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-session_count">Number of Sessions *</Label>
                                <Input
                                    id="edit-session_count"
                                    type="number"
                                    value={currentPackage.session_count}
                                    onChange={(e) =>
                                        setCurrentPackage({ ...currentPackage, session_count: Number.parseInt(e.target.value) })
                                    }
                                    min={1}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Current Features</Label>
                                <div className="mt-2 space-y-2">
                                    {currentPackage.features
                                        ?.filter((feature) => !featuresToRemove.includes(feature.pf_id))
                                        .map((feature) => (
                                            <div key={feature.pf_id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                                                <span className="text-sm">{feature.feature}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleRemoveFeatureFromExisting(feature)}
                                                    className="h-8 w-8 p-0 text-red-500"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    {featuresToAdd.map((feature, index) => (
                                        <div key={`new-${index}`} className="flex items-center justify-between bg-green-50 p-2 rounded-md">
                                            <span className="text-sm">{feature}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setFeaturesToAdd((prev) => prev.filter((_, i) => i !== index))}
                                                className="h-8 w-8 p-0 text-red-500"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    {currentPackage.features?.length === 0 && featuresToAdd.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No features added yet</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Add New Feature</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Add a feature"
                                        value={newFeature}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                handleAddFeatureToExisting()
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddFeatureToExisting} variant="outline">
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="edit-is_active"
                                        checked={currentPackage.is_active == 1}
                                        onCheckedChange={(checked) => setCurrentPackage({ ...currentPackage, is_active: checked ? 1 : 0 })}
                                    />
                                    <Label htmlFor="edit-is_active">Active</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="edit-is_recommended"
                                        checked={currentPackage.is_recommended == 1}
                                        onCheckedChange={(checked) => setCurrentPackage({ ...currentPackage, is_recommended: checked ? 1 : 0 })}
                                    />
                                    <Label htmlFor="edit-is_recommended">Recommended Option</Label>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="button" onClick={handleUpdatePackage} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="animate-spin mr-2">⏳</span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Package Dialog */}
            {currentPackage && (
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Delete Package</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this package? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-2">
                            <p className="font-medium">{currentPackage.package_name}</p>
                            <p className="text-sm text-muted-foreground">{currentPackage.short_description}</p>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="button" variant="destructive" onClick={handleDeletePackage} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="animate-spin mr-2">⏳</span>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Package
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
