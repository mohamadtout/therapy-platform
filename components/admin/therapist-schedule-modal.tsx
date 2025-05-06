"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { adminTherapistsService } from "@/lib/api/api-services"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface TherapistScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  therapistId: string | null
}

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function TherapistScheduleModal({ isOpen, onClose, therapistId }: TherapistScheduleModalProps) {
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

  // Fetch schedule when modal opens and therapistId changes
  useEffect(() => {
    if (isOpen && therapistId) {
      fetchScheduleData()
    }
  }, [isOpen, therapistId])

  const fetchScheduleData = async () => {
    if (!therapistId) return

    try {
      setLoading(true)
      const response = await adminTherapistsService.getTherapistSchedule(therapistId)

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
    if (!therapistId) return

    try {
      setIsSubmitting(true)
      await adminTherapistsService.updateTherapistSchedule(therapistId, {
        schedule_add: [{ day, start_time, end_time }],
      })

      // Refetch schedule data to get the new ID
      await fetchScheduleData()

      toast({
        title: "Schedule created",
        description: `Schedule for ${dayNames[day - 1]} has been created.`,
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
    if (!therapistId) return

    try {
      setIsSubmitting(true)
      await adminTherapistsService.updateTherapistSchedule(therapistId, {
        schedule_edit: [{ id, day, start_time, end_time }],
      })

      // Update local state
      setSchedule(schedule.map((s) => (s.id === id ? { ...s, day, start_time, end_time } : s)))

      toast({
        title: "Schedule updated",
        description: `Schedule for ${dayNames[day - 1]} has been updated.`,
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
    if (!therapistId) return

    try {
      setIsSubmitting(true)
      await adminTherapistsService.updateTherapistSchedule(therapistId, {
        schedule_remove: [{ ts_id: id }],
      })

      // Update local state
      setSchedule(schedule.filter((s) => s.id !== id))

      toast({
        title: "Schedule removed",
        description: "Schedule has been removed.",
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
    if (!therapistId || !selectedScheduleForException) {
      toast({
        title: "Error",
        description: "Please select a schedule day first.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await adminTherapistsService.updateTherapistSchedule(therapistId, {
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
    if (!therapistId || !editingException || !editingException.tse_id) {
      return
    }

    try {
      setIsSubmitting(true)
      await adminTherapistsService.updateTherapistSchedule(therapistId, {
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
    if (!therapistId) return

    try {
      setIsSubmitting(true)
      await adminTherapistsService.updateTherapistSchedule(therapistId, {
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

  // Reset state when modal closes
  const handleClose = () => {
    setActiveTab("regular")
    setEditingDay(null)
    setEditingException(null)
    setNewException({
      ts_id: "",
      start_time: "09:00",
      end_time: "17:00",
    })
    setSelectedScheduleForException(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Therapist Schedule</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center h-80">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading schedule...</p>
            </div>
          </div>
        ) : (
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
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => setEditingDay(daySchedule)}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
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
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>

                {editingDay && (
                  <div className="mt-6 border rounded-lg p-4">
                    <h3 className="font-medium mb-4">
                      {editingDay.id ? "Edit Schedule" : "Add Schedule"} for {dayNames[(editingDay.day || 1) - 1]}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input
                          id="start-time"
                          type="time"
                          value={editingDay.start_time}
                          onChange={(e) =>
                            setEditingDay({
                              ...editingDay,
                              start_time: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input
                          id="end-time"
                          type="time"
                          value={editingDay.end_time}
                          onChange={(e) =>
                            setEditingDay({
                              ...editingDay,
                              end_time: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setEditingDay(null)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          if (editingDay) {
                            const startTime = editingDay.start_time || "09:00"
                            const endTime = editingDay.end_time || "17:00"
                            const day = editingDay.day || 1

                            if (!validateTimeRange(startTime, endTime)) {
                              toast({
                                title: "Invalid time range",
                                description: "End time must be after start time",
                                variant: "destructive",
                              })
                              return
                            }

                            if (editingDay.id) {
                              handleUpdateSchedule(editingDay.id, day, startTime, endTime)
                            } else {
                              handleAddSchedule(day, startTime, endTime)
                            }
                          }
                        }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Saving...
                          </>
                        ) : editingDay.id ? (
                          "Save Changes"
                        ) : (
                          "Add Schedule"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="exceptions">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Schedule Exceptions</h3>
                  <Button onClick={() => setActiveTab("regular")} variant="outline" className="mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Regular Schedule
                  </Button>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Exceptions represent times when the therapist is NOT available within their regular schedule.
                  </AlertDescription>
                </Alert>

                {schedule.length === 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No schedule found</AlertTitle>
                    <AlertDescription>
                      You need to create a regular schedule before you can add exceptions.
                    </AlertDescription>
                  </Alert>
                )}

                {schedule.length > 0 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Add New Exception</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="schedule-day" className="mb-2 block">
                            Select Schedule Day
                          </Label>
                          <select
                            id="schedule-day"
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            value={selectedScheduleForException?.id || ""}
                            onChange={(e) => {
                              const selected = schedule.find((s) => s.id === e.target.value)
                              setSelectedScheduleForException(selected || null)
                              setNewException({
                                ...newException,
                                ts_id: e.target.value,
                              })
                            }}
                          >
                            <option value="">Select a day</option>
                            {schedule.map((s) => (
                              <option key={s.id} value={s.id}>
                                {dayNames[s.day - 1]} ({s.start_time} - {s.end_time})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="exception-start-time" className="mb-2 block">
                            Start Time
                          </Label>
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
                        <div>
                          <Label htmlFor="exception-end-time" className="mb-2 block">
                            End Time
                          </Label>
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
                      <div className="flex justify-end mt-2">
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
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Exception
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {getAllExceptions().length === 0 ? (
                      <div className="border rounded-lg p-8 text-center">
                        <p className="text-gray-500">No schedule exceptions found.</p>
                        <p className="text-gray-500 text-sm mt-1">
                          Add exceptions for times when the therapist is not available within their regular schedule.
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
                                  <td className="py-3 px-4">
                                    {scheduleDay ? dayNames[scheduleDay.day - 1] : "Unknown"}
                                  </td>
                                  <td className="py-3 px-4">
                                    {scheduleDay ? `${scheduleDay.start_time} - ${scheduleDay.end_time}` : "Unknown"}
                                  </td>
                                  <td className="py-3 px-4">
                                    {`${exception.exception_start_time} - ${exception.exception_end_time}`}
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <div className="flex justify-end gap-2">
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

                    {editingException && (
                      <div className="mt-6 border rounded-lg p-4">
                        <h3 className="font-medium mb-4">Edit Exception</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-exception-start-time">Start Time</Label>
                            <Input
                              id="edit-exception-start-time"
                              type="time"
                              value={editingException.exception_start_time}
                              onChange={(e) =>
                                setEditingException({
                                  ...editingException,
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
                              value={editingException.exception_end_time}
                              onChange={(e) =>
                                setEditingException({
                                  ...editingException,
                                  exception_end_time: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setEditingException(null)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              if (editingException) {
                                const startTime = editingException.exception_start_time || ""
                                const endTime = editingException.exception_end_time || ""

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
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
