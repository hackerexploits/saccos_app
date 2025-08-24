"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, FileText, TrendingUp, Users, DollarSign } from "lucide-react"

const membershipData = [
  { month: "Jan", newMembers: 45, totalMembers: 1245 },
  { month: "Feb", newMembers: 52, totalMembers: 1297 },
  { month: "Mar", newMembers: 38, totalMembers: 1335 },
  { month: "Apr", newMembers: 61, totalMembers: 1396 },
  { month: "May", newMembers: 49, totalMembers: 1445 },
  { month: "Jun", newMembers: 55, totalMembers: 1500 },
]

const savingsData = [
  { month: "Jan", deposits: 125000, withdrawals: 85000, netGrowth: 40000 },
  { month: "Feb", deposits: 142000, withdrawals: 92000, netGrowth: 50000 },
  { month: "Mar", deposits: 138000, withdrawals: 88000, netGrowth: 50000 },
  { month: "Apr", deposits: 155000, withdrawals: 95000, netGrowth: 60000 },
  { month: "May", deposits: 148000, withdrawals: 89000, netGrowth: 59000 },
  { month: "Jun", deposits: 162000, withdrawals: 91000, netGrowth: 71000 },
]

const loanPortfolioData = [
  { category: "Personal Loans", amount: 450000, count: 85, color: "#3b82f6" },
  { category: "Business Loans", amount: 680000, count: 42, color: "#10b981" },
  { category: "Emergency Loans", amount: 125000, count: 28, color: "#f59e0b" },
  { category: "Education Loans", amount: 95000, count: 15, color: "#ef4444" },
]

export function ReportsView() {
  const [dateRange, setDateRange] = useState("last-6-months")
  const [reportType, setReportType] = useState("summary")

  const handleExportReport = (format: "pdf" | "csv" | "excel") => {
    // Export functionality would be implemented here
    console.log(`Exporting report as ${format}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive financial and operational insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExportReport("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,500</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.4M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">170</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">$1.35M</span> outstanding
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Health</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">Excellent</span> performance
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Savings Growth Trend</CardTitle>
                <CardDescription>Monthly deposits vs withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={savingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Bar dataKey="deposits" fill="#3b82f6" name="Deposits" />
                    <Bar dataKey="withdrawals" fill="#ef4444" name="Withdrawals" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Portfolio Distribution</CardTitle>
                <CardDescription>By loan category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={loanPortfolioData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {loanPortfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="membership" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Membership Growth Analysis</CardTitle>
              <CardDescription>Track member acquisition and retention trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={membershipData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="newMembers" fill="#10b981" name="New Members" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="totalMembers"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Total Members"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Regular Members</span>
                  <Badge variant="secondary">1,245</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Premium Members</span>
                  <Badge variant="secondary">185</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Corporate Members</span>
                  <Badge variant="secondary">70</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>18-30 years</span>
                  <Badge variant="outline">425</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>31-45 years</span>
                  <Badge variant="outline">620</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>46-60 years</span>
                  <Badge variant="outline">355</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>60+ years</span>
                  <Badge variant="outline">100</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Urban</span>
                  <Badge variant="default">890</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Suburban</span>
                  <Badge variant="default">445</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rural</span>
                  <Badge variant="default">165</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Savings Performance Dashboard</CardTitle>
              <CardDescription>Detailed analysis of savings activities and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                  <Line type="monotone" dataKey="deposits" stroke="#10b981" strokeWidth={3} name="Deposits" />
                  <Line type="monotone" dataKey="withdrawals" stroke="#ef4444" strokeWidth={3} name="Withdrawals" />
                  <Line type="monotone" dataKey="netGrowth" stroke="#3b82f6" strokeWidth={3} name="Net Growth" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Savers</CardTitle>
                <CardDescription>Members with highest savings balances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Sarah Johnson", balance: 45000, growth: "+12%" },
                  { name: "Michael Chen", balance: 38500, growth: "+8%" },
                  { name: "Emily Davis", balance: 32000, growth: "+15%" },
                  { name: "Robert Wilson", balance: 28750, growth: "+6%" },
                  { name: "Lisa Anderson", balance: 25600, growth: "+10%" },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">${member.balance.toLocaleString()}</p>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {member.growth}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings Products Performance</CardTitle>
                <CardDescription>Performance by product type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { product: "Regular Savings", balance: 1200000, members: 1245, rate: "2.5%" },
                  { product: "Fixed Deposit", balance: 850000, members: 320, rate: "4.2%" },
                  { product: "Target Savings", balance: 350000, members: 180, rate: "3.0%" },
                ].map((product, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{product.product}</h4>
                      <Badge>{product.rate}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">${product.balance.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{product.members} members</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Portfolio Analysis</CardTitle>
              <CardDescription>Comprehensive loan performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">170</p>
                  <p className="text-sm text-gray-600">Active Loans</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">$1.35M</p>
                  <p className="text-sm text-gray-600">Outstanding</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                  <p className="text-sm text-gray-600">Overdue</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">2.1%</p>
                  <p className="text-sm text-gray-600">Default Rate</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={loanPortfolioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]} />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Applications Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <span>Pending Review</span>
                  <Badge variant="secondary">24</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span>Under Appraisal</span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span>Approved</span>
                  <Badge variant="secondary">15</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                  <span>Rejected</span>
                  <Badge variant="secondary">3</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Repayment Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>On Time</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                    <span className="text-sm">94%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Late (1-30 days)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "4%" }}></div>
                    </div>
                    <span className="text-sm">4%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Overdue (30+ days)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                    </div>
                    <span className="text-sm">2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Statement</CardTitle>
              <CardDescription>Comprehensive financial overview and key ratios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Assets</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Cash & Bank</span>
                      <span className="font-medium">$485,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loans Outstanding</span>
                      <span className="font-medium">$1,350,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investments</span>
                      <span className="font-medium">$275,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fixed Assets</span>
                      <span className="font-medium">$125,000</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold">
                      <span>Total Assets</span>
                      <span>$2,235,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Liabilities & Equity</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Member Deposits</span>
                      <span className="font-medium">$2,400,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accounts Payable</span>
                      <span className="font-medium">$45,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reserves</span>
                      <span className="font-medium">$185,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retained Earnings</span>
                      <span className="font-medium">$95,000</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold">
                      <span>Total Liab. & Equity</span>
                      <span>$2,725,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">12.5%</p>
                  <p className="text-sm text-gray-600">Return on Assets</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">85.2%</p>
                  <p className="text-sm text-gray-600">Loan to Deposit Ratio</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-lg font-bold text-purple-600">8.5%</p>
                  <p className="text-sm text-gray-600">Capital Adequacy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Statement (YTD)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Interest Income</span>
                  <span className="font-medium text-green-600">$185,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee Income</span>
                  <span className="font-medium text-green-600">$45,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating Expenses</span>
                  <span className="font-medium text-red-600">($125,000)</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Loss Provision</span>
                  <span className="font-medium text-red-600">($15,000)</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Net Income</span>
                  <span className="text-green-600">$90,000</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Member Growth Rate</span>
                  <Badge variant="outline" className="text-green-600">
                    +12.5%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Savings Growth Rate</span>
                  <Badge variant="outline" className="text-green-600">
                    +18.2%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Loan Portfolio Quality</span>
                  <Badge variant="outline" className="text-green-600">
                    97.9%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Operating Efficiency</span>
                  <Badge variant="outline" className="text-blue-600">
                    68.5%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Liquidity Ratio</span>
                  <Badge variant="outline" className="text-blue-600">
                    15.8%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
