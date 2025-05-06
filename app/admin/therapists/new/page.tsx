"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Upload, X, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import AdminHeader from "@/components/admin/admin-header"
import { adminTherapistsService } from "@/lib/api/api-services"
import { useToast } from "@/components/ui/use-toast"
import { Suspense } from 'react'

// Define specialty interface
interface Specialty {
  specialty_id: string
  specialty_name: string
}

// Days of the week for availability
const daysOfWeek = [
  { id: "monday", label: "Monday", value: 1 },
  { id: "tuesday", label: "Tuesday", value: 2 },
  { id: "wednesday", label: "Wednesday", value: 3 },
  { id: "thursday", label: "Thursday", value: 4 },
  { id: "friday", label: "Friday", value: 5 },
  { id: "saturday", label: "Saturday", value: 6 },
  { id: "sunday", label: "Sunday", value: 7 },
]

function NewTherapistPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({})
  const [daySchedules, setDaySchedules] = useState<
    Record<
      string,
      { start_time: string; end_time: string; exceptions: Array<{ start_time: string; end_time: string }> }
    >
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [specialties, setSpecialties] = useState<Specialty[]>([])

  // Form data
  const [formData, setFormData] = useState({
    // Personal Info
    email: "",
    nickname: "",
    password: "",
    phone: "",
    address: "",
    first_name: "",
    last_name: "",
    birth_date: "",

    // Professional Info
    primary_specialty_id: "",
    secondary_specialty_id: "",
    qualifications: "",
    career_start: "",
    professional_bio: "",
    therapeutic_approach: "",

    // Session Settings
    session_duration: "60",
    buffer_time: "15",

    // Account Settings
    authorized: "0", // 0 = pending, 1 = active, 2 = disabled
    permission_ids: [1, 2, 3, 4, 5], // Default permissions
  })

  // Load specialties from URL params
  useEffect(() => {
    const specialtiesParam = searchParams.get("specialties")
    if (specialtiesParam) {
      try {
        const parsedSpecialties = JSON.parse(specialtiesParam)
        setSpecialties(parsedSpecialties)
      } catch (error) {
        console.error("Error parsing specialties:", error)
      }
    }
  }, [searchParams])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64String = event.target.result as string
          setProfileImage(base64String)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove profile image
  const removeProfileImage = () => {
    setProfileImage(null)
  }

  // Handle day selection for availability
  const handleDaySelection = (day: string, dayValue: number, checked: boolean) => {
    setSelectedDays((prev) => ({ ...prev, [day]: checked }))

    // Initialize schedule for the day if it's selected
    if (checked && !daySchedules[day]) {
      setDaySchedules((prev) => ({
        ...prev,
        [day]: {
          start_time: "09:00",
          end_time: "17:00",
          exceptions: [],
        },
      }))
    }
  }

  // Handle day schedule changes
  const handleDayScheduleChange = (day: string, field: "start_time" | "end_time", value: string) => {
    setDaySchedules((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }))
  }

  // Add exception to a day's schedule
  const addException = (day: string, exception: { start_time: string; end_time: string }) => {
    setDaySchedules((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        exceptions: [...(prev[day]?.exceptions || []), exception],
      },
    }))
  }

  // Remove exception from a day's schedule
  const removeException = (day: string, index: number) => {
    setDaySchedules((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        exceptions: prev[day]?.exceptions.filter((_, i) => i !== index) || [],
      },
    }))
  }

  // Handle permission toggle
  const handlePermissionToggle = (permissionId: number, checked: boolean) => {
    setFormData((prev) => {
      const updatedPermissions = checked
        ? [...prev.permission_ids, permissionId]
        : prev.permission_ids.filter((id) => id !== permissionId)

      return {
        ...prev,
        permission_ids: updatedPermissions,
      }
    })
  }

  // Validate form data
  const validateForm = () => {
    // Basic validation
    if (
      !formData.email ||
      !formData.nickname ||
      !formData.password ||
      !formData.phone ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.primary_specialty_id ||
      !formData.qualifications ||
      !formData.career_start ||
      !formData.professional_bio ||
      !formData.therapeutic_approach
    ) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return false
    }

    // Password validation
    if (formData.password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return false
    }

    // Schedule validation
    const selectedDaysArray = Object.entries(selectedDays).filter(([_, selected]) => selected)
    if (selectedDaysArray.length === 0) {
      toast({
        title: "No Schedule Selected",
        description: "Please select at least one working day",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare schedule data
      const schedule = Object.entries(selectedDays)
        .filter(([_, selected]) => selected)
        .map(([day, _]) => {
          const dayIndex = daysOfWeek.find((d) => d.id === day)?.value || 1
          const daySchedule = daySchedules[day]

          return {
            day: dayIndex,
            start_time: daySchedule?.start_time || "09:00",
            end_time: daySchedule?.end_time || "17:00",
            exceptions: daySchedule?.exceptions || [],
          }
        })

      // Prepare therapist data
      const therapistData = {
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        schedule,
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date || undefined,
        primary_specialty_id: formData.primary_specialty_id,
        secondary_specialty_id: formData.secondary_specialty_id || undefined,
        qualifications: formData.qualifications,
        career_start: formData.career_start,
        professional_bio: formData.professional_bio,
        therapeutic_approach: formData.therapeutic_approach,
        session_duration: Number.parseInt(formData.session_duration),
        buffer_time: Number.parseInt(formData.buffer_time),
        pfp: profileImage || undefined,
        permission_ids: formData.permission_ids,
      }

      // Submit data to API
      await adminTherapistsService.addNewTherapist(therapistData)

      toast({
        title: "Success",
        description: "Therapist added successfully",
      })

      // Redirect to therapists list
      router.push("/admin/therapists")
    } catch (error) {
      console.error("Error adding therapist:", error)
      toast({
        title: "Error",
        description: "Failed to add therapist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Add New Therapist" description="Register a new therapist to the platform" />

      <main className="p-6">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/therapists">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Therapists
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="professional">Professional Info</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter the therapist's basic personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 space-y-4">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="relative">
                          {profileImage ? (
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                              <img
                                src={profileImage || "/placeholder.svg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={removeProfileImage}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-center">
                          <Label htmlFor="profile-image" className="cursor-pointer text-sm text-blue-600">
                            Upload Photo
                          </Label>
                          <Input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <p className="text-xs text-gray-500 mt-1">Recommended: 300x300px</p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">First Name *</Label>
                          <Input
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">Last Name *</Label>
                          <Input
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="birth_date">Date of Birth</Label>
                          <Input
                            id="birth_date"
                            name="birth_date"
                            type="date"
                            value={formData.birth_date}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nickname">Display Name *</Label>
                        <Input
                          id="nickname"
                          name="nickname"
                          value={formData.nickname}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          name="address"
                          rows={3}
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.push("/admin/therapists")}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("professional")}>
                    Next: Professional Info
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Professional Information Tab */}
            <TabsContent value="professional">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>Enter the therapist's professional details and qualifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary_specialty_id">Primary Specialty *</Label>
                      <Select
                        name="primary_specialty_id"
                        value={formData.primary_specialty_id}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, primary_specialty_id: value }))}
                        required
                      >
                        <SelectTrigger id="primary_specialty_id">
                          <SelectValue placeholder="Select a specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty.specialty_id} value={specialty.specialty_id}>
                              {specialty.specialty_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondary_specialty_id">Secondary Specialty (Optional)</Label>
                      <Select
                        name="secondary_specialty_id"
                        value={formData.secondary_specialty_id}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, secondary_specialty_id: value }))}
                      >
                        <SelectTrigger id="secondary_specialty_id">
                          <SelectValue placeholder="Select a secondary specialty (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty.specialty_id} value={specialty.specialty_id}>
                              {specialty.specialty_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Qualifications & Certifications *</Label>
                      <Textarea
                        id="qualifications"
                        name="qualifications"
                        placeholder="List all relevant qualifications, degrees, and certifications"
                        rows={3}
                        value={formData.qualifications}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="career_start">Career Start Date *</Label>
                      <Input
                        id="career_start"
                        name="career_start"
                        type="date"
                        value={formData.career_start}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="professional_bio">Professional Bio *</Label>
                      <Textarea
                        id="professional_bio"
                        name="professional_bio"
                        placeholder="Write a professional bio that will be displayed on the therapist's profile"
                        rows={5}
                        value={formData.professional_bio}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="therapeutic_approach">Therapeutic Approach *</Label>
                      <Textarea
                        id="therapeutic_approach"
                        name="therapeutic_approach"
                        placeholder="Describe the therapist's approach to therapy and treatment"
                        rows={3}
                        value={formData.therapeutic_approach}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("personal")}>
                    Previous: Personal Info
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("availability")}>
                    Next: Availability
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Availability Settings</CardTitle>
                  <CardDescription>Set the therapist's working days and available time slots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label>Working Days</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {daysOfWeek.map((day) => (
                          <div key={day.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={day.id}
                              checked={selectedDays[day.id] || false}
                              onCheckedChange={(checked) => handleDaySelection(day.id, day.value, checked as boolean)}
                            />
                            <Label htmlFor={day.id} className="font-normal">
                              {day.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                        <Label>Working Hours</Label>
                      </div>

                      {Object.keys(selectedDays)
                        .filter((day) => selectedDays[day])
                        .map((day) => {
                          const dayLabel = daysOfWeek.find((d) => d.id === day)?.label || day
                          const daySchedule = daySchedules[day] || {
                            start_time: "09:00",
                            end_time: "17:00",
                            exceptions: [],
                          }

                          return (
                            <div key={`schedule-${day}`} className="border rounded-lg p-4 space-y-4">
                              <h4 className="font-medium capitalize">{dayLabel}</h4>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`${day}-start-time`}>Start Time *</Label>
                                  <Input
                                    id={`${day}-start-time`}
                                    type="time"
                                    value={daySchedule.start_time}
                                    onChange={(e) => handleDayScheduleChange(day, "start_time", e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`${day}-end-time`}>End Time *</Label>
                                  <Input
                                    id={`${day}-end-time`}
                                    type="time"
                                    value={daySchedule.end_time}
                                    onChange={(e) => handleDayScheduleChange(day, "end_time", e.target.value)}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>Exceptions (Optional)</Label>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addException(day, { start_time: "12:00", end_time: "13:00" })}
                                  >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Exception
                                  </Button>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                  Add time periods when the therapist is NOT available within their regular schedule.
                                </p>

                                {daySchedule.exceptions.length > 0 ? (
                                  <div className="space-y-3 mt-2">
                                    {daySchedule.exceptions.map((exception, index) => (
                                      <div key={`${day}-exception-${index}`} className="flex items-end gap-2">
                                        <div className="space-y-1 flex-1">
                                          <Label htmlFor={`${day}-exception-${index}-start`}>Start Time</Label>
                                          <Input
                                            id={`${day}-exception-${index}-start`}
                                            type="time"
                                            value={exception.start_time}
                                            onChange={(e) => {
                                              const newExceptions = [...daySchedule.exceptions]
                                              newExceptions[index] = {
                                                ...newExceptions[index],
                                                start_time: e.target.value,
                                              }
                                              setDaySchedules((prev) => ({
                                                ...prev,
                                                [day]: {
                                                  ...prev[day],
                                                  exceptions: newExceptions,
                                                },
                                              }))
                                            }}
                                          />
                                        </div>
                                        <div className="space-y-1 flex-1">
                                          <Label htmlFor={`${day}-exception-${index}-end`}>End Time</Label>
                                          <Input
                                            id={`${day}-exception-${index}-end`}
                                            type="time"
                                            value={exception.end_time}
                                            onChange={(e) => {
                                              const newExceptions = [...daySchedule.exceptions]
                                              newExceptions[index] = {
                                                ...newExceptions[index],
                                                end_time: e.target.value,
                                              }
                                              setDaySchedules((prev) => ({
                                                ...prev,
                                                [day]: {
                                                  ...prev[day],
                                                  exceptions: newExceptions,
                                                },
                                              }))
                                            }}
                                          />
                                        </div>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10"
                                          onClick={() => removeException(day, index)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center p-4 border border-dashed rounded-md">
                                    <p className="text-muted-foreground text-sm">No exceptions added</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}

                      {Object.keys(selectedDays).filter((day) => selectedDays[day]).length === 0 && (
                        <div className="text-center p-4 border border-dashed rounded-md">
                          <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Please select working days first</p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label>Session Settings</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="session_duration">Default Session Duration</Label>
                          <Select
                            name="session_duration"
                            value={formData.session_duration}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, session_duration: value }))}
                          >
                            <SelectTrigger id="session_duration">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="45">45 minutes</SelectItem>
                              <SelectItem value="60">60 minutes</SelectItem>
                              <SelectItem value="90">90 minutes</SelectItem>
                              <SelectItem value="120">120 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="buffer_time">Buffer Time Between Sessions</Label>
                          <Select
                            name="buffer_time"
                            value={formData.buffer_time}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, buffer_time: value }))}
                          >
                            <SelectTrigger id="buffer_time">
                              <SelectValue placeholder="Select buffer time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">No buffer</SelectItem>
                              <SelectItem value="5">5 minutes</SelectItem>
                              <SelectItem value="10">10 minutes</SelectItem>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("professional")}>
                    Previous: Professional Info
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("account")}>
                    Next: Account Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Set up the therapist's account and platform access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-4 border p-4 rounded-md">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Initial Account Status</Label>
                      <Select
                        name="authorized"
                        value={formData.authorized}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, authorized: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Active (can login immediately)</SelectItem>
                          <SelectItem value="0">Pending (requires admin approval)</SelectItem>
                          <SelectItem value="2">Disabled (account disabled)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Platform Permissions</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="perm-appointments"
                            checked={formData.permission_ids.includes(1)}
                            onCheckedChange={(checked) => handlePermissionToggle(1, checked as boolean)}
                          />
                          <Label htmlFor="perm-appointments" className="font-normal">
                            Manage appointments
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="perm-clients"
                            checked={formData.permission_ids.includes(2)}
                            onCheckedChange={(checked) => handlePermissionToggle(2, checked as boolean)}
                          />
                          <Label htmlFor="perm-clients" className="font-normal">
                            View assigned clients
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="perm-notes"
                            checked={formData.permission_ids.includes(3)}
                            onCheckedChange={(checked) => handlePermissionToggle(3, checked as boolean)}
                          />
                          <Label htmlFor="perm-notes" className="font-normal">
                            Create session notes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="perm-resources"
                            checked={formData.permission_ids.includes(4)}
                            onCheckedChange={(checked) => handlePermissionToggle(4, checked as boolean)}
                          />
                          <Label htmlFor="perm-resources" className="font-normal">
                            Access resources library
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="perm-blog"
                            checked={formData.permission_ids.includes(5)}
                            onCheckedChange={(checked) => handlePermissionToggle(5, checked as boolean)}
                          />
                          <Label htmlFor="perm-blog" className="font-normal">
                            Create blog content
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("availability")}>
                    Previous: Availability
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Saving...
                      </>
                    ) : (
                      "Save Therapist"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </main>
    </div>
  )
}


export default function Wrapped () {
  return(
    <Suspense>
      <NewTherapistPage />
    </Suspense>
  )
}