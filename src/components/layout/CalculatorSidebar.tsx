"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { calculatorCategories } from "@/lib/calculators-registry";

export function CalculatorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6 h-fit lg:sticky lg:top-24">
      {calculatorCategories.map((group) => (
        <div key={group.id} className="space-y-3">
          <h3 className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-2", group.color)}>
            <group.icon className="h-4 w-4" />
            {group.name}
          </h3>
          <nav className="flex flex-col gap-0.5">
            {group.tools.map((tool) => {
              const href = `/calculators/${group.id}/${tool.slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105 z-10" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="truncate">{tool.name}</span>
                  {isActive && <motion.div layoutId="active-pill" className="w-1 h-1 rounded-full bg-white" />}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}

      <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1 relative z-10">Request Tool</p>
        <p className="text-[10px] text-muted-foreground mb-4 relative z-10">Don't see your tool?</p>
        <Button variant="outline" size="sm" className="w-full h-8 text-[10px] rounded-full border-primary/20 relative z-10">
          Contact Support
        </Button>
      </div>
    </aside>
  );
}
