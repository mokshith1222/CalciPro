"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { searchDirectoryCalculators, type DirectoryCalculator } from "@/lib/calculator-directory";
import { CalculatorCard } from "@/components/platform/CalculatorCard";

type DirectoryCalculatorGridProps = {
  calculators: DirectoryCalculator[];
  showFilters?: boolean;
};

type SortOption = "popularity" | "az" | "recent" | "used";
type FilterOption = "all" | "free" | "featured" | "new" | "trending";

export function DirectoryCalculatorGrid({ calculators = [], showFilters = false }: DirectoryCalculatorGridProps) {
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<SortOption>("popularity");
  const [filterBy, setFilterBy] = React.useState<FilterOption>("all");

  const visibleCalculators = React.useMemo(() => {
    if (!Array.isArray(calculators)) return [];
    let results = searchDirectoryCalculators(calculators, query);

    if (filterBy === "featured") results = results.filter((calculator) => calculator.featured);
    if (filterBy === "new") results = results.filter((calculator) => calculator.isNew);
    if (filterBy === "trending") results = results.filter((calculator) => calculator.trending);

    return [...results].sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name);
      if (sortBy === "recent") return b.addedAt.localeCompare(a.addedAt);
      return b.popularity - a.popularity;
    });
  }, [calculators, filterBy, query, sortBy]);

  return (
    <section className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Search calculators, descriptions, keywords, categories..."
            type="search"
          />
        </label>

        {showFilters ? (
          <>
            <label className="flex items-center gap-2 rounded-lg border bg-background px-3">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterBy}
                onChange={(event) => setFilterBy(event.target.value as FilterOption)}
                className="h-10 bg-transparent text-sm outline-none"
                aria-label="Filter calculators"
              >
                <option value="all">Free</option>
                <option value="featured">Featured</option>
                <option value="new">New</option>
                <option value="trending">Trending</option>
              </select>
            </label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="h-11 rounded-lg border bg-background px-3 text-sm outline-none"
              aria-label="Sort calculators"
            >
              <option value="popularity">Popularity</option>
              <option value="az">A-Z</option>
              <option value="recent">Recently Added</option>
              <option value="used">Most Used</option>
            </select>
          </>
        ) : null}
      </div>

      {visibleCalculators.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCalculators.map((calculator, index) => (
            <CalculatorCard
              key={`${calculator.slug}-${calculator.categorySlug}-${calculator.subcategorySlug}-${index}`}
              name={calculator.name}
              href={calculator.href}
              description={calculator.description}
              featured={calculator.featured}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed bg-muted/20 p-10 text-center">
          <h3 className="text-lg font-bold">No calculators found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Try another search or filter.</p>
        </div>
      )}
    </section>
  );
}
