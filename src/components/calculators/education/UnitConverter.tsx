"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Ruler, Thermometer, Box, ArrowRightLeft, RefreshCw } from "lucide-react";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

const UNITS = {
  length: {
    name: "Length",
    icon: Ruler,
    color: "text-blue-500",
    base: "meter",
    ratios: {
      millimeter: 0.001,
      centimeter: 0.01,
      meter: 1,
      kilometer: 1000,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34
    }
  },
  weight: {
    name: "Weight",
    icon: Scale,
    color: "text-emerald-500",
    base: "kilogram",
    ratios: {
      milligram: 0.000001,
      gram: 0.001,
      kilogram: 1,
      ton: 1000,
      ounce: 0.0283495,
      pound: 0.453592
    }
  },
  temperature: {
    name: "Temperature",
    icon: Thermometer,
    color: "text-orange-500",
    base: "celsius",
    ratios: {
      celsius: 1,
      fahrenheit: 1, // Custom logic needed
      kelvin: 1      // Custom logic needed
    }
  }
};

export function UnitConverter() {
  const [category, setCategory] = useState<keyof typeof UNITS>("length");
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("meter");
  const [toUnit, setToUnit] = useState<string>("foot");
  const { addToHistory } = useCalculatorStore();

  useEffect(() => {
    const units = Object.keys(UNITS[category].ratios);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [category]);

  const result = useMemo(() => {
    if (category === "temperature") {
      let celsius = value;
      if (fromUnit === "fahrenheit") celsius = (value - 32) * 5/9;
      if (fromUnit === "kelvin") celsius = value - 273.15;

      if (toUnit === "celsius") return celsius;
      if (toUnit === "fahrenheit") return (celsius * 9/5) + 32;
      if (toUnit === "kelvin") return celsius + 273.15;
      return celsius;
    }

    const baseValue = value * (UNITS[category].ratios as any)[fromUnit];
    return baseValue / (UNITS[category].ratios as any)[toUnit];
  }, [value, fromUnit, toUnit, category]);

  const swap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleSave = () => {
    addToHistory({
      name: `Unit Conversion (${category})`,
      href: "/calculators/education/unit-converter",
      result: `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`,
    });
  };

  const Icon = UNITS[category].icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon className={`h-6 w-6 ${UNITS[category].color}`} />
                {UNITS[category].name} Converter
              </CardTitle>
            </div>
            <CardDescription className="text-zinc-400">
              Convert between different units of measurement instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(UNITS) as Array<keyof typeof UNITS>).map((cat) => {
                const CatIcon = UNITS[cat].icon;
                return (
                  <Button 
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    onClick={() => setCategory(cat)}
                    className={category === cat ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 border-zinc-800 text-white"}
                  >
                    <CatIcon className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">{UNITS[cat].name}</span>
                  </Button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              <div className="md:col-span-5 space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400">From</Label>
                  <Select value={fromUnit} onValueChange={(unit) => unit && setFromUnit(unit)}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {Object.keys(UNITS[category].ratios).map(u => (
                        <SelectItem key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input 
                  type="number" 
                  value={value} 
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="h-16 bg-zinc-900 border-zinc-800 text-2xl font-black focus:ring-zinc-500"
                />
              </div>

              <div className="md:col-span-1 flex justify-center">
                <Button variant="ghost" size="icon" onClick={swap} className="rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white h-12 w-12 border border-zinc-800">
                  <ArrowRightLeft className="h-6 w-6" />
                </Button>
              </div>

              <div className="md:col-span-5 space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400">To</Label>
                  <Select value={toUnit} onValueChange={(unit) => unit && setToUnit(unit)}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {Object.keys(UNITS[category].ratios).map(u => (
                        <SelectItem key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-16 bg-zinc-900 border border-zinc-800 rounded-md flex items-center px-3 text-2xl font-black text-emerald-500">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-xl font-bold text-lg bg-white text-zinc-950 hover:bg-zinc-200">
              Save Conversion to History
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-4">
        <Card className="h-full border-none shadow-2xl bg-zinc-950 overflow-hidden border border-zinc-800/50">
          <CardHeader>
            <CardTitle className="text-white">Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.keys(UNITS[category].ratios).slice(0, 6).map(u => {
                if (u === fromUnit) return null;
                const val = (category === "temperature") ? 0 : 1; // Simplify reference
                let res = 0;
                if (category === "temperature") {
                    res = (u === "fahrenheit") ? (value * 9/5) + 32 : value + 273.15;
                } else {
                    const base = value * (UNITS[category].ratios as any)[fromUnit];
                    res = base / (UNITS[category].ratios as any)[u];
                }
                
                return (
                  <div key={u} className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                    <span className="text-xs text-zinc-400 uppercase font-black">{u}</span>
                    <span className="text-sm font-bold text-white">{res.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <Box className="h-4 w-4 text-zinc-500" />
                <span className="text-xs font-black text-zinc-400 uppercase tracking-tighter">Did you know?</span>
              </div>
              <p className="text-xs text-zinc-500 italic">
                The metric system is used by over 95% of the world's population. Only three countries—the US, Liberia, and Myanmar—still primarily use the imperial system.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
