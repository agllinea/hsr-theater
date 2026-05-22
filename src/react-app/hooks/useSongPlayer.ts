import { create } from "zustand";

interface SongPlayerState {
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    _setIsPlaying: (v: boolean) => void;
    _register: (fns: { play: () => void; pause: () => void }) => void;
}

export const useSongPlayer = create<SongPlayerState>((set) => ({
    isPlaying: false,
    play: () => {},
    pause: () => {},
    _setIsPlaying: (v) => set({ isPlaying: v }),
    _register: ({ play, pause }) => set({ play, pause }),
}));
