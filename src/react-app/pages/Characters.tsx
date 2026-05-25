import { useState, useEffect, useMemo, useRef } from "react";
import { PaletteIcon, FilterIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Character, fetchCharacters } from "../types/character";
import { Toolbar } from "../components/Toolbar";
import { fractions } from "../assets/fractions";

import "./Characters.css";

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } };

function CharacterViewer({ char, onClose }: { char: Character; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <motion.div className="char-viewer" {...fade}>
            <div className="char-viewer-header">
                <span className="char-viewer-title">{char.name}</span>
                <button className="char-viewer-close" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
            <div className="char-viewer-body">
                <p className="char-viewer-placeholder">这个角色还没有专属的页面哦~</p>
            </div>
        </motion.div>
    );
}

function FactionFilter({
    factions,
    selected,
    onToggle,
}: {
    factions: string[];
    selected: string | null;
    onToggle: (f: string) => void;
}) {
    return (
        <div className="tag-filter">
            {factions.map((f) => (
                <button
                    key={f}
                    className={`tag${selected === f ? " tag--active" : ""}`}
                    onClick={() => onToggle(f)}
                >
                    {fractions[f]?.name ?? f}
                </button>
            ))}
        </div>
    );
}

function CharacterCard({ char, onClick, isTouchHighlighted, onTouchHighlight }: {
    char: Character;
    onClick: () => void;
    isTouchHighlighted: boolean;
    onTouchHighlight: () => void;
}) {
    const elRef = useRef<HTMLSpanElement>(null);
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

    const card = char.img?.card ?? "";
    return (
        <span
            ref={elRef}
            className={`char-card${isTouchHighlighted ? " char-card--touch-hover" : ""}`}
            data-rarity={char.rarity}
            onClick={onClick}
        >
            <div className="char-card-image char-card-image--color" style={{ backgroundImage: `url("${card}")` }} />
            <div className="char-card-image char-card-image--bw" style={{ backgroundImage: `url("${card}")` }} />
            <div className="char-card-hover-bg" />
            <div className="char-card-flash char-card-flash--id">
                <span className="char-card-label">{char.id}</span>
            </div>
            <div className="char-card-flash char-card-flash--name">
                <span className="char-card-label">{char.name}</span>
            </div>
        </span>
    );
}

export default function Characters() {
    const [chars, setChars] = useState<Character[]>([]);
    const [colorActive, setColorActive] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
    const [activeChar, setActiveChar] = useState<Character | null>(null);
    const [touchHighlighted, setTouchHighlighted] = useState<string | null>(null);

    useEffect(() => {
        fetchCharacters().then(setChars);
    }, []);

    useEffect(() => {
        const onTouchEnd = (e: TouchEvent) => {
            if (!(e.target as Element).closest(".char-card")) {
                setTouchHighlighted(null);
            }
        };
        document.addEventListener("touchend", onTouchEnd);
        return () => document.removeEventListener("touchend", onTouchEnd);
    }, []);

    const allFactions = useMemo(() => {
        const seen = new Set<string>();
        chars.forEach(c => c.tags?.forEach(t => seen.add(t)));
        return [...seen];
    }, [chars]);

    const toggleFaction = (f: string) => {
        setSelectedFaction(prev => prev === f ? null : f);
    };

    const filteredChars = selectedFaction === null
        ? chars
        : chars.filter(c => c.tags?.includes(selectedFaction));

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
                <FactionFilter
                    factions={allFactions}
                    selected={selectedFaction}
                    onToggle={toggleFaction}
                />
            ),
        },
    ];

    return (
        <section className="chars-section">
            <AnimatePresence mode="wait">
                {activeChar ? (
                    <CharacterViewer key="viewer" char={activeChar} onClose={() => setActiveChar(null)} />
                ) : (
                    <motion.div key="grid" className="chars-grid-wrapper" {...fade}>
                        <Toolbar items={toolbarItems} />
                        <section className={`chars-grid${colorActive ? " chars-grid--palette" : ""}`}>
                            {filteredChars.map((char) => (
                                <CharacterCard
                                    key={char.id}
                                    char={char}
                                    onClick={() => { setTouchHighlighted(null); setActiveChar(char); }}
                                    isTouchHighlighted={touchHighlighted === char.id}
                                    onTouchHighlight={() => setTouchHighlighted(char.id)}
                                />
                            ))}
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
