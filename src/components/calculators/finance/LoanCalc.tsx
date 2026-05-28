"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Landmark, TrendingUp, Info, Table as TableIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";

export function LoanCalc() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [rate, setRate] = useState(7.5);
  const [tenure, setTenure] = useState(15);
  const { addToHistory } = useCalculatorStore();

  const data = useMemo(() => {
    const P = loanAmount;
    const R = rate / (12 * 100);
    const N = tenure * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const amortization = [];
    let remainingBalance = P;
    for (let i = 1; i <= Math.min(N, 12); i++) { // Show first year
      const interestForMonth = remainingBalance * R;
      const principalForMonth = emi - interestForMonth;
      remainingBalance -= principalForMonth;
      amortization.push({
        month: i,
        principal: Math.round(principalForMonth),
        interest: Math.round(interestForMonth),
        balance: Math.round(Math.max(0, remainingBalance))
      });
    }

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      amortization,
      chartData: [
        { name: "Principal", value: P },
        { name: "Interest", value: Math.round(totalInterest) }
      ]
    };
  }, [loanAmount, rate, tenure]);

  const COLORS = ["#3b82f6", "#f43f5e"];

  const handleSave = () => {
    addToHistory({
      name: "Loan Calculation",
      href: "/calculators/finance/loan",
      result: `$${data.emi.toLocaleString()}/mo`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-none shadow-2xl bg-zinc-950 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Landmark className="h-6 w-6 text-primary" />
              Loan Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Total Loan Amount ($)</Label>
                <span className="font-black text-primary text-2xl">${loanAmount.toLocaleString()}</span>
              </div>
              <Slider value={[loanAmount]} onValueChange={([v]) => setLoanAmount(v)} max={10000000} step={10000} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Interest Rate (%)</Label>
                <span className="font-black text-primary text-2xl">{rate}%</span>
              </div>
              <Slider value={[rate]} onValueChange={([v]) => setRate(v)} max={25} step={0.1} className="py-4" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-400">Duration (Years)</Label>
                <span className="font-black text-primary text-2xl">{tenure} Years</span>
              </div>
              <Slider value={[tenure]} onValueChange={([v]) => setTenure(v)} max={30} min={1} step={1} className="py-4" />
            </div>

            <Button onClick={handleSave} className="w-full h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20">
              Calculate Loan Details
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <TableIcon className="h-4 w-4 text-zinc-500" />
              First 12 Months Amortization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-zinc-950/50 border-b border-zinc-800">
                    <th className="p-3 text-zinc-500 font-black">MONTH</th>
                    <th className="p-3 text-zinc-500 font-black">PRINCIPAL</th>
                    <th className="p-3 text-zinc-500 font-black">INTEREST</th>
                    <th className="p-3 text-zinc-500 font-black">BALANCE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.amortization.map((row) => (
                    <tr key={row.month} className="border-b border-zinc-800/50">
                      <td className="p-3 font-bold">{row.month}</td>
                      <td className="p-3 text-emerald-500">${row.principal.toLocaleString()}</td>
                      <td className="p-3 text-rose-500">${row.interest.toLocaleString()}</td>
                      <td className="p-3 font-mono">${row.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <Card className="h-full border-none shadow-2xl overflow-hidden flex flex-col bg-zinc-950 border border-zinc-800/50">
          <div className="bg-primary p-8 text-primary-foreground text-center">
            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Monthly Repayment</p>
            <p className="text-6xl font-black">${data.emi.toLocaleString()}</p>
          </div>
          
          <div className="flex-1 p-8 space-y-8">
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
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 pt-6 border-t border-zinc-800">
              <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-xl">
                <p className="text-sm font-medium text-zinc-400">Total Interest</p>
                <p className="font-bold text-rose-500 text-lg">${data.totalInterest.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-xl">
                <p className="text-sm font-medium text-zinc-400">Total Payment</p>
                <p className="font-bold text-white text-lg">${data.totalPayment.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-auto p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-black text-zinc-400 uppercase">Expert Tip</span>
              </div>
              <p className="text-[10px] text-zinc-500 italic">
                Shorter tenures save you a massive amount in interest but increase your monthly commitment. Balance is key.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
