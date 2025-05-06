"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CreditCard, DollarSign, Users, Calendar } from "lucide-react"

export default function AdminStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">$45,231</p>
                <p className="text-sm font-medium text-green-500 flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  12%
                </p>
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">
              <ArrowRightIcon className="inline h-3 w-3 mr-1" />
              <span className="font-medium">$4,320</span> this month
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New Users</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">+124</p>
                <p className="text-sm font-medium text-green-500 flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  18%
                </p>
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">
              <ArrowRightIcon className="inline h-3 w-3 mr-1" />
              <span className="font-medium">32</span> this week
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sessions Booked</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">842</p>
                <p className="text-sm font-medium text-green-500 flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  8%
                </p>
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">
              <ArrowRightIcon className="inline h-3 w-3 mr-1" />
              <span className="font-medium">186</span> this week
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">24.8%</p>
                <p className="text-sm font-medium text-red-500 flex items-center">
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                  3%
                </p>
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">
              <ArrowRightIcon className="inline h-3 w-3 mr-1" />
              <span className="font-medium">2.1%</span> decrease from last month
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

