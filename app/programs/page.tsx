"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageIcon, ArrowLeftIcon } from "lucide-react"
import { motion } from "framer-motion"

// Define the categories
const categories = [
  { id: "developmental", name: "Developmental" },
  { id: "routine", name: "Routine" },
  { id: "academics", name: "Academics" },
  { id: "aba", name: "ABA" },
  { id: "counseling", name: "Counseling" }
];

// Define the program data with category assignments
const programsData = [
  {
    id: "speak",
    category: "developmental",
    title: "SPEAK Program",
    description: "An intervention program that helps children develop stronger communication and language skills through engaging online sessions and practical everyday activities.",
    content: "The SPEAK Program is a comprehensive speech and language therapy program designed to help your child bridge communication gaps and target specific skills through effective, evidence-based interventions. Our highly skilled speech-language pathologists (SLPs) will work closely with your child to help improve their speech, language, and communication abilities. We guide parents in integrating these strategies into daily routines, creating multiple learning and practice opportunities that reinforce progress beyond therapy sessions.",
    additionalContent: "Early intervention is critical for addressing speech and language delays. If you notice any delays in your child's communication skills, don't wait. Complete [COMPANY]'s developmental screening checklist and reach out to our professionals to learn more about your child's development and the steps you can take to support them.",
    whoCanBenefit: [
      "Children with speech or language delays",
      "Children experiencing difficulty expressing thoughts, forming sentences, or understanding language",
      "Children with articulation or pronunciation challenges",
      "Children struggling with social communication and interaction"
    ],
    keyFeatures: [
      "Personalized Therapy Plans – Tailored interventions based on the child's unique needs",
      "Parent Coaching & Support – Strategies to apply in daily life for continuous progress",
      "Holistic Development Focus – Addressing communication alongside social, behavioral, sensory, and academic aspects",
      "Early Intervention Emphasis – Identifying and addressing delays early for optimal outcomes",
      "Multi-Disciplinary Collaboration – Coordination with other professionals when needed",
      "Multi-Learning Opportunities – Enhances communication, speech, and language skills through diverse, engaging activities and strategies"
    ]
  },
  {
    id: "reach-up",
    category: "developmental",
    title: "REACH UP Program",
    description: "An intervention program that helps children develop stronger coordination, balance, and physical skills through fun, interactive online activities.",
    content: "Reach UP is a program designed to enhance your child's motor skills through targeted development and improvement. The program begins with a comprehensive assessment of both gross and fine motor abilities, evaluating their impact on daily activities and overall movement independence. As a hybrid program delivered both online and onsite, your child will engage in customized motor activities through interactive sessions that cater to his/her unique needs. These activities, inspired by your cultural background and family dynamics, are crafted to help your child master and generalize essential skills. Our goal is to empower you as parents with effective techniques to integrate these targeted motor skills into your daily routines.",
    additionalContent: "Early intervention is critical for supporting motor development. If you notice any delays in your child's movement or coordination, don't wait. Complete [COMPANY]'s developmental screening checklist and reach out to our professionals to learn more about your child's motor development and the steps you can take to support their progress.",
    whoCanBenefit: [
      "Children with delays in gross and fine motor skills",
      "Children experiencing difficulties with coordination, balance, or independent movement",
      "Children struggling with daily activities that require effective motor control"
    ],
    keyFeatures: [
      "Personalized Therapy Plans – Tailored interventions based on the child's unique motor skill needs",
      "Parent Coaching & Support – Practical strategies for integrating motor skill development into daily routines",
      "Holistic Development Focus – Addressing motor skills alongside sensory, social, and academic aspects",
      "Early Intervention Emphasis – Identifying and addressing motor delays early for optimal outcomes",
      "Multi-Disciplinary Collaboration – Coordination with other professionals",
      "Hybrid Delivery Model – Flexible online and onsite sessions for comprehensive care",
      "Interactive, Culturally-Inspired Activities – Engaging exercises that reflect the child's cultural background and family dynamics"
    ]
  },
  {
    id: "senses-in-harmony",
    category: "developmental",
    title: "SENSES IN HARMONY",
    description: "An intervention program that helps children who are sensitive to sensory experiences (sounds, textures, movements) become more comfortable and confident in their daily activities.",
    content: "Sensory challenges occur when the brain struggles to process stimuli—what we see, hear, smell, taste, or touch—effectively. The Senses in Harmony program is a hybrid program (delivered both online and onsite) that helps your child accurately interpret and manage sensory inputs from their environment. Through scientifically designed sensory exercises, activities, and environmental adaptations, the program eases your child's daily struggles. Your child will participate in engaging, interactive sensory sessions tailored to their unique needs, with activities inspired by their cultural background, home environment, and family dynamics. Additionally, the program equips you with proven techniques and methods to adapt the environment, ensuring it aligns with your child's current sensory tolerance levels.",
    additionalContent: "Early intervention is critical for addressing sensory processing challenges. If you notice signs of sensory difficulties in your child, don't wait—begin the sensory profile assessment or contact our professionals to learn more about your child's sensory profile and the steps you can take to support their development.",
    whoCanBenefit: [
      "Children experiencing sensory processing difficulties",
      "Children who become easily overwhelmed or under-responsive to sensory stimuli",
      "Children struggling to integrate sensory information in daily activities"
    ],
    keyFeatures: [
      "Personalized Therapy Plans – Tailored interventions based on the child's unique sensory profile",
      "Parent Coaching & Support – Practical strategies for adapting daily routines and the home environment",
      "Hybrid Delivery Model – Flexible online and onsite sessions for comprehensive care",
      "Interactive, Culturally-Inspired Activities – Engaging exercises that reflect the child's background and family dynamics",
      "Early Intervention Emphasis – Addressing sensory challenges promptly for optimal outcomes"
    ]
  },
  {
    id: "i-cue",
    category: "developmental",
    title: "I CUE Program",
    description: "An intervention program that strengthens children's thinking and problem-solving abilities through engaging activities that build on their natural interests and strengths.",
    content: "\"I CUE\" is a program designed to help children enhance their mental and intellectual abilities and overcome daily challenges resulting from delays in these skills. At [COMPANY], we believe that child development must be addressed comprehensively, targeting all areas that can affect or be affected by cognitive delays. This comprehensive program supports your child's global development through a hybrid approach—combining online interactive sessions with onsite support. Our educational programs and evidence-based activities are engaging, fun, and individually tailored to match your child's interests and strengths. \"I CUE\" also empowers parents by deepening their understanding of their child's abilities and equipping them with scientifically based techniques and strategies. By utilizing naturally occurring learning opportunities in daily routines, parents can reinforce the acquisition and development of targeted skills.",
    additionalContent: "Early intervention is crucial for addressing cognitive delays. If you notice signs that your child is struggling with problem-solving, attention, or processing skills, don't wait! Fill [COMPANY]'s developmental screening checklist or contact our professionals to learn more about your child's cognitive development.",
    whoCanBenefit: [
      "Children with cognitive delays affecting learning, problem-solving, and daily functioning",
      "Children struggling with memory, attention, and processing skills",
      "Children experiencing challenges in reasoning, organization, and adaptive thinking"
    ],
    keyFeatures: [
      "Personalized Learning Plans – Individualized interventions based on the child's unique needs",
      "Parent Coaching & Support – Strategies to apply in daily life for continuous progress",
      "Holistic Development Focus – Addressing cognitive skills alongside social, behavioral, and academic aspects",
      "Hybrid Model – A combination of online interactive sessions and onsite support",
      "Multi-Disciplinary Collaboration – Coordination with other professionals when needed",
      "Engaging, Play-Based Activities – Strengthening cognitive abilities through fun, structured learning"
    ]
  },
  {
    id: "developmental-skills",
    category: "developmental",
    title: "DEVELOPMENTAL SKILLS",
    description: "A comprehensive screening program that looks at your child's overall development, identifying strengths and areas that may benefit from additional support.",
    content: "[COMPANY]'s Developmental Skills Program (DSP) is a comprehensive program designed to provide screening of developmental skills across areas: communication, speech, and language skills, motor skills, cognitive skills, social-emotional skills, and early literacy. The program also evaluates behavioral challenges, helping identify underlying causes. The program provides strategies and techniques to address challenging behavior and support social-emotional development.",
    additionalContent: "Delays in developmental skills can impact a child's confidence, learning ability, and overall independence. The earlier targeted interventions are introduced, the smoother and more effective the progress will be! Fill [COMPANY]'s Developmental Checklist to understand your child's specific needs and connect with our professionals for personalized guidance.",
    whoCanBenefit: [
      "Children facing challenges in developing age-appropriate skills across different developmental areas",
      "Children with delays in fine motor, gross motor, social, communication, or cognitive skills",
      "Children struggling with independence in daily routines and self-help tasks",
      "Children who need structured guidance to enhance problem-solving, attention, and emotional regulation"
    ],
    keyFeatures: [
      "Personalized Development Plans – Customized strategies and guided activities done within the child's natural environment (home, daycare, school)",
      "Coaching & Support – Step-by-step guidance to help parents/educators reinforce skill-building at home, daycare, or school",
      "Hybrid Model – Available as both online and onsite sessions for flexibility and convenience",
      "Multi-Disciplinary Approach – Addressing motor, cognitive, social-emotional, and adaptive skills through expert-designed interventions",
      "Evidence-Based Techniques – Proven methods to support steady progress in a stress-free and engaging manner"
    ]
  },
  {
    id: "bon-appetit",
    category: "routine",
    title: "BON APPETIT",
    description: "An intervention feeding program that helps families transform mealtime challenges into positive experiences, from infant feeding to independent eating skills.",
    content: "Feeding your child shouldn't be stressful—it should be a time for bonding and growth! Bon Appétit is a feeding therapy program designed to help parents navigate feeding challenges at every stage. From breastfeeding and introducing solids to self-feeding with utensils. Whether your child is struggling with latching, refusing new foods, or having difficulty chewing and swallowing, our specialists provide expert guidance and evidence-based strategies to make mealtime a positive and stress-free experience.",
    additionalContent: "Feeding challenges are more than just picky eating—they can affect your child's growth, nutrition, and confidence. The earlier you address them, the easier it is to build healthy habits, reduce stress, and prevent long-term struggles around food. Don't wait until mealtimes become a daily battle. Acting early means faster progress and better outcomes for your child. Fill [COMPANY]'s Bon Appetit checklist and connect with our professionals to get personalized support today.",
    whoCanBenefit: [
      "New Moms: Struggling with breastfeeding or bottle feeding? Our specialists guide you through this bonding phase",
      "Parents of Picky Eaters: If your child refuses solids, struggles with textures, or has a limited diet, we provide strategies to expand food acceptance",
      "Growing Toddlers: Ready for self-feeding? We support food exploration, finger feeding, and transitioning to utensils and cups—without the mess!",
      "Children with Feeding Difficulties: Whether it's sensory sensitivities, oral-motor delays, or behavioral barriers, we tailor our approach to your child's needs"
    ],
    keyFeatures: [
      "Personalized feeding plans based on your child's needs",
      "Expert guidance from certified feeding specialists",
      "Strategies for breastfeeding, bottle feeding, and transitioning to solids",
      "Support for sensory, oral-motor, and behavioral feeding challenges",
      "Step-by-step coaching for self-feeding and utensil use",
      "Available through online or onsite sessions"
    ]
  },
  {
    id: "peaceful-zzzz",
    category: "routine",
    title: "PEACEFUL \"ZZZZ\"",
    description: "A gentle sleep training program that helps families establish healthy sleep habits, addressing the emotional, behavioral, and sensory factors that affect your child's rest.",
    content: "Struggling with Your Baby's Sleep? We're Here to Help! If bedtime feels like a never-ending battle or your baby's constant night wakings leave you feeling exhausted, you're not alone! Sleep is essential—not just for your little one's growth and development but also for the well-being and harmony of the whole family. That's where The Peaceful \"Zzzz\" Program at [COMPANY] comes in! Our evidence-based sleep training program is designed to help your child develop healthy sleep habits by addressing the root causes of sleep difficulties. Whether your child's sleep struggles stem from sensory sensitivities, behavioral challenges, or social-emotional readiness, we're here to guide you every step of the way. Some children need a comforting touch to fall asleep due to sensory needs, while others use bedtime stalling, crying, or attention-seeking behaviors to avoid sleeping alone. For some, nighttime fears like monsters under the bed or separation anxiety make falling asleep independently difficult. Whatever the cause, our specialists will assess your child's unique needs and provide personalized strategies to ensure a smooth and restful transition to independent sleep. We offer both online and onsite sessions, so you can choose what works best for you! A peaceful night's sleep is possible—let's make it happen together!",
    additionalContent: "Poor sleep can impact your child's mood, learning, and overall well-being. The sooner you establish healthy sleep habits, the easier the transition to restful nights will be! Fill out [COMPANY]'s Peaceful \"Zzzz\" Checklist and connect with our professionals to get personalized support today. A peaceful night's sleep is possible—let's make it happen together!",
    whoCanBenefit: [
      "Babies and toddlers struggling with frequent night wakings or short naps",
      "Children who rely on external soothing (rocking, nursing, or co-sleeping) to fall asleep",
      "Children with sensory sensitivities affecting their sleep routine",
      "Children experiencing bedtime anxiety, stalling, or resistance to sleeping alone"
    ],
    keyFeatures: [
      "Personalized Sleep Plans – Strategies tailored to your child's sleep challenges and developmental stage",
      "Parent Coaching & Support – Step-by-step guidance to implement a consistent and effective sleep routine",
      "Hybrid Model – Flexible online and onsite sessions to fit your family's needs",
      "Multi-Disciplinary Approach – Addressing sleep from sensory, emotional, and behavioral perspectives",
      "Evidence-Based Techniques – Gentle, science-backed methods to promote healthy and independent sleep habits"
    ]
  },
  {
    id: "independent-me",
    category: "routine",
    title: "INDEPENDENT ME",
    description: "An intervention program that helps children develop everyday life skills like dressing, eating, and personal care, building confidence and independence appropriate for their age.",
    content: "The Independent ME program is designed to help children master daily living skills and achieve the highest possible level of independence. It starts with a thorough assessment of key abilities—including motor, intellectual, communication, social, and behavioral skills—that are essential for daily functioning. Once any deficits that hinder routine activities are identified, the program focuses on bridging those developmental gaps. For skills that are particularly challenging to develop due to a specific diagnosis, the [COMPANY] team customizes activities and tools so every child can reach an acceptable level of independence. Additionally, the program empowers parents by enhancing their understanding of their child's abilities and coaching them on scientifically based techniques to naturally generalize newly acquired skills within daily routines.",
    additionalContent: "Early intervention is critical for fostering adaptive skills and ensuring the best outcomes for your child. If you notice your child struggling with daily routine activities, don't wait—fill [COMPANY]'s Independent ME checklist or contact our professionals to learn more about your child's adaptive skills development —prompt action can make a significant difference in your child's development.",
    whoCanBenefit: [
      "Children experiencing difficulties with daily routine activities",
      "Children experiencing developmental delays in motor, intellectual, communication, social, or behavioral skills that affect their independence in daily routines",
      "Families seeking tailored strategies to promote independent living"
    ],
    keyFeatures: [
      "Comprehensive Assessment – Evaluates all prerequisite skills for daily living",
      "Individualized Interventions – Customized activities and tools to bridge developmental gaps",
      "Adaptive Strategies – Specialized support for skills that are challenging due to specific diagnoses",
      "Parent Coaching & Support – Guidance on using evidence-based methods to generalize skills in daily routines",
      "Multi-Disciplinary Collaboration – Coordination with professionals for a holistic approach"
    ]
  },
  {
    id: "poopee-time",
    category: "routine",
    title: "POOPEE TIME",
    description: "A gentle, effective toilet training program that works with your child's developmental readiness and provides parents with practical, step-by-step guidance.",
    content: "Struggling with Toilet Training? We've Got You Covered! If you've tried toilet training your little one multiple times without success and feel like it's just not working, you're not alone! Toilet training is a developmental milestone—just like walking or talking. It requires the right timing, patience, and the right approach. That's where the PooPee Time program at [COMPANY] comes in! Our program is designed to make toilet training a stress-free and successful experience for both you and your child. Using evidence-based strategies, we assess your child's readiness across different developmental areas, including social-emotional skills and sensory needs. With the guidance of our specialists, you'll receive step-by-step support to help your child transition smoothly to independent toileting. Whether you prefer online or onsite sessions, we're here to make this journey easier for you.",
    additionalContent: "Toilet training challenges can impact a child's confidence, independence, and daily routines. The earlier the right approach is introduced, the easier the transition will be! Learn more about the skills, prerequisites, and common challenges related to toilet training by filling out [COMPANY]'s PooPee Time checklist to understand your child's specific needs and chatting with our professionals for personalized guidance. Let's make toilet training a positive and achievable milestone—together!",
    whoCanBenefit: [
      "Children struggling with toilet training despite multiple attempts",
      "Children with sensory sensitivities affecting their ability to use the toilet",
      "Children experiencing anxiety, resistance, or fear related to toileting",
      "Children with developmental delays impacting their ability to recognize and respond to toileting cues"
    ],
    keyFeatures: [
      "Personalized Training Plans – Tailored strategies based on your child's individual needs and developmental level",
      "Parent Coaching & Support – Step-by-step guidance to help parents implement effective toileting routines",
      "Hybrid Model – Available as both online and onsite sessions for flexibility and convenience",
      "Multi-Disciplinary Approach – Addressing sensory, social-emotional, and behavioral aspects of toilet training",
      "Evidence-Based Techniques – Proven methods to support a smooth and stress-free transition"
    ]
  },
  {
    id: "alphabet",
    category: "academics",
    title: "ALPHABEႵ",
    description: "An intervention online program that helps children who struggle with reading, spelling, language, and math, filling learning gaps and building essential academic skills.",
    content: "The Alphabeت Program is a comprehensive intervention designed to address academic gaps and provide targeted support for students struggling with learning disabilities. Through individualized education plans (IEPs), our program aims to improve key areas such as spelling, reading, language, comprehension, memory, and math. Our dedicated team works closely with students to identify their specific challenges through a detailed screening process and then crafts a tailored intervention plan to meet their unique needs.",
    additionalContent: "Addressing academic gaps early is crucial for long-term success. If you notice any red flags or difficulties in your child's academic development, don't wait. Complete [COMPANY]'s Academics checklist and contact our professionals to learn more about your child's needs and how we can help them succeed.",
    whoCanBenefit: [
      "Students with learning disabilities in spelling, reading, language, or math",
      "Students struggling with reading comprehension, memory, or other academic skills",
      "Students requiring support in behavioral, communication, motor, or social-emotional development",
      "Parents looking for guidance on how to support their child's learning and development"
    ],
    keyFeatures: [
      "Personalized Education Plans – Individualized interventions based on each student's specific needs",
      "Parent Involvement & Support – Empowering parents with strategies to support their child's learning at home",
      "Holistic Approach – Addressing academic, behavioral, communication, motor, and social-emotional aspects",
      "Comprehensive Screening – Identifying strengths and weaknesses early for more effective intervention",
      "Ongoing Support & Guidance – Continuous monitoring and adjustments to ensure progress",
      "Collaboration with Professionals – Coordination with other specialists to provide comprehensive support"
    ]
  },
  {
    id: "well-be-ing",
    category: "counseling",
    title: "WELL-BE-ING",
    description: "An intervention program that helps children, teens, and parents develop emotional skills, build stronger relationships, and navigate life's challenges with confidence.",
    content: "[COMPANY]'s Well-Be-ing program provides social and emotional support, guidance, and counseling for children, teenagers, and parents. The main purpose is to acquire the fundamental skills necessary to recognize and manage one's emotions, set and achieve goals, build and sustain strong interpersonal relationships, make ethical judgments, and interact with others in a productive way. Through proper development of social and emotional skills, individuals are less likely to experience internal struggles such as anxiety and depression. The Well-Be-ing program focuses on the development of self-awareness, social-awareness, relationship skills and decision making skills. Acquiring these skills help in setting the foundations for building positive social and emotional experiences. Having a strong foundation facilitates healthy growth among all other developmental areas. The sooner an individual acquires healthy social-emotional skills, the better is their general health and well-being. The professionals at [COMPANY] offer a unique outlet for parents and their children to strengthen their emotional bonds by providing evidence-based strategies that will enhance parental sensitivity to emotional and behavioral cues in order to improve a child's attachment security. Through Well-Be-ing we assess and strengthen the caregiver's capacity to provide safety through child development training, parenting skills coaching, and healthy coping strategies, which will result in corrective emotional experiences for caregivers, or address a caregiver's own attachment issues from childhood.",
    additionalContent: "Social and emotional well-being is crucial to an individual's overall health, and it's never too early to start building these foundational skills. The sooner children, teenagers, and parents access support, the greater the potential to prevent future emotional struggles such as anxiety, depression, and relationship challenges. Fill [COMPANY]'s Well-Be-ing checklist to understand your child's specific needs and connect with our professionals for personalized support.",
    whoCanBenefit: [
      "Children & Teenagers – To build emotional resilience, manage emotions, and develop healthy relationships",
      "Parents & Caregivers – To strengthen emotional bonds, improve parenting skills, and support child development",
      "Families – To enhance communication and create a supportive home environment",
      "Individuals with Emotional Challenges – To learn coping strategies for anxiety, stress, and emotional struggles"
    ],
    keyFeatures: [
      "Social and emotional support for children, teenagers, and parents",
      "Evidence-based counseling and guidance",
      "Development of emotional intelligence and self-regulation skills",
      "Focus on self-awareness, social awareness, relationship skills, and decision-making",
      "Techniques to manage stress, anxiety, and depression",
      "Coaching on effective parenting strategies and healthy coping mechanisms",
      "Individualized support to address caregiver attachment issues",
      "Holistic approach to fostering overall well-being"
    ]
  },
  {
    id: "aba-home",
    category: "aba",
    title: "ABA HOME/COMMUNITY PROVISION",
    description: "Comprehensive behavior support program for home settings that uses proven techniques to help children develop positive behaviors and important life skills.",
    content: "[COMPANY]'s Intensive ABA Home/Community Provision Program offers structured, evidence-based support to promote meaningful behavioral change in home and community settings. Led by a Board Certified Behavior Analyst (BCBA), the program begins with an environmental observation by our lead ABA therapist, who evaluates current practices and models effective intervention strategies. Behavior technicians implement structured instructional procedures and systematic data collection to ensure measurable progress. Through regular supervision, caregiver training, and reinforcement systems, we foster skill development, social engagement, and successful transitions across settings. Our comprehensive approach empowers families and intervention teams with the tools needed to create lasting, positive change.",
    additionalContent: "Early Intervention Leads to Better Outcomes – Research shows that earlier ABA intervention results in greater skill development and long-term success. Prevents Problem Behaviors from Escalating – Addressing behavioral challenges now reduces the likelihood of them becoming more ingrained and harder to change. Contact us today to learn more about available packages.",
    whoCanBenefit: [
      "Children and adolescents with autism spectrum disorder (ASD) or other developmental disabilities who need structured behavioral support in home and community settings",
      "Families seeking professional guidance on managing challenging behaviors and promoting skill development at home",
      "Parents and caregivers who want hands-on training and coaching to implement effective intervention strategies",
      "Children transitioning from intensive therapy settings to more natural environments who require continued support for generalization",
      "Individuals who struggle with social engagement and adaptive skills in community settings"
    ],
    keyFeatures: [
      "Evidence-Based Approach – Utilizes Applied Behavior Analysis (ABA) principles to promote meaningful and lasting behavioral change",
      "BCBA-Led Supervision – Overseen by a Board Certified Behavior Analyst (BCBA) to ensure high-quality intervention and progress monitoring",
      "Environmental Observation & Assessment – Lead ABA therapist evaluates current practices and models effective strategies tailored to the individual's needs",
      "Structured Instructional Procedures – Behavior technicians implement systematic, research-backed interventions for skill development",
      "Data-Driven Decision Making – Ongoing data collection and analysis to track progress and make necessary adjustments",
      "Caregiver Training & Coaching – Equips parents and caregivers with the skills to implement and maintain effective interventions",
      "Reinforcement Systems – Uses positive reinforcement to encourage skill acquisition and behavior improvement",
      "Social & Adaptive Skill Development – Focuses on fostering social engagement, communication, and independent living skills"
    ]
  },
  {
    id: "aba-school",
    category: "aba",
    title: "ABA SCHOOL PROVISION",
    description: "Comprehensive behavior support program for schools that uses proven techniques to help children develop positive behaviors and important life skills in educational settings.",
    content: "[COMPANY]'s Intensive ABA School Provision Program offers comprehensive, evidence-based support to educational settings, ensuring effective behavioral intervention and skill development. Beginning with an environmental observation by our lead ABA therapist, the program establishes a baseline for improvement and demonstrates effective teaching methodologies. Our Board Certified Behavior Analyst (BCBA) ensures program integrity through regular observations, feedback, and training for school staff. With a focus on social skills instruction, facilitator development, reinforcement systems, and data-driven progress monitoring, we equip educators with the tools to foster positive, lasting behavioral change. Through ongoing mentorship and behavior-based safety protocols, [COMPANY] empowers schools to create supportive and structured learning environments.",
    additionalContent: "Prevents Behavioral Challenges from Escalating – Addressing issues early reduces disruptions and helps students stay on track academically and socially. Maximizes Learning Potential – Early intervention ensures that students receive the support they need to develop critical skills before gaps widen. Contact us today to learn more about available packages.",
    whoCanBenefit: [
      "Students with Autism or Developmental Disabilities – Those who need structured behavioral support to succeed in a school setting",
      "Teachers and Educators – Professionals seeking effective classroom management strategies and evidence-based teaching techniques",
      "Special Education Departments – Schools aiming to enhance their ability to support students with diverse learning and behavioral needs",
      "School Administrators – Leaders looking to implement behavior-based safety protocols and create a more inclusive, structured learning environment",
      "Paraprofessionals and Classroom Aides – Staff members who benefit from hands-on training and supervision to support students effectively"
    ],
    keyFeatures: [
      "Evidence-Based ABA Interventions – Utilizes proven Applied Behavior Analysis (ABA) strategies to support student success",
      "BCBA-Led Supervision – Regular oversight by a Board Certified Behavior Analyst (BCBA) ensures program integrity and effectiveness",
      "Environmental Observation & Assessment – Lead therapist evaluates current classroom dynamics and models effective teaching methodologies",
      "Behavior-Based Safety Protocols – Implements structured strategies to promote a safe and supportive learning environment",
      "Social Skills Instruction – Focuses on developing communication, peer interaction, and adaptive behavior skills",
      "Educator Training & Mentorship – Provides teachers, paraprofessionals, and staff with hands-on training in behavior management and reinforcement techniques",
      "Data-Driven Progress Monitoring – Systematic data collection to track behavioral improvements and adjust interventions as needed",
      "Reinforcement Systems – Encourages positive behavior through individualized motivation strategies"
    ]
  },
  // More programs will be added in subsequent edits
];

