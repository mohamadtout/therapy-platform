"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

// Define type for checkout steps
type CheckoutStep = "booking" | "payment" | "confirmation"

interface CheckoutModalProps {
  children: React.ReactNode
  assessmentName: string
  price: string
}

export function CheckoutModal({ children, assessmentName, price }: CheckoutModalProps) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("booking")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Get cart from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('onesti-cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        // console.log("Loaded cart items:", cartItems);
        // You could update state here based on cart contents
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true)
    setCurrentStep("booking")
  }

  const handleClose = () => {
    setOpen(false)
    // Reset form after dialog closes with a slight delay
    setTimeout(() => {
      setCurrentStep("booking")
      setFormData({
        name: "",
        email: "",
        phone: "",
        childName: "",
        childAge: "",
      })
    }, 300)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate the form here
    setCurrentStep("payment")
  }

  const handleSubmitPayment = () => {
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setCurrentStep("confirmation")
      
      // Save to cart in localStorage
      try {
        const savedCart = localStorage.getItem('onesti-cart') || '[]';
        const cartItems = JSON.parse(savedCart);
        
        cartItems.push({
          type: 'assessment',
          name: assessmentName,
          price: price,
          date: new Date().toISOString()
        });
        
        localStorage.setItem('onesti-cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving to cart:", error);
      }
    }, 1500)
  }

  const handleFinish = () => {
    handleClose()
    // Navigate to dashboard in a real app
    router.push('/dashboard')
  }

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
          {currentStep === "booking" && (
            <>
              <DialogHeader>
                <DialogTitle>Book an Assessment</DialogTitle>
                <DialogDescription>
                  Fill out the form below to schedule your {assessmentName}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitBooking}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="childName">Child's Name</Label>
                    <Input
                      id="childName"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="childAge">Child's Age</Label>
                    <Input
                      id="childAge"
                      name="childAge"
                      type="number"
                      value={formData.childAge}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button type="submit" className="w-full sm:w-auto">Continue to Payment</Button>
                </DialogFooter>
              </form>
            </>
          )}

          {currentStep === "payment" && (
            <>
              <DialogHeader>
                <DialogTitle>Payment Details</DialogTitle>
                <DialogDescription>
                  Complete your payment to book your {assessmentName}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="rounded-lg bg-muted p-4 mb-6">
                  <h3 className="font-medium">Order Summary</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between flex-wrap">
                      <span className="text-sm text-muted-foreground">Assessment:</span>
                      <span className="text-sm font-medium">{assessmentName}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total:</span>
                      <span className="font-medium">{price}</span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="card">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input id="name-on-card" placeholder="John Doe" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="bank" className="space-y-4 mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Bank Transfer Details</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between flex-wrap">
                          <span className="text-sm text-muted-foreground">Bank Name:</span>
                          <span className="text-sm font-medium">Example Bank</span>
                        </div>
                        <div className="flex justify-between flex-wrap">
                          <span className="text-sm text-muted-foreground">Account Name:</span>
                          <span className="text-sm font-medium">Onesti Therapy Services</span>
                        </div>
                        <div className="flex justify-between flex-wrap">
                          <span className="text-sm text-muted-foreground">Account Number:</span>
                          <span className="text-sm font-medium">1234567890</span>
                        </div>
                        <div className="flex justify-between flex-wrap">
                          <span className="text-sm text-muted-foreground">Routing Number:</span>
                          <span className="text-sm font-medium">987654321</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Please include your name and "Assessment Payment" in the transfer description.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
              <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("booking")}
                  className="w-full sm:w-auto sm:order-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmitPayment} 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto sm:order-2"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Processing..." : "Complete Purchase"}
                </Button>
              </DialogFooter>
            </>
          )}

          {currentStep === "confirmation" && (
            <>
              <DialogHeader>
                <DialogTitle>Booking Confirmed!</DialogTitle>
                <DialogDescription>
                  Your assessment has been successfully booked.
                </DialogDescription>
              </DialogHeader>
              <div className="py-6">
                <div className="rounded-lg bg-green-50 p-4 text-green-800 mb-6">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="font-medium">Payment successful!</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    We've sent a confirmation email to {formData.email} with all the details of your booking.
                  </p>
                  <p className="text-sm text-gray-600">
                    Our team will contact you within 24-48 hours to schedule your assessment sessions.
                  </p>
                  <p className="text-sm text-gray-600">
                    Thank you for choosing Onesti Therapy Services!
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleFinish} className="w-full sm:w-auto">Go to Dashboard</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

