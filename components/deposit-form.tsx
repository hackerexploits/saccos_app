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
import { Upload, X, FileText, ImageIcon } from "lucide-react"

interface DepositFormProps {
  onClose: () => void
}

export function DepositForm({ onClose }: DepositFormProps) {
  const [formData, setFormData] = useState({
    memberId: "",
    savingsProduct: "",
    amount: "",
    method: "",
    reference: "",
    description: "",
  })
  const [uploadedReceipts, setUploadedReceipts] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  return (
    <>
      <DialogHeader>
        <DialogTitle>New Savings Deposit</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Deposit Information</CardTitle>
            <CardDescription>Enter the deposit details and upload supporting documents</CardDescription>
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
                    <SelectItem value="SP003">Holiday Savings (SP003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Deposit Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">Payment Method *</Label>
                <Select value={formData.method} onValueChange={(value) => handleInputChange("method", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                placeholder="Transaction reference (if applicable)"
                value={formData.reference}
                onChange={(e) => handleInputChange("reference", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description or notes"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
            <CardDescription>Upload payment receipts or supporting documents</CardDescription>
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
            {isSubmitting ? "Processing Deposit..." : "Submit Deposit"}
          </Button>
        </div>
      </form>
    </>
  )
}
