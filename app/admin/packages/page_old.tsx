"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  DollarSign,
  Calendar,
  Users,
  Check,
  X
} from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

// Mock data for packages, matching the client-facing packages
interface PackageItem {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number | null;
  sessionCount: number;
  sessionPrice: number;
  displayPrice: number;
  specialtyType: string;
  durationInDays: number;
  isActive: boolean;
  category: string;
  featuresCount: number;
  isRecommended: boolean;
  contactForPricing?: boolean;
}

const initialPackages: PackageItem[] = [
  // Developmental Packages
  {
    id: "developmental-thrive",
    name: "Developmental Thrive Path",
    description: "Comprehensive support for developmental delays or challenges",
    price: 720,
    discountedPrice: 600,
    sessionCount: 12,
    sessionPrice: 60,
    displayPrice: 60,
    specialtyType: "Developmental",
    durationInDays: 90,
    isActive: true,
    category: "Developmental Interventions",
    featuresCount: 9,
    isRecommended: true,
  },
  {
    id: "developmental-empower",
    name: "Developmental Empower Path",
    description: "Balanced support for developmental needs",
    price: 520,
    discountedPrice: 400,
    sessionCount: 8,
    sessionPrice: 65,
    displayPrice: 65,
    specialtyType: "Developmental",
    durationInDays: 60,
    isActive: true,
    category: "Developmental Interventions",
    featuresCount: 9,
    isRecommended: false,
  },
  {
    id: "developmental-nurture",
    name: "Developmental Nurture Path",
    description: "Essential support for developmental needs",
    price: 280,
    discountedPrice: 200,
    sessionCount: 4,
    sessionPrice: 70,
    displayPrice: 70,
    specialtyType: "Developmental",
    durationInDays: 30,
    isActive: true,
    category: "Developmental Interventions",
    featuresCount: 7,
    isRecommended: false,
  },
  
  // Routine Packages
  {
    id: "routine-thrive",
    name: "Routine Thrive Path",
    description: "Comprehensive support for routine-based challenges",
    price: 700,
    discountedPrice: 500,
    sessionCount: 10,
    sessionPrice: 70,
    displayPrice: 70,
    specialtyType: "Routine",
    durationInDays: 45,
    isActive: true,
    category: "Routine-Based Interventions",
    featuresCount: 5,
    isRecommended: true,
  },
  {
    id: "routine-empower",
    name: "Routine Empower Path",
    description: "Balanced support for routine-based challenges",
    price: 450,
    discountedPrice: 300,
    sessionCount: 6,
    sessionPrice: 75,
    displayPrice: 75,
    specialtyType: "Routine",
    durationInDays: 30,
    isActive: true,
    category: "Routine-Based Interventions",
    featuresCount: 5,
    isRecommended: false,
  },
  {
    id: "routine-nurture",
    name: "Routine Nurture Path",
    description: "Essential support for routine-based challenges",
    price: 320,
    discountedPrice: 200,
    sessionCount: 4,
    sessionPrice: 80,
    displayPrice: 80,
    specialtyType: "Routine",
    durationInDays: 15,
    isActive: true,
    category: "Routine-Based Interventions",
    featuresCount: 5,
    isRecommended: false,
  },
  
  // ABA Packages
  {
    id: "aba-school-starter",
    name: "ABA Intensive Starter Path",
    description: "Intensive support for complex behavioral needs (first month of intervention)",
    price: 0,
    discountedPrice: 0,
    sessionCount: 10,
    sessionPrice: 0,
    displayPrice: 0,
    specialtyType: "ABA",
    durationInDays: 30,
    isActive: true,
    category: "Applied Behavior Analysis (ABA)",
    featuresCount: 6,
    isRecommended: true,
    contactForPricing: true
  },
  {
    id: "aba-school-followup",
    name: "Follow-up & Reinforcement Path",
    description: "Second month of intervention",
    price: 0,
    discountedPrice: 0,
    sessionCount: 8,
    sessionPrice: 0,
    displayPrice: 0,
    specialtyType: "ABA",
    durationInDays: 30,
    isActive: true,
    category: "Applied Behavior Analysis (ABA)",
    featuresCount: 8,
    isRecommended: false,
    contactForPricing: true
  },
  {
    id: "aba-school-supervision",
    name: "Supervision & Refinement Path",
    description: "Third month of Intervention",
    price: 0,
    discountedPrice: 0,
    sessionCount: 6,
    sessionPrice: 0,
    displayPrice: 0,
    specialtyType: "ABA",
    durationInDays: 30,
    isActive: true,
    category: "Applied Behavior Analysis (ABA)",
    featuresCount: 8,
    isRecommended: false,
    contactForPricing: true
  },
  {
    id: "aba-home-intensive",
    name: "Intensive Home Program",
    description: "Comprehensive in-home ABA support",
    price: 0,
    discountedPrice: 0,
    sessionCount: 15,
    sessionPrice: 0,
    displayPrice: 0,
    specialtyType: "ABA",
    durationInDays: 30,
    isActive: true,
    category: "Applied Behavior Analysis (ABA)",
    featuresCount: 9,
    isRecommended: false,
    contactForPricing: true
  },
  
  // Counseling Packages
  {
    id: "counseling-single",
    name: "Single Session",
    description: "One-time counseling support",
    price: 90,
    discountedPrice: 60,
    sessionCount: 1,
    sessionPrice: 90,
    displayPrice: 90,
    specialtyType: "Counseling",
    durationInDays: 7,
    isActive: true,
    category: "Counseling & Single Sessions",
    featuresCount: 2,
    isRecommended: false,
  },
  {
    id: "counseling-bundle",
    name: "Session Bundle",
    description: "Multiple sessions at your convenience",
    price: 320,
    discountedPrice: 240,
    sessionCount: 4,
    sessionPrice: 80,
    displayPrice: 80,
    specialtyType: "Counseling",
    durationInDays: 30,
    isActive: true,
    category: "Counseling & Single Sessions",
    featuresCount: 2,
    isRecommended: true,
  },
  {
    id: "counseling-extended",
    name: "Extended Support",
    description: "Comprehensive counseling support",
    price: 420,
    discountedPrice: 300,
    sessionCount: 6,
    sessionPrice: 70,
    displayPrice: 70,
    specialtyType: "Counseling",
    durationInDays: 45,
    isActive: true,
    category: "Counseling & Single Sessions",
    featuresCount: 3,
    isRecommended: false,
  }
];

