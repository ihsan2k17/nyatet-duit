"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/components/chart/chart"
import { ChartsPortfolio, PortfolioClient } from "../../api/portfolio.client"
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/shared/ui/components/button/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/shared/ui/components/dropdown/dropdown"
import { cn } from "@/libs/utils"

export const description = "Your Fund To Record a table Summary Data to Chart"

function toMonthIndex(bulan: number, tahun: number) {
  return tahun * 12 + (bulan - 1)
}

function sortByMonth(data: ChartsPortfolio[]) {
  return [...data].sort(
    (a, b) =>
      toMonthIndex(a.bulan, a.tahun) -
      toMonthIndex(b.bulan, b.tahun)
  )
}

type TimeRange = "1m" | "3m" | "6m" | "1y" | "2y" | "4y" | "all"

const RANGE_MAP: Record<TimeRange, number | "all"> = {
  "1m": 1,
  "3m": 3,
  "6m": 6,
  "1y": 12,
  "2y": 24,
  "4y": 48,
  all: "all",
}

const RANGE_LABEL: Record<TimeRange, string | "all"> = {
  "1m": "1 Month",
  "3m": "3 Month",
  "6m": "6 Month",
  "1y": "1 Year",
  "2y": "2 Year",
  "4y": "4 Year",
  all: "all",
}

function filterByRange(data: ChartsPortfolio[], range: TimeRange) {
  if (range === "all") return sortByMonth(data)

  const sorted = sortByMonth(data)
  if (!sorted.length) return []

  const last = sorted[sorted.length - 1]
  const lastIndex = toMonthIndex(last.bulan, last.tahun)
  const minIndex = lastIndex - (RANGE_MAP[range] as number) + 1

  return sorted.filter(
    (d) => toMonthIndex(d.bulan, d.tahun) >= minIndex
  )
}

function extractSeriesKeys(data: ChartsPortfolio[]) {
  if (!data.length) return []
  return Object.keys(data[0]).filter(
    (k) => k !== "bulan" && k !== "tahun"
  )
}

function buildChartConfig(keys: string[]): ChartConfig {
  return keys.reduce((acc, key) => {
    acc[key] = {
      label: key,
    }
    return acc
  }, {} as ChartConfig)
}
interface sessionProps {
  name?:string|null,
  username?: string|null
}
export function ChartAreaInteractive({name}:sessionProps) {
  const [timeRange, setTimeRange] = React.useState<TimeRange>("6m")
  const [apiData, setApiData] = React.useState<ChartsPortfolio[]>([])
  const [chartConfig, setChartConfig] = React.useState<ChartConfig>({})
  
  React.useEffect(() => {
    const api = new PortfolioClient()

    async function fetchData() {
      const res = await api.chartPortfolioReksadana()
      if (!res?.success || !res.data) return

      setApiData(res.data)

      const keys = extractSeriesKeys(res.data)
      setChartConfig(buildChartConfig(keys))
    }

    fetchData()
  }, [])

  const filteredData = React.useMemo(
    () => filterByRange(apiData, timeRange),
    [apiData, timeRange]
  )

  const seriesKeys = React.useMemo(
    () => extractSeriesKeys(filteredData),
    [filteredData]
  )

  const CHART_COLORS = [
    "var(--chart-1)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-2)",
    "var(--chart-5)",
  ]
  const activefilter = RANGE_LABEL[timeRange]
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>When Your value Grows - {name} </CardTitle>
          <CardDescription>
            Showing total visitors for the last {activefilter}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Open menu" className="gap-2 group">
              {activefilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Value</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(RANGE_LABEL) as TimeRange[]).map((item) => (
              <DropdownMenuItem key={item} onClick={() => setTimeRange(item)}
                className={cn(
                  "cursor-pointer",
                  item === timeRange && "bg-accent"
                )}
              >
                {RANGE_LABEL[item]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {seriesKeys.map((key, idx) => {
                const color = CHART_COLORS[idx % CHART_COLORS.length]
                return (
                  <linearGradient
                    key={key}
                    id={`gradient-${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              tickLine={false}
              axisLine={false}
              dataKey="bulan"
              tickFormatter={(_, index) => {
                const d = filteredData[index]
                return `${d.bulan}/${d.tahun}`
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    const d = payload?.[0]?.payload as ChartsPortfolio | undefined
                    if (!d) return ""
                    return `${d.bulan}/${d.tahun}`
                  }}
                  indicator="dot"
                />
              }
            />
            {seriesKeys.map((key, idx) => (
              <Area
                key={key}
                dataKey={key}
                type="monotone"
                stackId="a"
                stroke={CHART_COLORS[idx % CHART_COLORS.length]}
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
                fillOpacity={0.6}
                dot
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
