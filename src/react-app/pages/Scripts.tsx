import { useEffect, useState } from "react";
import { PaletteIcon } from "lucide-react";
import "./Scripts.css";
import { fetchScript, Script } from "../types/script";
import { Character, fetchCharacters } from "../types/character";
import { Toolbar } from "../components/Toolbar";

function ScriptRow({ item, chars_map }: { item: Script; chars_map: Record<string, Character> }) {
    return (
        <div className="script-item">
            <div className="script-row">
                <div className="script-hover-bg script-hover-bg--1" style={{ backgroundImage: `url("/scripts/cover/${item.cover}")` }}></div>
                <div className="script-hover-bg script-hover-bg--2"></div>
                <div className="script-cell script-cell--series">
                    <span className="txt-c">{`${item.series.c}`}</span>
                    <span className="txt-d">{`${item.series.d}`}</span>
                </div>
                <div className="script-cell script-cell--title">
                    <span className="txt-c">{item.title.c}</span>
                    <span className="txt-d">{item.title.d}</span>
                </div>
                <div className="script-cell script-cell--actors">
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



export default function Scripts() {
    const [index, setIndex] = useState<Script[]>([]);
    const [chars_map, setCharsMap] = useState<Record<string, Character>>({});
    const [colorActive, setColorActive] = useState(false);

    useEffect(() => {
        fetchScript().then(setIndex);
        fetchCharacters().then(chars =>
            setCharsMap(chars.reduce<Record<string, Character>>((map, c) => { map[c.id] = c; return map; }, {}))
        );
    }, []);

    const toolbarItems = [
        {
            icon: <PaletteIcon size={16} />,
            isActive: colorActive,
            onClick: () => setColorActive((v) => !v),
        },
    ];

    return (
        <section className="scripts-section">
            <Toolbar items={toolbarItems} />
            <div className={`scripts-list${colorActive ? " scripts-list--palette" : ""}`}>
                {index.map((item, i) => (
                    <ScriptRow key={i} item={item} chars_map={chars_map} />
                ))}
            </div>
        </section>
    );
}
