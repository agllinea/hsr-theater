import { useState, useEffect } from "react";
import { CharacterCard } from "./CharacterCard";
import { useIsMobile } from "../hooks/useIsMobile";
import { fetchCharacters } from "../types/character";
import type { Character } from "../types/character";
import "./RolesTab.css";

interface RolesTabProps {
    palette: boolean;
    selectedTag: string | null;
    onFactionTagsLoaded: (factions: string[]) => void;
    onOpen: (char: Character) => void;
}

export function RolesTab({ palette, selectedTag, onFactionTagsLoaded, onOpen }: RolesTabProps) {
    const isMobile = useIsMobile();
    const [chars, setChars] = useState<Character[]>([]);
    const [activeCard, setActiveCard] = useState<string | null>(null);

    useEffect(() => {
        fetchCharacters().then((data) => {
            setChars(data);
            const seen = new Set<string>();
            data.forEach((c) => c.tags?.forEach((t) => seen.add(t)));
            onFactionTagsLoaded([...seen]);
        });
    }, [onFactionTagsLoaded]);

    useEffect(() => {
        if (!isMobile) { setActiveCard(null); return; }
        const onTouchEnd = (e: TouchEvent) => {
            if (!(e.target as Element).closest(".char-card")) setActiveCard(null);
        };
        document.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => document.removeEventListener("touchend", onTouchEnd);
    }, [isMobile]);

    const filteredChars = selectedTag === null
        ? chars
        : chars.filter((c) => c.tags?.includes(selectedTag));

    return (
        <div className={`chars-grid${palette ? " chars-grid--palette" : ""}`}>
            {filteredChars.map((char) => (
                <CharacterCard
                    key={char.id}
                    char={char}
                    isMobile={isMobile}
                    isActive={isMobile && (activeCard === char.id || palette)}
                    onActivate={() => setActiveCard(char.id)}
                    onOpen={() => { setActiveCard(null); onOpen(char); }}
                />
            ))}
        </div>
    );
}
