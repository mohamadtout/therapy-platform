"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, ClipboardList, X, BookOpen, Brain, HeartHandshake, Baby } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

// Available packages from the packages page
const availablePackages = [
  {
    id: "developmental-thrive",
    name: "Developmental Thrive Path",
    description: "Comprehensive support for developmental delays or challenges",
    url: "/packages", // Updated URL
  },
  {
    id: "developmental-empower",
    name: "Developmental Empower Path",
    description: "Balanced support for developmental needs",
    url: "/packages", // Updated URL
  },
  {
    id: "developmental-nurture",
    name: "Developmental Nurture Path",
    description: "Essential support for developmental needs",
    url: "/packages", // Updated URL
  },
  {
    id: "routine-thrive",
    name: "Routine Thrive Path",
    description: "Comprehensive support for routine-based challenges",
    url: "/packages", // Updated URL
  },
]

// Developmental screening disclaimer text
const developmentalScreeningDisclaimer = "This friendly screening helps you identify potential areas where your child might benefit from extra support. For each statement, select YES if you've observed this behavior regularly, or NO if you haven't seen it or only notice it sometimes. Your honest observations will help us provide the most helpful guidance.";

// Map screening categories to recommended packages
const assessmentPackageMap = {
  behavior: "developmental-thrive",
  developmental: "developmental-thrive",
  potty: "routine-thrive",
  independence: "developmental-empower",
  eating: "routine-thrive",
  sleep: "routine-thrive",
  academic: "developmental-empower",
}

// Update the screening categories to match the provided document and organize into sets
const assessmentCategories = [
  {
    id: "developmental-set",
    name: "Developmental Set",
    screenings: [
      {
        id: "developmental",
        name: "Developmental Checklist",
        description: "Comprehensive assessment of your child's developmental milestones",
        icon: ClipboardList,
        questions: 10,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_205813503%20%281%29-UVsF6XesYkeD2WFFUx5oJhkgSjhsjN.jpeg",
      },
    ],
  },
  {
    id: "routine-set",
    name: "Routine Checklist",
    screenings: [
      {
        id: "behavior",
        name: "Brave to Behave",
        description: "Evaluates behavioral patterns, challenges, and potential interventions",
        icon: ClipboardList,
        questions: 10,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_205813503%20%281%29-UVsF6XesYkeD2WFFUx5oJhkgSjhsjN.jpeg",
      },
      {
        id: "potty",
        name: "PooPee Time Checklist",
        description: "Evaluates potty training readiness and progress",
        icon: ClipboardList,
        questions: 10,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_205813503%20%281%29-UVsF6XesYkeD2WFFUx5oJhkgSjhsjN.jpeg",
      },
      {
        id: "independence",
        name: "Independent Me",
        description: "Assesses self-help skills and independence development",
        icon: ClipboardList,
        questions: 10,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_205813503%20%281%29-UVsF6XesYkeD2WFFUx5oJhkgSjhsjN.jpeg",
      },
      {
        id: "eating",
        name: "Bon Appetite",
        description: "Evaluates eating habits, nutrition, and feeding challenges",
        icon: ClipboardList,
        questions: 10,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_205813503%20%281%29-UVsF6XesYkeD2WFFUx5oJhkgSjhsjN.jpeg",
      },
      {
        id: "sleep",
        name: "Peaceful ZZ",
        description: "Assesses sleep patterns, routines, and potential sleep issues",
        icon: ClipboardList,
        questions: 10,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_205813503%20%281%29-UVsF6XesYkeD2WFFUx5oJhkgSjhsjN.jpeg",
      },
      {
        id: "academic",
        name: "Academic",
        description: "Evaluates school readiness and academic skills",
        icon: ClipboardList,
        questions: 10,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_205813503%20%281%29-UVsF6XesYkeD2WFFUx5oJhkgSjhsjN.jpeg",
      },
    ],
  },
]

