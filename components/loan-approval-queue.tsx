"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react"

const pendingApplications = [
  {
    id: "LA001",
    memberId: "M001",
    memberName: "John Doe",
    loanProduct: "Personal Loan",
    requestedAmount: 25000,
    purpose: "Home renovation and repairs",
    monthlyIncome: 5000,
    guarantors: 2,
    submittedDate: "2024-01-15",
    status: "pending",
    riskScore: 85,
  },
  {
    id: "LA002",
    memberId: "M003",
    memberName: "Mike Johnson",
    loanProduct: "Business Loan",
    requestedAmount: 75000,
    purpose: "Expand retail business operations",
    monthlyIncome: 8000,
    guarantors: 2,
    submittedDate: "2024-01-14",
    status: "under_review",
    riskScore: 72,
  },
  {
    id: "LA003",
    memberId: "M005",
    memberName: "David Brown",
    loanProduct: "Emergency Loan",
    requestedAmount: 5000,
    purpose: "Medical emergency expenses",
    monthlyIncome: 3500,
    guarantors: 1,
    submittedDate: "2024-01-16",
    status: "pending",
    riskScore: 90,
  },
]

export function LoanApprovalQueue() {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [approvalComments, setApprovalComments] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleApproval = async (applicationId: string, decision: "approve" | "reject") => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsProcessing(false)
    setSelectedApplication(null)
    setApprovalComments("")
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Loan Application Queue
        </CardTitle>
        <CardDescription>Review and approve pending loan applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingApplications.map((application) => (
            <div key={application.id} className="p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-medium">{application.memberName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {application.loanProduct} • ID: {application.id}
                    </p>
                  </div>
                  <Badge className={getStatusColor(application.status)}>{application.status.replace("_", " ")}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${application.requestedAmount.toLocaleString()}</p>
                  <p className={`text-sm font-medium ${getRiskScoreColor(application.riskScore)}`}>
                    Risk Score: {application.riskScore}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <label className="text-muted-foreground">Monthly Income</label>
                  <p className="font-medium">${application.monthlyIncome.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-muted-foreground">Guarantors</label>
                  <p className="font-medium">{application.guarantors}</p>
                </div>
                <div>
                  <label className="text-muted-foreground">Submitted</label>
                  <p className="font-medium">{new Date(application.submittedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-muted-foreground">Debt-to-Income</label>
                  <p className="font-medium">
                    {(((application.requestedAmount * 0.1) / application.monthlyIncome) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-muted-foreground">Purpose</label>
                <p className="text-sm">{application.purpose}</p>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Application Details - {application.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Member</label>
                          <p>
                            {application.memberName} ({application.memberId})
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Loan Product</label>
                          <p>{application.loanProduct}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Requested Amount</label>
                          <p>${application.requestedAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Risk Score</label>
                          <p className={getRiskScoreColor(application.riskScore)}>{application.riskScore}%</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Purpose</label>
                        <p>{application.purpose}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Approve Loan Application</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>Are you sure you want to approve this loan application for {application.memberName}?</p>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Approval Comments</label>
                        <Textarea
                          placeholder="Add any comments or conditions..."
                          value={approvalComments}
                          onChange={(e) => setApprovalComments(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={() => handleApproval(application.id, "approve")} disabled={isProcessing}>
                          {isProcessing ? "Processing..." : "Approve Loan"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="destructive" className="gap-2">
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject Loan Application</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>Are you sure you want to reject this loan application for {application.memberName}?</p>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Rejection Reason *</label>
                        <Textarea
                          placeholder="Please provide a reason for rejection..."
                          value={approvalComments}
                          onChange={(e) => setApprovalComments(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleApproval(application.id, "reject")}
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Reject Application"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
