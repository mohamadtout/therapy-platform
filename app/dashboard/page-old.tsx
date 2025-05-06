"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  User,
  Package,
  CalendarDays,
  ArrowRight,
  CheckCircle,
  FileText,
  Heart,
  MessageCircle,
  Users,
  Settings,
  LogOut,
  Paperclip,
  Upload,
  X,
  FileImage,
  FileIcon as FilePdf,
  FileSpreadsheet,
  FileTextIcon as FileText2,
  File,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import AppointmentBooking from "@/components/consultation/appointment-booking"
import { useToast } from "@/hooks/use-toast"
import { profileService } from "@/lib/api/api-services"

// Define a type for the active section
type ActiveSection = "dashboard" | "appointments" | "dependants" | "medical-records" | "profile"

// Define types for profile data
interface Parent {
  name: string
  email: string
  phone: string
  profileImage: string | null
  address: string
}

interface Child {
  id: number
  name: string
  age: string
  patientId: string
  active: boolean
  gender: string
  image: string
  nextAssessment: string
  assessments: any[]
  healthRecords: {
    lastVisit: string
  }
}

interface ProfileData {
  parent: Parent
  children: Child[]
  appointments: any[]
}

// Sample data for purchased packages
const purchasedPackages = [
  {
    id: 1,
    name: "Speech Therapy Package",
    sessions: {
      total: 12,
      used: 5,
      remaining: 7,
    },
    validUntil: "June 30, 2025",
    status: "Active",
    childId: 1, // Associated with Emma
  },
  {
    id: 2,
    name: "Occupational Therapy Assessment",
    sessions: {
      total: 1,
      used: 0,
      remaining: 1,
    },
    validUntil: "April 15, 2025",
    status: "Active",
    childId: 2, // Associated with Alex
  },
  {
    id: 3,
    name: "Behavioral Therapy Package",
    sessions: {
      total: 8,
      used: 2,
      remaining: 6,
    },
    validUntil: "August 15, 2025",
    status: "Active",
    childId: 1, // Associated with Emma
  },
]

// Sample data for upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    therapistName: "Dr. Sarah Johnson",
    specialty: "Speech Therapist",
    date: "Mar 25, 2025",
    time: "2:00 PM - 3:00 PM",
    child: "Emma",
    format: "In-person",
    location: "Dubai Healthcare City, Building 4",
  },
  {
    id: 2,
    therapistName: "Dr. Ahmed Hassan",
    specialty: "Occupational Therapist",
    date: "Apr 2, 2025",
    time: "10:00 AM - 11:00 AM",
    child: "Emma",
    format: "Virtual",
    location: "Zoom Meeting",
  },
]

// Sample data for children
const childrenData = [
  {
    id: 1,
    name: "Emma",
    age: "5 years, 7 months",
    patientId: "PT254655",
    active: true,
    gender: "Female",
    image: "/placeholder.svg?height=120&width=120",
    nextAssessment: "May 20, 2025",
    assessments: [],
    healthRecords: {
      lastVisit: "10 Feb 2025",
    },
  },
  {
    id: 2,
    name: "Alex",
    age: "3 years, 2 months",
    patientId: "PT254656",
    active: false,
    gender: "Male",
    image: "/placeholder.svg?height=120&width=120",
    nextAssessment: "April 15, 2025",
    assessments: [],
    healthRecords: {
      lastVisit: "25 Mar 2025",
    },
  },
]

// Sample data for appointment documents
const appointmentDocuments = [
  {
    id: 1,
    appointmentId: 1,
    name: "Session Notes - March 21",
    uploadedBy: "Dr. Sarah Johnson",
    uploadDate: "March 21, 2025",
    fileType: "PDF",
    fileSize: "1.2 MB",
    url: "#",
    notes: "Initial evaluation notes for speech therapy assessment.",
  },
]

