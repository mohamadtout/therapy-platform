import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ServicesOverview() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            We Offer A Range Of Services
          </h2>
          <p className="text-lg leading-8 text-gray-600 mb-16">
            Get new opportunities for growth and financial success as a Special Needs Professional on Liricare with our
            Innovative Ai and Availability system solution
          </p>
        </div>

        {/* First service section with image on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Monetize Your Expertise with the Liricare Availability System
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Our innovative booking system allows you to efficiently schedule sessions, attract more clients, and
              increase your income.
            </p>
            <Button asChild className="bg-onesti-lightblue hover:bg-onesti-lightblue/90 text-black rounded-full px-8">
              <Link href="/consultation">Get Started</Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="bg-onesti-lightblue/20 rounded-3xl p-6 relative">
              <div className="bg-white rounded-full px-6 py-3 absolute -top-5 left-1/2 transform -translate-x-1/2 shadow-sm flex items-center">
                <span className="text-onesti-purple mr-2">Your session with Jessica has been scheduled</span>
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-22%20at%201.33.43%E2%80%AFPM-M7SeHfEnU1vR23GVonTfQ81eMoYUAw.png"
                alt="Mother and child using tablet"
                width={600}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Timeline connector */}
        <div className="hidden lg:flex justify-center relative mb-24">
          <div className="h-24 w-0.5 bg-onesti-lightblue"></div>
          <div className="absolute top-0 w-4 h-4 bg-onesti-lightblue rounded-full -ml-1.5"></div>
          <div className="absolute bottom-0 w-4 h-4 bg-onesti-lightblue rounded-full -ml-1.5"></div>
        </div>

        {/* Second service section with image on left */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-onesti-lightblue/20 rounded-3xl p-6">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI service illustration"
                width={600}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Simplify Your administrative tasks with the AI service
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              LiriCare's AI service revolutionizes therapy reporting, cutting task time by 75%. This automation frees
              therapists from unpaid administrative stress, focusing their talents on what matters most: helping
              children thrive.
            </p>
            <Button asChild className="bg-onesti-lightblue hover:bg-onesti-lightblue/90 text-black rounded-full px-8">
              <Link href="/resources">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