export default function ProgramsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("developmental");

  // Filter programs by active category
  const filteredPrograms = programsData.filter(program => program.category === activeCategory);

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
              Our Intervention Programs
            </h1>
            <div className="w-24 h-1 bg-[#4b2e83] mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Intervention programs designed to help your child grow, learn, and thrive. Each program focuses on different developmental areas, providing personalized guidance for both children and parents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex justify-center space-x-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeCategory === category.id 
                  ? "bg-[#4b2e83] text-white" 
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Programs grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                expandedId === program.id 
                  ? "md:col-span-3 shadow-lg" 
                  : "hover:shadow-md h-full flex flex-col"
              }`}
            >
              {expandedId === program.id ? (
                // Expanded view
                <div className="max-w-6xl mx-auto w-full">
                  {/* Header with back button */}
                  <div className="flex items-center gap-4 mb-8 p-6">
                    <Button
                      onClick={() => setExpandedId(null)}
                      variant="ghost"
                      className="p-2 hover:bg-[#F4F1F9] rounded-full flex-shrink-0"
                    >
                      <ArrowLeftIcon className="w-6 h-6 text-onesti-purple" />
                    </Button>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-onesti-purple">
                        {program.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {program.description}
                      </p>
                    </div>
                  </div>

                  {/* Main content in two columns on larger screens */}
                  <div className="grid md:grid-cols-3 gap-8 p-6">
                    {/* Main content column */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="prose max-w-none">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                          <p className="text-gray-700 leading-relaxed">
                            {program.content}
                          </p>
                          {program.additionalContent && (
                            <div className="mt-6 p-4 bg-[#F4F1F9] rounded-lg border-l-4 border-onesti-purple">
                              <h4 className="font-semibold text-onesti-purple mb-2">Why Act Now?</h4>
                              <p className="text-gray-700">
                                {program.additionalContent}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons in a grid */}
                      <div className="space-y-4 mt-8">
                        <Link href="/learning" className="block">
                          <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium">
                            Visit Learning Section
                          </Button>
                        </Link>
                        
                        {/* Conditional buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {["alphabet", "speak", "reach-up", "i-cue", "well-be-ing", "routine"].includes(program.id) && (
                            <Link href="/developmental-screening" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                Developmental Screening Checklist
                              </Button>
                            </Link>
                          )}
                          {program.id === "senses-in-harmony" && (
                            <Link href="/contact" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                Contact Our Professionals
                              </Button>
                            </Link>
                          )}
                          {program.id === "independent-me" && (
                            <Link href="/independent-me-checklist" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                Independent ME Checklist
                              </Button>
                            </Link>
                          )}
                          {program.id === "poopee-time" && (
                            <Link href="/poopee-time-checklist" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                PooPee Time Checklist
                              </Button>
                            </Link>
                          )}
                          {program.id === "bon-appetit" && (
                            <Link href="/bon-appetit-checklist" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                Bon Appetit Checklist
                              </Button>
                            </Link>
                          )}
                          {program.id === "peaceful-zzzz" && (
                            <Link href="/sleeping-checklist" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                Sleeping Checklist
                              </Button>
                            </Link>
                          )}
                          {program.id === "developmental-skills" && (
                            <Link href="/contact" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                Contact For Screening
                              </Button>
                            </Link>
                          )}
                          {program.id === "aba-program" && (
                            <Link href="/contact" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                Learn More About ABA
                              </Button>
                            </Link>
                          )}
                          {program.id === "aba" && (
                            <Link href="/contact" className="sm:col-span-2">
                              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium shadow-sm">
                                Contact ABA Specialists
                              </Button>
                            </Link>
                          )}
                        </div>

                        <Link href={`/packages#${program.id}`} className="block mt-4">
                          <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90 py-5 font-medium">
                            View Related Packages
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Sidebar with program details */}
                    <div className="space-y-6">
                      {/* Who Can Benefit */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F4F1F9]">
                        <h4 className="font-semibold text-onesti-purple text-lg mb-4">
                          Who Can Benefit
                        </h4>
                        <ul className="space-y-3">
                          {program.whoCanBenefit ? program.whoCanBenefit.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          )) : (
                            <>
                          <li className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">Children with developmental delays or concerns</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">Children who need support in specific skill areas</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">Children of various ages and ability levels</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">Families seeking structured intervention approaches</span>
                          </li>
                            </>
                          )}
                        </ul>
                      </div>

                      {/* Program Features */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F4F1F9]">
                        <h4 className="font-semibold text-onesti-purple text-lg mb-4">
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {program.keyFeatures ? program.keyFeatures.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          )) : (
                            <>
                          <li className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">Individualized assessment and planning</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">Evidence-based techniques and strategies</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">Regular progress monitoring</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-onesti-purple mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700">Parent and caregiver involvement</span>
                          </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Collapsed card view
                <>
                  {/* Circle image - increasing size from w-20/h-20 to w-32/h-32 and adjusting inner circles proportionally */}
                  <div className="w-32 h-32 mx-auto mt-8 mb-6">
                    <div className="w-full h-full rounded-full bg-[#F4F1F9] flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-[#E9E4F5] flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-onesti-purple opacity-70" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-onesti-purple mb-3">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      {program.description}
                    </p>
                    
                    <Button
                      onClick={() => setExpandedId(program.id)}
                      className="mt-auto w-full bg-onesti-purple hover:bg-onesti-purple/90"
                    >
                      Expand
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F4F1F9] py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-onesti-purple mb-4">How Can We Support Your Child?</h2>
          <p className="max-w-2xl mx-auto text-gray-700 mb-8">
            Every child has unique needs and abilities. Our caring specialists will help you find the right program to support your child's development and your family's journey. Let's take the first step together.
          </p>
          <Link href="/contact">
            <Button className="bg-onesti-purple hover:bg-onesti-purple/90 px-8 py-3">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 