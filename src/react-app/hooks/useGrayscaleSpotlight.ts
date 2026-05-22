import { create } from "zustand";

interface GrayscaleSpotlightState {
  enabled: boolean;
  radius: number;
  softness: number;
  burstFrom: { x: number; y: number } | null;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
  setRadius: (r: number) => void;
  setSoftness: (s: number) => void;
  setBurstFrom: (pos: { x: number; y: number } | null) => void;
}

export const useGrayscaleSpotlight = create<GrayscaleSpotlightState>((set) => ({
  enabled: true,
  radius: 150,
  softness: 0.4,
  burstFrom: null,
  toggle: () => set((s) => ({ enabled: !s.enabled })),
  setEnabled: (enabled) => set({ enabled }),
  setRadius: (radius) => set({ radius }),
  setSoftness: (softness) => set({ softness }),
  setBurstFrom: (burstFrom) => set({ burstFrom }),
}));