// Updated screening questions based on the provided CSV files
const assessmentQuestions = {
  potty: [
    {
      id: 1,
      code: "PPSEN26",
      text: "Does your child show difficulty coordinating movement or sitting still because they want to be moving?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 2,
      code: "PPSEN27",
      text: "Does your child have difficulty with potty training?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 3,
      code: "PPSEN28",
      text: "Does your child show resistance to using the toilet?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      code: "PPSEN29",
      text: "Does your child have accidents even after being potty trained?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      code: "PPSEN30",
      text: "Does your child show anxiety about using public restrooms?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 6,
      code: "PPSEN31",
      text: "Does your child have difficulty recognizing when they need to use the bathroom?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 7,
      code: "PPSEN32",
      text: "Does your child refuse to have bowel movements in the toilet?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 8,
      code: "PPSEN33",
      text: "Does your child show discomfort with the sensation of sitting on the toilet?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 9,
      code: "PPSEN34",
      text: "Does your child need a specific routine to use the bathroom?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      code: "PPSEN35",
      text: "Does your child have difficulty staying dry through the night?",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],
  independence: [
    {
      id: 1,
      text: "Does your child attempt to dress themselves?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 2,
      text: "Can your child put on simple clothing items independently?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 3,
      text: "Does your child try to feed themselves with utensils?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      text: "Can your child wash their hands independently?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      text: "Does your child help with simple household tasks when asked?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 6,
      text: "Can your child follow 2-3 step instructions?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 7,
      text: "Does your child attempt to solve problems before asking for help?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 8,
      text: "Can your child make simple choices when given options?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 9,
      text: "Does your child show interest in doing things for themselves?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      text: "Can your child put away their toys or belongings when asked?",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],
  sleep: [
    {
      id: 1,
      code: "ZZSEN29",
      text: "Does your child need to be rocked to sleep or rhythmic tapping?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 2,
      code: "ZZSEN30",
      text: "Does your child have difficulty falling asleep?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 3,
      code: "ZZSEN31",
      text: "Does your child wake up frequently during the night?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      code: "ZZSEN32",
      text: "Does your child have difficulty staying asleep?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      code: "ZZSEN33",
      text: "Does your child resist going to bed at night?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 6,
      code: "ZZSEN34",
      text: "Does your child need a specific sleep environment (certain light, sound, etc.)?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 7,
      code: "ZZSEN35",
      text: "Does your child have nightmares or night terrors?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 8,
      code: "ZZSEN36",
      text: "Does your child wake up tired even after a full night's sleep?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 9,
      code: "ZZSEN37",
      text: "Does your child need a specific bedtime routine?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      code: "ZZSEN38",
      text: "Does your child show difficulty transitioning from activity to sleep time?",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],
  eating: [
    {
      id: 1,
      text: "Does your child refuse to eat certain food textures?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 2,
      text: "Does your child have a limited food repertoire (eats only specific foods)?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 3,
      text: "Does your child gag or vomit when presented with certain foods?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      text: "Does your child have difficulty transitioning to solid foods?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      text: "Does your child refuse to try new foods?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 6,
      text: "Does your child have difficulty sitting through a meal?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 7,
      text: "Does your child eat too quickly or too slowly?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 8,
      text: "Does your child have difficulty using utensils appropriate for their age?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 9,
      text: "Does your child show sensory aversions to food (smell, appearance, etc.)?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      text: "Does your child have difficulty chewing or swallowing?",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],
  academic: [
    {
      id: 1,
      text: "Does your child have difficulty recognizing letters?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 2,
      text: "Does your child struggle with counting or number recognition?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 3,
      text: "Does your child have difficulty following classroom instructions?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      text: "Can your child solve one-step problems?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      text: "Does your child have difficulty with fine motor skills (writing, drawing)?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 6,
      text: "Does your child have trouble focusing on academic tasks?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 7,
      text: "Does your child struggle with remembering information?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 8,
      text: "Does your child have difficulty with reading comprehension?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 9,
      text: "Does your child show frustration when faced with academic challenges?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      text: "Does your child need extra time to complete academic tasks?",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],
  behavior: [
    {
      id: 1,
      code: "BEHAV44",
      text: "Does your child engage in self-injurious behaviors like scratching?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 2,
      code: "BEHAV45",
      text: "Does your child have difficulty expressing what they want?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 3,
      code: "BEHAV46",
      text: "Does your child have tantrums when told 'no'?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      code: "BEHAV47",
      text: "Does your child show challenging behavior during transitions?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      code: "BEHAV48",
      text: "Does your child have difficulty waiting their turn?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 6,
      code: "BEHAV49",
      text: "Does your child show aggression toward others?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 7,
      code: "BEHAV50",
      text: "Does your child have difficulty following rules?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 8,
      code: "BEHAV51",
      text: "Does your child engage in repetitive behaviors?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 9,
      code: "BEHAV52",
      text: "Does your child have difficulty with changes in routine?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      code: "BEHAV53",
      text: "Does your child's behavior cause significant stress at home?",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],
  developmental: [
    {
      id: 1,
      text: "Does your child have difficulty with age-appropriate motor skills?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 2,
      text: "Does your child have delayed speech or language development?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 3,
      text: "Does your child have difficulty with social interactions?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      text: "Does your child have difficulty with eye contact?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      text: "Does your child have difficulty with imaginative play?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 6,
      text: "Does your child have difficulty with self-care skills?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 7,
      text: "Does your child have difficulty with attention and focus?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 8,
      text: "Does your child have difficulty with coordination?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 9,
      text: "Does your child have difficulty with problem-solving?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      text: "Does your child have difficulty with emotional regulation?",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],
}

// Validation Message Component
const ValidationMessage = ({ onComplete }: { onComplete: () => void }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center space-y-6">
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#f4f1f9]">
          <CheckCircle className="h-8 w-8 text-[#4b2e83]" />
        </div>
        <h2 className="text-2xl font-bold text-[#4b2e83]">Thank You!</h2>
        <p className="text-gray-600">
          We're processing your responses to provide helpful insights about your child's development.
        </p>
        <div className="mt-4">
          <div className="h-2 w-full bg-[#e9e4f5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4b2e83] transition-all duration-1000 ease-in-out"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Preparing your results in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  );
};

// Results Popup Component
const ResultsPopup = ({
  selectedCategory,
  onClose,
  onStartOver,
}: {
  selectedCategory: string
  onClose: () => void
  onStartOver: () => void
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-hidden">
        <div className="bg-[#4b2e83] py-5 px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Screening Complete</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Thank You For Completing The Screening</h3>
              <p className="text-sm text-gray-500">
                You've taken an important step in supporting your child's development
              </p>
            </div>
          </div>
          
          <div className="rounded-lg bg-[#f4f1f9] p-4 border border-[#e9e4f5]">
            <h3 className="font-medium text-[#4b2e83] mb-2">What's Next?</h3>
            <p className="text-sm">
              Your responses have been processed and we've prepared personalized insights based on your input. 
              These insights can help guide your understanding of your child's development and provide direction 
              for next steps.
            </p>
          </div>
        </div>
        
        <div className="bg-[#f9f8fc] p-6 border-t border-[#e9e4f5] flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            variant="outline"
            className="border-[#4b2e83] text-[#4b2e83]"
            onClick={onStartOver}
          >
            Take Another Screening
          </Button>
          <Button
            className="bg-[#4b2e83] hover:bg-[#4b2e83]/90"
            onClick={onClose}
          >
            View My Results
          </Button>
        </div>
      </div>
    </div>
  );
};

// Question component to render different question types
const QuestionComponent = ({ question, onAnswer, answer }: any) => {
  if (question.type === "radio") {
    return (
      <RadioGroup
        value={answer}
        onValueChange={(value) => onAnswer(question.id, value)}
        className="space-y-3"
      >
        {question.options.map((option: string) => (
          <div
            key={option}
            className={`flex items-center space-x-3 rounded-lg border p-4 transition-all cursor-pointer ${
              answer === option 
                ? "border-[#4b2e83] bg-[#f4f1f9]" 
                : "hover:border-[#4b2e83]/30 hover:bg-[#f9f8fc]"
            }`}
            onClick={() => onAnswer(question.id, option)}
          >
            <RadioGroupItem
              value={option}
              id={`${question.id}-${option}`}
              className="border-[#4b2e83] text-[#4b2e83]"
            />
            <Label
              htmlFor={`${question.id}-${option}`}
              className={`w-full cursor-pointer font-medium ${answer === option ? "text-[#4b2e83]" : ""}`}
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  if (question.type === "textarea") {
    return (
      <div className="space-y-2">
        <Label htmlFor={`question-${question.id}`} className="text-sm text-muted-foreground">
          Share your observations
        </Label>
        <Textarea
          id={`question-${question.id}`}
          value={answer || ""}
          onChange={(e) => onAnswer(question.id, e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[100px] border-[#e9e4f5] focus-visible:ring-[#4b2e83]"
        />
      </div>
    )
  }

  if (question.type === "slider") {
    const value = answer ? [parseInt(answer)] : [3]
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Not at all</span>
            <span>Moderate</span>
            <span>Very much</span>
          </div>
          <Slider
            value={value}
            min={1}
            max={5}
            step={1}
            onValueChange={(value) => onAnswer(question.id, value[0].toString())}
            className="py-4"
          />
        </div>
        <div className="flex justify-between pt-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              type="button"
              variant={value[0] === num ? "default" : "outline"}
              size="sm"
              className={`h-8 w-8 p-0 rounded-full ${
                value[0] === num 
                  ? "bg-[#4b2e83] text-white" 
                  : "border-[#e9e4f5] text-muted-foreground hover:bg-[#f4f1f9] hover:text-[#4b2e83] hover:border-[#4b2e83]"
              }`}
              onClick={() => onAnswer(question.id, num.toString())}
            >
              {num}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default function AssessmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isValidating, setIsValidating] = useState(false)
  const [showResultsPopup, setShowResultsPopup] = useState(false)
  const [activeTab, setActiveTab] = useState("developmental-set")

  // Get the current question set based on the selected category
  const getCurrentQuestions = () => {
    if (selectedCategory && assessmentQuestions[selectedCategory as keyof typeof assessmentQuestions]) {
      return assessmentQuestions[selectedCategory as keyof typeof assessmentQuestions]
    }
    return []
  }

  const currentQuestions = getCurrentQuestions()

  // Update the handleCategorySelect function to work with the new structure
  const handleCategorySelect = (categoryId: string) => {
    // Find the screening from either set
    let selectedScreening = null
    for (const set of assessmentCategories) {
      const screening = set.screenings.find((s) => s.id === categoryId)
      if (screening) {
        selectedScreening = screening
        break
      }
    }

    if (selectedScreening) {
      setSelectedCategory(categoryId)
      setCurrentStep(1)
      setShowResults(false)
      setAnswers({})
      setShowResultsPopup(false)
    }
  }

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  // Update the handleNext function
  const handleNext = () => {
    if (currentStep < currentQuestions.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Show validation message before results
      setIsValidating(true)
    }
  }

  // Add validation complete handler
  const handleValidationComplete = () => {
    setIsValidating(false)
    setShowResultsPopup(true) // Show results popup instead of setting showResults
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStartOver = () => {
    setSelectedCategory(null)
    setCurrentStep(1)
    setShowResults(false)
    setShowResultsPopup(false)
    setAnswers({})
  }

  const handleCloseResultsPopup = () => {
    setShowResultsPopup(false)
    setShowResults(true)
  }

  const progress = selectedCategory ? Math.round((currentStep / currentQuestions.length) * 100) : 0

  // Check if the current question has been answered
  const isCurrentQuestionAnswered = () => {
    if (!currentQuestions || currentQuestions.length === 0) return false

    const currentQuestion = currentQuestions[currentStep - 1]
    if (!currentQuestion) return false

    const answer = answers[currentQuestion.id]

    // For text inputs, require at least some text
    if (currentQuestion.type === "textarea") {
      return !!answer && answer.trim().length > 0
    }

    // For other types, just check if there's an answer
    return !!answer
  }

  // Get the recommended package for the selected category
  const getRecommendedPackage = () => {
    if (!selectedCategory) return availablePackages[0]

    const packageId = assessmentPackageMap[selectedCategory as keyof typeof assessmentPackageMap]
    return availablePackages.find((pkg) => pkg.id === packageId) || availablePackages[0]
  }

  const recommendedPackage = getRecommendedPackage()

  // Get icons for tabs
  const getTabIcon = (tabId: string) => {
    switch (tabId) {
      case "developmental-set":
        return <Brain className="h-5 w-5" />
      case "routine-set":
        return <Baby className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Developmental Screenings</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Quick, easy assessments to help you understand your child's development and get personalized guidance
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-7xl">
          {!selectedCategory && !showResults && (
            <div className="space-y-8">
              <div className="rounded-lg bg-muted p-6 border border-[#e9e4f5]">
                <h2 className="text-xl font-semibold text-[#4b2e83]">How These Screenings Help Your Family</h2>
                <ol className="mt-4 space-y-4">
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white">
                      1
                    </span>
                    <div>
                      <p className="font-medium">Choose a screening that matches your concerns</p>
                      <p className="text-sm text-muted-foreground">Each screening focuses on different aspects of your child's development</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white">
                      2
                    </span>
                    <div>
                      <p className="font-medium">Answer simple yes/no questions about your observations</p>
                      <p className="text-sm text-muted-foreground">
                        Share what you've noticed about your child's everyday activities and behaviors
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white">
                      3
                    </span>
                    <div>
                      <p className="font-medium">Receive helpful insights and next steps</p>
                      <p className="text-sm text-muted-foreground">
                        Get personalized guidance based on your responses to support your child's growth
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <h2 className="text-xl font-semibold text-[#4b2e83] mb-6">Select a Screening That's Right for Your Child</h2>
              
              {/* Tabs component for assessment categories */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-8 bg-white border-b border-[#e9e4f5] p-0 h-auto flex justify-center">
                  {assessmentCategories.map((set) => (
                    <TabsTrigger 
                      key={set.id} 
                      value={set.id}
                      className="flex items-center gap-2 px-6 py-3 data-[state=active]:text-[#4b2e83] data-[state=active]:border-b-2 data-[state=active]:border-[#4b2e83] data-[state=active]:bg-transparent"
                    >
                      {getTabIcon(set.id)}
                      {set.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {assessmentCategories.map((set) => (
                  <TabsContent key={set.id} value={set.id} className="mt-6 animate-in fade-in-50">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {set.screenings.map((screening) => (
                        <motion.div
                          key={screening.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card
                            className="cursor-pointer transition-all hover:shadow-md hover:border-[#4b2e83]/30 overflow-hidden group h-full"
                            onClick={() => handleCategorySelect(screening.id)}
                          >
                            <div className="relative h-48 w-full overflow-hidden">
                              <Image
                                src={screening.image || "/placeholder.svg"}
                                alt={screening.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                            <CardHeader>
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4b2e83]/10">
                                  <screening.icon className="h-5 w-5 text-[#4b2e83]" />
                                </div>
                                <CardTitle>{screening.name}</CardTitle>
                              </div>
                              <CardDescription className="mt-2">{screening.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                              <div className="flex w-full items-center justify-between">
                                <span className="text-sm text-muted-foreground">{screening.questions} quick questions</span>
                                <Button size="sm" className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 transition-all">
                                  Begin Screening
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {selectedCategory && !showResults && !isValidating && !showResultsPopup && (
            <div className="mx-auto max-w-xl">
              <Button
                variant="ghost"
                className="mb-4 text-[#4b2e83] hover:text-[#4b2e83]/80 hover:bg-[#4b2e83]/10"
                onClick={handleStartOver}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Screening Categories
              </Button>

              {selectedCategory === "developmental" && currentStep === 1 && (
                <div className="mb-6 p-4 bg-[#f4f1f9] border border-[#e9e4f5] rounded-lg">
                  <p className="text-sm text-[#4b2e83]">{developmentalScreeningDisclaimer}</p>
                </div>
              )}

              <Card className="border border-[#e9e4f5] shadow-sm">
                <CardHeader className="bg-[#f9f8fc] border-b border-[#e9e4f5]">
                  <CardTitle className="text-[#4b2e83]">
                    {assessmentCategories
                      .flatMap((set) => set.screenings)
                      .find((s) => s.id === selectedCategory)?.name || "Screening"}
                  </CardTitle>
                  <CardDescription>
                    Question {currentStep} of {currentQuestions.length}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {currentQuestions.length > 0 && currentStep <= currentQuestions.length && (
                    <div className="space-y-6">
                      <p className="text-base leading-7 font-medium">{currentQuestions[currentStep - 1].text}</p>
                      <QuestionComponent
                        question={currentQuestions[currentStep - 1]}
                        onAnswer={handleAnswer}
                        answer={answers[currentQuestions[currentStep - 1].id]}
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t border-[#e9e4f5] bg-[#f9f8fc] pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="border-[#4b2e83] text-[#4b2e83]"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!isCurrentQuestionAnswered()}
                    className="bg-[#4b2e83] hover:bg-[#4b2e83]/90"
                  >
                    {currentStep === currentQuestions.length ? "Complete Screening" : "Next Question"}
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-6">
                <div className="flex justify-between text-sm text-[#4b2e83] mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-[#e9e4f5]" />
              </div>
            </div>
          )}

          {isValidating && <ValidationMessage onComplete={handleValidationComplete} />}

          {showResultsPopup && selectedCategory && (
            <ResultsPopup
              selectedCategory={selectedCategory}
              onClose={handleCloseResultsPopup}
              onStartOver={handleStartOver}
            />
          )}

          {showResults && (
            <div className="space-y-8">
              <Card className="border border-[#e9e4f5] shadow-sm overflow-hidden">
                <div className="bg-[#4b2e83] py-5 px-6 text-white">
                  <h2 className="text-xl font-semibold">Your Child's Screening Results</h2>
                  <p className="text-white/80 mt-1 text-sm">
                    Based on your responses to the{" "}
                    {
                      assessmentCategories
                        .find((c) => c.screenings.find((s) => s.id === selectedCategory))
                        ?.screenings.find((s) => s.id === selectedCategory)?.name
                    }{" "}
                    screening
                  </p>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Show different results based on the screening category */}
                    {selectedCategory === "behavior" && (
                      <div className="rounded-lg bg-[#f4f1f9] p-4 border border-[#e9e4f5]">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full bg-[#4b2e83]/10 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-[#4b2e83]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#4b2e83]">Behavior Support May Help Your Child</h3>
                            <p className="mt-1 text-sm">
                              Your responses suggest your child might benefit from our Brave to Behave program. This 
                              supportive approach helps children develop emotional regulation skills and positive behaviors
                              through child-friendly activities and parent guidance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedCategory === "potty" && (
                      <div className="rounded-lg bg-[#f4f1f9] p-4 border border-[#e9e4f5]">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full bg-[#4b2e83]/10 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-[#4b2e83]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#4b2e83]">Potty Training Support May Help Your Child</h3>
                            <p className="mt-1 text-sm">
                              Your responses suggest your child might benefit from our PooPee Time program. This 
                              supportive approach provides gentle, effective strategies for successful toilet training
                              based on your child's unique developmental readiness.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedCategory !== "behavior" && selectedCategory !== "potty" && (
                      <div className="rounded-lg bg-[#f4f1f9] p-4 border border-[#e9e4f5]">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full bg-[#4b2e83]/10 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-[#4b2e83]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#4b2e83]">Developmental Support May Benefit Your Child</h3>
                            <p className="mt-1 text-sm">
                              Your responses suggest your child might benefit from some additional support in certain areas.
                              This doesn't necessarily indicate a concern, but providing some targeted assistance now
                              could help your child build important skills and confidence.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8">
                      <h3 className="font-medium text-[#4b2e83] mb-4">Your Child's Profile</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-[#e9e4f5] p-4 bg-[#f9f8fc]">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full bg-[#4b2e83]/10 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-[#4b2e83]">Your Child's Strengths</p>
                              <p className="text-sm mt-2">
                                {selectedCategory === "behavior"
                                  ? "Your child shows good response to structure and routine."
                                  : selectedCategory === "potty"
                                    ? "Your child shows interest in the bathroom and toilet."
                                    : selectedCategory === "independence"
                                      ? "Your child shows initiative in self-help skills."
                                      : selectedCategory === "eating"
                                        ? "Your child has a good appetite for certain foods."
                                        : selectedCategory === "sleep"
                                          ? "Your child has a consistent bedtime routine."
                                          : selectedCategory === "academic"
                                            ? "Your child shows interest in learning activities."
                                            : "Your child shows age-appropriate developmental skills in several areas."}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border border-[#e9e4f5] p-4 bg-[#f9f8fc]">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full bg-[#4b2e83]/10 flex items-center justify-center">
                              <AlertCircle className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                              <p className="font-medium text-[#4b2e83]">Areas for Growth</p>
                              <p className="text-sm mt-2">
                                {selectedCategory === "behavior"
                                  ? "Your child shows some challenging behaviors during transitions and when told 'no'."
                                  : selectedCategory === "potty"
                                    ? "Your child may need more consistency in potty training routines."
                                    : selectedCategory === "independence"
                                      ? "Your child may need more opportunities to practice self-help skills."
                                      : selectedCategory === "eating"
                                        ? "Your child shows selectivity with certain food textures."
                                        : selectedCategory === "sleep"
                                          ? "Your child has difficulty staying asleep through the night."
                                          : selectedCategory === "academic"
                                            ? "Your child may need more support with pre-reading skills."
                                            : "Your child may benefit from additional support in some developmental areas."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-medium text-[#4b2e83] mb-4">Recommended Support Plan</h3>
                      <div className="rounded-lg border border-[#e9e4f5] p-4 bg-[#f9f8fc]">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#4b2e83]/10 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-[#4b2e83]" />
                          </div>
                          <h4 className="font-medium text-[#4b2e83] text-lg">{recommendedPackage.name}</h4>
                        </div>
                        <p className="text-sm mb-4">{recommendedPackage.description}</p>
                        <Button className="w-full mt-2 bg-[#4b2e83] hover:bg-[#4b2e83]/90" asChild>
                          <Link href={recommendedPackage.url}>View Support Plan Details</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-medium text-[#4b2e83] mb-4">Helpful Next Steps</h3>
                      <div className="rounded-lg border border-[#e9e4f5] p-4 bg-[#f9f8fc]">
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 mt-0.5 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white">
                              1
                            </div>
                            <span className="text-sm">Schedule a friendly consultation with one of our specialists to discuss your child's screening results in more detail.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 mt-0.5 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white">
                              2
                            </div>
                            <span className="text-sm">
                              {selectedCategory === "behavior"
                                ? "Browse our family-friendly behavior support resources in our Resource Library."
                                : selectedCategory === "potty"
                                  ? "Try the gentle, effective approaches in our 'Potty Training Success' article."
                                  : selectedCategory === "independence"
                                    ? "Explore the fun activities in our 'Building Independence' guide."
                                    : selectedCategory === "eating"
                                      ? "Check out our parent-tested tips in our 'Healthy Eating Habits' guide."
                                      : selectedCategory === "sleep"
                                        ? "Review our 'Better Sleep for the Whole Family' strategies."
                                        : selectedCategory === "academic"
                                          ? "Discover playful learning activities in our 'School Readiness' article."
                                          : "Browse our developmental resources in our Family Resource Library."}
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 mt-0.5 items-center justify-center rounded-full bg-[#4b2e83] text-xs font-semibold text-white">
                              3
                            </div>
                            <span className="text-sm">Learn more about our recommended support plan, which provides personalized guidance for your child's specific needs.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center border-t border-[#e9e4f5] bg-[#f9f8fc] py-6">
                  <Button asChild className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 w-full sm:w-auto">
                    <Link href="/consultation">Schedule a Free Consultation</Link>
                  </Button>
                  <Button asChild className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 w-full sm:w-auto">
                    <Link href="/packages">Explore Support Plans</Link>
                  </Button>
                </CardFooter>
              </Card>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="border-[#4b2e83] text-[#4b2e83] mx-2" onClick={handleStartOver}>
                  Take Another Screening
                </Button>
                <Button variant="outline" className="border-[#4b2e83] text-[#4b2e83] mx-2" asChild>
                  <Link href="/dashboard">Save Results to Dashboard</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

