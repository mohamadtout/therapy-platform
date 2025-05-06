"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ValidationMessageProps {
  onComplete?: () => void
  delay?: number
}

export default function ValidationMessage({ onComplete, delay = 3000 }: ValidationMessageProps) {
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsValidating(false)
      if (onComplete) onComplete()
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, onComplete])

  return (
    <Card className="border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-center space-x-4">
          {isValidating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="text-center font-medium">
                Your results are being validated based on your profile and answers...
              </p>
            </>
          ) : (
            <p className="text-center font-medium text-green-600">
              Validation complete! Here are your personalized recommendations.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

