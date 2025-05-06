import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    id: 1,
    name: "Abeer Atiyeh",
    role: "Founder & Executive Director",
    bio: "After graduating with my BA, I worked as a Grade 1 homeroom teacher. While teaching, I received my Special Education diploma and started a Special Education department at the school. I co-founded the first early intervention center in Lebanon, and as a service coordinator I successfully developed operations, worked on capacity building, and coordinated five therapy departments. With [COMPANY], I aim for specialized intervention services to reach every child and family via advanced technology and high professional standards.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Special Education", "Early Intervention", "Inclusive Education"],
    education:
      "MA in Special Education, BA in Elementary Education, Special Education Diploma, Minor in Psychology, Board Certified Telepractice Specialist",
    experience: "20+ years",
    personal:
      "To find balance and clear my head, I find peace in nature. I go on hikes, I contemplate its greatness and its intricacies. I am the mother of two boys, and despite all the success, this fact remains my life's biggest achievement and greatest joy.",
  },
  {
    id: 2,
    name: "Dr. Ahmad Oueini",
    role: "Head of the Diagnostic Unit",
    bio: "Licensed Educational Psychologist by the Ministry of Health. President of Alphabete Learning Center for psychoeducational assessment, intervention and training. Associate professor of education and psychology at the Lebanese American University and former chairperson of the Department of Education. Author of 2 English textbooks and over 35 articles published in international refereed journals.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Educational Psychology", "Psychoeducational Assessment", "Learning Disabilities"],
    education:
      "Doctorate in Education with concentration in psychological counseling, MA in student advisement and orientation, Masters of Education in psychological counseling, MA in special education",
    experience: "25+ years",
    personal:
      "I enjoy music, reading, movies, traveling, and above all, spending quality time with my twins Lucy and Steve.",
  },
  {
    id: 3,
    name: "Mona Saab",
    role: "Head of the ABA Department",
    bio: "I am a Board Certified Behavior Analyst (BCBA), working with children (both neurotypical and those with special needs) and their families, to facilitate their acquisition of pre-academic/academic skills and developmental milestones, as well working on replacing problem behavior with adaptive behavior. In 2017, I co-founded the Association for Behavior Analysis – Lebanon (ABAL), the Lebanese chapter of the Association for Behavior Analysis International (ABAI).",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Applied Behavior Analysis", "Autism Intervention", "Problem Behavior Management"],
    education:
      "M.A., BCBA, Bachelor's degree in English Language (American University of Beirut), Teaching Diploma with emphasis in Early Childhood Education",
    experience: "15+ years",
    personal:
      "When I'm not juggling work, I can be found binge-reading, binge-watching, or binge-eating all things sweet. I also love spending time with my close friends and scuba diving. But of all my loves, my greatest by far are my two incredible daughters.",
  },
  {
    id: 4,
    name: "Maritza Abou Halka",
    role: "Co-founder and Managing Partner",
    bio: "Throughout my career I have worked in both private and public sectors, with patients from all ages and diagnosis. I specialized in communication disorders both in adult and in early childhood, dedicating my practice to helping families and children who struggle to cope with demands of home and school, to overcome challenges in daily life.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Speech and Language Pathology", "Communication Disorders", "Early Childhood Intervention"],
    education:
      "Bachelor of Honors degree in Speech and Language Pathology, Certified therapist in Hanen 'More Than Words' program, Certified TED therapist",
    experience: "22+ years",
    personal: "My favorite pastime is watching a movie with my kids, eating our favorite chocolate!",
  },
  {
    id: 5,
    name: "Lina Al Hussein",
    role: "Co-founder and Technical Advisor of the Behavior Department",
    bio: "I started my career back in 2011 as a Kindergarten homeroom teacher. Working with children with disabilities and developmental delays enriched my experience and became a passion of mine. I worked in different settings such as day care centers, schools, home, and nonprofit organizations. During my career I had the chance to work in a multidisciplinary team where I refined my skills under the supervision of a Board Certified Behavior Analyst, BCBA.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Behavior Modification", "Early Intervention", "Special Education"],
    education: "MA in Special Education, BA in Early Childhood Education, Specialized in behavior modification",
    experience: "12+ years",
    personal:
      "My workday is a joy, yet strenuous and that is why I end my day in my calm place, which is yoga. That is where I find peace and maintain my balance.",
  },
  {
    id: 6,
    name: "Mireille Aalaeddine",
    role: "Co-founder and Technical Advisor of the Occupational Therapy Department",
    bio: "I started my career in occupational therapy working at an early intervention center, I also worked in a specialized school for special needs. I have provided numerous professional development training and participated in awareness campaigns in collaboration with different NGOs. I took part in establishing occupational therapy units at health care centers in different rural areas in Lebanon.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Occupational Therapy", "Sensory Integration", "Early Intervention"],
    education:
      "Bachelor degree in Occupational therapy and a Masters degree in psychosomatic support, Certified feeding therapist",
    experience: "12+ years",
    personal:
      "My work is not only a passion but I also consider it my favorite hobby because a lot of what I do as an occupational therapist includes all types of art! I use my love for hand-crafts to customize technical aids.",
  },
  {
    id: 7,
    name: "Marylynn Deeb",
    role: "Psychosocial Counselor",
    bio: "I started my career out as a behavioral technician, working with children on the autism spectrum. After graduating with a BA degree in psychology, I worked as a support teacher for children with special needs where I was fortunate enough to work with children of different ages, needs, family dynamics and cultural backgrounds.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Psychology", "Behavioral Support", "Special Education"],
    education: "Bachelor degree in Psychology and Master's degree in Clinical psychology in progress",
    experience: "5+ years",
    personal:
      "Outside the world of psychology, I devote time to a cause that is dear to my heart which is animal welfare. In my free time you would find me rescuing stray puppies or just chilling at home with my two furry friends.",
  },
  {
    id: 8,
    name: "Hazar Khattar",
    role: "Behavior Interventionist",
    bio: "I started my career as a kindergarten teacher and later as a curriculum coordinator and head of the kindergarten division. I then moved to work in the field of Special education and became specialized in Behavior modification. I attended many courses in international institutes to consolidate my expertise in the field of parenting guide and child behavior modification.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Behavior Modification", "Parenting Guidance", "Special Education"],
    education: "Bachelor degree in Education and Diploma in Special Education",
    experience: "10+ years",
    personal:
      "I recently became a trainer who teaches mothers how to deal with their children's various impressions and behaviors.",
  },
  {
    id: 9,
    name: "Cora Bassil",
    role: "Speech and Language Therapist",
    bio: "I hold a diploma and a master's degree in Speech and Language Therapy with over 5 years of clinical experience. I specialize in Family Coaching and Mathematical Cognition. My career is built on blending intellectual insight with compassionate care, aiming to significantly impact my clients' communication and overall well-being.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Speech and Language Therapy", "Family Coaching", "Mathematical Cognition"],
    education: "Diploma and Master's degree in Speech and Language Therapy",
    experience: "5+ years",
    personal:
      "Outside of my professional work, I used to serve as an EMT and an ambulance driver at the Lebanese Red Cross.",
  },
  {
    id: 10,
    name: "Mireille Der Arakelian",
    role: "Educational Psychologist",
    bio: "After I received my BA in psychology, I worked as a support teacher for students aged between 5 and 8 where I taught different subjects for 5 years. Currently I'm working as a school psychologist where I deliver sessions related to character education, provide consultations to teachers, parents, and students, and guide students in deciding their future pathways through career counseling.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Educational Psychology", "Career Counseling", "Character Education"],
    education: "Bachelor's degree in Psychology and a Master's degree in Educational Psychology",
    experience: "5+ years",
    personal:
      "I chose educational psychology because of my passion for improving the learning experience of students. While my profession brings me a lot of fulfillment, I do enjoy basketball as well as playing the piano during my free time.",
  },
]

export default function TeamPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Our Doctors</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our team of experienced specialists dedicated to supporting your child's development journey
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900">Education:</h4>
                  <p className="text-gray-600 text-sm mt-1">{member.education}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900">Experience:</h4>
                  <p className="text-gray-600 text-sm mt-1">{member.experience}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900">Specialties:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {member.specialties.map((specialty) => (
                      <span key={specialty} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900">Personal:</h4>
                  <p className="text-gray-600 text-sm mt-1 italic">{member.personal}</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/consultation?specialist=${member.id}`}>Book a Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Take the first step in supporting your child's development by scheduling a consultation with one of our
            specialists.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/consultation">Book a Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/assessments">Take an Assessment</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

