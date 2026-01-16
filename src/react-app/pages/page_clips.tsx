import { motion } from "framer-motion";
import React, { useState } from "react";

import animated_shorts from "../assets/animated_shorts";
import { ExpandableMapContainer } from "../components/ExpandableMapContainer";
import { Video } from "../types/models";

import "./page_clips.css";
import PageEnd from "../components/PageEnd";

const extractBVID = (url: string): string | null => {
    const match = url.match(/BV[a-zA-Z0-9]+/);
    return match ? match[0] : null;
};

const VideoClipCard: React.FC<{ video: Video }> = ({ video }) => {
    const bvid = extractBVID(video.url);
    const descRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const element = descRef.current;
        if (!element) return;

        const lines = (video.desc ?? "").split("\n");

        // Start with all lines and remove from the end until it fits
        let fitsWithLineRemoval = false;
        for (let i = lines.length; i > 0; i--) {
            element.textContent = lines.slice(0, i).join("\n");

            if (element.scrollHeight <= element.clientHeight) {
                fitsWithLineRemoval = true;
                break;
            }
        }
        while (element.scrollHeight > element.clientHeight) {
            const text = element.textContent || "";
            element.textContent = text.slice(0, -10) + "...";
        }
    }, [video.desc]);
    return (
        <motion.div key={video.url} className="clip-item" onClick={() => window.open(video.url)}>
            <div
                className="clip-cover"
                style={{
                    backgroundImage: `url("/animated_short_cover/${bvid}.jpg")`,
                }}
            ></div>
            <div className="clip-info">
                <div className="clip-title">{video.title}</div>
                <div ref={descRef} className="clip-desc">
                    {video.desc}
                </div>
            </div>
        </motion.div>
    );
};

const AnimatedShorts: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    return (
        <ExpandableMapContainer
            items={showAll ? animated_shorts : animated_shorts.filter((video) => video.display)}
            renderItem={(video) => <VideoClipCard key={video.url} video={video} />}
        >
            {!showAll && (
                <motion.div
                    className="button-more"
                    onClick={() => setShowAll(true)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                >
                    更多短片
                </motion.div>
            )}
            <PageEnd/>
        </ExpandableMapContainer>
    );
};

export default AnimatedShorts;
