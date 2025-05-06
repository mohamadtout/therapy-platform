import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// This would typically come from a database, but for now we'll use the same data
const teamMembers = [
  {
    id: 1,
    name: "Selma Haddad",
    role: "Director of Global Programs",
    bio: "PhD in Educational Policy and MSc in Child Development. Selma leads international initiatives focused on inclusive education and developmental services across underserved communities.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Inclusive Education", "Policy Development", "Global Programs"],
    education: "PhD in Educational Policy, MSc in Child Development",
    experience: "18+ years",
    fullBio: `Starting as a childhood development specialist, I soon transitioned into policy-level advocacy. I've worked with governmental and international agencies to draft inclusive education frameworks in low-income countries. I’m passionate about scaling evidence-based programs to reach more children globally. I’m a tri-lingual educator and mother of three, and I find joy in hiking remote mountain trails.`,
    personalInterests: "Hiking, travel photography, mentoring young professionals",
  },
  {
    id: 2,
    name: "Layla Mansour",
    role: "Lead Clinical Psychologist",
    bio: "Licensed psychologist with an MSc in Clinical Psychology and certifications in trauma therapy. Layla specializes in therapeutic interventions for youth affected by displacement.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Trauma Counseling", "Child Psychology", "Displacement Support"],
    education: "MSc in Clinical Psychology",
    experience: "14+ years",
    fullBio: `After volunteering in refugee camps, I committed my practice to trauma-informed psychological care. My work spans individual therapy, group sessions, and staff supervision. I also conduct training for field psychologists across the Middle East. Outside of work, I enjoy playing the oud and visiting historical sites.`,
    personalInterests: "Music, historical tours, writing poetry",
  },
  {
    id: 3,
    name: "Karim Fadel",
    role: "Head of Technology-Driven Interventions",
    bio: "Engineer turned educator with a Master’s in Educational Technology. Karim builds innovative digital tools for therapy access.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["EdTech Innovation", "Telepractice", "Software for Learning Disabilities"],
    education: "Master's in Educational Technology, BSc in Computer Engineering",
    experience: "10+ years",
    fullBio: `My tech background meets my passion for education at a perfect intersection. I’ve developed several platforms for remote intervention, one of which now supports over 20,000 users. I'm deeply interested in how gamification can support therapy outcomes for neurodiverse learners.`,
    personalInterests: "Coding games, 3D printing, VR experiments",
  },
  {
    id: 4,
    name: "Dana Nassar",
    role: "Family Engagement Coordinator",
    bio: "BA in Social Work and certified parenting coach. Dana designs programs that empower families to actively participate in therapeutic processes.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Parent Coaching", "Community Outreach", "Family Systems Therapy"],
    education: "BA in Social Work, Certified Parent Coach",
    experience: "9+ years",
    fullBio: `My career began in child protection, but I found my passion in family systems work. I now create training materials and support structures to improve parental involvement in child development programs. When I’m not working, you’ll find me creating handmade pottery or hosting parenting circles.`,
    personalInterests: "Pottery, public speaking, DIY projects",
  },
  {
    id: 5,
    name: "Ziad Hamadeh",
    role: "Occupational Therapy Supervisor",
    bio: "BSc in Occupational Therapy and certified in sensory integration. Ziad manages OT services with a focus on school readiness and motor development.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Motor Skills Development", "Pediatric OT", "School Readiness"],
    education: "BSc in Occupational Therapy, Certificate in Sensory Integration",
    experience: "11+ years",
    fullBio: `Throughout my OT journey, I've worked in schools, hospitals, and rehabilitation centers. My specialization lies in helping children build fine and gross motor skills needed for daily success. I also teach at a local university. I'm passionate about adaptive sports and have coached inclusive basketball teams.`,
    personalInterests: "Basketball, woodworking, adaptive sports",
  },
  {
    id: 6,
    name: "Farah Khalil",
    role: "Speech and Language Pathologist",
    bio: "MSc in Speech and Language Pathology with emphasis on fluency and articulation. Farah works extensively with multilingual children.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Fluency Disorders", "Multilingual Language Acquisition", "Speech Therapy"],
    education: "MSc in Speech and Language Pathology",
    experience: "7+ years",
    fullBio: `I have a strong interest in how language is acquired in bilingual homes. My therapy sessions are play-based and deeply personalized. I believe that communication is a right, and I’m proud to support children to find their voice—literally and figuratively.`,
    personalInterests: "Foreign languages, cooking with friends, music festivals",
  },
  {
    id: 7,
    name: "Nour Barakat",
    role: "Behavior Analyst",
    bio: "Board Certified Behavior Analyst with an MA in Applied Behavior Analysis. Nour supports children with ASD in developing communication and life skills.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Autism Intervention", "Functional Behavior Assessment", "Skill Acquisition"],
    education: "MA in ABA, BCBA certified",
    experience: "8+ years",
    fullBio: `I discovered ABA during an internship and have never looked back. Over the years, I’ve developed and supervised behavioral programs in schools and clinics. I also love training families and staff. I’m passionate about ethical ABA and advocating for neurodiversity.`,
    personalInterests: "Trail running, abstract painting, animal rescue",
  },
  {
    id: 8,
    name: "Jad Khalife",
    role: "Psychoeducational Consultant",
    bio: "M.Ed in Special Education and certified cognitive assessor. Jad provides psychoeducational evaluations and consults with schools on support plans.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Learning Disabilities", "Cognitive Assessment", "IEP Development"],
    education: "M.Ed in Special Education",
    experience: "13+ years",
    fullBio: `My days revolve around helping children understand how they learn best. I conduct assessments and provide workshops for teachers and parents. I've helped dozens of schools implement inclusive practices. I also play jazz piano in my free time.`,
    personalInterests: "Jazz piano, birdwatching, chess",
  },
  {
    id: 9,
    name: "Lama Youssef",
    role: "Clinical Supervisor",
    bio: "Licensed therapist with dual degrees in Clinical Psychology and Child Welfare. Lama leads training and supervision for interns and early-career clinicians.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Clinical Supervision", "Attachment Therapy", "Child Welfare"],
    education: "BA in Clinical Psychology, MA in Child Welfare",
    experience: "16+ years",
    fullBio: `With over 15 years of clinical work, I now find joy in training the next generation of therapists. I’ve supervised dozens of students and conducted research on attachment patterns in children from disrupted households. I'm a strong advocate for mental health reform.`,
    personalInterests: "Reading memoirs, rooftop gardening, spoken word poetry",
  },
  {
    id: 10,
    name: "Omar Darwich",
    role: "Early Childhood Specialist",
    bio: "BA in Early Childhood Education and certified in Play Therapy. Omar works closely with families to design developmentally appropriate routines and play-based learning plans.",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Play Therapy", "Early Development", "Parental Support"],
    education: "BA in Early Childhood Education",
    experience: "6+ years",
    fullBio: `I believe in the power of play to heal, teach, and connect. I’ve worked in nurseries, clinics, and family homes to support children with developmental challenges. I run play therapy sessions that integrate storytelling, movement, and sensory tools. I also host dad-focused parenting workshops.`,
    personalInterests: "Storytelling, cycling, building model trains",
  },
];

