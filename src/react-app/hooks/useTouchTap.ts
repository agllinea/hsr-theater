import { useEffect, useRef } from "react";

export function useTouchTap<T extends HTMLElement>({
    isMobile,
    isActive,
    onActivate,
    onOpen,
}: {
    isMobile: boolean;
    isActive: boolean;
    onActivate: () => void;
    onOpen: () => void;
}) {
    const elRef = useRef<T>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const latestRef = useRef({ isActive, onActivate, onOpen });
    latestRef.current = { isActive, onActivate, onOpen };

    useEffect(() => {
        if (!isMobile) return;
        const el = elRef.current;
        if (!el) return;

        const onTouchStart = (e: TouchEvent) => {
            const t = e.touches[0];
            touchStartRef.current = { x: t.clientX, y: t.clientY };
        };

        const onTouchEnd = (e: TouchEvent) => {
            const start = touchStartRef.current;
            touchStartRef.current = null;
            if (!start) return;
            const t = e.changedTouches[0];
            const dx = Math.abs(t.clientX - start.x);
            const dy = Math.abs(t.clientY - start.y);
            if (dx > 8 || dy > 8) return;

            if (latestRef.current.isActive) {
                latestRef.current.onOpen();
            } else {
                latestRef.current.onActivate();
            }
        };

        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, [isMobile]);

    return elRef;
}
