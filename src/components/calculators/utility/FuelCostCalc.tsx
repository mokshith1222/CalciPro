"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Fuel, Navigation, Info } from "lucide-react";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { formatCurrency } from "@/lib/formatters";

export function FuelCostCalc() {
  const [distance, setDistance] = useState(500);
  const [mileage, setMileage] = useState(15);
  const [price, setPrice] = useState(96);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const litersNeeded = mileage > 0 ? distance / mileage : 0;
    const totalCost = litersNeeded * price;

    return {
      liters: litersNeeded.toFixed(2),
      totalCost: Math.round(totalCost)
    };
  }, [distance, mileage, price]);

  const handleSave = () => {
    addToHistory({
      name: "Fuel Trip Plan",
      href: "/calculators/utility/fuel-cost",
      result: `${formatCurrency(data.totalCost)} total`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Navigation className="h-6 w-6 text-primary" />
              Trip Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Trip Distance (km)</Label>
                <span className="font-black text-primary text-xl">{distance} km</span>
              </div>
              <Slider value={[distance]} onValueChange={([v]) => setDistance(v)} max={2000} step={10} className="py-4" />
              <Input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="bg-zinc-900 border-zinc-800" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Fuel Price (₹ / Litre)</Label>
                <span className="font-black text-primary text-xl">{formatCurrency(price)}</span>
              </div>
              <Slider value={[price]} onValueChange={([v]) => setPrice(v)} min={50} max={150} step={0.5} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Vehicle Mileage (km / L)</Label>
                <span className="font-black text-primary text-xl">{mileage} km/L</span>
              </div>
              <Slider value={[mileage]} onValueChange={([v]) => setMileage(v)} min={5} max={60} step={0.5} className="py-4" />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20">
              Save Trip Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card className="border-none shadow-2xl overflow-hidden flex flex-col bg-zinc-950 border border-zinc-800/50">
          <div className="bg-primary p-8 text-primary-foreground text-center relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Fuel className="h-24 w-24" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Estimated Fuel Cost</p>
            <p className="text-6xl font-black">{formatCurrency(data.totalCost)}</p>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
              <div>
                <p className="text-xs text-zinc-500 font-black uppercase tracking-wider mb-1">Fuel Required</p>
                <p className="text-2xl font-black text-white">{data.liters} L</p>
              </div>
              <div className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                <Fuel className="h-6 w-6 text-zinc-400" />
              </div>
            </div>

            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Travel Tip</span>
              </div>
              <p className="text-xs text-zinc-500 italic leading-relaxed">
                Maintaining a steady speed and ensuring correct tire pressure can improve your mileage by up to 10% on long trips.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}