"use client"

import { Clock } from "lucide-react"

interface TimeSlot {
  start: string
  end: string
}

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[]
  selectedTimeSlot: TimeSlot | null
  onSelect: (timeSlot: TimeSlot) => void
  isLoading: boolean
}

export function TimeSlotSelector({ timeSlots, selectedTimeSlot, onSelect, isLoading }: TimeSlotSelectorProps) {
  // Group time slots by morning, afternoon, evening
  const groupedTimeSlots = {
    morning: timeSlots.filter((slot) => {
      const hour = Number.parseInt(slot.start.split(":")[0])
      return hour >= 6 && hour < 12
    }),
    afternoon: timeSlots.filter((slot) => {
      const hour = Number.parseInt(slot.start.split(":")[0])
      return hour >= 12 && hour < 17
    }),
    evening: timeSlots.filter((slot) => {
      const hour = Number.parseInt(slot.start.split(":")[0])
      return hour >= 17 && hour < 24
    }),
  }

  const isTimeSlotSelected = (timeSlot: TimeSlot) => {
    if (!selectedTimeSlot) return false
    return timeSlot.start === selectedTimeSlot.start && timeSlot.end === selectedTimeSlot.end
  }

  // Format time from 24h to 12h format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (timeSlots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No available time slots for the selected date.</p>
        <p className="text-sm text-gray-400 mt-2">Please select a different date.</p>
      </div>
    )
  }

  const renderTimeSlotGroup = (title: string, slots: TimeSlot[]) => {
    if (slots.length === 0) return null

    return (
      <div className="mb-6">
        <h4 className="text-md font-medium text-center mb-3">{title}</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {slots.map((slot, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-3 rounded-md border cursor-pointer ${
                isTimeSlotSelected(slot) ? "bg-primary/10 border-primary" : "hover:bg-gray-50"
              }`}
              onClick={() => onSelect(slot)}
            >
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">
                {formatTime(slot.start)} - {formatTime(slot.end)}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select a Time Slot</h3>

      <div className="space-y-2">
        {renderTimeSlotGroup("Morning", groupedTimeSlots.morning)}
        {renderTimeSlotGroup("Afternoon", groupedTimeSlots.afternoon)}
        {renderTimeSlotGroup("Evening", groupedTimeSlots.evening)}
      </div>
    </div>
  )
}
