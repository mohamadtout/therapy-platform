"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addDays, isSameDay, startOfDay } from "date-fns"

interface DateSelectorProps {
  selectedDate: string | null
  onSelect: (date: string) => void
}

export function DateSelector({ selectedDate, onSelect }: DateSelectorProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [visibleDates, setVisibleDates] = useState<Date[]>(() => {
    // Initialize with the next 7 days from today
    const dates = []
    const today = startOfDay(new Date())
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(today, i))
    }
    return dates
  })

  // Generate dates for the next 30 days
  useEffect(() => {
    const dates = []
    const today = startOfDay(new Date())

    for (let i = 0; i < 30; i++) {
      dates.push(addDays(today, i))
    }

    setVisibleDates(dates.slice(0, 7)) // Show first 7 days initially
  }, [])

  const handlePrevWeek = () => {
    const firstVisibleDate = visibleDates[0]
    const newFirstDate = addDays(firstVisibleDate, -7)

    // Don't go before today
    if (newFirstDate >= startOfDay(new Date())) {
      setVisibleDates(Array.from({ length: 7 }, (_, i) => addDays(newFirstDate, i)))
    }
  }

  const handleNextWeek = () => {
    const lastVisibleDate = visibleDates[visibleDates.length - 1]
    const newFirstDate = addDays(lastVisibleDate, 1)

    // Don't go beyond 30 days from today
    const maxDate = addDays(startOfDay(new Date()), 29)
    if (newFirstDate <= maxDate) {
      setVisibleDates(Array.from({ length: 7 }, (_, i) => addDays(newFirstDate, i)))
    }
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return isSameDay(date, new Date(selectedDate))
  }

  const formatDateForAPI = (date: Date) => {
    return format(date, "yyyy-MM-dd")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select a Date</h3>

      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={handlePrevWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          {visibleDates.length > 0 ? (
            <>
              {format(visibleDates[0], "MMM d")} - {format(visibleDates[visibleDates.length - 1], "MMM d, yyyy")}
            </>
          ) : (
            "Loading dates..."
          )}
        </div>
        <Button variant="outline" size="icon" onClick={handleNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {visibleDates.map((date) => (
          <div
            key={date.toISOString()}
            className={`flex flex-col items-center justify-center p-2 rounded-md cursor-pointer border ${
              isDateSelected(date) ? "bg-primary text-white border-primary" : "hover:bg-gray-50 border-gray-200"
            }`}
            onClick={() => onSelect(formatDateForAPI(date))}
          >
            <span className="text-xs">{format(date, "EEE")}</span>
            <span className="text-lg font-bold">{format(date, "d")}</span>
            <span className="text-xs">{format(date, "MMM")}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
