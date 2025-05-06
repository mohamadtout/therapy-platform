"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

interface MilestoneSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MilestoneSubscriptionDialog({ open, onOpenChange }: MilestoneSubscriptionDialogProps) {
  const [email, setEmail] = useState("")
  const [childAge, setChildAge] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    // console.log("Submitted:", { email, childAge })
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setEmail("")
    setChildAge("")
    setIsSubmitted(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Get Personalized Milestone Updates</DialogTitle>
              <DialogDescription className="text-base text-gray-600">
                Receive weekly tips and milestone information tailored to your child's age
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childAge">Child's Age</Label>
                <Select value={childAge} onValueChange={setChildAge} required>
                  <SelectTrigger id="childAge">
                    <SelectValue placeholder="Select your child's age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-6m">0-6 months</SelectItem>
                    <SelectItem value="6-12m">6-12 months</SelectItem>
                    <SelectItem value="12-18m">12-18 months</SelectItem>
                    <SelectItem value="18-24m">18-24 months</SelectItem>
                    <SelectItem value="2-3y">2-3 years</SelectItem>
                    <SelectItem value="3-4y">3-4 years</SelectItem>
                    <SelectItem value="4-5y">4-5 years</SelectItem>
                    <SelectItem value="5-6y">5-6 years</SelectItem>
                    <SelectItem value="6-7y">6-7 years</SelectItem>
                    <SelectItem value="7-8y">7-8 years</SelectItem>
                    <SelectItem value="8-9y">8-9 years</SelectItem>
                    <SelectItem value="9-10y">9-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Subscribe Now
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold">Thank You for Subscribing!</DialogTitle>
            <DialogDescription className="mt-2 text-base text-gray-600">
              You'll start receiving personalized milestone updates and developmental tips for your child.
            </DialogDescription>
            <Button onClick={handleReset} variant="outline" className="mt-6">
              Subscribe Another Child
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

