"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Share2, TrendingUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(10);
  const [compounding, setCompounding] = useState(12);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const chartData = [];
    const r = rate / 100;
    const n = compounding;
    
    for (let t = 0; t <= time; t++) {
      const amount = principal * Math.pow(1 + r / n, n * t);
      chartData.push({
        year: t,
        amount: Math.round(amount),
        invested: principal,
        interest: Math.round(amount - principal)
      });
    }
    return chartData;
  }, [principal, rate, time, compounding]);

  const totalAmount = data[data.length - 1].amount;
  const totalInterest = totalAmount - principal;

  const handleSave = () => {
    addToHistory({
      name: "Compound Interest",
      href: "/calculators/finance/compound-interest",
      result: `$${totalAmount.toLocaleString()}`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <Card className="glass-card border-none shadow-xl">
          <CardHeader>
            <CardTitle>Calculator Inputs</CardTitle>
            <CardDescription>Adjust the sliders or type values.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Principal Amount ($)</Label>
                <span className="font-bold text-primary">${principal.toLocaleString()}</span>
              </div>
              <Slider 
                value={[principal]} 
                onValueChange={([v]) => setPrincipal(v)} 
                max={1000000} 
                step={1000} 
              />
              <Input 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(Number(e.target.value))} 
                className="bg-muted/30"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Interest Rate (%)</Label>
                <span className="font-bold text-primary">{rate}%</span>
              </div>
              <Slider 
                value={[rate]} 
                onValueChange={([v]) => setRate(v)} 
                max={30} 
                step={0.1} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Time Period (Years)</Label>
                <span className="font-bold text-primary">{time} Years</span>
              </div>
              <Slider 
                value={[time]} 
                onValueChange={([v]) => setTime(v)} 
                max={50} 
                step={1} 
              />
            </div>

            <div className="space-y-2">
              <Label>Compounding Frequency</Label>
              <select 
                value={compounding} 
                onChange={(e) => setCompounding(Number(e.target.value))}
                className="w-full bg-muted/30 border-none rounded-xl p-3 text-sm focus:ring-2 ring-primary"
              >
                <option value={1}>Annually</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
                <option value={365}>Daily</option>
              </select>
            </div>

            <Button onClick={handleSave} className="w-full rounded-full font-bold">
              Save Calculation
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-6">
              <p className="text-xs font-bold uppercase opacity-70">Total Value</p>
              <p className="text-4xl font-black">${totalAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-500 text-white border-none">
            <CardContent className="p-6">
              <p className="text-xs font-bold uppercase opacity-70">Total Interest</p>
              <p className="text-4xl font-black">${totalInterest.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-xl h-[400px] overflow-hidden bg-card">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Growth Visualization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'gray'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="var(--primary)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAmt)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
