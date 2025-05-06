"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, FileText } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"

// Sample data - in a real application, this would be fetched from an API
const clients = [
  {
    id: 1,
    name: "Ahmed Al-Farsi",
    age: 5,
    parent: "Samir Al-Farsi",
    sessions: 8,
    lastSession: "Mar 20, 2025",
    nextSession: "Mar 23, 2025",
    status: "Active",
    concerns: ["Speech delay", "Articulation disorder"],
    progress: "Good",
    description: "Ahmed is showing improvement in his articulation skills. Still working on /r/ and /s/ sounds.",
    assignedHomework: "Practice /r/ sound for 10 minutes daily with provided materials."
  },
  {
    id: 2,
    name: "Fatima Khalid",
    age: 7,
    parent: "Aisha Khalid",
    sessions: 3,
    lastSession: "Mar 18, 2025",
    nextSession: "Mar 24, 2025",
    status: "Active",
    concerns: ["Language development", "Reading difficulties"],
    progress: "Excellent",
    description: "Fatima is making excellent progress with her reading comprehension. Vocabulary is expanding.",
    assignedHomework: "Read one story from provided book and discuss with parents."
  },
  {
    id: 3,
    name: "Mohammed Rahman",
    age: 4,
    parent: "Yusuf Rahman",
    sessions: 1,
    lastSession: "Mar 15, 2025",
    nextSession: "Mar 24, 2025",
    status: "New",
    concerns: ["Speech delay", "Social communication"],
    progress: "Initial assessment",
    description: "Initial assessment completed. Mohammed shows signs of delayed speech development.",
    assignedHomework: "Complete communication log for one week."
  },
  {
    id: 4,
    name: "Layla Mahmoud",
    age: 6,
    parent: "Nadia Mahmoud",
    sessions: 12,
    lastSession: "Mar 10, 2025",
    nextSession: null,
    status: "Inactive",
    concerns: ["Stuttering", "Fluency disorder"],
    progress: "Completed",
    description: "Layla has completed her therapy program and has shown significant improvement.",
    assignedHomework: "No current homework. Maintenance exercises provided."
  }
]

export default function ClientProfile() {
  const params = useParams()
  const clientId = Number(params.id)
  
  // Find the client data
  const client = clients.find(c => c.id === clientId) || clients[0]
  
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/therapist/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground">Client Profile</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt={client.name} />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{client.name}</h3>
                <p className="text-sm text-gray-500">Age: {client.age}</p>
                <p className="text-sm text-gray-500">Parent: {client.parent}</p>
                <Badge
                  className={`mt-2 ${
                    client.status === "Active" 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : client.status === "New" 
                        ? "" 
                        : ""
                  }`}
                  variant={client.status === "Active" ? "default" : client.status === "New" ? "default" : "outline"}
                >
                  {client.status}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <h4 className="text-sm font-medium">Areas of Concern</h4>
              <div className="flex flex-wrap gap-2">
                {client.concerns.map((concern, index) => (
                  <Badge key={index} variant="outline">
                    {concern}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <h4 className="text-sm font-medium">Session Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">Total Sessions: {client.sessions}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">Last Session: {client.lastSession}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">Next Session: {client.nextSession || "Not scheduled"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="homework">Homework</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Client Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{client.description}</p>
                  
                  <div className="flex justify-end mt-6 pt-4 border-t space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/therapist/clients/${client.id}/notes`}>
                        View Session Notes
                      </Link>
                    </Button>
                    <Button size="sm" className="bg-onesti-purple hover:bg-purple-800 text-white">
                      Schedule New Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Current Progress: <span className="font-medium">{client.progress}</span></p>
                  
                  <div className="text-center p-12 border rounded-md">
                    <p className="text-muted-foreground">Progress visualization will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="homework" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Homework</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{client.assignedHomework}</p>
                  
                  <div className="flex justify-end mt-6 space-x-2">
                    <Button size="sm" className="bg-onesti-purple hover:bg-purple-800 text-white">
                      Update Homework
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 