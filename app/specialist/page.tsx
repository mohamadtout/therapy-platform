"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, MessageCircle, User, CheckCircle, LogOut, Settings, Loader2, FileIcon } from "lucide-react"
import { specialistService, Profile, Specialty } from "@/lib/api/api-services"
import { ProfileSettings } from "@/components/specialist/profile-settings"
import { useToast } from "@/hooks/use-toast"
import { WeeklyCalendar } from "@/components/specialist/weekly-calendar"
import { AppointmentManager } from "@/components/specialist/appointment-manager"
import { PatientDocumentsModal } from "@/components/specialist/patient-documents-modal"

interface Session {
  id: string
  date: string
  start: string
  end: string
}

interface Patient {
  child_id: string
  child_name: string
  parent_id: string
  parent_name: string
  patient_pfp: string | null
  nextSession: Session | null
  lastSession: Session | null
}

export default function SpecialistDashboardPage() {
  const [activeTab, setActiveTab] = useState("schedule")
  const [profile, setProfile] = useState<Profile | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPatientsLoading, setIsPatientsLoading] = useState(true)
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(null)
  const { toast } = useToast()

  // Mock user ID - in a real app, this would come from authentication
  const userId = "1" // Replace with actual user ID from auth context

  useEffect(() => {
    fetchProfile()
    fetchPatients()
  }, [])

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const response = await specialistService.getProfile()
      // console.log(response.data)
      setProfile(response.data.details)
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  const fetchPatients = async () => {
    setIsPatientsLoading(true)
    try {
      const response = await specialistService.getPatients()
      setPatients(response.data.patients || [])
    } catch (error) {
      console.error("Error fetching patients:", error)
      toast({
        title: "Error",
        description: "Failed to load patients data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPatientsLoading(false)
    }
  }

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile)
  }
  const handlePendingAppointmentResolved = () => {
    // Decrease the pendingRequests count in the profile
    if (profile && profile.pendingRequests > 0) {
      setProfile({
        ...profile,
        pendingRequests: profile.pendingRequests - 1,
      })
    }
  }
  const openDocumentsModal = (patientId: string, patientName: string) => {
    setSelectedPatient({ id: patientId, name: patientName })
    setDocumentsModalOpen(true)
  }

  const formatSessionDate = (dateString: string) => {
    if (!dateString) return ""

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const date = new Date(dateString)
    date.setHours(0, 0, 0, 0)

    if (date.getTime() === today.getTime()) {
      return "Today"
    } else if (date.getTime() === tomorrow.getTime()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  const formatSessionTime = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return ""

    // Convert 24-hour format to 12-hour format
    const formatTime = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(":")
      const hour = Number.parseInt(hours, 10)
      const ampm = hour >= 12 ? "PM" : "AM"
      const hour12 = hour % 12 || 12
      return `${hour12}:${minutes} ${ampm}`
    }

    return `${formatTime(startTime)} - ${formatTime(endTime)}`
  }

  const logout = () => {
    // Clear user session and redirect to login page
    localStorage.removeItem("token")
    localStorage.removeItem("level")
    // console.log("AAAH")
    toast({
      title: "Logged Out Successfully!",
      description: "Redirecting You to Login Page",
      variant: "default",
    })
    setTimeout(() => {
      window.location.href = "/login"
    }, 1500)
  }

  // Mock data
  const upcomingSessions = [
    {
      id: 1,
      patient: "Alex Johnson",
      age: "3 years, 2 months",
      date: "Today",
      time: "10:30 AM",
      type: "Speech Therapy",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Emma Wilson",
      age: "4 years, 5 months",
      date: "Today",
      time: "2:00 PM",
      type: "Behavioral Therapy",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Noah Garcia",
      age: "2 years, 8 months",
      date: "Tomorrow",
      time: "9:15 AM",
      type: "Developmental Assessment",
      status: "pending",
    },
  ]

  // const patients = [
  //   {
  //     id: 1,
  //     name: "Alex Johnson",
  //     age: "3 years, 2 months",
  //     parent: "Sarah Johnson",
  //     package: "Thrive Path",
  //     lastSession: "Mar 15, 2023",
  //     nextSession: "Today, 10:30 AM",
  //     image: "/placeholder.svg?height=60&width=60",
  //   },
  //   {
  //     id: 2,
  //     name: "Emma Wilson",
  //     age: "4 years, 5 months",
  //     parent: "James Wilson",
  //     package: "Empower Path",
  //     lastSession: "Mar 12, 2023",
  //     nextSession: "Today, 2:00 PM",
  //     image: "/placeholder.svg?height=60&width=60",
  //   },
  //   {
  //     id: 3,
  //     name: "Noah Garcia",
  //     age: "2 years, 8 months",
  //     parent: "Maria Garcia",
  //     package: "Nurture Path",
  //     lastSession: "Mar 10, 2023",
  //     nextSession: "Tomorrow, 9:15 AM",
  //     image: "/placeholder.svg?height=60&width=60",
  //   },
  // ]

  const reports = [
    {
      id: 1,
      patient: "Alex Johnson",
      type: "Progress Report",
      date: "Mar 15, 2023",
      status: "completed",
    },
    {
      id: 2,
      patient: "Emma Wilson",
      type: "Assessment Report",
      date: "Mar 12, 2023",
      status: "completed",
    },
    {
      id: 3,
      patient: "Noah Garcia",
      type: "Initial Assessment",
      date: "Mar 10, 2023",
      status: "pending",
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Profile Section */}
              <div className="relative">
                <div className="bg-blue-900 h-32"></div>
                <div className="absolute top-16 left-0 w-full flex justify-center">
                  <div className="relative">
                    <Image
                      src={profile?.pfp || "/placeholder.svg?height=120&width=120"}
                      alt={profile?.nickname || "Specialist"}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white"
                    />
                    <div className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>

              <div className="pt-16 pb-6 px-4 text-center">
                <h2 className="text-2xl font-bold">{profile?.nickname || "Loading..."}</h2>
                <p className="text-gray-500">Specialist</p>
                {profile && profile?.pendingRequests > 0 && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {profile.pendingRequests} pending request{profile.pendingRequests > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="border-t">
                <button
                  className={`flex items-center gap-3 px-4 py-3 w-full text-left ${activeTab === "schedule" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveTab("schedule")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Schedule</span>
                </button>
                <button
                  className={`flex items-center gap-3 px-4 py-3 w-full text-left ${activeTab === "patients" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveTab("patients")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Patients</span>
                </button>
                <button
                  className={`flex items-center gap-3 px-4 py-3 w-full text-left ${activeTab === "reports" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveTab("reports")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Reports</span>
                </button>
                <button
                  className={`flex items-center gap-3 px-4 py-3 w-full text-left ${activeTab === "messages" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveTab("messages")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Messages</span>
                </button>
                <button
                  className={`flex items-center gap-3 px-4 py-3 w-full text-left ${activeTab === "settings" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Settings</span>
                </button>
                <a
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 text-red-500 cursor-pointer"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Logout</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="schedule">
              <AppointmentManager onPendingAppointmentResolved={handlePendingAppointmentResolved}/>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Weekly Overview</CardTitle>
                    <CardDescription>Manage your availability for appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <WeeklyCalendar />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patients">
                <Card>
                  <CardHeader>
                    <CardTitle>My Patients</CardTitle>
                    <CardDescription>View and manage your patients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isPatientsLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : patients.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>No patients found.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {patients.map((patient) => (
                          <div key={patient.child_id} className="border rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <Image
                                src={patient.patient_pfp || "/placeholder.svg?height=60&width=60"}
                                alt={patient.child_name}
                                width={60}
                                height={60}
                                className="rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="font-bold">{patient.child_name}</h3>
                                    <p className="text-sm text-gray-500">Parent: {patient.parent_name}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Last Session</p>
                                    <p className="font-medium">
                                      {patient.lastSession
                                        ? `${formatSessionDate(patient.lastSession.date)}, ${formatSessionTime(patient.lastSession.start, patient.lastSession.end)}`
                                        : "No previous sessions"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Next Session</p>
                                    <p className="font-medium">
                                      {patient.nextSession
                                        ? `${formatSessionDate(patient.nextSession.date)}, ${formatSessionTime(patient.nextSession.start, patient.nextSession.end)}`
                                        : "No upcoming sessions"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Actions</p>
                                    <div className="flex gap-2 mt-1">
                                      <Button variant="outline" size="sm">
                                        <FileText className="h-3 w-3 mr-1" />
                                        Reports
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <MessageCircle className="h-3 w-3 mr-1" />
                                        Message
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openDocumentsModal(patient.parent_id, patient.child_name)}
                                      >
                                        <FileIcon className="h-3 w-3 mr-1" />
                                        Documents
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports & Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Recent Reports</h3>
                        <Button size="sm">Create New Report</Button>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left py-3 px-4">Patient</th>
                              <th className="text-left py-3 px-4">Type</th>
                              <th className="text-left py-3 px-4">Date</th>
                              <th className="text-left py-3 px-4">Status</th>
                              <th className="text-right py-3 px-4">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.map((report) => (
                              <tr key={report.id} className="border-t">
                                <td className="py-3 px-4">{report.patient}</td>
                                <td className="py-3 px-4">{report.type}</td>
                                <td className="py-3 px-4">{report.date}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      report.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {report.status === "completed" ? (
                                      <CheckCircle className="mr-1 h-3 w-3" />
                                    ) : (
                                      <Clock className="mr-1 h-3 w-3" />
                                    )}
                                    {report.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="outline" size="sm">
                                    {report.status === "completed" ? "View" : "Complete"}
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <h3 className="font-medium">Templates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                          <h4 className="font-medium">Progress Report</h4>
                          <p className="text-sm text-gray-500 mt-1">Standard template for tracking progress</p>
                        </div>
                        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                          <h4 className="font-medium">Assessment Report</h4>
                          <p className="text-sm text-gray-500 mt-1">Comprehensive assessment documentation</p>
                        </div>
                        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                          <h4 className="font-medium">Session Notes</h4>
                          <p className="text-sm text-gray-500 mt-1">Quick template for session documentation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Messaging interface would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                {profile ? (
                  <ProfileSettings
                    profile={profile}
                    userId={userId}
                    onProfileUpdate={handleProfileUpdate}
                    isLoading={isLoading}
                  />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center py-10">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {/* Patient Documents Modal */}
      {selectedPatient && (
        <PatientDocumentsModal
          isOpen={documentsModalOpen}
          onClose={() => setDocumentsModalOpen(false)}
          patientId={selectedPatient.id}
          patientName={selectedPatient.name}
        />
      )}
    </div>
  )
}
