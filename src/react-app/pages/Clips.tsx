import { useEffect, useState, useMemo, useRef } from "react";
import { PaletteIcon, FilterIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./Clips.css";
import { fetchClip, Clip } from "../types/clip";
import { Toolbar } from "../components/Toolbar";

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } };

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

function ClipCard({ clip, onClick, isTouchHighlighted, onTouchHighlight }: {
    clip: Clip;
    onClick: () => void;
    isTouchHighlighted: boolean;
    onTouchHighlight: () => void;
}) {
    const elRef = useRef<HTMLElement>(null);
    const latest = useRef({ isTouchHighlighted, onClick, onTouchHighlight });
    latest.current = { isTouchHighlighted, onClick, onTouchHighlight };

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;
        const onTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            if (latest.current.isTouchHighlighted) {
                latest.current.onClick();
            } else {
                latest.current.onTouchHighlight();
            }
        };
        el.addEventListener("touchend", onTouchEnd, { passive: false });
        return () => el.removeEventListener("touchend", onTouchEnd);
    }, []);

    const cover = clip.img?.cover ?? "";
    return (
        <article
            ref={elRef}
            className={`clip-card${isTouchHighlighted ? " clip-card--touch-hover" : ""}`}
            onClick={onClick}
        >
            <div className="clip-card-image clip-card-image--bw" style={{ backgroundImage: `url("${cover}")` }} />
            <div className="clip-card-image clip-card-image--color" style={{ backgroundImage: `url("${cover}")` }} />
            <div className="clip-card-hover-bg" />
            <div className="clip-card-flash clip-card-flash--default">
                <span className="clip-card-label clip-card-label--title">{clip.id}</span>
            </div>
            <div className="clip-card-flash clip-card-flash--hover">
                <span className="clip-card-label clip-card-label--title">{clip.title}</span>
                {clip.description && (
                    <span className="clip-card-label clip-card-label--desc">{clip.description}</span>
                )}
            </div>
        </article>
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
    const [clips, setClips] = useState<Clip[]>([]);
    const [colorActive, setColorActive] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [activeClip, setActiveClip] = useState<Clip | null>(null);
    const [touchHighlighted, setTouchHighlighted] = useState<string | null>(null);

    useEffect(() => {
        fetchClip().then(setClips);
    }, []);

    useEffect(() => {
        const onTouchEnd = (e: TouchEvent) => {
            if (!(e.target as Element).closest(".clip-card")) {
                setTouchHighlighted(null);
            }
        };
        document.addEventListener("touchend", onTouchEnd);
        return () => document.removeEventListener("touchend", onTouchEnd);
    }, []);

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
                                    onClick={() => { setTouchHighlighted(null); setActiveClip(clip); }}
                                    isTouchHighlighted={touchHighlighted === clip.id}
                                    onTouchHighlight={() => setTouchHighlighted(clip.id)}
                                />
                            ))}
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
