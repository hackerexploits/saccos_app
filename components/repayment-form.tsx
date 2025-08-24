"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Upload, X, FileText, ImageIcon } from "lucide-react"

interface RepaymentFormProps {
  onClose: () => void
}

export function RepaymentForm({ onClose }: RepaymentFormProps) {
  const [formData, setFormData] = useState({
    loanId: "",
    memberId: "",
    paymentAmount: "",
    paymentMethod: "",
    reference: "",
    notes: "",
  })
  const [uploadedReceipts, setUploadedReceipts] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock loan data - would come from API
  const loanDetails = {
    id: "L001",
    memberName: "John Doe",
    product: "Personal Loan",
    balance: 15000,
    monthlyPayment: 850,
    nextPaymentDate: "2024-02-15",
    daysOverdue: 0,
    penalty: 0,
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedReceipts((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedReceipts((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    onClose()
  }

  const paymentAmount = Number(formData.paymentAmount) || 0
  const newBalance = loanDetails.balance - paymentAmount
  const isOverpayment = paymentAmount > loanDetails.balance
  const isUnderpayment = paymentAmount < loanDetails.monthlyPayment && paymentAmount > 0

  return (
    <>
      <DialogHeader>
        <DialogTitle>Record Loan Repayment</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {loanDetails.daysOverdue > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This loan is {loanDetails.daysOverdue} days overdue. Penalty charges may apply.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Loan Information</CardTitle>
            <CardDescription>Current loan details and payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanId">Loan ID *</Label>
                <Input
                  id="loanId"
                  value={formData.loanId}
                  onChange={(e) => handleInputChange("loanId", e.target.value)}
                  placeholder="Enter loan ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberId">Member ID *</Label>
                <Input
                  id="memberId"
                  value={formData.memberId}
                  onChange={(e) => handleInputChange("memberId", e.target.value)}
                  placeholder="Enter member ID"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Outstanding Balance</label>
                <p className="text-lg font-bold text-red-600">${loanDetails.balance.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Monthly Payment</label>
                <p className="text-lg font-bold">${loanDetails.monthlyPayment.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Next Payment Due</label>
                <p className="text-lg font-bold">{loanDetails.nextPaymentDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Enter the payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentAmount">Payment Amount *</Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.paymentAmount}
                  onChange={(e) => handleInputChange("paymentAmount", e.target.value)}
                  placeholder="0.00"
                  required
                />
                {isOverpayment && (
                  <p className="text-xs text-green-600">
                    Overpayment of ${(paymentAmount - loanDetails.balance).toLocaleString()} will be applied to future
                    payments
                  </p>
                )}
                {isUnderpayment && (
                  <p className="text-xs text-yellow-600">
                    Partial payment - ${(loanDetails.monthlyPayment - paymentAmount).toLocaleString()} remaining for
                    this month
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="deduction">Salary Deduction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => handleInputChange("reference", e.target.value)}
                placeholder="Transaction reference (if applicable)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Payment Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes about this payment"
              />
            </div>

            {paymentAmount > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Payment Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-green-700">Payment Amount</label>
                    <p className="font-medium">${paymentAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-green-700">New Balance</label>
                    <p className="font-medium">${Math.max(0, newBalance).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Receipt</CardTitle>
            <CardDescription>Upload payment receipt or proof of payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-foreground">
                      Click to upload or drag and drop
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Payment receipts, bank slips (PDF, JPG, PNG up to 10MB each)
                    </span>
                  </label>
                  <input
                    id="receipt-upload"
                    name="receipt-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>

            {uploadedReceipts.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Receipts</Label>
                <div className="space-y-2">
                  {uploadedReceipts.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                      {file.type.startsWith("image/") ? (
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm flex-1">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Recording Payment..." : "Record Payment"}
          </Button>
        </div>
      </form>
    </>
  )
}
