"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiggyBank, Plus, Minus, FileText, Calendar } from "lucide-react"
import { DepositForm } from "@/components/deposit-form"
import { WithdrawalForm } from "@/components/withdrawal-form"
import { SavingsStatement } from "@/components/savings-statement"

const savingsProducts = [
  {
    id: "SP001",
    name: "Regular Savings",
    type: "ordinary",
    balance: 15000,
    interestRate: 4.5,
    minimumBalance: 100,
    status: "active",
    lastTransaction: "2024-01-15",
  },
  {
    id: "SP002",
    name: "Fixed Deposit",
    type: "fixed",
    balance: 25000,
    interestRate: 6.0,
    minimumBalance: 1000,
    status: "active",
    maturityDate: "2024-12-15",
    lastTransaction: "2023-12-15",
  },
]

const recentTransactions = [
  {
    id: "TXN001",
    type: "deposit",
    amount: 1000,
    method: "mobile",
    date: "2024-01-15",
    status: "completed",
    description: "Monthly savings deposit",
    balance: 15000,
  },
  {
    id: "TXN002",
    type: "deposit",
    amount: 500,
    method: "cash",
    date: "2024-01-10",
    status: "pending",
    description: "Bonus deposit",
    balance: 14000,
  },
  {
    id: "TXN003",
    type: "withdrawal",
    amount: 200,
    method: "bank",
    date: "2024-01-05",
    status: "approved",
    description: "Emergency withdrawal",
    balance: 13500,
  },
]

const pendingApprovals = [
  {
    id: "PA001",
    type: "withdrawal",
    amount: 500,
    member: "John Doe",
    date: "2024-01-16",
    reason: "Medical emergency",
  },
  {
    id: "PA002",
    type: "deposit",
    amount: 2000,
    member: "Jane Smith",
    date: "2024-01-16",
    reason: "Large cash deposit verification",
  },
]

export function SavingsView() {
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false)

  const totalBalance = savingsProducts.reduce((sum, product) => sum + product.balance, 0)
  const monthlyGrowth = 8.2 // percentage

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Savings Management</h1>
          <p className="text-muted-foreground">Manage savings deposits, withdrawals, and view account statements</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DepositForm onClose={() => setIsDepositOpen(false)} />
            </DialogContent>
          </Dialog>
          <Dialog open={isWithdrawalOpen} onOpenChange={setIsWithdrawalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Minus className="h-4 w-4" />
                New Withdrawal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <WithdrawalForm onClose={() => setIsWithdrawalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Savings Balance</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{monthlyGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{savingsProducts.length}</div>
            <p className="text-xs text-muted-foreground">Savings accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Savings Products</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid gap-4 md:grid-cols-2">
            {savingsProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge
                      className={
                        product.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                  <CardDescription>Product ID: {product.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Current Balance</label>
                      <p className="text-2xl font-bold text-foreground">${product.balance.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Interest Rate</label>
                      <p className="text-2xl font-bold text-green-600">{product.interestRate}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-muted-foreground">Minimum Balance</label>
                      <p className="font-medium">${product.minimumBalance.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Last Transaction</label>
                      <p className="font-medium">{new Date(product.lastTransaction).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {product.type === "fixed" && product.maturityDate && (
                    <div className="pt-2 border-t">
                      <label className="text-sm text-muted-foreground">Maturity Date</label>
                      <p className="font-medium">{new Date(product.maturityDate).toLocaleDateString()}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Transaction History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest savings deposits and withdrawals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${transaction.type === "deposit" ? "bg-green-100" : "bg-red-100"}`}
                      >
                        {transaction.type === "deposit" ? (
                          <Plus className="h-4 w-4 text-green-600" />
                        ) : (
                          <Minus className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span className="capitalize">{transaction.method}</span>
                          <span>•</span>
                          <span>ID: {transaction.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Bal: ${transaction.balance.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements">
          <SavingsStatement />
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Transactions awaiting teller approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          {approval.type}
                        </Badge>
                        <span className="font-medium">{approval.member}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{approval.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{approval.reason}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">
                        {approval.type === "deposit" ? "+" : "-"}${approval.amount.toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
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
