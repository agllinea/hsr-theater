import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { AutoScroll } from "./auto_scroll";

import "./Song.css";

interface Song {
    title: string;
    subtitle?: string;
    lyrics?: string;
}

const songs: Song[] = [
    {
        title: "希望有羽毛和翅膀",
        subtitle: "知更鸟 feat. Chevy “Hope Is the Thing With Feathers”",
    },
    {
        title: "昔涟",
        subtitle: "张韶涵 “Ripples of Past Reverie 往昔的涟漪”",
    },
    {
        title: "使一颗心免于哀伤",
        subtitle: "知更鸟 feat. Chevy “If I Can Stop One Heart From Breaking”",
    },
    {
        title: "在银河中孤独摇摆",
        subtitle: "知更鸟 feat. Chevy “Sway to My Beat in Cosmos”",
    },
    {
        title: "耀斑",
        subtitle: "YMIR <em>《听！狂欢在那神佑的山巅》短片单曲</em>",
    },
    {
        title: "拂晓",
        subtitle: "NIDA <em>天空泰坦艾格勒战斗主题曲</em>",
    },
    {
        title: "野火",
        subtitle: "Jonathan Steingard <em>虚妄之母可可利亚战斗主题曲</em>”",
    },
    {
        title: "水龙吟",
        subtitle: "优素Yusuf",
    },
    {
        title: "若我不曾见过太阳",
        subtitle: "知更鸟 feat. Chevy “Had I Not Seen the Sun”",
    },
    {
        title: "星间旅行",
        subtitle: "Lea Sirk <em>《崩坏：星穹铁道OP》Interstellar Journey</em>",
    },
    {
        title: "不眠之夜",
        subtitle: "张杰 <em>匹诺康尼主题曲</em>",
    },
    {
        title: "何者",
        subtitle: "谭晶 <em>翁法罗斯主题曲</em>",
    },
];
const Songs: React.FC = () => {
    const [expandedSong, setExpandedSong] = useState<string | null>(null);
    <svg width="300" height="300" viewBox="0 0 300 300" overflow="hidden">
        <image href="image.jpg" width="300" height="300" preserveAspectRatio="xMidYMid slice" />
    </svg>;

    return (
        <section className="section-container">
            {songs.map((song, index) => {
                const isExpanded = expandedSong === song.title;
                return (
                    <div
                        className={`song-card ${isExpanded ? "expanded" : ""}`}
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
                                <path
                                    d="M 0 0 L 12 0 L 12 5 A 1 1 0 0 0 12 7.5 L 12 12 L 0 12 Z"
                                    // stroke="#0c0c0cee"
                                    // strokeWidth="1"
                                    fill=""
                                    filter="url(#shadow)"
                                />
                                {/* <path
                                    d="M -0.25 -0.25 L 12.25 -0.25 L 12.25 4.75 M 12.25 7.75 L 12.25 12.25 L -0.25 12.25 L -0.25 -0.25"
                                    stroke="#bc9103ac"
                                    strokeWidth=".1"
                                    fill="none"
                                /> */}
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
            })}
        </section>
    );
};

export default Songs;
