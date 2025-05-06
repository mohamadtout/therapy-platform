"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar as CalendarIcon, Clock, User, Video, MapPin, CheckCircle, XCircle, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO, isToday, isSameMonth, addDays } from "date-fns"

// Sample data
const upcomingAppointments = [
  {
    id: 1,
    clientName: "Ahmed Al-Farsi",
    clientAge: 5,
    date: "2025-03-23",
    time: "2:00 PM - 3:00 PM",
    type: "Speech Therapy",
    format: "In-person",
    location: "Dubai Healthcare City, Building 4",
    status: "Confirmed",
  },
  {
    id: 2,
    clientName: "Fatima Khalid",
    clientAge: 7,
    date: "2025-03-24",
    time: "10:00 AM - 11:00 AM",
    type: "Initial Assessment",
    format: "Virtual",
    location: "Zoom Meeting",
    status: "Confirmed",
  },
  {
    id: 3,
    clientName: "Mohammed Rahman",
    clientAge: 4,
    date: "2025-03-24",
    time: "4:30 PM - 5:30 PM",
    type: "Speech Therapy",
    format: "In-person",
    location: "Dubai Healthcare City, Building 4",
    status: "Pending",
  },
]

const pastAppointments = [
  {
    id: 4,
    clientName: "Ahmed Al-Farsi",
    clientAge: 5,
    date: "2025-03-16",
    time: "2:00 PM - 3:00 PM",
    type: "Speech Therapy",
    format: "In-person",
    location: "Dubai Healthcare City, Building 4",
    status: "Completed",
    notes: true,
  },
  {
    id: 5,
    clientName: "Layla Mahmoud",
    clientAge: 6,
    date: "2025-03-15",
    time: "11:00 AM - 12:00 PM",
    type: "Speech Therapy",
    format: "Virtual",
    location: "Zoom Meeting",
    status: "Completed",
    notes: true,
  },
  {
    id: 6,
    clientName: "Fatima Khalid",
    clientAge: 7,
    date: "2025-03-10",
    time: "3:30 PM - 4:30 PM",
    type: "Initial Assessment",
    format: "In-person",
    location: "Dubai Healthcare City, Building 4",
    status: "Completed",
    notes: false,
  },
]

// Combine all appointments for calendar view
const allAppointments = [...upcomingAppointments, ...pastAppointments];

