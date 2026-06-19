"use client";

import { useState, useEffect, useMemo } from "react";
import { Search as SearchIcon, X, Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllTools } from "@/lib/calculators-registry";

export function Search() {
  const allCalculators = useMemo(() => getAllTools(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(allCalculators.slice(0, 5));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (query === "") {
      setResults(allCalculators.slice(0, 5));
    } else {
      const filtered = allCalculators.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query, allCalculators]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-full border transition-all"
      >
        <SearchIcon className="h-4 w-4" />
        <span>Search tools...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:pt-32">
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <div
              className="relative w-full max-w-xl bg-card border rounded-3xl shadow-2xl overflow-hidden transition-all"
            >
              <div className="p-4 border-b flex items-center gap-3">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
                <input
                  autoFocus
                  placeholder="What would you like to calculate today?"
                  className="flex-1 bg-transparent border-none outline-none text-lg py-2"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-2 max-h-[400px] overflow-y-auto">
                <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {query === "" ? "Quick Links" : "Search Results"}
                </div>
                
                {results.length > 0 ? (
                  results.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                          <Calculator className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm group-hover:text-primary transition-colors">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No calculators found for "{query}"
                  </div>
                )}
              </div>

              <div className="p-4 bg-muted/30 border-t flex justify-between items-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                <span>Navigate with arrows</span>
                <span>Select with Enter</span>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
