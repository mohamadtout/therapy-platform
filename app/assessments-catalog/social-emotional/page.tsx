"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, HeartHandshake, Sparkles, CheckCircle, PlusCircle, MinusCircle } from "lucide-react"
import { CheckoutModal } from "@/components/assessments/checkout-modal"
import { motion } from "framer-motion"
import { useState } from "react"

// Assessment data
const assessments = [
  {
    id: "anxiety",
    name: "Anxiety Assessment",
    price: "$150.00",
    description:
      "This assessment will help identify the presence of anxiety symptoms in children and adolescents and assess the severity of anxiety-related difficulties.",
    benefits: [
      "Children and adolescents aged 8 to 18 years experiencing symptoms of anxiety"
    ],
    ageRange: "8 to 18 years",
    sessions: "1–2 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified psychologist",
    outcome: "Upon completion, a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Brain,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Anxiety Assessment",
        description: "A screening tool designed to assess anxiety-related disorders in children and adolescents. It evaluates various domains of anxiety, including generalized anxiety disorder, separation anxiety disorder, social anxiety disorder, and panic disorder, aiding in the identification of anxiety symptoms in young individuals."
      }
    ]
  },
  {
    id: "depression",
    name: "Depression Assessment",
    price: "$150.00",
    description:
      "This assessment will help identify the presence of depressive symptoms in children and adolescents. It also measures the severity of depression and related difficulties.",
    benefits: [
      "Children and adolescents aged 6 to 17 years with depressive symptoms"
    ],
    ageRange: "6 to 17 years",
    sessions: "1–2 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified psychologist",
    outcome: "Upon completion, a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: HeartHandshake,
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Depression Assessment",
        description: "An assessment tool for measuring depression symptoms in children and adolescents. It evaluates various aspects of depression, including mood, behavior, physical symptoms, and interpersonal relationships, providing a quantitative measure of depressive symptoms."
      }
    ]
  },
  {
    id: "self-esteem",
    name: "Self-Esteem Assessment",
    price: "$150.00",
    description:
      "This assessment will provide a quantitative measure of an individual's overall self-esteem in adolescents and adults.",
    benefits: [
      "Adolescents and adults seeking to understand or improve their self-esteem levels"
    ],
    ageRange: "Adolescents and adults",
    sessions: "1–2 sessions",
    method: "Online, hybrid, or onsite",
    administrator: "Qualified psychologist",
    outcome: "Upon completion, a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Sparkles,
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Self-Esteem Assessment",
        description: "A self-report questionnaire used to assess an individual's level of self-esteem. The scale evaluates feelings of self-worth, self-acceptance, and self-confidence, providing a quantitative measure of overall self-esteem. It is suitable for individuals across a wide age range, from adolescence to adulthood."
      }
    ]
  },
]

export default function SocialEmotionalPage() {
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Social Emotional Assessments</h1>
            <div className="h-1 w-24 bg-white/70 my-6"></div>
            <p className="mt-6 text-lg leading-8">
              Our social emotional assessments help identify anxiety, depression, or self-esteem challenges to guide
              effective support and intervention.
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
            About Social Emotional Assessments
          </h2>
          <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our social emotional assessments are designed for children, adolescents, and adults who may exhibit signs of
            anxiety, depression, or low self-esteem.
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
                <Brain className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Expert Administration</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                All assessments are administered by qualified psychologists with specialized training.
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
                <HeartHandshake className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Comprehensive Insights</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Each assessment provides detailed insights into emotional well-being and social functioning.
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
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Follow-Up Support</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Each assessment includes a follow-up meeting to discuss findings and plan interventions.
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
              Our Social Emotional Assessments
            </h2>
            <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our range of social emotional assessments designed to evaluate different aspects of emotional
              well-being and social functioning.
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <CheckoutModal assessmentName={assessment.name} price={assessment.price}>
                        <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 shadow-sm hover:shadow-md transition-all duration-300">
                          Book Assessment <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CheckoutModal>
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
              Find answers to common questions about our social emotional assessment services.
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
                  question: "What are the signs that someone might benefit from a social emotional assessment?",
                  answer: "Signs may include persistent feelings of sadness or anxiety, trouble managing emotions, social withdrawal, behavioral changes, or difficulties in daily functioning. If you're concerned about yourself or a loved one, our team can help determine if an assessment would be beneficial."
                },
                {
                  question: "How are social emotional assessments conducted?",
                  answer: "These assessments typically involve standardized questionnaires, interviews, and observations. Depending on the specific assessment, the individual may answer questions about their emotions, thoughts, and behaviors. Parents or caregivers might also provide information for younger children."
                },
                {
                  question: "How confidential are the assessment results?",
                  answer: "Assessment results are kept strictly confidential. Information is only shared with those you authorize in writing. Our professionals follow ethical guidelines and privacy laws to protect your personal information."
                },
                {
                  question: "What happens after completing a social emotional assessment?",
                  answer: "After the assessment, you'll meet with our team to discuss the findings. Based on the results, we'll recommend appropriate interventions or support, which might include therapy, counseling, skill-building programs, or other resources to address identified needs."
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
    </div>
  )
}

