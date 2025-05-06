"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, CreditCard, ShoppingCart } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import TrialSessionCard from "@/components/packages/trial-session-card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import TestimonialsSection from "@/components/packages/testimonials-section"
// import CostCalculator from "@/components/packages/cost-calculator"

// Add type definition for package items to include the contactForPricing property
type PackageItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  displayPrice: number;
  regionalPrice: number;
  sessionCount: number;
  features: string[];
  recommended: boolean;
  contactForPricing?: boolean;
};

// Update the packages array to reflect the new service offerings and pricing structure
const packages: PackageItem[] = [
  {
    id: "developmental-thrive",
    name: "Developmental Thrive Path",
    description: "Comprehensive support for developmental delays or challenges",
    price: 720,  // Global price for the entire package (60 * 12)
    displayPrice: 60, // Price shown per session
    regionalPrice: 600, // Regional discount price
    sessionCount: 12,
    features: [
      "In-depth initial assessment with a multidisciplinary review",
      "12 therapy sessions to be used flexibly",
      "Individualized plan with targeted objectives",
      "Parent support strategies to implement plan objectives in daily life",
      "Access to an interactive personalized dashboard with progress tracking",
      "Calendar integration with reminders",
      "4 video reviews with detailed feedback",
      "Regular parent and therapist coordination meetings",
      "Dedicated Technical Advisor for coordination",
    ],
    recommended: true,
  },
  {
    id: "developmental-empower",
    name: "Developmental Empower Path",
    description: "Balanced support for developmental needs",
    price: 520,  // Global price for the entire package (65 * 8)
    displayPrice: 65, // Price shown per session
    regionalPrice: 400, // Regional discount price
    sessionCount: 8,
    features: [
      "In-depth initial assessment with a multidisciplinary review",
      "8 therapy sessions to be used flexibly",
      "Individualized intervention plan with targeted objectives",
      "Parent support strategies to implement plan objectives in daily life",
      "Regular progress/coordination meetings",
      "Access to an interactive personalized dashboard with progress tracking",
      "Calendar integration with reminders",
      "2 video reviews with detailed feedback",
      "Dedicated Technical Advisor for coordination",
    ],
    recommended: false,
  },
  {
    id: "developmental-nurture",
    name: "Developmental Nurture Path",
    description: "Essential support for developmental needs",
    price: 280,  // Global price for the entire package (70 * 4)
    displayPrice: 70, // Price shown per session
    regionalPrice: 200, // Regional discount price
    sessionCount: 4,
    features: [
      "In-depth initial assessment with a multidisciplinary review",
      "4 therapy sessions to be used flexibly",
      "Individualized intervention plan with targeted objectives",
      "Parent support strategies to implement plan objectives in daily life",
      "Access to an interactive personalized dashboard with progress tracking",
      "Calendar integration with reminders",
      "Dedicated Technical Advisor for coordination",
    ],
    recommended: false,
  },
]

// Add service categories for the tabs
const serviceCategories = [
  { id: "developmental", name: "Developmental Interventions" },
  { id: "routine", name: "Routine-Based Interventions" },
  { id: "aba", name: "Applied Behavior Analysis (ABA)" },
  { id: "counseling", name: "Counseling & Single Sessions" },
]

