"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Percent, RefreshCw } from "lucide-react";

export function PercentageCalc() {
  const [num1, setNum1] = useState<number | "">(10);
  const [num2, setNum2] = useState<number | "">(100);

  const result = (Number(num1) / 100) * Number(num2);

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="h-5 w-5 text-primary" />
          Percentage Calculator
        </CardTitle>
        <CardDescription>Find X percent of Y.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 space-y-2 w-full">
            <Label>What is</Label>
            <Input 
              type="number" 
              value={num1} 
              onChange={(e) => setNum1(e.target.value === "" ? "" : Number(e.target.value))} 
              placeholder="10"
            />
          </div>
          <p className="text-xl font-bold mt-6">% of</p>
          <div className="flex-1 space-y-2 w-full">
            <Label>&nbsp;</Label>
            <Input 
              type="number" 
              value={num2} 
              onChange={(e) => setNum2(e.target.value === "" ? "" : Number(e.target.value))} 
              placeholder="100"
            />
          </div>
        </div>

        <div className="p-6 bg-primary/5 rounded-2xl border text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-1">Result</p>
          <p className="text-4xl font-black text-primary">{result.toLocaleString()}</p>
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => { setNum1(10); setNum2(100); }}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </CardContent>
    </Card>
  );
}
