import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Song.css";
import { AutoScroll } from "./auto_scroll";

interface Song {

  title: string;
  subtitle?: string;
  lyrics?: string;
}

const songs: Song[] = [
  {
    title: "野火",
    subtitle: "Wildfire - HSR Boss Fight Theme",
    lyrics: ""
  },
];
const Songs: React.FC = () => {
  const [expandedSong, setExpandedSong] = useState<string | null>(null);

  return (
    <section className="section-container">
      {songs.map((song, index) => {
        const isExpanded = expandedSong === song.title;
        return (
          <div className={`song-card ${isExpanded ? "expanded" : ""}`} onClick={() => setExpandedSong(expandedSong === song.title ? null : song.title)}>
            <div className="song-cover"><img src="/characters/cyrene-character_icon.webp" /></div>
            <div className="song-content">
              <div>
                <span className="song-title">{song.title}</span>
                <span className="song-subtitle">{song.subtitle}</span>
                </div>
              <div className="song-lyrics">no lyrics</div>
            </div>
          </div>
        )
      })}
    </section>
  );
};

export default Songs;