// Add routine intervention packages
const routinePackages: PackageItem[] = [
  {
    id: "routine-thrive",
    name: "Routine Thrive Path",
    description: "Comprehensive support for routine-based challenges",
    price: 700,  // Global price for the entire package (70 * 10)
    displayPrice: 70, // Price shown per session
    regionalPrice: 500, // Regional discount price
    sessionCount: 10,
    features: [
      "10 intervention sessions",
      "A report detailing results of the screening checklist",
      "Individualized intervention plan with targeted objectives",
      "Access to an interactive personalized dashboard with progress tracking",
      "3 video review for feedback",
    ],
    recommended: true,
  },
  {
    id: "routine-empower",
    name: "Routine Empower Path",
    description: "Balanced support for routine-based challenges",
    price: 450,  // Global price for the entire package (75 * 6)
    displayPrice: 75, // Price shown per session
    regionalPrice: 300, // Regional discount price
    sessionCount: 6,
    features: [
      "6 intervention sessions",
      "A report detailing results of the screening checklist",
      "Individualized intervention plan with targeted objectives",
      "Access to an interactive personalized dashboard with progress tracking",
      "2 video review for feedback",
    ],
    recommended: false,
  },
  {
    id: "routine-nurture",
    name: "Routine Nurture Path",
    description: "Essential support for routine-based challenges",
    price: 320,  // Global price for the entire package (80 * 4)
    displayPrice: 80, // Price shown per session
    regionalPrice: 200, // Regional discount price
    sessionCount: 4,
    features: [
      "4 intervention sessions",
      "A report detailing results of the screening checklist",
      "Individualized intervention plan with targeted objectives",
      "Access to an interactive personalized dashboard with progress tracking",
      "1 Video review for feedback",
    ],
    recommended: false,
  },
]

// Add ABA therapy packages
const abaPackages: PackageItem[] = [
  {
    id: "aba-school-starter",
    name: "ABA Intensive Starter Path",
    description: "Intensive support for complex behavioral needs (first month of intervention)",
    price: 0,  // Setting to 0 to indicate contact for pricing
    displayPrice: 0, // Setting to 0 to indicate contact for pricing
    regionalPrice: 0, // Setting to 0 to indicate contact for pricing
    sessionCount: 10,
    features: [
      "10 hours of ABA intervention",
      "Personalized behavior intervention plan",
      "Detailed feedback and recommendations",
      "Implementation of customized reinforcement plan",
      "Regular progress monitoring",
      "Documentation of milestones and achievements"
    ],
    recommended: true,
    contactForPricing: true
  },
  {
    id: "aba-school-followup",
    name: "Follow-up & Reinforcement Path",
    description: "Second month of intervention",
    price: 0,  // Setting to 0 to indicate contact for pricing
    displayPrice: 0, // Setting to 0 to indicate contact for pricing
    regionalPrice: 0, // Setting to 0 to indicate contact for pricing
    sessionCount: 8,
    features: [
      "8 hours of ABA intervention",
      "Quality Assurance Measures",
      "Detailed feedback and recommendations",
      "Data-driven program modifications",
      "Assessment of behavioral intervention effectiveness",
      "Evaluation of need for additional behavioral assessments/interventions",
      "Regular progress monitoring",
      "Documentation of milestones and achievements"
    ],
    recommended: false,
    contactForPricing: true
  },
  {
    id: "aba-school-supervision",
    name: "Supervision & Refinement Path",
    description: "Third month of Intervention",
    price: 0,  // Setting to 0 to indicate contact for pricing
    displayPrice: 0, // Setting to 0 to indicate contact for pricing
    regionalPrice: 0, // Setting to 0 to indicate contact for pricing
    sessionCount: 6,
    features: [
      "6 hours of ABA intervention",
      "Quality Assurance Measures",
      "Detailed feedback and recommendations",
      "Data-driven program modifications",
      "Assessment of behavioral intervention effectiveness",
      "Evaluation of need for additional behavioral assessments/interventions",
      "Regular progress monitoring",
      "Documentation of milestones and achievements"
    ],
    recommended: false,
    contactForPricing: true
  },
  {
    id: "aba-home-intensive",
    name: "Intensive Home Program",
    description: "Comprehensive in-home ABA support",
    price: 0,  // Setting to 0 to indicate contact for pricing
    displayPrice: 0, // Setting to 0 to indicate contact for pricing
    regionalPrice: 0, // Setting to 0 to indicate contact for pricing
    sessionCount: 15,
    features: [
      "15 hours of ABA intervention",
      "Personalized behavior intervention plan",
      "Implementation of customized reinforcement plan",
      "Data-driven program modifications",
      "Assessment of behavioral intervention effectiveness",
      "Evaluation of need for additional behavioral assessments/interventions",
      "Strategic planning for support reduction",
      "Regular progress monitoring",
      "Documentation of milestones and achievements"
    ],
    recommended: false,
    contactForPricing: true
  },
]

