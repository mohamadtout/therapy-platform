"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Clock } from "lucide-react"

// Specialties available in the platform
const specialties = [
  "Speech Therapist",
  "Occupational Therapist",
  "Behavioral Therapist",
  "ABA Therapist",
  "Developmental Psychologist",
  "Educational Therapist",
  "Physical Therapist",
  "Music Therapist",
  "Art Therapist",
  "Play Therapist",
]

export default function TherapistProfile() {
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove profile image
  const removeProfileImage = () => {
    setProfileImage(null)
  }

  // Handle day selection
  const handleDaySelection = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
      alert("Profile updated successfully")
    }, 1500)
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
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">View and update your profile information</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "personal"
                  ? "border-b-2 border-onesti-purple text-onesti-purple"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("professional")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "professional"
                  ? "border-b-2 border-onesti-purple text-onesti-purple"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Professional Info
            </button>
            <button
              onClick={() => setActiveTab("availability")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "availability"
                  ? "border-b-2 border-onesti-purple text-onesti-purple"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Availability
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "account"
                  ? "border-b-2 border-onesti-purple text-onesti-purple"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Account
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Personal Information Tab */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Personal Information</h2>
                  <p className="text-sm text-gray-500">Enter the therapist's basic personal information</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3 flex flex-col items-center">
                    <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden mb-2">
                      {profileImage ? (
                        <img
                          src={profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <label htmlFor="photo-upload" className="text-blue-600 font-medium cursor-pointer">
                      Upload Photo
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <p className="text-sm text-gray-500 mt-1">Recommended: 300×300px</p>
                  </div>

                  <div className="w-full md:w-2/3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-sm font-medium">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="first-name"
                          placeholder="Enter first name"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-sm font-medium">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="last-name"
                          placeholder="Enter last name"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter phone number"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob" className="text-sm font-medium">
                          Date of Birth
                        </Label>
                        <div className="relative">
                          <Input
                            id="dob"
                            type="date"
                            placeholder="dd/mm/yyyy"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your address"
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("professional")}
                    className="bg-onesti-purple hover:bg-purple-800 text-white"
                  >
                    Next: Professional Info
                  </Button>
                </div>
              </div>
            )}

            {/* Professional Information Tab */}
            {activeTab === "professional" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Professional Information</h2>
                  <p className="text-sm text-gray-500">Enter the therapist's professional details and qualifications</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-specialty" className="text-sm font-medium">
                      Primary Specialty <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger id="primary-specialty" className="w-full">
                        <SelectValue placeholder="Select primary specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-specialty" className="text-sm font-medium">
                      Secondary Specialty (Optional)
                    </Label>
                    <Select>
                      <SelectTrigger id="secondary-specialty" className="w-full">
                        <SelectValue placeholder="Select secondary specialty (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualifications" className="text-sm font-medium">
                      Qualifications & Certifications <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="qualifications"
                      placeholder="List all relevant qualifications, degrees, and certifications"
                      rows={3}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-medium">
                      Years of Experience <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      placeholder="Enter years of experience"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="languages" className="text-sm font-medium">
                      Languages Spoken <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="languages"
                      placeholder="e.g., English, Arabic, French"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      Professional Bio <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a professional bio that will be displayed on the therapist's profile"
                      rows={4}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="approach" className="text-sm font-medium">
                      Therapeutic Approach
                    </Label>
                    <Textarea
                      id="approach"
                      placeholder="Describe the therapist's approach to therapy and treatment"
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("personal")}>
                    Previous: Personal Info
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("availability")}
                    className="bg-onesti-purple hover:bg-purple-800 text-white"
                  >
                    Next: Availability
                  </Button>
                </div>
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === "availability" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Availability Settings</h2>
                  <p className="text-sm text-gray-500">Set the therapist's working days and available time slots</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Working Days</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day.toLowerCase()}
                            checked={selectedDays.includes(day)}
                            onCheckedChange={() => handleDaySelection(day)}
                          />
                          <label
                            htmlFor={day.toLowerCase()}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <h3 className="text-md font-medium">Available Time Slots</h3>
                    </div>

                    {selectedDays.length > 0 ? (
                      <div className="border rounded-md p-4">
                        <p className="text-sm text-gray-500">
                          Time slot configuration will appear here after selecting working days
                        </p>
                      </div>
                    ) : (
                      <div className="border rounded-md p-8 flex flex-col items-center justify-center text-gray-500">
                        <div className="rounded-full bg-gray-100 p-3 mb-2">
                          <Clock className="h-6 w-6" />
                        </div>
                        <p>Please select working days first</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-md font-medium mb-4">Session Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="session-duration" className="text-sm font-medium">
                          Default Session Duration
                        </Label>
                        <Select defaultValue="60">
                          <SelectTrigger id="session-duration">
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
                        <Label htmlFor="buffer-time" className="text-sm font-medium">
                          Buffer Time Between Sessions
                        </Label>
                        <Select defaultValue="15">
                          <SelectTrigger id="buffer-time">
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

                <div className="flex justify-between mt-8">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("professional")}>
                    Previous: Professional Info
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("account")}
                    className="bg-onesti-purple hover:bg-purple-800 text-white"
                  >
                    Next: Account Settings
                  </Button>
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Account Settings</h2>
                  <p className="text-sm text-gray-500">Manage account credentials and preferences</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="username"
                      placeholder="Enter username"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-sm font-medium">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter current password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-sm font-medium">
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-medium">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-md font-medium">Notification Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notif-appointments" defaultChecked />
                        <label
                          htmlFor="notif-appointments"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Appointment reminders
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notif-messages" defaultChecked />
                        <label
                          htmlFor="notif-messages"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          New messages
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notif-updates" defaultChecked />
                        <label
                          htmlFor="notif-updates"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Platform updates
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("availability")}>
                    Previous: Availability
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-onesti-purple hover:bg-purple-800 text-white"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

