import { useTouchTap } from "../hooks/useTouchTap";
import { TxtSwap } from "./TxtSwap";
import type { Script } from "../types/script";
import type { Character } from "../types/character";
import "./ScriptRow.css";

interface ScriptRowProps {
    item: Script;
    chars_map: Record<string, Character>;
    isMobile: boolean;
    isActive: boolean;
    onActivate: () => void;
    onOpen: () => void;
}

export function ScriptRow({ item, chars_map, isMobile, isActive, onActivate, onOpen }: ScriptRowProps) {
    const elRef = useTouchTap<HTMLDivElement>({ isMobile, isActive, onActivate, onOpen });

    return (
        <div
            ref={elRef}
            className={`script-item${isActive ? " script-item--active" : ""}`}
            onClick={isMobile ? undefined : onOpen}
        >
            <div className="script-row">
                <div className="script-hover-bg script-hover-bg--1" style={{ backgroundImage: `url("/scripts/cover/${item.cover}")` }} />
                <div className="script-hover-bg script-hover-bg--2" />
                <div className="script-cell script-cell--series">
                    <TxtSwap c={item.series.c} d={item.series.d} />
                </div>
                <div className="script-cell script-cell--title">
                    <TxtSwap c={item.title.c} d={item.title.d} />
                </div>
                <div className="script-cell script-cell--actors">
                    <TxtSwap
                        c={
                            <>
                                <div>Characters</div>
                                <div className="actors-list">
                                    {(item.actors ?? []).map((actor) => (
                                        <span key={actor} className="avatar">
                                            <img src={chars_map[actor]?.img?.avatar} />
                                            <span>{chars_map[actor]?.id}</span>
                                        </span>
                                    ))}
                                </div>
                            </>
                        }
                        d={
                            <>
                                <div>出场角色</div>
                                <div className="actors-list">
                                    {(item.actors ?? []).map((actor) => (
                                        <span key={actor} className="avatar">
                                            <img src={chars_map[actor]?.img?.avatar} />
                                            <span>{chars_map[actor]?.name}</span>
                                        </span>
                                    ))}
                                </div>
                            </>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
