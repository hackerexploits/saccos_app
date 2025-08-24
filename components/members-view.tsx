"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Filter, Eye, Edit, MoreHorizontal } from "lucide-react"
import { NewMemberForm } from "@/components/new-member-form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const members = [
  {
    id: "M001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    memberSince: "2023-01-15",
    status: "active",
    category: "regular",
    savingsBalance: 15000,
    loanBalance: 5000,
    avatar: "/professional-headshot.png",
  },
  {
    id: "M002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1234567891",
    memberSince: "2023-02-20",
    status: "active",
    category: "premium",
    savingsBalance: 25000,
    loanBalance: 0,
    avatar: "/professional-woman-headshot.png",
  },
  {
    id: "M003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1234567892",
    memberSince: "2023-03-10",
    status: "inactive",
    category: "regular",
    savingsBalance: 8000,
    loanBalance: 12000,
    avatar: "/professional-man-headshot.png",
  },
  {
    id: "M004",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1234567893",
    memberSince: "2023-04-05",
    status: "active",
    category: "premium",
    savingsBalance: 35000,
    loanBalance: 8000,
    avatar: "/professional-woman-headshot.png",
  },
  {
    id: "M005",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1234567894",
    memberSince: "2023-05-12",
    status: "pending",
    category: "regular",
    savingsBalance: 2000,
    loanBalance: 0,
    avatar: "/professional-headshot-young-man.png",
  },
]

export function MembersView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false)

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    const matchesCategory = categoryFilter === "all" || member.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "premium":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "regular":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Members</h1>
          <p className="text-muted-foreground">Manage your cooperative members and their information</p>
        </div>
        <Dialog open={isNewMemberOpen} onOpenChange={setIsNewMemberOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <NewMemberForm onClose={() => setIsNewMemberOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or member ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Members ({filteredMembers.length})</CardTitle>
          <CardDescription>
            {filteredMembers.length} of {members.length} members shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{member.name}</h3>
                    <Badge className={`text-xs ${getStatusColor(member.status)}`}>{member.status}</Badge>
                    <Badge className={`text-xs ${getCategoryColor(member.category)}`}>{member.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <p className="text-sm text-muted-foreground">{member.phone}</p>
                  <p className="text-xs text-muted-foreground">
                    Member since: {new Date(member.memberSince).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">ID: {member.id}</p>
                  <p className="text-sm text-green-600">Savings: ${member.savingsBalance.toLocaleString()}</p>
                  <p className="text-sm text-red-600">Loans: ${member.loanBalance.toLocaleString()}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
