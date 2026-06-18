"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MathematicalReactor = dynamic(
  () => import("./Main").then((mod) => mod.MathematicalReactor),
  { ssr: false }
);

export function LazyReactor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer loading until after initial mount to prevent blocking the main thread
    const timer = setTimeout(() => {
      setMounted(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  return <MathematicalReactor />;
}
