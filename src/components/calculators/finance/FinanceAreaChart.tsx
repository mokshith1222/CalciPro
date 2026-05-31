"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { CHART_THEME } from "@/lib/chart-config";
import { formatCurrency } from "@/lib/formatters";

export interface FinanceChartPoint {
  year: number;
  invested: number;
  totalValue: number;
  [key: string]: number;
}

interface FinanceAreaChartProps {
  data: FinanceChartPoint[];
  height?: number;
}

/**
 * A specialized AreaChart for financial projections (SIP, Lumpsum, etc.)
 * Features Indian formatting (en-IN), smooth animations, and theme-awareness.
 */
export function FinanceAreaChart({ data, height = 350 }: FinanceAreaChartProps) {
  const indianCompactFormatter = new Intl.NumberFormat("en-IN", {
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 1,
  });

  return (
    <ChartWrapper height={height}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={CHART_THEME.colors.primary}
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor={CHART_THEME.colors.primary}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={CHART_THEME.colors.muted}
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor={CHART_THEME.colors.muted}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray={CHART_THEME.grid.strokeDasharray}
          vertical={CHART_THEME.grid.vertical}
          stroke={CHART_THEME.colors.grid}
        />
        <XAxis
          dataKey="year"
          stroke={CHART_THEME.colors.muted}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => `Yr ${val}`}
          dy={10}
        />
        <YAxis
          stroke={CHART_THEME.colors.muted}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => indianCompactFormatter.format(val)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: CHART_THEME.colors.tooltip.bg,
            borderColor: CHART_THEME.colors.tooltip.border,
            color: CHART_THEME.colors.tooltip.text,
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value: number, name: string) => [
            formatCurrency(value),
            name === "totalValue" ? "Total Value" : "Invested Amount",
          ]}
          labelFormatter={(label) => `End of Year ${label}`}
        />
        <Area
          name="invested"
          type="monotone"
          dataKey="invested"
          stroke={CHART_THEME.colors.muted}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorInvested)"
          animationDuration={CHART_THEME.animationDuration}
        />
        <Area
          name="totalValue"
          type="monotone"
          dataKey="totalValue"
          stroke={CHART_THEME.colors.primary}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorValue)"
          animationDuration={CHART_THEME.animationDuration}
        />
      </AreaChart>
    </ChartWrapper>
  );
}