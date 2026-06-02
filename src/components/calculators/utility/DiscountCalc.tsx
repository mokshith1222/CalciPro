"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tag, Sparkles, Receipt, Zap } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { formatCurrency } from "@/lib/formatters";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { CHART_THEME } from "@/lib/chart-config";
import { useEffect } from "react";

export function DiscountCalc() {
  const [originalPrice, setOriginalPrice] = useState(1999);
  const [discount, setDiscount] = useState(25);
  const { addToHistory } = useCalculatorStore();
  const { triggerInput, triggerPulse, setMode } = useReactorStore();

  useEffect(() => {
    setMode("fluid");
    return () => setMode("default");
  }, [setMode]);

  const data = useMemo(() => {
    const savings = (originalPrice * discount) / 100;
    const finalPrice = originalPrice - savings;

    return {
      savings: Math.round(savings),
      finalPrice: Math.round(finalPrice),
      chartData: [
        { name: "Final Price", value: Math.round(finalPrice) },
        { name: "Savings", value: Math.round(savings) }
      ]
    };
  }, [originalPrice, discount]);

  const COLORS = ["#00f2ff", "#7000ff"];

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "Discount Check",
      href: "/calculators/utility/discount",
      result: `Saved ${formatCurrency(data.savings)}`
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
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Final Price</p>
            <h2 className="text-5xl md:text-7xl font-black neon-text text-white">
              {formatCurrency(data.finalPrice)}
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Original</p>
              <p className="text-xl font-bold text-white">{formatCurrency(originalPrice)}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-emerald-500 text-xs font-bold uppercase">Total Savings</p>
              <p className="text-xl font-bold text-emerald-400">-{formatCurrency(data.savings)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <Tag className="h-6 w-6 text-cyan-400" />
              Configure Deal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">List Price</Label>
                <div className="flex items-center gap-4">
                   <Input 
                    type="number" 
                    value={originalPrice} 
                    onChange={(e) => handleInputChange(Number(e.target.value), setOriginalPrice)}
                    className="w-32 bg-white/5 border-white/10 text-right font-bold text-cyan-400"
                  />
                </div>
              </div>
              <Slider 
                value={[originalPrice]} 
                onValueChange={([v]) => handleInputChange(v, setOriginalPrice)} 
                max={100000} 
                step={100} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Discount Percentage</Label>
                <span className="font-black text-purple-400 text-2xl">{discount}%</span>
              </div>
              <Slider 
                value={[discount]} 
                onValueChange={([v]) => handleInputChange(v, setDiscount)} 
                max={99} 
                step={1} 
              />
            </div>

            <Button onClick={handleSave} className="w-full h-16 rounded-2xl font-black text-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
              SAVE TO HISTORY
            </Button>
          </CardContent>
        </Card>

        <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 rounded-full">
                    <Zap className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                    <p className="text-xs text-zinc-500 uppercase font-black">Smart Shopper Alert</p>
                    <p className="text-sm font-medium text-zinc-300">You are saving <span className="text-emerald-500 font-bold">{formatCurrency(data.savings)}</span> on this item!</p>
                </div>
            </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
        <Card className="glass-card border-none shadow-2xl h-full flex flex-col min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Visual Breakdown
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

            <p className="text-5xl font-black">{formatCurrency(data.finalPrice)}</p>
          </div>
          
          <div className="flex-1 p-8 space-y-8">
            <ChartWrapper height={250}>
              <PieChart>
                <Pie
                  data={data.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={CHART_THEME.animationDuration}
                >
                  {data.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: CHART_THEME.colors.tooltip.bg, 
                    border: `1px solid ${CHART_THEME.colors.tooltip.border}`, 
                    borderRadius: '12px' 
                  }}
                  itemStyle={{ color: CHART_THEME.colors.tooltip.text }}
                  formatter={(value: number) => [formatCurrency(value), ""]}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ChartWrapper>

            <div className="space-y-4 pt-6 border-t border-zinc-800">
              <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-xl border-l-4 border-emerald-500">
                <p className="text-sm font-medium text-zinc-400">Total Savings</p>
                <p className="font-bold text-emerald-500 text-lg">{formatCurrency(data.savings)}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}