"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Activity, Eye, Sparkles, Puzzle, HandMetal, CheckCircle, PlusCircle, MinusCircle } from "lucide-react"
import { CheckoutModal } from "@/components/assessments/checkout-modal"
import { motion } from "framer-motion"
import { useState } from "react"

// Assessment data
const assessments = [
  {
    id: "developmental-motor",
    name: "Developmental Motor Scales",
    price: "$200.00",
    description:
      "This assessment will help identify any delays in your child's early motor development.",
    benefits: [
      "Babies and children from birth to 5 years old presenting with Motor difficulties"
    ],
    ageRange: "Birth to 5 years",
    sessions: "1–2 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified occupational therapist",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Activity,
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Developmental Motor Scales",
        description: "Measures interrelated abilities in early motor development. It is designed to assess motor abilities in children: reflexes, stationary, locomotion, object manipulation, grasping, and visual motor integration."
      }
    ]
  },
  {
    id: "visual-motor",
    name: "Visual Motor Integration",
    price: "$200.00",
    description:
      "This assessment will help identify any deficits in your child's visual perception, fine motor skills, and hand-eye coordination which are prerequisites to future learning.",
    benefits: [
      "Individuals 2-8 years to 100 years old who present deficits in visual perception, fine motor skills, and hand-eye coordination"
    ],
    ageRange: "2 years to 100 years old",
    sessions: "1–2 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified occupational therapist",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Eye,
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Visual Motor Integration",
        description: "This Developmental Test of Visual-Motor Integration is a norm-referenced instrument that permits screening for visual-motor deficits that can underlie learning, behavior, and neuropsychological problems. It requires examinees to copy a sequence of geometric forms using paper and pencil."
      }
    ]
  },
  {
    id: "functional-independence",
    name: "Functional Independence Measure",
    price: "$250.00",
    description:
      "This assessment will help identify the difficulties that your child has when performing daily life activities.",
    benefits: [
      "Any child between 6 months and 7 years presenting with challenges or difficulties in performing daily life activities"
    ],
    ageRange: "6 months to 7 years",
    sessions: "2–3 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified occupational therapist",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Sparkles,
    color: "bg-amber-100 text-amber-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Functional Independence Measure",
        description: "An instrument for the clinical evaluation of autonomy in children."
      }
    ]
  },
  {
    id: "sensory-profile",
    name: "Sensory Profile 2",
    price: "$300.00",
    description:
      "This assessment will help identify your child's sensory processing patterns underlying the presence of any sensory distress or inappropriate reaction towards any kind of sensory stimulus which adversely affects your child's performance in daily life activities.",
    benefits: [
      "Children from birth through 14 years, 11 months presenting signs of sensory distress or inappropriate behavior towards any kind of sensory stimulus that affect their performance in daily life"
    ],
    ageRange: "Birth through 14 years, 11 months",
    sessions: "2–3 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified occupational therapist certified in sensory intervention",
    outcome: "Upon completion, you will receive a detailed report and a sensory diet will be recommended. A meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Brain,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Sensory Profile 2",
        description: "The Sensory Profile 2 family of assessments provides standardized tools to help evaluate a child's sensory processing patterns in the context of home, school, and community-based activities. It evaluates sensory system scores (auditory, visual, touch, movement body position, oral), behavior scores (conduct, social-emotional, attentional), sensory-pattern scores (seeking, avoiding, sensitivity, registration), and school factor scores (supports, awareness, tolerance, availability)."
      }
    ]
  },
  {
    id: "visual-perception",
    name: "Developmental Test of Visual Perception",
    price: "$200.00",
    description:
      "This assessment will help evaluate the different aspects related to your child's visual perception skills which are prerequisites to academic performance.",
    benefits: [
      "Children from 3 years and 4 months to 10 years of age",
      "Children with academic difficulties in the areas of geometry and math",
      "Children with difficulties in reading and writing",
      "Children with difficulty in reproduction of simple pictures or copying from board to paper"
    ],
    ageRange: "3 years 4 months to 10 years",
    sessions: "1–2 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified occupational therapist",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Eye,
    color: "bg-red-100 text-red-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Developmental Test of Visual Perception",
        description: "A set of tests designed to assess aspects of visual perception skills in children. The tests aim to assess eye-motor coordination, perception of figure-ground, perception of form constancy, perception of position in space, and perception of spatial relationships. Raw scores for each sub-test can be converted to a perceptual age equivalent, representing the age at which the average child achieves this score, and a total perceptual quotient can then be derived in a manner similar to that used for determining an intelligence quotient."
      }
    ]
  },
  {
    id: "scholarly-tools",
    name: "Manipulation of Scholarly Tools",
    price: "$150.00",
    description:
      "This assessment will help evaluate the underlying causes related to your child's difficulty in using or manipulating school related supplies or ability to perform required motor tasks.",
    benefits: [
      "Any school-age child facing any difficulty in using or manipulating school related supplies or problem with fine motor or hand dexterity"
    ],
    ageRange: "Grade 2 to Grade 6 (with adaptation)",
    sessions: "1–2 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified occupational therapist",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: HandMetal,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Manipulation of Scholarly Tools",
        description: "This test aims at harmonizing and formalizing the observation of manual skills in the use of school tools by school-age children suspected of being 'clumsy'. This observation takes place as part of the assessment of functional manipulations, in order to determine the effectiveness of prehension, dexterity, bimanual coordination and the ability to perform school life motor tasks: cutting, gluing, trimming, tracing…"
      }
    ]
  }
]

