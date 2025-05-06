"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X } from "lucide-react"

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hi there! 👋 I'm here to help you with any questions about our services or packages. How can I assist you today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: inputValue }])

    // Clear input
    setInputValue("")

    // Simulate response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content:
            "Thanks for your message! If you'd like to speak with a customer support representative, I can connect you right away. Would you prefer that, or can I help answer any specific questions about our packages or services?",
        },
      ])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-base">Support Chat</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-80 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

