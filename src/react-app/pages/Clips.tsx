import { useEffect, useState, useMemo } from "react";
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
        <motion.div className="clip-viewer-overlay" {...fade} onClick={onClose}>
            <div className="clip-viewer" onClick={(e) => e.stopPropagation()}>
                <div className="clip-viewer-header">
                    <span className="clip-viewer-title">{clip.title}</span>
                    <button className="clip-viewer-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="clip-viewer-body">
                    <iframe width="100%" height="100%" src={`//player.bilibili.com/player.html?isOutside=true&${clip.previewUrl}`} allowFullScreen></iframe>
                </div>
            </div>
        </motion.div>
    );
}

function ClipCard({ clip, onClick }: { clip: Clip; onClick: () => void }) {
    const cover = clip.img?.cover ?? "";

    return (
        <article className="clip-card" onClick={onClick}>
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
        <div className="clip-tag-filter">
            {tags.map((t) => (
                <button
                    key={t}
                    className={`clip-tag${selected === t ? " clip-tag--active" : ""}`}
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

    useEffect(() => {
        fetchClip().then(setClips);
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
            <Toolbar items={toolbarItems} />
            <section className={`clips-grid${colorActive ? " clips-grid--palette" : ""}`}>
                {filteredClips.map((clip) => (
                    <ClipCard key={clip.id} clip={clip} onClick={() => setActiveClip(clip)} />
                ))}
            </section>
            <AnimatePresence>
                {activeClip && (
                    <ClipViewer key="viewer" clip={activeClip} onClose={() => setActiveClip(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
