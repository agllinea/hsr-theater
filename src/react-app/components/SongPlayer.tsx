import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Song } from "../types/song";
import { useSongPlayer } from "../hooks/useSongPlayer";
import "./SongPlayer.css";

const CROSSFADE_DURATION = 10.53; // seconds — overlap between end of one song and start of the next

export interface SongPlayerProps {
    songs: Song[];
    autoPlay?: boolean;
}

export function SongPlayer({ songs, autoPlay = false }: SongPlayerProps) {
    const isPlaying = useSongPlayer((s) => s.isPlaying);
    const _setIsPlaying = useSongPlayer((s) => s._setIsPlaying);
    const _setProgress = useSongPlayer((s) => s._setProgress);
    const _setSongTitle = useSongPlayer((s) => s._setSongTitle);
    const _register = useSongPlayer((s) => s._register);

    const [currentLyric, setCurrentLyric] = useState("");
    const [playingPercentage, setPlayingPercentage] = useState(0);
    const [playCount, setPlayCount] = useState(0);
    const [displaySong, setDisplaySong] = useState(songs[0]);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const nextAudioRef = useRef<HTMLAudioElement | null>(null);
    const crossfadeActiveRef = useRef(false);
    const currentSongIndexRef = useRef(0);
    const nextSongIndexRef = useRef<number | null>(null);
    const lyricsRef = useRef<Array<{ time: number; text: string }>>([]);
    const animationFrameRef = useRef<number | null>(null);
    const currentLyricIndexRef = useRef<number>(-1);
    const playCountRef = useRef(0);
    const crossfadeIncrementedPlayCountRef = useRef(false);
    const handleAudioEndedRef = useRef<() => void>(() => {});
    const setupAudioEventsRef = useRef<(audio: HTMLAudioElement) => void>(() => {});
    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;

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

    const cancelCrossfade = () => {
        if (nextAudioRef.current) {
            nextAudioRef.current.pause();
            nextAudioRef.current = null;
        }
        crossfadeActiveRef.current = false;
        nextSongIndexRef.current = null;
        if (audioRef.current) audioRef.current.volume = 1;
        // Roll back the playCount increment that was done when crossfade started
        if (crossfadeIncrementedPlayCountRef.current) {
            playCountRef.current--;
            setPlayCount(playCountRef.current);
            crossfadeIncrementedPlayCountRef.current = false;
        }
    };

    // Attach onended + ontimeupdate to an audio element.
    // ontimeupdate fires ~4x/sec during playback AND immediately after a seek,
    // so it reliably detects the crossfade window regardless of how we got there.
    const setupAudioEvents = (audio: HTMLAudioElement) => {
        audio.onended = handleAudioEndedRef.current;
        // ontimeupdate fires ~4x/sec during playback AND after seeks — even in background tabs.
        // All volume management lives here so crossfade works when rAF is throttled/paused.
        audio.ontimeupdate = () => {
            if (audio !== audioRef.current) return; // stale element, ignore
            const { currentTime, duration } = audio;
            if (!duration || isNaN(duration)) return;

            const remaining = duration - currentTime;

            if (remaining <= CROSSFADE_DURATION && !crossfadeActiveRef.current) {
                crossfadeActiveRef.current = true;
                // Advance playCount now so the bar direction flips at crossfade start,
                // not at onended — this prevents the bar from jumping when we switch audio.
                playCountRef.current++;
                setPlayCount(playCountRef.current);
                crossfadeIncrementedPlayCountRef.current = true;
                const nextIdx = (currentSongIndexRef.current + 1) % songs.length;
                nextSongIndexRef.current = nextIdx;
                const next = new Audio(songs[nextIdx].file);
                next.volume = 0;
                next.onended = handleAudioEndedRef.current;
                nextAudioRef.current = next;
                next.play().catch(console.error);
            }

            if (crossfadeActiveRef.current && nextAudioRef.current) {
                const fadeProgress = Math.max(0, Math.min(1, 1 - remaining / CROSSFADE_DURATION));
                audio.volume = 1 - fadeProgress;
                nextAudioRef.current.volume = fadeProgress;
            }
        };
    };
    setupAudioEventsRef.current = setupAudioEvents;

    const startAnimation = () => {
        const tick = () => {
            const audio = audioRef.current;
            if (!audio) return;

            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const lyrics = lyricsRef.current;

            if (duration && !isNaN(duration) && duration > 0) {
                let pct: number;
                if (crossfadeActiveRef.current && nextAudioRef.current) {
                    // During crossfade: track the incoming song so the bar "starts over" smoothly
                    const next = nextAudioRef.current;
                    const nd = next.duration;
                    const effectiveND = nd && !isNaN(nd) ? Math.max(nd - CROSSFADE_DURATION, 1) : 1;
                    pct = Math.min((next.currentTime / effectiveND) * 100, 100);
                } else {
                    pct = Math.min((currentTime / Math.max(duration - CROSSFADE_DURATION, 1)) * 100, 100);
                }
                setPlayingPercentage(pct);
                _setProgress(pct);
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

    const handleAudioEnded = () => {
        currentLyricIndexRef.current = -1;
        setCurrentLyric("");

        const nextIdx = nextSongIndexRef.current ?? (currentSongIndexRef.current + 1) % songs.length;
        const nextSong = songs[nextIdx];

        if (nextAudioRef.current) {
            // Crossfade was active — playCount was already incremented when crossfade started
            crossfadeIncrementedPlayCountRef.current = false;
            const next = nextAudioRef.current;
            next.volume = 1;
            nextAudioRef.current = null;
            crossfadeActiveRef.current = false;
            nextSongIndexRef.current = null;
            audioRef.current = next;
            setupAudioEventsRef.current(next); // wire up events for the next crossfade
        } else {
            // No crossfade (song too short or edge case) — increment playCount here
            playCountRef.current++;
            setPlayCount(playCountRef.current);
            const next = new Audio(nextSong.file);
            audioRef.current = next;
            setupAudioEventsRef.current(next);
            next.play().catch(console.error);
        }

        currentSongIndexRef.current = nextIdx;
        setDisplaySong(nextSong);
        _setSongTitle(nextSong.title);
        lyricsRef.current = parseLRC(nextSong.lyrics ?? "");
    };
    handleAudioEndedRef.current = handleAudioEnded;

    const switchToSong = (idx: number, shouldPlay: boolean) => {
        cancelCrossfade();
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        currentSongIndexRef.current = idx;
        const song = songs[idx];
        const audio = new Audio(song.file);
        audioRef.current = audio;
        setupAudioEventsRef.current(audio);
        lyricsRef.current = parseLRC(song.lyrics ?? "");
        currentLyricIndexRef.current = -1;
        setCurrentLyric("");
        setDisplaySong(song);
        _setSongTitle(song.title);
        playCountRef.current++;
        setPlayCount(playCountRef.current);
        if (shouldPlay) audio.play().catch(console.error);
    };

    const doPlay = () => {
        if (!audioRef.current) {
            const song = songs[currentSongIndexRef.current];
            const audio = new Audio(song.file);
            audioRef.current = audio;
            lyricsRef.current = parseLRC(song.lyrics ?? "");
            setupAudioEventsRef.current(audio);
            audio.play().catch(console.error);
            _setSongTitle(song.title);
        } else {
            audioRef.current.play().catch(console.error);
        }
        _setIsPlaying(true);
        startAnimation();
    };

    const doPause = () => {
        audioRef.current?.pause();
        cancelCrossfade();
        _setIsPlaying(false);
        stopAnimation();
    };

    const doSkipNext = () => {
        const nextIdx = (currentSongIndexRef.current + 1) % songs.length;
        switchToSong(nextIdx, isPlayingRef.current);
    };

    const doSkipPrev = () => {
        const audio = audioRef.current;
        if (audio && audio.currentTime > 3) {
            cancelCrossfade();
            audio.currentTime = 0;
            return;
        }
        const prevIdx = (currentSongIndexRef.current - 1 + songs.length) % songs.length;
        switchToSong(prevIdx, isPlayingRef.current);
    };

    const doSeekTo = (pct: number) => {
        const audio = audioRef.current;
        if (!audio || isNaN(audio.duration)) return;
        cancelCrossfade();
        audio.currentTime = (pct / 100) * audio.duration;
        // ontimeupdate fires automatically after the seek and re-evaluates the crossfade window
    };

    const doPlayRef = useRef(doPlay);
    const doPauseRef = useRef(doPause);
    const doSkipNextRef = useRef(doSkipNext);
    const doSkipPrevRef = useRef(doSkipPrev);
    const doSeekToRef = useRef(doSeekTo);
    doPlayRef.current = doPlay;
    doPauseRef.current = doPause;
    doSkipNextRef.current = doSkipNext;
    doSkipPrevRef.current = doSkipPrev;
    doSeekToRef.current = doSeekTo;

    useEffect(() => {
        _register({
            play: () => doPlayRef.current(),
            pause: () => doPauseRef.current(),
            skipNext: () => doSkipNextRef.current(),
            skipPrev: () => doSkipPrevRef.current(),
            seekTo: (pct) => doSeekToRef.current(pct),
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (autoPlay) doPlay();
        return () => {
            doPauseRef.current();
            audioRef.current = null;
            nextAudioRef.current = null;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggle = () => (isPlaying ? doPause() : doPlay());

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
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={showLyric ? currentLyric : "subtitle"}
                        className={`song-player__lyric${showLyric ? "" : " song-player__lyric--subtitle"}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {showLyric ? currentLyric : displaySong.subtitle}
                    </motion.span>
                </AnimatePresence>
            </div>
        </>
    );
}
