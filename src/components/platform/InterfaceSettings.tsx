"use client";

import * as React from "react";
import { Monitor, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { interfaceThemes, type InterfaceTheme } from "@/lib/platform-features";
import { useReactorStore } from "@/hooks/use-reactor-store";
import { cn } from "@/lib/utils";

export function InterfaceSettings() {
  const { setTheme } = useTheme();
  const setMode = useReactorStore((state) => state.setMode);
  const triggerPulse = useReactorStore((state) => state.triggerPulse);
  const [open, setOpen] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState("calcipro-ambient");
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("calcipro-interface-theme") || localStorage.getItem("calcverse-interface-theme");
    const savedMotion = (localStorage.getItem("calcipro-reduce-motion") || localStorage.getItem("calcverse-reduce-motion")) === "true";

    if (savedTheme) {
      const activeTheme = savedTheme === "calciverse-pro" ? "calcipro-ambient" : savedTheme;
      setSelectedTheme(activeTheme);
      document.documentElement.dataset.interfaceTheme = activeTheme;
      
      // Auto-set the reactor mode based on saved theme
      const themeData = interfaceThemes.find(t => t.id === activeTheme);
      if (themeData) {
        setMode(themeData.reactorMode);
      }
    }

    setReduceMotion(savedMotion);
    document.documentElement.classList.toggle("reduce-motion", savedMotion);
  }, [setMode]);

  const chooseTheme = (theme: InterfaceTheme) => {
    setSelectedTheme(theme.id);
    localStorage.setItem("calcipro-interface-theme", theme.id);
    document.documentElement.dataset.interfaceTheme = theme.id;
    setMode(theme.reactorMode);
    triggerPulse();

    if (theme.mode === "light" || theme.mode === "dark") {
      setTheme(theme.mode);
    } else {
      setTheme("system");
    }
  };

  const toggleReduceMotion = () => {
    const next = !reduceMotion;
    setReduceMotion(next);
    localStorage.setItem("calcipro-reduce-motion", String(next));
    document.documentElement.classList.toggle("reduce-motion", next);
  };

  return (
    <div className="fixed top-24 right-8 z-[200]">
      <Button
        type="button"
        size="icon"
        className="h-14 w-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-2xl hover:scale-110 hover:bg-black/80 transition-all active:scale-95 pointer-events-auto"
        title="Interface settings"
        aria-label="Interface settings"
        onClick={() => setOpen((value) => !value)}
      >
        <Settings className="h-6 w-6 text-cyan-400" />
      </Button>

      {open ? (
        <div className="fixed top-24 right-24 w-[min(22rem,calc(100vw-4rem))] max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 rounded-[2rem] border border-white/10 bg-[#0d1117]/90 backdrop-blur-3xl p-6 text-white shadow-[0_0_50px_-12px_rgba(0,0,0,1)] pointer-events-auto">
          <div className="flex items-center justify-between gap-3 mb-6 sticky top-0 bg-[#0d1117]/10 backdrop-blur-md py-1 z-10">
            <div>
              <h2 className="text-xl font-bold tracking-tight neon-text !text-cyan-400">Control Panel</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">CalciPro Engine v2.0</p>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setOpen(false)} className="rounded-full hover:bg-white/5">
               <Settings className="h-4 w-4 text-zinc-600" />
            </Button>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3 ml-1">Luminance Mode</h3>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Appearance mode">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 gap-2 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 transition-all" 
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-3.5 w-3.5 text-orange-400" /> Light
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 gap-2 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 hover:border-violet-500/50 transition-all" 
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-3.5 w-3.5 text-violet-400" /> Dark
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-10 gap-2 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 transition-all" 
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="h-3.5 w-3.5 text-cyan-400" /> Auto
                </Button>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3 ml-1">Environment Themes</h3>
              <div className="grid gap-2">
                {interfaceThemes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    className={cn(
                      "rounded-2xl border border-white/5 p-4 text-left transition-all hover:bg-white/10 group relative overflow-hidden",
                      selectedTheme === theme.id && "border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]"
                    )}
                    onClick={() => chooseTheme(theme)}
                  >
                    {selectedTheme === theme.id && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                    )}
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold mb-1">
                      <span className={cn(selectedTheme === theme.id ? "text-cyan-400" : "text-white")}>
                        {theme.name}
                      </span>
                      <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        {theme.mode}
                      </span>
                    </div>
                    <span className="block text-xs text-zinc-500 leading-relaxed font-medium">{theme.description}</span>
                  </button>
                ))}
              </div>
            </section>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-12 justify-between rounded-xl border-white/5 bg-white/5 hover:bg-white/10 px-4 group" 
              onClick={toggleReduceMotion}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Kinetic Displacement</span>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full", reduceMotion ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30")}>
                {reduceMotion ? "Suppressed" : "Active"}
              </span>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
