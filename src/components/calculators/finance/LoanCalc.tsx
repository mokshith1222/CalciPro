"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Landmark, TrendingUp, Table as TableIcon, Zap } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { useEffect } from "react";
import { formatCurrency } from "@/lib/formatters";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { CHART_THEME } from "@/lib/chart-config";

export function LoanCalc() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [rate, setRate] = useState(7.5);
  const [tenure, setTenure] = useState(15);
  const { addToHistory } = useCalculatorStore();
  const { triggerInput, triggerPulse, setMode } = useReactorStore();

  useEffect(() => {
    setMode("grid");
    return () => setMode("default");
  }, [setMode]);

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

  const COLORS = ["#00f2ff", "#7000ff"];

  const handleInputChange = (val: number, setter: (v: number) => void) => {
    setter(val);
    triggerInput();
  };

  const handleSave = () => {
    triggerPulse();
    addToHistory({
      name: "Loan Calculation",
      href: "/calculators/finance/loan",
      result: `${formatCurrency(data.emi)}/mo`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      <div className="lg:col-span-12 mb-8">
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Monthly Repayment</p>
            <h2 className="text-5xl md:text-7xl font-black neon-text text-white">
              {formatCurrency(data.emi)}
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-zinc-500 text-xs font-bold uppercase">Borrowed</p>
              <p className="text-xl font-bold text-white">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="text-right border-l border-white/10 pl-4">
              <p className="text-rose-500 text-xs font-bold uppercase">Interest Burden</p>
              <p className="text-xl font-bold text-rose-400">+{formatCurrency(data.totalInterest)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        <Card className="glass-card border-none shadow-2xl font-bold">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <Landmark className="h-6 w-6 text-cyan-400" />
              Loan Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300">Loan Amount</Label>
                <div className="flex items-center gap-4">
                   <Input 
                    type="number" 
                    value={loanAmount} 
                    onChange={(e) => handleInputChange(Number(e.target.value), setLoanAmount)}
                    className="w-32 bg-white/5 border-white/10 text-right font-bold text-cyan-400"
                  />
                </div>
              </div>
              <Slider 
                value={[loanAmount]} 
                onValueChange={([v]) => handleInputChange(v, setLoanAmount)} 
                max={100000000} 
                step={10000} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300">Interest Rate (%)</Label>
                <span className="font-black text-purple-400 text-2xl">{rate}%</span>
              </div>
              <Slider 
                value={[rate]} 
                onValueChange={([v]) => handleInputChange(v, setRate)} 
                max={25} 
                step={0.1} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-zinc-300">Duration (Years)</Label>
                <span className="font-black text-cyan-400 text-2xl">{tenure} Years</span>
              </div>
              <Slider 
                value={[tenure]} 
                onValueChange={([v]) => handleInputChange(v, setTenure)} 
                max={40} 
                min={1}
                step={1} 
              />
            </div>

            <Button onClick={handleSave} className="w-full h-16 rounded-2xl font-black text-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                SIMULATE LOAN
            </Button>
          </CardContent>
        </Card>

         <Card className="glass-card border-none text-white overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <TableIcon className="h-4 w-4 text-cyan-400" />
              First 12 Months Amortization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="p-4 text-zinc-500 font-black">MONTH</th>
                    <th className="p-4 text-zinc-500 font-black">PRINCIPAL</th>
                    <th className="p-4 text-zinc-500 font-black">INTEREST</th>
                    <th className="p-4 text-zinc-500 font-black">BALANCE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.amortization.map((row) => (
                    <tr key={row.month} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold">{row.month}</td>
                      <td className="p-4 text-emerald-400 font-bold">{formatCurrency(row.principal)}</td>
                      <td className="p-4 text-rose-400 font-bold">{formatCurrency(row.interest)}</td>
                      <td className="p-4 font-mono text-zinc-400">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
        <Card className="glass-card border-none shadow-2xl h-full flex flex-col min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Repayment Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center">
            <ChartWrapper config={CHART_THEME} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={data.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [formatCurrency(value), ""]}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ChartWrapper>
          </CardContent>
        </Card>

        <div className="p-6 glass-card rounded-2xl border-none flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-full">
                <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Total Liability</p>
                <p className="text-sm text-zinc-300">You will pay a total of {formatCurrency(data.totalPayment)} over the tenure.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