// Add counseling packages
const counselingPackages: PackageItem[] = [
  {
    id: "counseling-single",
    name: "Single Session",
    description: "One-time counseling support",
    price: 90,  // Price for a single session
    displayPrice: 90, // Price shown per session
    regionalPrice: 60, // Regional discount price
    sessionCount: 1,
    features: [
      "One-time counseling session",
      "Focused on immediate concerns",
    ],
    recommended: false,
  },
  {
    id: "counseling-bundle",
    name: "Session Bundle",
    description: "Multiple sessions at your convenience",
    price: 320,  // Global price for the entire package (80 * 4)
    displayPrice: 80, // Price shown per session
    regionalPrice: 240, // Regional discount price
    sessionCount: 4,
    features: [
      "4 counseling sessions",
      "Flexible scheduling at your convenience",
    ],
    recommended: true,
  },
  {
    id: "counseling-extended",
    name: "Extended Support",
    description: "Comprehensive counseling support",
    price: 420,  // Global price for the entire package (70 * 6)
    displayPrice: 70, // Price shown per session
    regionalPrice: 300, // Regional discount price
    sessionCount: 6,
    features: [
      "6 counseling sessions",
      "Weekly check-ins via email or chat",
      "Personalized guidance and support",
    ],
    recommended: false,
  },
]

