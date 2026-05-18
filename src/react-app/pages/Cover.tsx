import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Cover.css";

interface CoverProps {
    onLeave: () => void;
}

export default function Cover({ onLeave }: CoverProps) {
    const triggered = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (triggered.current) return;
            if (window.scrollY > 60) {
                triggered.current = true;
                onLeave();
                window.scrollTo({ top: 0, behavior: "instant" });
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [onLeave]);

    return (
        <motion.div
            className="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
            {/* grain overlay */}
            <div className="cover__grain" aria-hidden />

            {/* center text */}
            <motion.div
                className="cover__center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="cover__eyebrow">— 作品集 —</span>
                <h1 className="cover__title">this is cover</h1>
            </motion.div>

            {/* scroll hint */}
            <motion.div
                className="cover__hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
            >
                <span className="cover__hint-label">scroll down</span>
                <div className="cover__hint-track">
                    <motion.div
                        className="cover__hint-dot"
                        animate={{ y: [0, 18, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
