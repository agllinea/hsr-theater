import { useState, useEffect, useMemo } from "react";
import { PaletteIcon, FilterIcon } from "lucide-react";
import { Character, fetchCharacters } from "../types/character";
import { Toolbar } from "../components/Toolbar";
import { fractions } from "../assets/fractions";

import "./page_characters.css";

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
        <div className="faction-filter">
            {factions.map((f) => (
                <button
                    key={f}
                    className={`faction-tag${selected === f ? " faction-tag--active" : ""}`}
                    onClick={() => onToggle(f)}
                >
                    {fractions[f]?.name ?? f}
                </button>
            ))}
        </div>
    );
}

function CharacterCard({ char }: { char: Character }) {
    const card = char.img?.card ?? "";
    return (
        <span className="char-card" data-rarity={char.rarity}>
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

    useEffect(() => {
        fetchCharacters().then(setChars);
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
            <Toolbar items={toolbarItems} />
            <section className={`chars-grid${colorActive ? " chars-grid--palette" : ""}`}>
                {filteredChars.map((char) => (
                    <CharacterCard key={char.id} char={char} />
                ))}
            </section>
        </section>
    );
}
