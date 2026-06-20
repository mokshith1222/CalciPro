"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Zap, TrendingUp, Info } from "lucide-react";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";
import { formatCurrency } from "@/lib/formatters";

export function SimpleInterestCalc() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(5);
  const { triggerInput, triggerPulse, setMode } = useReactorStore();
  const { addToHistory } = useCalculatorStore();

  useEffect(() => {
    setMode("grid");
    return () => setMode("default");
  }, [setMode]);

  const p = principal || 0;
  const r = rate || 0;
  const t = time || 0;

  const interest = (p * r * t) / 100;
  const total = p + interest;

  const handleInputChange = (val: number, setter: (v: number) => void) => {
    setter(val);
    triggerInput();
  };

  const handleCopy = () => {
    triggerPulse();
    navigator.clipboard.writeText(`Simple Interest: ${formatCurrency(interest)} | Total Amount: ${formatCurrency(total)}`);
  };

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "Simple Interest",
      href: "/calculators/finance/simple-interest",
      result: `${formatCurrency(total)} total`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      <div className="lg:col-span-12 mb-8">
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Maturity Value</p>
            <div className="text-5xl md:text-7xl font-black neon-text text-white">
              {formatCurrency(total)}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Principal</p>
              <p className="text-xl font-bold text-white">{formatCurrency(p)}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-cyan-500 text-xs font-bold uppercase">Interest</p>
              <p className="text-xl font-bold text-cyan-400">+{formatCurrency(interest)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              Capital Configuration
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
                max={1000000} 
                step={1000} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Interest Rate (%)</Label>
                <span className="font-black text-purple-400 text-2xl">{rate}%</span>
              </div>
              <Slider 
                value={[rate]} 
                onValueChange={([v]) => handleInputChange(v, setRate)} 
                max={30} 
                step={0.1} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Duration (Years)</Label>
                <span className="font-black text-cyan-400 text-2xl">{time} Years</span>
              </div>
              <Slider 
                value={[time]} 
                onValueChange={([v]) => handleInputChange(v, setTime)} 
                max={40} 
                min={1}
                step={1} 
              />
            </div>

            <div className="flex gap-4">
                <Button onClick={handleSave} className="flex-1 h-16 rounded-2xl font-black text-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                    SECURE INTEREST
                </Button>
                <Button 
                    variant="outline" 
                    className="h-16 w-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                    onClick={handleCopy}
                >
                    <Copy className="h-6 w-6 text-white" />
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
        <div className="glass-card rounded-3xl p-8 border-none h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-6 bg-cyan-500/10 rounded-full mb-6 relative">
                 <Zap className="h-12 w-12 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Steady Growth</h3>
            <p className="text-zinc-400 max-w-xs mx-auto">
                Simple interest is calculated only on the principal amount, making it ideal for short-term lending and installment-based loans.
            </p>
        </div>

        <div className="p-6 glass-card rounded-2xl border-none flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-full">
                <Info className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase font-black">Pro Tip</p>
                <p className="text-sm text-zinc-300">Switch to Compound Interest for better long-term wealth creation.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

