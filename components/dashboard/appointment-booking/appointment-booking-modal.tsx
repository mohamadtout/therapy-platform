"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { TherapistSelector } from "./therapist-selector"
import { DateSelector } from "./date-selector"
import { TimeSlotSelector } from "./time-slot-selector"
import { patientAppointmentService } from "@/lib/api/api-services"

interface AppointmentBookingModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  children: any[]
  onSuccess?: () => void
}

interface Therapist {
  therapist_id: string
  nickname: string
  pfp: string
  specialties: { specialty_name: string }[]
}

interface TimeSlot {
  start: string
  end: string
}

export function AppointmentBookingModal({
  isOpen,
  onClose,
  userId,
  children,
  onSuccess,
}: AppointmentBookingModalProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  const [selectedChild, setSelectedChild] = useState<number | null>(null)

  // Fetch therapists on component mount
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setIsLoading(true)
        const response = await patientAppointmentService.getTherapistsDetails()
        setTherapists(response.data.therapistDetails)
      } catch (error) {
        console.error("Error fetching therapists:", error)
        toast({
          title: "Error",
          description: "Failed to load therapists. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      fetchTherapists()
    }
  }, [isOpen, toast])

  // Fetch available time slots when therapist and date are selected
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedTherapist || !selectedDate) return

      try {
        setIsLoading(true)
        const response = await patientAppointmentService.getConsultationSchedule(selectedDate, selectedTherapist)
        setAvailableTimeSlots(response.data.schedule)
      } catch (error) {
        console.error("Error fetching time slots:", error)
        toast({
          title: "Error",
          description: "Failed to load available time slots. Please try again.",
          variant: "destructive",
        })
        setAvailableTimeSlots([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTimeSlots()
  }, [selectedTherapist, selectedDate, toast])

  const handleTherapistSelect = (therapistId: string) => {
    setSelectedTherapist(therapistId)
    setSelectedTimeSlot(null)
    setStep(2)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null)
    setStep(3)
  }

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot)
  }

  const handleChildSelect = (childId: number) => {
    setSelectedChild(childId)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleBookAppointment = async () => {
    if (!selectedTherapist || !selectedDate || !selectedTimeSlot || !selectedChild) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      await patientAppointmentService.bookConsultation(
        selectedDate,
        selectedTimeSlot,
        userId,
        selectedTherapist,
        selectedChild,
      )

      toast({
        title: "Appointment Booked",
        description: "Your appointment has been successfully booked.",
      })

      if (onSuccess) {
        onSuccess()
      }

      onClose()
    } catch (error: any) {
      console.error("Error booking appointment:", error)
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || "Failed to book appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <TherapistSelector
            therapists={therapists}
            selectedTherapist={selectedTherapist}
            onSelect={handleTherapistSelect}
            isLoading={isLoading}
          />
        )
      case 2:
        return <DateSelector selectedDate={selectedDate} onSelect={handleDateSelect} />
      case 3:
        return (
          <>
            <TimeSlotSelector
              timeSlots={availableTimeSlots}
              selectedTimeSlot={selectedTimeSlot}
              onSelect={handleTimeSlotSelect}
              isLoading={isLoading}
            />

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Select Child</h3>
              {children.length > 0 ?  children.map((child) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                  <div
                    key={child.id}
                    className={`border rounded-lg p-3 cursor-pointer ${
                      selectedChild === child.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleChildSelect(child.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={child.image || "/placeholder.svg?height=32&width=32"}
                          alt={child.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{child.name}</p>
                        <p className="text-xs text-gray-500">{child.age}</p>
                      </div>
                    </div>
                  </div>
                  </div>
                )) :
                (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium">
                      No Children Added Yet
                    </h3>
                    <p className="text-gray-500 mb-4">Go to "Family Members" section to add children</p>
                    {/* <Button asChild>
                      <Link href="/packages">Browse Packages</Link>
                    </Button> */}
                  </div>
                )
                }
              
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-24 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              2
            </div>
            <div className={`h-1 w-24 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Select Therapist</span>
            <span>Select Date</span>
            <span>Select Time & Child</span>
          </div>
        </div>

        {renderStepContent()}

        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          {step === 3 ? (
            <Button onClick={handleBookAppointment} disabled={isLoading || !selectedTimeSlot || !selectedChild}>
              {isLoading ? "Booking..." : "Book Appointment"}
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
