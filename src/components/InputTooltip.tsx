"use client";
import React, { useState } from "react";
import { Info } from "lucide-react";

interface TooltipProps {
  label: string;
  tooltip: string;
  children: React.ReactNode;
}

export function InputTooltip({ label, tooltip, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center gap-1.5 relative">
        <label className="text-sm font-medium text-zinc-400">{label}</label>
        <div 
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          className="cursor-help text-zinc-600 hover:text-primary transition-colors"
        >
          <Info className="h-3.5 w-3.5" />
          {isVisible && (
            <div className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-zinc-800 text-white text-[11px] rounded shadow-xl z-50 pointer-events-none border border-zinc-700 animate-in fade-in slide-in-from-bottom-1">
              {tooltip}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}