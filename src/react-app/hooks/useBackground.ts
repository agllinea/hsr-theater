import { create } from "zustand";

interface BackgroundState {
    src: string;
    setBackground: (src: string) => void;
    clearBackground: () => void;
}

export const useBackground = create<BackgroundState>((set) => ({
    src: "",
    setBackground: (src) => set({ src }),
    clearBackground: () => set({ src: "" }),
}));
