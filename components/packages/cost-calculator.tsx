"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CostCalculator() {
  const [packageType, setPackageType] = useState("developmental-empower")
  const [paymentOption, setPaymentOption] = useState("upfront")
  const [sessions, setSessions] = useState(8)

  // Package base prices
  const packagePrices = {
    "developmental-nurture": 320,
    "developmental-empower": 600,
    "developmental-thrive": 840,
    "routine-nurture": 160,
    "routine-empower": 300,
    "routine-thrive": 420,
    "aba-nurture": 450,
    "aba-empower": 840,
    "aba-thrive": 1200,
  }

  // Calculate individual session price (if purchased separately)
  const individualSessionPrice = 90
  const totalIndividualPrice = individualSessionPrice * sessions

  // Calculate package price based on payment option
  const basePrice = packagePrices[packageType as keyof typeof packagePrices] || 600
  let packagePrice = basePrice

  if (paymentOption === "upfront") {
    // 10% discount for upfront payment
    packagePrice = Math.round(basePrice * 0.9)
  }

  // Calculate savings
  const savings = totalIndividualPrice - packagePrice
  const savingsPercentage = Math.round((savings / totalIndividualPrice) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Calculator</CardTitle>
        <CardDescription>See how much you can save with our packages compared to individual sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="package-type">Package Type</Label>
            <Select defaultValue={packageType} onValueChange={setPackageType}>
              <SelectTrigger id="package-type">
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developmental-nurture">Developmental Nurture Path</SelectItem>
                <SelectItem value="developmental-empower">Developmental Empower Path</SelectItem>
                <SelectItem value="developmental-thrive">Developmental Thrive Path</SelectItem>
                <SelectItem value="routine-nurture">Routine Nurture Path</SelectItem>
                <SelectItem value="routine-empower">Routine Empower Path</SelectItem>
                <SelectItem value="routine-thrive">Routine Thrive Path</SelectItem>
                <SelectItem value="aba-nurture">ABA Nurture Path</SelectItem>
                <SelectItem value="aba-empower">ABA Empower Path</SelectItem>
                <SelectItem value="aba-thrive">ABA Thrive Path</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="payment-option">Payment Option</Label>
            <Select defaultValue={paymentOption} onValueChange={setPaymentOption}>
              <SelectTrigger id="payment-option">
                <SelectValue placeholder="Select payment option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upfront">Pay Upfront (10% discount)</SelectItem>
                <SelectItem value="monthly">Pay Monthly</SelectItem>
                <SelectItem value="weekly">Pay Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sessions">Number of Sessions</Label>
            <Input
              id="sessions"
              type="number"
              min="1"
              max="20"
              value={sessions}
              onChange={(e) => setSessions(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="mt-6 rounded-lg bg-muted p-4">
            <h3 className="font-medium">Your Savings</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Individual Sessions Cost:</span>
                <span className="text-sm font-medium">${totalIndividualPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Package Cost:</span>
                <span className="text-sm font-medium">${packagePrice}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Total Savings:</span>
                <span className="font-medium text-green-600">
                  ${savings} ({savingsPercentage}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <a href="#packages">View Package Details</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

