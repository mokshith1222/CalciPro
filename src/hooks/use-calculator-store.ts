"use client";

import { useState, useEffect } from "react";

export interface CalculationHistory {
  id: string;
  name: string;
  href: string;
  result: string;
  timestamp: number;
}

export function useCalculatorStore() {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]); // URLs of favorite tools
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]); // URLs of recently used tools

  useEffect(() => {
    const storedHistory = localStorage.getItem("calcipro_history") || localStorage.getItem("calcverse_history");
    const storedFavorites = localStorage.getItem("calcipro_favorites") || localStorage.getItem("calcverse_favorites");
    const storedRecent = localStorage.getItem("calcipro_recent") || localStorage.getItem("calcverse_recent");

    if (storedHistory) setHistory(JSON.parse(storedHistory));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedRecent) setRecentlyUsed(JSON.parse(storedRecent));
  }, []);

  const addToHistory = (calc: Omit<CalculationHistory, "id" | "timestamp">) => {
    const newEntry: CalculationHistory = {
      ...calc,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };
    const updated = [newEntry, ...history].slice(0, 50); // Keep last 50
    setHistory(updated);
    localStorage.setItem("calcipro_history", JSON.stringify(updated));
  };

  const toggleFavorite = (href: string) => {
    const updated = favorites.includes(href)
      ? favorites.filter((f) => f !== href)
      : [href, ...favorites];
    setFavorites(updated);
    localStorage.setItem("calcipro_favorites", JSON.stringify(updated));
  };

  const addRecent = (href: string) => {
    const updated = [href, ...recentlyUsed.filter((r) => r !== href)].slice(0, 10);
    setRecentlyUsed(updated);
    localStorage.setItem("calcipro_recent", JSON.stringify(updated));
  };

  return {
    history,
    favorites,
    recentlyUsed,
    addToHistory,
    toggleFavorite,
    addRecent,
  };
}
