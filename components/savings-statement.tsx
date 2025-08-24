"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Filter } from "lucide-react"

const statementData = [
  {
    date: "2024-01-15",
    description: "Monthly savings deposit",
    reference: "DEP001",
    debit: 0,
    credit: 1000,
    balance: 15000,
    type: "deposit",
  },
  {
    date: "2024-01-10",
    description: "Bonus deposit",
    reference: "DEP002",
    debit: 0,
    credit: 500,
    balance: 14000,
    type: "deposit",
  },
  {
    date: "2024-01-05",
    description: "Emergency withdrawal",
    reference: "WTH001",
    debit: 200,
    credit: 0,
    balance: 13500,
    type: "withdrawal",
  },
  {
    date: "2023-12-15",
    description: "Monthly savings deposit",
    reference: "DEP003",
    debit: 0,
    credit: 1000,
    balance: 13700,
    type: "deposit",
  },
  {
    date: "2023-12-10",
    description: "Interest payment",
    reference: "INT001",
    debit: 0,
    credit: 45.5,
    balance: 12700,
    type: "interest",
  },
]

export function SavingsStatement() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [transactionType, setTransactionType] = useState("all")

  const filteredData = statementData.filter((transaction) => {
    const transactionDate = new Date(transaction.date)
    const fromDate = dateFrom ? new Date(dateFrom) : null
    const toDate = dateTo ? new Date(dateTo) : null

    const dateMatch = (!fromDate || transactionDate >= fromDate) && (!toDate || transactionDate <= toDate)
    const typeMatch = transactionType === "all" || transaction.type === transactionType

    return dateMatch && typeMatch
  })

  const handleExport = (format: "pdf" | "csv") => {
    // In a real app, this would trigger the export functionality
    console.log(`Exporting statement as ${format.toUpperCase()}`)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Savings Statement
            </CardTitle>
            <CardDescription>View and export your savings account statement</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Filter className="h-4 w-4" />
              Filter Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">From Date</Label>
                <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">To Date</Label>
                <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionType">Transaction Type</Label>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All transactions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    <SelectItem value="interest">Interest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statement Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                  <TableCell className="text-right">
                    {transaction.debit > 0 ? (
                      <span className="text-red-600">${transaction.debit.toLocaleString()}</span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.credit > 0 ? (
                      <span className="text-green-600">${transaction.credit.toLocaleString()}</span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">${transaction.balance.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.type === "deposit"
                          ? "default"
                          : transaction.type === "withdrawal"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No transactions found for the selected criteria.</p>
          </div>
        )}

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Statement Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <label className="text-muted-foreground">Total Transactions</label>
                <p className="font-medium text-lg">{filteredData.length}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Total Credits</label>
                <p className="font-medium text-lg text-green-600">
                  ${filteredData.reduce((sum, t) => sum + t.credit, 0).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-muted-foreground">Total Debits</label>
                <p className="font-medium text-lg text-red-600">
                  ${filteredData.reduce((sum, t) => sum + t.debit, 0).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-muted-foreground">Current Balance</label>
                <p className="font-medium text-lg">${filteredData[0]?.balance.toLocaleString() || "0"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
