"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { adminUsersService } from "@/lib/api/api-services"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string | number
  email: string
  nickname: string
  level: string
  pfp: string | null
  authorized: number
}

export default function RecentUsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Fetch recent users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const response = await adminUsersService.getAllUsers(0) // Get first page
        if (response.data && response.data.users) {
          // Only show first 5 users for the dashboard
          setUsers(response.data.users.slice(0, 5))
        }
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Get role name from level
  const getRoleName = (level: string) => {
    switch (level) {
      case 'patient':
        return "Parent"
      case 'therapist':
        return "Therapist"
      case 'admin':
        return "Admin"
      default:
        return "Unknown"
    }
  }

  // Handle delete user
  const handleDeleteUser = async (userId: string | number) => {
    try {
      await adminUsersService.deleteUser(userId)
      toast({
        title: "User Deactivated",
        description: "The user has been deactivated from the platform",
      })
      // Update the local state to reflect the change
      setUsers(users.map((user) => (user.id === userId ? { ...user, authorized: 2 } : user)))
    } catch (error) {
      console.error("Error deactivating user:", error)
      toast({
        title: "Error",
        description: "Failed to deactivate user. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-sm font-medium text-muted-foreground">
            <th className="pb-3 pl-4">User</th>
            <th className="pb-3">Role (Level)</th>
            <th className="pb-3">Authorized</th>
            <th className="pb-3 pr-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="py-3 text-center">
                Loading users...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-3 text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="py-3 pl-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.pfp || ""} alt={user.nickname} />
                      <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.nickname}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  {getRoleName(user.level)}
                </td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div
                      className={`mr-2 h-2 w-2 rounded-full ${
                        user.authorized === 1 ? "bg-green-500" : user.authorized === 0 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    />
                    <span>{user.authorized === 1 ? "Yes" : user.authorized === 0 ? "No" : "Deactivated"}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => (window.location.href = `/admin/users`)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.authorized !== 2 && (
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Deactivate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
