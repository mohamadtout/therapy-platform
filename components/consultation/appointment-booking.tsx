"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Clock, Calendar, Check, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Doctor = {
  id: string
  name: string
  title: string
  image: string
}

type TimeSlot = {
  id: string
  time: string
  available: boolean
}

type BookingConfirmation = {
  doctor: Doctor
  date: string
  time: string
  usePackage?: Package
  childName?: string
}

type User = {
  name: string
  email: string
  phone: string
}

type Child = {
  id: number
  name: string
  age: string
  gender: string
}

type Package = {
  id: number
  name: string
  sessions: {
    total: number
    used: number
    remaining: number
  }
  validUntil: string
  status: string
  childId: number
}

type AppointmentBookingProps = {
  user?: User
  children?: Child[]
  packages?: Package[]
  insideDialog?: boolean
}

const doctors: Doctor[] = [
  {
    id: "dr-john-doe",
    name: "Dr. John Doe",
    title: "MBBS, Dentist",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "dr-sarah-smith",
    name: "Dr. Sarah Smith",
    title: "Child Psychologist",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "dr-darren-elder",
    name: "Dr. Darren Elder",
    title: "Child Development Specialist",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const days = [
  { day: "MONDAY", date: "SEP 5" },
  { day: "TUESDAY", date: "SEP 6" },
  { day: "WED", date: "SEP 7" },
  { day: "THURS", date: "SEP 8" },
  { day: "FRI", date: "SEP 9" },
  { day: "SAT", date: "SEP 10" },
  { day: "SUN", date: "SEP 11" },
]

const timeSlots = {
  morning: [
    { id: "1", time: "09:00 - 09:30", available: true },
    { id: "2", time: "10:00 - 10:30", available: true },
  ],
  afternoon: [
    { id: "3", time: "12:00 - 12:30", available: true },
    { id: "4", time: "01:00 - 01:30", available: true },
  ],
  evening: [
    { id: "5", time: "03:00 - 03:30", available: true },
    { id: "6", time: "04:00 - 04:30", available: true },
  ],
}

export default function AppointmentBooking({ user, children = [], packages = [], insideDialog = false }: AppointmentBookingProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(doctors[0])
  const [selectedDate, setSelectedDate] = useState<string>("SEP 7")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingConfirmed, setBookingConfirmed] = useState<BookingConfirmation | null>(null)
  const [selectedChild, setSelectedChild] = useState<Child | null>(children.length > 0 ? children[0] : null)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'package' | 'new'>(packages.length > 0 ? 'package' : 'new')
  
  // Filter packages for the selected child
  const childPackages = selectedChild 
    ? packages.filter(pkg => pkg.childId === selectedChild.id && pkg.sessions.remaining > 0 && pkg.status === "Active") 
    : []
  
  // Effect to set default package when child changes
  useEffect(() => {
    if (childPackages.length > 0) {
      setSelectedPackage(childPackages[0])
      setPaymentMethod('package')
    } else {
      setSelectedPackage(null)
      setPaymentMethod('new')
    }
  }, [selectedChild, childPackages])

  const handleNext = () => {
    if (currentStep === 1 && selectedTimeSlot) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      // Simulate booking confirmation
      if (selectedDoctor && selectedTimeSlot) {
        // If using a package, decrement session count (in a real app)
        if (paymentMethod === 'package' && selectedPackage) {
          // In a real app, you would call an API to update the package
          // console.log(`Using session from package: ${selectedPackage.name}`)
        }

        setBookingConfirmed({
          doctor: selectedDoctor,
          date: selectedDate,
          time: selectedTimeSlot.time,
          usePackage: paymentMethod === 'package' && selectedPackage ? selectedPackage : undefined,
          childName: selectedChild?.name
        })
        setCurrentStep(3)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {currentStep < 3 && !insideDialog && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
          <div className="mt-4 flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              1
            </div>
            <div className={`h-1 w-24 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              2
            </div>
            <div className={`h-1 w-24 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              3
            </div>
          </div>
        </div>
      )}

      {currentStep < 3 && insideDialog && (
        <div className="mb-8">
          <div className="mt-4 flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              1
            </div>
            <div className={`h-1 w-24 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              2
            </div>
            <div className={`h-1 w-24 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              3
            </div>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Select Available Slots</h2>
              <div className="mt-4 flex items-center">
                <div className="mr-4">
                  <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">
                    Choose Date
                  </label>
                  <div className="mt-1 relative">
                    <div className="flex items-center border rounded-md p-2">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span>08/10/2023 - 08/11/2023</span>
                      <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <button className="text-blue-600">
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div className="grid grid-cols-7 gap-4 text-center">
                    {days.map((day) => (
                      <div
                        key={day.day}
                        className={`cursor-pointer ${selectedDate === day.date ? "text-blue-600 font-bold" : ""}`}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <div className="text-sm font-medium">{day.day}</div>
                        <div className="text-xs">{day.date}</div>
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600">
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-center mb-4">Morning</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {timeSlots.morning.map((slot) => (
                        <div
                          key={slot.id}
                          className={`flex items-center justify-center p-4 rounded-md border cursor-pointer ${
                            selectedTimeSlot?.id === slot.id ? "bg-blue-50 border-blue-500" : "bg-gray-50"
                          }`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          <Clock className="h-5 w-5 mr-2 text-gray-500" />
                          <span>{slot.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-center mb-4">Afternoon</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {timeSlots.afternoon.map((slot) => (
                        <div
                          key={slot.id}
                          className={`flex items-center justify-center p-4 rounded-md border cursor-pointer ${
                            selectedTimeSlot?.id === slot.id ? "bg-blue-50 border-blue-500" : "bg-gray-50"
                          }`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          <Clock className="h-5 w-5 mr-2 text-gray-500" />
                          <span>{slot.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-center mb-4">Evening</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {timeSlots.evening.map((slot) => (
                        <div
                          key={slot.id}
                          className={`flex items-center justify-center p-4 rounded-md border cursor-pointer ${
                            selectedTimeSlot?.id === slot.id ? "bg-blue-50 border-blue-500" : "bg-gray-50"
                          }`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          <Clock className="h-5 w-5 mr-2 text-gray-500" />
                          <span>{slot.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Button onClick={() => {}}>Load More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

                <div className="border rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={selectedDoctor?.image || "/placeholder.svg"}
                        alt={selectedDoctor?.name || "Doctor"}
                        fill
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{selectedDoctor?.name}</h3>
                      <p className="text-sm text-gray-500">{selectedDoctor?.title}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium">{selectedTimeSlot?.time}</span>
                    </div>
                    
                    {/* Child selection for logged-in users */}
                    {children.length > 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Child</label>
                        <Select 
                          value={selectedChild?.id.toString()} 
                          onValueChange={(value) => setSelectedChild(children.find(child => child.id.toString() === value) || null)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a child" />
                          </SelectTrigger>
                          <SelectContent>
                            {children.map(child => (
                              <SelectItem key={child.id} value={child.id.toString()}>
                                {child.name} ({child.age})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                {children.length > 0 && selectedChild && (
                  <div className="border rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-lg mb-2">Payment Method</h3>
                    
                    {childPackages.length > 0 ? (
                      <>
                        <div className="flex items-center mb-3">
                          <input
                            type="radio"
                            id="usePackage"
                            name="paymentMethod"
                            className="h-4 w-4 text-blue-600"
                            checked={paymentMethod === 'package'}
                            onChange={() => setPaymentMethod('package')}
                          />
                          <label htmlFor="usePackage" className="ml-2 block text-sm text-gray-700">
                            Use existing package
                          </label>
                        </div>
                        
                        {paymentMethod === 'package' && (
                          <div className="ml-6 mb-4">
                            <Select 
                              value={selectedPackage?.id.toString()} 
                              onValueChange={(value) => setSelectedPackage(packages.find(pkg => pkg.id.toString() === value) || null)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a package" />
                              </SelectTrigger>
                              <SelectContent>
                                {childPackages.map(pkg => (
                                  <SelectItem key={pkg.id} value={pkg.id.toString()}>
                                    {pkg.name} ({pkg.sessions.remaining} sessions left)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            {selectedPackage && (
                              <div className="mt-2 text-sm text-gray-500">
                                <p>Remaining sessions: <span className="font-medium text-green-600">{selectedPackage.sessions.remaining}</span></p>
                                <p>Valid until: {selectedPackage.validUntil}</p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="newPayment"
                            name="paymentMethod"
                            className="h-4 w-4 text-blue-600"
                            checked={paymentMethod === 'new'}
                            onChange={() => setPaymentMethod('new')}
                          />
                          <label htmlFor="newPayment" className="ml-2 block text-sm text-gray-700">
                            Pay for this session
                          </label>
                        </div>
                      </>
                    ) : (
                      <Alert className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>No active packages available</AlertTitle>
                        <AlertDescription>
                          You don't have any active packages with remaining sessions for {selectedChild.name}.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {paymentMethod === 'new' && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm">
                        <p>Free consultation: <span className="font-medium">$0.00</span></p>
                        <p className="mt-2 text-xs text-gray-500">This is a complimentary initial consultation</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <Button 
                    onClick={handleNext} 
                    className="w-full" 
                    disabled={!selectedTimeSlot || (children.length > 0 && !selectedChild)}
                  >
                    {currentStep === 1 ? "Continue" : "Confirm Booking"}
                  </Button>
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={handleBack} className="w-full">
                      Back
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-center">Confirm Your Appointment</h2>
              
              <div className="border rounded-lg p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden mr-6">
                    <Image
                      src={selectedDoctor?.image || "/placeholder.svg"}
                      alt={selectedDoctor?.name || "Doctor"}
                      fill
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{selectedDoctor?.name}</h3>
                    <p className="text-gray-500">{selectedDoctor?.title}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{selectedTimeSlot?.time}</p>
                  </div>
                  {selectedChild && (
                    <div>
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="font-medium">{selectedChild.name}</p>
                    </div>
                  )}
                  {paymentMethod === 'package' && selectedPackage && (
                    <div>
                      <p className="text-sm text-gray-500">Using Package</p>
                      <p className="font-medium">{selectedPackage.name}</p>
                    </div>
                  )}
                </div>
                
                {paymentMethod === 'package' && selectedPackage && (
                  <div className="bg-green-50 p-3 rounded-md text-green-800 text-sm mb-6">
                    <p className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      Session will be deducted from your existing package
                    </p>
                    <p className="mt-1 ml-6">
                      {selectedPackage.sessions.remaining - 1} sessions will remain after this booking
                    </p>
                  </div>
                )}
                
                {paymentMethod === 'new' && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span>Session fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <Button onClick={handleNext} className="w-full">
                  Confirm Booking
                </Button>
                <Button variant="outline" onClick={handleBack} className="w-full">
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === 3 && bookingConfirmed && (
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Appointment Booked!</h1>
            <p className="text-gray-500 mt-2">
              Your appointment has been scheduled successfully
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Doctor:</span>
                    <span className="font-medium">{bookingConfirmed.doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">{bookingConfirmed.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-medium">{bookingConfirmed.time}</span>
                  </div>
                  {bookingConfirmed.childName && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Patient:</span>
                      <span className="font-medium">{bookingConfirmed.childName}</span>
                    </div>
                  )}
                  {bookingConfirmed.usePackage && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Package Used:</span>
                      <span className="font-medium">{bookingConfirmed.usePackage.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard?section=appointments">View All Appointments</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

