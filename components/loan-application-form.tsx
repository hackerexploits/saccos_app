"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X, FileText, ImageIcon, Plus, Trash2 } from "lucide-react"

interface LoanApplicationFormProps {
  onClose: () => void
}

interface Guarantor {
  name: string
  relationship: string
  phone: string
  address: string
  occupation: string
  monthlyIncome: string
}

export function LoanApplicationForm({ onClose }: LoanApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Basic Information
    memberId: "",
    loanProduct: "",
    requestedAmount: "",
    loanPurpose: "",
    repaymentTerm: "",

    // Financial Information
    monthlyIncome: "",
    otherIncome: "",
    monthlyExpenses: "",
    existingDebts: "",
    collateralType: "",
    collateralValue: "",
    collateralDescription: "",

    // Business Information (if applicable)
    businessName: "",
    businessType: "",
    businessAge: "",
    businessIncome: "",
    businessPlan: "",
  })

  const [guarantors, setGuarantors] = useState<Guarantor[]>([
    { name: "", relationship: "", phone: "", address: "", occupation: "", monthlyIncome: "" },
  ])

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGuarantorChange = (index: number, field: keyof Guarantor, value: string) => {
    setGuarantors((prev) => prev.map((guarantor, i) => (i === index ? { ...guarantor, [field]: value } : guarantor)))
  }

  const addGuarantor = () => {
    setGuarantors((prev) => [
      ...prev,
      { name: "", relationship: "", phone: "", address: "", occupation: "", monthlyIncome: "" },
    ])
  }

  const removeGuarantor = (index: number) => {
    setGuarantors((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    onClose()
  }

  const steps = [
    { id: "basic", title: "Basic Information" },
    { id: "financial", title: "Financial Details" },
    { id: "guarantors", title: "Guarantors" },
    { id: "documents", title: "Documents" },
    { id: "review", title: "Review & Submit" },
  ]

  return (
    <>
      <DialogHeader>
        <DialogTitle>Loan Application</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-px mx-4 ${index < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Loan Information</CardTitle>
                <CardDescription>Provide basic details about your loan request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="memberId">Member ID *</Label>
                    <Input
                      id="memberId"
                      value={formData.memberId}
                      onChange={(e) => handleInputChange("memberId", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanProduct">Loan Product *</Label>
                    <Select
                      value={formData.loanProduct}
                      onValueChange={(value) => handleInputChange("loanProduct", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LP001">Personal Loan</SelectItem>
                        <SelectItem value="LP002">Business Loan</SelectItem>
                        <SelectItem value="LP003">Emergency Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requestedAmount">Requested Amount *</Label>
                    <Input
                      id="requestedAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.requestedAmount}
                      onChange={(e) => handleInputChange("requestedAmount", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repaymentTerm">Repayment Term *</Label>
                    <Select
                      value={formData.repaymentTerm}
                      onValueChange={(value) => handleInputChange("repaymentTerm", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                  <Textarea
                    id="loanPurpose"
                    placeholder="Describe the purpose of this loan"
                    value={formData.loanPurpose}
                    onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Financial Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Information</CardTitle>
                  <CardDescription>Provide your income and expense details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otherIncome">Other Income</Label>
                      <Input
                        id="otherIncome"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.otherIncome}
                        onChange={(e) => handleInputChange("otherIncome", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyExpenses">Monthly Expenses *</Label>
                      <Input
                        id="monthlyExpenses"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.monthlyExpenses}
                        onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="existingDebts">Existing Debts</Label>
                      <Input
                        id="existingDebts"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.existingDebts}
                        onChange={(e) => handleInputChange("existingDebts", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Collateral Information</CardTitle>
                  <CardDescription>Provide details about collateral (if applicable)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="collateralType">Collateral Type</Label>
                    <Select
                      value={formData.collateralType}
                      onValueChange={(value) => handleInputChange("collateralType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select collateral type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="property">Real Estate/Property</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="equipment">Equipment/Machinery</SelectItem>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="collateralValue">Estimated Value</Label>
                      <Input
                        id="collateralValue"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.collateralValue}
                        onChange={(e) => handleInputChange("collateralValue", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collateralDescription">Description</Label>
                      <Input
                        id="collateralDescription"
                        value={formData.collateralDescription}
                        onChange={(e) => handleInputChange("collateralDescription", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Guarantors */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Guarantors Information</CardTitle>
                    <CardDescription>Provide details of your guarantors</CardDescription>
                  </div>
                  <Button type="button" variant="outline" onClick={addGuarantor} className="gap-2 bg-transparent">
                    <Plus className="h-4 w-4" />
                    Add Guarantor
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {guarantors.map((guarantor, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Guarantor {index + 1}</h4>
                      {guarantors.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGuarantor(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input
                          value={guarantor.name}
                          onChange={(e) => handleGuarantorChange(index, "name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Relationship *</Label>
                        <Input
                          value={guarantor.relationship}
                          onChange={(e) => handleGuarantorChange(index, "relationship", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Phone Number *</Label>
                        <Input
                          value={guarantor.phone}
                          onChange={(e) => handleGuarantorChange(index, "phone", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Occupation *</Label>
                        <Input
                          value={guarantor.occupation}
                          onChange={(e) => handleGuarantorChange(index, "occupation", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Address *</Label>
                      <Textarea
                        value={guarantor.address}
                        onChange={(e) => handleGuarantorChange(index, "address", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Monthly Income</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={guarantor.monthlyIncome}
                        onChange={(e) => handleGuarantorChange(index, "monthlyIncome", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Documents */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
                <CardDescription>Upload required documents for your loan application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <label htmlFor="document-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-foreground">
                          Click to upload or drag and drop
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          ID copies, income proof, business plan, collateral documents (PDF, JPG, PNG up to 10MB each)
                        </span>
                      </label>
                      <input
                        id="document-upload"
                        name="document-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Documents</Label>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                          {file.type.startsWith("image/") ? (
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm flex-1">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
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
          )}

          {/* Step 5: Review */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
                <CardDescription>Please review all information before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="font-medium text-muted-foreground">Loan Product</label>
                    <p>{formData.loanProduct}</p>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Requested Amount</label>
                    <p>${Number(formData.requestedAmount).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Repayment Term</label>
                    <p>{formData.repaymentTerm} months</p>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Monthly Income</label>
                    <p>${Number(formData.monthlyIncome).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Guarantors</label>
                    <p>{guarantors.length} guarantor(s)</p>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Documents</label>
                    <p>{uploadedFiles.length} file(s) uploaded</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
