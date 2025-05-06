"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ClipboardList,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  DollarSign,
  Clock,
  FileText,
  Check,
  X,
  Tag,
  MenuSquare,
  Brain,
  HeartHandshake,
  Sparkles,
  MessageSquareText,
  Lightbulb,
  GraduationCap
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

// Assessment categories from the client-facing page
const assessmentCategoriesData = [
  {
    id: "speech-language",
    name: "Speech & Language",
    description: "Comprehensive evaluation of communication skills, language development, and speech patterns",
    icon: MessageSquareText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "social-emotional",
    name: "Social Emotional",
    description: "Assessment of emotional regulation, social skills, and interpersonal development",
    icon: HeartHandshake,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "occupational-therapy",
    name: "Occupational Therapy",
    description: "Evaluation of fine motor skills, sensory processing, and daily living activities",
    icon: Sparkles,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "behavior-intervention",
    name: "Behavior Intervention",
    description: "Assessment of behavioral patterns, challenges, and intervention strategies",
    icon: Brain,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "psychoeducation",
    name: "Psychoeducation",
    description: "Comprehensive cognitive and educational assessments for learning needs",
    icon: GraduationCap,
    color: "bg-red-100 text-red-700",
  }
];

// Mock data for assessment catalog items, aligned with the categories in the client site
const initialAssessments = [
  // Speech & Language
  {
    id: "a1",
    name: "Speech & Language Evaluation",
    description: "Comprehensive assessment of speech and language skills to identify potential communication disorders.",
    price: 199,
    discountedPrice: 179,
    ageRange: "1-18 years",
    category: "Speech & Language",
    estimatedTime: 60,
    questionCount: 35,
    isActive: true,
    isRemote: true,
    tags: ["speech", "language", "communication", "articulation"],
  },
  {
    id: "a2",
    name: "Expressive Language Assessment",
    description: "Focused evaluation of a child's ability to express thoughts, ideas, and feelings verbally.",
    price: 149,
    discountedPrice: null,
    ageRange: "2-12 years",
    category: "Speech & Language",
    estimatedTime: 45,
    questionCount: 25,
    isActive: true,
    isRemote: true,
    tags: ["expressive", "language", "verbal skills", "communication"],
  },
  
  // Social Emotional
  {
    id: "a3",
    name: "Social Skills Assessment",
    description: "Evaluation of a child's ability to interact effectively with peers and adults in social situations.",
    price: 189,
    discountedPrice: 169,
    ageRange: "3-16 years",
    category: "Social Emotional",
    estimatedTime: 50,
    questionCount: 30,
    isActive: true,
    isRemote: true,
    tags: ["social skills", "peer interaction", "emotional intelligence"],
  },
  {
    id: "a4",
    name: "Emotional Regulation Screening",
    description: "Assessment of a child's ability to understand and manage their emotions appropriately.",
    price: 159,
    discountedPrice: null,
    ageRange: "3-16 years",
    category: "Social Emotional",
    estimatedTime: 45,
    questionCount: 28,
    isActive: true,
    isRemote: true,
    tags: ["emotional regulation", "self-control", "emotional awareness"],
  },
  
  // Occupational Therapy
  {
    id: "a5",
    name: "Sensory Processing Assessment",
    description: "Evaluation of sensory processing abilities to identify potential sensory integration challenges.",
    price: 179,
    discountedPrice: 159,
    ageRange: "3-16 years",
    category: "Occupational Therapy",
    estimatedTime: 55,
    questionCount: 30,
    isActive: true,
    isRemote: true,
    tags: ["sensory", "processing", "integration", "occupational therapy"],
  },
  {
    id: "a6",
    name: "Fine Motor Skills Assessment",
    description: "Detailed evaluation of a child's fine motor coordination and skills for daily activities.",
    price: 169,
    discountedPrice: null,
    ageRange: "2-12 years",
    category: "Occupational Therapy",
    estimatedTime: 50,
    questionCount: 28,
    isActive: true,
    isRemote: false,
    tags: ["fine motor", "handwriting", "coordination", "dexterity"],
  },
  
  // Behavior Intervention
  {
    id: "a7",
    name: "ABA Assessment",
    description: "Applied Behavior Analysis assessment to evaluate behavior patterns and establish intervention strategies.",
    price: 299,
    discountedPrice: 249,
    ageRange: "2-12 years",
    category: "Behavior Intervention",
    estimatedTime: 90,
    questionCount: 45,
    isActive: true,
    isRemote: false,
    tags: ["ABA", "behavior", "intervention", "autism"],
  },
  {
    id: "a8",
    name: "Functional Behavior Assessment",
    description: "Evaluation to identify factors that contribute to challenging behaviors and develop targeted interventions.",
    price: 249,
    discountedPrice: null,
    ageRange: "3-16 years",
    category: "Behavior Intervention",
    estimatedTime: 75,
    questionCount: 40,
    isActive: true,
    isRemote: true,
    tags: ["functional behavior", "challenging behaviors", "triggers", "intervention"],
  },
  
  // Psychoeducation
  {
    id: "a9",
    name: "Developmental Screening",
    description: "Comprehensive screening to identify potential developmental delays across multiple domains.",
    price: 149,
    discountedPrice: null,
    ageRange: "0-6 years",
    category: "Psychoeducation",
    estimatedTime: 45,
    questionCount: 25,
    isActive: true,
    isRemote: true,
    tags: ["screening", "development", "milestone", "early intervention"],
  },
  {
    id: "a10",
    name: "Executive Function Screening",
    description: "Assessment of executive functioning skills including attention, working memory, and self-regulation.",
    price: 169,
    discountedPrice: null,
    ageRange: "6-18 years",
    category: "Psychoeducation",
    estimatedTime: 50,
    questionCount: 28,
    isActive: true,
    isRemote: true,
    tags: ["executive function", "ADHD", "attention", "cognitive"],
  }
];

