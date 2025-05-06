"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
} from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import RevenueChart from "@/components/admin/revenue-chart"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="flex-1">
      <AdminHeader title="Analytics" description="Comprehensive analytics and insights" />

      <main className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold">Analytics Dashboard</h2>

          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Users</p>
                  <p className="text-2xl font-bold">487</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12%</span>
                <span className="text-gray-500 ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Appointments</p>
                  <p className="text-2xl font-bold">842</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8%</span>
                <span className="text-gray-500 ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Assessments</p>
                  <p className="text-2xl font-bold">356</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">15%</span>
                <span className="text-gray-500 ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                  <p className="text-2xl font-bold">24.8%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">2.3%</span>
                <span className="text-gray-500 ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">User Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <RevenueChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Traffic sources chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">User Demographics</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">User demographics chart would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-500">
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <span>Homepage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">12,543 views</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-500">
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <span>Assessments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">8,721 views</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-500">
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <span>Packages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">6,482 views</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-500">
                          <span className="text-sm font-medium">4</span>
                        </div>
                        <span>Resources</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">5,934 views</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-500">
                          <span className="text-sm font-medium">5</span>
                        </div>
                        <span>About Us</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">4,217 views</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Device Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Mobile</p>
                        <p className="text-sm text-gray-500">58%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "58%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Desktop</p>
                        <p className="text-sm text-gray-500">32%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Tablet</p>
                        <p className="text-sm text-gray-500">10%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Browser Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Chrome</p>
                        <p className="text-sm text-gray-500">64%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "64%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Safari</p>
                        <p className="text-sm text-gray-500">22%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "22%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Firefox</p>
                        <p className="text-sm text-gray-500">8%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Edge</p>
                        <p className="text-sm text-gray-500">6%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: "6%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">User Growth</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">User growth chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">User Retention</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">User retention chart would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-4">Age Distribution</h4>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-gray-500">Age distribution chart would go here</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-4">Gender Distribution</h4>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-gray-500">Gender distribution chart would go here</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-4">Location Distribution</h4>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-gray-500">Location distribution chart would go here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">Engagement metrics chart would go here</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Avg. Session Duration</p>
                      <p className="text-2xl font-bold">4m 32s</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">12%</span>
                    <span className="text-gray-500 ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pages per Session</p>
                      <p className="text-2xl font-bold">3.8</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">8%</span>
                    <span className="text-gray-500 ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Bounce Rate</p>
                      <p className="text-2xl font-bold">32.4%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                      <ArrowDownRight className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">3.2%</span>
                    <span className="text-gray-500 ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Feature Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Assessments</p>
                      <p className="text-sm text-gray-500">78%</p>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Appointments</p>
                      <p className="text-sm text-gray-500">65%</p>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Resources</p>
                      <p className="text-sm text-gray-500">42%</p>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Milestone Tracker</p>
                      <p className="text-sm text-gray-500">38%</p>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "38%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">Conversion funnel chart would go here</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Conversion by Source</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Conversion by source chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Conversion by Device</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Conversion by device chart would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Conversion Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Assessment to Appointment</h4>
                    <p className="text-2xl font-bold">42.8%</p>
                    <div className="mt-2 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">5.2%</span>
                      <span className="text-gray-500 ml-1">from last period</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Appointment to Package</h4>
                    <p className="text-2xl font-bold">28.3%</p>
                    <div className="mt-2 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">3.7%</span>
                      <span className="text-gray-500 ml-1">from last period</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Overall Conversion</h4>
                    <p className="text-2xl font-bold">12.1%</p>
                    <div className="mt-2 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">2.3%</span>
                      <span className="text-gray-500 ml-1">from last period</span>
                    </div>
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

