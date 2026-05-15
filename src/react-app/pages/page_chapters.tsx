import { scripts } from "../assets/chapters";
import chars, { chars_map } from "../assets/char";
import { Chapter } from "../types/chapters";
import { TXT } from "../types/text";

import "./page_chapters.css";

function resolveD(txt: TXT): string {
    return typeof txt.d === "string" ? txt.d : "";
}

function ChapterRow({ item }: { item: Chapter }) {
    return (
        <div className="chapter-item">
            <div className="chapter-row">
                <div className="chapter-hover-bg"></div>
                <div className="chapter-cell chapter-cell--series">
                    <span className="txt-c">{`${item.series.c} · ${item.chapter.c}`}</span>
                    <span className="txt-d">{`${item.series.d} · ${item.chapter.d}`}</span>
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
                        <div>Characters</div>
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
                {/* <div className="chapter-cell chapter-cell--status">
                    <span className="txt-c">{item.status.c}</span>
                    <span className="txt-d">{item.status.d}</span>
                </div> */}
            </div>
            {/* {(item.actors ?? []).length > 0 && (
                <div className="chapter-panel">
                    <div className="chapter-panel-actors">
                        {(item.actors ?? []).map((actor) => (
                            <span key={actor}>{actor}</span>
                        ))}
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default function Chapters() {
    return (
        <div className="chapters-list">
            {scripts.map((item, i) => (
                <ChapterRow key={i} item={item} />
            ))}
        </div>
    );
}
