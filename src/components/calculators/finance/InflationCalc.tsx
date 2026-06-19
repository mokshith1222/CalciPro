"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, History, ShieldAlert } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { useEffect } from "react";
import { formatCurrency } from "@/lib/formatters";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { CHART_THEME } from "@/lib/chart-config";

export function InflationCalc() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(10);
  const { addToHistory } = useCalculatorStore();
  const { triggerInput, triggerPulse, setMode } = useReactorStore();

  useEffect(() => {
    setMode("flow");
    return () => setMode("default");
  }, [setMode]);

  const data = useMemo(() => {
    const futureValue = amount * Math.pow(1 + rate / 100, years);
    const chartData = [];
    
    for (let i = 0; i <= years; i++) {
      chartData.push({
        year: `Year ${i}`,
        value: Math.round(amount * Math.pow(1 + rate / 100, i)),
        purchasingPower: Math.round(amount / Math.pow(1 + rate / 100, i))
      });
    }

    return {
      futureValue: Math.round(futureValue),
      purchasingPower: Math.round(amount / Math.pow(1 + rate / 100, years)),
      chartData
    };
  }, [amount, rate, years]);

  const handleInputChange = (val: number, setter: (v: number) => void) => {
    setter(val);
    triggerInput();
  };

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "Inflation Calculation",
      href: "/calculators/finance/inflation",
      result: formatCurrency(data.futureValue),
    });
  };

  const percentageLoss = Math.round((1 - data.purchasingPower / amount) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      <div className="lg:col-span-12 mb-8">
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Future Adjusted Cost</p>
            <h2 className="text-5xl md:text-7xl font-black neon-text text-white">
              {formatCurrency(data.futureValue)}
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Original</p>
              <p className="text-xl font-bold text-white">{formatCurrency(amount)}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-red-500 text-xs font-bold uppercase">Value Erosion</p>
              <p className="text-xl font-bold text-red-400">-{percentageLoss}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-5 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white font-black">
              <TrendingUp className="h-6 w-6 text-orange-400" />
              ECONOMIC INPUTS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400 font-black uppercase tracking-widest text-xs">Current Value</Label>
                <Input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => handleInputChange(Number(e.target.value), setAmount)}
                    className="w-32 bg-white/5 border-white/10 text-right font-bold text-orange-400"
                  />
              </div>
              <Slider 
                value={[amount]} 
                onValueChange={([v]) => handleInputChange(v, setAmount)} 
                max={10000000} 
                step={1000} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400 font-black uppercase tracking-widest text-xs">Inflation Rate (%)</Label>
                <span className="font-black text-orange-400 text-2xl">{rate}%</span>
              </div>
              <Slider value={[rate]} onValueChange={([v]) => handleInputChange(v, setRate)} max={25} step={0.1} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400 font-black uppercase tracking-widest text-xs">Time Horizon (Years)</Label>
                <span className="font-black text-orange-400 text-2xl">{years} Years</span>
              </div>
              <Slider value={[years]} onValueChange={([v]) => handleInputChange(v, setYears)} max={50} min={1} step={1} />
            </div>

            <Button onClick={handleSave} className="w-full h-16 rounded-2xl font-black text-xl bg-orange-600 hover:bg-orange-500 text-white transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                SIMULATE EROSION
            </Button>
          </CardContent>
        </Card>

        <div className="p-6 glass-card rounded-2xl border-none flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-full">
                <ShieldAlert className="h-6 w-6 text-red-400" />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Purchasing Power</p>
                <p className="text-sm text-zinc-300">Your money today will buy what {formatCurrency(data.purchasingPower)} buys in {years} years.</p>
            </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
        <Card className="glass-card border-none shadow-2xl overflow-hidden h-full flex flex-col min-h-[500px]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="h-5 w-5 text-orange-400" />
              Cost Trajectory
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ChartWrapper config={CHART_THEME} className="h-full w-full">
              <AreaChart data={data.chartData} margin={{ top: 40, right: 40, left: 40, bottom: 40 }}>
                <defs>
                  <linearGradient id="erosionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
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
                  formatter={(value: number) => [formatCurrency(value), "Projected Cost"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f97316" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#erosionGradient)" 
                />
              </AreaChart>
            </ChartWrapper>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
