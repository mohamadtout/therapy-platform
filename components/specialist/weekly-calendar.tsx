"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { specialistService } from "@/lib/api/api-services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Edit, Plus, Trash2, Calendar, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Types
interface ScheduleException {
  tse_id: string
  exception_start_time: string
  exception_end_time: string
}

interface ScheduleDay {
  id: string // ts_id
  day: number // 1-7 for Monday-Sunday
  start_time: string // HH:MM format
  end_time: string // HH:MM format
  exceptions: ScheduleException[]
}
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function WeeklyCalendar() {
  const { toast } = useToast()
  const [schedule, setSchedule] = useState<ScheduleDay[]>([])
  const [loading, setLoading] = useState(true)
  const [editingDay, setEditingDay] = useState<Partial<ScheduleDay> | null>(null)
  const [editingException, setEditingException] = useState<
    (Partial<ScheduleException> & { scheduleId: string }) | null
  >(null)
  const [newException, setNewException] = useState<{ ts_id: string; start_time: string; end_time: string }>({
    ts_id: "",
    start_time: "09:00",
    end_time: "17:00",
  })
  const [selectedScheduleForException, setSelectedScheduleForException] = useState<ScheduleDay | null>(null)
  const [activeTab, setActiveTab] = useState("regular")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch schedule and exceptions
  useEffect(() => {
    fetchScheduleData()
  }, [])

  const fetchScheduleData = async () => {
    try {
      setLoading(true)
      const response = await specialistService.getScheduleWithExceptions()

      // If schedule data is empty, initialize with empty array
      setSchedule(response.data.schedule || [])
    } catch (error) {
      console.error("Error fetching schedule data:", error)
      toast({
        title: "Error",
        description: "Failed to load schedule data. Please try again.",
        variant: "destructive",
      })
      // Initialize with empty array on error
      setSchedule([])
    } finally {
      setLoading(false)
    }
  }

  // Add a new schedule
  const handleAddSchedule = async (day: number, start_time: string, end_time: string) => {
    try {
      setIsSubmitting(true)
      await specialistService.updateSchedule({
        schedule_add: [{ day, start_time, end_time }],
      })

      // Refetch schedule data to get the new ID
      await fetchScheduleData()

      toast({
        title: "Schedule created",
        description: `Your schedule for ${dayNames[day - 1]} has been created.`,
      })

      setEditingDay(null)
    } catch (error) {
      console.error("Error creating schedule:", error)
      toast({
        title: "Error",
        description: "Failed to create schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update existing schedule
  const handleUpdateSchedule = async (id: string, day: number, start_time: string, end_time: string) => {
    try {
      setIsSubmitting(true)
      await specialistService.updateSchedule({
        schedule_edit: [{ id, day, start_time, end_time }],
      })

      // Update local state
      setSchedule(schedule.map((s) => (s.id === id ? { ...s, day, start_time, end_time } : s)))

      toast({
        title: "Schedule updated",
        description: `Your schedule for ${dayNames[day - 1]} has been updated.`,
      })

      setEditingDay(null)
    } catch (error) {
      console.error("Error updating schedule:", error)
      toast({
        title: "Error",
        description: "Failed to update schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Remove schedule
  const handleRemoveSchedule = async (id: string) => {
    try {
      setIsSubmitting(true)
      await specialistService.updateSchedule({
        schedule_remove: [{ ts_id: id }],
      })

      // Update local state
      setSchedule(schedule.filter((s) => s.id !== id))

      toast({
        title: "Schedule removed",
        description: "Your schedule has been removed.",
      })
    } catch (error) {
      console.error("Error removing schedule:", error)
      toast({
        title: "Error",
        description: "Failed to remove schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add exception
  const handleAddException = async () => {
    if (!selectedScheduleForException) {
      toast({
        title: "Error",
        description: "Please select a schedule day first.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await specialistService.updateScheduleException({
        exception_add: [
          {
            ts_id: newException.ts_id,
            start_time: newException.start_time,
            end_time: newException.end_time,
          },
        ],
      })

      // Refetch schedule data to get the new exception
      await fetchScheduleData()

      toast({
        title: "Exception added",
        description: `Schedule exception has been added.`,
      })

      setNewException({
        ts_id: "",
        start_time: "09:00",
        end_time: "17:00",
      })
      setSelectedScheduleForException(null)
    } catch (error) {
      console.error("Error adding exception:", error)
      toast({
        title: "Error",
        description: "Failed to add exception. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update exception
  const handleUpdateException = async () => {
    if (!editingException || !editingException.tse_id) {
      return
    }

    try {
      setIsSubmitting(true)
      await specialistService.updateScheduleException({
        exception_edit: [
          {
            tse_id: editingException.tse_id,
            start_time: editingException.exception_start_time || "",
            end_time: editingException.exception_end_time || "",
          },
        ],
      })

      // Update local state
      setSchedule(
        schedule.map((s) => {
          if (s.id === editingException.scheduleId) {
            return {
              ...s,
              exceptions: s.exceptions.map((e) =>
                e.tse_id === editingException.tse_id
                  ? {
                      ...e,
                      exception_start_time: editingException.exception_start_time || e.exception_start_time,
                      exception_end_time: editingException.exception_end_time || e.exception_end_time,
                    }
                  : e,
              ),
            }
          }
          return s
        }),
      )

      toast({
        title: "Exception updated",
        description: `Schedule exception has been updated.`,
      })

      setEditingException(null)
    } catch (error) {
      console.error("Error updating exception:", error)
      toast({
        title: "Error",
        description: "Failed to update exception. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Remove exception
  const handleRemoveException = async (tse_id: string) => {
    try {
      setIsSubmitting(true)
      await specialistService.updateScheduleException({
        exception_remove: [{ tse_id }],
      })

      // Update local state
      setSchedule(
        schedule.map((s) => ({
          ...s,
          exceptions: s.exceptions.filter((e) => e.tse_id !== tse_id),
        })),
      )

      toast({
        title: "Exception removed",
        description: "Schedule exception has been removed.",
      })
    } catch (error) {
      console.error("Error removing exception:", error)
      toast({
        title: "Error",
        description: "Failed to remove exception. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get all exceptions from all schedules
  const getAllExceptions = () => {
    return schedule.flatMap((s) =>
      s.exceptions.map((e) => ({
        ...e,
        scheduleId: s.id,
        day: s.day,
      })),
    )
  }

  // Validate time inputs
  const validateTimeRange = (start: string, end: string) => {
    const startTime = new Date(`2000-01-01T${start}:00`)
    const endTime = new Date(`2000-01-01T${end}:00`)
    return startTime < endTime
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading schedule...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="regular">Regular Schedule</TabsTrigger>
            <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
          </TabsList>

          <TabsContent value="regular">
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-4">
                {dayNames.map((dayName, index) => {
                  // Day index is 0-based, but backend expects 1-based (1 = Monday)
                  const dayNumber = index + 1
                  const daySchedule = schedule.find((s) => s.day === dayNumber)
                  const hasSchedule = !!daySchedule

                  return (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 flex flex-col ${!hasSchedule ? "border-dashed border-gray-300" : ""}`}
                    >
                      <div className="font-medium text-center mb-2">{dayName}</div>
                      {hasSchedule ? (
                        <>
                          <div className="text-center mb-2 text-sm">
                            <div className="flex items-center justify-center gap-1 text-gray-600">
                              <Clock className="h-3 w-3" />
                              <span>
                                {daySchedule.start_time} - {daySchedule.end_time}
                              </span>
                            </div>
                          </div>
                          <div className="mt-auto pt-2 space-y-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => setEditingDay(daySchedule)}
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit {dayName} Schedule</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor={`start-time-${index}`}>Start Time</Label>
                                      <Input
                                        id={`start-time-${index}`}
                                        type="time"
                                        value={editingDay?.start_time || daySchedule.start_time}
                                        onChange={(e) =>
                                          setEditingDay({
                                            ...daySchedule,
                                            start_time: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`end-time-${index}`}>End Time</Label>
                                      <Input
                                        id={`end-time-${index}`}
                                        type="time"
                                        value={editingDay?.end_time || daySchedule.end_time}
                                        onChange={(e) =>
                                          setEditingDay({
                                            ...daySchedule,
                                            end_time: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    onClick={() => {
                                      if (editingDay && editingDay.id) {
                                        const startTime = editingDay.start_time || daySchedule.start_time
                                        const endTime = editingDay.end_time || daySchedule.end_time

                                        if (!validateTimeRange(startTime, endTime)) {
                                          toast({
                                            title: "Invalid time range",
                                            description: "End time must be after start time",
                                            variant: "destructive",
                                          })
                                          return
                                        }

                                        handleUpdateSchedule(editingDay.id, dayNumber, startTime, endTime)
                                      }
                                    }}
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? (
                                      <>
                                        <span className="animate-spin mr-2">⏳</span>
                                        Saving...
                                      </>
                                    ) : (
                                      "Save Changes"
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveSchedule(daySchedule.id)}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <span className="animate-spin mr-2">⏳</span>
                              ) : (
                                <Trash2 className="h-3 w-3 mr-1" />
                              )}
                              Remove
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center mb-2 text-sm text-gray-500">
                            <div className="flex items-center justify-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>No Schedule Set</span>
                            </div>
                          </div>
                          <div className="mt-auto pt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() =>
                                    setEditingDay({
                                      day: dayNumber,
                                      start_time: "09:00",
                                      end_time: "17:00",
                                    })
                                  }
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add {dayName} Schedule</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor={`new-start-time-${index}`}>Start Time</Label>
                                      <Input
                                        id={`new-start-time-${index}`}
                                        type="time"
                                        value={editingDay?.start_time || "09:00"}
                                        onChange={(e) =>
                                          setEditingDay({
                                            ...editingDay!,
                                            start_time: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`new-end-time-${index}`}>End Time</Label>
                                      <Input
                                        id={`new-end-time-${index}`}
                                        type="time"
                                        value={editingDay?.end_time || "17:00"}
                                        onChange={(e) =>
                                          setEditingDay({
                                            ...editingDay!,
                                            end_time: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    onClick={() => {
                                      if (editingDay) {
                                        const startTime = editingDay.start_time || "09:00"
                                        const endTime = editingDay.end_time || "17:00"

                                        if (!validateTimeRange(startTime, endTime)) {
                                          toast({
                                            title: "Invalid time range",
                                            description: "End time must be after start time",
                                            variant: "destructive",
                                          })
                                          return
                                        }

                                        handleAddSchedule(dayNumber, startTime, endTime)
                                      }
                                    }}
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? (
                                      <>
                                        <span className="animate-spin mr-2">⏳</span>
                                        Creating...
                                      </>
                                    ) : (
                                      "Create Schedule"
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exceptions">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Schedule Exceptions</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Exception
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Schedule Exception</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="schedule-day">Select Schedule Day</Label>
                        <Select
                          value={selectedScheduleForException?.id || ""}
                          onValueChange={(value) => {
                            const selected = schedule.find((s) => s.id === value)
                            setSelectedScheduleForException(selected || null)
                            setNewException({
                              ...newException,
                              ts_id: value,
                            })
                          }}
                        >
                          <SelectTrigger id="schedule-day">
                            <SelectValue placeholder="Select a day" />
                          </SelectTrigger>
                          <SelectContent>
                            {schedule.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {dayNames[s.day - 1]} ({s.start_time} - {s.end_time})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="exception-start-time">Start Time</Label>
                          <Input
                            id="exception-start-time"
                            type="time"
                            value={newException.start_time}
                            onChange={(e) =>
                              setNewException({
                                ...newException,
                                start_time: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="exception-end-time">End Time</Label>
                          <Input
                            id="exception-end-time"
                            type="time"
                            value={newException.end_time}
                            onChange={(e) =>
                              setNewException({
                                ...newException,
                                end_time: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {selectedScheduleForException && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Important</AlertTitle>
                          <AlertDescription>
                            Exceptions represent times when you are NOT available within your regular schedule.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={() => {
                          const startTime = newException.start_time
                          const endTime = newException.end_time

                          if (!validateTimeRange(startTime, endTime)) {
                            toast({
                              title: "Invalid time range",
                              description: "End time must be after start time",
                              variant: "destructive",
                            })
                            return
                          }

                          handleAddException()
                        }}
                        disabled={isSubmitting || !selectedScheduleForException}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Adding...
                          </>
                        ) : (
                          "Add Exception"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {schedule.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No schedule found</AlertTitle>
                  <AlertDescription>
                    You need to create a regular schedule before you can add exceptions.
                  </AlertDescription>
                </Alert>
              )}

              {schedule.length > 0 && getAllExceptions().length === 0 ? (
                <div className="border rounded-lg p-8 text-center">
                  <p className="text-gray-500">No schedule exceptions found.</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Add exceptions for times when you are not available within your regular schedule.
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4">Day</th>
                        <th className="text-left py-3 px-4">Regular Hours</th>
                        <th className="text-left py-3 px-4">Exception Hours</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllExceptions().map((exception) => {
                        const scheduleDay = schedule.find((s) => s.id === exception.scheduleId)
                        return (
                          <tr key={exception.tse_id} className="border-t">
                            <td className="py-3 px-4">{scheduleDay ? dayNames[scheduleDay.day - 1] : "Unknown"}</td>
                            <td className="py-3 px-4">
                              {scheduleDay ? `${scheduleDay.start_time} - ${scheduleDay.end_time}` : "Unknown"}
                            </td>
                            <td className="py-3 px-4">
                              {`${exception.exception_start_time} - ${exception.exception_end_time}`}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        setEditingException({
                                          ...exception,
                                          scheduleId: exception.scheduleId,
                                        })
                                      }
                                    >
                                      <Edit className="h-3 w-3 mr-1" />
                                      Edit
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Schedule Exception</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-exception-start-time">Start Time</Label>
                                          <Input
                                            id="edit-exception-start-time"
                                            type="time"
                                            value={
                                              editingException?.exception_start_time || exception.exception_start_time
                                            }
                                            onChange={(e) =>
                                              setEditingException({
                                                ...editingException!,
                                                exception_start_time: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-exception-end-time">End Time</Label>
                                          <Input
                                            id="edit-exception-end-time"
                                            type="time"
                                            value={editingException?.exception_end_time || exception.exception_end_time}
                                            onChange={(e) =>
                                              setEditingException({
                                                ...editingException!,
                                                exception_end_time: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>

                                      <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Important</AlertTitle>
                                        <AlertDescription>
                                          Exceptions represent times when you are NOT available within your regular
                                          schedule.
                                        </AlertDescription>
                                      </Alert>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                      </DialogClose>
                                      <Button
                                        onClick={() => {
                                          if (editingException) {
                                            const startTime =
                                              editingException.exception_start_time || exception.exception_start_time
                                            const endTime =
                                              editingException.exception_end_time || exception.exception_end_time

                                            if (!validateTimeRange(startTime, endTime)) {
                                              toast({
                                                title: "Invalid time range",
                                                description: "End time must be after start time",
                                                variant: "destructive",
                                              })
                                              return
                                            }

                                            handleUpdateException()
                                          }
                                        }}
                                        disabled={isSubmitting}
                                      >
                                        {isSubmitting ? (
                                          <>
                                            <span className="animate-spin mr-2">⏳</span>
                                            Saving...
                                          </>
                                        ) : (
                                          "Save Changes"
                                        )}
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleRemoveException(exception.tse_id)}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? (
                                    <span className="animate-spin mr-2">⏳</span>
                                  ) : (
                                    <Trash2 className="h-3 w-3 mr-1" />
                                  )}
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
