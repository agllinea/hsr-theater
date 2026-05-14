import { useEffect, useRef, useState } from "react";

import { songs } from "../assets/songs";
import { AudioPlayer } from "../components/AudioPlayer";
import { ExpandableMapContainer } from "../components/ExpandableMapContainer";
import { Song } from "../types/models";

import PageEnd from "../components/PageEnd";


const Songs: React.FC = () => {
    const [expandedSong, setExpandedSong] = useState<string | null>(null);
    const [currentLyric, setCurrentLyric] = useState<string>("no lyrics");
    const [playingPercentage, setPlayingPercentage] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lyricsRef = useRef<Array<{ time: number; text: string }>>([]);
    const animationFrameRef = useRef<number | null>(null);
    const currentLyricIndexRef = useRef<number>(-1);

    const parseLRC = (lrcContent: string) => {
        const lines = lrcContent.split("\n");
        const lyrics: Array<{ time: number; text: string }> = [];

        lines.forEach((line) => {
            const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
            if (match) {
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const milliseconds = parseInt(match[3].padEnd(3, "0"));
                const time = minutes * 60 + seconds + milliseconds / 1000;
                const text = match[4].trim();

                if (text) {
                    lyrics.push({ time, text });
                }
            }
        });

        return lyrics.sort((a, b) => a.time - b.time);
    };

    const updateLyrics = () => {
        if (!audioRef.current || lyricsRef.current.length === 0) {
            animationFrameRef.current = requestAnimationFrame(updateLyrics);
            return;
        }

        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const lyrics = lyricsRef.current;

        // Update playing percentage
        if (duration && !isNaN(duration) && duration > 0) {
            const percentage = (currentTime / duration) * 100;
            setPlayingPercentage(Math.min(100, Math.max(0, percentage)));
        }

        // Find the appropriate lyric line
        // Use a small threshold (50ms) to prevent flickering
        const threshold = 0.05;
        let newIndex = currentLyricIndexRef.current;

        // Check if we need to move forward
        if (newIndex < lyrics.length - 1 && currentTime >= lyrics[newIndex + 1].time - threshold) {
            newIndex++;
            while (newIndex < lyrics.length - 1 && currentTime >= lyrics[newIndex + 1].time - threshold) {
                newIndex++;
            }
        }
        // Check if we need to move backward (user seeked back)
        else if (newIndex > 0 && currentTime < lyrics[newIndex].time - threshold) {
            newIndex--;
            while (newIndex > 0 && currentTime < lyrics[newIndex].time - threshold) {
                newIndex--;
            }
        }
        // Check if we're before the first lyric
        else if (newIndex === -1 && lyrics.length > 0 && currentTime >= lyrics[0].time - threshold) {
            newIndex = 0;
        }

        // Update lyric if index changed
        if (newIndex !== currentLyricIndexRef.current) {
            currentLyricIndexRef.current = newIndex;
            if (newIndex >= 0) {
                setCurrentLyric(lyrics[newIndex].text);
            }
        }

        animationFrameRef.current = requestAnimationFrame(updateLyrics);
    };

    const handleSongClick = (song: Song) => {
        const isCurrentlyExpanded = expandedSong === song.title;

        // Stop current audio and animation
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        if (isCurrentlyExpanded) {
            setExpandedSong(null);
            setCurrentLyric("no lyrics");
            setPlayingPercentage(0);
            lyricsRef.current = [];
            currentLyricIndexRef.current = -1;
        } else {
            setExpandedSong(song.title);

            // Parse lyrics
            lyricsRef.current = parseLRC(song.lyrics ?? "");
            currentLyricIndexRef.current = -1;
            setCurrentLyric(lyricsRef.current.length > 0 ? "" : "no lyrics");
            setPlayingPercentage(0);

            // Create and play audio
            const audio = new Audio(`/songs/${song.title}.ogg`);
            audioRef.current = audio;

            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });

            // Start lyrics sync immediately
            updateLyrics();

            audio.onended = () => {
                setExpandedSong(null);
                setCurrentLyric("no lyrics");
                setPlayingPercentage(0);
                currentLyricIndexRef.current = -1;
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }
    };

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const renderSong = (song: Song) => (
        <AudioPlayer
            song={song}
            isExpanded={expandedSong === song.title}
            currentLyric={currentLyric}
            playingPercentage={playingPercentage}
            onClick={() => handleSongClick(song)}
        />
    );

    return <ExpandableMapContainer items={songs} renderItem={renderSong} >
        
            <PageEnd/>
    </ExpandableMapContainer>;
};

export default Songs;
