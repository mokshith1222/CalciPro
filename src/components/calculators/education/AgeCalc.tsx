"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";

export function AgeCalc() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Age Calculator
            </CardTitle>
            <CardDescription>Enter your date of birth to see your exact age.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="h-12"
              />
            </div>
            <Button onClick={calculateAge} className="w-full h-12 text-lg font-bold">Calculate Age</Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        {age ? (
          <Card className="h-full bg-muted/30 border-none flex flex-col justify-center items-center p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-black">{age.years}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Years</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold">{age.months}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Months</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{age.days}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Days</p>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="h-full rounded-3xl border border-dashed flex items-center justify-center p-12 text-muted-foreground text-sm">
            Enter your birthday to see results
          </div>
        )}
      </div>
    </div>
  );
}
