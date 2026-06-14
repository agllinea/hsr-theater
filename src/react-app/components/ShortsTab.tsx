import { useState, useEffect } from "react";
import { ClipCard } from "./ClipCard";
import { useIsMobile } from "../hooks/useIsMobile";
import { fetchClip } from "../types/clip";
import type { Clip } from "../types/clip";
import "./ShortsTab.css";

interface ShortsTabProps {
    palette: boolean;
    selectedTag: string | null;
    onTagsLoaded: (tags: string[]) => void;
}

export function ShortsTab({ palette, selectedTag, onTagsLoaded }: ShortsTabProps) {
    const isMobile = useIsMobile();
    const [clips, setClips] = useState<Clip[]>([]);
    const [activeCard, setActiveCard] = useState<string | null>(null);

    useEffect(() => {
        fetchClip().then((data) => {
            setClips(data);
            const seen = new Set<string>();
            data.forEach((c) => c.tags?.forEach((t) => seen.add(t)));
            onTagsLoaded([...seen]);
        });
    }, [onTagsLoaded]);

    useEffect(() => {
        if (!isMobile) { setActiveCard(null); return; }
        const onTouchEnd = (e: TouchEvent) => {
            if (!(e.target as Element).closest(".clip-card")) setActiveCard(null);
        };
        document.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => document.removeEventListener("touchend", onTouchEnd);
    }, [isMobile]);

    const filteredClips = selectedTag === null
        ? clips
        : clips.filter((c) => c.tags?.includes(selectedTag));

    return (
        <div className={`clips-grid${palette ? " clips-grid--palette" : ""}`}>
            {filteredClips.map((clip) => (
                <ClipCard
                    key={clip.id}
                    clip={clip}
                    isMobile={isMobile}
                    isActive={isMobile && (activeCard === clip.id || palette)}
                    onActivate={() => setActiveCard(clip.id)}
                    onOpen={() => setActiveCard(null)}
                />
            ))}
        </div>
    );
}
