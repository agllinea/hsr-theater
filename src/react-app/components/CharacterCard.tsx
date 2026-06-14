import { useTouchTap } from "../hooks/useTouchTap";
import { TxtSwap } from "./TxtSwap";
import type { Character } from "../types/character";
import "./CharacterCard.css";

interface CharacterCardProps {
    char: Character;
    isMobile: boolean;
    isActive: boolean;
    onActivate: () => void;
    onOpen: () => void;
}

export function CharacterCard({ char, isMobile, isActive, onActivate, onOpen }: CharacterCardProps) {
    const elRef = useTouchTap<HTMLSpanElement>({ isMobile, isActive, onActivate, onOpen });
    const card = char.img?.card ?? "";

    return (
        <span
            ref={elRef}
            className={`char-card${isActive ? " char-card--active" : ""}`}
            data-rarity={char.rarity}
            onClick={isMobile ? undefined : onOpen}
        >
            <div className="char-card-image char-card-image--color" style={{ backgroundImage: `url("${card}")` }} />
            <div className="char-card-image char-card-image--bw" style={{ backgroundImage: `url("${card}")` }} />
            <div className="char-card-hover-bg" />
            <div className="char-card-text">
                <TxtSwap c={char.id} d={char.name} />
            </div>
        </span>
    );
}
