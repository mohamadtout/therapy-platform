"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Info } from "lucide-react"

export default function MilestoneTrackerPage() {
  // Mock state for login status - in a real app, this would come from auth
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showChildForm, setShowChildForm] = useState(false)
  const [childProfile, setChildProfile] = useState<{ name: string; dob: string } | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
    setShowChildForm(true)
  }

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to the server
    setChildProfile({
      name: "Alex",
      dob: "2020-06-15",
    })
    setShowChildForm(false)
  }

  // Calculate age in months for demo
  const getAgeInMonths = () => {
    if (!childProfile) return 0
    const birthDate = new Date(childProfile.dob)
    const today = new Date()
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12
    months -= birthDate.getMonth()
    months += today.getMonth()
    return months
  }

  const ageInMonths = childProfile ? getAgeInMonths() : 0

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Milestone Tracker</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Track your child's developmental milestones and get personalized insights
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {!isLoggedIn && (
            <Card>
              <CardHeader>
                <CardTitle>Create a Free Account</CardTitle>
                <CardDescription>Sign up to start tracking your child's milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <Button type="submit">Sign Up</Button>
                    <Button variant="link" onClick={() => setIsLoggedIn(true)}>
                      Already have an account? Log in
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {isLoggedIn && showChildForm && (
            <Card>
              <CardHeader>
                <CardTitle>Child Profile Setup</CardTitle>
                <CardDescription>Enter your child's information to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProfile}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="childName">Child's Name</Label>
                      <Input id="childName" placeholder="Enter your child's name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gender (Optional)</Label>
                      <select
                        id="gender"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button type="submit">Save Profile & Continue</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {isLoggedIn && childProfile && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{childProfile.name}'s Milestones</CardTitle>
                      <CardDescription>Age: {ageInMonths} months</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="communication">Communication</TabsTrigger>
                      <TabsTrigger value="motor">Motor Skills</TabsTrigger>
                      <TabsTrigger value="social">Social</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-6">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="flex items-start gap-4">
                          <Info className="mt-1 h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-medium">Milestone Summary</h3>
                            <p className="text-sm text-muted-foreground">
                              Based on your child's age ({ageInMonths} months), here are the key milestones to watch
                              for.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <h3 className="font-medium">On Track</h3>
                          </div>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                              <span>Responds to own name</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                              <span>Sits without support</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                              <span>Babbles with consonant sounds</span>
                            </li>
                          </ul>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-amber-500" />
                            <h3 className="font-medium">Coming Up</h3>
                          </div>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <Clock className="mt-0.5 h-4 w-4 text-amber-500" />
                              <span>First words (mama, dada)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Clock className="mt-0.5 h-4 w-4 text-amber-500" />
                              <span>Pulls to stand</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Clock className="mt-0.5 h-4 w-4 text-amber-500" />
                              <span>Plays simple games (peek-a-boo)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="communication" className="mt-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Communication Milestones: {ageInMonths} months</h3>
                        <p className="text-muted-foreground">
                          Communication skills include language understanding, speech, and non-verbal communication.
                        </p>

                        <div className="mt-6 space-y-4">
                          <div className="rounded-lg border p-4">
                            <h4 className="font-medium">Expected at this age:</h4>
                            <ul className="mt-2 space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Responds to own name</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Babbles with consonant sounds (ba, da, ga)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Responds to "no"</span>
                              </li>
                            </ul>
                          </div>

                          <Button>Complete Communication Checklist</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="motor" className="mt-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Motor Skills: {ageInMonths} months</h3>
                        <p className="text-muted-foreground">
                          Motor skills include both fine motor (hands, fingers) and gross motor (whole body) movements.
                        </p>

                        <div className="mt-6 space-y-4">
                          <div className="rounded-lg border p-4">
                            <h4 className="font-medium">Expected at this age:</h4>
                            <ul className="mt-2 space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Sits without support</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Transfers objects from hand to hand</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Begins to crawl or scoot</span>
                              </li>
                            </ul>
                          </div>

                          <Button>Complete Motor Skills Checklist</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="social" className="mt-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Social Development: {ageInMonths} months</h3>
                        <p className="text-muted-foreground">
                          Social development includes emotional responses, relationships with others, and play skills.
                        </p>

                        <div className="mt-6 space-y-4">
                          <div className="rounded-lg border p-4">
                            <h4 className="font-medium">Expected at this age:</h4>
                            <ul className="mt-2 space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Shows stranger anxiety</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Plays peek-a-boo</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                                <span>Shows preferences for certain people and toys</span>
                              </li>
                            </ul>
                          </div>

                          <Button>Complete Social Development Checklist</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
                  <Button>Complete a Quick Checklist</Button>
                  <Button variant="outline" asChild>
                    <Link href="/assessments">Want a full screening? Proceed to Assessments</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Milestone Tips & Reminders</CardTitle>
                  <CardDescription>Receive weekly milestone tips & reminders via email or WhatsApp</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="notification-email">Email</Label>
                      <Input id="notification-email" type="email" defaultValue="example@email.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notification-whatsapp">WhatsApp (Optional)</Label>
                      <Input id="notification-whatsapp" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to receive notifications about my child's development
                      </Label>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button>Subscribe Now</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

