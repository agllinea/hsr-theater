import { useEffect, useState } from "react";

import { scripts } from "../assets/chapters";
import chars, { chars_map } from "../assets/char";
import { Chapter } from "../types/chapters";
import { TXT } from "../types/text";

import "./page_chapters.css";

function resolveD(txt: TXT): string {
    return typeof txt.d === "string" ? txt.d : "";
}

function ChapterRow({ item }: { item: ScriptEntry }) {
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
                                    <img src={chars_map[actor]?.img.avatar}></img>
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
                                    <img src={chars_map[actor]?.img.avatar}></img>
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

type ScriptEntry = {
    id: string;
    series: TXT;
    title: TXT;
    actors?: string[];
    cover?:string;
};

export default function Chapters() {
    const [index, setIndex] = useState<ScriptEntry[]>([]);

    useEffect(() => {
        fetch("/scripts/index.txt")
            .then((res) => res.text())
            .then((text) => {
                const entries = text
                    .replace(/\r/g, "")
                    .split(/\n\n+/)
                    .filter((block) => block.trim())
                    .map((block) => {
                        const [line1, line2, line3, line4] = block.trim().split("\n");
                        const [id, series_d, title_d] = line1.split("|");
                        const [series_c, title_c] = line2.split("|");
                        const actors = line3 ? line3.split("|") : undefined;
                        return {
                            id,
                            series: { c: series_c, d: series_d },
                            title: { c: title_c, d: title_d },
                            actors,
                            cover: line4 ? line4.trim() : undefined,
                        };
                    });
                setIndex(entries);
            });
    }, []);

    return (
        <div className="chapters-list">
            {index.map((item, i) => (
                <ChapterRow key={i} item={item} />
            ))}
        </div>
    );
}
