"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, PieChart as ChartIcon, Info, Zap } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function SIPCalc() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedRate, setExpectedRate] = useState(12);
  const [years, setYears] = useState(10);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const P = monthlyInvestment;
    const i = expectedRate / (12 * 100);
    const n = years * 12;

    // FV = P × ({[1 + i]^n - 1} / i) × (1 + i)
    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvestment = P * n;
    const estimatedReturns = futureValue - totalInvestment;

    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      chartData: [
        { name: "Total Investment", value: totalInvestment },
        { name: "Estimated Returns", value: Math.round(estimatedReturns) }
      ]
    };
  }, [monthlyInvestment, expectedRate, years]);

  const COLORS = ["#3b82f6", "#10b981"];

  const handleSave = () => {
    addToHistory({
      name: "SIP Calculation",
      href: "/calculators/finance/sip",
      result: `$${data.futureValue.toLocaleString()}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              Investment Parameters
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Plan your mutual fund SIP and see your wealth grow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Monthly SIP ($)</Label>
                <span className="font-black text-blue-500 text-2xl">${monthlyInvestment.toLocaleString()}</span>
              </div>
              <Slider value={[monthlyInvestment]} onValueChange={([v]) => setMonthlyInvestment(v)} max={100000} step={500} className="py-4" />
              <Input 
                type="number" 
                value={monthlyInvestment} 
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="bg-zinc-900 border-zinc-800"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Expected Return (PA %)</Label>
                <span className="font-black text-blue-500 text-2xl">{expectedRate}%</span>
              </div>
              <Slider value={[expectedRate]} onValueChange={([v]) => setExpectedRate(v)} max={30} step={0.5} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Time Period (Years)</Label>
                <span className="font-black text-blue-500 text-2xl">{years} Years</span>
              </div>
              <Slider value={[years]} onValueChange={([v]) => setYears(v)} max={40} min={1} step={1} className="py-4" />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20">
              Calculate Wealth
            </Button>
          </CardContent>
        </Card>

        <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 rounded-full">
                    <Zap className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                    <p className="text-xs text-zinc-500 uppercase font-black">Compound Advantage</p>
                    <p className="text-sm font-medium text-zinc-300">You earned <span className="text-emerald-500 font-bold">${data.estimatedReturns.toLocaleString()}</span> more than your investment!</p>
                </div>
            </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card className="h-full border-none shadow-2xl bg-zinc-950 overflow-hidden flex flex-col border border-zinc-800/50">
          <div className="bg-blue-600 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ChartIcon className="h-24 w-24" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Estimated Wealth</p>
            <p className="text-5xl font-black">${data.futureValue.toLocaleString()}</p>
          </div>
          
          <div className="flex-1 p-8 space-y-8">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {data.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 pt-6 border-t border-zinc-800">
              <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-xl">
                <p className="text-sm font-medium text-zinc-400">Total Investment</p>
                <p className="font-bold text-white text-lg">${data.totalInvestment.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-xl border-l-4 border-emerald-500">
                <p className="text-sm font-medium text-zinc-400">Est. Returns</p>
                <p className="font-bold text-emerald-500 text-lg">${data.estimatedReturns.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-auto p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-[10px] font-black text-zinc-400 uppercase">Financial Fact</span>
              </div>
              <p className="text-[10px] text-zinc-500 italic">
                Starting your SIP just 5 years earlier can potentially double your wealth due to the power of compounding.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
