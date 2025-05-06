"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Send, Paperclip, User } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

// Sample data
const conversations = [
  {
    id: 1,
    name: "Samir Al-Farsi",
    relation: "Parent of Ahmed",
    lastMessage: "Thank you for the update on Ahmed's progress. We've been practicing at home as suggested.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    name: "Aisha Khalid",
    relation: "Parent of Fatima",
    lastMessage: "Can we reschedule Fatima's appointment next week? We have a family event.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Yusuf Rahman",
    relation: "Parent of Mohammed",
    lastMessage: "I've uploaded the assessment forms you requested. Please let me know if you need anything else.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 4,
    name: "Nadia Mahmoud",
    relation: "Parent of Layla",
    lastMessage: "Layla has been practicing her exercises daily. We're seeing improvement!",
    time: "1 week ago",
    unread: false,
  },
]

// Sample messages for a conversation
const messages = [
  {
    id: 1,
    sender: "therapist",
    content: "Hello Mr. Al-Farsi, I wanted to update you on Ahmed's progress after today's session.",
    time: "10:30 AM",
    date: "Today",
  },
  {
    id: 2,
    sender: "parent",
    content: "Hi Sarah, thank you for reaching out. How did he do today?",
    time: "10:45 AM",
    date: "Today",
  },
  {
    id: 3,
    sender: "therapist",
    content:
      "Ahmed did very well today! He's making excellent progress with his articulation exercises. He was able to correctly pronounce the /s/ sound in 8 out of 10 attempts, which is a significant improvement from last week.",
    time: "11:00 AM",
    date: "Today",
  },
  {
    id: 4,
    sender: "therapist",
    content: "I've also prepared some exercises for you to practice at home. Would you like me to send them to you?",
    time: "11:02 AM",
    date: "Today",
  },
  {
    id: 5,
    sender: "parent",
    content:
      "That's wonderful news! Yes, please send the exercises. We've been practicing daily as you suggested, and it seems to be helping.",
    time: "11:15 AM",
    date: "Today",
  },
  {
    id: 6,
    sender: "therapist",
    content:
      "Great! I'll email the exercises to you shortly. Keep up the good work with the daily practice - it's definitely making a difference.",
    time: "11:20 AM",
    date: "Today",
  },
  {
    id: 7,
    sender: "parent",
    content: "Thank you for the update on Ahmed's progress. We've been practicing at home as suggested.",
    time: "2:45 PM",
    date: "Today",
  },
]

export default function TherapistMessages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.relation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // In a real app, you would send this to an API
    // console.log("Sending message:", newMessage)

    // Clear the input
    setNewMessage("")
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/therapist">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Communicate with parents and caregivers</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[calc(100vh-220px)] min-h-[500px] gap-4">
        {/* Conversations list */}
        <Card className="w-full md:w-1/3 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedConversation.id === conversation.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-gray-500">{conversation.relation}</p>
                      <p className="text-sm truncate mt-1">
                        {conversation.unread && (
                          <span className="inline-block w-2 h-2 bg-onesti-purple rounded-full mr-1"></span>
                        )}
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <div className="rounded-full bg-gray-100 p-3 mb-2">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="font-medium">No Conversations Found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm
                    ? "No conversations match your search criteria."
                    : "You don't have any conversations yet."}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Message thread */}
        <Card className="w-full md:w-2/3 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt={selectedConversation.name} />
                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500">{selectedConversation.relation}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isTherapist = message.sender === "therapist"

                  return (
                    <div key={message.id} className={`flex ${isTherapist ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] ${isTherapist ? "bg-onesti-purple text-white" : "bg-gray-100"} rounded-lg p-3`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${isTherapist ? "text-purple-200" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-4 border-t">
                <div className="flex items-end space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="min-h-[80px] resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="rounded-full bg-onesti-purple hover:bg-purple-800"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="rounded-full bg-gray-100 p-4 mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="font-medium">No Conversation Selected</h3>
                <p className="text-sm text-gray-500 mt-1">Select a conversation from the list to view messages</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