// Age range options
const ageRanges = [
  "0-3 years",
  "0-6 years",
  "1-18 years",
  "2-12 years",
  "3-16 years",
  "6-18 years",
  "All ages"
];

export default function AssessmentsCatalogPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [assessments, setAssessments] = useState(initialAssessments);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<any>(null);
  const [newAssessment, setNewAssessment] = useState({
    name: "",
    description: "",
    price: 149,
    discountedPrice: null as number | null,
    ageRange: "0-6 years",
    category: "Speech & Language",
    estimatedTime: 45,
    questionCount: 25,
    isActive: true,
    isRemote: true,
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get category details by name
  const getCategoryDetails = (categoryName: string) => {
    return assessmentCategoriesData.find(cat => cat.name === categoryName) || assessmentCategoriesData[0];
  };

  // Filter assessments based on search term and category filter
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = (
      assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    const matchesCategory = categoryFilter === "all" || assessment.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Handle assessment creation
  const handleCreateAssessment = () => {
    const newId = `a${assessments.length + 1}`;
    setAssessments([...assessments, { ...newAssessment, id: newId }]);
    setIsAddDialogOpen(false);
    setNewAssessment({
      name: "",
      description: "",
      price: 149,
      discountedPrice: null,
      ageRange: "0-6 years",
      category: "Speech & Language",
      estimatedTime: 45,
      questionCount: 25,
      isActive: true,
      isRemote: true,
      tags: [],
    });
  };

  // Handle assessment update
  const handleUpdateAssessment = () => {
    if (!currentAssessment) return;
    
    setAssessments(assessments.map(assessment => 
      assessment.id === currentAssessment.id ? currentAssessment : assessment
    ));
    setIsEditDialogOpen(false);
    setCurrentAssessment(null);
  };

  // Handle assessment deletion
  const handleDeleteAssessment = () => {
    if (!currentAssessment) return;
    
    setAssessments(assessments.filter(assessment => assessment.id !== currentAssessment.id));
    setIsDeleteDialogOpen(false);
    setCurrentAssessment(null);
  };

  // Open edit dialog for an assessment
  const openEditDialog = (assessment: any) => {
    setCurrentAssessment({ ...assessment });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog for an assessment
  const openDeleteDialog = (assessment: any) => {
    setCurrentAssessment(assessment);
    setIsDeleteDialogOpen(true);
  };

  // Handle adding a tag
  const handleAddTag = (isNew = false) => {
    if (!newTag.trim()) return;
    
    if (isNew) {
      if (!newAssessment.tags.includes(newTag.trim())) {
        setNewAssessment({
          ...newAssessment,
          tags: [...newAssessment.tags, newTag.trim()]
        });
      }
    } else if (currentAssessment) {
      if (!currentAssessment.tags.includes(newTag.trim())) {
        setCurrentAssessment({
          ...currentAssessment,
          tags: [...currentAssessment.tags, newTag.trim()]
        });
      }
    }
    
    setNewTag("");
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string, isNew = false) => {
    if (isNew) {
      setNewAssessment({
        ...newAssessment,
        tags: newAssessment.tags.filter((t: string) => t !== tag)
      });
    } else if (currentAssessment) {
      setCurrentAssessment({
        ...currentAssessment,
        tags: currentAssessment.tags.filter((t: string) => t !== tag)
      });
    }
  };

  return (
    <div className="flex-1">
      <AdminHeader 
        title="Assessments Catalog" 
        description="Manage assessment types, pricing, and details" 
      />

      <main className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assessments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suppressHydrationWarning
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {assessmentCategoriesData.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="button" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Assessment
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Assessments Catalog</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Age Range</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.map((assessment) => {
                  const categoryDetails = getCategoryDetails(assessment.category);
                  return (
                    <TableRow key={assessment.id}>
                      <TableCell className="font-medium">
                        <div className="font-medium">{assessment.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{assessment.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-md ${categoryDetails.color.split(' ')[0]}`}>
                            {React.createElement(categoryDetails.icon, { className: `h-4 w-4 ${categoryDetails.color.split(' ')[1]}` })}
                          </div>
                          <span>{assessment.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>{assessment.ageRange}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                          {assessment.estimatedTime} min
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                          {assessment.price === 0 ? (
                            <span className="text-green-600 font-medium">Free</span>
                          ) : (
                            <>
                              <span className={assessment.discountedPrice ? "line-through text-muted-foreground mr-2" : ""}>
                                ${assessment.price}
                              </span>
                              {assessment.discountedPrice && (
                                <span className="text-green-600 font-medium">${assessment.discountedPrice}</span>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            assessment.isActive 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                          }`}>
                            {assessment.isActive ? "Active" : "Inactive"}
                          </div>
                          {assessment.isRemote && (
                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Remote
                            </div>
                          )}
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
                            <DropdownMenuItem onClick={() => openEditDialog(assessment)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin/assessments-catalog/${assessment.id}/questions`)}>
                              <MenuSquare className="h-4 w-4 mr-2" />
                              Manage Questions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(assessment)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Add Assessment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Assessment</DialogTitle>
            <DialogDescription>
              Create a new assessment type with pricing and question details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="name">Assessment Name</Label>
              <Input
                id="name"
                value={newAssessment.name}
                onChange={(e) => setNewAssessment({ ...newAssessment, name: e.target.value })}
                placeholder="e.g., Speech & Language Evaluation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newAssessment.description}
                onChange={(e) => setNewAssessment({ ...newAssessment, description: e.target.value })}
                placeholder="Detailed description of this assessment"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newAssessment.category}
                  onValueChange={(value) => setNewAssessment({ ...newAssessment, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentCategoriesData.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageRange">Age Range</Label>
                <Select 
                  value={newAssessment.ageRange}
                  onValueChange={(value) => setNewAssessment({ ...newAssessment, ageRange: value })}
                >
                  <SelectTrigger id="ageRange">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newAssessment.price}
                  onChange={(e) => setNewAssessment({ ...newAssessment, price: parseFloat(e.target.value) })}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
                <Input
                  id="discountedPrice"
                  type="number"
                  value={newAssessment.discountedPrice || ""}
                  onChange={(e) => {
                    const value = e.target.value === "" ? null : parseFloat(e.target.value);
                    setNewAssessment({ ...newAssessment, discountedPrice: value });
                  }}
                  min={0}
                  placeholder="Optional"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={newAssessment.estimatedTime}
                  onChange={(e) => setNewAssessment({ ...newAssessment, estimatedTime: parseInt(e.target.value) })}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="questionCount">Question Count</Label>
                <Input
                  id="questionCount"
                  type="number"
                  value={newAssessment.questionCount}
                  onChange={(e) => setNewAssessment({ ...newAssessment, questionCount: parseInt(e.target.value) })}
                  min={1}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newAssessment.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 rounded-full"
                      onClick={() => handleRemoveTag(tag, true)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag(true);
                    }
                  }}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => handleAddTag(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newAssessment.isActive}
                  onCheckedChange={(checked) => setNewAssessment({ ...newAssessment, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isRemote"
                  checked={newAssessment.isRemote}
                  onCheckedChange={(checked) => setNewAssessment({ ...newAssessment, isRemote: checked })}
                />
                <Label htmlFor="isRemote">Available Remote</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateAssessment}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Assessment Dialog */}
      {currentAssessment && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Assessment</DialogTitle>
              <DialogDescription>
                Update the details of this assessment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Assessment Name</Label>
                <Input
                  id="edit-name"
                  value={currentAssessment.name}
                  onChange={(e) => setCurrentAssessment({ ...currentAssessment, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentAssessment.description}
                  onChange={(e) => setCurrentAssessment({ ...currentAssessment, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={currentAssessment.category}
                    onValueChange={(value) => setCurrentAssessment({ ...currentAssessment, category: value })}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {assessmentCategoriesData.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ageRange">Age Range</Label>
                  <Select 
                    value={currentAssessment.ageRange}
                    onValueChange={(value) => setCurrentAssessment({ ...currentAssessment, ageRange: value })}
                  >
                    <SelectTrigger id="edit-ageRange">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentAssessment.price}
                    onChange={(e) => setCurrentAssessment({ ...currentAssessment, price: parseFloat(e.target.value) })}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-discountedPrice">Discounted Price ($)</Label>
                  <Input
                    id="edit-discountedPrice"
                    type="number"
                    value={currentAssessment.discountedPrice || ""}
                    onChange={(e) => {
                      const value = e.target.value === "" ? null : parseFloat(e.target.value);
                      setCurrentAssessment({ ...currentAssessment, discountedPrice: value });
                    }}
                    min={0}
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-estimatedTime">Estimated Time (minutes)</Label>
                  <Input
                    id="edit-estimatedTime"
                    type="number"
                    value={currentAssessment.estimatedTime}
                    onChange={(e) => setCurrentAssessment({ ...currentAssessment, estimatedTime: parseInt(e.target.value) })}
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-questionCount">Question Count</Label>
                  <Input
                    id="edit-questionCount"
                    type="number"
                    value={currentAssessment.questionCount}
                    onChange={(e) => setCurrentAssessment({ ...currentAssessment, questionCount: parseInt(e.target.value) })}
                    min={1}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentAssessment.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 rounded-full"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => handleAddTag()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-isActive"
                    checked={currentAssessment.isActive}
                    onCheckedChange={(checked) => setCurrentAssessment({ ...currentAssessment, isActive: checked })}
                  />
                  <Label htmlFor="edit-isActive">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-isRemote"
                    checked={currentAssessment.isRemote}
                    onCheckedChange={(checked) => setCurrentAssessment({ ...currentAssessment, isRemote: checked })}
                  />
                  <Label htmlFor="edit-isRemote">Available Remote</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleUpdateAssessment}>
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Assessment Dialog */}
      {currentAssessment && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Assessment</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this assessment? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <p className="font-medium">{currentAssessment.name}</p>
              <p className="text-sm text-muted-foreground">{currentAssessment.description}</p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" onClick={handleDeleteAssessment}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Assessment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 