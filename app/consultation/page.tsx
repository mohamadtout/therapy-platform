"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import AppointmentBooking from "@/components/consultation/appointment-booking"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

// Content for both languages
const content = {
  en: {
    title: "Free Consultation",
    subtitle: "Schedule a free consultation with our specialists to discuss your child's developmental journey",
    whatToExpect: {
      title: "What to Expect",
      items: [
        {
          text: "30-minute comprehensive discussion about your child's developmental needs",
          icon: "clock"
        },
        {
          text: "Overview of our assessment process and available services",
          icon: "clipboard"
        },
        {
          text: "Opportunity to ask questions and address concerns",
          icon: "message"
        },
        {
          text: "Personalized recommendations for next steps",
          icon: "check"
        }
      ]
    },
    bookingSection: {
      title: "Schedule Your Free Consultation",
      description: "Select a date and time that works for you, and our team will reach out to confirm your appointment.",
      buttonText: "Book Free Consultation"
    }
  },
  ar: {
    title: "استشارة مجانية",
    subtitle: "احجز استشارة مجانية مع متخصصينا لمناقشة رحلة تطور طفلك",
    whatToExpect: {
      title: "ماذا تتوقع",
      items: [
        {
          text: "مناقشة شاملة لمدة 30 دقيقة حول احتياجات طفلك التطورية",
          icon: "clock"
        },
        {
          text: "نظرة عامة على عملية التقييم والخدمات المتاحة",
          icon: "clipboard"
        },
        {
          text: "فرصة لطرح الأسئلة ومعالجة المخاوف",
          icon: "message"
        },
        {
          text: "توصيات مخصصة للخطوات التالية",
          icon: "check"
        }
      ]
    },
    bookingSection: {
      title: "احجز استشارتك المجانية",
      description: "اختر التاريخ والوقت المناسبين لك، وسيتواصل فريقنا معك لتأكيد موعدك.",
      buttonText: "احجز استشارة مجانية"
    }
  }
}

export default function ConsultationPage() {
  const [showBooking, setShowBooking] = useState(false)
  const { language } = useLanguage()
  const t = content[language]

  if (showBooking) {
    return <AppointmentBooking />
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-lg text-gray-500">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column: What to Expect */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.whatToExpect.title}</h2>
            <ul className="space-y-6">
              {t.whatToExpect.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-onesti-purple/10 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="h-6 w-6 text-onesti-purple"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {item.icon === "clock" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                      {item.icon === "clipboard" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      )}
                      {item.icon === "message" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      )}
                      {item.icon === "check" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                  </div>
                  <span className="text-gray-700 text-lg">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Booking Section */}
          <div className="sticky top-6">
            <div className="bg-gray-50 rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.bookingSection.title}</h3>
              <p className="text-gray-600 mb-6">
                {t.bookingSection.description}
              </p>
              <Button 
                className="w-full text-lg py-6" 
                onClick={() => setShowBooking(true)}
              >
                {t.bookingSection.buttonText}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-onesti-purple">500+</div>
                  <div className="text-sm text-gray-600">
                    {language === "en" ? "Families Supported" : "عائلة مدعومة"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-onesti-purple">98%</div>
                  <div className="text-sm text-gray-600">
                    {language === "en" ? "Parent Satisfaction" : "رضا الوالدين"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

