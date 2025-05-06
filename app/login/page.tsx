"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { authService } from "@/lib/api/api-services"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    // setTimeout(() => {
    //   setIsLoading(false)
    //   // Redirect based on role (in a real app, this would come from the auth response)
    //   if (email.includes("admin")) {
    //     router.push("/admin")
    //   } else if (email.includes("therapist")) {
    //     router.push("/therapist")
    //   } else {
    //     router.push("/dashboard")
    //   }
    // }, 1500)
    try {

      // Call the login API endpoint
      const response = await authService.login(email, password)

      // Store the token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("level", response.data.level)

        // Redirect based on role (in a real app, this would come from the auth response)
        setIsLoading(false)
        setTimeout(() => {
          if(response.data.level === "admin") {
            router.push("/admin")
          }else if(response.data.level === "therapist") {
            router.push("/specialist")
          }else{
            router.push("/dashboard")
          }
        }, 1500)
      } else {
        throw new Error("Authentication token not received")
      }
    } catch (err: any) {
      console.error("Login error:", err)

      // Handle different types of errors
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message)
        } else {
          setError(`Error: ${err.response.status} - ${err.response.statusText}`)
        }
      } else if (err.request) {
        setError("No response received from server. Please check your internet connection.")
      } else {
        setError(err.message || "An error occurred during login. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="[COMPANY] Logo"
              width={150}
              height={60}
              className="mx-auto h-12 w-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Access your parent dashboard or therapist portal</p>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
          {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          {/* <CardFooter className="flex justify-center border-t pt-6">
            <div className="text-sm">
              <span className="text-gray-600">For demo purposes:</span>
              <ul className="mt-2 space-y-1 text-gray-500">
                <li>- Use "admin@[COMPANY].com" for admin access</li>
                <li>- Use "user@example.com" for parent dashboard</li>
                <li>- Use "therapist@[COMPANY].com" for therapist portal</li>
                <li>- Any password will work</li>
              </ul>
            </div>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  )
}

