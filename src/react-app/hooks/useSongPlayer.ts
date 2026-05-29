import { create } from "zustand";

interface SongPlayerState {
    isPlaying: boolean;
    progress: number; // 0-100
    songTitle: string;
    play: () => void;
    pause: () => void;
    skipNext: () => void;
    skipPrev: () => void;
    seekTo: (pct: number) => void;
    _setIsPlaying: (v: boolean) => void;
    _setProgress: (v: number) => void;
    _setSongTitle: (v: string) => void;
    _register: (fns: {
        play: () => void;
        pause: () => void;
        skipNext: () => void;
        skipPrev: () => void;
        seekTo: (pct: number) => void;
    }) => void;
}

export const useSongPlayer = create<SongPlayerState>((set) => ({
    isPlaying: false,
    progress: 0,
    songTitle: "",
    play: () => {},
    pause: () => {},
    skipNext: () => {},
    skipPrev: () => {},
    seekTo: () => {},
    _setIsPlaying: (v) => set({ isPlaying: v }),
    _setProgress: (v) => set({ progress: v }),
    _setSongTitle: (v) => set({ songTitle: v }),
    _register: ({ play, pause, skipNext, skipPrev, seekTo }) =>
        set({ play, pause, skipNext, skipPrev, seekTo }),
}));
