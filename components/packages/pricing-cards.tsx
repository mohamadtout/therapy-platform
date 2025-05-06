import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, User, Home, Building } from "lucide-react"

export default function PricingCards() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Choose Your Plan</h2>
          <p className="mt-4 text-lg text-gray-600">Select the package that best fits your child's needs</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Developmental Nurture Path */}
          <Card className="border">
            <CardHeader>
              <div className="flex items-center mb-2">
                <User className="h-6 w-6 text-onesti-purple mr-2" />
                <CardTitle>Developmental Nurture Path</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-4xl font-bold">$80</p>
                <p className="text-sm text-gray-600">per session</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">What's included</h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-onesti-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">4 therapy sessions to be used flexibly</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-onesti-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">The 1plan Personalized intervention</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-onesti-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Parent support strategies</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-onesti-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Interactive personalized dashboard</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90" asChild>
                <Link href="/packages#developmental-nurture">Choose Plan</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Developmental Empower Path */}
          <Card className="border-0 bg-onesti-purple text-white">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Home className="h-6 w-6 text-white mr-2" />
                <CardTitle className="text-white">Developmental Empower Path</CardTitle>
              </div>
              <div className="inline-block bg-onesti-purple/40 text-white px-3 py-1 rounded-md text-sm">Popular</div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-4xl font-bold">$75</p>
                <p className="text-sm text-white/80">per session</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">What's included</h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span className="text-sm">8 therapy sessions to be used flexibly</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span className="text-sm">The 1plan Personalized intervention</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span className="text-sm">Regular progress/coordination meetings</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span className="text-sm">2 video reviews with detailed feedback</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white hover:bg-white/90 text-onesti-purple" asChild>
                <Link href="/packages#developmental-empower">Choose Plan</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Developmental Thrive Path */}
          <Card className="border">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Building className="h-6 w-6 text-onesti-purple mr-2" />
                <CardTitle>Developmental Thrive Path</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-4xl font-bold">$70</p>
                <p className="text-sm text-gray-600">per session</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">What's included</h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-onesti-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">12 therapy sessions to be used flexibly</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-onesti-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">The 1plan Personalized intervention</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-onesti-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">4 video reviews with detailed feedback</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-onesti-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Regular parent and therapist coordination</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-onesti-purple hover:bg-onesti-purple/90" asChild>
                <Link href="/packages#developmental-thrive">Choose Plan</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg">
            Looking for a Customized Plan?{" "}
            <Link href="/contact" className="text-onesti-purple font-medium">
              Contact Us!
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

