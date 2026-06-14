import { useEffect, useState, useMemo } from "react";
import { PaletteIcon, FilterIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./Clips.css";
import { fetchClip, Clip } from "../types/clip";
import { Toolbar } from "../components/Toolbar";
import { ClipCard } from "../components/ClipCard";
import { useIsMobile } from "../hooks/useIsMobile";
import { fade } from "../utils/animation";

function ClipViewer({ clip, onClose }: { clip: Clip; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <motion.div className="clip-viewer" {...fade}>
            <div className="clip-viewer-header">
                <span className="clip-viewer-title">{clip.title}</span>
                <button className="clip-viewer-close" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
            <div className="clip-viewer-body">
                <iframe
                    src={`//player.bilibili.com/player.html?isOutside=true&${clip.previewUrl}`}
                    allowFullScreen
                />
            </div>
        </motion.div>
    );
}


function TagFilter({ tags, selected, onToggle }: { tags: string[]; selected: string | null; onToggle: (t: string) => void }) {
    return (
        <div className="tag-filter">
            {tags.map((t) => (
                <button
                    key={t}
                    className={`tag${selected === t ? " tag--active" : ""}`}
                    onClick={() => onToggle(t)}
                >
                    {t}
                </button>
            ))}
        </div>
    );
}

export default function Clips() {
    const isMobile = useIsMobile();
    const [clips, setClips] = useState<Clip[]>([]);
    const [colorActive, setColorActive] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [activeClip, setActiveClip] = useState<Clip | null>(null);
    const [activeCard, setActiveCard] = useState<string | null>(null);

    useEffect(() => {
        fetchClip().then(setClips);
    }, []);

    useEffect(() => {
        if (!isMobile) { setActiveCard(null); return; }
        const onTouchEnd = (e: TouchEvent) => {
            if (!(e.target as Element).closest(".clip-card")) setActiveCard(null);
        };
        document.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => document.removeEventListener("touchend", onTouchEnd);
    }, [isMobile]);

    const allTags = useMemo(() => {
        const seen = new Set<string>();
        clips.forEach((c) => c.tags?.forEach((t) => seen.add(t)));
        return [...seen];
    }, [clips]);

    const filteredClips = selectedTag === null ? clips : clips.filter((c) => c.tags?.includes(selectedTag));

    const toolbarItems = [
        {
            icon: <PaletteIcon size={16} />,
            isActive: colorActive,
            onClick: () => setColorActive((v) => !v),
        },
        {
            icon: <FilterIcon size={16} />,
            isActive: filterActive,
            onClick: () => setFilterActive((v) => !v),
            dropdownPanel: (
                <TagFilter
                    tags={allTags}
                    selected={selectedTag}
                    onToggle={(t) => setSelectedTag((prev) => prev === t ? null : t)}
                />
            ),
        },
    ];

    return (
        <section className="clips-section">
            <AnimatePresence mode="wait">
                {activeClip ? (
                    <ClipViewer key="viewer" clip={activeClip} onClose={() => setActiveClip(null)} />
                ) : (
                    <motion.div key="list" className="clips-grid-wrapper" {...fade}>
                        <Toolbar items={toolbarItems} />
                        <section className={`clips-grid${colorActive ? " clips-grid--palette" : ""}`}>
                            {filteredClips.map((clip) => (
                                <ClipCard
                                    key={clip.id}
                                    clip={clip}
                                    isMobile={isMobile}
                                    isActive={isMobile && (activeCard === clip.id || colorActive)}
                                    onActivate={() => setActiveCard(clip.id)}
                                    onOpen={() => { setActiveCard(null); setActiveClip(clip); }}
                                />
                            ))}
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
