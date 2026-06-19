"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Zap, Landmark } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { useEffect } from "react";
import { formatCurrency } from "@/lib/formatters";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { CHART_THEME } from "@/lib/chart-config";

export function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(10);
  const [compounding, setCompounding] = useState(12);
  const { addToHistory } = useCalculatorStore();
  const { triggerInput, triggerPulse, setMode } = useReactorStore();

  useEffect(() => {
    setMode("flow");
    return () => setMode("default");
  }, [setMode]);

  const data = useMemo(() => {
    const chartData = [];
    const r = rate / 100;
    const n = compounding;
    
    for (let t = 0; t <= time; t++) {
      const amount = principal * Math.pow(1 + r / n, n * t);
      chartData.push({
        year: `Year ${t}`,
        amount: Math.round(amount),
        invested: principal,
        interest: Math.round(amount - principal)
      });
    }
    return chartData;
  }, [principal, rate, time, compounding]);

  const totalAmount = data[data.length - 1].amount;
  const totalInterest = totalAmount - principal;

  const handleInputChange = (val: number, setter: (v: number) => void) => {
    setter(val);
    triggerInput();
  };

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "Compound Interest",
      href: "/calculators/finance/compound-interest",
      result: formatCurrency(totalAmount)
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      <div className="lg:col-span-12 mb-8">
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Future Value</p>
            <h2 className="text-5xl md:text-7xl font-black neon-text text-white">
              {formatCurrency(totalAmount)}
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Initial</p>
              <p className="text-xl font-bold text-white">{formatCurrency(principal)}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-emerald-500 text-xs font-bold uppercase">Compound Gain</p>
              <p className="text-xl font-bold text-emerald-400">+{formatCurrency(totalInterest)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-5 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <Landmark className="h-6 w-6 text-cyan-400" />
              Investment Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Principal Amount</Label>
                <div className="flex items-center gap-4">
                   <Input 
                    type="number" 
                    value={principal} 
                    onChange={(e) => handleInputChange(Number(e.target.value), setPrincipal)}
                    className="w-32 bg-white/5 border-white/10 text-right font-bold text-cyan-400"
                  />
                </div>
              </div>
              <Slider 
                value={[principal]} 
                onValueChange={([v]) => handleInputChange(v, setPrincipal)} 
                max={10000000} 
                step={1000} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Annual Rate (%)</Label>
                <span className="font-black text-purple-400 text-2xl">{rate}%</span>
              </div>
              <Slider 
                value={[rate]} 
                onValueChange={([v]) => handleInputChange(v, setRate)} 
                max={50} 
                step={0.1} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Horizon (Years)</Label>
                <span className="font-black text-cyan-400 text-2xl">{time} Years</span>
              </div>
              <Slider 
                value={[time]} 
                onValueChange={([v]) => handleInputChange(v, setTime)} 
                max={50} 
                step={1} 
              />
            </div>

            <div className="space-y-4">
              <Label className="text-zinc-300 font-bold">Compounding Frequency</Label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Daily", value: 365 },
                  { label: "Monthly", value: 12 },
                  { label: "Quarterly", value: 4 },
                  { label: "Annually", value: 1 }
                ].map((freq) => (
                  <Button
                    key={freq.value}
                    variant={compounding === freq.value ? "default" : "outline"}
                    className={`h-12 rounded-xl transition-all ${
                      compounding === freq.value 
                        ? "bg-cyan-500 text-black border-none" 
                        : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                    }`}
                    onClick={() => handleInputChange(freq.value, setCompounding)}
                  >
                    {freq.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleSave} className="w-full h-16 rounded-2xl font-black text-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                SIMULATE WEALTH
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
        <Card className="glass-card border-none shadow-2xl overflow-hidden h-full flex flex-col min-h-[500px]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Wealth Trajectory
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ChartWrapper config={CHART_THEME} className="h-full w-full">
              <AreaChart data={data} margin={{ top: 40, right: 40, left: 40, bottom: 40 }}>
                <defs>
                  <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [formatCurrency(value), "Value"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#00f2ff" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#wealthGradient)" 
                />
              </AreaChart>
            </ChartWrapper>
          </CardContent>
        </Card>

        <div className="p-6 glass-card rounded-2xl border-none flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-full">
                <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Compounding Insight</p>
                <p className="text-sm text-zinc-300">Frequent compounding and longer horizons result in significant exponential growth.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

