"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { authService } from "@/lib/api/api-services"

function ForgotPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verifyURL = searchParams.get("verifyURL") || ""
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const {toast} = useToast();
  useEffect(() => {
    if (!verifyURL) {
        setTimeout(() => {
            toast({
              title: "This Link Is Invalid",
              description: "Redirecting You To Homepage",
              variant: "destructive", // Changed from default to make it more noticeable
            })
          }, 100)
        setTimeout(() => {
            router.push("/")
          }, 3000)
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
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Reset states
    setError("")
    setIsSubmitting(true)

    // Basic validation
    if(!password || !confirmPassword || !code) {
        setError("Please fill in all fields")
        setIsSubmitting(false)
        return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsSubmitting(false)
      return
    }

    if(code.length !== 6) {
        setError("Please enter a valid 6-digit code")
        setIsSubmitting(false)
        return
    }
    try {
        const response = await authService.resetPassword(verifyURL, code, password)
        if(response.status == 200){
            setIsSubmitted(true)
            setTimeout(() => {
                router.push("/login")
            }, 2000)
        }
    } catch (err: any) {
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
        setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">Please Enter The Code And Your New Password</p>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={code}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/[^0-9]/g, "")
                      setCode(value)
                    }}
                    className="text-center text-lg tracking-widest"
                    disabled={isSubmitting || timeLeft === 0}
                  />
                </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  disabled={isSubmitting}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {/* {error && <p className="mt-2 text-sm text-red-600">{error}</p>} */}
              </div>
              <div>
                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  id="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  disabled={isSubmitting}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="rounded-full bg-green-100 p-3 mx-auto w-fit mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Password Reset Successfully</h3>
              <p className="mt-2 text-sm text-gray-600">Redirecting You To Login Page</p>
            </div>
          )}

          <div className="mt-6 text-center border-t border-gray-200 pt-6">
            <Link
              href="/login"
              className="flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Wrapped () {
  return(
    <Suspense>
      <ForgotPasswordPage />
    </Suspense>
  )
}

