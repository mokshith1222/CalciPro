"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Landmark, TrendingUp } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function LumpsumCalc() {
  const [investment, setInvestment] = useState(100000);
  const [rate, setRate] = useState(12);
  const [time, setTime] = useState(10);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const totalValue = investment * Math.pow(1 + rate / 100, time);
    const estReturns = totalValue - investment;
    return {
      totalValue,
      estReturns,
      chartData: [
        { name: "Invested Amount", value: investment },
        { name: "Est. Returns", value: estReturns }
      ]
    };
  }, [investment, rate, time]);

  const COLORS = ["#3b82f6", "#10b981"];

  const handleSave = () => {
    addToHistory({
      name: "Lumpsum Investment",
      href: "/calculators/finance/lumpsum",
      result: `$${data.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-primary" />
              Lumpsum Parameters
            </CardTitle>
            <CardDescription>Estimate your one-time investment growth.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Investment Amount ($)</Label>
                <span className="font-black text-primary">${investment.toLocaleString()}</span>
              </div>
              <Slider value={[investment]} onValueChange={([v]) => setInvestment(v)} max={10000000} step={10000} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Expected Annual Return (%)</Label>
                <span className="font-black text-primary">{rate}%</span>
              </div>
              <Slider value={[rate]} onValueChange={([v]) => setRate(v)} max={30} step={0.1} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Time Period (Years)</Label>
                <span className="font-black text-primary">{time} Years</span>
              </div>
              <Slider value={[time]} onValueChange={([v]) => setTime(v)} max={40} step={1} />
            </div>

            <Button onClick={handleSave} className="w-full h-12 rounded-xl font-bold">Save to History</Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <Card className="bg-zinc-900 text-white border-none shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader>
            <CardTitle className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Total Wealth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-center">
            <p className="text-6xl font-black tracking-tighter">${data.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-left">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Invested</p>
                <p className="text-lg font-bold">${investment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Returns</p>
                <p className="text-lg font-bold text-emerald-400">+${data.estReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
