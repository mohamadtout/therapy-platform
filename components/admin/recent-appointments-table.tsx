"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, Clock, MoreHorizontal } from "lucide-react"
import { adminAppointmentService, type AppointmentData } from "@/lib/api/api-services"
import { useToast } from "@/components/ui/use-toast"

export default function RecentAppointmentsTable() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true)
        const response = await adminAppointmentService.getAllAppointments(0)
        // Only take the first 5 appointments for the dashboard
        setAppointments(response.data.appointments.slice(0, 5))
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

    fetchAppointments()
  }, [toast])

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await adminAppointmentService.editAppointment({ editId: id, status })

      // Update the local state
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment)),
      )

      toast({
        title: "Status Updated",
        description: `Appointment status has been updated to ${status}`,
      })
    } catch (error) {
      console.error("Error updating appointment status:", error)
      toast({
        title: "Error",
        description: "Failed to update appointment status. Please try again.",
        variant: "destructive",
      })
    }
  }

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

  if (loading) {
    return <div className="flex items-center justify-center p-6">Loading appointments...</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-sm font-medium text-muted-foreground">
            <th className="pb-3 pl-4">Client</th>
            <th className="pb-3">Therapist</th>
            <th className="pb-3">Schedule</th>
            <th className="pb-3 pr-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-6 text-center text-muted-foreground">
                No appointments found
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b last:border-0">
                <td className="py-3 pl-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={appointment.patient_pfp || "/placeholder.svg"} alt={appointment.patient_name} />
                      <AvatarFallback>{appointment.patient_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{appointment.patient_name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div>
                    <p className="font-medium">{appointment.therapist_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {Array.isArray(appointment.specialty) ? appointment.specialty[0] : appointment.specialty}
                    </p>
                  </div>
                </td>
                <td className="py-3">
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
                <td className="py-3 pr-4 text-right">
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
                      <DropdownMenuItem onSelect={() => handleStatusChange(appointment.id, "Confirmed")}>
                        Mark as Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleStatusChange(appointment.id, "Completed")}>
                        Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleStatusChange(appointment.id, "Pending")}>
                        Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onSelect={() => handleDeleteAppointment(appointment.id)}
                      >
                        Cancel Appointment
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
  )
}
