"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface TrialSessionCardProps {
  onBookConsultation?: () => void
}

export default function TrialSessionCard({ onBookConsultation }: TrialSessionCardProps) {
  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle>Schedule a Free Initial Consultation</CardTitle>
        <CardDescription>
          Schedule a free initial consultation with one of our specialists to discuss your child's needs and determine
          the best approach for their development.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-3">What to Expect</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm text-gray-700">
              30-minute comprehensive discussion about your child's developmental needs
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm text-gray-700">Overview of our assessment process and therapy options</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm text-gray-700">Opportunity to ask questions and address concerns</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm text-gray-700">Personalized recommendations for next steps</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/consultation">Book Free Consultation</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

