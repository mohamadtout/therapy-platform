"use client"

import { useState } from "react"
import Link from "next/link"
import { authService } from "@/lib/api/api-services"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const {toast} = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Reset states
    setError("")
    setIsSubmitting(true)

    // Basic validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }
    try {
      // Simulate API call
      const response = await authService.requestPasswordReset(email);

      if(response.status == 200){
        toast({
          title: "Request Sent",
          description: response.data.message,
          variant: "default"
        })
        setIsSubmitted(true)
      }
    } catch (err : any) {
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
    }finally{
      setIsSubmitting(false)
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">We will send you an email with a link to reset your password</p>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
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
                {isSubmitting ? "Sending..." : "Send reset link"}
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
              <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
              <p className="mt-2 text-sm text-gray-600">We have sent a password reset link to {email}</p>
              <p className="mt-2 text-sm text-gray-500">Did not receive the email? Check your spam folder or</p>
              <button
                type="button"
                className="mt-1 text-sm text-indigo-600 hover:text-indigo-500"
                onClick={() => setIsSubmitted(false)}
              >
                try another email address
              </button>
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

