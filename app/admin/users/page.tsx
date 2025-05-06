"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowUpDown, Download, Filter, MoreHorizontal, Search, Trash, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminHeader from "@/components/admin/admin-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { adminUsersService } from "@/lib/api/api-services"

// User interface based on backend data
interface User {
  id: string | number
  email: string
  nickname: string
  level: string
  pfp: string | null
  authorized: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [authorizedFilter, setAuthorizedFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [newUser, setNewUser] = useState({
    email: "",
    nickname: "",
    level: '',
    password: "",
    confirmPassword: "",
    authorized: 1,
  })
  const { toast } = useToast()

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await adminUsersService.getAllUsers(currentPage)
      if (response.data && response.data.users) {
        setUsers(response.data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAuthorized = authorizedFilter === "all" || user.authorized.toString() === authorizedFilter
    const matchesLevel = levelFilter === "all" || user.level.toString() === levelFilter

    return matchesSearch && matchesAuthorized && matchesLevel
  })

  // Handle input change for new user form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  // Handle level selection for new user
  const handleLevelChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, level: value }))
  }

  // Handle authorized selection for new user
  const handleAuthorizedChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, authorized: Number.parseInt(value) }))
  }

  // Handle user creation form submission
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password match
    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    try {
      await adminUsersService.createUser({
        email: newUser.email,
        nickname: newUser.nickname,
        password: newUser.password,
        level: newUser.level,
        authorized: newUser.authorized,
      })

      toast({
        title: "User Created",
        description: `${newUser.nickname} has been added successfully`,
      })

      // Reset form and close modal
      setNewUser({
        email: "",
        nickname: "",
        level: '',
        password: "",
        confirmPassword: "",
        authorized: 1,
      })
      setIsAddUserModalOpen(false)
      fetchUsers() // Refresh the user list
    } catch (error) {
      console.error("Error creating user:", error)
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle edit user
  const handleEditUser = (user: User) => {
    setCurrentUser(user)
    setIsEditUserModalOpen(true)
  }

  // Handle save edited user
  const handleSaveEditedUser = async () => {
    if (!currentUser) return

    try {
      await adminUsersService.editUser({
        editId: currentUser.id,
        email: currentUser.email,
        nickname: currentUser.nickname,
        level: currentUser.level,
        authorized: currentUser.authorized,
      })

      toast({
        title: "User Updated",
        description: "User information has been updated successfully",
      })
      setIsEditUserModalOpen(false)
      fetchUsers() // Refresh the user list
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
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
      fetchUsers() // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to deactivate user. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Function to export table data to CSV
  const exportToCSV = (data: User[]) => {
    // Column headers
    const headers = ["ID", "Name", "Email", "Level", "Authorized"]

    // Format data rows
    const rows = data.map((user) => [
      user.id,
      user.nickname,
      user.email,
      user.level,
      user.authorized === 1 ? "Yes" : user.authorized === 0 ? "No" : "Deactivated",
    ])

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `users-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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

  // Get authorized status text
  const getAuthorizedText = (authorized: number) => {
    switch (authorized) {
      case 0:
        return "No"
      case 1:
        return "Yes"
      case 2:
        return "Deactivated"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="flex-1">
      <AdminHeader title="User Management" description="View and manage platform users" />

      <main className="p-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts, permissions, and access</CardDescription>
            </div>
            <div className="mt-4 flex flex-col sm:mt-0 sm:flex-row sm:gap-2">
              <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account for access to the platform.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateUser}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nickname" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="nickname"
                          name="nickname"
                          value={newUser.nickname}
                          onChange={handleInputChange}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={newUser.email}
                          onChange={handleInputChange}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="level" className="text-right">
                          Level
                        </Label>
                        <Select value={newUser.level.toString()} onValueChange={handleLevelChange}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Parent (0)</SelectItem>
                            <SelectItem value="1">Therapist (1)</SelectItem>
                            <SelectItem value="2">Admin (2)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="authorized" className="text-right">
                          Authorized
                        </Label>
                        <Select value={newUser.authorized.toString()} onValueChange={handleAuthorizedChange}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select authorization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No (0)</SelectItem>
                            <SelectItem value="1">Yes (1)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                          Password
                        </Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={newUser.password}
                          onChange={handleInputChange}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="confirmPassword" className="text-right">
                          Confirm
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={newUser.confirmPassword}
                          onChange={handleInputChange}
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create User</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={() => exportToCSV(filteredUsers)}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Select value={authorizedFilter} onValueChange={setAuthorizedFilter}>
                    <SelectTrigger className="w-[150px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Authorized" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="2">Deactivated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-[150px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Level" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="0">Parent (0)</SelectItem>
                      <SelectItem value="1">Therapist (1)</SelectItem>
                      <SelectItem value="2">Admin (2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        User
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Role (Level)
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Authorized
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center">
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="px-4 py-3">
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
                        <td className="px-4 py-3">
                          {getRoleName(user.level)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-2 w-2 rounded-full ${
                                user.authorized === 1
                                  ? "bg-green-500"
                                  : user.authorized === 0
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            />
                            <span>{getAuthorizedText(user.authorized)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
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
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>Edit User</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.authorized !== 2 && (
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Deactivate User
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

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredUsers.length}</strong> users (page {currentPage + 1})
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 0 || isLoading}
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filteredUsers.length < 10 || isLoading}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit User Modal */}
      <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and permissions.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <Input
                  value={currentUser.nickname}
                  onChange={(e) => setCurrentUser({ ...currentUser, nickname: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Email</Label>
                <Input
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Level</Label>
                <Select
                  value={currentUser.level.toString()}
                  onValueChange={(value) => setCurrentUser({ ...currentUser, level: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent (0)</SelectItem>
                    <SelectItem value="therapist">Therapist (1)</SelectItem>
                    <SelectItem value="admin">Admin (2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Authorized</Label>
                <Select
                  value={currentUser.authorized.toString()}
                  onValueChange={(value) => setCurrentUser({ ...currentUser, authorized: Number.parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No (0)</SelectItem>
                    <SelectItem value="1">Yes (1)</SelectItem>
                    <SelectItem value="2">Deactivated (2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveEditedUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
