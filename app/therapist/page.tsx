import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, FileText, CheckCircle, Plus } from "lucide-react"
import Link from "next/link"

export default function TherapistDashboard() {
  // Sample data for the dashboard
  const upcomingAppointments = [
    {
      id: 1,
      clientName: "Ahmed Al-Farsi",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      type: "Speech Therapy",
      status: "Confirmed",
    },
    {
      id: 2,
      clientName: "Fatima Khalid",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      type: "Initial Assessment",
      status: "Confirmed",
    },
    {
      id: 3,
      clientName: "Mohammed Rahman",
      date: "Mar 24, 2025",
      time: "4:30 PM - 5:30 PM",
      type: "Speech Therapy",
      status: "Pending",
    },
  ]

  const recentClients = [
    { id: 1, name: "Ahmed Al-Farsi", age: 5, sessions: 8, lastSession: "Mar 20, 2025" },
    { id: 2, name: "Fatima Khalid", age: 7, sessions: 3, lastSession: "Mar 18, 2025" },
    { id: 3, name: "Mohammed Rahman", age: 4, sessions: 1, lastSession: "Mar 15, 2025" },
    { id: 4, name: "Layla Mahmoud", age: 6, sessions: 12, lastSession: "Mar 10, 2025" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Therapist Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/therapist/appointments/new">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
          <Button asChild>
            <Link href="/therapist/appointments">
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">3 more scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Completed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes Pending</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/therapist/notes" className="text-onesti-purple hover:underline">Complete now</Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Link 
                  key={appointment.id} 
                  href={`/therapist/appointments/${appointment.id}`} 
                  className="block hover:bg-gray-50 transition-colors rounded-md"
                >
                  <div className="flex items-start space-x-4 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <Calendar className="h-5 w-5 text-onesti-purple" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{appointment.clientName}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium text-gray-700">{appointment.date}</span>
                        <span className="mx-1">•</span>
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{appointment.type}</span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            appointment.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appointment.status === "Confirmed" && <CheckCircle className="mr-1 h-3 w-3 text-green-500" />}
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/therapist/appointments">View All Appointments</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/therapist/availability">Manage Availability</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Your active client list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-2 p-3 text-xs font-medium text-gray-500">
                  <div className="col-span-2">Name</div>
                  <div className="text-center">Age</div>
                  <div className="text-center">Sessions</div>
                  <div className="text-right">Last Session</div>
                </div>
                {recentClients.map((client) => (
                  <Link 
                    key={client.id} 
                    href={`/therapist/clients/${client.id}`}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-5 gap-2 border-t p-3 text-sm">
                      <div className="col-span-2 font-medium">{client.name}</div>
                      <div className="text-center">{client.age}</div>
                      <div className="text-center">{client.sessions}</div>
                      <div className="text-right text-gray-500">{client.lastSession}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/therapist/clients">View All Clients</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/therapist/clients/new">Add New Client</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

