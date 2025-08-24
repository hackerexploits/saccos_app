"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", disbursed: 180000, repaid: 165000, overdue: 15000 },
  { month: "Feb", disbursed: 195000, repaid: 178000, overdue: 18000 },
  { month: "Mar", disbursed: 210000, repaid: 192000, overdue: 22000 },
  { month: "Apr", disbursed: 225000, repaid: 205000, overdue: 25000 },
  { month: "May", disbursed: 240000, repaid: 218000, overdue: 28000 },
  { month: "Jun", disbursed: 255000, repaid: 235000, overdue: 32000 },
]

const chartConfig = {
  disbursed: {
    label: "Loans Disbursed",
    color: "hsl(var(--chart-1))",
  },
  repaid: {
    label: "Repayments",
    color: "hsl(var(--chart-2))",
  },
  overdue: {
    label: "Overdue",
    color: "hsl(var(--chart-3))",
  },
}

export function LoanPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Performance</CardTitle>
        <CardDescription>Monthly loan disbursements, repayments, and overdue amounts</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [
                      `$${Number(value).toLocaleString()}`,
                      chartConfig[name as keyof typeof chartConfig]?.label || name,
                    ]}
                  />
                }
              />
              <Bar dataKey="disbursed" fill={chartConfig.disbursed.color} />
              <Bar dataKey="repaid" fill={chartConfig.repaid.color} />
              <Bar dataKey="overdue" fill={chartConfig.overdue.color} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
