"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Cpu } from "lucide-react";

export function BinaryConverter() {
  const [decimal, setDecimal] = useState<string>("10");
  const [binary, setBinary] = useState<string>("1010");

  const handleDecimalChange = (val: string) => {
    setDecimal(val);
    if (val === "") {
      setBinary("");
    } else {
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        setBinary(num.toString(2));
      }
    }
  };

  const handleBinaryChange = (val: string) => {
    setBinary(val);
    if (val === "") {
      setDecimal("");
    } else {
      const num = parseInt(val, 2);
      if (!isNaN(num)) {
        setDecimal(num.toString(10));
      }
    }
  };

  const reset = () => {
    setDecimal("10");
    setBinary("1010");
  };

  return (
    <Card className="border-none shadow-xl bg-zinc-900 text-white overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-purple-400" />
          Binary Converter
        </CardTitle>
        <CardDescription className="text-zinc-400">Convert between decimal and binary numbers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Decimal (Base 10)</Label>
            <Input 
              type="number" 
              value={decimal} 
              onChange={(e) => handleDecimalChange(e.target.value)}
              className="bg-zinc-800 border-zinc-700 h-14 text-xl font-mono text-purple-400 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex justify-center py-2">
            <div className="h-8 w-[1px] bg-zinc-800" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Binary (Base 2)</Label>
            <Input 
              type="text" 
              value={binary} 
              onChange={(e) => handleBinaryChange(e.target.value)}
              className="bg-zinc-800 border-zinc-700 h-14 text-xl font-mono text-pink-400 focus:ring-pink-500/20"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={reset} variant="secondary" className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 border-none text-white font-bold">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button onClick={() => navigator.clipboard.writeText(binary)} className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold">
            <Copy className="mr-2 h-4 w-4" /> Copy Binary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
