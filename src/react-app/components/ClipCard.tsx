import { useTouchTap } from "../hooks/useTouchTap";
import { TxtSwap } from "./TxtSwap";
import type { Clip } from "../types/clip";
import "./ClipCard.css";

interface ClipCardProps {
    clip: Clip;
    isMobile: boolean;
    isActive: boolean;
    onActivate: () => void;
    onOpen: () => void;
}

export function ClipCard({ clip, isMobile, isActive, onActivate, onOpen }: ClipCardProps) {
    const elRef = useTouchTap<HTMLElement>({ isMobile, isActive, onActivate, onOpen });
    const cover = clip.img?.cover ?? "";

    return (
        <article
            ref={elRef}
            className={`clip-card${isActive ? " clip-card--active" : ""}`}
            onClick={isMobile ? undefined : onOpen}
        >
            <div className="clip-card-image clip-card-image--bw" style={{ backgroundImage: `url("${cover}")` }} />
            <div className="clip-card-image clip-card-image--color" style={{ backgroundImage: `url("${cover}")` }} />
            <div className="clip-card-text">
                <TxtSwap
                    c={clip.id}
                    d={
                        <>
                            <span className="clip-card-title">{clip.title}</span>
                            {clip.description && (
                                <span className="clip-card-desc">{clip.description}</span>
                            )}
                        </>
                    }
                />
            </div>
        </article>
    );
}
