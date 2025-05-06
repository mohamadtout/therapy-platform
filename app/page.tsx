import HeroSection from "@/components/home/hero-section"
import ParentJourney from "@/components/home/parent-journey"
import BlogTeaser from "@/components/home/blog-teaser"
import TestimonialsSection from "@/components/home/testimonials-section"
import FaqSection from "@/components/home/faq-section"
import WhyChooseOnesti from "@/components/home/why-choose-onesti"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero - Primary entry point */}
      <HeroSection />

      {/* Your Journey - Clear path through our services */}
      <div id="parent-journey" className="bg-gray-50 py-20">
        <ParentJourney />
      </div>

      {/* Testimonials - Build trust after showing services */}
      <div className="bg-gray-50 py-16">
        <TestimonialsSection />
      </div>

      {/* Why Choose Onesti - Key differentiators */}
      <WhyChooseOnesti />

      {/* Blog Teaser - Supplementary content */}
      <div className="bg-white py-16">
        <BlogTeaser />
      </div>

      {/* FAQ Section */}
        <FaqSection />
    </div>
  )
}

