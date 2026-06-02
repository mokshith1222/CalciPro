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
import { useReactorStore } from "@/hooks/use-reactor-store";
import { useEffect } from "react";

export function SIPCalc() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedRate, setExpectedRate] = useState(12);
  const [years, setYears] = useState(10);
  const { addToHistory } = useCalculatorStore();
  const { triggerInput, triggerPulse, setMode } = useReactorStore();

  // Change environment based on calculation type
  useEffect(() => {
    setMode("orbital");
    return () => setMode("default");
  }, [setMode]);

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

  const COLORS = ["#00f2ff", "#7000ff"];

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "SIP Calculation",
      href: "/calculators/finance/sip",
      result: `$${data.futureValue.toLocaleString()}`,
    });
  };

  const handleInputChange = (val: number, setter: (v: number) => void) => {
    setter(val);
    triggerInput();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      <div className="lg:col-span-12 mb-8">
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Projected Wealth</p>
            <h2 className="text-5xl md:text-7xl font-black neon-text text-white">
              ${data.futureValue.toLocaleString()}
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Invested</p>
              <p className="text-xl font-bold text-white">${data.totalInvestment.toLocaleString()}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-emerald-500 text-xs font-bold uppercase">Profit</p>
              <p className="text-xl font-bold text-emerald-400">+${data.estimatedReturns.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Monthly SIP</Label>
                <span className="font-black text-cyan-400 text-2xl">${monthlyInvestment.toLocaleString()}</span>
              </div>
              <Slider 
                value={[monthlyInvestment]} 
                onValueChange={([v]) => handleInputChange(v, setMonthlyInvestment)} 
                max={100000} 
                step={500} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Expected Return</Label>
                <span className="font-black text-purple-400 text-2xl">{expectedRate}%</span>
              </div>
              <Slider 
                value={[expectedRate]} 
                onValueChange={([v]) => handleInputChange(v, setExpectedRate)} 
                max={30} 
                step={0.5} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Time Period</Label>
                <span className="font-black text-cyan-400 text-2xl">{years} Years</span>
              </div>
              <Slider 
                value={[years]} 
                onValueChange={([v]) => handleInputChange(v, setYears)} 
                max={40} 
                min={1} 
                step={1} 
              />
            </div>

            <Button onClick={handleSave} className="w-full h-16 rounded-2xl font-black text-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
              CALCULATE WEALTH
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="glass-card border-none h-full shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <ChartIcon className="h-5 w-5 text-purple-400" />
              Growth Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#02040a", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}
                  itemStyle={{ fontWeight: "bold" }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

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
