import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, PiggyBank, CreditCard, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { RecentTransactions } from "@/components/recent-transactions"
import { SavingsChart } from "@/components/savings-chart"
import { LoanPerformanceChart } from "@/components/loan-performance-chart"

export function DashboardOverview() {
  const stats = [
    {
      name: "Total Members",
      value: "1,247",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active members",
    },
    {
      name: "Savings Portfolio",
      value: "$2,847,392",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: PiggyBank,
      description: "Total savings balance",
    },
    {
      name: "Active Loans",
      value: "$1,234,567",
      change: "+3.1%",
      changeType: "positive" as const,
      icon: CreditCard,
      description: "Outstanding loan amount",
    },
    {
      name: "Monthly Growth",
      value: "15.3%",
      change: "+2.4%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Portfolio growth rate",
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "approval",
      message: "3 loan applications pending approval",
      time: "2 hours ago",
      urgent: true,
    },
    {
      id: 2,
      type: "payment",
      message: "15 members made savings deposits today",
      time: "4 hours ago",
      urgent: false,
    },
    {
      id: 3,
      type: "system",
      message: "Monthly interest calculation completed",
      time: "1 day ago",
      urgent: false,
    },
    {
      id: 4,
      type: "reminder",
      message: "5 loan payments due this week",
      time: "1 day ago",
      urgent: true,
    },
  ]

  const performanceMetrics = [
    {
      name: "Loan Recovery Rate",
      value: 94.2,
      target: 95,
      status: "good" as const,
    },
    {
      name: "Member Satisfaction",
      value: 87.5,
      target: 90,
      status: "warning" as const,
    },
    {
      name: "Operational Efficiency",
      value: 92.1,
      target: 85,
      status: "excellent" as const,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your cooperative today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last updated</p>
          <p className="text-sm font-medium">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <div className="p-2 bg-accent/10 rounded-full">
                <stat.icon className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mb-1">{stat.description}</p>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription>Key performance indicators for your cooperative</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {performanceMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <span className="text-sm text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Target: {metric.target}%</span>
                  <Badge
                    variant={
                      metric.status === "excellent" ? "default" : metric.status === "good" ? "secondary" : "destructive"
                    }
                    className="text-xs"
                  >
                    {metric.status === "excellent"
                      ? "Excellent"
                      : metric.status === "good"
                        ? "Good"
                        : "Needs Attention"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Charts Section - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <SavingsChart />
          <LoanPerformanceChart />
        </div>

        {/* Right Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Notifications
                <Badge variant="destructive" className="ml-auto">
                  {notifications.filter((n) => n.urgent).length}
                </Badge>
              </CardTitle>
              <CardDescription>Recent activities and pending actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.slice(0, 4).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.urgent ? (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">{notification.message}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                  {notification.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add New Member
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <PiggyBank className="mr-2 h-4 w-4" />
                Process Savings Deposit
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Review Loan Applications
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Monthly Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <RecentTransactions />
    </div>
  )
}
