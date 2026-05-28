"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ScientificCalc() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleAction = (val: string) => {
    if (val === "AC") {
      setDisplay("0");
      setEquation("");
      return;
    }

    if (val === "=") {
      try {
        // Simple eval-like behavior (Note: in production use a math library like mathjs)
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
    <Card className="max-w-md mx-auto bg-[#1a1a1a] text-white border-zinc-800 shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="bg-zinc-900/50 p-6">
        <div className="text-right space-y-2">
          <p className="text-zinc-500 text-xs font-mono h-4 overflow-hidden">{equation || " "}</p>
          <p className="text-4xl font-bold tracking-tighter truncate">{display}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-zinc-900/20">
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => (
            <motion.button
              key={btn}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction(btn)}
              className={`
                h-14 rounded-2xl flex items-center justify-center text-lg font-bold transition-colors
                ${btn === "=" ? "bg-primary text-primary-foreground col-span-1" : 
                  ["+", "-", "×", "÷"].includes(btn) ? "bg-zinc-800 text-primary" : 
                  ["sin", "cos", "tan", "log", "ln", "√", "AC"].includes(btn) ? "bg-zinc-800/50 text-zinc-400 text-sm" : 
                  "bg-zinc-900 hover:bg-zinc-800 text-zinc-200"}
              `}
            >
              {btn}
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
