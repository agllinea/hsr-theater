import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Song } from "../types/song";
import { useSongPlayer } from "../hooks/useSongPlayer";
import "./SongPlayer.css";

export interface SongPlayerProps {
    song: Song;
    autoPlay?: boolean;
}

export function SongPlayer({ song, autoPlay = false }: SongPlayerProps) {
    const isPlaying = useSongPlayer((s) => s.isPlaying);
    const _setIsPlaying = useSongPlayer((s) => s._setIsPlaying);
    const _register = useSongPlayer((s) => s._register);

    const [currentLyric, setCurrentLyric] = useState("");
    const [playingPercentage, setPlayingPercentage] = useState(0);
    const [playCount, setPlayCount] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lyricsRef = useRef<Array<{ time: number; text: string }>>([]);
    const animationFrameRef = useRef<number | null>(null);
    const currentLyricIndexRef = useRef<number>(-1);
    const playCountRef = useRef(0);

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

    const stopAnimation = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };

    const startAnimation = () => {
        const tick = () => {
            const audio = audioRef.current;
            if (!audio) return;

            const currentTime = audio.currentTime;
            const duration = audio.duration;
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

            animationFrameRef.current = requestAnimationFrame(tick);
        };
        animationFrameRef.current = requestAnimationFrame(tick);
    };

    const doPlay = () => {
        if (!audioRef.current) {
            const audio = new Audio(`/songs/${song.title}.ogg`);
            audioRef.current = audio;
            lyricsRef.current = parseLRC(song.lyrics ?? "");

            audio.onended = () => {
                playCountRef.current++;
                setPlayCount(playCountRef.current);
                currentLyricIndexRef.current = -1;
                setCurrentLyric("");
                audio.currentTime = 0;
                audio.play().catch(console.error);
            };

            audio.play().catch(console.error);
        } else {
            audioRef.current.play().catch(console.error);
        }

        _setIsPlaying(true);
        startAnimation();
    };

    const doPause = () => {
        audioRef.current?.pause();
        _setIsPlaying(false);
        stopAnimation();
    };

    // Keep refs current so the store's stable wrappers always call the latest version
    const doPlayRef = useRef(doPlay);
    const doPauseRef = useRef(doPause);
    doPlayRef.current = doPlay;
    doPauseRef.current = doPause;

    useEffect(() => {
        _register({
            play: () => doPlayRef.current(),
            pause: () => doPauseRef.current(),
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (autoPlay) doPlay();
        return () => {
            doPauseRef.current();
            audioRef.current = null;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggle = () => (isPlaying ? doPause() : doPlay());

    // Odd plays (0-indexed even): left→right. Even plays (0-indexed odd): right→left (retreat).
    const isReverse = playCount % 2 === 1;
    const barScale = isReverse ? 1 - playingPercentage / 100 : playingPercentage / 100;
    const showLyric = isPlaying && !!currentLyric;

    return (
        <>
            <div
                className="song-player__progress"
                style={{ transform: `scaleX(${barScale})` }}
            />
            <div className="song-player" onClick={handleToggle}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={showLyric ? currentLyric : "subtitle"}
                        className={`song-player__lyric${showLyric ? "" : " song-player__lyric--subtitle"}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {showLyric ? currentLyric : song.subtitle}
                    </motion.span>
                </AnimatePresence>
            </div>
        </>
    );
}