// Update the component to include tabs for different service categories
export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState("developmental")
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [customizing, setCustomizing] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [purchaseComplete, setPurchaseComplete] = useState(false)
  const [paymentOption, setPaymentOption] = useState("upfront")
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [packageToConfirm, setPackageToConfirm] = useState<string | null>(null)
  const [cart, setCart] = useState<string[]>([])
  const [showCartSummary, setShowCartSummary] = useState(false)

  // Get the appropriate package list based on selected category
  const getPackagesByCategory = () => {
    switch (selectedCategory) {
      case "routine":
        return routinePackages
      case "aba":
        return abaPackages
      case "counseling":
        return counselingPackages
      default:
        return packages
    }
  }

  const currentPackages = getPackagesByCategory()
  
  // Get all packages from all categories
  const getAllPackages = () => {
    return [...packages, ...routinePackages, ...abaPackages, ...counselingPackages]
  }
  
  // Calculate total cart value
  const calculateCartTotal = () => {
    const allPackages = getAllPackages()
    return cart.reduce((total, pkgId) => {
      const pkg = allPackages.find(p => p.id === pkgId)
      return total + (pkg?.price || 0)
    }, 0)
  }

  // Add a function to calculate the real cart total based on global prices
  const calculateRealCartTotal = () => {
    return cart.reduce((total, pkgId) => {
      const allPackages = getAllPackages();
      const pkg = allPackages.find(p => p.id === pkgId);
      // Return the total package price, not the session price
      return pkg ? total + pkg.price : total;
    }, 0);
  };

  // Update the display total to show the total price based on display price
  const calculateDisplayTotal = () => {
    return cart.reduce((total, pkgId) => {
      const allPackages = getAllPackages();
      const pkg = allPackages.find(p => p.id === pkgId);
      // For display, use the display price
      return pkg ? total + pkg.displayPrice : total;
    }, 0);
  };

  // Calculate payment amounts based on selected option
  const calculatePayment = (price: number) => {
    switch (paymentOption) {
      case "weekly":
        return `$${Math.round(price / 4)}/week`
      case "monthly":
        return `$${Math.round(price / 2)}/month`
      default:
        return `$${price}`
    }
  }

  const handlePackageSelect = (packageId: string) => {
    setPackageToConfirm(packageId)
    setConfirmDialogOpen(true)
  }

  const handleCustomize = () => {
    setCustomizing(true)
  }

  const handleProceedToPayment = () => {
    setShowPayment(true)
  }

  const handleCompletePurchase = () => {
    setPurchaseComplete(true)
  }

  const handleStartOver = () => {
    setSelectedPackage(null)
    setCustomizing(false)
    setShowPayment(false)
    setPurchaseComplete(false)
    setCart([])
  }

  // Add function to confirm package selection
  const confirmPackageSelection = () => {
    if (packageToConfirm) {
      setCart(prev => [...prev, packageToConfirm])
      setSelectedPackage(packageToConfirm)
      setConfirmDialogOpen(false)
    }
  }

  // Add function to add to cart without proceeding to checkout
  const addToCartOnly = () => {
    if (packageToConfirm) {
      setCart(prev => [...prev, packageToConfirm])
      setConfirmDialogOpen(false)
    }
  }
  
  // Function to remove a package from cart
  const removeFromCart = (packageId: string) => {
    setCart(prev => prev.filter(id => id !== packageId))
    if (selectedPackage === packageId) {
      setSelectedPackage(null)
    }
  }
  
  // Show floating checkout button when there are items in cart
  useEffect(() => {
    setShowCartSummary(cart.length > 0)
  }, [cart])

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#4b2e83] mb-4">
            Intervention Packages
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the right intervention plan for your child's….
          </p>
        </div>

        {/* Floating Cart Summary */}
        {showCartSummary && !showPayment && !purchaseComplete && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-white rounded-lg shadow-lg border p-4 w-72 max-w-[calc(100vw-2rem)]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Your Selected Plans</h3>
                <span className="text-sm bg-primary text-white rounded-full px-2 py-0.5">
                  {cart.length} {cart.length === 1 ? 'plan' : 'plans'}
                </span>
              </div>
              
              {cart.length > 0 && (
                <div className="max-h-40 overflow-auto mb-3">
                  {cart.map((pkgId) => {
                    const allPackages = getAllPackages();
                    const pkg = allPackages.find(p => p.id === pkgId);
                    return pkg ? (
                      <div key={pkgId} className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm truncate max-w-[150px]">{pkg.name}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">${pkg.price}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => removeFromCart(pkgId)}
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              <div className="flex justify-between font-medium text-sm mb-3">
                <span>Total:</span>
                <span>${calculateRealCartTotal()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs" 
                  onClick={handleStartOver}
                >
                  Continue Shopping
                </Button>
                <Button 
                  size="sm"
                  className="text-xs"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto mt-12 max-w-7xl">
          {!selectedPackage && !purchaseComplete && (
            <>
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Choose a Service Category</h2>
                  <p className="mt-2 text-base text-gray-600">
                    Select a category to view our specialized therapy packages
                  </p>
                </div>
                <div className="space-x-2 flex flex-wrap gap-2">
                  {serviceCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className="min-w-[120px]"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                {selectedCategory === "aba" && (
                  <div className="mb-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-center mb-4">School Provision</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {getPackagesByCategory().filter(pkg => 
                          pkg.id === "aba-school-starter" || 
                          pkg.id === "aba-school-followup" || 
                          pkg.id === "aba-school-supervision"
                        ).map((packageItem) => (
                          <div
                            key={packageItem.id}
                            className={`relative rounded-xl border bg-white p-6 shadow-sm ${
                              packageItem.recommended ? "ring-2 ring-primary" : ""
                            }`}
                          >
                            {packageItem.recommended && (
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                                Most Popular Choice
                              </div>
                            )}
                            <div className="flex flex-col justify-between h-full">
                              <div>
                                <h3 className="text-xl font-bold">{packageItem.name}</h3>
                                <p className="mt-1.5 text-sm text-gray-600 mb-4">{packageItem.description}</p>
                                <div className="my-4">
                                  {packageItem.contactForPricing ? (
                                    <span className="text-lg font-semibold text-primary">Contact for pricing</span>
                                  ) : (
                                    <>
                                      <span className="text-3xl font-bold">${packageItem.displayPrice}</span>
                                      <span className="ml-1 text-gray-500">per session</span>
                                    </>
                                  )}
                                </div>
                                <ul className="space-y-2.5 my-6">
                                  {packageItem.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                                      <span className="text-sm">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <Button
                                className="w-full mt-6"
                                onClick={() => handlePackageSelect(packageItem.id)}
                              >
                                {packageItem.contactForPricing ? "Contact Us" : "Select This Package"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-center mb-4">Intensive Home Program</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {getPackagesByCategory().filter(pkg => pkg.id === "aba-home-intensive").map((packageItem) => (
                          <div
                            key={packageItem.id}
                            className={`relative rounded-xl border bg-white p-6 shadow-sm ${
                              packageItem.recommended ? "ring-2 ring-primary" : ""
                            }`}
                          >
                            {packageItem.recommended && (
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                                Most Popular Choice
                              </div>
                            )}
                            <div className="flex flex-col justify-between h-full">
                              <div>
                                <h3 className="text-xl font-bold">{packageItem.name}</h3>
                                <p className="mt-1.5 text-sm text-gray-600 mb-4">{packageItem.description}</p>
                                <div className="my-4">
                                  {packageItem.contactForPricing ? (
                                    <span className="text-lg font-semibold text-primary">Contact for pricing</span>
                                  ) : (
                                    <>
                                      <span className="text-3xl font-bold">${packageItem.displayPrice}</span>
                                      <span className="ml-1 text-gray-500">per session</span>
                                    </>
                                  )}
                                </div>
                                <ul className="space-y-2.5 my-6">
                                  {packageItem.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                                      <span className="text-sm">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <Button
                                className="w-full mt-6"
                                onClick={() => handlePackageSelect(packageItem.id)}
                              >
                                {packageItem.contactForPricing ? "Contact Us" : "Select This Package"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {selectedCategory !== "aba" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {getPackagesByCategory().map((packageItem) => (
                      <div
                        key={packageItem.id}
                        className={`relative rounded-xl border bg-white p-6 shadow-sm ${
                          packageItem.recommended ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        {packageItem.recommended && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                            Most Popular Choice
                          </div>
                        )}
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <h3 className="text-xl font-bold">{packageItem.name}</h3>
                            <p className="mt-1.5 text-sm text-gray-600 mb-4">{packageItem.description}</p>
                            <div className="my-4">
                              {packageItem.contactForPricing ? (
                                <span className="text-lg font-semibold text-primary">Contact for pricing</span>
                              ) : (
                                <>
                                  <span className="text-3xl font-bold">${packageItem.displayPrice}</span>
                                  <span className="ml-1 text-gray-500">per session</span>
                                </>
                              )}
                            </div>
                            <ul className="space-y-2.5 my-6">
                              {packageItem.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button
                            className="w-full mt-6"
                            onClick={() => handlePackageSelect(packageItem.id)}
                          >
                            {packageItem.contactForPricing ? "Contact Us" : "Select This Package"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-t border-gray-200 pt-8 flex justify-center">
                  <TrialSessionCard />
                </div>
              </div>
            </>
          )}

          {selectedPackage && !customizing && !showPayment && !purchaseComplete && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Selection</CardTitle>
                <CardDescription>A quick look at the support package you've chosen for your child</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cart.length > 0 && (
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-medium mb-4">Your Selected Packages</h3>
                      {cart.map((pkgId) => {
                        const allPackages = getAllPackages();
                        const pkg = allPackages.find(p => p.id === pkgId);
                        return pkg ? (
                          <div key={pkgId} className="flex justify-between items-center py-2 border-b last:border-0">
                            <div>
                              <p className="font-medium">{pkg.name}</p>
                              <p className="text-sm text-muted-foreground">{pkg.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${pkg.price}</p>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 h-8" 
                                onClick={() => removeFromCart(pkgId)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : null;
                      })}
                      <div className="flex justify-between items-center font-semibold mt-4 pt-2 border-t">
                        <span>Total:</span>
                        <span>${calculateRealCartTotal()}</span>
                      </div>
                    </div>
                  )}

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Choose Your Payment Option</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Select a flexible payment plan that works best for your family
                    </p>

                    <RadioGroup
                      defaultValue="upfront"
                      onValueChange={setPaymentOption}
                      className="mt-4 grid gap-4 sm:grid-cols-3"
                    >
                      <div
                        className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${paymentOption === "upfront" ? "border-primary bg-primary/5" : ""}`}
                      >
                        <RadioGroupItem value="upfront" id="upfront" className="mt-1" />
                        <div className="space-y-2">
                          <Label htmlFor="upfront" className="text-base font-medium">
                            Pay Upfront
                          </Label>
                          <p className="text-sm text-muted-foreground">Full payment with 10% family discount</p>
                          <p className="font-medium text-primary">
                            ${Math.round(calculateRealCartTotal() * 0.9)}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${paymentOption === "monthly" ? "border-primary bg-primary/5" : ""}`}
                      >
                        <RadioGroupItem value="monthly" id="monthly" className="mt-1" />
                        <div className="space-y-2">
                          <Label htmlFor="monthly" className="text-base font-medium">
                            Monthly Plan
                          </Label>
                          <p className="text-sm text-muted-foreground">Easy 2-month payment plan</p>
                          <p className="font-medium text-primary">
                            ${Math.round(calculateRealCartTotal() / 2)}/month
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${paymentOption === "weekly" ? "border-primary bg-primary/5" : ""}`}
                      >
                        <RadioGroupItem value="weekly" id="weekly" className="mt-1" />
                        <div className="space-y-2">
                          <Label htmlFor="weekly" className="text-base font-medium">
                            Weekly Plan
                          </Label>
                          <p className="text-sm text-muted-foreground">Manageable weekly payments</p>
                          <p className="font-medium text-primary">
                            ${Math.round(calculateRealCartTotal() / 4)}/week
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleStartOver}>
                  Back to Packages
                </Button>
                <Button onClick={handleProceedToPayment}>Continue to Payment</Button>
              </CardFooter>
            </Card>
          )}

          {customizing && !showPayment && !purchaseComplete && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personalize Your Support Plan</CardTitle>
                    <CardDescription>Tailor your child's support to match their unique needs</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setCustomizing(false)}>
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="focus-area">Area Your Child Needs Support With</Label>
                    <Select defaultValue="speech">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select area of support" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="speech">Communication & Language</SelectItem>
                        <SelectItem value="motor">Movement & Coordination</SelectItem>
                        <SelectItem value="cognitive">Learning & Problem Solving</SelectItem>
                        <SelectItem value="social">Social Skills & Emotions</SelectItem>
                        <SelectItem value="sensory">Sensory Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="session-frequency">How Often Would Sessions Work Best</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly (Most effective)</SelectItem>
                        <SelectItem value="biweekly">Every other week</SelectItem>
                        <SelectItem value="monthly">Once a month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="session-length">Session Length That Works For Your Child</Label>
                    <Select defaultValue="45">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes (Most effective)</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Your Family's Monthly Budget</Label>
                    <div className="mt-1">
                      <Input type="range" min="50" max="300" step="10" defaultValue="150" className="w-full" />
                      <div className="mt-2 flex justify-between text-sm">
                        <span>$50</span>
                        <span className="font-medium">$150/month</span>
                        <span>$300</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium">Your Personalized Recommendation</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Focus Area:</span>
                        <span className="text-sm font-medium">Communication & Language</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sessions:</span>
                        <span className="text-sm font-medium">Weekly, 45 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Specialist:</span>
                        <span className="text-sm font-medium">Communication Specialist</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Monthly Investment:</span>
                        <span className="font-medium">$150</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCustomizing(false)}>
                  Back
                </Button>
                <Button onClick={handleProceedToPayment}>Proceed to Payment</Button>
              </CardFooter>
            </Card>
          )}

          {showPayment && !purchaseComplete && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Secure your child's support plan with a simple payment process</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowPayment(false)
                      if (customizing) {
                        setCustomizing(true)
                      }
                    }}
                  >
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium">Your Support Plan</h3>
                    
                    {cart.length > 0 ? (
                      <div className="mt-4 space-y-2">
                        {cart.map((pkgId, index) => {
                          const allPackages = getAllPackages();
                          const pkg = allPackages.find(p => p.id === pkgId);
                          return pkg ? (
                            <div key={pkgId} className="flex justify-between py-1">
                              <span className="text-sm text-muted-foreground">{pkg.name}:</span>
                              <span className="text-sm font-medium">${pkg.price}</span>
                            </div>
                          ) : null;
                        })}
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Payment Option:</span>
                          <span className="text-sm font-medium">
                            {paymentOption === 'upfront' ? 'Upfront (10% family discount)' : 
                             paymentOption === 'monthly' ? 'Monthly Plan' : 'Weekly Plan'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-medium">
                            {paymentOption === 'upfront' 
                              ? `$${Math.round(calculateCartTotal() * 0.9)} (You save $${Math.round(calculateCartTotal() * 0.1)})`
                              : paymentOption === 'monthly'
                                ? `$${calculateCartTotal()} ($${Math.round(calculateCartTotal() / 2)}/month × 2)`
                                : `$${calculateCartTotal()} ($${Math.round(calculateCartTotal() / 4)}/week × 4)`
                            }
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Support Plan:</span>
                          <span className="text-sm font-medium">
                            {customizing
                              ? "Personalized Support Plan"
                              : currentPackages.find((p) => p.id === selectedPackage)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Payment Schedule:</span>
                          <span className="text-sm font-medium">Monthly</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-medium">
                            ${customizing ? "150" : currentPackages.find((p) => p.id === selectedPackage)?.price}/session
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name on Card</Label>
                          <Input id="name" placeholder="John Doe" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="bank" className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Bank Transfer Details</h3>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Bank Name:</span>
                            <span className="text-sm font-medium">Example Bank</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Account Name:</span>
                            <span className="text-sm font-medium">[COMPANY] Therapy Services</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Account Number:</span>
                            <span className="text-sm font-medium">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Routing Number:</span>
                            <span className="text-sm font-medium">987654321</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                          Please include your family name and "Support Plan" in the transfer description.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCompletePurchase}>
                  <CreditCard className="mr-2 h-4 w-4" /> Complete Your Registration
                </Button>
              </CardFooter>
            </Card>
          )}

          {purchaseComplete && (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>You're All Set!</CardTitle>
                <CardDescription>Your child's support plan has been successfully activated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted p-4">
                  <div className="space-y-3">
                    {cart.length > 1 ? (
                      <>
                        <h4 className="font-medium">Your Support Plans:</h4>
                        {cart.map((pkgId, index) => {
                          const allPackages = getAllPackages();
                          const pkg = allPackages.find(p => p.id === pkgId);
                          return pkg ? (
                            <div key={pkgId} className="flex justify-between">
                              <span className="text-sm text-muted-foreground">{pkg.name}:</span>
                              <span className="text-sm font-medium">${pkg.price}</span>
                            </div>
                          ) : null;
                        })}
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Support Plan:</span>
                        <span className="text-sm font-medium">
                          {customizing
                            ? "Personalized Support Plan"
                            : currentPackages.find((p) => p.id === selectedPackage)?.name}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payment Schedule:</span>
                      <span className="text-sm font-medium">
                        {paymentOption === 'upfront' 
                          ? 'One-time Payment (Family discount applied)' 
                          : paymentOption === 'monthly'
                            ? 'Monthly (2 payments)'
                            : 'Weekly (4 payments)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Next Payment Date:</span>
                      <span className="text-sm font-medium">
                        {paymentOption === 'upfront' 
                          ? 'Paid in full' 
                          : new Date(Date.now() + (paymentOption === 'monthly' ? 30 : 7) * 24 * 60 * 60 * 1000)
                              .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-medium">
                        ${paymentOption === 'upfront' 
                          ? Math.round(calculateRealCartTotal() * 0.9)
                          : calculateRealCartTotal()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    A confirmation email will arrive shortly with all your plan details.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Our team will reach out soon to schedule your child's first session. You can also view your upcoming sessions in your dashboard.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 sm:flex-row">
                <Button asChild className="w-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button variant="outline" className="w-full" onClick={handleStartOver}>
                  Explore Other Packages
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Package to Your Plan</DialogTitle>
            <DialogDescription>
              Would you like to add this package to your plan or proceed directly to checkout?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This package will provide personalized support for your child's development needs.
            </p>
          </div>
          <DialogFooter>
            <div className="flex w-full space-x-2">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" className="flex-1" onClick={addToCartOnly}>
                Add to Plan
              </Button>
              <Button className="flex-1" onClick={confirmPackageSelection}>
                Add & Checkout
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

