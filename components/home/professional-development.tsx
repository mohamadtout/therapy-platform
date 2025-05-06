"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ProfessionalDevelopment() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Professional Development</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Are you a school, daycare, or educational institution looking to enhance your inclusive practices? Our
            specialized training programs are designed to empower your staff with the skills needed to support children
            with diverse needs.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Image with light blue background */}
          <motion.div
            className="w-full md:w-1/2 bg-[#e6f2f9] rounded-lg overflow-hidden relative min-h-[400px]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/classroom-children.png"
              alt="Children in an inclusive classroom environment"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Training Programs</h3>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-onesti-purple mb-2">Daycare Training</h3>
                <p className="text-base text-gray-600">
                  Our specialized training modules help create an inclusive environment in your early childhood setting
                  and prepare your educators and staff to cater for every child's needs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-onesti-purple mb-2">Facilitator Training</h3>
                <p className="text-base text-gray-600">
                  By becoming an intervention & inclusion facilitator, individuals will have the opportunity to work
                  with children who need special support in different settings: home, day care, schools.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-onesti-purple mb-2">School Inclusion</h3>
                <p className="text-base text-gray-600">
                  Our specialized training modules help create an inclusive environment at your school and prepare your
                  educators and staff to cater for every child's needs.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Button
                asChild
                className="bg-onesti-purple hover:bg-onesti-lightblue text-white px-6 py-2.5 text-base font-medium rounded-md"
              >
                <Link href="/trainings">Explore Our Training Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

