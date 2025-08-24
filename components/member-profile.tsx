"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, FileText } from "lucide-react"

interface MemberProfileProps {
  memberId: string
}

// Mock data - in real app this would come from API
const memberData = {
  id: "M001",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1234567890",
  address: "123 Main St, Anytown, ST 12345",
  memberSince: "2023-01-15",
  status: "active",
  category: "regular",
  avatar: "/professional-headshot.png",
  dateOfBirth: "1985-06-15",
  occupation: "Software Engineer",
  employer: "Tech Corp Inc.",
  monthlyIncome: 5000,
  emergencyContact: {
    name: "Jane Doe",
    phone: "+1234567899",
    relation: "Spouse",
  },
}

const savingsData = [
  { date: "2024-01-15", type: "deposit", amount: 1000, balance: 15000, description: "Monthly savings" },
  { date: "2024-01-10", type: "deposit", amount: 500, balance: 14000, description: "Bonus deposit" },
  { date: "2023-12-15", type: "withdrawal", amount: 200, balance: 13500, description: "Emergency withdrawal" },
]

const loansData = [
  {
    id: "L001",
    type: "Personal Loan",
    amount: 10000,
    balance: 5000,
    rate: 8.5,
    term: 24,
    status: "active",
    nextPayment: "2024-02-15",
    monthlyPayment: 450,
  },
]

const transactionsData = [
  { date: "2024-01-15", type: "Savings Deposit", amount: 1000, status: "completed" },
  { date: "2024-01-10", type: "Loan Repayment", amount: 450, status: "completed" },
  { date: "2024-01-05", type: "Savings Deposit", amount: 500, status: "completed" },
]

export function MemberProfile({ memberId }: MemberProfileProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Members
        </Button>
      </div>

      {/* Member Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={memberData.avatar || "/placeholder.svg"} alt={memberData.name} />
              <AvatarFallback className="text-lg">
                {memberData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{memberData.name}</h1>
                <Badge
                  className={
                    memberData.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }
                >
                  {memberData.status}
                </Badge>
                <Badge variant="outline">{memberData.category}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {memberData.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {memberData.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {memberData.address}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member since {new Date(memberData.memberSince).toLocaleDateString()}
                </div>
              </div>
            </div>

            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="text-foreground">{new Date(memberData.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member ID</label>
                  <p className="text-foreground">{memberData.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Membership Type</label>
                  <p className="text-foreground capitalize">{memberData.category}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Occupation</label>
                  <p className="text-foreground">{memberData.occupation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employer</label>
                  <p className="text-foreground">{memberData.employer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Monthly Income</label>
                  <p className="text-foreground">${memberData.monthlyIncome.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground">{memberData.emergencyContact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">{memberData.emergencyContact.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Relationship</label>
                  <p className="text-foreground">{memberData.emergencyContact.relation}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Savings</label>
                  <p className="text-2xl font-bold text-green-600">$15,000</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Active Loans</label>
                  <p className="text-2xl font-bold text-red-600">$5,000</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Net Position</label>
                  <p className="text-2xl font-bold text-foreground">$10,000</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="savings">
          <Card>
            <CardHeader>
              <CardTitle>Savings History</CardTitle>
              <CardDescription>Recent savings deposits and withdrawals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsData.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Balance: ${transaction.balance.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Active Loans</CardTitle>
              <CardDescription>Current loan information and repayment schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loansData.map((loan) => (
                  <div key={loan.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{loan.type}</h3>
                        <p className="text-sm text-muted-foreground">Loan ID: {loan.id}</p>
                      </div>
                      <Badge
                        className={
                          loan.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {loan.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <label className="text-muted-foreground">Original Amount</label>
                        <p className="font-medium">${loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Outstanding Balance</label>
                        <p className="font-medium text-red-600">${loan.balance.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Interest Rate</label>
                        <p className="font-medium">{loan.rate}%</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Monthly Payment</label>
                        <p className="font-medium">${loan.monthlyPayment.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Next payment due: <span className="font-medium">{loan.nextPayment}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All member transactions and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionsData.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                      <Badge
                        className={
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>KYC documents and member files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">National ID Copy</p>
                    <p className="text-sm text-muted-foreground">Uploaded on 2023-01-15</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Proof of Address</p>
                    <p className="text-sm text-muted-foreground">Uploaded on 2023-01-15</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Member Photo</p>
                    <p className="text-sm text-muted-foreground">Uploaded on 2023-01-15</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Member account activity and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Profile Updated</p>
                    <p className="text-sm text-muted-foreground">2024-01-10 14:30</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Phone number updated by Admin User</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Loan Application Approved</p>
                    <p className="text-sm text-muted-foreground">2023-12-15 09:15</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Personal loan L001 approved by Loan Officer</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Member Created</p>
                    <p className="text-sm text-muted-foreground">2023-01-15 10:00</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Member account created by Admin User</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
