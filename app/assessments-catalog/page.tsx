"use client"

import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, HeartHandshake, Sparkles, MessageSquareText, Lightbulb, GraduationCap, ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

// Assessment categories data
const assessmentCategories = [
  {
    id: "speech-language",
    name: "Speech & Language",
    description: "Comprehensive evaluation of communication skills, language development, and speech patterns",
    icon: MessageSquareText,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=200&width=400",
    benefits: [
      "Identify speech sound disorders and articulation issues",
      "Evaluate expressive and receptive language skills",
      "Assess communication challenges in social contexts",
      "Develop targeted intervention strategies"
    ]
  },
  {
    id: "social-emotional",
    name: "Social Emotional",
    description: "Assessment of emotional regulation, social skills, and interpersonal development",
    icon: HeartHandshake,
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=200&width=400",
    benefits: [
      "Measure emotional awareness and regulation abilities",
      "Evaluate social interaction patterns and peer relationships", 
      "Assess coping strategies and resilience",
      "Identify areas for emotional development support"
    ]
  },
  {
    id: "occupational-therapy",
    name: "Occupational Therapy",
    description: "Evaluation of fine motor skills, sensory processing, and daily living activities",
    icon: Sparkles,
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=200&width=400",
    benefits: [
      "Assess fine and gross motor skill development",
      "Evaluate sensory processing patterns",
      "Measure independence in daily living activities",
      "Identify adaptive strategies for optimal functioning"
    ]
  },
  {
    id: "behavior-intervention",
    name: "Behavior Intervention",
    description: "Assessment of behavioral patterns, challenges, and intervention strategies",
    icon: Brain,
    color: "bg-amber-100 text-amber-700",
    image: "/placeholder.svg?height=200&width=400",
    benefits: [
      "Identify triggers for challenging behaviors",
      "Measure behavioral frequency, intensity, and duration",
      "Assess environmental impacts on behavior",
      "Develop positive behavior support plans"
    ]
  },
  {
    id: "psychoeducation",
    name: "Psychoeducation",
    description: "Comprehensive cognitive and educational assessments for learning needs",
    icon: GraduationCap,
    color: "bg-red-100 text-red-700",
    image: "/placeholder.svg?height=200&width=400",
    benefits: [
      "Evaluate cognitive processing and academic skills",
      "Assess learning styles and educational needs",
      "Identify learning differences and potential disabilities",
      "Develop personalized educational support plans"
    ]
  },
]

