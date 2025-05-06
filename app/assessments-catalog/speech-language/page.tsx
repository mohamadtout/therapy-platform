"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquareText, Brain, Sparkles, HeartHandshake, CreditCard, CheckCircle, MinusCircle, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

// Assessment data
const assessments = [
  {
    id: "speech-assessment-bundle",
    name: "Speech Assessment Bundle",
    price: "$250.00",
    description:
      "This bundle includes three types of assessments that will help identify your child's weaknesses in the different areas related to speech development.",
    benefits: [
      "Individuals of all ages who present difficulty in pronouncing certain phonemes",
      "Individuals with difficulty chewing food",
      "Children with weak oral facial muscle tone",
      "Children who have difficulty pronouncing certain speech sounds correctly",
      "Children who present difficulty identifying sounds and present speech delays"
    ],
    ageRange: "3 years and above",
    sessions: "1 session per assessment (3 total)",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified speech and language therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: MessageSquareText,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Oral Motor Skills Assessment",
        description: "Evaluates the movement of muscles of the face (e.g. lips and jaw) and oral area (e.g. tongue and soft palate), especially the movements related to speech."
      },
      {
        title: "Articulation Assessment",
        description: "Evaluates the ability to produce clear and accurate speech sounds such as consonant sounds at the beginning, middle, and end of words."
      },
      {
        title: "Auditory Discrimination Assessment",
        description: "Screens children for early auditory and phonological skills."
      }
    ]
  },
  {
    id: "early-communication",
    name: "Early Communication Assessment",
    price: "$150.00",
    description:
      "This assessment will help identify the presence of delays in your child's communication and speech milestones.",
    benefits: [
      "Children under 3 years of age presenting delays in communication and speech milestones"
    ],
    ageRange: "Birth to 36 months",
    sessions: "2 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified speech and language therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: MessageSquareText,
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Early Communication Assessment",
        description: "Assesses the earliest communication behaviors and emerging language abilities for infants and toddlers up to 36 months old."
      }
    ]
  },
  {
    id: "spoken-language",
    name: "Spoken Language Assessment",
    price: "$250.00",
    description:
      "This assessment will help identify any delays in the different components related to your child's spoken language skills.",
    benefits: [
      "Children who have difficulty acquiring new vocabulary",
      "Children who struggle to express ideas and thoughts in correct grammatical form"
    ],
    ageRange: "4 years to 8 years, 11 months",
    sessions: "2-3 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified speech and language therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: Sparkles,
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Spoken Language Assessment",
        description: "Assesses children's spoken language skills from the ability to combine sounds and words, to constructing meaningful sentences in addition to understanding vocabulary and morphological comprehension."
      }
    ]
  },
  {
    id: "oral-language",
    name: "Oral Language Assessment",
    price: "$250.00",
    description:
      "This assessment will help identify any delays in the different components related to your child's listening comprehension skills.",
    benefits: [
      "Children 4 years or above who have difficulty following directives",
      "Children who find it difficult to participate in or follow a conversation"
    ],
    ageRange: "4 years and above",
    sessions: "2-3 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified speech and language therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: HeartHandshake,
    color: "bg-amber-100 text-amber-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Oral Language Assessment",
        description: "Assesses the listening comprehension of spoken language. It evaluates the ability to integrate and apply knowledge in three structural categories of language: Lexical/Semantic, Syntactic, Supralinguistic. (i.e., Can a student sufficiently understand and retain information heard in class?)"
      }
    ]
  },
  {
    id: "written-language",
    name: "Written Language Assessment",
    price: "$250.00",
    description:
      "This assessment will help identify any delays in the different components related to your child's written language skills.",
    benefits: [
      "Children 5 years or above having a hard time understanding and acquiring written language"
    ],
    ageRange: "5 years and above",
    sessions: "2-3 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified speech and language therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: MessageSquareText,
    color: "bg-red-100 text-red-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Written Language Assessment",
        description: "Measures the written language skills. It evaluates skills such as reading skills, reading comprehension, vocabulary comprehension, spelling, sentence writing, logical sentencing and ability to construct a story."
      }
    ]
  },
  {
    id: "phonological-processing",
    name: "Phonological Processing Assessment",
    price: "$100.00",
    description:
      "This assessment will help identify any delays related to your child's phonological processing abilities which are fundamental to the acquisition of reading skills.",
    benefits: [
      "Children 4-6 years old having problems saying words correctly",
      "Children who struggle with identifying rhymes",
      "Children who find spelling difficult"
    ],
    ageRange: "4-6 years",
    sessions: "1 session",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified speech and language therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: Brain,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Phonological Processing Assessment",
        description: "Evaluates phonological processing abilities which is a prerequisite to reading fluency. This measure evaluates phonological awareness, phonological memory, and naming."
      }
    ]
  },
  {
    id: "articulation-assessment",
    name: "Articulation Assessment",
    price: "$100.00",
    description:
      "This assessment will help identify the underlying causes for any difficulties related to your child's articulation development.",
    benefits: [
      "Individuals 3 years or above who present weak oral facial muscle tone",
      "Children who have difficulty pronouncing certain speech sounds correctly"
    ],
    ageRange: "3 years and above",
    sessions: "1 session",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified speech and language therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: MessageSquareText,
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Articulation Assessment",
        description: "Evaluates the ability to produce clear and accurate speech sounds such as consonant sounds at the beginning, middle, and end of words."
      }
    ]
  },
  {
    id: "auditory-discrimination",
    name: "Auditory Discrimination Assessment",
    price: "$100.00",
    description:
      "This assessment will help identify any delays related to your child's auditory and phonological processing abilities which are fundamental to the acquisition of speech skills.",
    benefits: [
      "Children from 3 years 6 months to 6 years 11 months who present difficulty identifying sounds",
      "Children with speech delays"
    ],
    ageRange: "3 years 6 months to 6 years 11 months",
    sessions: "1 session",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified speech and language therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: Sparkles,
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Auditory Discrimination Assessment",
        description: "Screens children for early auditory and phonological skills."
      }
    ]
  },
  {
    id: "feeding-assessment",
    name: "Feeding Assessment",
    price: "$250.00",
    description:
      "This comprehensive assessment, that is administered by certified feeding therapists, will help identify the underlying causes for any feeding difficulties starting from infancy to 6 years of age.",
    benefits: [
      "Infants and children up to 6 years of age with feeding difficulties",
      "Children with oral structure issues affecting feeding and swallowing",
      "Children with sensory intolerance to certain foods",
      "Children with positioning limitations affecting feeding"
    ],
    ageRange: "Infancy to 6 years",
    sessions: "1-2 sessions for babies, 2-3 sessions for toddlers and older children",
    method: "Online, hybrid, or onsite",
    administrator: "Certified feeding therapist",
    outcome: "A detailed report and a meeting with the [COMPANY] team to discuss findings and intervention plans",
    icon: HeartHandshake,
    color: "bg-amber-100 text-amber-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Comprehensive Feeding Assessment",
        description: "The comprehensive assessment identifies and describes impairments in body structure and function, including which swallowing phases are affected; limitations in activity and participation, including the impact on overall health (including nutrition and hydration) and the child's ability to participate in routine activities; contextual factors that serve as barriers to or facilitators of successful nutritional intake; positioning limitations and motor skills; and sensory preferences and avoidance."
      }
    ]
  }
]

