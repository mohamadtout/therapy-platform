"use client"

import React from "react"
import { Award, Home, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Condensed features into 3 main points
const features = [
  {
    title: "Quality & Expertise",
    description:
      "Our professional team ensures the highest quality of service with personalized therapy plans and consistent evaluation to monitor your child's progress.",
    icon: Award,
  },
  {
    title: "Convenience & Accessibility",
    description:
      "Therapy from the comfort of your home, flexible scheduling that fits your timetable, and a comprehensive delivery model accessible wherever you are.",
    icon: Home,
  },
  {
    title: "Innovative Approach",
    description:
      "We incorporate technology as a motivational factor and integrate therapy objectives into your family's daily routine for consistent practice and better results.",
    icon: Sparkles,
  },
]

const CountUp = ({ end, duration = 2000, label }: { end: number; duration?: number; label: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    if (inView) {
      animationFrame = requestAnimationFrame(animate)
    }

    return () => cancelAnimationFrame(animationFrame)
  }, [inView, end, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-6xl font-bold text-primary mb-2">{count}</div>
      <div className="w-12 h-0.5 bg-primary mx-auto mb-3"></div>
      <p className="text-gray-700">{label}</p>
    </div>
  )
}

const FeatureCard = ({ feature, index }: { feature: (typeof features)[0]; index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-b-4 border-primary"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
        </div>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </motion.div>
  )
}

export default function WhyChooseOnesti() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-primary">[COMPANY]</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We're committed to providing exceptional therapy services that meet your family's unique needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          className="bg-primary/5 rounded-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-4xl font-bold text-primary text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            While Supporting You... We Grow Together
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CountUp end={1600} label="Successful therapy sessions completed" />
            <CountUp end={500} label="Assessment sessions completed" />
            <CountUp end={325} label="Free consultations" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

