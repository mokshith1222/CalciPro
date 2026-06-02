"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SaveScenarioSystem({ name = "Saved scenario" }: { name?: string }) {
  const save = () => {
    const saved = JSON.parse(localStorage.getItem("calcpro-scenarios") || "[]") as unknown[];
    localStorage.setItem(
      "calcpro-scenarios",
      JSON.stringify([{ name, url: window.location.href, savedAt: new Date().toISOString() }, ...saved].slice(0, 25))
    );
  };

  return (
    <Button type="button" variant="outline" className="gap-2" onClick={save}>
      <Save className="h-4 w-4" />
      Save scenario
    </Button>
  );
}
