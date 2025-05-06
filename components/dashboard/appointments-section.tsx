"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Paperclip, MessageCircle, X } from "lucide-react"
import Image from "next/image"
import { AppointmentBookingModal } from "./appointment-booking/appointment-booking-modal"
import { UploadReportModal } from "./upload-report-modal"
import { ViewReportsModal } from "./view-reports-modal"

interface AppointmentsSectionProps {
  userId: string
  children: any[]
  upcomingSessions: any[] // Keep for backward compatibility
  activeChild: any | null
  onReschedule: (appointment: any) => void
  onCancel: (appointmentId: number) => void
  onUploadDoc: (appointment: any) => void
  onViewDocs: (appointment: any) => void
  onStartChat: (specialist: string) => void
  onAttendAppointment: (session: any) => void
  appointments?: Array<{
    id: string
    status: string
    date: string
    start: string
    end: string
    therapist_name: string
    therapist_pfp: string | null
  }>
}

export function AppointmentsSection({
  userId,
  children,
  upcomingSessions,
  activeChild,
  onReschedule,
  onCancel,
  onUploadDoc,
  onViewDocs,
  onStartChat,
  onAttendAppointment,
  appointments,
}: AppointmentsSectionProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isUploadReportOpen, setIsUploadReportOpen] = useState(false)
  const [isViewReportsOpen, setIsViewReportsOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleBookAppointment = () => {
    setIsBookingOpen(true)
  }

  const handleBookingSuccess = () => {
    // You could add a refresh function here if needed
  }

  const handleUploadReport = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsUploadReportOpen(true)
  }

  const handleViewReports = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsViewReportsOpen(true)
  }

  const handleReportsUpdated = () => {
    // Trigger a refresh when reports are updated
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Upcoming Appointments</h3>
              <Button onClick={handleBookAppointment}>Book New Appointment</Button>
            </div>

            {appointments && appointments.length > 0 ? (
              <div className="space-y-4">
                {activeChild
                  ? appointments
                      .filter((appointment) => {
                        // Filter by active child if needed
                        // This would need to be updated based on how child data is linked to appointments
                        return true // For now, show all appointments
                      })
                      .map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4">
                          <div className="flex items-center gap-4">
                            <Image
                              src={appointment.therapist_pfp || "/placeholder.svg?height=60&width=60"}
                              alt={appointment.therapist_name}
                              width={60}
                              height={60}
                              className="rounded-full"
                            />
                            <div>
                              <h3 className="font-bold">{appointment.therapist_name}</h3>
                              <p className="text-sm text-gray-500">{appointment.status}</p>
                              {activeChild && <p className="text-xs text-primary mt-1">For: {activeChild.name}</p>}
                            </div>
                            <div className="ml-auto flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => onReschedule(appointment)}>
                                Reschedule
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => onCancel(Number(appointment.id))}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            {appointment.date} - {appointment.start} to {appointment.end}
                          </div>

                          <div className="mt-4 flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => handleUploadReport(appointment)}>
                              <Paperclip className="h-4 w-4 mr-2" />
                              Upload Report
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleViewReports(appointment)}>
                              View Reports
                            </Button>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => onStartChat(appointment.therapist_name)}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Chat Now
                            </Button>
                            <Button className="flex-1" onClick={() => onAttendAppointment(appointment)}>
                              Attend
                            </Button>
                          </div>
                        </div>
                      ))
                  : appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src={appointment.therapist_pfp || "/placeholder.svg?height=60&width=60"}
                            alt={appointment.therapist_name}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-bold">{appointment.therapist_name}</h3>
                            <p className="text-sm text-gray-500">{appointment.status}</p>
                          </div>
                          <div className="ml-auto flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => onReschedule(appointment)}>
                              Reschedule
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => onCancel(Number(appointment.id))}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          {appointment.date} - {appointment.start} to {appointment.end}
                        </div>

                        <div className="mt-4 flex justify-between">
                          <Button variant="outline" size="sm" onClick={() => handleUploadReport(appointment)}>
                            <Paperclip className="h-4 w-4 mr-2" />
                            Upload Report
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleViewReports(appointment)}>
                            View Reports
                          </Button>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => onStartChat(appointment.therapist_name)}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat Now
                          </Button>
                          <Button className="flex-1" onClick={() => onAttendAppointment(appointment)}>
                            Attend
                          </Button>
                        </div>
                      </div>
                    ))}
              </div>
            ) : upcomingSessions.length > 0 ? (
              // Fallback to the mock data if no real appointments are available
              <div className="space-y-4">
                {activeChild
                  ? upcomingSessions
                      .filter((session) => session.child === activeChild.name)
                      .map((session) => (
                        <div key={session.id} className="border rounded-lg p-4">
                          <div className="flex items-center gap-4">
                            <Image
                              src="/placeholder.svg?height=60&width=60"
                              alt={session.specialist}
                              width={60}
                              height={60}
                              className="rounded-full"
                            />
                            <div>
                              <h3 className="font-bold">{session.specialist}</h3>
                              <p className="text-sm text-gray-500">{session.specialty}</p>
                              <p className="text-xs text-primary mt-1">For: {session.child}</p>
                            </div>
                            <div className="ml-auto flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => onReschedule(session)}>
                                Reschedule
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => onCancel(session.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            {session.date} - {session.time}
                          </div>

                          <div className="mt-4 flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => handleUploadReport(session)}>
                              <Paperclip className="h-4 w-4 mr-2" />
                              Upload Report
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleViewReports(session)}>
                              View Reports
                            </Button>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => onStartChat(session.specialist)}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Chat Now
                            </Button>
                            <Button className="flex-1" onClick={() => onAttendAppointment(session)}>
                              Attend
                            </Button>
                          </div>
                        </div>
                      ))
                  : upcomingSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src="/placeholder.svg?height=60&width=60"
                            alt={session.specialist}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-bold">{session.specialist}</h3>
                            <p className="text-sm text-gray-500">{session.specialty}</p>
                            <p className="text-xs text-primary mt-1">For: {session.child}</p>
                          </div>
                          <div className="ml-auto flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => onReschedule(session)}>
                              Reschedule
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => onCancel(session.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          {session.date} - {session.time}
                        </div>

                        <div className="mt-4 flex justify-between">
                          <Button variant="outline" size="sm" onClick={() => handleUploadReport(session)}>
                            <Paperclip className="h-4 w-4 mr-2" />
                            Upload Report
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleViewReports(session)}>
                            View Reports
                          </Button>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" className="flex-1" onClick={() => onStartChat(session.specialist)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat Now
                          </Button>
                          <Button className="flex-1" onClick={() => onAttendAppointment(session)}>
                            Attend
                          </Button>
                        </div>
                      </div>
                    ))}

                {activeChild &&
                  upcomingSessions.filter((session) => session.child === activeChild.name).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No upcoming appointments for {activeChild.name}
                    </div>
                  )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No upcoming appointments</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Past Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">No past appointments found</div>
        </CardContent>
      </Card>

      <AppointmentBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        userId={userId}
        children={children}
        onSuccess={handleBookingSuccess}
      />

      <UploadReportModal
        isOpen={isUploadReportOpen}
        onClose={() => setIsUploadReportOpen(false)}
        appointment={selectedAppointment}
        userId={userId}
      />

      <ViewReportsModal
        isOpen={isViewReportsOpen}
        onClose={() => setIsViewReportsOpen(false)}
        appointment={selectedAppointment}
        userId={userId}
        onReportsUpdated={handleReportsUpdated}
      />
    </>
  )
}
