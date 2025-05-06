"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Calendar, Clock, Search } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"

// Sample client data
const clients = [
  {
    id: 1,
    name: "Ahmed Al-Farsi",
    age: 5,
    parent: "Samir Al-Farsi",
    status: "Active",
  },
  {
    id: 2,
    name: "Fatima Khalid",
    age: 7,
    parent: "Aisha Khalid",
    status: "Active",
  },
  {
    id: 3,
    name: "Mohammed Rahman",
    age: 4,
    parent: "Yusuf Rahman",
    status: "New",
  },
  {
    id: 4,
    name: "Layla Mahmoud",
    age: 6,
    parent: "Nadia Mahmoud",
    status: "Inactive",
  }
]

// Sample notes data
const sessionNotes = [
  {
    id: 101,
    clientId: 1,
    date: "Mar 20, 2025",
    time: "10:00 AM - 10:45 AM",
    title: "Speech Assessment Follow-up",
    content: "Ahmed showed progress with /p/ and /b/ sounds. Continued difficulty with /r/ sound. Engaged well during activities. Parent present for last 10 minutes of session for demonstration of homework exercises.",
    tags: ["Assessment", "Articulation"]
  },
  {
    id: 102,
    clientId: 1,
    date: "Mar 13, 2025",
    time: "10:00 AM - 10:45 AM",
    title: "Articulation Practice",
    content: "Focused on /r/ and /s/ sounds. Ahmed was cooperative but showed frustration after 20 minutes. Adjusted activities to incorporate movement which improved engagement. Parent reports consistent practice at home.",
    tags: ["Articulation", "Practice"]
  },
  {
    id: 103,
    clientId: 1,
    date: "Mar 6, 2025",
    time: "10:00 AM - 10:45 AM",
    title: "Initial Assessment",
    content: "Completed comprehensive speech assessment. Ahmed shows articulation difficulties with /r/, /s/, and /th/ sounds. Receptive language skills are age-appropriate. Expressive language shows slight delay in complex sentence structure. Recommended weekly therapy sessions.",
    tags: ["Assessment", "Initial"]
  }
]

export default function ClientNotes() {
  const params = useParams()
  const clientId = Number(params.id)
  const [searchTerm, setSearchTerm] = useState("")
  
  // Find the client data
  const client = clients.find(c => c.id === clientId) || clients[0]
  
  // Filter notes for this client and by search term
  const filteredNotes = sessionNotes
    .filter(note => note.clientId === clientId)
    .filter(note => 
      searchTerm === "" || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href={`/therapist/clients/${clientId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Client Profile
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Session Notes</h1>
            <p className="text-muted-foreground">{client.name}'s therapy session notes</p>
          </div>
        </div>
        
        <Button className="bg-onesti-purple hover:bg-purple-800 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add New Note
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Card key={note.id}>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{note.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{note.date}</span>
                      <Clock className="ml-2 h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{note.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{note.content}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-end pt-4 space-x-2">
                    <Button variant="outline" size="sm">
                      Print
                    </Button>
                    <Button size="sm" className="bg-onesti-purple hover:bg-purple-800 text-white">
                      Edit Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center py-12">
              <div className="rounded-full bg-gray-100 p-3 mb-2">
                <Calendar className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="font-medium">No Session Notes Found</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-md">
                {searchTerm
                  ? "No notes match your search criteria."
                  : "There are no session notes recorded for this client yet."}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Note
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 