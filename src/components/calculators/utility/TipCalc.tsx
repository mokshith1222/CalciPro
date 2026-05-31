"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Users, Utensils } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { formatCurrency } from "@/lib/formatters";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { CHART_THEME } from "@/lib/chart-config";

export function TipCalc() {
  const [bill, setBill] = useState(2000);
  const [tipPercent, setTipPercent] = useState(10);
  const [people, setPeople] = useState(2);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const tipAmount = (bill * tipPercent) / 100;
    const totalBill = bill + tipAmount;
    const personCount = Math.max(1, people);
    const perPerson = totalBill / personCount;

    return {
      tipAmount,
      totalBill,
      perPerson: Math.round(perPerson),
      chartData: [
        { name: "Base Bill", value: bill },
        { name: "Tip Amount", value: Math.round(tipAmount) }
      ]
    };
  }, [bill, tipPercent, people]);

  const COLORS = ["#6366f1", "#f59e0b"]; // Indigo and Amber

  const handleSave = () => {
    addToHistory({
      name: "Dining Tip",
      href: "/calculators/utility/tip",
      result: `${formatCurrency(data.perPerson)} per person`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Utensils className="h-6 w-6 text-primary" />
              Bill Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Total Bill (₹)</Label>
                <span className="font-black text-primary text-xl">{formatCurrency(bill)}</span>
              </div>
              <Slider value={[bill]} onValueChange={([v]) => setBill(v)} max={10000} step={50} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Tip Percentage (%)</Label>
                <span className="font-black text-primary text-xl">{tipPercent}%</span>
              </div>
              <Slider value={[tipPercent]} onValueChange={([v]) => setTipPercent(v)} max={30} step={1} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Number of People</Label>
                <span className="font-black text-primary text-xl">{people}</span>
              </div>
              <Slider value={[people]} onValueChange={([v]) => setPeople(v)} min={1} max={20} step={1} className="py-4" />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20">
              Save to History
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <Card className="h-full border-none shadow-2xl overflow-hidden flex flex-col bg-zinc-950 border border-zinc-800/50">
          <div className="bg-primary p-8 text-primary-foreground text-center relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Users className="h-20 w-20" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Each Person Pays</p>
            <p className="text-6xl font-black">{formatCurrency(data.perPerson)}</p>
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
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-zinc-400">Tip Amount</p>
                <p className="font-bold text-amber-500">{formatCurrency(data.tipAmount)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-zinc-400">Total with Tip</p>
                <p className="font-bold text-white">{formatCurrency(data.totalBill)}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}