"use client"

import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

interface AdminHeaderProps {
  title: string
  description: string
}

export default function AdminHeader({ title, description }: AdminHeaderProps) {
  // Add mounting state to prevent hydration mismatches
  const [mounted, setMounted] = useState(false);
  
  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <header className="sticky top-0 z-10 border-b bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            {mounted ? (
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-[200px] lg:w-[300px] pl-8" 
                suppressHydrationWarning 
              />
            ) : (
              <div className="h-10 w-[200px] lg:w-[300px] rounded-md border bg-background pl-8 flex items-center text-muted-foreground">
                Search...
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">New user registration</span>
                  <span className="text-xs text-muted-foreground">Sarah Johnson just signed up</span>
                  <span className="text-xs text-muted-foreground">2 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Appointment canceled</span>
                  <span className="text-xs text-muted-foreground">Michael Chen canceled his session</span>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Payment received</span>
                  <span className="text-xs text-muted-foreground">$420.00 payment for Thrive Path package</span>
                  <span className="text-xs text-muted-foreground">3 hours ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><a onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('level');
                window.location.href = '/';
              }}>Logout</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

