import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";
import "./Toolbar.css";

export interface ToolbarItem {
    icon: ReactNode;
    hoveredIcon?: ReactNode;
    activeIcon?: ReactNode;
    onHover?: () => void;
    onClick?: () => void;
    isActive?: boolean;
    dropdownPanel?: ReactNode;
}

function ToolbarButton({ item }: { item: ToolbarItem }) {
    const [hovered, setHovered] = useState(false);
    const { icon, hoveredIcon, activeIcon, onHover, onClick, isActive } = item;

    const iconKey =
        isActive && activeIcon ? "active"
        : hovered && hoveredIcon ? "hovered"
        : "default";

    const iconNode =
        iconKey === "active" ? activeIcon
        : iconKey === "hovered" ? hoveredIcon
        : icon;

    return (
        <button
            className={clsx("toolbar-btn", isActive && "toolbar-btn--active")}
            onClick={onClick}
            onMouseEnter={() => { setHovered(true); onHover?.(); }}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={iconKey}
                    className="toolbar-btn__icon"
                    initial={{ opacity: 0, scale: 0.65 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.65 }}
                    transition={{ duration: 0.11, ease: "easeOut" }}
                >
                    {iconNode}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}

export function Toolbar({ items }: { items: ToolbarItem[] }) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    // Synchronous initial measurement before first paint so there's no flash.
    useLayoutEffect(() => {
        if (innerRef.current) setHeight(innerRef.current.offsetHeight);
    }, []);

    // Track all subsequent height changes with ResizeObserver.
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
            className="toolbar"
            animate={{ height }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
        >
            {/* Inner div is the source of truth for height measurement. */}
            <div ref={innerRef}>
                <div className="toolbar__buttons">
                    {items.map((item, i) => (
                        <ToolbarButton key={i} item={item} />
                    ))}
                </div>

                {activePanels.length > 0 && (
                    <div className="toolbar__dropdown">
                        {activePanels.map(({ item, i }, ordinal) => (
                            <motion.div
                                key={i}
                                className={clsx("toolbar__panel", ordinal > 0 && "toolbar__panel--divided")}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="toolbar__panel-inner">
                                    {item.dropdownPanel}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
