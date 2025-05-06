import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function MilestoneTracker() {
  return (
    <div className="bg-[#F8FAFC] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main heading */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-[#1E293B] mb-4">Your Child's Journey</h2>
          <p className="text-lg text-[#64748B]">We're here to support you every step of the way</p>
        </div>

        {/* Timeline with alternating content */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Step 1 */}
          <div className="relative z-10 mb-32">
            {/* Content box - left side */}
            <div className="w-[45%] mr-auto">
              <div className="bg-[#F1F5F9] rounded-lg p-8 text-center relative">
                <span className="inline-block mb-4">📚</span>
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">Learn About Your Child's Development</h3>
                <p className="text-[#64748B] mb-6">
                  Explore our blog articles to understand developmental milestones, challenges, and solutions for your
                  child.
                </p>
                <Button
                  variant="outline"
                  className="rounded-md bg-white hover:bg-gray-50 text-[#1E293B] border-[#CBD5E1]"
                  asChild
                >
                  <Link href="/blogs" className="flex items-center">
                    Read Our Blog
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </Button>

                {/* Image for step 1 */}
                <div className="absolute -right-[65%] top-1/2 transform -translate-y-1/2 w-[60%] h-auto">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/getty-images-Kn5ZKEP0DmI-unsplash.jpg-1H1kn5MG8v64Xraolb60sg11ZRLr0o.jpeg"
                    alt="Child learning about plants"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Number indicator */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#6D28D9] text-white font-bold">
              1
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 mb-32">
            {/* Content box - right side */}
            <div className="w-[45%] ml-auto">
              <div className="bg-[#EFF6FF] rounded-lg p-8 text-left relative">
                <span className="inline-block mb-4">📋</span>
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">Track Your Child's Milestones</h3>
                <p className="text-[#64748B] mb-6">
                  Subscribe to receive personalized milestone updates and developmental tips based on your child's age.
                </p>
                <Button className="rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white" asChild>
                  <Link href="/milestone-tracker" className="flex items-center">
                    Track Milestones
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </Button>

                {/* Image for step 2 */}
                <div className="absolute -left-[65%] top-1/2 transform -translate-y-1/2 w-[60%] h-auto">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yunus-tug-sFM1NXBde5Y-unsplash.jpg-233ftgDJr3ad17wWe4kZggKnUpz6uT.jpeg"
                    alt="Mother and child playing with toys"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Number indicator */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#6D28D9] text-white font-bold">
              2
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative z-10">
            {/* Content box - left side */}
            <div className="w-[45%] mr-auto">
              <div className="bg-[#F1F5F9] rounded-lg p-8 text-center relative">
                <span className="inline-block mb-4">📝</span>
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">Complete an Assessment for Your Child</h3>
                <p className="text-[#64748B] mb-6">
                  Take a comprehensive assessment to identify your child's strengths and areas that may need support.
                </p>
                <Button
                  variant="outline"
                  className="rounded-md bg-white hover:bg-gray-50 text-[#1E293B] border-[#CBD5E1]"
                  asChild
                >
                  <Link href="/assessments" className="flex items-center">
                    Start Assessment
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </Button>

                {/* Image for step 3 */}
                <div className="absolute -right-[65%] top-1/2 transform -translate-y-1/2 w-[60%] h-auto">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/getty-images-mBG8X1nCtK4-unsplash.jpg-rcgmNyMk3HQ7pseVVfy82hFq4AYDAQ.jpeg"
                    alt="Specialist working with child"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Number indicator */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#6D28D9] text-white font-bold">
              3
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

