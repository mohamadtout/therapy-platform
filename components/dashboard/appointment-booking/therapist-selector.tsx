"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

interface Therapist {
  therapist_id: string
  nickname: string
  pfp: string
  specialties: { specialty_name: string }[]
}

interface TherapistSelectorProps {
  therapists: Therapist[]
  selectedTherapist: string | null
  onSelect: (therapistId: string) => void
  isLoading: boolean
}

export function TherapistSelector({ therapists, selectedTherapist, onSelect, isLoading }: TherapistSelectorProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (therapists.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No therapists available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select a Therapist</h3>
      <div className="grid grid-cols-1 gap-4">
        {therapists.map((therapist) => (
          <Card
            key={therapist.therapist_id}
            className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedTherapist === therapist.therapist_id ? "border-primary ring-1 ring-primary" : ""
            }`}
            onClick={() => onSelect(therapist.therapist_id)}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={therapist.pfp || "/placeholder.svg?height=64&width=64"}
                  alt={therapist.nickname}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{therapist.nickname}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {therapist.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {specialty.specialty_name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
