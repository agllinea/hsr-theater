import { motion } from "framer-motion";
import { useState } from "react";

import { ExpandableMapContainer } from "../components/ExpandableMapContainer";
import "./page_songs.css";
import { songs } from "../assets/songs";
import clsx from "clsx";
import { Song } from "../types/models";


const Songs: React.FC = () => {
    const [expandedSong, setExpandedSong] = useState<string | null>(null);

    const renderSong = (song: Song) => (
        <div
            className={clsx("song-card", expandedSong === song.title ? "expanded" : "")}
            onClick={() => setExpandedSong(expandedSong === song.title ? null : song.title)}
        >
            <div className="song-cover">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-1 -1 19 14"
                    height="150"
                    overflow="hidden"
                >
                    <defs>
                        <clipPath id="album-cover">
                            <path d="M 0 0 L 12 0 L 12 5 A 1 1 0 0 0 12 7.5 L 12 12 L 0 12 Z" />
                        </clipPath>
                        <filter id="shadow">
                            <feDropShadow
                                dx="0"
                                dy="0"
                                stdDeviation="0.3"
                                flood-color="rgb(255, 255, 255)"
                            />
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
                    <g className="album-track"><path
                        fill="url(#grad2)"
                        filter="url(#shadow)"
                        d="M 12 11.75 A 1 1 0 0 0 12 0.75 A 1 1 0 0 0 12 11.75 M 12 9.25 A 1 1 0 0 1 12 3.25 A 1 1 0 0 1 12 9.25 "
                    />
                        <path
                            fill="url(#grad1)"
                            filter="url(#shadow)"
                            d="M 12 9.25 A 1 1 0 0 0 12 3.25 A 1 1 0 0 0 12 9.25 M 12 7.5 A 1 1 0 0 1 12 5 A 1 1 0 0 1 12 7.5 "
                        /></g>

                    <path
                        d="M 0 0 L 12 0 L 12 5 A 1 1 0 0 0 12 7.5 L 12 12 L 0 12 Z"
                        fill=""
                        filter="url(#shadow)"
                    />
                    <image
                        href="/characters/cyrene-character_icon.webp"
                        width="12"
                        height="12"
                        clipPath="url(#album-cover)"
                        preserveAspectRatio="xMidYMid slice"
                    />
                </svg>
            </div>
            <div className="song-content">
                <div className="song-name">
                    <span className="song-title">{song.title}</span>
                    <span className="song-subtitle">{song.subtitle}</span>
                </div>
                <div className="song-lyrics">no lyrics</div>
            </div>
        </div>
    );

    return (
        <ExpandableMapContainer
            items={songs}
            renderItem={renderSong}
        />
    );
};

export default Songs;
