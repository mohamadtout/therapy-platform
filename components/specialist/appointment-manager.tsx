"use client"

import { useState, useEffect } from "react"
import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { specialistService } from "@/lib/api/api-services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, FileText, CheckCircle, XCircle, Loader2, User } from "lucide-react"
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
import { SessionReportsModal } from "./session-reports-modal"

interface Appointment {
  id: string
  status: string
  date: string
  start: string
  end: string
  patient_name: string
  patient_pfp: string | null
}
interface AppointmentManagerProps {
  onPendingAppointmentResolved?: () => void
}

export function AppointmentManager({ onPendingAppointmentResolved }: AppointmentManagerProps) {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [pendingLoading, setPendingLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState("upcoming")
  const [processingAppointment, setProcessingAppointment] = useState<string | null>(null)
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [selectedPatientName, setSelectedPatientName] = useState<string>("")

  // Get current week days
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }) // Start from Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i))

  useEffect(() => {
    fetchAppointments()
    fetchPendingAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await specialistService.getAppointments()
      setAppointments(response.data.appointments || [])
    } catch (error) {
      console.error("Error fetching appointments:", error)
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchPendingAppointments = async () => {
    try {
      setPendingLoading(true)
      const response = await specialistService.getPendingAppointments()
      setPendingAppointments(response.data.appointments || [])
    } catch (error) {
      console.error("Error fetching pending appointments:", error)
      toast({
        title: "Error",
        description: "Failed to load pending appointments. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPendingLoading(false)
    }
  }

  const handleApproveAppointment = async (id: string) => {
    try {
      setProcessingAppointment(id)
      await specialistService.approveAppointment(id)

      // Update local state
      setPendingAppointments(pendingAppointments.filter((app) => app.id !== id))

      if (onPendingAppointmentResolved) {
        onPendingAppointmentResolved()
      }
      // Refresh appointments list
      await fetchAppointments()

      toast({
        title: "Appointment approved",
        description: "The appointment has been approved successfully.",
      })
    } catch (error) {
      console.error("Error approving appointment:", error)
      toast({
        title: "Error",
        description: "Failed to approve appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessingAppointment(null)
    }
  }

  const handleRejectAppointment = async (id: string) => {
    try {
      setProcessingAppointment(id)
      await specialistService.rejectAppointment(id)

      // Update local state
      setPendingAppointments(pendingAppointments.filter((app) => app.id !== id))

      if (onPendingAppointmentResolved) {
        onPendingAppointmentResolved()
      }
      // Refresh appointments list
      await fetchAppointments()

      toast({
        title: "Appointment rejected",
        description: "The appointment has been rejected successfully.",
      })
    } catch (error) {
      console.error("Error rejecting appointment:", error)
      toast({
        title: "Error",
        description: "Failed to reject appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessingAppointment(null)
    }
  }

  const openReportsModal = (sessionId: string, patientName: string) => {
    setSelectedSessionId(sessionId)
    setSelectedPatientName(patientName)
    setIsReportsModalOpen(true)
  }

  // Filter appointments for selected date
  const filteredAppointments = appointments.filter((appointment) => {
    if (!appointment.date) return false
    const appointmentDate = parseISO(appointment.date)
    return isSameDay(appointmentDate, selectedDate)
  })

  // Sort appointments by start time
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    return a.start.localeCompare(b.start)
  })

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Requests
            {pendingAppointments.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingAppointments.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your appointments for {format(selectedDate, "MMMM d, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex overflow-x-auto gap-2 pb-4">
                {weekDays.map((day, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-lg border ${
                      isSameDay(day, selectedDate) ? "bg-primary text-white" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="text-lg font-bold">{format(day, "d")}</div>
                    <div className="text-xs">{format(day, "EEE")}</div>
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : sortedAppointments.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {sortedAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm">
                            {appointment.start} - {appointment.end}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10">
                              <Image
                                src={appointment.patient_pfp || "/placeholder.svg?height=40&width=40"}
                                alt={appointment.patient_name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold">{appointment.patient_name}</h3>
                              <Badge
                                variant={appointment.status === "Accepted" ? "success" : "destructive"}
                                className="mt-1"
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openReportsModal(appointment.id, appointment.patient_name)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Notes
                          </Button>
                          {appointment.status === "Accepted" && <Button size="sm">Start Session</Button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No appointments scheduled</h3>
                  <p className="text-gray-500 mt-1">
                    You don't have any appointments scheduled for {format(selectedDate, "MMMM d, yyyy")}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Appointment Requests</CardTitle>
              <CardDescription>Review and manage appointment requests from patients</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : pendingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {pendingAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="relative h-12 w-12 flex-shrink-0">
                            <Image
                              src={appointment.patient_pfp || "/placeholder.svg?height=48&width=48"}
                              alt={appointment.patient_name}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold">{appointment.patient_name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {format(parseISO(appointment.date), "MMMM d, yyyy")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {appointment.start} - {appointment.end}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                disabled={processingAppointment === appointment.id}
                              >
                                {processingAppointment === appointment.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : (
                                  <XCircle className="h-4 w-4 mr-1" />
                                )}
                                Reject
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Reject Appointment Request</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to reject this appointment request from{" "}
                                  {appointment.patient_name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRejectAppointment(appointment.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Reject
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveAppointment(appointment.id)}
                            disabled={processingAppointment === appointment.id}
                          >
                            {processingAppointment === appointment.id ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-1" />
                            )}
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <User className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No pending requests</h3>
                  <p className="text-gray-500 mt-1">You don't have any pending appointment requests at the moment.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Session Reports Modal */}
      <SessionReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
        sessionId={selectedSessionId}
        patientName={selectedPatientName}
      />
    </div>
  )
}
