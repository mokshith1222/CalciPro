"use client";

import { useState } from "react";
import { useCalculatorStore } from "@/hooks/use-calculator-store";
import { History, X, Trash2, ExternalLink, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CalculationHistorySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { history } = useCalculatorStore();

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        <History className="h-6 w-6" />
        {history.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-background">
            {history.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 z-[120] h-full w-full max-w-sm bg-card border-l shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" /> Calculation History
                </h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                    <Calculator className="h-8 w-8" />
                  </div>
                  <p className="text-muted-foreground font-medium">No history yet.<br/>Calculations you save will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-black uppercase text-primary tracking-widest">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</p>
                      </div>
                      <p className="text-2xl font-black mb-4">{item.result}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-3 text-[10px] rounded-lg font-bold" asChild>
                          <Link href={item.href}>
                            <ExternalLink className="mr-1 h-3 w-3" /> Revisit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
