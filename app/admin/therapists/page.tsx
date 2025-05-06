"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpDown, Download, Filter, MoreHorizontal, Search, UserPlus, Calendar, Check, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminHeader from "@/components/admin/admin-header"
import { adminTherapistsService } from "@/lib/api/api-services"
import { useToast } from "@/components/ui/use-toast"
import { TherapistScheduleModal } from "@/components/admin/therapist-schedule-modal"

// Define therapist interface
interface Therapist {
  id: string
  name: string
  email: string
  nickname: string
  specialties: string
  status: string
  authorized: number
  availability: string
  completed_sessions: number
  pfp: string
}

// Define specialty interface
interface Specialty {
  specialty_id: string
  specialty_name: string
}

export default function TherapistsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  const { toast } = useToast()

  // Only render UI elements on the client
  useEffect(() => {
    setMounted(true)
    fetchTherapists()
  }, [])

  // Fetch therapists from API
  const fetchTherapists = async () => {
    try {
      setIsLoading(true)
      const response = await adminTherapistsService.getAllTherapists()

      if (response.data) {
        setTherapists(response.data.therapists)
        setSpecialties(response.data.all_specialties)
      }
    } catch (error) {
      console.error("Error fetching therapists:", error)
      toast({
        title: "Error",
        description: "Failed to load therapists. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle therapist status change
  const handleStatusChange = async (therapistId: string, newStatus: number) => {
    try {
      await adminTherapistsService.changeTherapistAuthorization(therapistId, newStatus)

      // Update local state
      setTherapists(
        therapists.map((therapist) =>
          therapist.id === therapistId ? { ...therapist, authorized: newStatus } : therapist,
        ),
      )

      toast({
        title: "Success",
        description: "Therapist status updated successfully",
      })
    } catch (error) {
      console.error("Error updating therapist status:", error)
      toast({
        title: "Error",
        description: "Failed to update therapist status. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Open schedule modal
  const openScheduleModal = (therapistId: string) => {
    setSelectedTherapist(therapistId)
    setIsScheduleModalOpen(true)
  }

  // Filter therapists based on search term and filters
  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (therapist.specialties && therapist.specialties.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSpecialty = specialtyFilter === "all" || therapist.specialties === specialtyFilter

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && therapist.authorized === 1) ||
      (statusFilter === "pending" && therapist.authorized === 0) ||
      (statusFilter === "disabled" && therapist.authorized === 2)

    return matchesSearch && matchesSpecialty && matchesStatus
  })

  // Get status label
  const getStatusLabel = (authorized: number) => {
    switch (authorized) {
      case 0:
        return "Pending"
      case 1:
        return "Active"
      case 2:
        return "Disabled"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Therapist Management" description="View and manage platform therapists" />

      <main className="p-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Therapists</CardTitle>
              <CardDescription>Manage therapist profiles, specialties, and availability</CardDescription>
            </div>
            <div className="mt-4 flex flex-col sm:mt-0 sm:flex-row sm:gap-2">
              <Button asChild>
                <Link
                  href={{
                    pathname: "/admin/therapists/new",
                    query: { specialties: JSON.stringify(specialties) },
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Therapist
                </Link>
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {mounted && (
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search therapists..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    suppressHydrationWarning
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[130px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder="Status" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                      <SelectTrigger className="w-[200px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder="Specialty" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.specialty_id} value={specialty.specialty_name}>
                            {specialty.specialty_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Therapist
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Specialty
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Sessions
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Availability
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Loading therapists...</p>
                      </td>
                    </tr>
                  ) : filteredTherapists.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center">
                        <p className="text-muted-foreground">No therapists found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredTherapists.map((therapist) => (
                      <tr key={therapist.id} className="border-t">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={therapist.pfp || "/placeholder.svg"} alt={therapist.nickname} />
                              <AvatarFallback>{therapist.nickname.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{therapist.nickname}</p>
                              <p className="text-xs text-muted-foreground">{therapist.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{therapist.specialties || "Not specified"}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-2 w-2 rounded-full ${
                                therapist.authorized === 1
                                  ? "bg-green-500"
                                  : therapist.authorized === 0
                                    ? "bg-yellow-500"
                                    : "bg-gray-300"
                              }`}
                            />
                            <span className="capitalize">{getStatusLabel(therapist.authorized)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{therapist.completed_sessions || 0}</td>
                        <td className="px-4 py-3">{therapist.availability || "Not set"}</td>
                        <td className="px-4 py-3 text-right">
                          {mounted && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => openScheduleModal(therapist.id)}>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Manage Schedule
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit Therapist</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {therapist.authorized === 1 ? (
                                  <DropdownMenuItem onClick={() => handleStatusChange(therapist.id, 2)}>
                                    <X className="mr-2 h-4 w-4" />
                                    Disable Therapist
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleStatusChange(therapist.id, 1)}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Activate Therapist
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredTherapists.length}</strong> of <strong>{therapists.length}</strong> therapists
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Therapist Schedule Modal */}
      <TherapistScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        therapistId={selectedTherapist}
      />
    </div>
  )
}
