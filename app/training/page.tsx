"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tab } from "@headlessui/react"
import { Mail, ChevronRight, GraduationCap, School, Users, ImageIcon, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function TrainingPage() {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section with enhanced design */}
      <section className="relative bg-gradient-to-b from-[#4b2e83]/10 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#4b2e83] mb-6">
              Professional Training Programs
            </h1>
            <div className="w-24 h-1 bg-[#4b2e83] mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Practical, engaging modules designed to help educators, facilitators, and schools create inclusive, supportive spaces where every child can thrive.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-12">
            {[
              { name: "Daycare Training", icon: Users },
              { name: "Facilitator Training", icon: GraduationCap },
              { name: "School Inclusion", icon: School }
            ].map(({ name, icon: Icon }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `flex-1 flex items-center justify-center space-x-2 rounded-xl py-4 px-6 text-base font-medium leading-5 transition-all duration-200 border-2
                  ${
                    selected
                      ? "bg-[#4b2e83] text-white border-[#4b2e83]"
                      : "text-gray-600 border-gray-200 hover:border-[#4b2e83] hover:text-[#4b2e83]"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {/* Daycare Training Panel */}
            <Tab.Panel>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {/* My Milestones Card */}
                <TrainingCard 
                  title="My Milestones" 
                  description="My Milestones is designed to support educators working in early childhood settings. It includes three progressive levels, each helping you better understand child development and tailor your classroom practices to meet children's needs."
                >
                  <AccordionItem value="core-level">
                    <AccordionTrigger className="text-left">Core Level: My Milestones</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 leading-relaxed">This level introduces key concepts in early childhood development. You'll learn how to recognize age-appropriate skills and create activities that match each child's stage of growth. This is the starting point for building confidence in your day-to-day work with young children.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="intermediate-level">
                    <AccordionTrigger className="text-left">Intermediate Level: Reset - Rewind - Rewire</AccordionTrigger>
                    <AccordionContent>
                      <p>In this level, you'll take your understanding further by learning how to connect daily activities with developmental goals. You'll explore how to spot early signs of delays and adjust classroom routines to support children at different skill levels.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="advanced-level">
                    <AccordionTrigger className="text-left">Advanced Level: Note My Tempo & Tap to My Rhythm</AccordionTrigger>
                    <AccordionContent>
                      <p>This level focuses on identifying developmental delays and understanding common challenges children may face. You'll learn how to support children with more specific needs by using practical strategies and adapting learning activities based on recommended intervention goals.</p>
                    </AccordionContent>
                  </AccordionItem>
                </TrainingCard>

                {/* Feeling Plus Card */}
                <TrainingCard 
                  title="Feeling Plus" 
                  description="This training track is designed to help early childhood educators better understand and support children's emotional and social development in daycare settings."
                >
                  <AccordionItem value="core-level">
                    <AccordionTrigger className="text-left">Core Level: Inside Out!</AccordionTrigger>
                    <AccordionContent>
                      <p>This introductory training explores how young children experience and express emotions. You'll learn how emotional development changes by age, how it affects classroom dynamics, and how to better support children who struggle to express how they feel.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="intermediate-level">
                    <AccordionTrigger className="text-left">Intermediate Level: Social Emotional Learning</AccordionTrigger>
                    <AccordionContent>
                      <p>At this stage, you'll explore ways to teach empathy, self-awareness, and social skills. The training offers practical strategies to help children connect with others, build healthy relationships, and develop a strong emotional foundation.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="advanced-level">
                    <AccordionTrigger className="text-left">Advanced Level: Tiny Signals, Mighty Impact</AccordionTrigger>
                    <AccordionContent>
                      <p>This advanced training helps educators spot early signs of emotional challenges like anxiety or fear. You'll learn how to respond with care, recognize when extra support is needed, and create a classroom environment that supports mental well-being for every child.</p>
                    </AccordionContent>
                  </AccordionItem>
                </TrainingCard>

                {/* Active Me Card */}
                <TrainingCard 
                  title="Active Me" 
                  description="This training program helps early childhood educators understand and support children's physical development, with a focus on movement, coordination, and independence."
                >
                  <AccordionItem value="intermediate-level">
                    <AccordionTrigger className="text-left">Intermediate Level: Active Me</AccordionTrigger>
                    <AccordionContent>
                      <p>This level builds on the My Milestones module and focuses on how motor challenges can affect a child's participation in classroom and daily activities. Educators will learn how to identify motor delays and support children with different physical needs in a safe and inclusive way.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="pre-advanced-level">
                    <AccordionTrigger className="text-left">Pre-Advanced Level: Preparing the Environment</AccordionTrigger>
                    <AccordionContent>
                      <p>Before moving to the advanced training, an assessment of your classroom or daycare environment is required. This step helps identify necessary changes or adaptations to make the space more accessible for children with physical or motor difficulties.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="advanced-level">
                    <AccordionTrigger className="text-left">Advanced Level: Independent ME</AccordionTrigger>
                    <AccordionContent>
                      <p>This training teaches practical strategies to help children with motor challenges become more independent. Educators will learn how to adjust classroom routines and activities to support each child's physical needs, while encouraging movement, confidence, and inclusion.</p>
                    </AccordionContent>
                  </AccordionItem>
                </TrainingCard>

                {/* My Backpack Card */}
                <TrainingCard 
                  title="My Backpack" 
                  description="This training path equips early childhood educators with the tools and techniques to support children's literacy from the very beginning, through sounds, stories, and early reading skills."
                >
                  <AccordionItem value="core-level">
                    <AccordionTrigger className="text-left">Core Level: My Backpack</AccordionTrigger>
                    <AccordionContent>
                      <p>This introductory training focuses on early literacy milestones. Educators will learn how to recognize these stages and design age-appropriate activities that support language and pre-reading development. (Prerequisite: My Milestones – Module 1)</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="intermediate-level">
                    <AccordionTrigger className="text-left">Intermediate Level: Funfonix</AccordionTrigger>
                    <AccordionContent>
                      <p>This level introduces a playful, multisensory approach to teaching phonics. Educators will explore practical ways to make early reading engaging and interactive, using sound, visuals, and movement to help children connect with language.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="advanced-level">
                    <AccordionTrigger className="text-left">Advanced Level: Bridging the Gap</AccordionTrigger>
                    <AccordionContent>
                      <p>At this stage, educators will learn how to identify children who may be at risk for reading difficulties. The training provides tools to close learning gaps and encourage self-awareness in young readers, helping them recognize and correct mistakes on their own.</p>
                    </AccordionContent>
                  </AccordionItem>
                </TrainingCard>

                {/* Becoming Behavior Card */}
                <TrainingCard 
                  title="Becoming Behavior" 
                  description="This training series helps early childhood educators better understand children's behavior and emotional growth, equipping them with practical tools to guide positive behavior in the classroom."
                >
                  <AccordionItem value="core-level">
                    <AccordionTrigger className="text-left">Core Level: Becoming Behavior</AccordionTrigger>
                    <AccordionContent>
                      <p>This level introduces the emotional and behavioral stages young children go through. Educators will learn how to recognize age-typical behaviors and respond to them in ways that prevent the development of negative behavior patterns.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="intermediate-level">
                    <AccordionTrigger className="text-left">Intermediate Level: The What, The Why, & The How</AccordionTrigger>
                    <AccordionContent>
                      <p>Educators will learn how to define and analyze challenging behaviors, distinguish them from general attitudes, and identify what's driving them. This level also introduces simple behavior-tracking tools to help understand patterns and causes.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="advanced-level">
                    <AccordionTrigger className="text-left">Advanced Level: Let's Act</AccordionTrigger>
                    <AccordionContent>
                      <p>In the final level, educators will apply behavior support strategies based on individualized plans. The focus is on encouraging prosocial behavior while reducing persistent challenges, helping children succeed socially and emotionally.</p>
                    </AccordionContent>
                  </AccordionItem>
                </TrainingCard>

                {/* Arabic Literacy Card */}
                <TrainingCard 
                  title="Arabic Literacy" 
                  description="This intensive training supports early childhood educators in introducing Arabic literacy in daycare settings. It's designed to make the learning process age-appropriate, practical, and rooted in developmental milestones."
                >
                  <AccordionItem value="overview">
                    <AccordionTrigger className="text-left">Program Overview</AccordionTrigger>
                    <AccordionContent>
                      <p>Arabic literacy requires more than just learning letters, it's about building the right skills in the right sequence. In this training, educators will explore how to teach Arabic using structured, research-based strategies adapted from English-language literacy models and tailored for Arabic learners.</p>
                      <p className="mt-4">Educators will learn how to teach the alphabet code and core literacy skills using a multisensory approach, combining auditory, visual, tactile, and movement-based techniques. The course also includes practical tips to support memory and language retention in young learners.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tiers">
                    <AccordionTrigger className="text-left">Training Tiers</AccordionTrigger>
                    <AccordionContent>
                      <p>This module includes two parts:</p>
                      <ol className="list-decimal ml-5 mt-2 space-y-1">
                        <li>A theoretical part</li>
                        <li>A practicum part</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </TrainingCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16 text-center"
              >
                <p className="text-gray-600 mb-6">For more information about any of our daycare training programs</p>
                <Link href="/contact">
                  <Button size="lg" className="bg-[#4b2e83] hover:bg-[#4b2e83]/90">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Professional Development
                  </Button>
                </Link>
              </motion.div>
            </Tab.Panel>
            
            {/* Facilitator Training Panel */}
            <Tab.Panel>
              <div className="max-w-4xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-[#4b2e83] mb-6">Facilitator Training</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    At ONESTI, we believe every child deserves to learn in an inclusive, supportive environment. Our facilitator training equips individuals to make that possible through hands-on, personalized support.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-[#e9e4f5]">
                      <CardHeader>
                        <CardTitle className="text-lg text-[#4b2e83]">Role & Responsibilities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-[#4b2e83] shrink-0 mt-0.5" />
                            <p className="text-gray-700">Provide in-class or daycare support to children with developmental, emotional, behavioral, or academic needs.</p>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-[#4b2e83] shrink-0 mt-0.5" />
                            <p className="text-gray-700">Work closely with families, educators, and specialists to implement individualized strategies.</p>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-[#4b2e83] shrink-0 mt-0.5" />
                            <p className="text-gray-700">Follow personalized intervention plans and help monitor each child's progress.</p>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-[#e9e4f5]">
                      <CardHeader>
                        <CardTitle className="text-lg text-[#4b2e83]">Who Can Become a Facilitator?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-[#4b2e83] shrink-0 mt-0.5" />
                            <p className="text-gray-700">Open to everyone, no education background required.</p>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-[#4b2e83] shrink-0 mt-0.5" />
                            <p className="text-gray-700">Ideal for parents, caregivers, teacher assistants, or anyone passionate about inclusion.</p>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-[#4b2e83] shrink-0 mt-0.5" />
                            <p className="text-gray-700">Certified facilitators can work in homes, schools, and daycare settings.</p>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#f9f8fc] rounded-2xl p-8 my-12 border border-[#e9e4f5]"
                >
                  <h3 className="text-xl font-semibold text-[#4b2e83] mb-8">Training Divisions</h3>
                  
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="division1" className="border border-[#e9e4f5] rounded-xl overflow-hidden bg-white">
                      <AccordionTrigger className="text-left px-6 py-4 hover:bg-[#f4f1f9]">
                        <div>
                          <h4 className="text-lg font-semibold text-[#4b2e83]">Division 1: The Connecting</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">This opening module introduces the role of the facilitator and the importance of strong communication and collaboration. You'll explore how telepractice connects families and professionals across distances, and how developmental areas are linked in a child's overall growth. The facilitator is presented as the key link between all parts of a child's support system.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="division2" className="border border-[#e9e4f5] rounded-xl overflow-hidden bg-white">
                      <AccordionTrigger className="text-left px-6 py-4 hover:bg-[#f4f1f9]">
                        <div>
                          <h4 className="text-lg font-semibold text-[#4b2e83]">Division 2: Ground Inspection</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">Before supporting a child, it's important to understand their foundation, how they develop, and what influences that development. This module focuses on recognizing developmental milestones and the environmental factors that affect growth, such as family dynamics, school settings, and daily routines.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="division3" className="border border-[#e9e4f5] rounded-xl overflow-hidden bg-white">
                      <AccordionTrigger className="text-left px-6 py-4 hover:bg-[#f4f1f9]">
                        <div>
                          <h4 className="text-lg font-semibold text-[#4b2e83]">Division 3: Draw to Scale</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">This part of the training focuses on individualizing support. You'll learn how to recognize early signs of developmental delays and how to adapt your approach to meet each child's specific needs. This knowledge helps ensure the strategies used are accurate, meaningful, and support long-term development.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="division4" className="border border-[#e9e4f5] rounded-xl overflow-hidden bg-white">
                      <AccordionTrigger className="text-left px-6 py-4 hover:bg-[#f4f1f9]">
                        <div>
                          <h4 className="text-lg font-semibold text-[#4b2e83]">Division 4: The Truss</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">The final module highlights the role of the facilitator in improving not just developmental outcomes, but overall quality of life for the child and their family. You'll gain insight into how your support strengthens the entire intervention process, helping children grow with confidence and stability.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center mt-12"
                >
                  <p className="text-gray-600 mb-6">For more information about our facilitator training programs</p>
                  <Link href="/contact">
                    <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Professional Development
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </Tab.Panel>
            
            {/* School Inclusion Panel */}
            <Tab.Panel>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                  <div className="lg:col-span-7 space-y-4">
                    <h2 className="text-2xl font-bold text-[#4b2e83] mb-4">School Inclusion</h2>
                    <p className="text-gray-700">
                      Our specialized training modules help create an inclusive environment at your school and prepare your educators and staff to cater for every child's needs.
                    </p>
                    <p className="text-gray-700">
                      We believe in the power of inclusive education that gives every child the opportunity to learn and grow alongside their peers, regardless of their abilities or challenges.
                    </p>
                    <p className="text-gray-700">
                      Our comprehensive training programs are designed to equip school staff with the knowledge, tools, and strategies needed to create truly inclusive learning environments.
                    </p>
                    <div className="pt-4">
                      <Link href="/contact">
                        <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 px-6 py-2">
                          Request School Training
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <motion.div 
                      className="h-full w-full rounded-2xl overflow-hidden shadow-md relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image
                        src="/placeholder.svg"
                        alt="School Inclusion Training"
                        width={500}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4b2e83]/80 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-white text-xl font-semibold mb-2">School Inclusion Training</h3>
                        <p className="text-white/90">
                          Creating supportive learning environments for all students
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="bg-[#f9f8fc] rounded-2xl p-8 mb-8 border border-[#e9e4f5]">
                  <h3 className="text-xl font-semibold text-[#4b2e83] mb-8">Our School Inclusion Programs Include:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Card className="h-full hover:shadow-md transition-all border-[#e9e4f5] overflow-hidden group">
                        <CardHeader className="bg-gradient-to-r from-[#f4f1f9] to-white border-b border-[#e9e4f5]">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#4b2e83]/10 p-2 rounded-full">
                              <GraduationCap className="h-5 w-5 text-[#4b2e83]" />
                            </div>
                            <div>
                              <CardTitle className="text-[#4b2e83]">Teacher Training</CardTitle>
                              <CardDescription>Equipping educators with inclusive teaching strategies</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-gray-700">Comprehensive training for classroom teachers on adapting curriculum, differentiated instruction, and creating supportive learning environments for all students.</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Card className="h-full hover:shadow-md transition-all border-[#e9e4f5] overflow-hidden group">
                        <CardHeader className="bg-gradient-to-r from-[#f4f1f9] to-white border-b border-[#e9e4f5]">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#4b2e83]/10 p-2 rounded-full">
                              <Users className="h-5 w-5 text-[#4b2e83]" />
                            </div>
                            <div>
                              <CardTitle className="text-[#4b2e83]">Staff Development</CardTitle>
                              <CardDescription>Building a cohesive inclusive school culture</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-gray-700">Training for all school staff including administrators, counselors, and support personnel to ensure a unified approach to inclusion throughout the school.</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Card className="h-full hover:shadow-md transition-all border-[#e9e4f5] overflow-hidden group">
                        <CardHeader className="bg-gradient-to-r from-[#f4f1f9] to-white border-b border-[#e9e4f5]">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#4b2e83]/10 p-2 rounded-full">
                              <BookOpen className="h-5 w-5 text-[#4b2e83]" />
                            </div>
                            <div>
                              <CardTitle className="text-[#4b2e83]">Inclusive Curriculum Design</CardTitle>
                              <CardDescription>Creating learning materials for all abilities</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-gray-700">Guidance on adapting existing curriculum and designing new materials that accommodate diverse learning needs while maintaining academic standards.</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Card className="h-full hover:shadow-md transition-all border-[#e9e4f5] overflow-hidden group">
                        <CardHeader className="bg-gradient-to-r from-[#f4f1f9] to-white border-b border-[#e9e4f5]">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#4b2e83]/10 p-2 rounded-full">
                              <School className="h-5 w-5 text-[#4b2e83]" />
                            </div>
                            <div>
                              <CardTitle className="text-[#4b2e83]">Behavior Support Strategies</CardTitle>
                              <CardDescription>Promoting positive behaviors in all students</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-gray-700">Training on implementing positive behavior supports, de-escalation techniques, and creating effective behavior intervention plans.</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>

                <div className="text-center pb-6">
                  <p className="text-gray-600 mb-4">For more information about our school inclusion programs</p>
                  <Link href="/contact">
                    <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 px-8">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Professional Development
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </div>
  )
}

function TrainingCard({ 
  title, 
  description,
  imagePath,
  children 
}: { 
  title: string
  description: string
  imagePath?: string
  children: React.ReactNode 
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
          {imagePath ? (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4b2e83]/20 to-[#4b2e83]/5 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <ImageIcon className="h-16 w-16 text-white/40" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-[#4b2e83]/40">
              <ImageIcon className="h-16 w-16" />
              <p className="text-sm mt-2">{title}</p>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-xl text-[#4b2e83]">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <Accordion type="single" collapsible>
            {children}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  )
} 