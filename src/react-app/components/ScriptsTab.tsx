import { useState, useEffect } from "react";
import { ScriptRow } from "./ScriptRow";
import { useIsMobile } from "../hooks/useIsMobile";
import { fetchScript } from "../types/script";
import { fetchCharacters } from "../types/character";
import type { Script } from "../types/script";
import type { Character } from "../types/character";
import "./ScriptsTab.css";

interface ScriptsTabProps {
    palette: boolean;
    selectedTag: string | null;
    onTagsLoaded: (tags: string[]) => void;
    onOpen: (item: Script) => void;
}

export function ScriptsTab({ palette, selectedTag, onTagsLoaded, onOpen }: ScriptsTabProps) {
    const isMobile = useIsMobile();
    const [index, setIndex] = useState<Script[]>([]);
    const [charsMap, setCharsMap] = useState<Record<string, Character>>({});
    const [activeRow, setActiveRow] = useState<string | null>(null);

    useEffect(() => {
        fetchScript().then((data) => {
            setIndex(data);
            const seen = new Set<string>();
            data.forEach((s) => s.tags?.forEach((t) => seen.add(t)));
            onTagsLoaded([...seen]);
        });
        fetchCharacters().then((chars) =>
            setCharsMap(chars.reduce<Record<string, Character>>((map, c) => {
                map[c.id] = c;
                return map;
            }, {}))
        );
    }, [onTagsLoaded]);

    useEffect(() => {
        if (!isMobile) { setActiveRow(null); return; }
        const onTouchEnd = (e: TouchEvent) => {
            if (!(e.target as Element).closest(".script-item")) setActiveRow(null);
        };
        document.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => document.removeEventListener("touchend", onTouchEnd);
    }, [isMobile]);

    const filteredIndex = selectedTag === null
        ? index
        : index.filter((s) => s.tags?.includes(selectedTag));

    return (
        <div className={`scripts-list${palette ? " scripts-list--palette" : ""}`}>
            {filteredIndex.map((item) => (
                <ScriptRow
                    key={item.id}
                    item={item}
                    chars_map={charsMap}
                    isMobile={isMobile}
                    isActive={isMobile && (activeRow === item.id || palette)}
                    onActivate={() => setActiveRow(item.id)}
                    onOpen={() => { setActiveRow(null); onOpen(item); }}
                />
            ))}
        </div>
    );
}
