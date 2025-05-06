"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Calendar, Users, FileText, Settings, Home, LogOut, Menu, X, Bell, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Dashboard", href: "/therapist", icon: Home },
  { name: "Appointments", href: "/therapist/appointments", icon: Calendar },
  { name: "Clients", href: "/therapist/clients", icon: Users },
  { name: "Session Notes", href: "/therapist/notes", icon: FileText },
  { name: "Availability", href: "/therapist/availability", icon: Clock },
  { name: "Profile", href: "/therapist/profile", icon: Settings },
]

export default function TherapistLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          {sidebarOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          )}

          <div
            className={`fixed inset-0 z-40 flex transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-shrink-0 items-center px-4">
                <Image
                  src="/images/logo.png"
                  alt="[COMPANY] Logo"
                  width={150}
                  height={50}
                  className="h-8 w-auto"
                />
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center rounded-md px-2 py-2 text-base font-medium ${
                        pathname === item.href
                          ? "bg-gray-100 text-onesti-purple"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-4 h-6 w-6 flex-shrink-0 ${
                          pathname === item.href ? "text-onesti-purple" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <Link href="/" className="group block flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <Avatar className="inline-block h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt="Avatar" />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Sarah Thompson</p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Speech Therapist</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4">
            <Image
              src="/images/logo.png"
              alt="[COMPANY] Logo"
              width={150}
              height={50}
              className="h-8 w-auto"
            />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? "bg-gray-100 text-onesti-purple"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      pathname === item.href ? "text-onesti-purple" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <Link href="/" className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <Avatar className="inline-block h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Sarah Thompson</p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Speech Therapist</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1"></div>
            <div className="ml-4 flex items-center gap-4 md:ml-6">
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">View notifications</span>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

