import clsx from "clsx";
import { motion } from "framer-motion";
import { Album } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { songs } from "../assets/songs";
import { ExpandableMapContainer } from "../components/ExpandableMapContainer";
import { Song } from "../types/models";

import "./page_songs.css";

function AblumCover({ albumId = "" }: { albumId?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 19 14" height="150" overflow="hidden">
            <defs>
                <clipPath id="album-cover">
                    <path d="M 0 0 L 12 0 L 12 5 A 1 1 0 0 0 12 7.5 L 12 12 L 0 12 Z" />
                </clipPath>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="0" stdDeviation="0.3" flood-color="rgb(255, 255, 255)" />
                </filter>
                <linearGradient id="grad1" x1="0%" y1="100%" x2="20%" y2="0%" radius="45">
                    <stop offset="0%" stop-color="#ffffffed" />
                    <stop offset="100%" stop-color="#9e8440ed" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="100%" x2="20%" y2="0%" radius="45">
                    <stop offset="0%" stop-color="#000000" />
                    <stop offset="100%" stop-color="#545454" />
                </linearGradient>
            </defs>
            <g className="album-track">
                <g  className="album-track-inner">
                    <path
                    fill="url(#grad2)"
                    filter="url(#shadow)"
                    d="M 12 11.75 A 1 1 0 0 0 12 0.75 A 1 1 0 0 0 12 11.75 M 12 9.25 A 1 1 0 0 1 12 3.25 A 1 1 0 0 1 12 9.25 "
                />
                <path
                    fill="url(#grad1)"
                    filter="url(#shadow)"
                    d="M 12 9.25 A 1 1 0 0 0 12 3.25 A 1 1 0 0 0 12 9.25 M 12 7.5 A 1 1 0 0 1 12 5 A 1 1 0 0 1 12 7.5 "
                />
                </g>
                
            </g>

            <path d="M 0 0 L 12 0 L 12 5 A 1 1 0 0 0 12 7.5 L 12 12 L 0 12 Z" fill="" filter="url(#shadow)" />
            <image
                href={`/songs/${albumId}.jpg`}
                width="12"
                height="12"
                clipPath="url(#album-cover)"
                preserveAspectRatio="xMidYMid slice"
            />
        </svg>
    );
}

const Songs: React.FC = () => {
    const [expandedSong, setExpandedSong] = useState<string | null>(null);
    const [currentLyric, setCurrentLyric] = useState<string>("no lyrics");
    const [playingPercentage, setPlayingPercentage] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lyricsRef = useRef<Array<{ time: number; text: string }>>([]);
    const animationFrameRef = useRef<number>();
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
            lyricsRef.current = parseLRC(song.lyrics);
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
        <div
            className={clsx("song-card", expandedSong === song.title ? "expanded" : "")}
            onClick={() => handleSongClick(song)}
        >
            <div className="song-cover">
                <AblumCover albumId={song.cover}/>
            </div>
            <div className="song-content">
                <div className="song-name">
                    <span className="song-title">{song.title}</span>
                    <span className="song-subtitle">{song.subtitle}</span>
                </div>
                <div className="song-lyrics">{expandedSong === song.title ? currentLyric : "no lyrics"}</div>
            </div>
            <div className="song-progress" style={{ transform: `scaleX(${playingPercentage}%)` }}></div>
        </div>
    );

    return <ExpandableMapContainer items={songs} renderItem={renderSong} />;
};

export default Songs;
