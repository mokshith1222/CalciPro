"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Fuel, Navigation, MapPin } from "lucide-react";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { formatCurrency } from "@/lib/formatters";
import { useEffect } from "react";

export function FuelCostCalc() {
  const [distance, setDistance] = useState(500);
  const [mileage, setMileage] = useState(15);
  const [price, setPrice] = useState(100);
  const { addToHistory } = useCalculatorStore();
  const { triggerInput, triggerPulse, setMode } = useReactorStore();

  useEffect(() => {
    setMode("flow");
    return () => setMode("default");
  }, [setMode]);

  const data = useMemo(() => {
    const litersNeeded = mileage > 0 ? distance / mileage : 0;
    const totalCost = litersNeeded * price;

    return {
      liters: litersNeeded.toFixed(2),
      totalCost: Math.round(totalCost)
    };
  }, [distance, mileage, price]);

  const handleInputChange = (val: number, setter: (v: number) => void) => {
    setter(val);
    triggerInput();
  };

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "Fuel Trip Plan",
      href: "/calculators/utility/fuel-cost",
      result: `${formatCurrency(data.totalCost)} total`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      <div className="lg:col-span-12 mb-8">
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Estimated Fuel Expense</p>
            <div className="text-5xl md:text-7xl font-black neon-text text-white">
              {formatCurrency(data.totalCost)}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Distance</p>
              <p className="text-xl font-bold text-white">{distance} KM</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-cyan-500 text-xs font-bold uppercase">Efficiency</p>
              <p className="text-xl font-bold text-cyan-400">{mileage} KM/L</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <Navigation className="h-6 w-6 text-cyan-400" />
              Route Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Trip Distance</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="number" 
                    value={distance} 
                    onChange={(e) => handleInputChange(Number(e.target.value), setDistance)}
                    className="w-24 bg-white/5 border-white/10 text-right font-bold text-cyan-400"
                  />
                  <span className="text-zinc-500 font-bold">KM</span>
                </div>
              </div>
              <Slider 
                value={[distance]} 
                onValueChange={([v]) => handleInputChange(v, setDistance)} 
                max={5000} 
                step={10} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Average Fuel Price</Label>
                <span className="font-black text-purple-400 text-2xl">{formatCurrency(price)}/L</span>
              </div>
              <Slider 
                value={[price]} 
                onValueChange={([v]) => handleInputChange(v, setPrice)} 
                min={50} 
                max={200} 
                step={1} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300 font-bold">Vehicle Economy</Label>
                <span className="font-black text-cyan-400 text-2xl">{mileage} KM/L</span>
              </div>
              <Slider 
                value={[mileage]} 
                onValueChange={([v]) => handleInputChange(v, setMileage)} 
                min={1} 
                max={100} 
                step={0.5} 
              />
            </div>

            <Button onClick={handleSave} className="w-full h-16 rounded-2xl font-black text-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
              CALCULATE TRIP COST
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
        <div className="glass-card rounded-3xl p-8 border-none flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-6 bg-cyan-500/10 rounded-full mb-6">
                <Fuel className="h-12 w-12 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Fuel Requirements</h3>
            <p className="text-5xl font-black text-cyan-400 mb-4">{data.liters} L</p>
            <p className="text-zinc-500 text-sm uppercase font-black tracking-widest">Total Volume Needed</p>
        </div>

        <div className="p-6 glass-card rounded-2xl border-none flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-full">
                <MapPin className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Navigation Note</p>
                <p className="text-sm text-zinc-300">Optimize your route to save up to 15% on consumption.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
