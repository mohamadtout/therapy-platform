"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import { authService } from "@/lib/api/api-services"

function ConfirmSignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verifyURL = searchParams.get("verifyURL") || ""

  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    if (!verifyURL) {
      router.push("/signup")
      return
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [verifyURL, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Call the API to verify the code
      const response = await authService.signupconfirm(verifyURL, verificationCode)

      // Handle successful verification
      if(response.status !== 200) {
        throw new Error("Verification failed")
      }

      setSuccess(true)

      // Store the token if provided
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("level", response.data.level)
      }

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err: any) {

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
        setError(err.message || "An error occurred during verification. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Call the API to resend the verification code
      await authService.resendVerificationCode(verifyURL)

      // Reset timer
      setTimeLeft(300)
    } catch (err: any) {
      console.error("Resend code error:", err)

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
        setError(err.message || "Failed to resend code. Please try again.")
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to your email.
            <br />
            Please enter it below to complete your registration.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {success ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Email verified successfully!</h3>
                <p className="text-gray-600">Redirecting you to your dashboard...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">
                      Verification Code
                    </label>
                    <span className="text-sm text-gray-500">Time remaining: {formatTime(timeLeft)}</span>
                  </div>
                  <Input
                    id="verification-code"
                    name="verification-code"
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    required
                    value={verificationCode}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/[^0-9]/g, "")
                      setVerificationCode(value)
                    }}
                    className="text-center text-lg tracking-widest"
                    disabled={isLoading || timeLeft === 0}
                  />
                </div>

                <div className="flex flex-col space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || timeLeft === 0 || verificationCode.length !== 6}
                  >
                    {isLoading ? "Verifying..." : "Verify Email"}
                  </Button>

                  {timeLeft === 0 ? (
                    <div className="text-center">
                      <p className="text-sm text-red-600 mb-2">Verification code expired</p>
                      <Button type="button" variant="outline" onClick={handleResendCode} disabled={isLoading}>
                        {isLoading ? "Sending..." : "Resend Code"}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="text-sm"
                    >
                      Didn't receive a code? Resend
                    </Button>
                  )}
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <Link href="/signup" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Return to sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Wrapped () {
  return(
    <Suspense>
      <ConfirmSignupPage />
    </Suspense>
  )
}