export default function TeamMemberPage({ params }: { params: { id: string } }) {
  const memberId = Number.parseInt(params.id)
  const member = teamMembers.find((m) => m.id === memberId)

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Team member not found</h1>
          <p className="mt-4">The team member you're looking for doesn't exist.</p>
          <Button asChild className="mt-6">
            <Link href="/about/team">Back to Team</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/about" className="text-gray-500 hover:text-gray-700">
                About
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/about/team" className="text-gray-500 hover:text-gray-700">
                Our Team
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-blue-600">{member.name}</span>
            </li>
          </ol>
        </nav>

        <Button variant="outline" className="mb-8" asChild>
          <Link href="/about/team">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Image and Quick Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-6">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
              <p className="text-lg text-primary mb-4">{member.role}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Specialties</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {member.specialties.map((specialty) => (
                      <span key={specialty} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio and Details */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {member.name}</h2>

              {member.fullBio.split("\n\n").map((paragraph, index) => {
                // Check if the paragraph contains bullet points (lines starting with • or *)
                if (paragraph.includes("\n• ") || paragraph.includes("\n* ")) {
                  let introText = "";
                  let bulletPoints: string[] = [];
                  
                  if (paragraph.includes("\n• ")) {
                    const parts = paragraph.split("\n• ");
                    introText = parts[0];
                    bulletPoints = parts.slice(1);
                  } else if (paragraph.includes("\n* ")) {
                    const parts = paragraph.split("\n* ");
                    introText = parts[0];
                    bulletPoints = parts.slice(1);
                  }
                  
                  return (
                    <div key={index} className="mb-6">
                      {introText && <p className="mb-4 text-gray-700 leading-relaxed">{introText}</p>}
                      <ul className="list-disc pl-6 space-y-2">
                        {bulletPoints.map((point, i) => (
                          <li key={i} className="text-gray-700 leading-relaxed">{point.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Related Team Members */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Team Members</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers
                  .filter((m) => m.id !== member.id)
                  .slice(0, 3)
                  .map((relatedMember) => (
                    <Link key={relatedMember.id} href={`/team/${relatedMember.id}`} className="group block">
                      <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                        <Image
                          src={relatedMember.image || "/placeholder.svg"}
                          alt={relatedMember.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {relatedMember.name}
                      </h4>
                      <p className="text-sm text-gray-600">{relatedMember.role}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

