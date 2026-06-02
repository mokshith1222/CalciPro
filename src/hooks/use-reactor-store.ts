"use client";

import { create } from "zustand";

export type ReactorMode = "default" | "wave" | "circle" | "parabolic" | "logarithmic" | "orbital" | "crystal";

interface ReactorState {
  mode: ReactorMode;
  pulseTrigger: number;
  inputTrigger: number;
  setMode: (mode: ReactorMode) => void;
  triggerPulse: () => void;
  triggerInput: () => void;
}

export const useReactorStore = create<ReactorState>((set) => ({
  mode: "default",
  pulseTrigger: 0,
  inputTrigger: 0,
  setMode: (mode) => set({ mode }),
  triggerPulse: () => set((state) => ({ pulseTrigger: state.pulseTrigger + 1 })),
  triggerInput: () => set((state) => ({ inputTrigger: state.inputTrigger + 1 })),
}));
