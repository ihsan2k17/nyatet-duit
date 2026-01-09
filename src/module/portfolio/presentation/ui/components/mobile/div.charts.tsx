"use client"
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
import React from "react"
import { ChartsPortfolio, PortfolioClient } from "../../../api/portfolio.client"
import { Button } from "@/shared/ui/components/button/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/components/dropdown/dropdown"
import { cn } from "@/libs/utils"

export const description = "An area chart with a legend"

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

export function DivChart() {
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
        <Card>
            <CardHeader className="px-3">
                <div className="flex flex-row items-center justify-between">
                    <CardTitle className="font-bold text-lg">When Your value Grows</CardTitle>
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
                </div>
                <CardDescription>
                    Showing total visitors for the last {activefilter}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0" >
                <ChartContainer config={chartConfig} >
                    <AreaChart
                        accessibilityLayer
                        data={filteredData}
                        margin={{
                            left: 10,
                            right: 10,
                        }}
                        
                    >
                        <CartesianGrid vertical={false} />
                        
                        <XAxis
                            tickLine={false}
                            axisLine={false}
                            dataKey="bulan"
                            tickFormatter={(_, index) => {
                                const d = filteredData[index]
                                if (!d) return ""
                                const isEdge =
                                index === 0 || index === filteredData.length - 1
                                if (isEdge) return ""
                                return `${String(d.bulan).padStart(2,"0")}/${String(d.tahun).slice(-2)}`
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
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
