import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const testimonials = [
  {
    body: "[COMPANY] helped us identify our son's speech delay early. The milestone tracker was so easy to use, and the specialists were incredibly supportive.",
    author: {
      name: "Sarah Johnson",
      role: "Parent of 3-year-old",
      imageUrl: "/placeholder.svg?height=96&width=96",
    },
  },
  {
    body: "As a speech therapist, I love how [COMPANY] streamlines the assessment process. The platform makes it easy to track progress and share reports with parents.",
    author: {
      name: "Dr. Michael Chen",
      role: "Speech-Language Pathologist",
      imageUrl: "/placeholder.svg?height=96&width=96",
    },
  },
  {
    body: "The online consultations saved us so much time. We were able to get expert advice without having to travel with our twins. Highly recommend!",
    author: {
      name: "Emma Rodriguez",
      role: "Parent of twins",
      imageUrl: "/placeholder.svg?height=96&width=96",
    },
  },
]

export default function Testimonials() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Success Stories</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">See how [COMPANY] has helped families and specialists</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author.name} className="flex flex-col justify-between">
              <CardContent className="pt-6">
                <p className="text-lg leading-7 text-gray-600">"{testimonial.body}"</p>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <div className="flex items-center gap-x-4">
                  <Image
                    className="h-12 w-12 rounded-full bg-gray-50"
                    src={testimonial.author.imageUrl || "/placeholder.svg"}
                    alt=""
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                    <div className="text-sm leading-6 text-gray-600">{testimonial.author.role}</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

