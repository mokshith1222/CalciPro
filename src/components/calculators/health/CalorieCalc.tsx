"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flame } from "lucide-react";

export function CalorieCalc() {
  const [age, setAge] = useState<number | "">(25);
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState<number | "">(70);
  const [height, setHeight] = useState<number | "">(175);
  const [activity, setActivity] = useState("1.2");

  const w = Number(weight) || 0;
  const h = Number(height) || 0;
  const a = Number(age) || 0;
  const act = Number(activity);

  // Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * w + 6.25 * h - 5 * a + 5;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * a - 161;
  }

  const tdee = bmr * act;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Calorie Requirements
            </CardTitle>
            <CardDescription>Estimate your daily energy needs based on your profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" value={age} onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))} className="h-12" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))} className="h-12" />
              </div>
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input type="number" value={height} onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))} className="h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary (Little/no exercise)</SelectItem>
                  <SelectItem value="1.375">Lightly Active (1-3 days/week)</SelectItem>
                  <SelectItem value="1.55">Moderately Active (3-5 days/week)</SelectItem>
                  <SelectItem value="1.725">Very Active (6-7 days/week)</SelectItem>
                  <SelectItem value="1.9">Extra Active (Hard exercise/job)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-gradient-to-b from-orange-500 to-orange-600 text-white border-none shadow-xl flex flex-col justify-center items-center p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Daily Maintenance Calories</p>
          <p className="text-6xl font-black mb-6">{tdee.toFixed(0)}</p>
          <div className="w-full space-y-4 pt-6 border-t border-white/20">
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-80">Weight Loss</span>
              <span className="font-bold">{(tdee - 500).toFixed(0)} kcal</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-80">Weight Gain</span>
              <span className="font-bold">{(tdee + 500).toFixed(0)} kcal</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
