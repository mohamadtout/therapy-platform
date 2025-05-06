"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Send,
  CheckCircle,
  Trash2,
  RefreshCw,
  Edit,
  Plus,
  Save,
  Ban,
  Mail,
  Clock,
  Calendar,
  Phone,
  User,
} from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { messagingService, type MessagingData, type ContactMessage, type EmailTemplate } from "@/lib/api/api-services"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [templateName, setTemplateName] = useState("")
  const [isSavingTemplate, setIsSavingTemplate] = useState(false)
  const [saveAsTemplate, setSaveAsTemplate] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditTemplateDialogOpen, setIsEditTemplateDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [patientFilter, setPatientFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messagingData, setMessagingData] = useState<MessagingData | null>(null)
  const [selectedContactMessage, setSelectedContactMessage] = useState<ContactMessage | null>(null)
  const [isContactDetailOpen, setIsContactDetailOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBlacklistDialogOpen, setIsBlacklistDialogOpen] = useState(false)
  const [emailToBlacklist, setEmailToBlacklist] = useState("")
  const [contactIdToDelete, setContactIdToDelete] = useState<number | null>(null)
  const { toast } = useToast()
  const templateContentRef = useRef<HTMLTextAreaElement>(null)
  const templateSubjectRef = useRef<HTMLInputElement>(null)
  const templateNameRef = useRef<HTMLInputElement>(null)
  const [templateToUse, setTemplateToUse] = useState<EmailTemplate | null>(null)

  // Fetch messaging data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await messagingService.getMessagingData()
        setMessagingData(response.data)
      } catch (error) {
        console.error("Error fetching messaging data:", error)
        toast({
          title: "Error",
          description: "Failed to load messaging data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  useEffect(() => {
    if (templateToUse) {
      setActiveTab("compose")
      setMessageSubject(templateToUse.subject)
      setMessageContent(templateToUse.message)

      toast({
        title: "Template Loaded",
        description: "Template has been loaded into the composer",
      })
      setTemplateToUse(null) // Reset the templateToUse state
    }
  }, [templateToUse, setMessageSubject, setMessageContent, setActiveTab, toast])

  // Filter users based on search term and status filter
  const filteredUsers =
    messagingData?.users.filter((user) => {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase())
    }) || []

  const toggleRecipient = (email: string) => {
    if (selectedRecipients.includes(email)) {
      setSelectedRecipients(selectedRecipients.filter((r) => r !== email))
    } else {
      setSelectedRecipients([...selectedRecipients, email])
    }
  }

  const selectAllRecipients = () => {
    if (selectedRecipients.length === filteredUsers.length) {
      setSelectedRecipients([])
    } else {
      setSelectedRecipients(filteredUsers.map((p) => p.email))
    }
  }

  const handleSendMessage = async () => {
    if (selectedRecipients.length === 0 || !messageSubject || !messageContent) {
      toast({
        title: "Missing Information",
        description: "Please select recipients and provide a subject and message.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Send email response
      await messagingService.sendEmailResponse({
        emails: selectedRecipients,
        subject: messageSubject,
        body: messageContent,
      })

      // Save template if needed (this would be a separate API call in a real implementation)
      if (saveAsTemplate && templateName) {
        // This would call a template saving API in a real implementation
        toast({
          title: "Template Saved",
          description: `"${templateName}" template has been saved for future use`,
        })
      }

      toast({
        title: "Message Sent",
        description: `Message successfully sent to ${selectedRecipients.length} recipients`,
      })

      // Reset form
      setSelectedRecipients([])
      setMessageSubject("")
      setMessageContent("")
      setSaveAsTemplate(false)
      setTemplateName("")

      // Refresh data
      const response = await messagingService.getMessagingData()
      setMessagingData(response.data)

      // Switch to sent tab
      setActiveTab("sent")
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Use an existing template
  const useTemplate = (template: EmailTemplate) => {
    setTemplateToUse(template)
  }

  // Edit a template
  const editTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setIsEditTemplateDialogOpen(true)
  }

  // Create a new template
  const createNewTemplate = () => {
    setSelectedTemplate({
      template_name: "",
      subject: "",
      message: "",
    })
    setIsEditTemplateDialogOpen(true)
  }

  // Save template edits
  const saveTemplateEdits = () => {
    if (!templateNameRef.current || !templateSubjectRef.current || !templateContentRef.current) return

    const updatedTemplate = {
      template_name: templateNameRef.current.value,
      subject: templateSubjectRef.current.value,
      message: templateContentRef.current.value,
    }

    // In a real app, this would save to an API
    toast({
      title: selectedTemplate?.template_name ? "Template Updated" : "Template Created",
      description: selectedTemplate?.template_name
        ? `"${selectedTemplate.template_name}" has been updated`
        : "New template has been created",
    })

    setIsEditTemplateDialogOpen(false)
  }

  // View contact message details
  const viewContactDetails = (message: ContactMessage) => {
    setSelectedContactMessage(message)
    setIsContactDetailOpen(true)

    // If message is unread, mark it as read
    if (message.is_read === 0) {
      markMessageAsRead(message.cu_id)
    }
  }

  // Mark message as read
  const markMessageAsRead = async (contactId: number) => {
    try {
      await messagingService.markAsRead(contactId)

      // Update local state
      if (messagingData) {
        const updatedContactMessages = messagingData.contactUs.map((msg) =>
          msg.cu_id === contactId ? { ...msg, is_read: 1 } : msg,
        )

        setMessagingData({
          ...messagingData,
          contactUs: updatedContactMessages,
        })
      }

      if (selectedContactMessage && selectedContactMessage.cu_id === contactId) {
        setSelectedContactMessage({
          ...selectedContactMessage,
          is_read: 1,
        })
      }
    } catch (error) {
      console.error("Error marking message as read:", error)
      toast({
        title: "Error",
        description: "Failed to mark message as read.",
        variant: "destructive",
      })
    }
  }

  // Delete contact message
  const confirmDeleteContact = (contactId: number) => {
    setContactIdToDelete(contactId)
    setIsDeleteDialogOpen(true)
  }

  const deleteContactMessage = async () => {
    if (!contactIdToDelete) return

    try {
      await messagingService.deleteContact(contactIdToDelete)

      // Update local state
      if (messagingData) {
        const updatedContactMessages = messagingData.contactUs.filter((msg) => msg.cu_id !== contactIdToDelete)

        setMessagingData({
          ...messagingData,
          contactUs: updatedContactMessages,
        })
      }

      // Close dialogs
      setIsDeleteDialogOpen(false)
      if (selectedContactMessage?.cu_id === contactIdToDelete) {
        setIsContactDetailOpen(false)
      }

      toast({
        title: "Message Deleted",
        description: "Contact message has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting contact message:", error)
      toast({
        title: "Error",
        description: "Failed to delete contact message.",
        variant: "destructive",
      })
    } finally {
      setContactIdToDelete(null)
    }
  }

  // Blacklist email
  const confirmBlacklistEmail = (email: string) => {
    setEmailToBlacklist(email)
    setIsBlacklistDialogOpen(true)
  }

  const blacklistEmail = async () => {
    if (!emailToBlacklist) return

    try {
      await messagingService.blacklistEmail(emailToBlacklist)

      // Update local state
      if (messagingData) {
        setMessagingData({
          ...messagingData,
          blacklist: [...messagingData.blacklist, { email: emailToBlacklist }],
        })
      }

      // Close dialog
      setIsBlacklistDialogOpen(false)

      toast({
        title: "Email Blacklisted",
        description: `${emailToBlacklist} has been added to the blacklist.`,
      })
    } catch (error) {
      console.error("Error blacklisting email:", error)
      toast({
        title: "Error",
        description: "Failed to blacklist email. It may already be blacklisted.",
        variant: "destructive",
      })
    } finally {
      setEmailToBlacklist("")
    }
  }

  // Reply to contact message
  const replyToContact = (email: string) => {
    setActiveTab("compose")
    setSelectedRecipients([email])

    // Close contact detail dialog
    setIsContactDetailOpen(false)
  }

  // Refresh data
  const refreshData = async () => {
    try {
      setIsLoading(true)
      const response = await messagingService.getMessagingData()
      setMessagingData(response.data)

      toast({
        title: "Data Refreshed",
        description: "Messaging data has been refreshed.",
      })
    } catch (error) {
      console.error("Error refreshing data:", error)
      toast({
        title: "Error",
        description: "Failed to refresh data.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Messages" description="Manage communication with patients" />

      <main className="p-6">
        <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="blacklist">Blacklist</TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search messages..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Contact Messages
                  {messagingData && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({messagingData.contactUs.filter((msg) => msg.is_read === 0).length} unread)
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : messagingData?.contactUs && messagingData.contactUs.length > 0 ? (
                  <div className="space-y-1">
                    {messagingData.contactUs
                      .filter(
                        (message) =>
                          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((message) => (
                        <div
                          key={message.cu_id}
                          className={`flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer ${message.is_read === 0 ? "bg-blue-50" : ""}`}
                          onClick={() => viewContactDetails(message)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${message.is_read === 0 ? "bg-blue-500" : "bg-transparent"}`}
                              ></div>
                              <span className={`font-medium ${message.is_read === 0 ? "font-semibold" : ""}`}>
                                {message.name}
                              </span>
                              <span className="text-xs text-gray-500">({message.email})</span>
                            </div>
                            <div className="ml-4">
                              <p className={`text-sm ${message.is_read === 0 ? "font-semibold" : ""}`}>
                                {message.subject}
                              </p>
                              <p className="text-sm text-gray-500 truncate">{message.body.substring(0, 100)}...</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">{formatDate(message.date)}</span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  confirmDeleteContact(message.cu_id)
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  confirmBlacklistEmail(message.email)
                                }}
                              >
                                <Ban className="h-4 w-4 text-gray-400 hover:text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No contact messages found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compose" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Compose New Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Select Recipients</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search users..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="py-3 px-4 text-left">
                              <div className="flex items-center">
                                <Checkbox
                                  checked={
                                    selectedRecipients.length === filteredUsers.length && filteredUsers.length > 0
                                  }
                                  onCheckedChange={selectAllRecipients}
                                  id="select-all"
                                />
                                <label htmlFor="select-all" className="ml-2 text-sm font-medium">
                                  Select All
                                </label>
                              </div>
                            </th>
                            <th className="py-3 px-4 text-left">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.email} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <Checkbox
                                  checked={selectedRecipients.includes(user.email)}
                                  onCheckedChange={() => toggleRecipient(user.email)}
                                  id={`user-${user.email}`}
                                />
                              </td>
                              <td className="py-3 px-4">
                                <label htmlFor={`user-${user.email}`} className="cursor-pointer">
                                  {user.email}
                                </label>
                              </td>
                            </tr>
                          ))}
                          {filteredUsers.length === 0 && (
                            <tr>
                              <td colSpan={2} className="py-4 text-center text-sm text-gray-500">
                                No users found matching your search criteria
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 text-sm text-gray-500">{selectedRecipients.length} recipients selected</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        value={messageSubject}
                        onChange={(e) => setMessageSubject(e.target.value)}
                        placeholder="Enter message subject"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Message</label>
                        <Select
                          onValueChange={(value) => {
                            const template = messagingData?.templates.find((t) => t.template_name === value)
                            if (template) {
                              setMessageSubject(template.subject)
                              setMessageContent(template.message)
                            }
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Use template" />
                          </SelectTrigger>
                          <SelectContent>
                            {messagingData?.templates.map((template) => (
                              <SelectItem key={template.template_name} value={template.template_name}>
                                {template.template_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="Type your message here..."
                        className="mt-1 min-h-[200px]"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="save-template"
                          checked={saveAsTemplate}
                          onCheckedChange={(checked) => setSaveAsTemplate(!!checked)}
                        />
                        <label htmlFor="save-template" className="text-sm">
                          Save as template
                        </label>
                      </div>

                      {saveAsTemplate && (
                        <div className="ml-6">
                          <Input
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="Template name"
                            className="max-w-sm"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSendMessage}
                        disabled={
                          isSubmitting ||
                          selectedRecipients.length === 0 ||
                          !messageSubject ||
                          !messageContent ||
                          (saveAsTemplate && !templateName)
                        }
                      >
                        {isSubmitting ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sent" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Sent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : messagingData?.sentEmails && messagingData.sentEmails.length > 0 ? (
                  <div className="space-y-1">
                    {messagingData.sentEmails.map((email) => (
                      <div
                        key={email.batch}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Batch #{email.batch}</span>
                            <span className="text-xs text-gray-500">({email.total_recipients} recipients)</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm">{email.subject}</p>
                            <p className="text-sm text-gray-500 truncate">{email.message.substring(0, 100)}...</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-green-500 text-xs">
                            <CheckCircle className="h-3 w-3" />
                            <span>Sent</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No sent messages found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Message Templates</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {messagingData?.templates &&
                      messagingData.templates.map((template) => (
                        <Card key={template.template_name} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{template.template_name}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => editTemplate(template)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-3">{template.message}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Subject: {template.subject}</span>
                              <Button variant="outline" size="sm" onClick={() => useTemplate(template)}>
                                Use
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                    <Card
                      className="cursor-pointer hover:shadow-md transition-shadow border-dashed"
                      onClick={createNewTemplate}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                        <Plus className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">Create New Template</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blacklist" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Email Blacklist</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : messagingData?.blacklist && messagingData.blacklist.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Enter email to blacklist"
                        value={emailToBlacklist}
                        onChange={(e) => setEmailToBlacklist(e.target.value)}
                      />
                      <Button
                        onClick={() => blacklistEmail()}
                        disabled={!emailToBlacklist || !emailToBlacklist.includes("@")}
                      >
                        Add to Blacklist
                      </Button>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {messagingData.blacklist.map((item) => (
                            <tr key={item.email} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{item.email}</td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Ban className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No blacklisted emails found</p>
                    <div className="mt-4 flex justify-center">
                      <div className="flex items-center gap-2 max-w-md">
                        <Input
                          placeholder="Enter email to blacklist"
                          value={emailToBlacklist}
                          onChange={(e) => setEmailToBlacklist(e.target.value)}
                        />
                        <Button
                          onClick={() => blacklistEmail()}
                          disabled={!emailToBlacklist || !emailToBlacklist.includes("@")}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Template Edit Dialog */}
      <Dialog open={isEditTemplateDialogOpen} onOpenChange={setIsEditTemplateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.template_name ? "Edit Template" : "Create Template"}</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.template_name
                ? "Modify this message template for future use"
                : "Create a new message template for future use"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                defaultValue={selectedTemplate?.template_name}
                placeholder="Enter a name for this template"
                ref={templateNameRef}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-subject">Subject Line</Label>
              <Input
                id="template-subject"
                defaultValue={selectedTemplate?.subject}
                placeholder="Enter subject line"
                ref={templateSubjectRef}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-content">Message Content</Label>
              <Textarea
                id="template-content"
                defaultValue={selectedTemplate?.message}
                placeholder="Type template content here..."
                className="min-h-[200px]"
                ref={templateContentRef}
              />
              <p className="text-xs text-gray-500">
                You can use placeholders like [NAME], [DATE], [TIME] which will be replaced when sending
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveTemplateEdits}>
              <Save className="h-4 w-4 mr-2" />
              {selectedTemplate?.template_name ? "Update Template" : "Save Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Message Detail Dialog */}
      <Dialog open={isContactDetailOpen} onOpenChange={setIsContactDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Contact Message</DialogTitle>
            <DialogDescription>
              Message from {selectedContactMessage?.name} ({selectedContactMessage?.email})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {selectedContactMessage?.name}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {selectedContactMessage?.email}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {selectedContactMessage?.phone}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {selectedContactMessage && formatDate(selectedContactMessage.date)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {selectedContactMessage?.is_read === 1 ? "Read" : "Unread"}
              </Badge>
            </div>

            <div>
              <h3 className="font-medium mb-1">Subject</h3>
              <p className="text-sm">{selectedContactMessage?.subject}</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Message</h3>
              <div className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap">
                {selectedContactMessage?.body}
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => confirmDeleteContact(selectedContactMessage?.cu_id || 0)}
                className="text-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => confirmBlacklistEmail(selectedContactMessage?.email || "")}
                className="text-red-500"
              >
                <Ban className="h-4 w-4 mr-2" />
                Blacklist
              </Button>
            </div>
            <Button onClick={() => replyToContact(selectedContactMessage?.email || "")}>
              <Mail className="h-4 w-4 mr-2" />
              Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the contact message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteContactMessage} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Blacklist Confirmation Dialog */}
      <AlertDialog open={isBlacklistDialogOpen} onOpenChange={setIsBlacklistDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Blacklist Email</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to blacklist {emailToBlacklist}? This email will no longer be able to send contact
              messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={blacklistEmail} className="bg-red-500 hover:bg-red-600">
              Blacklist
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
