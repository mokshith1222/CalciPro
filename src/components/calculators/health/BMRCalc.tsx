"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Flame, Heart, Info, RotateCcw } from "lucide-react";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function BMRCalc() {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const { addToHistory } = useCalculatorStore();

  const bmr = useMemo(() => {
    // Mifflin-St Jeor Equation
    let val = 10 * weight + 6.25 * height - 5 * age;
    if (gender === "male") val += 5;
    else val -= 161;
    return Math.round(val);
  }, [age, gender, weight, height]);

  const tdee = useMemo(() => {
    return {
      sedentary: Math.round(bmr * 1.2),
      light: Math.round(bmr * 1.375),
      moderate: Math.round(bmr * 1.55),
      active: Math.round(bmr * 1.725),
      extra: Math.round(bmr * 1.9)
    };
  }, [bmr]);

  const handleSave = () => {
    addToHistory({
      name: "BMR Calculation",
      href: "/calculators/health/bmr",
      result: `${bmr} kcal/day`,
    });
  };

  const reset = () => {
    setAge(25);
    setGender("male");
    setWeight(70);
    setHeight(170);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Activity className="h-6 w-6 text-emerald-500" />
                Physical Metrics
              </CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={reset} className="text-zinc-500 hover:text-white">
              <RotateCcw className="h-4 w-4 mr-2" /> Reset
            </Button>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label className="text-zinc-400">Gender</Label>
              <Tabs value={gender} onValueChange={(v) => setGender(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
                  <TabsTrigger value="male" className="data-[state=active]:bg-emerald-600">Male</TabsTrigger>
                  <TabsTrigger value="female" className="data-[state=active]:bg-emerald-600">Female</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Label className="text-zinc-400">Age</Label>
                <Input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="h-12 bg-zinc-900 border-zinc-800 text-xl font-bold"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-zinc-400">Weight (kg)</Label>
                <Input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="h-12 bg-zinc-900 border-zinc-800 text-xl font-bold"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-zinc-400">Height (cm)</Label>
                <Input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="h-12 bg-zinc-900 border-zinc-800 text-xl font-bold"
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-xl font-bold text-lg bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/20">
              Calculate & Save Result
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-full">
              <Flame className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-black">Daily Maintenance</p>
              <p className="text-xl font-black text-white">{tdee.moderate} kcal</p>
            </div>
          </div>
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-full">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-black">Weight Loss (0.5kg/wk)</p>
              <p className="text-xl font-black text-white">{tdee.moderate - 500} kcal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full border-none shadow-2xl bg-zinc-950 overflow-hidden flex flex-col border border-zinc-800/50">
          <div className="bg-emerald-600 p-8 text-white text-center">
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Basal Metabolic Rate</p>
            <p className="text-6xl font-black">{bmr}</p>
            <p className="text-sm mt-2 opacity-70">calories per day</p>
          </div>
          
          <div className="flex-1 p-8 space-y-6">
            <h3 className="font-bold text-white border-b border-zinc-800 pb-2">Activity Level TDEE</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center group">
                <span className="text-sm text-zinc-400">Sedentary (Office job)</span>
                <span className="font-bold text-white group-hover:text-emerald-500 transition-colors">{tdee.sedentary}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm text-zinc-400">Light Exercise (1-2 days)</span>
                <span className="font-bold text-white group-hover:text-emerald-500 transition-colors">{tdee.light}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm text-zinc-400">Moderate (3-5 days)</span>
                <span className="font-bold text-white group-hover:text-emerald-500 transition-colors">{tdee.moderate}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm text-zinc-400">Heavy Exercise (6-7 days)</span>
                <span className="font-bold text-white group-hover:text-emerald-500 transition-colors">{tdee.active}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm text-zinc-400">Athlete (2x per day)</span>
                <span className="font-bold text-white group-hover:text-emerald-500 transition-colors">{tdee.extra}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-emerald-500" />
                <span className="text-[10px] font-black text-zinc-400 uppercase">Pro Tip</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                BMR is the number of calories your body needs to function at rest. Total Daily Energy Expenditure (TDEE) accounts for your activity level.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
