"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Percent, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function GSTCalc() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");
  const { addToHistory } = useCalculatorStore();

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

  const handleSave = () => {
    addToHistory({
      name: "GST Calculation",
      href: "/calculators/finance/gst",
      result: `$${data.totalPrice.toLocaleString()}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Percent className="h-6 w-6 text-blue-500" />
              GST Settings
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Calculate Goods and Services Tax quickly and accurately.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label className="text-zinc-400">Calculation Type</Label>
              <Tabs value={type} onValueChange={(v) => setType(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
                  <TabsTrigger value="exclusive" className="data-[state=active]:bg-blue-600">GST Exclusive</TabsTrigger>
                  <TabsTrigger value="inclusive" className="data-[state=active]:bg-blue-600">GST Inclusive</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              <Label className="text-zinc-400">Amount ($)</Label>
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="h-14 bg-zinc-900 border-zinc-800 text-xl font-bold focus:ring-blue-500"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-zinc-400">GST Rate (%)</Label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map((r) => (
                  <Button 
                    key={r}
                    variant={rate === r ? "default" : "outline"}
                    onClick={() => setRate(r)}
                    className={rate === r ? "bg-blue-600 hover:bg-blue-700" : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white"}
                  >
                    {r}%
                  </Button>
                ))}
              </div>
              <Input 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))}
                className="h-12 bg-zinc-900 border-zinc-800 mt-2"
                placeholder="Custom Rate"
              />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20">
              Save to History
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <ArrowUpRight className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">CGST (50%)</p>
                  <p className="text-xl font-black">${data.cgst.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <ArrowDownRight className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">SGST (50%)</p>
                  <p className="text-xl font-black">${data.sgst.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <Card className="h-full border-none shadow-2xl overflow-hidden flex flex-col bg-zinc-950">
          <div className="bg-blue-600 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Receipt className="h-24 w-24" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Total Amount</p>
            <p className="text-5xl font-black">${data.totalPrice.toLocaleString()}</p>
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

            <div className="space-y-6 pt-6 border-t border-zinc-800">
              <div className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-xl">
                <p className="text-sm font-medium text-zinc-400">Net Amount</p>
                <p className="font-bold text-white text-lg">${data.basePrice.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-xl border-l-4 border-emerald-500">
                <p className="text-sm font-medium text-zinc-400">Total GST</p>
                <p className="font-bold text-emerald-500 text-lg">+ ${data.gstAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
