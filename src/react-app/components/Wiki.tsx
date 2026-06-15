import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import "./Wiki.css";

export interface WikiItem {
    title: string;
    contentUrl?: string;
}

interface WikiProps {
    item: WikiItem | null;
    onClose: () => void;
}

function WikiBody({ item, onClose }: { item: WikiItem; onClose: () => void }) {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        setContent(null);
        if (item.contentUrl) {
            fetch(item.contentUrl)
                .then((res) => res.text())
                .then(setContent);
        }
    }, [item.contentUrl]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <>
            <div className="wiki__header">
                <div className="wiki__title">
                    <span>{item.title}</span>
                </div>
                <button className="wiki__close" onClick={onClose} aria-label="关闭">
                    <XIcon size={20} />
                </button>
            </div>
            <div className="wiki__content">
                {item.contentUrl && content == null ? (
                    <div className="wiki__loading">...</div>
                ) : item.contentUrl && content ? (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {content}
                    </ReactMarkdown>
                ) : null}
            </div>
        </>
    );
}

export function Wiki({ item, onClose }: WikiProps) {
    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    className="wiki"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="wiki__body">
                        <WikiBody item={item} onClose={onClose} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
