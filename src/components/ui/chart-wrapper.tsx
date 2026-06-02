"use client";

import React, { ReactNode } from "react";
import { ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";

interface ChartWrapperProps {
  children: ReactNode;
  height?: number | string;
  className?: string;
  config?: unknown;
}

/**
 * A responsive wrapper for Recharts components.
 * Ensures "use client" directive and handles dynamic height.
 */
export function ChartWrapper({ 
  children, 
  height = 350, 
  className = ""
}: ChartWrapperProps) {
  // theme is accessed here in case we need to force rerenders on theme change,
  // though CSS variables usually handle this automatically.
  const { resolvedTheme } = useTheme();
  void resolvedTheme;

  return (
    <div 
      className={`w-full overflow-hidden ${className}`} 
      style={{ height }}
      dir="ltr" // Ensures chart directions are consistent
    >
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  );
}
