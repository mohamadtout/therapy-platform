import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    content:
      "The Developmental Empower Path was exactly what my son needed. After just a few sessions, we saw significant improvements in his speech. The therapists are amazing and the online format is so convenient!",
    author: "Sarah M.",
    role: "Parent of a 3-year-old",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    content:
      "I was hesitant about online therapy, but Onesti's platform is seamless. The ABA Nurture Path helped us address our daughter's challenging behaviors, and the flexible payment options made it affordable for our family.",
    author: "Michael T.",
    role: "Parent of a 4-year-old",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    content:
      "The assessment process was thorough and the recommendations were spot-on. We started with a trial session and were so impressed that we signed up for the Routine Thrive Path. Best decision we've made for our child's development.",
    author: "Emily R.",
    role: "Parent of twins",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialsSection() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">What Parents Say About Our Packages</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-muted/30">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </div>
                <div className="mt-6 flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