export default function OccupationalTherapyPage() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [hoveredAssessment, setHoveredAssessment] = useState<string | null>(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white">
      {/* Hero Section with animation */}
      <div className="relative bg-gradient-to-r from-[#4b2e83] to-[#6a4bbc] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center" />
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Occupational Therapy Assessments</h1>
            <div className="h-1 w-24 bg-white/70 my-6"></div>
            <p className="mt-6 text-lg leading-8">
              Our comprehensive occupational therapy assessments help identify motor, sensory, and functional challenges
              affecting daily life activities.
            </p>
            <motion.div 
              className="mt-10 flex items-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                className="bg-white text-[#4b2e83] hover:bg-gray-100 shadow-md hover:shadow-lg transition-all duration-300" 
                size="lg" 
                asChild
              >
                <Link href="#assessments">View Assessments</Link>
              </Button>
              <Button 
                className="bg-transparent text-white hover:bg-white/10 border border-white shadow-md hover:shadow-lg transition-all duration-300" 
                size="lg" 
                asChild
              >
                <Link href="/assessments-catalog">Back to Categories</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Overview Section with animated cards */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Occupational Therapy Assessments
          </h2>
          <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our occupational therapy assessments are designed for children who may show motor, sensory, or functional
            challenges affecting daily life activities.
          </p>
        </motion.div>

        <motion.div 
          className="mx-auto mt-16 max-w-7xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Expert Administration</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                All assessments are administered by qualified or certified occupational therapists.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white">
                <Puzzle className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Comprehensive Reports</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Each assessment provides a detailed report outlining findings and recommendations.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Follow-Up Support</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Each assessment includes a follow-up meeting to discuss findings and plan interventions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Assessments Section */}
      <div id="assessments" className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Occupational Therapy Assessments
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our range of occupational therapy assessments designed to evaluate different aspects of motor,
              sensory, and functional skills.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl gap-x-8 gap-y-16 lg:mx-0">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-xl shadow-sm overflow-hidden ring-1 ring-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={assessment.image || "/placeholder.svg"}
                      alt={assessment.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-2 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${assessment.color.split(" ")[0]}`}
                      >
                        <assessment.icon className={`h-5 w-5 ${assessment.color.split(" ")[1]}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{assessment.name}</h3>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xl font-semibold text-[#4b2e83]">{assessment.price}</span>
                    </div>

                    <p className="text-gray-600 mb-6">{assessment.description}</p>

                    {assessment.details && assessment.details.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Assessment Details:</h4>
                        <div className="space-y-4">
                          {assessment.details.map((detail, idx) => (
                            <div key={idx} className="border-l-2 border-[#4b2e83] pl-3">
                              <h5 className="font-medium text-[#4b2e83]">{detail.title}</h5>
                              <p className="text-sm text-gray-600">{detail.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Who Benefits:</h4>
                        <ul className="space-y-1">
                          {assessment.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-[#4b2e83] mt-1">•</span>
                              <span className="text-sm text-gray-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Administration:</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Age Range:</span> {assessment.ageRange}
                          </p>
                          <p>
                            <span className="font-medium">Sessions:</span> {assessment.sessions}
                          </p>
                          <p>
                            <span className="font-medium">Method:</span> {assessment.method}
                          </p>
                          <p>
                            <span className="font-medium">Administrator:</span> {assessment.administrator}
                          </p>
                          <p>
                            <span className="font-medium">Outcome:</span> {assessment.outcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <CheckoutModal assessmentName={assessment.name} price={assessment.price}>
                        <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90">
                          Book Assessment <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CheckoutModal>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find answers to common questions about our occupational therapy assessment services.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-white">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">
                      How do I know if my child needs an occupational therapy assessment?
                    </h3>
                    <span className="relative h-5 w-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-base leading-7 text-gray-600">
                      Consider an assessment if your child has difficulty with fine motor skills, sensory processing, self-care
                      tasks, or shows delays in developmental milestones. If you're unsure, our team can help determine if an
                      assessment is needed during an initial consultation.
                    </p>
                  </div>
                </details>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">
                      What happens during an occupational therapy assessment?
                    </h3>
                    <span className="relative h-5 w-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-base leading-7 text-gray-600">
                      Assessments typically involve standardized testing, observation of skills and behaviors, and parent/caregiver
                      interviews. The therapist will evaluate areas such as fine and gross motor skills, sensory processing,
                      visual-motor integration, and functional performance in daily activities.
                    </p>
                  </div>
                </details>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">
                      How long does the assessment process take?
                    </h3>
                    <span className="relative h-5 w-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-base leading-7 text-gray-600">
                      Most occupational therapy assessments require 1-2 sessions, each lasting about 60-90 minutes. After the
                      assessment, it typically takes 1-2 weeks to prepare the comprehensive report and schedule a follow-up
                      meeting to discuss results and recommendations.
                    </p>
                  </div>
                </details>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">
                      What happens after the assessment?
                    </h3>
                    <span className="relative h-5 w-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-base leading-7 text-gray-600">
                      After the assessment, our occupational therapist will prepare a detailed report outlining your child's
                      strengths and challenges, along with specific recommendations. We'll schedule a follow-up meeting to review
                      the findings and discuss appropriate intervention options, including therapy services if needed.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#4b2e83]">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
            <br />
            Explore our assessment options.
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Button className="bg-white text-[#4b2e83] hover:bg-gray-100" size="lg" asChild>
              <Link href="/consultation">Book Now</Link>
            </Button>
            <Button className="bg-white text-[#4b2e83] hover:bg-gray-100" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

