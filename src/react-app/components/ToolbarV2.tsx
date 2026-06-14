import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";
import "./ToolbarV2.css";

export interface ToolbarV2Item {
    icon: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    dropdownPanel?: ReactNode;
}

function ToolbarV2Button({ item }: { item: ToolbarV2Item }) {
    const { icon, isActive, onClick } = item;

    return (
        <button
            className={clsx("toolbar-v2-btn", isActive && "toolbar-v2-btn--active")}
            onClick={onClick}
        >
            <span className="toolbar-v2-btn__icon">{icon}</span>
        </button>
    );
}

export function ToolbarV2({ items }: { items: ToolbarV2Item[] }) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if (innerRef.current) setHeight(innerRef.current.offsetHeight);
    }, []);

    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const activePanels = items
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => item.isActive && item.dropdownPanel != null);

    return (
        <motion.div
            className="toolbar-v2"
            animate={{ height }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
        >
            <div ref={innerRef}>
                <div className="toolbar-v2__buttons">
                    {items.map((item, i) => (
                        <ToolbarV2Button key={i} item={item} />
                    ))}
                </div>
                <AnimatePresence>
                    {activePanels.length > 0 && (
                        <div className="toolbar-v2__dropdown">
                            {activePanels.map(({ item, i }) => (
                                <motion.div
                                    key={i}
                                    className="toolbar-v2__panel"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="toolbar-v2__panel-inner">
                                        {item.dropdownPanel}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