export default function SpeechLanguagePage() {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
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

  const handleBuyNow = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    setShowPurchaseDialog(true);
  };

  const handleProceedToPayment = () => {
    setShowPurchaseDialog(false);
    setShowPayment(true);
  };

  const completePurchase = () => {
    setIsPurchased(true);
    setShowPayment(false);
    // In a real app, you would link this purchase to the user's profile
    setTimeout(() => {
      setIsPurchased(false);
    }, 3000);
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Speech & Language Assessments</h1>
            <div className="h-1 w-24 bg-white/70 my-6"></div>
            <p className="mt-6 text-lg leading-8">
              Our comprehensive speech and language assessments evaluate communication skills, language development, and
              speech patterns to guide effective interventions.
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
            About Speech & Language Assessments
          </h2>
          <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our speech and language assessments are designed for children and adults who may have difficulties with
            communication, language development, or speech production.
          </p>
        </motion.div>

        <motion.div 
          className="mx-auto mt-16 max-w-7xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md hover:bg-[#f9f8fc] transition-all duration-300"
              variants={item}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white"
              >
                <MessageSquareText className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Expert Administration</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                All assessments are administered by licensed speech-language pathologists with specialized training.
              </p>
            </motion.div>
            
            <motion.div 
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md hover:bg-[#f9f8fc] transition-all duration-300"
              variants={item}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white"
              >
                <Brain className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Comprehensive Evaluation</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Each assessment provides detailed insights into communication abilities and challenges.
              </p>
            </motion.div>
            
            <motion.div 
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md hover:bg-[#f9f8fc] transition-all duration-300"
              variants={item}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white"
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Personalized Planning</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Each assessment includes a follow-up meeting to discuss findings and plan targeted interventions.
              </p>
            </motion.div>
            </div>
        </motion.div>
      </div>

      {/* Assessments Section with enhanced cards */}
      <div id="assessments" className="bg-[#f9f8fc] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#4b2e83]/20 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Speech & Language Assessments
            </h2>
            <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our range of speech and language assessments designed to evaluate different aspects of
              communication and language development.
            </p>
          </motion.div>

          <motion.div 
            className="mx-auto mt-16 grid max-w-7xl gap-x-8 gap-y-16 lg:mx-0"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {assessments.map((assessment) => (
              <motion.div 
                key={assessment.id} 
                className="bg-white rounded-3xl shadow-sm overflow-hidden ring-1 ring-gray-200 hover:shadow-md transition-all duration-300"
                variants={item}
                onMouseEnter={() => setHoveredAssessment(assessment.id)}
                onMouseLeave={() => setHoveredAssessment(null)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4b2e83]/30 to-transparent z-10"></div>
                    <motion.div
                      animate={{
                        scale: hoveredAssessment === assessment.id ? 1.05 : 1
                      }}
                      transition={{ duration: 0.7 }}
                      className="h-full w-full"
                    >
                    <Image
                      src={assessment.image || "/placeholder.svg"}
                      alt={assessment.name}
                      fill
                      className="object-cover"
                    />
                    </motion.div>
                  </div>
                  <div className="col-span-2 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${assessment.color.split(" ")[0]} shadow-sm`}
                      >
                        <assessment.icon className={`h-6 w-6 ${assessment.color.split(" ")[1]}`} />
                      </motion.div>
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
                            <motion.div 
                              key={idx} 
                              className="border-l-2 border-[#4b2e83] pl-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <h5 className="font-medium text-[#4b2e83]">{detail.title}</h5>
                              <p className="text-sm text-gray-600">{detail.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Who Benefits:</h4>
                        <ul className="space-y-2">
                          {assessment.benefits.map((benefit, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-600">{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Administration:</h4>
                        <div className="space-y-2 text-sm text-gray-600 bg-[#f9f8fc] p-4 rounded-xl">
                          <p className="flex items-center gap-2">
                            <span className="font-medium min-w-[110px]">Age Range:</span> 
                            <span>{assessment.ageRange}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium min-w-[110px]">Sessions:</span> 
                            <span>{assessment.sessions}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium min-w-[110px]">Method:</span> 
                            <span>{assessment.method}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium min-w-[110px]">Administrator:</span> 
                            <span>{assessment.administrator}</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="font-medium min-w-[110px] mt-0.5">Outcome:</span> 
                            <span>{assessment.outcome}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto" 
                        onClick={() => handleBuyNow(assessment.id)}
                      >
                        <CreditCard className="mr-2 h-4 w-4" /> Buy Now
                        </Button>
                    </motion.div>
                    </div>
                  </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQ Section with interactive accordion */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
            <p className="mt-4 text-lg leading-8 text-gray-600">
            Find answers to common questions about our speech and language assessment services.
          </p>
          </motion.div>

          <motion.div 
            className="mx-auto mt-16 max-w-3xl"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {[
                {
                  question: "How do I know if my child needs a speech or language assessment?",
                  answer: "Consider an assessment if your child has difficulty being understood, seems to struggle understanding language, has a limited vocabulary, or is not meeting communication milestones. If you're unsure, our team can help determine if an assessment would be beneficial during an initial consultation."
                },
                {
                  question: "What happens during a speech and language assessment?",
                  answer: "The assessment typically involves standardized testing, observations of communication skills, and parent/caregiver interviews. The speech-language pathologist will evaluate areas such as articulation, language comprehension, expression, voice quality, fluency, and social communication skills as appropriate."
                },
                {
                  question: "How long does the assessment process take?",
                  answer: "Most speech and language assessments require 1-2 sessions, each lasting about 60-90 minutes. After the assessment, it typically takes 1-2 weeks to prepare the report and schedule a follow-up meeting to discuss results and recommendations."
                },
                {
                  question: "What happens after the assessment?",
                  answer: "After the assessment, our speech-language pathologist will prepare a detailed report outlining your child's communication strengths and challenges, along with specific recommendations. We'll schedule a follow-up meeting to review the findings and discuss appropriate intervention options, including therapy services if needed."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className={`rounded-2xl border border-[#e9e4f5] bg-white overflow-hidden hover:shadow-md transition-all duration-300 ${selectedFaq === index ? 'shadow-md' : ''}`}
                  variants={item}
                >
                  <motion.div 
                    className="flex cursor-pointer items-center justify-between p-6"
                    onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold leading-7 text-[#4b2e83]">{faq.question}</h3>
                    <span className="relative h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-[#f9f8fc]">
                      <motion.span 
                        className="absolute inset-0 h-6 w-6 flex items-center justify-center"
                        animate={{ rotate: selectedFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {selectedFaq === index ? (
                          <MinusCircle className="h-5 w-5 text-[#4b2e83]" />
                        ) : (
                          <PlusCircle className="h-5 w-5 text-[#4b2e83]" />
                        )}
                      </motion.span>
                    </span>
                  </motion.div>
                  <motion.div 
                    className="px-6 overflow-hidden"
                    animate={{ 
                      height: selectedFaq === index ? 'auto' : 0,
                      opacity: selectedFaq === index ? 1 : 0,
                      marginBottom: selectedFaq === index ? '24px' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-base leading-7 text-gray-600">
                      {faq.answer}
            </p>
                  </motion.div>
                </motion.div>
              ))}
          </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section with animation */}
      <div className="bg-gradient-to-r from-[#4b2e83] to-[#6a4bbc] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
            <br />
            Explore our assessment options.
          </h2>
          </motion.div>
          <motion.div 
            className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              className="bg-white text-[#4b2e83] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300" 
              size="lg" 
              asChild
            >
              <Link href="/consultation">Book Now</Link>
            </Button>
            <Button 
              className="bg-transparent text-white hover:bg-white/10 border border-white shadow-lg hover:shadow-xl transition-all duration-300" 
              size="lg" 
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Enhanced dialog components with animations */}
      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Assessment Selection</DialogTitle>
            <DialogDescription>
              {selectedAssessment && `You've selected the ${assessments.find(a => a.id === selectedAssessment)?.name} for ${assessments.find(a => a.id === selectedAssessment)?.price}.`}
            </DialogDescription>
          </DialogHeader>
          <motion.div 
            className="py-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-500">
              After purchase, this assessment will appear in your dashboard. Our team will contact you to schedule the session.
            </p>
            <motion.div 
              className="mt-4 p-4 bg-[#f9f8fc] rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h4 className="font-medium text-gray-900 mb-2">Package Includes:</h4>
              <motion.ul 
                className="space-y-2 text-sm text-gray-600"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.li 
                  className="flex items-start gap-2"
                  variants={item}
                >
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>One professional assessment session</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  variants={item}
                >
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Detailed evaluation report</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  variants={item}
                >
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Follow-up consultation to discuss results</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  variants={item}
                >
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Personalized recommendations</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
          <DialogFooter className="flex items-center justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowPurchaseDialog(false)}>
              Cancel
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-[#4b2e83] hover:bg-[#4b2e83]/90"
                onClick={handleProceedToPayment}
              >
              Proceed to Checkout
            </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog - enhanced with motion but keeping the same functionality */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
            <DialogDescription>
              Complete your payment to purchase your assessment
            </DialogDescription>
          </DialogHeader>
          <motion.div className="py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div className="rounded-lg bg-muted p-4 mb-6"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-medium">Order Summary</h3>
              <motion.div className="mt-4 space-y-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div className="flex justify-between" variants={item}>
                  <span className="text-sm text-muted-foreground">Assessment:</span>
                  <span className="text-sm font-medium">
                    {selectedAssessment && assessments.find(a => a.id === selectedAssessment)?.name}
                  </span>
                </motion.div>
                <motion.div className="flex justify-between border-t pt-2" variants={item}>
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">
                    {selectedAssessment && assessments.find(a => a.id === selectedAssessment)?.price}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>

            <Tabs defaultValue="card">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="card" className="space-y-4 mt-4">
                <motion.div className="grid gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="bank" className="space-y-4 mt-4">
                <motion.div className="rounded-lg border p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-medium">Bank Transfer Details</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Bank Name:</span>
                      <span className="text-sm font-medium">Example Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Account Name:</span>
                      <span className="text-sm font-medium">[COMPANY] Therapy Services</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Account Number:</span>
                      <span className="text-sm font-medium">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Routing Number:</span>
                      <span className="text-sm font-medium">987654321</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Please include your name and "Assessment" in the transfer description.
                  </p>
                </motion.div>
              </TabsContent>
            </Tabs>

            <motion.div className="flex items-center space-x-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </motion.div>
          </motion.div>
          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => {
              setShowPayment(false);
              setShowPurchaseDialog(true);
            }} className="sm:order-1">
              Back
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="sm:order-2">
              <Button onClick={completePurchase} className="w-full">
              <CreditCard className="mr-2 h-4 w-4" /> Complete Purchase
            </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Message with animation */}
      {isPurchased && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 max-w-[90vw] md:max-w-md bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 0, 180, 180, 0],
              scale: [1, 1.2, 1.2, 1, 1]
            }}
            transition={{ duration: 1, repeat: 0 }}
            className="mr-2 flex-shrink-0"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          </motion.div>
          <span>Purchase successful! You can view this in your dashboard.</span>
        </motion.div>
      )}
    </div>
  )
}

