"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MilestoneSubscriptionDialog } from "@/components/milestone/milestone-subscription-dialog"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ParentJourney() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.1
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  }

  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%",
      transition: { 
        duration: 1,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <motion.div 
        className="mx-auto max-w-3xl text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your Child's Journey</h2>
        <p className="mt-4 text-xl leading-8 text-gray-600">
          We're here to support you every step of the way with our comprehensive intervention services
        </p>
      </motion.div>

      <motion.div 
        className="relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Timeline connector */}
        <motion.div 
          className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block origin-top"
          variants={lineVariants}
        ></motion.div>

        {/* Step 1 */}
        <motion.div 
          className="relative mb-12 md:mb-24"
          variants={itemVariants}
        >
          <motion.div 
            className="hidden md:block absolute left-16 top-0 -translate-x-1/2 z-10"
            variants={circleVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-md">
              <span className="text-white text-xl font-semibold">1</span>
            </div>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center md:pl-24">
            <div className="w-full md:w-5/12 md:pr-8 mb-8 md:mb-0">
              <motion.div 
                className="flex md:hidden items-center justify-center w-12 h-12 bg-primary rounded-full mb-4 mx-auto shadow-md"
                variants={circleVariants}
                whileHover="hover"
              >
                <span className="text-white text-xl font-semibold">1</span>
              </motion.div>
              <div className="text-left md:text-left text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Learn About Your Child's Development</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Explore our blog articles to understand developmental milestones, read about daily routines and different challenges.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild className="rounded-full bg-blue-50 text-primary hover:bg-blue-100 px-8 w-full md:w-auto">
                    <Link href="/blogs">Read Our Blog</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="w-full md:w-7/12 md:pl-8">
              <motion.div 
                className="bg-blue-50 rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow"
                variants={imageVariants}
                whileHover="hover"
              >
                <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/consultation-session.jpeg"
                    alt="Consultation session"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          className="relative mb-12 md:mb-24"
          variants={itemVariants}
        >
          <motion.div 
            className="hidden md:block absolute left-16 top-0 -translate-x-1/2 z-10"
            variants={circleVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-md">
              <span className="text-white text-xl font-semibold">2</span>
            </div>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center md:pl-24">
            <div className="w-full md:w-5/12 md:pr-8 mb-8 md:mb-0">
              <motion.div 
                className="flex md:hidden items-center justify-center w-12 h-12 bg-primary rounded-full mb-4 mx-auto shadow-md"
                variants={circleVariants}
                whileHover="hover"
              >
                <span className="text-white text-xl font-semibold">2</span>
              </motion.div>
              <div className="text-left md:text-left text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Fill [COMPANY]'s Screening Checklist</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Our screening checklists will help us identify any possible delays or challenges.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild className="rounded-full bg-blue-50 text-primary hover:bg-blue-100 px-8 w-full md:w-auto">
                    <Link href="/assessments">Start Screening</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="w-full md:w-7/12 md:pl-8">
              <motion.div 
                className="bg-blue-50 rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow"
                variants={imageVariants}
                whileHover="hover"
              >
                <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/therapy-session.jpeg"
                    alt="Child assessment session"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          className="relative mb-12 md:mb-24"
          variants={itemVariants}
        >
          <motion.div 
            className="hidden md:block absolute left-16 top-0 -translate-x-1/2 z-10"
            variants={circleVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-md">
              <span className="text-white text-xl font-semibold">3</span>
            </div>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center md:pl-24">
            <div className="w-full md:w-5/12 md:pr-8 mb-8 md:mb-0">
              <motion.div 
                className="flex md:hidden items-center justify-center w-12 h-12 bg-primary rounded-full mb-4 mx-auto shadow-md"
                variants={circleVariants}
                whileHover="hover"
              >
                <span className="text-white text-xl font-semibold">3</span>
              </motion.div>
              <div className="text-left md:text-left text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Book Your Free 20-Minute Session</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Schedule a complimentary consultation with one of our specialists to discuss your child's needs.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild className="rounded-full bg-blue-50 text-primary hover:bg-blue-100 px-8 w-full md:w-auto">
                    <Link href="/consultation">Book Consultation</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="w-full md:w-7/12 md:pl-8">
              <motion.div 
                className="bg-blue-50 rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow"
                variants={imageVariants}
                whileHover="hover"
              >
                <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/child-learning.jpeg"
                    alt="Child learning and growing"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div 
          className="relative mb-12 md:mb-24"
          variants={itemVariants}
        >
          <motion.div 
            className="hidden md:block absolute left-16 top-0 -translate-x-1/2 z-10"
            variants={circleVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-md">
              <span className="text-white text-xl font-semibold">4</span>
            </div>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center md:pl-24">
            <div className="w-full md:w-5/12 md:pr-8 mb-8 md:mb-0">
              <motion.div 
                className="flex md:hidden items-center justify-center w-12 h-12 bg-primary rounded-full mb-4 mx-auto shadow-md"
                variants={circleVariants}
                whileHover="hover"
              >
                <span className="text-white text-xl font-semibold">4</span>
              </motion.div>
              <div className="text-left md:text-left text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Start Your Child's Intervention</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Begin your child's intervention with the right program for their unique needs.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild className="rounded-full bg-blue-50 text-primary hover:bg-blue-100 px-8 w-full md:w-auto">
                    <Link href="/programs">View Programs</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="w-full md:w-7/12 md:pl-8">
              <motion.div 
                className="bg-blue-50 rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow"
                variants={imageVariants}
                whileHover="hover"
              >
                <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                  <Image src="/images/speech-therapy.jpeg" alt="Child therapy session" fill className="object-cover transition-transform duration-700" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Step 5 */}
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <motion.div 
            className="hidden md:block absolute left-16 top-0 -translate-x-1/2 z-10"
            variants={circleVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-md">
              <span className="text-white text-xl font-semibold">5</span>
            </div>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center md:pl-24">
            <div className="w-full md:w-5/12 md:pr-8 mb-8 md:mb-0">
              <motion.div 
                className="flex md:hidden items-center justify-center w-12 h-12 bg-primary rounded-full mb-4 mx-auto shadow-md"
                variants={circleVariants}
                whileHover="hover"
              >
                <span className="text-white text-xl font-semibold">5</span>
              </motion.div>
              <div className="text-left md:text-left text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Track Your Child's Milestones</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Subscribe to receive personalized milestone updates and developmental tips based on your child's age.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="rounded-full bg-blue-50 text-primary hover:bg-blue-100 px-8 w-full md:w-auto"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Track Milestones
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="w-full md:w-7/12 md:pl-8">
              <motion.div 
                className="bg-blue-50 rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow"
                variants={imageVariants}
                whileHover="hover"
              >
                <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/child-development.jpeg"
                    alt="Child development milestones"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Milestone Subscription Dialog */}
      <MilestoneSubscriptionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}