interface Document {
  "document-id": number
  "document-name": string
  "document-description"?: string
  document: string
  date: string
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [children, setChildren] = useState<Child[]>(childrenData)
  const [activeChildIndex, setActiveChildIndex] = useState(0)
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false)
  const [isEditChildModalOpen, setIsEditChildModalOpen] = useState(false)
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false)
  const [isViewDocsModalOpen, setIsViewDocsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [editingChildIndex, setEditingChildIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [documents, setDocuments] = useState<Document[]>([])
  const [isDeleteDocumentModalOpen, setIsDeleteDocumentModalOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null)
  const [isDeletingDocument, setIsDeletingDocument] = useState(false)
  const [newChildData, setNewChildData] = useState({
    name: "",
    age: "",
    gender: "Male",
    image: "/placeholder.svg?height=120&width=120",
  })

  const [parentProfile, setParentProfile] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, USA",
    profileImage: "/placeholder.svg?height=120&width=120",
  })

  // Add these state variables near the top of the component with the other state declarations
  const [profileFormData, setProfileFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null)
  const [isProfileUpdating, setIsProfileUpdating] = useState(false)
  const [hasProfileChanges, setHasProfileChanges] = useState(false)
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false)

  const getDocumentIcon = (documentPath: string) => {
    const extension = documentPath.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return <FilePdf className="h-8 w-8 text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="h-8 w-8 text-blue-500" />
      case "doc":
      case "docx":
        return <FileText2 className="h-8 w-8 text-blue-700" />
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="h-8 w-8 text-green-600" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }
  // Fetch profile data from API
  const fetchDetails = async () => {
    try {
      setIsLoading(true)
      const response = await profileService.getProfile()
      // console.log(response.data)
      setProfileData(response.data)

      // If there are children in the API response, use them
      if (response.data.children && response.data.children.length > 0) {
        setChildren(response.data.children)
      }

      if (response.data?.parent) {
        setParentProfile(response.data.parent)
      }
      
    } catch (error) {
      console.error("Error fetching profile data:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  const [editChildData, setEditChildData] = useState({
    name: "",
    age: "",
    gender: "Male",
    image: "/placeholder.svg?height=120&width=120",
  })
  const [documentData, setDocumentData] = useState({
    name: "",
    notes: "",
    file: null as File | null,
  })
  const [isUploadMedicalRecordModalOpen, setIsUploadMedicalRecordModalOpen] = useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isNotificationToggled, setIsNotificationToggled] = useState({
    email: true,
    sms: true,
    newsletter: false,
  })
  const [medicalRecordData, setMedicalRecordData] = useState({
    name: "",
    description: "",
    date: "",
    file: null as File | null,
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const activeChild = children.length > 0 ? children[activeChildIndex] : null
  // const [profileFormData, setProfileFormData] = useState({
  //   name: parentProfile.name,
  //   email: parentProfile.email,
  //   phone: parentProfile.phone,
  //   address: parentProfile.address,
  //   profileImage: parentProfile.profileImage,
  // })
  // const [isProfileUpdating, setIsProfileUpdating] = useState(false)
  // const [isPasswordUpdating, setIsPasswordUpdating] = useState(false)

  const upcomingSessions = [
    {
      id: 1,
      specialist: "Dr. Sarah Johnson",
      specialty: "Speech-Language Pathologist",
      date: "March 21, 2025",
      time: "10:30 PM",
      child: "Alex",
    },
    {
      id: 2,
      specialist: "Dr. Michael Chen",
      specialty: "Behavioral Therapist",
      date: "March 23, 2025",
      time: "2:00 PM",
      child: "Emma",
    },
  ]

  // Get parent profile data from API or use default
  // const parentProfile = profileData?.parent || {
  //   name: "John Smith",
  //   email: "john.smith@example.com",
  //   phone: "+1 (555) 123-4567",
  //   address: "123 Main Street, Anytown, USA",
  //   profileImage: "/placeholder.svg?height=120&width=120",
  // }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  // Handle deleting a document
  const handleDeleteDocument = async () => {
    if (!documentToDelete) return

    try {
      setIsDeletingDocument(true)

      // Call the API to delete the document
      await profileService.deleteDocument(documentToDelete)

      // Update the documents list
      setDocuments(documents.filter((doc) => doc["document-id"] !== documentToDelete))

      // Show success message
      toast({
        title: "Document Deleted",
        description: "The document has been successfully deleted.",
      })
    } catch (error: any) {
      console.error("Error deleting document:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete document",
        variant: "destructive",
      })
    } finally {
      setIsDeletingDocument(false)
      setIsDeleteDocumentModalOpen(false)
      setDocumentToDelete(null)
    }
  }

  const openDeleteDocumentModal = (documentId: number) => {
    setDocumentToDelete(documentId)
    setIsDeleteDocumentModalOpen(true)
  }

  // Handle adding a new child
  const handleAddChild = () => {
    // Generate a new patient ID
    const newPatientId = `PT${254656 + children.length + 1}`

    // Create a new child object
    const newChild = {
      id: children.length + 1,
      name: newChildData.name,
      age: newChildData.age,
      patientId: newPatientId,
      active: true,
      gender: newChildData.gender,
      image: newChildData.image,
      nextAssessment: "Not scheduled",
      assessments: [],
      healthRecords: {
        lastVisit: "None",
      },
    }

    // Add the new child to the children array
    setChildren([...children, newChild])

    // Close the modal and reset the form
    setIsAddChildModalOpen(false)
    setNewChildData({
      name: "",
      age: "",
      gender: "Male",
      image: "/placeholder.svg?height=120&width=120",
    })
  }
  


  // Add this useEffect to initialize the profile form data when the profile data is loaded
  useEffect(() => {
    if (profileData?.parent) {
      setProfileFormData({
        name: profileData.parent.name || "",
        email: profileData.parent.email || "",
        phone: profileData.parent.phone || "",
        address: profileData.parent.address || "",
      })
      // Reset the changes flag when profile data is loaded
      setHasProfileChanges(false)
      setProfileImageBase64(null)
    }
  }, [profileData])

  // Add this useEffect to track changes in the form data
  useEffect(() => {
    if (profileData?.parent) {
      const hasNameChanged = profileFormData.name !== profileData.parent.name
      const hasPhoneChanged = profileFormData.phone !== profileData.parent.phone
      const hasAddressChanged = profileFormData.address !== profileData.parent.address
      const hasImageChanged = profileImageBase64 !== null

      setHasProfileChanges(hasNameChanged || hasPhoneChanged || hasAddressChanged || hasImageChanged)
    }
  }, [profileFormData, profileImageBase64, profileData])

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

  // Handle editing a child
  const handleEditChild = () => {
    if (editingChildIndex === null) return

    // Update the child data
    const updatedChildren = [...children]
    updatedChildren[editingChildIndex] = {
      ...updatedChildren[editingChildIndex],
      name: editChildData.name,
      age: editChildData.age,
      gender: editChildData.gender,
      image: editChildData.image,
    }

    setChildren(updatedChildren)

    // Close the modal and reset the form
    setIsEditChildModalOpen(false)
    setEditingChildIndex(null)
  }

  // Handle opening edit child modal
  const openEditChildModal = (index: number) => {
    setEditingChildIndex(index)
    const child = children[index]
    setEditChildData({
      name: child.name,
      age: child.age,
      gender: child.gender,
      image: child.image,
    })
    setIsEditChildModalOpen(true)
  }

  // Handle image upload for child
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isNewChild: boolean) => {
    const file = event.target.files?.[0]
    if (!file) return

    // In a real app, you would upload the file to a server and get a URL back
    // For demo purposes, we'll use a placeholder URL
    const imageUrl = URL.createObjectURL(file)

    if (isNewChild) {
      setNewChildData({ ...newChildData, image: imageUrl })
    } else {
      setEditChildData({ ...editChildData, image: imageUrl })
    }
  }

  // Handle document upload for appointment
  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setDocumentData({ ...documentData, file })
  }

  // Submit document upload
  const submitDocument = () => {
    if (!selectedAppointment || !documentData.name) return

    // Create a new document
    const newDocument = {
      id: appointmentDocuments.length + 1,
      appointmentId: selectedAppointment.id,
      name: documentData.name,
      uploadedBy: "Dr. Therapist Name", // In a real app, this would be the logged-in user
      uploadDate: new Date().toLocaleDateString(),
      fileType: documentData.file?.type.split("/")[1].toUpperCase() || "PDF",
      fileSize: documentData.file ? `${Math.round(documentData.file.size / 1024)} KB` : "0 KB",
      url: "#",
      notes: documentData.notes,
    }

    // Add to documents array
    appointmentDocuments.push(newDocument)

    // Reset and close modal
    setDocumentData({ name: "", notes: "", file: null })
    setIsUploadDocModalOpen(false)
    setSelectedAppointment(null)
  }

  // Open upload document modal
  const openUploadDocModal = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsUploadDocModalOpen(true)
  }

  // Open view documents modal
  const openViewDocsModal = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsViewDocsModalOpen(true)
  }

  // Handle appointment actions
  const handleRescheduleAppointment = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsRescheduleModalOpen(true)
  }

  const handleCancelAppointment = (appointmentId: number) => {
    // Filter out the cancelled appointment
    const updatedSessions = upcomingSessions.filter((session) => session.id !== appointmentId)
    // In a real app, you would make an API call to cancel the appointment
    // For demo purposes, we'll just log a message
    // console.log(`Appointment ${appointmentId} cancelled`)
    alert(`Appointment has been cancelled successfully.`)
  }

  // Handle medical record upload
  const handleMedicalRecordUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setMedicalRecordData({ ...medicalRecordData, file })
  }

  const submitMedicalRecord = () => {
    if (!medicalRecordData.name || !medicalRecordData.file) return

    // In a real app, you would upload the medical record to a server
    // console.log("Medical record uploaded:", medicalRecordData)

    // Reset form and close modal
    setMedicalRecordData({
      name: "",
      description: "",
      date: "",
      file: null,
    })
    setIsUploadMedicalRecordModalOpen(false)

    // Show success message
    alert("Medical record uploaded successfully!")
  }

  // Update the handlePasswordChange function
  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all password fields.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match!",
        variant: "destructive",
      })
      return
    }

    try {
      setIsPasswordUpdating(true)

      // In a real app, you would make an API call to change the password
      // For example:
      await profileService.changePassword(passwordData.currentPassword, passwordData.newPassword)

      // Reset form and show success message
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error changing password:", error)
      toast({
        title: "Update Failed",
        description: "There was an error updating your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPasswordUpdating(false)
    }
  }

  // Toggle notification settings
  const toggleNotification = (type: "email" | "sms" | "newsletter") => {
    setIsNotificationToggled({
      ...isNotificationToggled,
      [type]: !isNotificationToggled[type],
    })
  }

  // Add these functions to handle profile image upload and profile updates
  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setProfileImageBase64(base64String)
    }
    reader.readAsDataURL(file)
  }

  // Add a function to handle deleting the profile image
  const handleDeleteProfileImage = () => {
    setProfileImageBase64("null") // Special value to indicate deletion
    setHasProfileChanges(true)
  }

  // Update the saveProfileChanges function to handle the special "null" value
  const saveProfileChanges = async () => {
    try {
      setIsProfileUpdating(true)

      // Call the API to update the profile
      // If profileImageBase64 is "null", we're deleting the image
      const imageToSend = profileImageBase64 === "null" ? null : profileImageBase64
      await profileService.updateProfile(profileFormData.name, profileFormData.phone, imageToSend || null, profileFormData.address)

      // Show success message
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "default",
      })

      // Refresh profile data
      fetchDetails()
      setHasProfileChanges(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProfileUpdating(false)
    }
  }

  // Handle chat with therapist
  const startChat = (specialist: string) => {
    // In a real app, this would open a chat window or redirect to a chat page
    alert(`Starting chat with ${specialist}...`)
  }

  // Handle attending appointment
  const attendAppointment = (session: any) => {
    // In a real app, this would redirect to a video call or show directions to the location
    if (session.format === "Virtual") {
      alert(`Joining virtual appointment with ${session.specialist}...`)
    } else {
      alert(`Directions to: ${session.location || "Appointment location"}`)
    }
  }

  // Function to handle booking
  const handleBookAppointment = () => {
    setIsBookingOpen(true)
  }

  // Handle profile image upload
  // const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (!file) return

  //   // In a real app, you would upload the file to a server and get a URL back
  //   // For demo purposes, we'll use a placeholder URL
  //   const imageUrl = URL.createObjectURL(file)

  //   setProfileFormData({ ...profileFormData, profileImage: imageUrl })
  // }

  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Render the appropriate content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Purchased Packages */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Your Packages
                  </CardTitle>
                  <CardDescription>View and manage your purchased therapy packages</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeChild && purchasedPackages.filter((pkg) => pkg.childId === activeChild.id).length > 0 ? (
                    <div className="space-y-4">
                      {purchasedPackages
                        .filter((pkg) => pkg.childId === activeChild.id)
                        .map((pkg) => (
                          <div key={pkg.id} className="border rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <h3 className="font-medium">{pkg.name}</h3>
                                <Badge className="mt-1" variant="outline">
                                  {pkg.status}
                                </Badge>
                                <p className="text-xs text-gray-500 mt-1">
                                  For: {children.find((child) => child.id === pkg.childId)?.name}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-4">
                                <div className="text-center">
                                  <p className="text-sm text-gray-500">Total Sessions</p>
                                  <p className="font-bold">{pkg.sessions.total}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm text-gray-500">Used</p>
                                  <p className="font-bold">{pkg.sessions.used}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm text-gray-500">Remaining</p>
                                  <p className="font-bold text-green-600">{pkg.sessions.remaining}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm text-gray-500">Valid Until</p>
                                <p>{pkg.validUntil}</p>
                              </div>
                            </div>
                          </div>
                        ))}

                      <div className="flex justify-end mt-4">
                        <Button variant="outline" asChild>
                          <Link href="/packages">
                            View All Packages
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">
                        No Packages {activeChild ? `for ${activeChild.name}` : ""}
                      </h3>
                      <p className="text-gray-500 mb-4">No therapy packages purchased yet</p>
                      <Button asChild>
                        <Link href="/packages">Browse Packages</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Book Appointment */}
              <Card className="bg-primary text-white">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="md:flex-1">
                    <h3 className="text-xl font-bold mb-2">Book a new Appointment</h3>
                    <p className="mb-4">Schedule your next consultation or therapy session</p>
                    <Button className="w-full shadow-sm" onClick={handleBookAppointment}>
                      Book Now
                    </Button>
                  </div>
                  <div className="flex-shrink-0 bg-white rounded-full p-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Upcoming Appointments
                  </CardTitle>
                  <CardDescription>Your scheduled therapy sessions and consultations</CardDescription>
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

                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4 mt-4">
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
                                  </div>
                                  <div className="ml-auto">
                                    <Button size="icon" variant="outline">
                                      <Calendar className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="mt-4 flex items-center text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {session.date} - {session.time}
                                </div>

                                <div className="mt-4 flex gap-2">
                                  <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => startChat(session.specialist)}
                                  >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Chat Now
                                  </Button>
                                  <Button className="flex-1" onClick={() => attendAppointment(session)}>
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
                                </div>
                                <div className="ml-auto">
                                  <Button size="icon" variant="outline">
                                    <Calendar className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="mt-4 flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-2" />
                                {session.date} - {session.time}
                              </div>

                              <div className="mt-4 flex gap-2">
                                <Button
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => startChat(session.specialist)}
                                >
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Chat Now
                                </Button>
                                <Button className="flex-1" onClick={() => attendAppointment(session)}>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessments" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <p>No assessments completed yet</p>
                    <Button className="mt-4" asChild>
                      <Link href="/assessments">Take an Assessment</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-8">
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

                    {upcomingSessions.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingSessions.map((session) => (
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
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRescheduleAppointment(session)}
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleCancelAppointment(session.id)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-2" />
                              {session.date} - {session.time}
                            </div>

                            <div className="mt-4 flex justify-between">
                              <Button variant="outline" size="sm" onClick={() => openUploadDocModal(session)}>
                                <Paperclip className="h-4 w-4 mr-2" />
                                Upload Document
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openViewDocsModal(session)}>
                                View Documents (
                                {appointmentDocuments.filter((doc) => doc.appointmentId === session.id).length})
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">No upcoming appointments</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Reschedule Modal */}
              <Dialog open={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Reschedule Appointment</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    {selectedAppointment && (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">
                          {selectedAppointment.specialist} - {selectedAppointment.specialty}
                        </p>
                        <p className="text-sm text-gray-500">
                          Current appointment: {selectedAppointment.date} at {selectedAppointment.time}
                        </p>
                      </div>
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor="newDate">New Date</Label>
                      <Input id="newDate" type="date" className="w-full" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="newTime">New Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="rescheduleReason">Reason for Rescheduling (Optional)</Label>
                      <Textarea id="rescheduleReason" rows={3} placeholder="Please provide a reason for rescheduling" />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsRescheduleModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        alert("Appointment rescheduled successfully!")
                        setIsRescheduleModalOpen(false)
                      }}
                    >
                      Confirm Reschedule
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Document Upload Modal */}
              <Dialog open={isUploadDocModalOpen} onOpenChange={setIsUploadDocModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Upload Session Document</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    {selectedAppointment && (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">
                          {selectedAppointment.specialist} - {selectedAppointment.specialty}
                        </p>
                        <p className="text-sm text-gray-500">
                          Session for {selectedAppointment.child} on {selectedAppointment.date} at{" "}
                          {selectedAppointment.time}
                        </p>
                      </div>
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor="docName">Document Name</Label>
                      <Input
                        id="docName"
                        value={documentData.name}
                        onChange={(e) => setDocumentData({ ...documentData, name: e.target.value })}
                        placeholder="e.g. Session Notes, Progress Report, etc."
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="docNotes">Notes (Optional)</Label>
                      <Textarea
                        id="docNotes"
                        value={documentData.notes}
                        onChange={(e) => setDocumentData({ ...documentData, notes: e.target.value })}
                        placeholder="Add any notes about this document"
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="docFile">Upload File</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                        <Input id="docFile" type="file" className="hidden" onChange={handleDocumentUpload} />
                        <label htmlFor="docFile" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm font-medium">
                              {documentData.file ? documentData.file.name : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">PDF, Word, Excel, or image files accepted</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadDocModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={submitDocument} disabled={!documentData.name || !documentData.file}>
                      Upload Document
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* View Documents Modal */}
              <Dialog open={isViewDocsModalOpen} onOpenChange={setIsViewDocsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Session Documents</DialogTitle>
                  </DialogHeader>

                  <div className="py-4">
                    {selectedAppointment && (
                      <div className="bg-gray-50 p-3 rounded-md mb-4">
                        <p className="font-medium">
                          {selectedAppointment.specialist} - {selectedAppointment.specialty}
                        </p>
                        <p className="text-sm text-gray-500">
                          Session for {selectedAppointment.child} on {selectedAppointment.date} at{" "}
                          {selectedAppointment.time}
                        </p>
                      </div>
                    )}

                    {selectedAppointment &&
                    appointmentDocuments.filter((doc) => doc.appointmentId === selectedAppointment.id).length > 0 ? (
                      <div className="space-y-3">
                        {appointmentDocuments
                          .filter((doc) => doc.appointmentId === selectedAppointment.id)
                          .map((doc) => (
                            <div key={doc.id} className="border rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-500" />
                                    <h3 className="font-medium">{doc.name}</h3>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Uploaded by {doc.uploadedBy} on {doc.uploadDate}
                                  </p>
                                  {doc.notes && <p className="text-sm mt-2 bg-gray-50 p-2 rounded">{doc.notes}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{doc.fileType}</Badge>
                                  <span className="text-xs text-gray-500">{doc.fileSize}</span>
                                </div>
                              </div>
                              <div className="mt-3 flex justify-end gap-2">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={doc.url}>Download</Link>
                                </Button>
                                <Button size="sm">View</Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">No documents uploaded for this session yet</div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsViewDocsModalOpen(false)}>
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        setIsViewDocsModalOpen(false)
                        openUploadDocModal(selectedAppointment)
                      }}
                    >
                      Upload New Document
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Card>
                <CardHeader>
                  <CardTitle>Past Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">No past appointments found</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )

      case "appointments":
        return (
          <div className="space-y-8">
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

                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
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
                              <Button size="sm" variant="outline" onClick={() => handleRescheduleAppointment(session)}>
                                Reschedule
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleCancelAppointment(session.id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            {session.date} - {session.time}
                          </div>

                          <div className="mt-4 flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => openUploadDocModal(session)}>
                              <Paperclip className="h-4 w-4 mr-2" />
                              Upload Document
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => openViewDocsModal(session)}>
                              View Documents (
                              {appointmentDocuments.filter((doc) => doc.appointmentId === session.id).length})
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No upcoming appointments</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">No past appointments found</div>
              </CardContent>
            </Card>
          </div>
        )

      case "dependants":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Manage Family Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Children</h3>
                    <Button onClick={() => setIsAddChildModalOpen(true)}>Add Child</Button>
                  </div>

                  {/* Add Child Modal */}
                  <Dialog open={isAddChildModalOpen} onOpenChange={setIsAddChildModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Child</DialogTitle>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="flex justify-center mb-2">
                          <div className="relative">
                            <Image
                              src={newChildData.image || "/placeholder.svg"}
                              alt="Child profile"
                              width={80}
                              height={80}
                              className="rounded-full border"
                            />
                            <Input
                              id="childImageNew"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, true)}
                            />
                            <label
                              htmlFor="childImageNew"
                              className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
                            >
                              <Upload className="h-3 w-3" />
                            </label>
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="childName">Child's Name</Label>
                          <Input
                            id="childName"
                            value={newChildData.name}
                            onChange={(e) => setNewChildData({ ...newChildData, name: e.target.value })}
                            placeholder="Enter child's name"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="childAge">Age</Label>
                          <Input
                            id="childAge"
                            value={newChildData.age}
                            onChange={(e) => setNewChildData({ ...newChildData, age: e.target.value })}
                            placeholder="e.g. 5 years, 3 months"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Gender</Label>
                          <RadioGroup
                            defaultValue={newChildData.gender}
                            onValueChange={(value) => setNewChildData({ ...newChildData, gender: value })}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddChildModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddChild} disabled={!newChildData.name || !newChildData.age}>
                          Add Child
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Edit Child Modal */}
                  <Dialog open={isEditChildModalOpen} onOpenChange={setIsEditChildModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Child</DialogTitle>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="flex justify-center mb-2">
                          <div className="relative">
                            <Image
                              src={editChildData.image || "/placeholder.svg"}
                              alt="Child profile"
                              width={80}
                              height={80}
                              className="rounded-full border"
                            />
                            <Input
                              id="childImageEdit"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, false)}
                            />
                            <label
                              htmlFor="childImageEdit"
                              className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
                            >
                              <Upload className="h-3 w-3" />
                            </label>
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="editChildName">Child's Name</Label>
                          <Input
                            id="editChildName"
                            value={editChildData.name}
                            onChange={(e) => setEditChildData({ ...editChildData, name: e.target.value })}
                            placeholder="Enter child's name"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="editChildAge">Age</Label>
                          <Input
                            id="editChildAge"
                            value={editChildData.age}
                            onChange={(e) => setEditChildData({ ...editChildData, age: e.target.value })}
                            placeholder="e.g. 5 years, 3 months"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Gender</Label>
                          <RadioGroup
                            value={editChildData.gender}
                            onValueChange={(value) => setEditChildData({ ...editChildData, gender: value })}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Male" id="editMale" />
                              <Label htmlFor="editMale">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Female" id="editFemale" />
                              <Label htmlFor="editFemale">Female</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditChildModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleEditChild} disabled={!editChildData.name || !editChildData.age}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {children.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {children.map((child, index) => (
                        <div key={child.id} className="border rounded-lg p-4">
                          <div className="flex items-center gap-4">
                            <Image
                              src={child.image || "/placeholder.svg"}
                              alt={child.name}
                              width={60}
                              height={60}
                              className="rounded-full"
                            />
                            <div>
                              <h3 className="font-bold">{child.name}</h3>
                              <p className="text-sm text-gray-500">{child.age}</p>
                              <p className="text-xs text-gray-500">ID: {child.patientId}</p>
                            </div>
                            <div className="ml-auto">
                              <Button size="sm" variant="outline" onClick={() => openEditChildModal(index)}>
                                Edit
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">Gender:</span> {child.gender}
                            </div>
                            <div>
                              <span className="text-gray-500">Next Assessment:</span> {child.nextAssessment}
                            </div>
                            <div>
                              <span className="text-gray-500">Assessments:</span> {child.assessments?.length || 0}
                            </div>
                            <div>
                              <span className="text-gray-500">Last Visit:</span>{" "}
                              {child.healthRecords?.lastVisit || "N/A"}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setActiveChildIndex(index)
                                setActiveSection("dashboard")
                              }}
                            >
                              View Dashboard
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No children added yet</p>
                      <p className="mt-2 text-sm">Add your first child to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "medical-records":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Documents</h3>
                    <Button onClick={() => setIsUploadMedicalRecordModalOpen(true)}>Upload Document</Button>
                  </div>

                  {documents && documents.length > 0 ? (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div
                          key={doc["document-id"]}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">{getDocumentIcon(doc.document)}</div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{doc["document-name"]}</h4>
                              {doc["document-description"] && (
                                <p className="text-sm text-gray-600 mt-1">{doc["document-description"]}</p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">Uploaded on: {formatDate(doc.date)}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => openDeleteDocumentModal(doc["document-id"])}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p>No medical records uploaded yet</p>
                      <p className="text-sm mt-2">Upload your first document to get started</p>
                    </div>
                  )}

                  <div className="bg-amber-50 p-4 rounded-lg text-amber-800">
                    <p className="text-sm">
                      You can upload medical records, reports, and other documents to keep track of your child's health
                      history. All documents are securely stored and only accessible to you and your healthcare
                      providers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Medical Record Modal */}
            <Dialog open={isUploadMedicalRecordModalOpen} onOpenChange={setIsUploadMedicalRecordModalOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload Medical Record</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="medicalRecordName">Document Name</Label>
                    <Input
                      id="medicalRecordName"
                      value={medicalRecordData.name}
                      onChange={(e) => setMedicalRecordData({ ...medicalRecordData, name: e.target.value })}
                      placeholder="e.g. Blood Test Results, Diagnosis Report, etc."
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="medicalRecordDate">Date of Record</Label>
                    <Input
                      id="medicalRecordDate"
                      type="date"
                      value={medicalRecordData.date}
                      onChange={(e) => setMedicalRecordData({ ...medicalRecordData, date: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="medicalRecordDescription">Description (Optional)</Label>
                    <Textarea
                      id="medicalRecordDescription"
                      value={medicalRecordData.description}
                      onChange={(e) => setMedicalRecordData({ ...medicalRecordData, description: e.target.value })}
                      placeholder="Add any details about this document"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="medicalRecordFile">Upload File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Input
                        id="medicalRecordFile"
                        type="file"
                        className="hidden"
                        onChange={handleMedicalRecordUpload}
                      />
                      <label htmlFor="medicalRecordFile" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">
                            {medicalRecordData.file ? medicalRecordData.file.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, Word, Excel, or image files accepted</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadMedicalRecordModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={submitMedicalRecord} disabled={!medicalRecordData.name || !medicalRecordData.file}>
                    Upload Document
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Card>
              <CardHeader>
                <CardTitle>Health History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {children.length > 0 && (
                    <>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Select Child</h3>
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {children.map((child, index) => (
                          <button
                            key={child.id}
                            className={`flex items-center gap-2 p-2 rounded-md border ${
                              activeChildIndex === index ? "border-primary bg-primary/10" : "border-gray-200"
                            }`}
                            onClick={() => setActiveChildIndex(index)}
                          >
                            <Image
                              src={child.image || "/placeholder.svg"}
                              alt={child.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span>{child.name}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-4">
                      Health Timeline {activeChild ? `for ${activeChild.name}` : ""}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                            <Heart className="h-4 w-4" />
                          </div>
                          <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            {activeChild?.healthRecords?.lastVisit || "No visits recorded"}
                          </div>
                          <div className="font-medium">Regular Checkup</div>
                          <div className="text-sm mt-1">Overall health assessment completed</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">March 1, 2025</div>
                          <div className="font-medium">Assessment</div>
                          <div className="text-sm mt-1">Initial evaluation completed</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                            <Calendar className="h-4 w-4" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Initial Registration</div>
                          <div className="font-medium">Joined [COMPANY] Platform</div>
                          <div className="text-sm mt-1">Profile created</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </CardContent>
        </Card>
            </div>
        )

      case "profile":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Image
                        src={
                          profileImageBase64 || parentProfile.profileImage || "/placeholder.svg?height=120&width=120"
                        }
                        alt={parentProfile.name}
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                      <div className="absolute -top-2 -right-2">
                        {(profileImageBase64 || parentProfile.profileImage) && (
                          <button
                            onClick={handleDeleteProfileImage}
                            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            title="Remove profile image"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <label
                        htmlFor="profileImage"
                        className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
                      >
                        <Settings className="h-4 w-4" />
                      </label>
                      <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageUpload}
                      />
                    </div>
                    <h2 className="mt-4 font-bold text-xl">{parentProfile.name}</h2>
                    <p className="text-gray-500">Parent Account</p>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <input
                          type="text"
                          value={profileFormData.name}
                          onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <input
                          type="email"
                          value={profileFormData.email}
                          disabled
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <input
                          type="tel"
                          value={profileFormData.phone}
                          onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <input
                          type="text"
                          value={profileFormData.address}
                          onChange={(e) => setProfileFormData({ ...profileFormData, address: e.target.value })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={saveProfileChanges} disabled={isProfileUpdating || !hasProfileChanges}>
                        {isProfileUpdating ? (
                          <>
                            <span className="mr-2">Saving...</span>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={handlePasswordChange} disabled={isPasswordUpdating}>
                    {isPasswordUpdating ? (
                      <>
                        <span className="mr-2">Updating...</span>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive email updates about appointments and assessments</p>
                    </div>
                    <button
                      className={`h-6 w-11 rounded-full relative ${isNotificationToggled.email ? "bg-primary" : "bg-gray-200"}`}
                      onClick={() => toggleNotification("email")}
                    >
                      <div
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${isNotificationToggled.email ? "right-1" : "left-1"}`}
                      ></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Receive text message reminders for upcoming appointments</p>
                    </div>
                    <button
                      className={`h-6 w-11 rounded-full relative ${isNotificationToggled.sms ? "bg-primary" : "bg-gray-200"}`}
                      onClick={() => toggleNotification("sms")}
                    >
                      <div
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${isNotificationToggled.sms ? "right-1" : "left-1"}`}
                      ></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletter</h3>
                      <p className="text-sm text-gray-500">Receive monthly updates about new features and resources</p>
                    </div>
                    <button
                      className={`h-6 w-11 rounded-full relative ${isNotificationToggled.newsletter ? "bg-primary" : "bg-gray-200"}`}
                      onClick={() => toggleNotification("newsletter")}
                    >
                      <div
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${isNotificationToggled.newsletter ? "right-1" : "left-1"}`}
                      ></div>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Page not found</div>
    }
  }

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
                      src={
                        activeSection === "profile"
                          ? parentProfile.profileImage || "/placeholder.svg?height=120&width=120"
                          : activeChild
                            ? activeChild.image
                            : parentProfile.profileImage || "/placeholder.svg?height=120&width=120"
                      }
                      alt={
                        activeSection === "profile"
                          ? parentProfile.name
                          : activeChild
                            ? activeChild.name
                            : parentProfile.name
                      }
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white"
                    />
                    <div className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>

              <div className="pt-16 pb-6 px-4 text-center">
                <h2 className="text-2xl font-bold">
                  {activeSection === "profile"
                    ? parentProfile.name
                    : activeChild
                      ? activeChild.name
                      : parentProfile.name}
                </h2>
                <p className="text-gray-500">
                  {activeSection === "profile"
                    ? "Parent Account"
                    : activeChild
                      ? `Patient ID: ${activeChild.patientId}`
                      : "Parent Account"}
                </p>
                {activeSection !== "profile" && activeChild && (
                  <p className="text-gray-500 flex items-center justify-center gap-2 mt-1">
                    {activeChild.gender} • {activeChild.age}
                  </p>
                )}
              </div>

              {/* Child Selector - Only show if there are children */}
              {activeSection !== "profile" && children.length > 1 && (
                <div className="px-4 pb-4">
                  <div className="text-sm font-medium mb-2">Switch Child Profile:</div>
                  <div className="flex flex-col gap-2">
                    {children.map((child, index) => (
                      <button
                        key={child.id}
                        onClick={() => setActiveChildIndex(index)}
                        className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                          activeChildIndex === index ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
                        }`}
                      >
                        <Image
                          src={child.image || "/placeholder.svg"}
                          alt={child.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span>{child.name}</span>
                        {activeChildIndex === index && <CheckCircle className="h-4 w-4 ml-auto text-primary" />}
                      </button>
                    ))}
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setActiveSection("dependants")}>
                      <Users className="h-4 w-4 mr-2" />
                      Manage Children
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="border-t">
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                    activeSection === "dashboard" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveSection("dashboard")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Dashboard</span>
                </button>

                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                    activeSection === "appointments" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveSection("appointments")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">My Appointments</span>
                </button>

                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                    activeSection === "dependants" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveSection("dependants")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Family Members</span>
                </button>

                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                    activeSection === "medical-records" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveSection("medical-records")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Medical Records</span>
                </button>

                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                    activeSection === "profile" ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveSection("profile")}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Profile Settings</span>
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
          <div className="lg:col-span-3 space-y-8">{renderContent()}</div>
        </div>
      </div>

      {/* Booking Dialog */}
      {isBookingOpen && (
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="max-w-5xl w-full p-0">
            <DialogHeader className="p-4 border-b">
              <DialogTitle>Book Appointment</DialogTitle>
            </DialogHeader>
            <AppointmentBooking
              user={{
                name: parentProfile.name,
                email: parentProfile.email,
                phone: parentProfile.phone,
              }}
              children={children}
              packages={purchasedPackages}
              insideDialog={true}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
