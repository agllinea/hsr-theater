import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Song } from "../types/models";
import "./SongPlayer.css";

export interface SongPlayerProps {
    song: Song;
    autoPlay?: boolean;
}

export function SongPlayer({ song, autoPlay = false }: SongPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentLyric, setCurrentLyric] = useState("");
    const [playingPercentage, setPlayingPercentage] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lyricsRef = useRef<Array<{ time: number; text: string }>>([]);
    const animationFrameRef = useRef<number | null>(null);
    const currentLyricIndexRef = useRef<number>(-1);

    const parseLRC = (lrcContent: string) => {
        const lyrics: Array<{ time: number; text: string }> = [];
        lrcContent.split("\n").forEach((line) => {
            const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
            if (match) {
                const time =
                    parseInt(match[1]) * 60 +
                    parseInt(match[2]) +
                    parseInt(match[3].padEnd(3, "0")) / 1000;
                const text = match[4].trim();
                if (text) lyrics.push({ time, text });
            }
        });
        return lyrics.sort((a, b) => a.time - b.time);
    };

    const updateLyrics = () => {
        if (!audioRef.current) return;

        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const lyrics = lyricsRef.current;

        if (duration && !isNaN(duration) && duration > 0) {
            setPlayingPercentage((currentTime / duration) * 100);
        }

        if (lyrics.length > 0) {
            const threshold = 0.25;
            let idx = currentLyricIndexRef.current;

            if (idx < lyrics.length - 1 && currentTime >= lyrics[idx + 1].time - threshold) {
                idx++;
                while (idx < lyrics.length - 1 && currentTime >= lyrics[idx + 1].time - threshold) idx++;
            } else if (idx > 0 && currentTime < lyrics[idx].time - threshold) {
                idx--;
                while (idx > 0 && currentTime < lyrics[idx].time - threshold) idx--;
            } else if (idx === -1 && currentTime >= lyrics[0].time - threshold) {
                idx = 0;
            }

            if (idx !== currentLyricIndexRef.current) {
                currentLyricIndexRef.current = idx;
                if (idx >= 0) setCurrentLyric(lyrics[idx].text);
            }
        }

        animationFrameRef.current = requestAnimationFrame(updateLyrics);
    };

    const startPlaying = () => {
        const audio = new Audio(`/songs/${song.title}.ogg`);
        audioRef.current = audio;
        lyricsRef.current = parseLRC(song.lyrics ?? "");
        currentLyricIndexRef.current = -1;

        audio.play().catch((e) => console.error("Audio play error:", e));
        setIsPlaying(true);
        animationFrameRef.current = requestAnimationFrame(updateLyrics);

        audio.onended = () => {
            setIsPlaying(false);
            setCurrentLyric("");
            setPlayingPercentage(0);
            currentLyricIndexRef.current = -1;
            audioRef.current = null;
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    };

    const handleToggle = () => {
        if (!audioRef.current) {
            startPlaying();
        } else if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        } else {
            audioRef.current.play().catch((e) => console.error("Audio play error:", e));
            setIsPlaying(true);
            animationFrameRef.current = requestAnimationFrame(updateLyrics);
        }
    };

    useEffect(() => {
        if (autoPlay) startPlaying();
        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* Full-header progress bar */}
            <div
                className="song-player__progress"
                style={{ transform: `scaleX(${playingPercentage}%)` }}
            />

            {/* Lyric block */}
            <div className="song-player" onClick={handleToggle}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={isPlaying ? currentLyric : "subtitle"}
                        className="song-player__lyric"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {isPlaying ? (currentLyric || song.subtitle) : song.subtitle}
                    </motion.span>
                </AnimatePresence>
            </div>
        </>
    );
}
