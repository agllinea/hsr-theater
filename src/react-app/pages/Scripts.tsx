import { useEffect, useState } from "react";
import { PaletteIcon, X, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import "./Scripts.css";
import { fetchScript, Script } from "../types/script";
import { Character, fetchCharacters } from "../types/character";
import { Toolbar } from "../components/Toolbar";

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } };

function ScriptViewer({ item, onClose }: { item: Script; onClose: () => void }) {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/scripts/content/${item.id}.md`)
            .then((res) => res.text())
            .then(setContent);
    }, [item.id]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <motion.div className="script-viewer" {...fade}>
            <div className="script-viewer-header">
                <div className="script-viewer-breadcrumb">
                    <span>{item.series.d}</span>
                    <ChevronRight size={14} />
                    <span>{item.title.d}</span>
                </div>
                <button className="script-viewer-close" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
            <div className="script-viewer-body">
                {content == null ? (
                    <div className="script-viewer-loading">...</div>
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {content}
                    </ReactMarkdown>
                )}
            </div>
        </motion.div>
    );
}

function ScriptRow({ item, chars_map, onClick }: { item: Script; chars_map: Record<string, Character>; onClick: () => void }) {
    return (
        <div className="script-item" onClick={onClick}>
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
    const [activeScript, setActiveScript] = useState<Script | null>(null);

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
            <AnimatePresence mode="wait">
                {activeScript ? (
                    <ScriptViewer key="viewer" item={activeScript} onClose={() => setActiveScript(null)} />
                ) : (
                    <motion.div key="list" className="scripts-list-wrapper" {...fade}>
                        <Toolbar items={toolbarItems} />
                        <div className={`scripts-list${colorActive ? " scripts-list--palette" : ""}`}>
                            {index.map((item, i) => (
                                <ScriptRow key={i} item={item} chars_map={chars_map} onClick={() => setActiveScript(item)} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
