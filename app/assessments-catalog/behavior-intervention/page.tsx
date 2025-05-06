"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Activity, MessageSquare, Sparkles, Puzzle, CheckCircle, PlusCircle, MinusCircle } from "lucide-react"
import { CheckoutModal } from "@/components/assessments/checkout-modal"
import { motion } from "framer-motion"
import { useState } from "react"

// Assessment data
const assessments = [
  {
    id: "verbal-behavior",
    name: "Verbal Behavior Milestones Assessment and Placement Program",
    price: "$450.00",
    description:
      "This assessment will help identify your child's delays in milestones across different developmental domains.",
    benefits: [
      "Children from 18 months through 48 months of age for whom red flags have been indicated in their developmental milestones",
      "Chronologically older children who have not yet met developmental milestones"
    ],
    ageRange: "18 to 48 months (or older with developmental delays)",
    sessions: "2–4 sessions",
    method: "Ideally onsite (hybrid/online possible)",
    administrator: "Qualified behavior analyst",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Verbal Behavior Milestones Assessment",
        description: "A developmental, criterion-referenced assessment tool, curriculum guide, and skill tracking system (includes progress monitoring throughout intervention) across domains (e.g. listening, requesting, labeling, imitation, play, visual performance, etc.)"
      }
    ]
  },
  {
    id: "basic-language",
    name: "Assessment of Basic Language and Learning Skills (ABLLS)",
    price: "$450.00",
    description:
      "This assessment will help identify your child's deficiencies in language, academic, motor, and self-help skills.",
    benefits: [
      "Children from birth to 12 years of age for whom red flags have been indicated in their developmental milestones"
    ],
    ageRange: "Birth to 12 years",
    sessions: "2–4 sessions",
    method: "Ideally onsite (hybrid/online possible)",
    administrator: "Qualified behavior analyst",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Brain,
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Assessment of Basic Language and Learning Skills",
        description: "A criterion-referenced assessment tool, curriculum guide, and skill tracking system. Used to identify deficiencies in language, academic, motor, and self-help skills."
      }
    ]
  },
  {
    id: "functional-living",
    name: "Assessment of Functional Living Skills",
    price: "$250.00",
    description:
      "This assessment will help assess your child's independent living skills.",
    benefits: [
      "Children and adults with special needs (2 years of age throughout lifespan) who need to further develop their repertoires of independent living skills across domains (e.g. self-management, toileting, grooming, meals, leisure, etc.) and settings (e.g. home, school, community, etc.)"
    ],
    ageRange: "2 years through the lifespan",
    sessions: "2–4 sessions",
    method: "Ideally onsite (hybrid/online possible)",
    administrator: "Qualified behavior analyst",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Activity,
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Assessment of Functional Living Skills",
        description: "A measure that is used for assessment, skill tracking system, and serves as a curriculum guide for the development of independent living skills."
      }
    ]
  },
  {
    id: "essential-living",
    name: "Essential for Living (EFL)",
    price: "$200.00 + purchase of protocol and shipping",
    description:
      "This assessment will help evaluate your child's functional skills across domains.",
    benefits: [
      "Designed for individuals with moderate-to-severe disabilities who exhibit limited repertoires and problem behavior across domains (e.g. requests and related skills, tolerating skills, following directions, etc.)",
      "Applicable across all ages (lifespan)"
    ],
    ageRange: "All ages",
    sessions: "2–4 sessions",
    method: "Ideally onsite (hybrid/online possible)",
    administrator: "Qualified behavior analyst",
    outcome: "Upon completion, you will receive a detailed report and a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan for intervention.",
    icon: Sparkles,
    color: "bg-amber-100 text-amber-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Essential for Living",
        description: "A functional, life-skills curriculum-based assessment and tracking instrument."
      }
    ]
  },
  {
    id: "advanced-knowledge",
    name: "Promoting the Emergence of Advanced Knowledge (PEAK)",
    price: "$350.00",
    description:
      "This assessment will help evaluate your child's language and cognitive deficits.",
    benefits: [
      "Children and adults with special needs from 18 months of age through adolescence (into adulthood)"
    ],
    ageRange: "18 months through adolescence (and into adulthood)",
    sessions: "2–3 sessions",
    method: "Ideally onsite (hybrid/online possible)",
    administrator: "Qualified behavior analyst",
    outcome: "Upon completion, a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan of intervention.",
    icon: Brain,
    color: "bg-red-100 text-red-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Promoting the Emergence of Advanced Knowledge",
        description: "A criterion-referenced assessment instrument and treatment protocol for addressing language and cognitive deficits."
      }
    ]
  },
  {
    id: "good-learner",
    name: "Inventory of Good Learner Repertoires (IGLR)",
    price: "$250.00",
    description:
      "This assessment measures the different facets which directly and indirectly affect learning. The results are used to inform best practice with respect to interventions.",
    benefits: [
      "All children can benefit, in that it allows interventionists/teachers to identify how best to teach individual learners",
      "It assesses learner preferences, necessary supports, resilience and regulation, flexibility, etc."
    ],
    ageRange: "All children",
    sessions: "2–3 sessions",
    method: "Ideally onsite (hybrid/online possible)",
    administrator: "Qualified behavior analyst",
    outcome: "Upon completion, a meeting will be scheduled with the [COMPANY] team to discuss the findings and plan of intervention.",
    icon: Puzzle,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Inventory of Good Learner Repertoires",
        description: "A criterion-referenced assessment tool, curriculum guide, and skill tracking system to measure the ease with which an individual may be taught. It is used to identify preferred learning channels style, dependence upon various supports, resilience upon encountering challenges, and potential to learn in less supportive environments."
      }
    ]
  },
  {
    id: "functional-assessment",
    name: "Practical Functional Assessment/Skill-Based Treatment (PFA/SBT)",
    price: "$300.00",
    description:
      "This assessment will help evaluate the functions of problem behavior (triggers, maintaining variables, etc.). This, in turn, allows the behavior analyst to design and implement a behavior plan.",
    benefits: [
      "All children (whether neurotypical or those with special needs) who exhibit severe problem behavior can benefit"
    ],
    ageRange: "All children",
    sessions: "3 sessions",
    method: "Ideally onsite (hybrid/online possible)",
    administrator: "Qualified behavior analyst",
    outcome: "Upon completion, a meeting will be scheduled with the [COMPANY] team to discuss the findings and behavioral protocol.",
    icon: Brain,
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Practical Functional Assessment/Skill-Based Treatment",
        description: "This assessment tool is used to determine the occasioning contexts (antecedents) and outcomes (consequences) responsible for problem behavior. It is used to inform highly effective and humane treatment for problem behavior."
      }
    ]
  },
  {
    id: "adi-r",
    name: "Autism Diagnostic Interview-Revised (ADI-R)",
    price: "Coming soon",
    description:
      "A structured clinical interview with parents/caregivers focusing on social reciprocity, communication, and repetitive behaviors.",
    benefits: [
      "Children and adults with mental age above 2 years (most accurate for children aged 4 years and above) flagged (through screening) as being at-risk for an ASD diagnosis"
    ],
    ageRange: "Mental age above 2 years (most accurate for children aged 4 and above)",
    sessions: "To be determined",
    method: "Onsite, hybrid, or online",
    administrator: "Qualified diagnostic assessor",
    outcome: "Will be available soon!",
    icon: MessageSquare,
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=300&width=500",
    comingSoon: true,
    details: [
      {
        title: "Autism Diagnostic Interview-Revised",
        description: "A clinical diagnostic instrument by means of a structured interview with parents/caregivers of individuals referred for possible Autism Spectrum Disorder. It focuses on behavior in three main areas: quality of social reciprocity; communication and language; restricted interests and repetitive/stereotyped behavior."
      }
    ]
  },
  {
    id: "ados-2",
    name: "Autism Diagnostic Observation Schedule - 2nd Edition (ADOS-2)",
    price: "Coming soon",
    description:
      "A standardized, semi-structured assessment of communication, social reciprocity, play, and repetitive behaviors.",
    benefits: [
      "Children and adults from 12 months (lifespan), although (most accurate for children aged 30 months and above) flagged (through screening) as being at-risk for an ASD diagnosis"
    ],
    ageRange: "From 12 months (most accurate for children aged 30 months and above)",
    sessions: "1–2 sessions",
    method: "Ideally onsite",
    administrator: "Qualified ADOS assessor",
    outcome: "Will be available soon!",
    icon: Sparkles,
    color: "bg-amber-100 text-amber-700",
    image: "/placeholder.svg?height=300&width=500",
    comingSoon: true,
    details: [
      {
        title: "Autism Diagnostic Observation Schedule",
        description: "A standardized semi-structured assessment of communication, social reciprocity, play, and restricted interests and repetitive/stereotyped behavior in children. It helps providers diagnose Autism Spectrum Disorder in children and adults."
      }
    ]
  },
  {
    id: "mchat",
    name: "The Modified Checklist for Autism in Toddlers",
    price: "$75.00",
    description: 
      "This screener will identify children who are at risk of a potential ASD diagnosis and inform next steps.",
    benefits: [
      "Intended for toddlers between 16 and 30 months of age showing red flags or delays in developmental milestones"
    ],
    ageRange: "16 to 30 months",
    sessions: "1 session",
    method: "Onsite, hybrid, or online",
    administrator: "Qualified behavior analyst",
    outcome: "Upon completion, the interventionist will advise parents as to the risk of ASD, and may or may not refer the child for a diagnostic assessment (i.e. ADI-R or ADOS-2).",
    icon: Puzzle,
    color: "bg-red-100 text-red-700",
    image: "/placeholder.svg?height=300&width=500",
    details: [
      {
        title: "Modified Checklist for Autism in Toddlers",
        description: "A series of 20 questions about a child's behavior. Determines whether further evaluation is needed."
      }
    ]
  },
]

