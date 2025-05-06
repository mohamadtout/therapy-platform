"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TherapistAvailability() {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      // Success state handled by UI
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
          <h1 className="text-2xl font-bold tracking-tight">Availability Settings</h1>
          <p className="text-muted-foreground">Set your working days and available time slots</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Availability Settings</CardTitle>
          <CardDescription>Set the therapist's working days and available time slots</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
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
                <div className="space-y-4">
                  {selectedDays.map((day) => (
                    <div key={day} className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">{day}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${day.toLowerCase()}-start`} className="text-sm">
                            Start Time
                          </Label>
                          <Select defaultValue="09:00">
                            <SelectTrigger id={`${day.toLowerCase()}-start`}>
                              <SelectValue placeholder="Select start time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                                <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                  {hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? "12:00 PM" : `${hour}:00 AM`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${day.toLowerCase()}-end`} className="text-sm">
                            End Time
                          </Label>
                          <Select defaultValue="17:00">
                            <SelectTrigger id={`${day.toLowerCase()}-end`}>
                              <SelectValue placeholder="Select end time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                                <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                  {hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? "12:00 PM" : `${hour}:00 AM`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" type="button" className="text-xs">
                          + Add Break Time
                        </Button>
                      </div>
                    </div>
                  ))}
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

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting} className="bg-onesti-purple hover:bg-purple-800 text-white">
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

