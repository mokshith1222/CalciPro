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
    // Defer loading until after initial mount
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <MathematicalReactor />;
}
