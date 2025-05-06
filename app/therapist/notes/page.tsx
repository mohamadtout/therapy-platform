"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, FileText, Calendar, Plus, Edit, Eye, Upload, File, X, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Sample appointments data - this would typically come from an API
const appointments = [
  {
    id: "APT001",
    clientName: "Ahmed Al-Farsi",
    clientAge: 5,
    date: "Mar 20, 2025",
    time: "2:00 PM - 3:00 PM",
    type: "Speech Therapy",
  },
  {
    id: "APT002",
    clientName: "Fatima Khalid",
    clientAge: 7,
    date: "Mar 18, 2025",
    time: "10:00 AM - 11:00 AM",
    type: "Initial Assessment",
  },
  {
    id: "APT003",
    clientName: "Mohammed Rahman",
    clientAge: 4,
    date: "Mar 15, 2025",
    time: "4:30 PM - 5:30 PM",
    type: "Speech Therapy",
  },
  {
    id: "APT004",
    clientName: "Layla Mahmoud",
    clientAge: 6,
    date: "Mar 10, 2025",
    time: "3:30 PM - 4:30 PM",
    type: "Speech Therapy",
  },
  {
    id: "APT005",
    clientName: "Ahmed Al-Farsi",
    clientAge: 5,
    date: "Mar 23, 2025",
    time: "2:00 PM - 3:00 PM",
    type: "Speech Therapy",
  },
]

// Sample data
const sessionNotes = [
  {
    id: 1,
    appointmentId: "APT001",
    clientName: "Ahmed Al-Farsi",
    clientAge: 5,
    date: "Mar 20, 2025",
    type: "Speech Therapy",
    status: "Completed",
    goals: ["Improve articulation of /s/ sound", "Increase vocabulary"],
    progress: "Good progress on articulation. Vocabulary expanding steadily.",
    nextSteps: "Continue with current exercises. Introduce new vocabulary themes.",
    lastEdited: "Mar 20, 2025",
    attachments: [{name: "speech_assessment.pdf", size: "1.2 MB"}],
  },
  {
    id: 2,
    appointmentId: "APT002",
    clientName: "Fatima Khalid",
    clientAge: 7,
    date: "Mar 18, 2025",
    type: "Speech Therapy",
    status: "Completed",
    goals: ["Improve reading fluency", "Work on comprehension"],
    progress: "Excellent progress on reading fluency. Comprehension improving.",
    nextSteps: "Increase complexity of reading materials. Continue comprehension exercises.",
    lastEdited: "Mar 18, 2025",
    attachments: [],
  },
  {
    id: 3,
    appointmentId: "APT003",
    clientName: "Mohammed Rahman",
    clientAge: 4,
    date: "Mar 15, 2025",
    type: "Initial Assessment",
    status: "Completed",
    goals: ["Assess speech and language skills", "Identify areas of concern"],
    progress: "Initial assessment completed. Identified speech delay and social communication challenges.",
    nextSteps: "Develop treatment plan focusing on expressive language and social communication.",
    lastEdited: "Mar 15, 2025",
    attachments: [{name: "initial_assessment.pdf", size: "2.4 MB"}],
  },
  {
    id: 4,
    appointmentId: "APT004",
    clientName: "Layla Mahmoud",
    clientAge: 6,
    date: "Mar 10, 2025",
    type: "Speech Therapy",
    status: "Completed",
    goals: ["Reduce stuttering frequency", "Improve fluency"],
    progress: "Moderate progress on fluency. Stuttering frequency reduced by approximately 30%.",
    nextSteps: "Continue with fluency techniques. Introduce more challenging speaking scenarios.",
    lastEdited: "Mar 10, 2025",
    attachments: [],
  },
  {
    id: 5,
    appointmentId: "APT005",
    clientName: "Ahmed Al-Farsi",
    clientAge: 5,
    date: "Mar 23, 2025",
    type: "Speech Therapy",
    status: "Pending",
    goals: [],
    progress: "",
    nextSteps: "",
    lastEdited: "",
    attachments: [],
  },
]