export default function TherapistAppointments() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [viewMode, setViewMode] = useState("list") // Can be 'list' or 'calendar'
  const [date, setDate] = useState(new Date())
  const [typeFilter, setTypeFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all-format")

  // Filter appointments based on type and format
  const getFilteredAppointments = (appointments) => {
    return appointments.filter(appointment => {
      const matchesType = typeFilter === "all" || 
        (typeFilter === "speech" && appointment.type === "Speech Therapy") ||
        (typeFilter === "assessment" && appointment.type === "Initial Assessment") ||
        (typeFilter === "followup" && appointment.type === "Follow-up Session")
      
      const matchesFormat = formatFilter === "all-format" ||
        (formatFilter === "in-person" && appointment.format === "In-person") ||
        (formatFilter === "virtual" && appointment.format === "Virtual")
      
      return matchesType && matchesFormat
    })
  }

  // Get appointments for the calendar view (filtered by selected month)
  const getCalendarAppointments = () => {
    return allAppointments.filter(appointment => {
      const appointmentDate = parseISO(appointment.date)
      return isSameMonth(appointmentDate, date)
    })
  }

  // Determine if a day has appointments
  const getDayAppointments = (day) => {
    return allAppointments.filter(appointment => {
      return appointment.date === format(day, 'yyyy-MM-dd')
    })
  }

  const renderCalendarDay = (day) => {
    const dayAppointments = getDayAppointments(day)
    const isSelected = day.toDateString() === date.toDateString()
    
    return (
      <div className={`relative h-full w-full p-2 ${isSelected ? 'bg-onesti-purple/10 rounded-md' : ''}`}>
        <time
          dateTime={format(day, 'yyyy-MM-dd')}
          className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
            isToday(day) ? 'bg-onesti-purple text-white' : ''
          }`}
        >
          {format(day, 'd')}
        </time>
        
        {dayAppointments.length > 0 && (
          <div className="mt-1">
            {dayAppointments.map((appointment, index) => (
              <div 
                key={appointment.id} 
                className={`text-xs px-1 py-0.5 mb-1 rounded truncate ${
                  appointment.status === "Completed" ? 'bg-gray-100' : 
                  appointment.status === "Confirmed" ? 'bg-green-100' : 'bg-yellow-100'
                }`}
              >
                {appointment.time.split(' - ')[0]} {appointment.clientName.split(' ')[0]}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/therapist">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage your upcoming and past appointments</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <div className="w-full sm:w-[180px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Appointment Types</SelectItem>
                <SelectItem value="speech">Speech Therapy</SelectItem>
                <SelectItem value="assessment">Initial Assessment</SelectItem>
                <SelectItem value="followup">Follow-up Session</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-[180px]">
            <Select value={formatFilter} onValueChange={setFormatFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-format">All Formats</SelectItem>
                <SelectItem value="in-person">In-person</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button 
            className={viewMode === "list" ? "bg-onesti-purple text-white" : "bg-gray-200 text-gray-700"} 
            onClick={() => setViewMode("list")}
          >
            List View
          </Button>
          <Button 
            className={viewMode === "calendar" ? "bg-onesti-purple text-white" : "bg-gray-200 text-gray-700"}
            onClick={() => setViewMode("calendar")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {getFilteredAppointments(upcomingAppointments).length > 0 ? (
              getFilteredAppointments(upcomingAppointments).map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                          <User className="h-6 w-6 text-onesti-purple" />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.clientName}</h3>
                          <p className="text-sm text-gray-500">Age: {appointment.clientAge}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 md:gap-6">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm">{format(parseISO(appointment.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          {appointment.format === "Virtual" ? (
                            <Video className="mr-2 h-4 w-4 text-gray-500" />
                          ) : (
                            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                          )}
                          <span className="text-sm">{appointment.format}</span>
                        </div>
                        <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"} className="flex items-center">
                          {appointment.status === "Confirmed" ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <XCircle className="mr-1 h-3 w-3" />
                          )}
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {appointment.status === "Confirmed" && (
                          <Button size="sm" className="bg-onesti-purple hover:bg-purple-800 text-white">
                            Start Session
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">Type:</span>
                          <span className="text-sm">{appointment.type}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">Location:</span>
                          <span className="text-sm">{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-2">
                    <CalendarIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium">No Upcoming Appointments</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {typeFilter !== "all" || formatFilter !== "all-format" 
                      ? "No appointments match your filter criteria." 
                      : "You don't have any upcoming appointments scheduled."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {getFilteredAppointments(pastAppointments).length > 0 ? (
              getFilteredAppointments(pastAppointments).map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.clientName}</h3>
                          <p className="text-sm text-gray-500">Age: {appointment.clientAge}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 md:gap-6">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm">{format(parseISO(appointment.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          {appointment.format === "Virtual" ? (
                            <Video className="mr-2 h-4 w-4 text-gray-500" />
                          ) : (
                            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                          )}
                          <span className="text-sm">{appointment.format}</span>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {appointment.notes ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/therapist/notes">
                              View Notes
                            </Link>
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-onesti-purple hover:bg-purple-800 text-white" asChild>
                            <Link href="/therapist/notes">
                              Add Notes
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">Type:</span>
                          <span className="text-sm">{appointment.type}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">Location:</span>
                          <span className="text-sm">{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-2">
                    <CalendarIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium">No Past Appointments</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {typeFilter !== "all" || formatFilter !== "all-format" 
                      ? "No appointments match your filter criteria." 
                      : "You don't have any past appointments to display."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{format(date, 'MMMM yyyy')}</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
              renderDay={renderCalendarDay}
            />

            <div className="mt-6">
              <h4 className="font-medium mb-3">Appointments on {format(date, 'MMMM d, yyyy')}</h4>
              
              {getDayAppointments(date).length > 0 ? (
                <div className="space-y-3">
                  {getDayAppointments(date).map(appointment => (
                    <div 
                      key={appointment.id} 
                      className="p-3 border rounded-md flex justify-between items-center hover:bg-gray-50"
                    >
                      <div>
                        <div className="font-medium">{appointment.clientName}</div>
                        <div className="text-sm text-gray-500">{appointment.time} - {appointment.type}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Badge variant={appointment.status === "Completed" ? "outline" : "default"}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No appointments scheduled for this day</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

