"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tag, Sparkles, Receipt } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { formatCurrency } from "@/lib/formatters";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { CHART_THEME } from "@/lib/chart-config";

export function DiscountCalc() {
  const [originalPrice, setOriginalPrice] = useState(1999);
  const [discount, setDiscount] = useState(25);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const savings = (originalPrice * discount) / 100;
    const finalPrice = originalPrice - savings;

    return {
      savings: Math.round(savings),
      finalPrice: Math.round(finalPrice),
      chartData: [
        { name: "Final Price", value: Math.round(finalPrice) },
        { name: "Savings", value: Math.round(savings) }
      ]
    };
  }, [originalPrice, discount]);

  const COLORS = ["#3b82f6", "#10b981"]; // Blue and Emerald

  const handleSave = () => {
    addToHistory({
      name: "Discount Check",
      href: "/calculators/utility/discount",
      result: `Saved ${formatCurrency(data.savings)}`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Tag className="h-6 w-6 text-primary" />
              Price Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Original Price (₹)</Label>
                <span className="font-black text-primary text-xl">{formatCurrency(originalPrice)}</span>
              </div>
              <Slider value={[originalPrice]} onValueChange={([v]) => setOriginalPrice(v)} max={50000} step={100} className="py-4" />
              <Input 
                type="number" 
                value={originalPrice} 
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="bg-zinc-900 border-zinc-800"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Discount Percentage (%)</Label>
                <span className="font-black text-primary text-xl">{discount}%</span>
              </div>
              <Slider value={[discount]} onValueChange={([v]) => setDiscount(v)} max={99} step={1} className="py-4" />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20">
              Save to History
            </Button>
          </CardContent>
        </Card>

        <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full">
            <Sparkles className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-sm text-zinc-300">
            You are saving <span className="text-emerald-500 font-bold">{discount}%</span> on this purchase!
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card className="h-full border-none shadow-2xl overflow-hidden flex flex-col bg-zinc-950 border border-zinc-800/50">
          <div className="bg-primary p-8 text-primary-foreground text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Receipt className="h-24 w-24" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Final Price</p>
            <p className="text-5xl font-black">{formatCurrency(data.finalPrice)}</p>
          </div>
          
          <div className="flex-1 p-8 space-y-8">
            <ChartWrapper height={250}>
              <PieChart>
                <Pie
                  data={data.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={CHART_THEME.animationDuration}
                >
                  {data.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: CHART_THEME.colors.tooltip.bg, 
                    border: `1px solid ${CHART_THEME.colors.tooltip.border}`, 
                    borderRadius: '12px' 
                  }}
                  itemStyle={{ color: CHART_THEME.colors.tooltip.text }}
                  formatter={(value: number) => [formatCurrency(value), ""]}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ChartWrapper>

            <div className="space-y-4 pt-6 border-t border-zinc-800">
              <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-xl border-l-4 border-emerald-500">
                <p className="text-sm font-medium text-zinc-400">Total Savings</p>
                <p className="font-bold text-emerald-500 text-lg">{formatCurrency(data.savings)}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}