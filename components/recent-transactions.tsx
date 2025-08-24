import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, CreditCard, PiggyBank, Receipt } from "lucide-react"

const transactions = [
  {
    id: "TXN001",
    type: "deposit",
    member: "John Doe",
    amount: 5000,
    description: "Monthly savings deposit",
    time: "2 minutes ago",
    status: "completed",
  },
  {
    id: "TXN002",
    type: "loan_disbursement",
    member: "Jane Smith",
    amount: 25000,
    description: "Personal loan disbursement",
    time: "15 minutes ago",
    status: "completed",
  },
  {
    id: "TXN003",
    type: "withdrawal",
    member: "Mike Johnson",
    amount: 2000,
    description: "Emergency withdrawal",
    time: "1 hour ago",
    status: "pending",
  },
  {
    id: "TXN004",
    type: "loan_repayment",
    member: "Sarah Wilson",
    amount: 1500,
    description: "Monthly loan repayment",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "TXN005",
    type: "deposit",
    member: "David Brown",
    amount: 3500,
    description: "Quarterly bonus deposit",
    time: "3 hours ago",
    status: "completed",
  },
]

export function RecentTransactions() {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case "loan_disbursement":
        return <CreditCard className="h-4 w-4 text-blue-600" />
      case "loan_repayment":
        return <PiggyBank className="h-4 w-4 text-purple-600" />
      default:
        return <Receipt className="h-4 w-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "text-green-600"
      case "withdrawal":
        return "text-red-600"
      case "loan_disbursement":
        return "text-blue-600"
      case "loan_repayment":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Recent Transactions
        </CardTitle>
        <CardDescription>Latest member transactions and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0">{getTransactionIcon(transaction.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{transaction.member}</p>
                  <Badge variant={transaction.status === "completed" ? "secondary" : "outline"} className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.time}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                  {transaction.type === "withdrawal" || transaction.type === "loan_disbursement" ? "-" : "+"}$
                  {transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.id}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  )
}
