import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CrystalEntry } from "./CrystalEntry";
import { useGrayscaleSpotlight } from "../hooks/useGrayscaleSpotlight";
import "./CoverScreen.css";

const BURST_DURATION_S = 0.9;
const MAIN_DELAY_S = 0.1;

interface CoverScreenProps {
    onEnter: () => void;
}

export function CoverScreen({ onEnter }: CoverScreenProps) {
    const [crystalGone, setCrystalGone] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const setBurstFrom = useGrayscaleSpotlight((s) => s.setBurstFrom);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    const handleClick = () => {
        if (anchorRef.current) {
            const { left, top, width, height } = anchorRef.current.getBoundingClientRect();
            setBurstFrom({ x: left + width / 2, y: top + height / 2 });
        }
        setCrystalGone(true);
        timerRef.current = setTimeout(onEnter, (BURST_DURATION_S + MAIN_DELAY_S) * 1000);
    };

    return (
        <AnimatePresence>
            {!crystalGone && (
                <motion.div
                    className="cover-screen__button-anchor"
                    ref={anchorRef}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { delay: 0.4, duration: 0.8 } },
                        exit: { opacity: 0, transition: { duration: BURST_DURATION_S, ease: "easeOut" } },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <CrystalEntry onClick={handleClick} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
