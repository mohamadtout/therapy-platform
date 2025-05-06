"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpIcon,
  Users,
  Calendar,
  DollarSign,
  Package,
  BarChart2,
  FileText,
  Shield,
  Clock,
  Database,
  Activity,
  CheckCircle,
} from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import RecentUsersTable from "@/components/admin/recent-users-table"
import RecentAppointmentsTable from "@/components/admin/recent-appointments-table"
import AdminStats from "@/components/admin/admin-stats"
import RevenueChart from "@/components/admin/revenue-chart"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex-1">
      <AdminHeader title="Dashboard" description="Welcome to the [COMPANY] admin dashboard" />

      <main className="p-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-xl mb-4">
            <TabsTrigger type="button" value="overview">Overview</TabsTrigger>
            <TabsTrigger type="button" value="analytics">Analytics</TabsTrigger>
            <TabsTrigger type="button" value="system">System</TabsTrigger>
            <TabsTrigger type="button" value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentUsersTable />
                  <div className="mt-4 text-center">
                    <Button type="button" asChild variant="outline" size="sm">
                      <Link href="/admin/users">View All Users</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recent Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentAppointmentsTable />
                  <div className="mt-4 text-center">
                    <Button type="button" asChild variant="outline" size="sm">
                      <Link href="/admin/appointments">View All Appointments</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Package Sales</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <RevenueChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">System Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Link href="/admin/packages">
                        <Package className="h-6 w-6 mb-2" />
                        <span>Manage Packages</span>
                      </Link>
                    </Button>
                    <Button type="button" asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Link href="/admin/appointments">
                        <Calendar className="h-6 w-6 mb-2" />
                        <span>Manage Appointments</span>
                      </Link>
                    </Button>
                    <Button type="button" asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Link href="/admin/users">
                        <Users className="h-6 w-6 mb-2" />
                        <span>Manage Users</span>
                      </Link>
                    </Button>
                    <Button type="button" asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Link href="/admin/finance">
                        <DollarSign className="h-6 w-6 mb-2" />
                        <span>Financial Reports</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                      <p className="text-2xl font-bold">24.8%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <BarChart2 className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">3.2%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Avg. Session Duration</p>
                      <p className="text-2xl font-bold">48 min</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">5.1%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Assessment Completion</p>
                      <p className="text-2xl font-bold">78.3%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">2.5%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <RevenueChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Acquisition</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">User acquisition chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assessment Metrics</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Assessment metrics chart would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">System Status</p>
                      <p className="text-2xl font-bold text-green-500">Operational</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <Shield className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">Last checked: Today at 10:30 AM</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Database Usage</p>
                      <p className="text-2xl font-bold">42.8%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Database className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">3.2 GB of 7.5 GB used</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">API Requests</p>
                      <p className="text-2xl font-bold">1.2M</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                      <Activity className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">Last 30 days</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="font-medium">System Update Completed</span>
                      </div>
                      <span className="text-sm text-gray-500">Today, 09:15 AM</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      System updated to version 2.4.0 successfully. All services operational.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span className="font-medium">Database Maintenance</span>
                      </div>
                      <span className="text-sm text-gray-500">Yesterday, 11:30 PM</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Scheduled database maintenance completed. Performance optimizations applied.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span className="font-medium">Security Alert</span>
                      </div>
                      <span className="text-sm text-gray-500">Mar 15, 2023, 02:45 PM</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Multiple failed login attempts detected. IP address blocked.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View All Logs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Backup Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Last Backup</p>
                        <p className="text-sm text-gray-500">Today, 03:00 AM</p>
                      </div>
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span>Successful</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Next Scheduled Backup</p>
                        <p className="text-sm text-gray-500">Tomorrow, 03:00 AM</p>
                      </div>
                      <Button size="sm">Run Now</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Backup Retention</p>
                        <p className="text-sm text-gray-500">30 days</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">CPU Usage</p>
                        <p className="text-sm text-gray-500">32%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Memory Usage</p>
                        <p className="text-sm text-gray-500">45%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Storage Usage</p>
                        <p className="text-sm text-gray-500">68%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Platform Name</label>
                          <input
                            type="text"
                            value="[COMPANY] Platform"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Support Email</label>
                          <input
                            type="email"
                            value="support@[COMPANY].com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Platform Description</label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                          defaultValue="[COMPANY] is a comprehensive platform for pediatric therapy and assessment services."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                        </div>
                        <div className="h-6 w-11 bg-primary rounded-full relative">
                          <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session Timeout</p>
                          <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                        </div>
                        <select className="border border-gray-300 rounded-md px-3 py-1">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>2 hours</option>
                          <option>4 hours</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Password Policy</p>
                          <p className="text-sm text-gray-500">Minimum requirements for passwords</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Appointment Reminders</p>
                          <p className="text-sm text-gray-500">Send email reminders for appointments</p>
                        </div>
                        <div className="h-6 w-11 bg-primary rounded-full relative">
                          <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Assessment Notifications</p>
                          <p className="text-sm text-gray-500">Send emails when assessments are completed</p>
                        </div>
                        <div className="h-6 w-11 bg-primary rounded-full relative">
                          <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-500">Send promotional emails to users</p>
                        </div>
                        <div className="h-6 w-11 bg-gray-200 rounded-full relative">
                          <div className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
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

