"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Percent, RefreshCw, Zap, TrendingUp, Sparkles } from "lucide-react";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { useEffect } from "react";

export function PercentageCalc() {
  const [num1, setNum1] = useState<number | "">(10);
  const [num2, setNum2] = useState<number | "">(100);
  const { triggerInput, triggerPulse, setMode } = useReactorStore();
  const { addToHistory } = useCalculatorStore();

  useEffect(() => {
    setMode("grid");
    return () => setMode("default");
  }, [setMode]);

  const result = (Number(num1) / 100) * Number(num2);

  const handleInputChange = (val: string, setter: (v: number | "") => void) => {
    setter(val === "" ? "" : Number(val));
    triggerInput();
  };

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "Percentage Trace",
      href: "/calculators/utility/percentage",
      result: `${num1}% of ${num2} = ${result.toLocaleString()}`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      <div className="lg:col-span-12 mb-8">
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Calculated Value</p>
            <div className="text-5xl md:text-7xl font-black neon-text text-white">
              {result.toLocaleString()}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Base Number</p>
              <p className="text-xl font-bold text-white">{num2 || 0}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-cyan-500 text-xs font-bold uppercase">Percentage</p>
              <p className="text-xl font-bold text-cyan-400">{num1 || 0}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <Percent className="h-6 w-6 text-cyan-400" />
              Equation Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                <Label className="text-zinc-300 font-bold">What is (%)</Label>
                <div className="relative">
                    <Input 
                        type="number" 
                        value={num1} 
                        onChange={(e) => handleInputChange(e.target.value, setNum1)} 
                        placeholder="10"
                        className="h-16 bg-white/5 border-white/10 text-2xl font-black text-cyan-400 px-6"
                    />
                    <Percent className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-zinc-600" />
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-zinc-300 font-bold">Of (Total)</Label>
                <Input 
                    type="number" 
                    value={num2} 
                    onChange={(e) => handleInputChange(e.target.value, setNum2)} 
                    placeholder="100"
                    className="h-16 bg-white/5 border-white/10 text-2xl font-black text-white px-6"
                />
              </div>
            </div>

            <div className="flex gap-4">
                <Button onClick={handleSave} className="flex-1 h-16 rounded-2xl font-black text-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                    SAVE TO HISTORY
                </Button>
                <Button 
                    variant="outline" 
                    className="h-16 w-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                    onClick={() => { setNum1(10); setNum2(100); triggerPulse(); }}
                >
                    <RefreshCw className="h-6 w-6 text-white" />
                </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 glass-card rounded-2xl border-none flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                    <p className="text-xs text-zinc-500 uppercase font-black">Increase</p>
                    <p className="text-sm text-zinc-300">If you add this, you get {((num2 || 0) + result).toLocaleString()}</p>
                </div>
            </div>
            <div className="p-6 glass-card rounded-2xl border-none flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-full">
                    <Sparkles className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                    <p className="text-xs text-zinc-500 uppercase font-black">Decrease</p>
                    <p className="text-sm text-zinc-300">If you subtract this, you get {((num2 || 0) - result).toLocaleString()}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-5">
        <div className="glass-card rounded-3xl p-8 border-none h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-6 bg-cyan-500/10 rounded-full mb-6 relative">
                 <Zap className="h-12 w-12 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Mathematical Precision</h3>
            <p className="text-zinc-400 max-w-xs mx-auto">
                Quickly visualize portion distributions and relative values across any numerical dataset.
            </p>
            <div className="mt-8 pt-8 border-t border-white/5 w-full">
                <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-zinc-500 font-bold uppercase">Progress</span>
                    <span className="text-cyan-400 font-black">{num1}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-cyan-500 transition-all duration-1000 shadow-[0_0_10px_rgba(0,242,255,0.5)]" 
                        style={{ width: `${Math.min(100, Number(num1)) || 0}%` }} 
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