export default function BehaviorInterventionPage() {
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Behavior Intervention Assessments</h1>
            <div className="h-1 w-24 bg-white/70 my-6"></div>
            <p className="mt-6 text-lg leading-8">
              Our comprehensive behavior intervention assessments help identify behavioral challenges
              and develop targeted intervention strategies.
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
            About Behavior Intervention Assessments
          </h2>
          <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our behavior intervention assessments are designed to evaluate and address 
            behavioral challenges that may impact a child's development and learning.
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
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Expert Assessment</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                All assessments are conducted by qualified behavior analysts with specialized training.
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
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Personalized Strategies</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Each assessment provides individualized intervention strategies based on your child's specific needs.
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
                <MessageSquare className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">Detailed Reporting</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Following assessment, you'll receive a comprehensive report and guidance for next steps.
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
              Our Behavior Intervention Assessments
            </h2>
            <div className="h-1 w-16 bg-[#4b2e83] mx-auto my-6"></div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our range of behavior intervention assessments designed to evaluate behavioral challenges
              and develop effective intervention strategies.
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
                      {assessment.comingSoon ? (
                        <Button 
                          disabled
                          className="bg-gray-300 text-gray-600 cursor-not-allowed"
                        >
                          Coming Soon
                        </Button>
                      ) : (
                        <CheckoutModal assessmentName={assessment.name} price={assessment.price}>
                          <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 shadow-sm hover:shadow-md transition-all duration-300">
                            Book Assessment <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CheckoutModal>
                      )}
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
              Find answers to common questions about our behavior intervention assessment services.
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
                  question: "How do I know if my child needs a behavior intervention assessment?",
                  answer: "Signs that may indicate a need for assessment include challenging behaviors that interfere with learning or daily activities, difficulty following directions, trouble with social interactions, or behaviors that pose safety concerns. If you're concerned about your child's behavior, our team can help determine if an assessment would be beneficial."
                },
                {
                  question: "What does a behavior intervention assessment involve?",
                  answer: "These assessments typically include direct observation of your child, interviews with parents/caregivers and sometimes teachers, standardized assessment tools, and data collection on specific behaviors. The goal is to identify the function of challenging behaviors and develop appropriate intervention strategies."
                },
                {
                  question: "How long does the assessment process take?",
                  answer: "Most behavior intervention assessments require 2-4 sessions, depending on the specific assessment used and your child's needs. After completing the assessment, it typically takes 1-2 weeks to prepare the report and schedule a follow-up meeting to discuss results and recommendations."
                },
                {
                  question: "What happens after the assessment?",
                  answer: "After the assessment, our behavior analyst will prepare a detailed report outlining findings and specific intervention recommendations. We'll schedule a follow-up meeting to review the results and discuss appropriate intervention options, which may include behavior intervention services, parent training, or other support strategies."
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

