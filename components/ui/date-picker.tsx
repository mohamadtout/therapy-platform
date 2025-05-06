"use client"

import type * as React from "react"
import { Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "react-day-picker"
import { format } from "date-fns"

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date
  onChange?: (date: Date | undefined) => void
}

export function DatePicker({ className, date, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onChange}
          className="border-0"
          style={{ margin: "0" }}
        />
      </PopoverContent>
    </Popover>
  )
}