export default function AssessmentsPage() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  
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
      <div className="bg-gradient-to-b from-[#f9f8fc] to-white py-12 md:py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-[#4b2e83]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-[#4b2e83]/5 rounded-full blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Professional Assessments</h1>
            <div className="h-1 w-24 bg-[#4b2e83] mx-auto my-6"></div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our comprehensive assessment services provide diagnostic insights and guide personalized intervention
              planning for your child's unique developmental needs.
            </p>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 shadow-md hover:shadow-lg transition-all duration-300" size="lg" asChild>
                <Link href="/consultation">Book a Consultation</Link>
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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose Our Assessments?</h2>
          <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our assessments are conducted by licensed professionals using evidence-based tools and methodologies to
            provide accurate insights into your child's development.
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
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Comprehensive Insights</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Our assessments provide detailed insights into your child's strengths, challenges, and developmental
                needs.
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
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Expert Administration</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                All assessments are conducted by licensed professionals with specialized training and experience.
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
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e83] text-white">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Personalized Planning</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Assessment results guide the development of tailored intervention plans to address your child's specific
                needs.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Assessment Categories Section with improved tab interface */}
      <div id="categories" className="bg-[#f9f8fc] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#4b2e83]/20 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Assessment Categories</h2>
            <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Explore our range of professional assessment services designed to evaluate different aspects of your
              child's development.
            </p>
          </motion.div>

          <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="speech-language" className="w-full">
              <div className="mb-8 overflow-x-auto">
                <TabsList className="inline-flex h-auto p-1 rounded-full bg-[#e9e4f5]/50 w-full justify-start sm:justify-center">
                  {assessmentCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#4b2e83] data-[state=active]:text-white transition-all duration-300"
                    >
                      <category.icon className="h-5 w-5 mr-2 inline-block" />
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {assessmentCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center bg-white rounded-3xl overflow-hidden shadow-sm border border-[#e9e4f5]"
                  >
                    <div className="lg:col-span-5 h-64 relative overflow-hidden sm:h-80 lg:h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4b2e83]/30 to-transparent z-10"></div>
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    
                    <div className="lg:col-span-7 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                          transition={{ duration: 0.5 }}
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${category.color.split(" ")[0]} shadow-sm`}
                        >
                          <category.icon className={`h-6 w-6 ${category.color.split(" ")[1]}`} />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#4b2e83]">{category.name} Assessment</h3>
                          <p className="text-gray-500">{category.description}</p>
                        </div>
                      </div>

                      <div className="mt-4 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                          {category.benefits?.map((benefit, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start gap-2 text-gray-700"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4 mb-8">
                        <h4 className="font-semibold text-gray-900">What to Expect:</h4>
                        <div className="bg-[#f9f8fc] rounded-xl p-4">
                          <ol className="space-y-3">
                            <motion.li 
                              className="flex items-start gap-2"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white mt-0.5">
                                1
                              </span>
                              <span className="text-gray-700">Initial consultation to understand concerns and goals</span>
                            </motion.li>
                            <motion.li 
                              className="flex items-start gap-2"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white mt-0.5">
                                2
                              </span>
                              <span className="text-gray-700">Comprehensive assessment using standardized tools</span>
                            </motion.li>
                            <motion.li 
                              className="flex items-start gap-2"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white mt-0.5">
                                3
                              </span>
                              <span className="text-gray-700">Detailed report with findings and recommendations</span>
                            </motion.li>
                            <motion.li 
                              className="flex items-start gap-2"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white mt-0.5">
                                4
                              </span>
                              <span className="text-gray-700">Follow-up meeting to discuss results and next steps</span>
                            </motion.li>
                          </ol>
                        </div>
                      </div>

                      <motion.div 
                        className="flex flex-col sm:flex-row gap-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 shadow-sm hover:shadow-md transition-all duration-300" asChild>
                          <Link href={`/assessments-catalog/${category.id}`}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
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
              Find answers to common questions about our assessment services.
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
                  question: "How long does an assessment typically take?",
                  answer: "Assessment duration varies depending on the type and complexity. Most assessments require 1-3 sessions, each lasting 1-2 hours. The entire process, including report writing and follow-up, typically takes 2-3 weeks."
                },
                {
                  question: "What age groups do you assess?",
                  answer: "We provide assessments for children from birth through adolescence (0-18 years). Each assessment is tailored to be developmentally appropriate for your child's age."
                },
                {
                  question: "How should we prepare for an assessment?",
                  answer: "We recommend ensuring your child is well-rested and has eaten before the assessment. Bring any relevant medical records, previous evaluations, or school reports. We'll provide specific preparation instructions when you schedule your appointment."
                },
                {
                  question: "Are parents involved in the assessment process?",
                  answer: "Yes, parent involvement is essential. You'll complete questionnaires about your child's development and participate in interviews. For younger children, parents are typically present during the assessment. For older children, parents may be involved in portions of the assessment."
                },
                {
                  question: "What happens after the assessment?",
                  answer: "After completing the assessment, our specialists will analyze the results and prepare a comprehensive report. We'll schedule a follow-up meeting to discuss findings, recommendations, and next steps for intervention or support."
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
                          <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 1L0 1" stroke="#4b2e83" strokeWidth="2"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0V14" stroke="#4b2e83" strokeWidth="2"/>
                            <path d="M14 7L0 7" stroke="#4b2e83" strokeWidth="2"/>
                          </svg>
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
      <div className="bg-gradient-to-r from-[#4b2e83] to-[#6b4e93] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4b2e83] to-[#6b4e93] opacity-90"></div>
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
              <Link href="#categories">View Categories</Link>
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
    </div>
  )
}

