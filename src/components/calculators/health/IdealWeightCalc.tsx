"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Heart, Info, Target } from "lucide-react";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function IdealWeightCalc() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(170);
  const { addToHistory } = useCalculatorStore();

  const results = useMemo(() => {
    // Formulas use inches
    const heightInInches = height / 2.54;
    const inchesOver5Foot = Math.max(0, heightInInches - 60);

    let devine, miller, robinson, hamwi;

    if (gender === "male") {
      devine = 50 + 2.3 * inchesOver5Foot;
      miller = 56.2 + 1.41 * inchesOver5Foot;
      robinson = 52 + 1.9 * inchesOver5Foot;
      hamwi = 48 + 2.7 * inchesOver5Foot;
    } else {
      devine = 45.5 + 2.3 * inchesOver5Foot;
      miller = 53.1 + 1.36 * inchesOver5Foot;
      robinson = 49 + 1.7 * inchesOver5Foot;
      hamwi = 45.5 + 2.2 * inchesOver5Foot;
    }

    const avg = (devine + miller + robinson + hamwi) / 4;

    return {
      devine: Math.round(devine * 10) / 10,
      miller: Math.round(miller * 10) / 10,
      robinson: Math.round(robinson * 10) / 10,
      hamwi: Math.round(hamwi * 10) / 10,
      avg: Math.round(avg * 10) / 10,
    };
  }, [gender, height]);

  const handleSave = () => {
    addToHistory({
      name: "Ideal Weight Calculation",
      href: "/calculators/health/ideal-weight",
      result: `${results.avg} kg`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Scale className="h-6 w-6 text-pink-500" />
              Body Parameters
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Calculate your ideal weight based on clinical formulas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label className="text-zinc-400">Gender</Label>
              <Tabs value={gender} onValueChange={(v) => setGender(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
                  <TabsTrigger value="male" className="data-[state=active]:bg-pink-600">Male</TabsTrigger>
                  <TabsTrigger value="female" className="data-[state=active]:bg-pink-600">Female</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Height (cm)</Label>
                <span className="font-black text-pink-500 text-2xl">{height} cm</span>
              </div>
              <Input 
                type="range" 
                min="100" 
                max="250" 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                className="h-2 w-full bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />
              <Input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                className="h-12 bg-zinc-900 border-zinc-800 text-xl font-bold mt-4"
              />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-xl font-bold text-lg bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-900/20">
              Calculate & Save Result
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Devine", val: results.devine },
            { name: "Miller", val: results.miller },
            { name: "Robinson", val: results.robinson },
            { name: "Hamwi", val: results.hamwi }
          ].map(f => (
            <div key={f.name} className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
              <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">{f.name}</p>
              <p className="text-lg font-black text-white">{f.val} <span className="text-xs">kg</span></p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full border-none shadow-2xl bg-zinc-950 overflow-hidden flex flex-col border border-zinc-800/50">
          <div className="bg-pink-600 p-8 text-white text-center">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Ideal Weight (Avg)</p>
            <p className="text-7xl font-black">{results.avg}</p>
            <p className="text-xl mt-1 font-bold opacity-70">kilograms</p>
          </div>
          
          <div className="flex-1 p-8 space-y-6">
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <h3 className="font-bold text-white">Health Note</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ideal weight is a target based on historical medical studies. However, body composition (muscle vs fat) and bone density are also critical factors for overall health.
              </p>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3">
                    <span className="text-zinc-400">Imperial</span>
                    <span className="font-bold text-white">{Math.round(results.avg * 2.20462)} lbs</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">BMI Target</span>
                    <span className="font-bold text-white">22.0</span>
                </div>
            </div>

            <div className="mt-auto p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-pink-400" />
                <span className="text-[10px] font-black text-zinc-400 uppercase">Information</span>
              </div>
              <p className="text-[10px] text-zinc-500 italic">
                These formulas were originally developed to determine dosage for medications. Today they are used as general health guidelines.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
