"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Share2, Save } from "lucide-react";

export function SimpleInterestCalc() {
  const [principal, setPrincipal] = useState<number | "">(10000);
  const [rate, setRate] = useState<number | "">(5);
  const [time, setTime] = useState<number | "">(5);

  const p = Number(principal) || 0;
  const r = Number(rate) || 0;
  const t = Number(time) || 0;

  const interest = (p * r * t) / 100;
  const total = p + interest;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Simple Interest: $${interest.toFixed(2)} | Total Amount: $${total.toFixed(2)}`);
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Simple Interest</CardTitle>
            <CardDescription>Enter the details below to instantly calculate your returns.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="e.g. 10000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 5"
                value={rate}
                onChange={(e) => setRate(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Period (Years)</Label>
              <Input
                id="time"
                type="number"
                placeholder="e.g. 5"
                value={time}
                onChange={(e) => setTime(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleReset} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm opacity-80 mb-1">Total Interest</p>
              <p className="text-4xl font-bold">${interest.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-1">Total Amount (Principal + Interest)</p>
              <p className="text-2xl font-semibold">${total.toFixed(2)}</p>
            </div>

            <div className="pt-6 flex gap-2 border-t border-primary-foreground/20">
              <Button onClick={handleCopy} variant="secondary" size="sm" className="flex-1">
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button variant="secondary" size="icon">
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Step-by-step Solution</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>Formula:</strong> S.I. = (P × R × T) / 100</p>
            <p><strong>Given:</strong></p>
            <ul className="list-disc pl-5 opacity-80">
              <li>P = ${p}</li>
              <li>R = {r}% per year</li>
              <li>T = {t} years</li>
            </ul>
            <p><strong>Calculation:</strong></p>
            <p>S.I. = ({p} × {r} × {t}) / 100</p>
            <p>S.I. = {p * r * t} / 100</p>
            <p>S.I. = <strong>${interest.toFixed(2)}</strong></p>
            <p className="mt-2 text-primary">Total Amount = {p} + {interest.toFixed(2)} = <strong>${total.toFixed(2)}</strong></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
