"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Calculator, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "./Search";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold tracking-tight text-white neon-text">CalciPro</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/calculators/finance" className="transition-colors hover:text-cyan-400 text-zinc-400">Finance</Link>
            <Link href="/calculators/education" className="transition-colors hover:text-cyan-400 text-zinc-400">Education</Link>
            <Link href="/calculators/health" className="transition-colors hover:text-cyan-400 text-zinc-400">Health</Link>
            <Link href="/calculators/tech" className="transition-colors hover:text-cyan-400 text-zinc-400">Tech</Link>
            <Link href="/calculators/utility" className="transition-colors hover:text-cyan-400 text-zinc-400">Utility</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Search />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container mx-auto space-y-4 px-4 py-4">
            <div className="sm:hidden">
              <Search />
            </div>
            <nav className="grid gap-2 text-sm font-medium">
            <Link onClick={() => setIsMenuOpen(false)} href="/calculators/finance" className="rounded-lg px-3 py-2 hover:bg-muted hover:text-primary">Finance</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/calculators/education" className="rounded-lg px-3 py-2 hover:bg-muted hover:text-primary">Education</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/calculators/health" className="rounded-lg px-3 py-2 hover:bg-muted hover:text-primary">Health</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/calculators/tech" className="rounded-lg px-3 py-2 hover:bg-muted hover:text-primary">Tech</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/calculators/utility" className="rounded-lg px-3 py-2 hover:bg-muted hover:text-primary">Utility</Link>
          </nav>
          </div>
        </div>
      )}
    </header>
  );
}
