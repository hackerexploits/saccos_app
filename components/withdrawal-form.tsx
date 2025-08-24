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
import { AlertTriangle } from "lucide-react"

interface WithdrawalFormProps {
  onClose: () => void
}

export function WithdrawalForm({ onClose }: WithdrawalFormProps) {
  const [formData, setFormData] = useState({
    memberId: "",
    savingsProduct: "",
    amount: "",
    method: "",
    reason: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    onClose()
  }

  const availableBalance = 15000 // This would come from API
  const minimumBalance = 100
  const maxWithdrawal = availableBalance - minimumBalance

  return (
    <>
      <DialogHeader>
        <DialogTitle>New Savings Withdrawal</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Withdrawal requests require teller approval and may take 1-2 business days to process.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Information</CardTitle>
            <CardDescription>Enter the withdrawal details and reason</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberId">Member ID *</Label>
                <Input
                  id="memberId"
                  placeholder="Enter member ID"
                  value={formData.memberId}
                  onChange={(e) => handleInputChange("memberId", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savingsProduct">Savings Product *</Label>
                <Select
                  value={formData.savingsProduct}
                  onValueChange={(value) => handleInputChange("savingsProduct", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select savings product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP001">Regular Savings (SP001)</SelectItem>
                    <SelectItem value="SP002">Fixed Deposit (SP002)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount *</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                max={maxWithdrawal}
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Available for withdrawal: ${maxWithdrawal.toLocaleString()} (Minimum balance: $
                {minimumBalance.toLocaleString()})
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Withdrawal Method *</Label>
              <Select value={formData.method} onValueChange={(value) => handleInputChange("method", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select withdrawal method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Withdrawal *</Label>
              <Select value={formData.reason} onValueChange={(value) => handleInputChange("reason", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="medical">Medical Expenses</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="business">Business Investment</SelectItem>
                  <SelectItem value="personal">Personal Use</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional Details *</Label>
              <Textarea
                id="description"
                placeholder="Please provide additional details about the withdrawal reason"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <label className="text-muted-foreground">Current Balance</label>
                <p className="font-medium text-lg">${availableBalance.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Minimum Balance</label>
                <p className="font-medium text-lg">${minimumBalance.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Available for Withdrawal</label>
                <p className="font-medium text-lg text-green-600">${maxWithdrawal.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Request..." : "Submit Withdrawal Request"}
          </Button>
        </div>
      </form>
    </>
  )
}