export default function TherapistNotes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState("")
  const [noteType, setNoteType] = useState("text") // Can be 'text' or 'file'
  const [noteText, setNoteText] = useState("")
  const [goals, setGoals] = useState("")
  const [progress, setProgress] = useState("")
  const [nextSteps, setNextSteps] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string}[]>([])
  const { toast } = useToast()

  // Filter notes based on search term and active tab
  const filteredNotes = sessionNotes.filter((note) => {
    const matchesSearch =
      note.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.type.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "completed") return matchesSearch && note.status === "Completed"
    if (activeTab === "pending") return matchesSearch && note.status === "Pending"

    return matchesSearch
  })

  // Submit handler for new note
  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would normally save the note data via API
    toast({
      title: "Note Created",
      description: "The session note has been created successfully."
    })
    
    setIsCreateDialogOpen(false)
    resetNoteForm()
  }

  // Reset form values
  const handleCancel = () => {
    setIsCreateDialogOpen(false)
    resetNoteForm()
  }

  const resetNoteForm = () => {
    setSelectedAppointment("")
    setNoteType("text")
    setNoteText("")
    setGoals("")
    setProgress("")
    setNextSteps("")
    setUploadedFiles([])
  }

  // Handle file upload
  const handleFileUpload = () => {
    // Simulate a file upload - in real app would use input[type="file"] event
    const mockFile = {
      name: `document-${Math.floor(Math.random() * 1000)}.pdf`,
      size: `${(Math.random() * 5).toFixed(1)} MB`
    }
    
    setUploadedFiles([...uploadedFiles, mockFile])
  }
  
  // Remove file from uploads
  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName))
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
          <h1 className="text-2xl font-bold tracking-tight">Session Notes</h1>
          <p className="text-muted-foreground">Manage and review your session notes</p>
        </div>
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

        <div className="flex items-center gap-2">
          <div className="w-[180px]">
            <Select defaultValue="all-clients">
              <SelectTrigger>
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-clients">All Clients</SelectItem>
                <SelectItem value="ahmed">Ahmed Al-Farsi</SelectItem>
                <SelectItem value="fatima">Fatima Khalid</SelectItem>
                <SelectItem value="mohammed">Mohammed Rahman</SelectItem>
                <SelectItem value="layla">Layla Mahmoud</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="bg-onesti-purple hover:bg-purple-800 text-white"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Notes</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Card key={note.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <FileText className="h-5 w-5 text-onesti-purple" />
                      </div>
                      <div>
                        <h3 className="font-medium">{note.clientName}</h3>
                        <p className="text-sm text-gray-500">Age: {note.clientAge}</p>
                        <div className="flex items-center mt-1">
                          <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{note.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-4">
                      <Badge variant="outline">{note.type}</Badge>
                      <Badge variant={note.status === "Completed" ? "default" : "secondary"}>{note.status}</Badge>
                    </div>

                    <div className="flex space-x-2">
                      {note.status === "Completed" ? (
                        <>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm" 
                          className="bg-onesti-purple hover:bg-purple-800 text-white"
                          onClick={() => {
                            setSelectedAppointment(note.appointmentId)
                            setIsCreateDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Add Notes
                        </Button>
                      )}
                    </div>
                  </div>

                  {note.status === "Completed" && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Goals</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {note.goals.map((goal, index) => (
                              <li key={index}>{goal}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Progress</h4>
                          <p className="text-sm">{note.progress}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Next Steps</h4>
                          <p className="text-sm">{note.nextSteps}</p>
                        </div>
                      </div>
                      {note.attachments && note.attachments.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Attachments</h4>
                          <div className="flex flex-wrap gap-2">
                            {note.attachments.map((file, index) => (
                              <div key={index} className="inline-flex items-center bg-gray-100 rounded-md px-3 py-1 text-sm">
                                <File className="h-3 w-3 mr-2 text-gray-500" />
                                {file.name} <span className="text-gray-500 ml-1">({file.size})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="mt-4 text-xs text-gray-500">Last edited: {note.lastEdited}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="rounded-full bg-gray-100 p-3 mb-2">
                  <FileText className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="font-medium">No Notes Found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm ? "No notes match your search criteria." : "You don't have any notes in this category."}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Note Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleCreateNote}>
            <DialogHeader>
              <DialogTitle>Add Session Notes</DialogTitle>
              <DialogDescription>
                Create notes for your therapy session or upload session documents.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="appointmentSelect">Select Session</Label>
                <Select 
                  value={selectedAppointment} 
                  onValueChange={setSelectedAppointment}
                  required
                >
                  <SelectTrigger id="appointmentSelect">
                    <SelectValue placeholder="Choose a session" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointments.map(appointment => (
                      <SelectItem key={appointment.id} value={appointment.id}>
                        {appointment.clientName} - {appointment.date} ({appointment.time})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Note Type</Label>
                <RadioGroup defaultValue="text" value={noteType} onValueChange={setNoteType}>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text" id="text" />
                      <Label htmlFor="text">Text Note</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="file" id="file" />
                      <Label htmlFor="file">File Upload</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {noteType === "text" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="goals">Goals</Label>
                    <Textarea 
                      id="goals" 
                      placeholder="Enter session goals" 
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="progress">Progress Notes</Label>
                    <Textarea 
                      id="progress" 
                      placeholder="Document the client's progress" 
                      value={progress}
                      onChange={(e) => setProgress(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nextSteps">Next Steps</Label>
                    <Textarea 
                      id="nextSteps" 
                      placeholder="Plan for future sessions" 
                      value={nextSteps}
                      onChange={(e) => setNextSteps(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <Label>Upload Files</Label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-onesti-purple"
                    onClick={handleFileUpload}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 font-medium">Click to upload files</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, or images up to 10MB</p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                          <div className="flex items-center">
                            <File className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => removeFile(file.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-onesti-purple hover:bg-purple-800">
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Notes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

