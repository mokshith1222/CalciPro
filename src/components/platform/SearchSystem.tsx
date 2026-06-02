"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";
import { getUniqueDirectoryCalculators } from "@/lib/calculator-directory";
import { CalculatorCard } from "@/components/platform/CalculatorCard";

export function SearchSystem() {
  const [query, setQuery] = React.useState("");
  const tools = getUniqueDirectoryCalculators();
  const visibleTools = tools
    .filter((tool) => `${tool.name} ${tool.description} ${tool.keywords.join(" ")} ${tool.categorySlug} ${tool.subcategorySlug}`.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 12);

  return (
    <section className="space-y-4" aria-label="Universal calculator search">
      <label className="relative block">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Search calculators, categories, and tools"
          type="search"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleTools.map((tool, index) => (
          <CalculatorCard key={tool.href} {...tool} featured={index < 3} />
        ))}
      </div>
    </section>
  );
}
