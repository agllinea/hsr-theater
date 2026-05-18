import { useEffect, useState } from "react";

import { TXT } from "../types/text";

import "./page_chapters.css";
import { fetchScript, Script } from "../types/script";
import { Character, fetchCharacters } from "../types/character";

function resolveD(txt: TXT): string {
    return typeof txt.d === "string" ? txt.d : "";
}

function ChapterRow({ item, chars_map }: { item: Script; chars_map: Record<string, Character> }) {
    return (
        <div className="chapter-item">
            <div className="chapter-row">
                <div className="chapter-hover-bg chapter-hover-bg--1" style={{ backgroundImage: `url("/scripts/cover/${item.cover}")` }}></div>
                <div className="chapter-hover-bg chapter-hover-bg--2"></div>
                <div className="chapter-cell chapter-cell--series">
                    <span className="txt-c">{`${item.series.c}`}</span>
                    <span className="txt-d">{`${item.series.d}`}</span>
                </div>
                <div className="chapter-cell chapter-cell--title">
                    <span className="txt-c">{item.title.c}</span>
                    <span className="txt-d">{item.title.d}</span>
                </div>
                <div className="chapter-cell chapter-cell--actors">
                    <span className="txt-c">
                        <div>Characters</div>
                        <div className="actors-list">
                            {(item.actors ?? []).map((actor) => (
                                <span key={actor} className="avatar">
                                    <img src={chars_map[actor]?.img?.avatar}></img>
                                    <span>{chars_map[actor]?.id}</span>
                                </span>
                            ))}
                        </div>
                    </span>
                    <span className="txt-d">
                        <div>出场角色</div>
                        <div className="actors-list">
                            {(item.actors ?? []).map((actor) => (
                                <span key={actor} className="avatar">
                                    <img src={chars_map[actor]?.img?.avatar}></img>
                                    <span>{chars_map[actor]?.name}</span>
                                </span>
                            ))}
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}



export default function Chapters() {
    const [index, setIndex] = useState<Script[]>([]);
    const [chars_map, setCharsMap] = useState<Record<string, Character>>({});

    useEffect(() => {
        fetchScript().then(setIndex);
        fetchCharacters().then(chars =>
            setCharsMap(chars.reduce<Record<string, Character>>((map, c) => { map[c.id] = c; return map; }, {}))
        );
    }, []);

    return (
        <div className="chapters-list">
            {index.map((item, i) => (
                <ChapterRow key={i} item={item} chars_map={chars_map} />
            ))}
        </div>
    );
}
