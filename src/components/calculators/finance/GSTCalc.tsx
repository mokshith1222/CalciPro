"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, ArrowUpRight, ArrowDownRight, Zap, Target } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { useEffect } from "react";
import { formatCurrency } from "@/lib/formatters";

export function GSTCalc() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");
  const { addToHistory } = useCalculatorStore();
  const { triggerInput, triggerPulse, setMode } = useReactorStore();

  useEffect(() => {
    setMode("grid");
    return () => setMode("default");
  }, [setMode]);

  const data = useMemo(() => {
    let gstAmount = 0;
    let totalPrice = 0;
    let basePrice = 0;

    if (type === "exclusive") {
      gstAmount = (amount * rate) / 100;
      totalPrice = amount + gstAmount;
      basePrice = amount;
    } else {
      gstAmount = amount - (amount * (100 / (100 + rate)));
      basePrice = amount - gstAmount;
      totalPrice = amount;
    }

    return {
      basePrice: Math.round(basePrice * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalPrice: Math.round(totalPrice * 100) / 100,
      cgst: Math.round((gstAmount / 2) * 100) / 100,
      sgst: Math.round((gstAmount / 2) * 100) / 100,
      chartData: [
        { name: "Base Price", value: basePrice },
        { name: "GST Amount", value: gstAmount }
      ]
    };
  }, [amount, rate, type]);

  const COLORS = ["#3b82f6", "#10b981"];

  const handleInputChange = (val: number, setter: (v: number) => void) => {
    setter(val);
    triggerInput();
  };

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "GST Calculation",
      href: "/calculators/finance/gst",
      result: formatCurrency(data.totalPrice),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      <div className="lg:col-span-12 mb-8">
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Final Invoice Amount</p>
            <h2 className="text-5xl md:text-7xl font-black neon-text text-white">
              {formatCurrency(data.totalPrice)}
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Net Price</p>
              <p className="text-xl font-bold text-white">{formatCurrency(data.basePrice)}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-emerald-500 text-xs font-bold uppercase">Tax Component</p>
              <p className="text-xl font-bold text-emerald-400">+{formatCurrency(data.gstAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white font-black">
              <Receipt className="h-6 w-6 text-blue-400" />
              TAX PARAMETERS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Principal Amount</Label>
                   <Input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => handleInputChange(Number(e.target.value), setAmount)}
                    className="h-16 bg-white/5 border-white/10 text-2xl font-black text-blue-400"
                  />
                  <Slider 
                    value={[amount]} 
                    onValueChange={([v]) => handleInputChange(v, setAmount)} 
                    max={1000000} 
                    step={1000} 
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-zinc-400 font-bold uppercase tracking-wider text-xs">GST RATE (%)</Label>
                   <Input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => handleInputChange(Number(e.target.value), setRate)}
                    className="h-16 bg-white/5 border-white/10 text-2xl font-black text-emerald-400"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 12, 18, 28].map((r) => (
                      <Button 
                        key={r}
                        variant={rate === r ? "default" : "outline"}
                        onClick={() => handleInputChange(r, setRate)}
                        className={`font-black ${rate === r ? "bg-blue-600 border-none" : "bg-white/5 border-white/10 text-white"}`}
                      >
                        {r}%
                      </Button>
                    ))}
                  </div>
                </div>
             </div>

            <div className="space-y-4">
              <Label className="text-zinc-400 font-bold uppercase tracking-wider text-xs text-center block">Tax Mode</Label>
              <Tabs value={type} onValueChange={(v) => { setType(v as any); triggerInput(); }} className="w-full">
                <TabsList className="grid grid-cols-2 h-16 bg-white/5 p-1 rounded-2xl border border-white/10">
                  <TabsTrigger 
                    value="exclusive" 
                    className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold"
                  >
                    GST EXCLUSIVE
                  </TabsTrigger>
                  <TabsTrigger 
                    value="inclusive" 
                    className="rounded-xl data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-bold"
                  >
                    GST INCLUSIVE
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 group hover:border-blue-500/50 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-blue-500/10 rounded-lg">
                            <ArrowUpRight className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Central GST (CGST)</p>
                    </div>
                    <p className="text-3xl font-black text-white">{formatCurrency(data.cgst)}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 group hover:border-emerald-500/50 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <ArrowDownRight className="h-5 w-5 text-emerald-500" />
                        </div>
                        <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">State GST (SGST)</p>
                    </div>
                    <p className="text-3xl font-black text-white">{formatCurrency(data.sgst)}</p>
                </div>
            </div>

            <Button onClick={handleSave} className="w-full h-16 rounded-2xl font-black text-xl bg-blue-600 hover:bg-blue-500 text-white transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                PROCESS INVOICE
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
        <Card className="glass-card border-none shadow-2xl overflow-hidden h-full flex flex-col p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-400" />
                    TAX DISTRIBUTION
                </CardTitle>
            </CardHeader>
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={12}
                                dataKey="value"
                            >
                                {data.chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(val: number) => formatCurrency(val)}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex gap-8 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-zinc-400 uppercase">Base Price</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        <span className="text-xs font-bold text-zinc-400 uppercase">GST Amount</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-4">
                <div className="p-6 glass-card rounded-2xl border-none flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-full">
                        <Zap className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Calculated View</p>
                        <p className="text-sm text-zinc-300">GST is essential for business compliance and transparent pricing.</p>
                    </div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
}
