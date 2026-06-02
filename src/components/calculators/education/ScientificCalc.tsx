"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useReactorStore } from "@/hooks/use-reactor-store";

export function ScientificCalc() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const triggerInput = useReactorStore((state) => state.triggerInput);
  const triggerPulse = useReactorStore((state) => state.triggerPulse);
  const setReactorMode = useReactorStore((state) => state.setMode);

  useEffect(() => {
    setReactorMode("crystal");
    return () => setReactorMode("default");
  }, [setReactorMode]);

  const handleAction = (val: string) => {
    triggerInput();

    if (val === "AC") {
      setDisplay("0");
      setEquation("");
      setReactorMode("crystal");
      return;
    }

    // Change environment based on mathematical function
    if (val === "sin" || val === "cos" || val === "tan") setReactorMode("wave");
    if (val === "log" || val === "ln") setReactorMode("logarithmic");
    if (val === "√") setReactorMode("parabolic");
    if (val === "π") setReactorMode("orbital");

    if (val === "=") {
      triggerPulse();
      try {
        const result = eval(equation.replace(/×/g, "*").replace(/÷/g, "/"));
        setDisplay(String(result));
        setEquation(String(result));
      } catch {
        setDisplay("Error");
      }
      return;
    }

    const newEq = equation === "0" ? val : equation + val;
    setEquation(newEq);
    setDisplay(newEq);
  };

  const buttons = [
    ["sin", "cos", "tan", "AC"],
    ["log", "ln", "√", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "π", "="],
  ];

  return (
    <Card className="max-w-md mx-auto bg-black/40 backdrop-blur-2xl text-white border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <div className="text-right space-y-2">
          <p className="text-zinc-500 text-xs font-mono h-4 overflow-hidden tracking-widest uppercase">{equation || "Engine Ready"}</p>
          <p className="text-5xl font-light tracking-tighter truncate neon-text">{display}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleAction(btn)}
              className={`
                h-16 rounded-2xl flex items-center justify-center text-lg font-medium transition-all duration-200 active:scale-90
                ${btn === "=" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]" : 
                  ["+", "-", "×", "÷"].includes(btn) ? "bg-zinc-800/40 text-cyan-400 border border-white/5 hover:bg-zinc-800/60" : 
                  ["sin", "cos", "tan", "log", "ln", "√", "AC"].includes(btn) ? "bg-zinc-900/40 text-zinc-500 text-sm border border-white/5 hover:text-zinc-300" : 
                  "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5"}
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
