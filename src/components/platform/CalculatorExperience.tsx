"use client";

import type * as React from "react";
import { usePathname } from "next/navigation";
import { ActionToolbar } from "@/components/platform/ActionToolbar";
import { DiscoveryPanel } from "@/components/platform/DiscoveryPanel";
import { FAQSection } from "@/components/platform/FAQSection";
import { isCalculatorPagePath, isCalculatorToolPath } from "@/lib/platform-features";

export function CalculatorExperience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showCalculatorFeatures = isCalculatorPagePath(pathname);
  const showToolFaqs = isCalculatorToolPath(pathname);

  return (
    <>
      {showCalculatorFeatures ? <ActionToolbar pathname={pathname} /> : null}
      {children}
      {showToolFaqs ? <FAQSection pathname={pathname} /> : null}
      {showCalculatorFeatures ? <DiscoveryPanel /> : null}
    </>
  );
}
