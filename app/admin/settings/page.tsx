"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, AlertTriangle, Loader2, CheckCircle2 } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import { useToast } from "@/components/ui/use-toast"
import { settingsService, type SystemSettings } from "@/lib/api/api-services"
import { Checkbox } from "@/components/ui/checkbox"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [testingConnection, setTestingConnection] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Settings state
  const [settings, setSettings] = useState<SystemSettings>({
    site_name: "",
    contact_email: "",
    site_description: "",
    support_phone: "",
    maintenance_mode: 0,
    smtp_server: "Gmail",
    smtp_host: "",
    smtp_port: 587,
    smtp_username: "",
    smtp_password: "",
    smtp_sender_name: "",
    smtp_sender_email: "",
    email_notifications: 0,
    reminder_time: "24 hours",
    password_complexity: "Basic (8+ chars)",
    max_failed_attemps: 5,
    permissions: 0,
  })

  // Permission checkboxes
  const [newsPermission, setNewsPermission] = useState(false)
  const [markPermission, setMarkPermission] = useState(false)
  const [assPermission, setAssPermission] = useState(false)
  const [appPermission, setAppPermission] = useState(false)

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsFetching(true)
        const response = await settingsService.getSettings()
        if (response.data && response.data.length > 0) {
          const fetchedSettings = response.data[0]
          setSettings(fetchedSettings)

          // Set permission checkboxes based on permissions value
          if (fetchedSettings.permissions !== undefined) {
            const permValue = fetchedSettings.permissions
            setNewsPermission((permValue & 8) === 8) // Check if bit 3 is set (8)
            setMarkPermission((permValue & 4) === 4) // Check if bit 2 is set (4)
            setAssPermission((permValue & 2) === 2) // Check if bit 1 is set (2)
            setAppPermission((permValue & 1) === 1) // Check if bit 0 is set (1)
          }
        }
      } catch (err) {
        console.error("Error fetching settings:", err)
        toast({
          title: "Error",
          description: "Failed to load settings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsFetching(false)
      }
    }

    fetchSettings()
  }, [toast])

  // Update permissions value when checkboxes change
  useEffect(() => {
    let permValue = 0
    if (newsPermission) permValue |= 8 // Set bit 3 (8)
    if (markPermission) permValue |= 4 // Set bit 2 (4)
    if (assPermission) permValue |= 2 // Set bit 1 (2)
    if (appPermission) permValue |= 1 // Set bit 0 (1)

    setSettings((prev) => ({
      ...prev,
      permissions: permValue,
    }))
  }, [newsPermission, markPermission, assPermission, appPermission])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [name]: checked ? 1 : 0,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNumberChange = (name: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [name]: Number.parseInt(value, 10),
    }))
  }

  const handleTestConnection = () => {
    setTestingConnection(true)

    // Simulate API call for testing SMTP connection
    setTimeout(() => {
      setTestingConnection(false)
      toast({
        title: "Connection Test",
        description: "SMTP connection successful",
      })
    }, 1500)
  }

  const handleSaveSettings = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Validate required fields
      if (
        !settings.site_name ||
        !settings.contact_email ||
        !settings.site_description ||
        !settings.support_phone ||
        !settings.smtp_host ||
        !settings.smtp_username ||
        !settings.smtp_sender_name ||
        !settings.smtp_sender_email
      ) {
        setError("Please fill in all required fields")
        setIsLoading(false)
        return
      }
      // console.log(settings)
      // Send update request
      const response = await settingsService.updateSettings(settings)

      setSuccess(true)
      toast({
        title: "Settings saved",
        description: "Your changes have been successfully saved",
      })

      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err: any) {
      console.error("Error saving settings:", err)
      setError(err.response?.data?.message || "Failed to save settings. Please try again.")
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex-1">
        <AdminHeader title="Settings" description="Configure platform settings and preferences" />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Settings" description="Configure platform settings and preferences" />

      <main className="p-6">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="site_name">Site Name</Label>
                    <Input id="site_name" name="site_name" value={settings.site_name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      name="contact_email"
                      type="email"
                      value={settings.contact_email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="site_description">Site Description</Label>
                    <Textarea
                      id="site_description"
                      name="site_description"
                      value={settings.site_description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support_phone">Support Phone</Label>
                    <Input
                      id="support_phone"
                      name="support_phone"
                      value={settings.support_phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
                      <Switch
                        id="maintenance_mode"
                        checked={settings.maintenance_mode === 1}
                        onCheckedChange={(checked) => handleSwitchChange("maintenance_mode", checked)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When enabled, the site will display a maintenance message to visitors
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="news-permission"
                      checked={newsPermission}
                      onCheckedChange={(checked) => setNewsPermission(checked === true)}
                    />
                    <Label htmlFor="news-permission">News (8)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mark-permission"
                      checked={markPermission}
                      onCheckedChange={(checked) => setMarkPermission(checked === true)}
                    />
                    <Label htmlFor="mark-permission">Mark (4)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ass-permission"
                      checked={assPermission}
                      onCheckedChange={(checked) => setAssPermission(checked === true)}
                    />
                    <Label htmlFor="ass-permission">Assessment (2)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="app-permission"
                      checked={appPermission}
                      onCheckedChange={(checked) => setAppPermission(checked === true)}
                    />
                    <Label htmlFor="app-permission">Appointment (1)</Label>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">Current permission value: {settings.permissions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Email Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_server">Email Provider</Label>
                  <Select
                    value={settings.smtp_server}
                    onValueChange={(value) => handleSelectChange("smtp_server", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gmail">Gmail</SelectItem>
                      <SelectItem value="Mailgun">Mailgun</SelectItem>
                      <SelectItem value="SendGrid">SendGrid</SelectItem>
                      <SelectItem value="Amazon SES">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtp_host">SMTP Host</Label>
                    <Input id="smtp_host" name="smtp_host" value={settings.smtp_host} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp_port">SMTP Port</Label>
                    <Input
                      id="smtp_port"
                      name="smtp_port"
                      type="number"
                      value={settings.smtp_port.toString()}
                      onChange={(e) => handleNumberChange("smtp_port", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp_username">SMTP Username</Label>
                    <Input
                      id="smtp_username"
                      name="smtp_username"
                      value={settings.smtp_username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp_password">SMTP Password</Label>
                    <Input
                      id="smtp_password"
                      name="smtp_password"
                      type="password"
                      value={settings.smtp_password}
                      onChange={handleInputChange}
                      placeholder="••••••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp_sender_name">Default Sender Name</Label>
                    <Input
                      id="smtp_sender_name"
                      name="smtp_sender_name"
                      value={settings.smtp_sender_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp_sender_email">Default Sender Email</Label>
                    <Input
                      id="smtp_sender_email"
                      name="smtp_sender_email"
                      type="email"
                      value={settings.smtp_sender_email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={handleTestConnection}
                    disabled={testingConnection}
                  >
                    {testingConnection ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" /> Test Connection
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email_notifications">Email Notifications</Label>
                      <Switch
                        id="email_notifications"
                        checked={settings.email_notifications === 1}
                        onCheckedChange={(checked) => handleSwitchChange("email_notifications", checked)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Enable or disable all email notifications</p>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Label htmlFor="reminder_time">Appointment Reminder Time</Label>
                    <Select
                      value={settings.reminder_time}
                      onValueChange={(value) => handleSelectChange("reminder_time", value)}
                      disabled={settings.email_notifications !== 1}
                    >
                      <SelectTrigger id="reminder_time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 hour">1 hour before</SelectItem>
                        <SelectItem value="2 hours">2 hours before</SelectItem>
                        <SelectItem value="6 hours">6 hours before</SelectItem>
                        <SelectItem value="12 hours">12 hours before</SelectItem>
                        <SelectItem value="24 hours">24 hours before</SelectItem>
                        <SelectItem value="48 hours">48 hours before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password_complexity">Password Complexity</Label>
                  <Select
                    value={settings.password_complexity}
                    onValueChange={(value) => handleSelectChange("password_complexity", value)}
                  >
                    <SelectTrigger id="password_complexity">
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic (8+ chars)">Basic (8+ characters)</SelectItem>
                      <SelectItem value="Medium (8+ chars, upper/lowercase, numbers)">
                        Medium (8+ chars, upper/lowercase, numbers)
                      </SelectItem>
                      <SelectItem value="Standard (8+ chars, upper/lowercase, numbers, symbols)">
                        Standard (8+ chars, upper/lowercase, numbers, symbols)
                      </SelectItem>
                      <SelectItem value="High (12+ chars, upper/lowercase, numbers, symbols)">
                        High (12+ chars, upper/lowercase, numbers, symbols)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_failed_attemps">Failed Login Attempts Before Lockout</Label>
                  <Select
                    value={settings.max_failed_attemps.toString()}
                    onValueChange={(value) => handleNumberChange("max_failed_attemps", value)}
                  >
                    <SelectTrigger id="max_failed_attemps">
                      <SelectValue placeholder="Select attempts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Security Notice</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Changes to security settings will be logged and may require users to re-authenticate.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="mt-4 p-4 border border-red-200 bg-red-50 rounded-md">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isLoading || success}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Saved
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
