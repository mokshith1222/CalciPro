"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Users, Utensils, Zap, Sparkles, Receipt } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { formatCurrency } from "@/lib/formatters";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { CHART_THEME } from "@/lib/chart-config";
import { useEffect } from "react";

export function TipCalc() {
  const [bill, setBill] = useState(2000);
  const [tipPercent, setTipPercent] = useState(10);
  const [people, setPeople] = useState(2);
  const { addToHistory } = useCalculatorStore();
  const { triggerInput, triggerPulse, setMode } = useReactorStore();

  useEffect(() => {
    setMode("orbital");
    return () => setMode("default");
  }, [setMode]);

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

  const COLORS = ["#00f2ff", "#7000ff"];

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "Dining Tip",
      href: "/calculators/utility/tip",
      result: `${formatCurrency(data.perPerson)} per person`
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
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Each Person Pays</p>
            <h2 className="text-5xl md:text-7xl font-black neon-text text-white">
              {formatCurrency(data.perPerson)}
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Total Bill</p>
              <p className="text-xl font-bold text-white">{formatCurrency(data.totalBill)}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-emerald-500 text-xs font-bold uppercase">Tip Component</p>
              <p className="text-xl font-bold text-emerald-400">+{formatCurrency(data.tipAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <Utensils className="h-6 w-6 text-cyan-400" />
              Dining Transaction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Total Bill</Label>
                <span className="font-black text-cyan-400 text-2xl">{formatCurrency(bill)}</span>
              </div>
              <Slider 
                value={[bill]} 
                onValueChange={([v]) => handleInputChange(v, setBill)} 
                max={50000} 
                step={100} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Gratitude (%)</Label>
                <span className="font-black text-purple-400 text-2xl">{tipPercent}%</span>
              </div>
              <Slider 
                value={[tipPercent]} 
                onValueChange={([v]) => handleInputChange(v, setTipPercent)} 
                max={50} 
                step={1} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Group Size</Label>
                <span className="font-black text-cyan-400 text-2xl">{people} People</span>
              </div>
              <Slider 
                value={[people]} 
                onValueChange={([v]) => handleInputChange(v, setPeople)} 
                min={1} 
                max={50} 
                step={1} 
              />
            </div>

            <Button onClick={handleSave} className="w-full h-16 rounded-2xl font-black text-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
              PROCESS CALCULATION
            </Button>
          </CardContent>
        </Card>

        <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 rounded-full">
                    <Zap className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                    <p className="text-xs text-zinc-500 uppercase font-black">Split Advice</p>
                    <p className="text-sm font-medium text-zinc-300">Splitting with <span className="text-emerald-500 font-bold">{people} people</span> makes it more affordable!</p>
                </div>
            </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
        <Card className="glass-card border-none shadow-2xl h-full flex flex-col min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Receipt className="h-5 w-5 text-purple-400" />
              Bill Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center">
            <ChartWrapper config={CHART_THEME} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={data.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [formatCurrency(value), ""]}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ChartWrapper>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
