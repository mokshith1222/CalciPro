"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Activity, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BMICalc() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState<number | "">(70);
  const [height, setHeight] = useState<number | "">(175); // cm or inches
  const [age, setAge] = useState<number | "">(25);

  const w = Number(weight) || 0;
  const h = Number(height) || 0;

  let bmi = 0;
  if (unit === "metric") {
    // kg / (m^2)
    bmi = w / Math.pow(h / 100, 2);
  } else {
    // 703 * lb / (in^2)
    bmi = (703 * w) / Math.pow(h, 2);
  }

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500/10" };
    if (bmiValue < 25) return { label: "Normal weight", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (bmiValue < 30) return { label: "Overweight", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: "Obese", color: "text-rose-500", bg: "bg-rose-500/10" };
  };

  const category = getBMICategory(bmi);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-rose-500" />
              Body Mass Index (BMI)
            </CardTitle>
            <CardDescription>Measure your body fat based on height and weight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Tabs defaultValue="metric" onValueChange={setUnit} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="metric">Metric (kg, cm)</TabsTrigger>
                <TabsTrigger value="imperial">Imperial (lb, in)</TabsTrigger>
              </TabsList>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lb"})</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "in"})</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                  />
                </div>
              </div>
            </Tabs>

            <Button 
              onClick={() => { setWeight(70); setHeight(175); setAge(25); }} 
              variant="outline" 
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Data
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={bmi}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col items-center justify-center p-8 text-center bg-card shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-muted">
                <motion.div 
                  className={`h-full ${category.bg.replace('/10', '')}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              </div>

              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Your BMI Score</p>
              <h2 className="text-7xl font-black mb-4 tracking-tighter">{bmi.toFixed(1)}</h2>
              
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${category.bg} ${category.color} font-bold text-lg mb-6`}>
                {category.label}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                For your height of {height}{unit === "metric" ? "cm" : "in"}, a healthy weight range would be 
                <span className="text-foreground font-semibold"> {unit === "metric" ? `${(18.5 * Math.pow(h/100, 2)).toFixed(1)} - ${(24.9 * Math.pow(h/100, 2)).toFixed(1)} kg` : `${((18.5 * Math.pow(h, 2))/703).toFixed(1)} - ${((24.9 * Math.pow(h, 2))/703).toFixed(1)} lb`}</span>.
              </p>

              <div className="mt-8 pt-8 border-t w-full">
                <div className="flex items-start gap-3 text-left bg-muted/30 p-4 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Note: BMI is a useful measure for most people, but it doesn't account for muscle mass, bone density, or body composition.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
