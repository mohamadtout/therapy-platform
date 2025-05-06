"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ArrowUpDown, Calendar, Clock, Download, Filter, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  adminAppointmentService,
  type AppointmentData,
  type PatientData,
  type TherapistData,
  type SpecialtyData,
} from "@/lib/api/api-services"

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null)
  const [appointments, setAppointments] = useState<AppointmentData[]>([])
  const [patients, setPatients] = useState<PatientData[]>([])
  const [therapists, setTherapists] = useState<TherapistData[]>([])
  const [specialties, setSpecialties] = useState<SpecialtyData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const [editingAppointment, setEditingAppointment] = useState<{
    id: string
    status: string
  }>({
    id: "",
    status: "",
  })

  const [newAppointment, setNewAppointment] = useState<{
    userId: string
    therapist_id: string
    date: string
    time: {
      start: string
      end: string
    }
  }>({
    userId: "",
    therapist_id: "",
    date: "",
    time: {
      start: "",
      end: "",
    },
  })

  const { toast } = useToast()

  useEffect(() => {
    fetchAppointments(0)
  }, [])

  const fetchAppointments = async (page: number) => {
    try {
      setLoading(true)
      const response = await adminAppointmentService.getAllAppointments(page)

      if (page === 0) {
        setAppointments(response.data.appointments)
        setPatients(response.data.patients)
        setTherapists(response.data.therapists)
        setSpecialties(response.data.specialties)
      } else {
        setAppointments((prev) => [...prev, ...response.data.appointments])
      }

      // Check if we have more data to load
      setHasMore(response.data.appointments.length === 10)
      setCurrentPage(page)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter appointments based on search term and filters
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.therapist_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(appointment.specialty) &&
        appointment.specialty.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesStatus = statusFilter === "all" || appointment.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesSpecialty =
      specialtyFilter === "all" ||
      (Array.isArray(appointment.specialty) &&
        appointment.specialty.some((s) => s.toLowerCase() === specialtyFilter.toLowerCase()))

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  // Get unique specialties for filter
  const uniqueSpecialties = Array.from(
    new Set(
      appointments.flatMap((appointment) =>
        Array.isArray(appointment.specialty) ? appointment.specialty : [appointment.specialty],
      ),
    ),
  )

  // Handler for form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target

    if (name === "start" || name === "end") {
      setNewAppointment((prev) => ({
        ...prev,
        time: {
          ...prev.time,
          [name]: value,
        },
      }))
    } else {
      setNewAppointment((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handler for creating a new appointment
  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await adminAppointmentService.createAppointment({
        date: newAppointment.date,
        time: newAppointment.time,
        userId: newAppointment.userId,
        therapist_id: newAppointment.therapist_id,
      })

      toast({
        title: "Appointment Created",
        description: `Appointment scheduled for ${new Date(newAppointment.date).toLocaleDateString()} at ${newAppointment.time.start}`,
      })

      // Refresh appointments
      fetchAppointments(0)

      setIsModalOpen(false)
      // Reset form
      setNewAppointment({
        userId: "",
        therapist_id: "",
        date: "",
        time: {
          start: "",
          end: "",
        },
      })
    } catch (error) {
      console.error("Error creating appointment:", error)
      toast({
        title: "Error",
        description: "Failed to create appointment. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handler for editing an appointment
  const handleEditClick = (appointment: AppointmentData) => {
    setSelectedAppointment(appointment)
    setEditingAppointment({
      id: appointment.id,
      status: appointment.status,
    })
    setIsEditModalOpen(true)
  }

  // Handler for form input changes in edit dialog
  const handleEditInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target
    setEditingAppointment((prev) => ({ ...prev, [name]: value }))
  }

  // Handler for updating an appointment
  const handleUpdateAppointment = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await adminAppointmentService.editAppointment({
        editId: editingAppointment.id,
        status: editingAppointment.status,
      })

      // Update local state
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === editingAppointment.id
            ? { ...appointment, status: editingAppointment.status }
            : appointment,
        ),
      )

      toast({
        title: "Appointment Updated",
        description: `Appointment status has been updated to ${editingAppointment.status}.`,
      })

      setIsEditModalOpen(false)
    } catch (error) {
      console.error("Error updating appointment:", error)
      toast({
        title: "Error",
        description: "Failed to update appointment. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handler for deleting an appointment
  const handleDeleteAppointment = async (id: string) => {
    try {
      await adminAppointmentService.deleteAppointment(id)

      // Remove from local state
      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== id))

      toast({
        title: "Appointment Deleted",
        description: "The appointment has been successfully deleted.",
      })
    } catch (error) {
      console.error("Error deleting appointment:", error)
      toast({
        title: "Error",
        description: "Failed to delete appointment. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Function to export table data to CSV
  const exportToCSV = (data: AppointmentData[]) => {
    // Column headers
    const headers = ["Client", "Therapist", "Specialty", "Date", "Time", "Status"]

    // Format data rows
    const rows = data.map((appointment) => [
      appointment.patient_name,
      appointment.therapist_name,
      Array.isArray(appointment.specialty) ? appointment.specialty.join(", ") : appointment.specialty,
      new Date(appointment.date).toLocaleDateString(),
      `${appointment.start} - ${appointment.end}`,
      appointment.status,
    ])

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `appointments-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Appointment Management" description="View and manage scheduled sessions" />

      <main className="p-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Manage therapy sessions, consultations, and assessments</CardDescription>
            </div>
            <div className="mt-4 flex flex-col sm:mt-0 sm:flex-row sm:gap-2">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Appointment</DialogTitle>
                    <DialogDescription>Schedule a new appointment for a client with a therapist.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateAppointment}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="userId" className="text-right">
                          Client
                        </Label>
                        <Select
                          name="userId"
                          value={newAppointment.userId}
                          onValueChange={(value) => handleInputChange({ target: { name: "userId", value } })}
                          required
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a client" />
                          </SelectTrigger>
                          <SelectContent>
                            {patients.map((patient) => (
                              <SelectItem key={patient.id} value={patient.id}>
                                {patient.id} - {patient.nickname}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="therapist_id" className="text-right">
                          Therapist
                        </Label>
                        <Select
                          name="therapist_id"
                          value={newAppointment.therapist_id}
                          onValueChange={(value) => handleInputChange({ target: { name: "therapist_id", value } })}
                          required
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a therapist" />
                          </SelectTrigger>
                          <SelectContent>
                            {therapists.map((therapist) => (
                              <SelectItem key={therapist.id} value={therapist.id}>
                                {therapist.nickname}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={newAppointment.date}
                          onChange={handleInputChange}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start" className="text-right">
                          Start Time
                        </Label>
                        <Input
                          id="start"
                          name="start"
                          type="time"
                          value={newAppointment.time.start}
                          onChange={handleInputChange}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="end" className="text-right">
                          End Time
                        </Label>
                        <Input
                          id="end"
                          name="end"
                          type="time"
                          value={newAppointment.time.end}
                          onChange={handleInputChange}
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Appointment</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={() => exportToCSV(filteredAppointments)}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search appointments..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Specialty" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {uniqueSpecialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty.toLowerCase()}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Client
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Therapist
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Date & Time
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
                    <th className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-muted-foreground">
                        Loading appointments...
                      </td>
                    </tr>
                  ) : filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-muted-foreground">
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-t">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={appointment.patient_pfp || "/placeholder.svg"}
                                alt={appointment.patient_name}
                              />
                              <AvatarFallback>{appointment.patient_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{appointment.patient_name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={appointment.therapist_pfp || "/placeholder.svg"}
                                alt={appointment.therapist_name}
                              />
                              <AvatarFallback>{appointment.therapist_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{appointment.therapist_name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>
                                {appointment.start} - {appointment.end}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            {Array.isArray(appointment.specialty) ? (
                              appointment.specialty.map((spec, index) => (
                                <span
                                  key={index}
                                  className="inline-block rounded-full bg-muted px-2 py-1 text-xs mr-1 mb-1"
                                >
                                  {spec}
                                </span>
                              ))
                            ) : (
                              <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs">
                                {appointment.specialty}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-2 w-2 rounded-full ${
                                appointment.status.toLowerCase() === "confirmed" || appointment.status.toLowerCase() === "accepted"
                                  ? "bg-green-500"
                                  : appointment.status.toLowerCase() === "pending"
                                    ? "bg-yellow-500"
                                    : appointment.status.toLowerCase() === "completed"
                                      ? "bg-blue-500"
                                      : "bg-red-500"
                              }`}
                            />
                            <span className="capitalize">{appointment.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
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
                              <DropdownMenuItem onSelect={() => handleEditClick(appointment)}>
                                Edit Status
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onSelect={() => handleDeleteAppointment(appointment.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Appointment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredAppointments.length}</strong> of <strong>{appointments.length}</strong>{" "}
                appointments
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 0}
                  onClick={() => fetchAppointments(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!hasMore}
                  onClick={() => fetchAppointments(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment Status</DialogTitle>
            <DialogDescription>
              Update the status for {selectedAppointment?.patient_name}'s appointment with{" "}
              {selectedAppointment?.therapist_name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateAppointment}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  name="status"
                  value={editingAppointment.status}
                  onValueChange={(value) => handleEditInputChange({ target: { name: "status", value } })}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Status</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
