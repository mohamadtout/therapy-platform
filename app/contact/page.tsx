"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Loader2, CheckCircle } from "lucide-react"
import { appService } from "@/lib/api/api-services"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(8, { message: "Please enter a valid phone number" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const validateForm = () => {
    try {
      contactFormSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await appService.submitContactForm(formData)
      setIsSuccess(true)
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      })
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Let's have a talk</h1>
          <p className="mt-4 text-xl text-gray-600">Have Any Question?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Address</h3>
                    <p className="text-gray-600">[COMPANY_ADDRESS]</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Phone Number</h3>
                    <a
                      href="https://wa.me/96170666064"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      [COMPANY_PHONE]
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Email Address</h3>
                    <p className="text-gray-600">[COMPANY_CONTACT_EMAIL]</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter Your Name"
                      className={`w-full ${errors.name ? "border-red-500" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting || isSuccess}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter Email Address"
                      className={`w-full ${errors.email ? "border-red-500" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting || isSuccess}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      placeholder="Enter Phone Number"
                      className={`w-full ${errors.phone ? "border-red-500" : ""}`}
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting || isSuccess}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      placeholder="Enter Subject"
                      className={`w-full ${errors.subject ? "border-red-500" : ""}`}
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting || isSuccess}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Enter your comments"
                    className={`w-full min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting || isSuccess}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-onesti-purple hover:bg-onesti-lightblue text-white"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" /> Message Sent
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
