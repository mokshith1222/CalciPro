"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Activity, AlertCircle } from "lucide-react";
import { useReactorStore } from "@/hooks/use-reactor-store";

export function BMICalc() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState<number | "">(70);
  const [height, setHeight] = useState<number | "">(175);
  const [age, setAge] = useState<number | "">(25);

  const triggerInput = useReactorStore((state) => state.triggerInput);
  const triggerPulse = useReactorStore((state) => state.triggerPulse);
  const setReactorMode = useReactorStore((state) => state.setMode);

  useEffect(() => {
    setReactorMode("circle");
    return () => setReactorMode("default");
  }, [setReactorMode]);

  const w = Number(weight) || 0;
  const h = Number(height) || 0;

  let bmi = 0;
  if (unit === "metric") {
    bmi = w / Math.pow(h / 100, 2);
  } else {
    bmi = (703 * w) / Math.pow(h, 2);
  }

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: "Underweight", color: "text-blue-400", bg: "bg-blue-500/10" };
    if (bmiValue < 25) return { label: "Normal weight", color: "text-emerald-400", bg: "bg-emerald-500/10" };
    if (bmiValue < 30) return { label: "Overweight", color: "text-orange-400", bg: "bg-orange-500/10" };
    return { label: "Obese", color: "text-rose-400", bg: "bg-rose-500/10" };
  };

  const category = getBMICategory(bmi);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      <div className="lg:col-span-7">
        <Card className="bg-black/40 backdrop-blur-2xl border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-rose-500/20">
                <Activity className="h-6 w-6 text-rose-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Body Mass Index</h2>
                <p className="text-zinc-500 text-sm">Biometric Health Engine</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <Tabs defaultValue="metric" onValueChange={(v) => { setUnit(v); triggerPulse(); }} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                <TabsTrigger value="metric" className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white transition-all">Metric (kg, cm)</TabsTrigger>
                <TabsTrigger value="imperial" className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white transition-all">Imperial (lb, in)</TabsTrigger>
              </TabsList>
              
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-zinc-400 text-xs uppercase tracking-widest ml-1">Weight ({unit === "metric" ? "kg" : "lb"})</Label>
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value === "" ? "" : Number(e.target.value));
                        triggerInput();
                      }}
                      className="h-14 bg-white/5 border-white/10 rounded-2xl text-lg focus:ring-rose-500/50 focus:border-rose-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-zinc-400 text-xs uppercase tracking-widest ml-1">Height ({unit === "metric" ? "cm" : "in"})</Label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => {
                        setHeight(e.target.value === "" ? "" : Number(e.target.value));
                        triggerInput();
                      }}
                      className="h-14 bg-white/5 border-white/10 rounded-2xl text-lg focus:ring-rose-500/50 focus:border-rose-500/50 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-zinc-400 text-xs uppercase tracking-widest ml-1">Age</Label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value === "" ? "" : Number(e.target.value));
                      triggerInput();
                    }}
                    className="h-14 bg-white/5 border-white/10 rounded-2xl text-lg focus:ring-rose-500/50 focus:border-rose-500/50 transition-all"
                  />
                </div>
              </div>
            </Tabs>

            <Button 
              onClick={() => { setWeight(70); setHeight(175); setAge(25); triggerPulse(); }} 
              variant="outline" 
              className="w-full h-14 rounded-2xl border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-all shadow-lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Biometrics
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-black/40 backdrop-blur-2xl border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 text-center relative border-t-8 border-t-rose-500/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-violet-500 transition-all duration-700"
              style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
            />
          </div>

          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Biometric Index</p>
          <div className="relative mb-6">
             <h2 className="text-8xl font-light tracking-tighter text-white neon-text">{bmi.toFixed(1)}</h2>
             <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-rose-500/20 animate-pulse" />
          </div>
          
          <div className={`inline-flex items-center px-6 py-2 rounded-full ${category.bg} ${category.color} border border-white/5 font-medium text-lg mb-8 backdrop-blur-sm`}>
            {category.label}
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed max-w-[280px]">
            Target threshold for {height}{unit === "metric" ? "cm" : "in"} is:
            <span className="block text-white font-medium mt-1"> 
              {unit === "metric" ? `${(18.5 * Math.pow(h/100, 2)).toFixed(1)} - ${(24.9 * Math.pow(h/100, 2)).toFixed(1)} kg` : `${((18.5 * Math.pow(h, 2))/703).toFixed(1)} - ${((24.9 * Math.pow(h, 2))/703).toFixed(1)} lb`}
            </span>
          </p>

          <div className="mt-auto w-full pt-8">
            <div className="flex items-start gap-3 text-left bg-white/5 p-5 rounded-3xl border border-white/5">
              <AlertCircle className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                Biometric data is for analytical reference. Consultation with health professionals recommended for compositional analysis.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
