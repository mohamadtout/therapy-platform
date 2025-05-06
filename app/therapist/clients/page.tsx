"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, User, Calendar, Clock, FileText, Plus } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Image from 'next/image'

// Sample data
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
  },
]

export default function TherapistClients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  // Filter clients based on search term and active tab
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.parent.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && client.status === "Active"
    if (activeTab === "new") return matchesSearch && client.status === "New"
    if (activeTab === "inactive") return matchesSearch && client.status === "Inactive"

    return matchesSearch
  })

  // Handle adding a new client
  const handleAddClient = () => {
    router.push("/therapist/clients/new")
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/therapist">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">Manage your client list and view client details</p>
          </div>
        </div>
        <Button onClick={handleAddClient} className="bg-onesti-purple hover:bg-purple-800 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search clients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-4">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <Card key={client.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" alt={client.name} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
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
                            variant={
                              client.status === "Active" ? "default" : client.status === "New" ? "default" : "outline"
                            }
                          >
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Session Information</h4>
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

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Clinical Information</h4>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium">Concerns:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {client.concerns.map((concern, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {concern}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Progress:</span>
                              <span className="text-sm ml-2">{client.progress}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                          asChild
                        >
                          <Link href={`/therapist/clients/${client.id}/notes`}>
                            View Notes
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-onesti-purple hover:bg-purple-800 text-white"
                          asChild
                        >
                          <Link href={`/therapist/clients/${client.id}`}>
                            View Profile
                          </Link>
                        </Button>
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
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="font-medium">No Clients Found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm
                    ? "No clients match your search criteria."
                    : "You don't have any clients in this category."}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={handleAddClient}
                >
                  Add New Client
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
