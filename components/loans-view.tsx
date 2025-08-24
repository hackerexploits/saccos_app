"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Plus, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { LoanApplicationForm } from "@/components/loan-application-form"
import { LoanApprovalQueue } from "@/components/loan-approval-queue"
import { RepaymentForm } from "@/components/repayment-form"

const loanProducts = [
  {
    id: "LP001",
    name: "Personal Loan",
    description: "Quick personal loans for immediate needs",
    minAmount: 1000,
    maxAmount: 50000,
    interestRate: 12.5,
    term: "6-36 months",
    processingFee: 2.5,
    requirements: ["Minimum 6 months membership", "Regular savings history", "Guarantor required"],
  },
  {
    id: "LP002",
    name: "Business Loan",
    description: "Capital for business expansion and investment",
    minAmount: 5000,
    maxAmount: 200000,
    interestRate: 10.0,
    term: "12-60 months",
    processingFee: 3.0,
    requirements: ["Business plan required", "Collateral required", "2 guarantors required"],
  },
  {
    id: "LP003",
    name: "Emergency Loan",
    description: "Fast approval for urgent financial needs",
    minAmount: 500,
    maxAmount: 10000,
    interestRate: 15.0,
    term: "3-12 months",
    processingFee: 1.5,
    requirements: ["Active member", "Emergency documentation"],
  },
]

const activeLoans = [
  {
    id: "L001",
    memberId: "M001",
    memberName: "John Doe",
    product: "Personal Loan",
    amount: 25000,
    balance: 15000,
    interestRate: 12.5,
    monthlyPayment: 850,
    nextPayment: "2024-02-15",
    status: "active",
    daysOverdue: 0,
  },
  {
    id: "L002",
    memberId: "M002",
    memberName: "Jane Smith",
    product: "Business Loan",
    amount: 100000,
    balance: 75000,
    interestRate: 10.0,
    monthlyPayment: 2100,
    nextPayment: "2024-02-10",
    status: "overdue",
    daysOverdue: 5,
  },
]

const loanStats = {
  totalPortfolio: 1234567,
  activeLoans: 45,
  overdueLoans: 8,
  pendingApplications: 12,
  recoveryRate: 94.2,
}

export function LoansView() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)
  const [isRepaymentOpen, setIsRepaymentOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Loans Management</h1>
          <p className="text-muted-foreground">Manage loan products, applications, and repayments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Application
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <LoanApplicationForm onClose={() => setIsApplicationOpen(false)} />
            </DialogContent>
          </Dialog>
          <Dialog open={isRepaymentOpen} onOpenChange={setIsRepaymentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <CreditCard className="h-4 w-4" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <RepaymentForm onClose={() => setIsRepaymentOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${loanStats.totalPortfolio.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Outstanding loans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Loans</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{loanStats.activeLoans}</div>
            <p className="text-xs text-muted-foreground">Current borrowers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue Loans</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{loanStats.overdueLoans}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{loanStats.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recovery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{loanStats.recoveryRate}%</div>
            <p className="text-xs text-muted-foreground">Collection efficiency</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Loan Products</TabsTrigger>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="overdue">Overdue Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loanProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Amount Range</label>
                      <p className="font-medium">
                        ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Interest Rate</label>
                      <p className="font-medium text-green-600">{product.interestRate}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Term</label>
                      <p className="font-medium">{product.term}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Processing Fee</label>
                      <p className="font-medium">{product.processingFee}%</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Requirements</label>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {product.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">Apply for This Loan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Loans</CardTitle>
              <CardDescription>Currently active loan accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className={`p-4 border rounded-lg ${loan.status === "overdue" ? "border-red-200 bg-red-50" : "bg-card"}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">{loan.memberName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {loan.product} • ID: {loan.id}
                          </p>
                        </div>
                        <Badge
                          variant={loan.status === "active" ? "default" : "destructive"}
                          className={loan.status === "overdue" ? "bg-red-100 text-red-800" : ""}
                        >
                          {loan.status}
                          {loan.daysOverdue > 0 && ` (${loan.daysOverdue} days)`}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                        <p className="text-lg font-bold text-red-600">${loan.balance.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <label className="text-muted-foreground">Original Amount</label>
                        <p className="font-medium">${loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Interest Rate</label>
                        <p className="font-medium">{loan.interestRate}%</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Monthly Payment</label>
                        <p className="font-medium">${loan.monthlyPayment.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Next Payment</label>
                        <p className="font-medium">{loan.nextPayment}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Payment History
                      </Button>
                      {loan.status === "overdue" && (
                        <Button size="sm" variant="destructive">
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <LoanApprovalQueue />
        </TabsContent>

        <TabsContent value="overdue">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Overdue Loans
              </CardTitle>
              <CardDescription>Loans requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeLoans
                  .filter((loan) => loan.status === "overdue")
                  .map((loan) => (
                    <div key={loan.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{loan.memberName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {loan.product} • ID: {loan.id}
                          </p>
                        </div>
                        <Badge variant="destructive">{loan.daysOverdue} days overdue</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <label className="text-muted-foreground">Outstanding Balance</label>
                          <p className="font-medium text-red-600">${loan.balance.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="text-muted-foreground">Monthly Payment</label>
                          <p className="font-medium">${loan.monthlyPayment.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="text-muted-foreground">Penalty</label>
                          <p className="font-medium text-red-600">
                            ${(loan.monthlyPayment * 0.05 * loan.daysOverdue).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive">
                          Send Final Notice
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Contact Member
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Restructure Loan
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
