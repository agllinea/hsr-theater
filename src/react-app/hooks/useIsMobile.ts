import { useState, useEffect } from "react";

export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
    );

    useEffect(() => {
        const mq = window.matchMedia("(hover: none)");
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return isMobile;
}
