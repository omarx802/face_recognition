"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  recognized: {
    label: "Recognized",
    color: "hsl(var(--chart-1))",
  },
  known: {
    label: "Known",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [chartData, setChartData] = React.useState<
    { date: string; recognized: number; known: number }[]
  >([])

  const [activeChart, setActiveChart] =
    React.useState<"recognized" | "known">("recognized") // Ensure activeChart can only be "recognized" or "known"

  type Entry = {
    id: number
    event: string
    timing: string
    status: string
    person: string
  }

  React.useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((entries: Entry[]) => {
        const grouped: Record<string, { recognized: number; known: number }> = {}

        for (const entry of entries) {
          const date = entry.timing.split(" ")[0]
          if (!grouped[date]) {
            grouped[date] = { recognized: 0, known: 0 }
          }
          grouped[date].recognized += 1
          if (entry.status === "Registered") {
            grouped[date].known += 1
          }
        }

        const transformed = Object.entries(grouped)
          .map(([date, { recognized, known }]) => ({
            date,
            recognized,
            known,
          }))
          .sort((a, b) => a.date.localeCompare(b.date))

        setChartData(transformed)
      })
  }, [])

  const total = React.useMemo(
    () => ({
      recognized: chartData.reduce((acc, curr) => acc + curr.recognized, 0),
      known: chartData.reduce((acc, curr) => acc + curr.known, 0),
    }),
    [chartData]
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Face Recognition Chart</CardTitle>
          <CardDescription>
            Showing recognized vs known faces per day
          </CardDescription>
        </div>
        <div className="flex">
          {["recognized", "known"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)} // Set to only "recognized" or "known"
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart} // Use activeChart instead of "views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
