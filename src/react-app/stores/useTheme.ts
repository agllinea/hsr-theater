import { create } from "zustand";

export enum ThemeType {
    Castorice = "castorice",
    Firefly = "firefly",
}

interface ThemeState {
    theme: ThemeType;
    dark: boolean;
    setDarkPreference: (value: boolean) => void;
}

const DARK_STORAGE_KEY = "theme_dark_preference";

/**
 * Pick a random theme on first load
 */
function getInitialTheme(): ThemeType {
    const values = Object.values(ThemeType);
    return values[Math.floor(Math.random() * values.length)];
}

/**
 * Determine initial dark mode:
 * 1. localStorage preference (highest priority)
 * 2. browser prefers-color-scheme
 * 3. default to light (false)
 */
function getInitialDark(): boolean {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem(DARK_STORAGE_KEY);
    if (stored !== null) {
        return stored === "true";
    }

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export const useTheme = create<ThemeState>((set) => ({
    theme: getInitialTheme(),
    dark: getInitialDark(),

    setDarkPreference: (value: boolean) => {
        localStorage.setItem(DARK_STORAGE_KEY, String(value));
        set({ dark: value });
    },
}));
