"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Wallet, ArrowRight, History } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function InflationCalc() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(10);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const futureValue = amount * Math.pow(1 + rate / 100, years);
    const chartData = [];
    
    for (let i = 0; i <= years; i++) {
      chartData.push({
        year: i,
        value: Math.round(amount * Math.pow(1 + rate / 100, i))
      });
    }

    return {
      futureValue: Math.round(futureValue),
      purchasingPower: Math.round(amount / Math.pow(1 + rate / 100, years)),
      chartData
    };
  }, [amount, rate, years]);

  const handleSave = () => {
    addToHistory({
      name: "Inflation Calculation",
      href: "/calculators/finance/inflation",
      result: `$${data.futureValue.toLocaleString()}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              Economic Factors
            </CardTitle>
            <CardDescription className="text-zinc-400">
              See how inflation erodes your money's value over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Current Amount ($)</Label>
                <span className="font-black text-orange-500 text-2xl">${amount.toLocaleString()}</span>
              </div>
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="h-12 bg-zinc-900 border-zinc-800 text-xl font-bold"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Inflation Rate (PA %)</Label>
                <span className="font-black text-orange-500 text-2xl">{rate}%</span>
              </div>
              <Slider value={[rate]} onValueChange={([v]) => setRate(v)} max={20} step={0.1} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Time Period (Years)</Label>
                <span className="font-black text-orange-500 text-2xl">{years} Years</span>
              </div>
              <Slider value={[years]} onValueChange={([v]) => setYears(v)} max={50} min={1} step={1} className="py-4" />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-xl font-bold text-lg bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-900/20">
              Save Calculation
            </Button>
          </CardContent>
        </Card>

        <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-zinc-500" />
            <h3 className="font-bold text-white">Why this matters?</h3>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            If you have <strong>${amount.toLocaleString()}</strong> today, and inflation is <strong>{rate}%</strong>, in <strong>{years} years</strong> you will need <strong>${data.futureValue.toLocaleString()}</strong> to buy the same things. Your current money will only have the purchasing power of <strong>${data.purchasingPower.toLocaleString()}</strong> today.
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card className="border-none shadow-2xl bg-zinc-950 overflow-hidden border border-zinc-800/50 p-8 flex flex-col">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Future Cost</p>
            <p className="text-6xl font-black text-white">${data.futureValue.toLocaleString()}</p>
            
            <div className="h-[250px] w-full mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="year" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#f97316" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 space-y-4 pt-6 border-t border-zinc-800">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-sm text-zinc-400">Future Cost</span>
                    </div>
                    <span className="font-bold text-white">${data.futureValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-sm text-zinc-400">Purchasing Power</span>
                    </div>
                    <span className="font-bold text-red-500">${data.purchasingPower.toLocaleString()}</span>
                </div>
            </div>
        </Card>

        <Card className="bg-orange-600 p-8 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Value Loss</p>
                    <p className="text-4xl font-black">{Math.round((1 - data.purchasingPower / amount) * 100)}%</p>
                </div>
                <div className="p-4 bg-white/10 rounded-full">
                    <ArrowRight className="h-8 w-8 rotate-45" />
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
}
