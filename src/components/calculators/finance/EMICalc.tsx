"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Landmark, TrendingUp, ReceiptText } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function EMICalc() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(20);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const P = loanAmount;
    const R = rate / (12 * 100);
    const N = tenure * 12;

    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      chartData: [
        { name: "Principal", value: P },
        { name: "Interest", value: Math.round(totalInterest) }
      ]
    };
  }, [loanAmount, rate, tenure]);

  const COLORS = ["#3b82f6", "#f43f5e"];

  const handleSave = () => {
    addToHistory({
      name: "EMI Calculation",
      href: "/calculators/finance/emi",
      result: `$${data.emi.toLocaleString()}/mo`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-xl bg-zinc-950 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-primary" />
              Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Loan Amount ($)</Label>
                <span className="font-black text-primary text-xl">${loanAmount.toLocaleString()}</span>
              </div>
              <Slider value={[loanAmount]} onValueChange={([v]) => setLoanAmount(v)} max={20000000} step={50000} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Interest Rate (PA %)</Label>
                <span className="font-black text-primary text-xl">{rate}%</span>
              </div>
              <Slider value={[rate]} onValueChange={([v]) => setRate(v)} max={20} step={0.1} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Loan Tenure (Years)</Label>
                <span className="font-black text-primary text-xl">{tenure} Years</span>
              </div>
              <Slider value={[tenure]} onValueChange={([v]) => setTenure(v)} max={30} step={1} className="py-4" />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20">
              Calculate & Save
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <Card className="h-full border-none shadow-xl overflow-hidden flex flex-col">
          <div className="bg-primary p-8 text-primary-foreground text-center">
            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Monthly EMI</p>
            <p className="text-5xl font-black">${data.emi.toLocaleString()}</p>
          </div>
          
          <div className="flex-1 p-8 space-y-8 bg-card">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-muted-foreground">Total Interest</p>
                <p className="font-bold text-rose-500">${data.totalInterest.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="font-bold">${data.totalPayment.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
