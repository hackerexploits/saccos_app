"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", savings: 2100000, deposits: 180000, withdrawals: 45000 },
  { month: "Feb", savings: 2250000, deposits: 195000, withdrawals: 52000 },
  { month: "Mar", savings: 2380000, deposits: 210000, withdrawals: 48000 },
  { month: "Apr", savings: 2520000, deposits: 225000, withdrawals: 55000 },
  { month: "May", savings: 2680000, deposits: 240000, withdrawals: 58000 },
  { month: "Jun", savings: 2847392, deposits: 255000, withdrawals: 62000 },
]

const chartConfig = {
  savings: {
    label: "Total Savings",
    color: "hsl(var(--chart-1))",
  },
  deposits: {
    label: "Monthly Deposits",
    color: "hsl(var(--chart-2))",
  },
  withdrawals: {
    label: "Monthly Withdrawals",
    color: "hsl(var(--chart-3))",
  },
}

export function SavingsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Portfolio Growth</CardTitle>
        <CardDescription>Monthly savings trends and member activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
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
              <Area
                type="monotone"
                dataKey="savings"
                stackId="1"
                stroke={chartConfig.savings.color}
                fill={chartConfig.savings.color}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
