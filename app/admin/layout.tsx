"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Only render interactive UI elements on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Navigation items
  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Appointments", href: "/admin/appointments" },
    { name: "Users", href: "/admin/users" },
    { name: "Therapists", href: "/admin/therapists" },
    { name: "Packages", href: "/admin/packages" },
    { name: "Screening Assessments", href: "/admin/assessments" },
    { name: "Assessments Catalog", href: "/admin/assessments-catalog" },
    { name: "Finance", href: "/admin/finance" },
    { name: "Analytics", href: "/admin/analytics" },
    { name: "Messages", href: "/admin/messages" },
    { name: "Blogs", href: "/admin/blogs" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Settings", href: "/admin/settings" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Static sidebar - using minimal HTML */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r z-30 overflow-y-auto">
        <div className="p-4 border-b">
          <Link href="/admin" className="text-xl font-bold text-purple-700">
            [COMPANY] Admin
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {/* Using simple <a> tags during server rendering, will be hydrated with Links on client */}
            {mounted ? (
              <>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm rounded-md ${
                        pathname === item.href
                          ? "bg-purple-50 text-purple-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <div className="flex items-center px-4 py-3 text-sm rounded-md">
                      {item.name}
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="ml-64 w-full">{children}</div>
    </div>
  )
}