// Package categories matching the client-facing site
const packageCategories = [
  "Developmental Interventions", 
  "Routine-Based Interventions", 
  "Applied Behavior Analysis (ABA)", 
  "Counseling & Single Sessions"
];

// Specialty types
const specialtyTypes = [
  "Developmental", 
  "Routine", 
  "ABA", 
  "Counseling", 
  "General",
  "Speech", 
  "Occupational", 
  "Physical", 
  "Behavioral",
  "Family"
];

export default function PackagesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [packages, setPackages] = useState(initialPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<any>(null);
  const [newPackage, setNewPackage] = useState<PackageItem>({
    name: "",
    description: "",
    price: 0,
    discountedPrice: null,
    sessionCount: 1,
    sessionPrice: 0,
    displayPrice: 0,
    specialtyType: "Developmental",
    durationInDays: 30,
    isActive: true,
    category: "Developmental Interventions",
    featuresCount: 1,
    isRecommended: false,
    id: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter packages based on search term and category
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = (
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.specialtyType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesCategory = categoryFilter === "all" || pkg.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Handle package creation
  const handleCreatePackage = () => {
    const newId = `package-${Date.now()}`;
    setPackages([...packages, { ...newPackage, id: newId }]);
    setIsAddDialogOpen(false);
    setNewPackage({
      name: "",
      description: "",
      price: 0,
      discountedPrice: null,
      sessionCount: 1,
      sessionPrice: 0,
      displayPrice: 0,
      specialtyType: "Developmental",
      durationInDays: 30,
      isActive: true,
      category: "Developmental Interventions",
      featuresCount: 1,
      isRecommended: false,
      id: newId
    });
  };

  // Handle package update
  const handleUpdatePackage = () => {
    if (!currentPackage) return;
    
    setPackages(packages.map(pkg => 
      pkg.id === currentPackage.id ? currentPackage : pkg
    ));
    setIsEditDialogOpen(false);
    setCurrentPackage(null);
  };

  // Handle package deletion
  const handleDeletePackage = () => {
    if (!currentPackage) return;
    
    setPackages(packages.filter(pkg => pkg.id !== currentPackage.id));
    setIsDeleteDialogOpen(false);
    setCurrentPackage(null);
  };

  // Open edit dialog for a package
  const openEditDialog = (pkg: any) => {
    setCurrentPackage({ ...pkg });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog for a package
  const openDeleteDialog = (pkg: any) => {
    setCurrentPackage(pkg);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex-1">
      <AdminHeader 
        title="Therapy Packages" 
        description="Manage therapy packages, pricing, and details" 
      />

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
                suppressHydrationWarning
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-60">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {packageCategories.map(category => (
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.map((pkg) => (
                  <TableRow key={pkg.id} className={pkg.isRecommended ? "bg-yellow-50" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium">{pkg.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{pkg.description}</div>
                        </div>
                        {pkg.isRecommended && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{pkg.category}</TableCell>
                    <TableCell>{pkg.sessionCount}</TableCell>
                    <TableCell>{pkg.durationInDays} days</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                        {pkg.price === 0 ? (
                          pkg.contactForPricing ? (
                            <span className="text-blue-600 font-medium">Contact [COMPANY]</span>
                          ) : (
                            <span className="text-green-600 font-medium">Free</span>
                          )
                        ) : (
                          <>
                            <span className={pkg.discountedPrice ? "line-through text-muted-foreground mr-2" : ""}>
                              ${pkg.price}
                            </span>
                            {pkg.discountedPrice && (
                              <span className="text-green-600 font-medium">${pkg.discountedPrice}</span>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        pkg.isActive 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                      }`}>
                        {pkg.isActive ? "Active" : "Inactive"}
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
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(pkg)}
                            className="text-red-600"
                          >
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
          </CardContent>
        </Card>
      </main>

      {/* Add Package Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Package</DialogTitle>
            <DialogDescription>
              Create a new therapy package with pricing and session details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="name">Package Name</Label>
              <Input
                id="name"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                placeholder="e.g., Developmental Thrive Path"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newPackage.category}
                onValueChange={(value) => setNewPackage({ ...newPackage, category: value })}
              >
                <SelectTrigger id="category">
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                placeholder="Package details and included services"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: parseFloat(e.target.value) })}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountedPrice">Regional Price ($)</Label>
                <Input
                  id="discountedPrice"
                  type="number"
                  value={newPackage.discountedPrice || ""}
                  onChange={(e) => {
                    const value = e.target.value === "" ? null : parseFloat(e.target.value);
                    setNewPackage({ ...newPackage, discountedPrice: value });
                  }}
                  min={0}
                  placeholder="Optional"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionCount">Number of Sessions</Label>
                <Input
                  id="sessionCount"
                  type="number"
                  value={newPackage.sessionCount}
                  onChange={(e) => setNewPackage({ ...newPackage, sessionCount: parseInt(e.target.value) })}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="durationInDays">Duration (Days)</Label>
                <Input
                  id="durationInDays"
                  type="number"
                  value={newPackage.durationInDays}
                  onChange={(e) => setNewPackage({ ...newPackage, durationInDays: parseInt(e.target.value) })}
                  min={1}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialtyType">Specialty Type</Label>
                <Select 
                  value={newPackage.specialtyType}
                  onValueChange={(value) => setNewPackage({ ...newPackage, specialtyType: value })}
                >
                  <SelectTrigger id="specialtyType">
                    <SelectValue placeholder="Select specialty type" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialtyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="featuresCount">Features Count</Label>
                <Input
                  id="featuresCount"
                  type="number"
                  value={newPackage.featuresCount}
                  onChange={(e) => setNewPackage({ ...newPackage, featuresCount: parseInt(e.target.value) })}
                  min={1}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newPackage.isActive}
                  onCheckedChange={(checked) => setNewPackage({ ...newPackage, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isRecommended"
                  checked={newPackage.isRecommended}
                  onCheckedChange={(checked) => setNewPackage({ ...newPackage, isRecommended: checked })}
                />
                <Label htmlFor="isRecommended">Recommended Option</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreatePackage}>
              <Plus className="h-4 w-4 mr-2" />
              Create Package
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
              <DialogDescription>
                Update the details of this therapy package.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Package Name</Label>
                <Input
                  id="edit-name"
                  value={currentPackage.name}
                  onChange={(e) => setCurrentPackage({ ...currentPackage, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={currentPackage.category}
                  onValueChange={(value) => setCurrentPackage({ ...currentPackage, category: value })}
                >
                  <SelectTrigger id="edit-category">
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
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentPackage.description}
                  onChange={(e) => setCurrentPackage({ ...currentPackage, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentPackage.price}
                    onChange={(e) => setCurrentPackage({ ...currentPackage, price: parseFloat(e.target.value) })}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-discountedPrice">Regional Price ($)</Label>
                  <Input
                    id="edit-discountedPrice"
                    type="number"
                    value={currentPackage.discountedPrice || ""}
                    onChange={(e) => {
                      const value = e.target.value === "" ? null : parseFloat(e.target.value);
                      setCurrentPackage({ ...currentPackage, discountedPrice: value });
                    }}
                    min={0}
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-sessionCount">Number of Sessions</Label>
                  <Input
                    id="edit-sessionCount"
                    type="number"
                    value={currentPackage.sessionCount}
                    onChange={(e) => setCurrentPackage({ ...currentPackage, sessionCount: parseInt(e.target.value) })}
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-durationInDays">Duration (Days)</Label>
                  <Input
                    id="edit-durationInDays"
                    type="number"
                    value={currentPackage.durationInDays}
                    onChange={(e) => setCurrentPackage({ ...currentPackage, durationInDays: parseInt(e.target.value) })}
                    min={1}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-specialtyType">Specialty Type</Label>
                  <Select 
                    value={currentPackage.specialtyType}
                    onValueChange={(value) => setCurrentPackage({ ...currentPackage, specialtyType: value })}
                  >
                    <SelectTrigger id="edit-specialtyType">
                      <SelectValue placeholder="Select specialty type" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialtyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-featuresCount">Features Count</Label>
                  <Input
                    id="edit-featuresCount"
                    type="number"
                    value={currentPackage.featuresCount}
                    onChange={(e) => setCurrentPackage({ ...currentPackage, featuresCount: parseInt(e.target.value) })}
                    min={1}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-isActive"
                    checked={currentPackage.isActive}
                    onCheckedChange={(checked) => setCurrentPackage({ ...currentPackage, isActive: checked })}
                  />
                  <Label htmlFor="edit-isActive">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-isRecommended"
                    checked={currentPackage.isRecommended}
                    onCheckedChange={(checked) => setCurrentPackage({ ...currentPackage, isRecommended: checked })}
                  />
                  <Label htmlFor="edit-isRecommended">Recommended Option</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleUpdatePackage}>
                <Check className="h-4 w-4 mr-2" />
                Save Changes
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
              <p className="font-medium">{currentPackage.name}</p>
              <p className="text-sm text-muted-foreground">{currentPackage.description}</p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" onClick={handleDeletePackage}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Package
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 