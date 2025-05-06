"use client"

import { DialogTrigger } from "@/components/ui/dialog"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { specialistService, Profile, Specialty } from "@/lib/api/api-services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Camera, Check, Loader2, X, User, Phone, MapPin, Lock, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


interface ProfileSettingsProps {
  profile: Profile
  userId: string
  onProfileUpdate: (updatedProfile: Profile) => void
  isLoading?: boolean
}

export function ProfileSettings({ profile, userId, onProfileUpdate, isLoading = false }: ProfileSettingsProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    nickname: "",
    phone: "",
    address: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])

  // Profile image
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<string | null>(null)

  const { toast } = useToast()

  // Initialize form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        nickname: profile.nickname || "",
        phone: profile.phone || "",
        address: profile.address || "",
      })

      setSelectedSpecialties(profile.specialties.map((specialty: Specialty) => specialty.specialty_id))
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSpecialtyToggle = (specialtyId: string) => {
    setSelectedSpecialties((prev) => {
      if (prev.includes(specialtyId)) {
        return prev.filter((id) => id !== specialtyId)
      } else {
        return [...prev, specialtyId]
      }
    })
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setPreviewImage(result)
      setImageFile(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveProfile = async () => {
    if (!profile) return

    // Validate required fields
    if (!formData.nickname || !formData.phone) {
      toast({
        title: "Error",
        description: "Name and phone number are required fields",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const response = await specialistService.updateProfile({
        nickname: formData.nickname,
        phone: formData.phone,
        pfp: imageFile || undefined,
        specialties: selectedSpecialties,
      })

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })

      // Create updated profile object
      const updatedProfile = {
        ...profile,
        nickname: formData.nickname,
        phone: formData.phone,
        address: formData.address,
        // If we have a new image, use it, otherwise keep the existing one
        pfp: imageFile ? URL.createObjectURL(new Blob([imageFile])) : profile.pfp,
        // Update specialties to match selected ones
        specialties: profile.specialties_all.filter((specialty) =>
          selectedSpecialties.includes(specialty.specialty_id),
        ),
      }

      // Send updated profile back to parent
      onProfileUpdate(updatedProfile)

      // Reset image states
      setPreviewImage(null)
      setImageFile(null)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    // Password validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      // Call password change API (mock for now)
      // await profileService.changePassword(passwordData.currentPassword, passwordData.newPassword)

      toast({
        title: "Success",
        description: "Password changed successfully",
      })

      // Reset form and close dialog
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setIsPasswordDialogOpen(false)
    } catch (error) {
      console.error("Error changing password:", error)
      toast({
        title: "Error",
        description: "Failed to change password. Please check your current password and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">Failed to load profile information</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your profile information and specialties</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 pt-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative cursor-pointer group" onClick={handleImageClick}>
                  <Image
                    src={previewImage || profile.pfp || "/placeholder.svg?height=150&width=150"}
                    alt="Profile"
                    width={150}
                    height={150}
                    className="rounded-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Click to change profile picture</p>
              </div>

              {/* Profile Form */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nickname">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center">
                      <Input id="email" name="email" value={profile.email} disabled className="bg-gray-50" />
                    </div>
                    <p className="text-xs text-gray-500">Email address cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInputChange}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleChangePassword} disabled={isSaving}>
                          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Change Password
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specialties" className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Your Specialties</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Select the specialties that best describe your expertise. These will be visible to patients.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {profile.specialties_all.map((specialty) => (
                    <div
                      key={specialty.specialty_id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedSpecialties.includes(specialty.specialty_id)
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleSpecialtyToggle(specialty.specialty_id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{specialty.specialty_name}</span>
                        {selectedSpecialties.includes(specialty.specialty_id) && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Selected Specialties</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSpecialties.length === 0 ? (
                    <p className="text-sm text-gray-500">No specialties selected</p>
                  ) : (
                    profile.specialties_all
                      .filter((specialty) => selectedSpecialties.includes(specialty.specialty_id))
                      .map((specialty) => (
                        <Badge
                          key={specialty.specialty_id}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          {specialty.specialty_name}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => handleSpecialtyToggle(specialty.specialty_id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Specialties
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
