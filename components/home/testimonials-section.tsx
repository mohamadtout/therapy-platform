"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    content:
      "I am immensely grateful for the positive impact [COMPANY] has had on my son's speech and language development in both Arabic and English.",
    author: "Mother of R. B",
    role: "6 yr. old child with speech delay - Nigeria",
    initials: "RB",
  },
  {
    id: 2,
    content:
      'I am incredibly happy and grateful for [COMPANY]. The counselor has been a "game-changer" for my son\'s behavior during the past few months.',
    author: "Mother of D. M",
    role: "12 yr. old child with Anxiety - Lebanon",
    initials: "DM",
  },
  {
    id: 3,
    content:
      "The team's dedication and personalized approach not only addressed my son's challenges but also nurtured his confidence.",
    author: "Mother of Y. A",
    role: "9 yr. old child with Dyslexia - Iraq",
    initials: "YA",
  },
]

export default function TestimonialsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Parents Are Saying</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative"
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card
                className={`bg-primary text-white h-full transform transition-all duration-300 ${
                  hoveredId === testimonial.id ? "scale-105 shadow-lg" : ""
                }`}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="space-y-4 flex-grow">
                    <p className="italic text-white/90 text-lg">"{testimonial.content}"</p>

                    <div className="flex items-center pt-4 mt-auto">
                      <Avatar className="h-12 w-12 mr-4 bg-white/20 border-2 border-white/30">
                        <AvatarFallback className="text-white font-medium">{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white">{testimonial.author}</p>
                        <p className="text-white/80 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {hoveredId === testimonial.id && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

