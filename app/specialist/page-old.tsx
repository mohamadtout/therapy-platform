"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, MessageCircle, User, CheckCircle } from "lucide-react"
import { specialistService } from "@/lib/api/api-services"

interface Profile {
  nickname: string,
  pfp: string,
  email: string,
  phone: string,
  address: string
}

export default function SpecialistDashboardPage() {
  const [activeTab, setActiveTab] = useState("schedule")
  const [profile, setProfile] = useState<Profile|any>(null)

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

  const patients = [
    {
      id: 1,
      name: "Alex Johnson",
      age: "3 years, 2 months",
      parent: "Sarah Johnson",
      package: "Thrive Path",
      lastSession: "Mar 15, 2023",
      nextSession: "Today, 10:30 AM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Emma Wilson",
      age: "4 years, 5 months",
      parent: "James Wilson",
      package: "Empower Path",
      lastSession: "Mar 12, 2023",
      nextSession: "Today, 2:00 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Noah Garcia",
      age: "2 years, 8 months",
      parent: "Maria Garcia",
      package: "Nurture Path",
      lastSession: "Mar 10, 2023",
      nextSession: "Tomorrow, 9:15 AM",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

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
                      src="/placeholder.svg?height=120&width=120"
                      alt="Dr. Emily Parker"
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white"
                    />
                    <div className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>

              <div className="pt-16 pb-6 px-4 text-center">
                <h2 className="text-2xl font-bold">Dr. Emily Parker</h2>
                <p className="text-gray-500">Speech-Language Pathologist</p>
                <p className="text-gray-500 mt-1">ID: SP254654</p>
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
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex overflow-x-auto gap-2 pb-4">
                      {[19, 20, 21, 22, 23].map((day, index) => (
                        <div
                          key={day}
                          className={`flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-lg border ${day === 21 ? "bg-primary text-white" : "hover:bg-gray-50"}`}
                        >
                          <div className="text-lg font-bold">{day}</div>
                          <div className="text-xs">{["Mon", "Tue", "Wed", "Thu", "Fri"][index]}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm">
                                {session.time}
                              </div>
                              <div>
                                <h3 className="font-bold">{session.patient}</h3>
                                <p className="text-sm text-gray-500">
                                  {session.age} • {session.type}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                Notes
                              </Button>
                              <Button size="sm">Start Session</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Weekly Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Calendar view would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patients">
                <Card>
                  <CardHeader>
                    <CardTitle>My Patients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {patients.map((patient) => (
                        <div key={patient.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <Image
                              src={patient.image || "/placeholder.svg"}
                              alt={patient.name}
                              width={60}
                              height={60}
                              className="rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-bold">{patient.name}</h3>
                                  <p className="text-sm text-gray-500">
                                    {patient.age} • {patient.package}
                                  </p>
                                </div>
                                <Button size="sm">View Profile</Button>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                  <p className="text-sm text-gray-500">Parent/Guardian</p>
                                  <p className="font-medium">{patient.parent}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Last Session</p>
                                  <p className="font-medium">{patient.lastSession}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Next Session</p>
                                  <p className="font-medium">{patient.nextSession}</p>
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

