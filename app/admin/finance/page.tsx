"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Download,
  Search,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  FileText,
  Users,
} from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import RevenueChart from "@/components/admin/revenue-chart"

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock transaction data
  const transactions = [
    {
      id: "TRX-1001",
      customer: "Sarah Johnson",
      type: "Package Purchase",
      amount: 499.99,
      status: "Completed",
      date: "2023-03-15",
      method: "Credit Card",
    },
    {
      id: "TRX-1002",
      customer: "Michael Williams",
      type: "Assessment",
      amount: 149.99,
      status: "Completed",
      date: "2023-03-14",
      method: "PayPal",
    },
    {
      id: "TRX-1003",
      customer: "Jennifer Davis",
      type: "Consultation",
      amount: 99.99,
      status: "Pending",
      date: "2023-03-18",
      method: "Credit Card",
    },
    {
      id: "TRX-1004",
      customer: "Robert Miller",
      type: "Package Purchase",
      amount: 699.99,
      status: "Completed",
      date: "2023-03-12",
      method: "Bank Transfer",
    },
    {
      id: "TRX-1005",
      customer: "Jessica Wilson",
      type: "Assessment",
      amount: 149.99,
      status: "Failed",
      date: "2023-03-16",
      method: "Credit Card",
    },
    {
      id: "TRX-1006",
      customer: "David Brown",
      type: "Consultation",
      amount: 99.99,
      status: "Completed",
      date: "2023-03-13",
      method: "PayPal",
    },
    {
      id: "TRX-1007",
      customer: "Maria Martinez",
      type: "Package Purchase",
      amount: 499.99,
      status: "Completed",
      date: "2023-03-11",
      method: "Credit Card",
    },
  ]

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Finance" description="Manage financial transactions and reports" />

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold">$62,523.48</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12.5%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pending Payments</p>
                  <p className="text-2xl font-bold">$1,245.80</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">3.2%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Average Transaction</p>
                  <p className="text-2xl font-bold">$248.99</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8.7%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <RevenueChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Revenue by Service</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Revenue by service chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Payment methods chart would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2 flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <a href="#transactions">View All</a>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">ID</th>
                        <th className="text-left py-3 px-4 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.slice(0, 5).map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{transaction.id}</td>
                          <td className="py-3 px-4">{transaction.customer}</td>
                          <td className="py-3 px-4">{transaction.type}</td>
                          <td className="py-3 px-4">${transaction.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{transaction.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search transactions..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Date Range</span>
                    </div>

                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  All Transactions
                  <span className="ml-2 text-sm font-normal text-gray-500">({transactions.length} transactions)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">ID</th>
                        <th className="text-left py-3 px-4 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Method</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{transaction.id}</td>
                          <td className="py-3 px-4">{transaction.customer}</td>
                          <td className="py-3 px-4">{transaction.type}</td>
                          <td className="py-3 px-4">${transaction.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{transaction.date}</td>
                          <td className="py-3 px-4">{transaction.method}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {transactions.length} of {transactions.length} transactions
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search invoices..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>

                    <Button>Create Invoice</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">Invoice list would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Revenue Report</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Comprehensive analysis of revenue streams and growth trends
                    </p>
                    <Button variant="outline" size="sm">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-4">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Financial Statement</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Detailed financial statements including profit and loss
                    </p>
                    <Button variant="outline" size="sm">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mb-4">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Customer Analysis</h3>
                    <p className="text-sm text-gray-500 mb-4">Insights into customer behavior and spending patterns</p>
                    <Button variant="outline" size="sm">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Custom Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Report Type</label>
                      <Select defaultValue="revenue">
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Revenue Report</SelectItem>
                          <SelectItem value="transactions">Transaction Report</SelectItem>
                          <SelectItem value="customers">Customer Report</SelectItem>
                          <SelectItem value="services">Services Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Date Range</label>
                      <div className="flex items-center gap-2">
                        <div className="w-full">
                          <Input type="date" />
                        </div>
                        <span>to</span>
                        <div className="w-full">
                          <Input type="date" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Additional Options</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="include-charts" className="h-4 w-4" />
                        <label htmlFor="include-charts" className="text-sm">
                          Include Charts
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="detailed-breakdown" className="h-4 w-4" />
                        <label htmlFor="detailed-breakdown" className="text-sm">
                          Detailed Breakdown
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="compare-previous" className="h-4 w-4" />
                        <label htmlFor="compare-previous" className="text-sm">
                          Compare to Previous Period
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Generate Custom Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

