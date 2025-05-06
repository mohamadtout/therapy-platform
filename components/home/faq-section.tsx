"use client"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "What services does [COMPANY] provide for children?",
    answer:
      "[COMPANY] provides comprehensive pediatric care services including developmental assessments, speech therapy, occupational therapy, behavioral therapy, and parent coaching. We offer both in-person and telepractice options to support your child's unique needs.",
  },
  {
    question: "How do I know if my child needs an assessment?",
    answer:
      "If you notice your child is not meeting developmental milestones, has difficulty with communication, shows challenging behaviors, or if you simply have concerns about their development, an assessment can provide valuable insights. Our free screening tools can help you determine if a full assessment would be beneficial.",
  },
  {
    question: "What age groups do you work with?",
    answer:
      "We work with children from birth through adolescence. Our services are tailored to each developmental stage, with specialized programs for infants, toddlers, preschoolers, and school-age children.",
  },
  {
    question: "How do online therapy sessions work?",
    answer:
      "Our telepractice sessions are conducted through a secure, HIPAA-compliant platform. You'll receive a link to join the session, where your child will work directly with our specialists. We provide guidance for setting up an optimal environment and may suggest having specific materials ready for the session.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We offer various payment plans including package options and individual session payments. We also provide information about insurance coverage and can help you understand your benefits. Contact us for details about our current rates and payment options.",
  },
]

export default function FaqSection() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Have any <span className="text-onesti-purple">Questions?</span>
          </h2>
          <p className="mt-4 text-gray-600">No extra charges, no surprise fees</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-onesti-purple/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-onesti-purple">Q</span>
                        </div>
                        <span className="text-left font-medium">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0">
                      <div className="ml-11">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/images/child-development.jpeg"
              alt="Child engaged in developmental therapy session"
              width={600}
              height={600}
              className="rounded-lg shadow-md object-cover h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

