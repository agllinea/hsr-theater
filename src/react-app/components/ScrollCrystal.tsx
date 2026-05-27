import { useRef } from "react";
import { motion } from "framer-motion";
import "./ScrollCrystal.css";

const BTN_W = 224;
const BTN_H = 62;

const CRYSTAL_BASE_COLOR: [number, number, number] = [189, 122, 255];
const CRYSTAL_OPACITY = 1.3;

function makeCrystal() {
    const cx = BTN_W / 2, cy = BTN_H / 2;
    const n = 6 + Math.floor(Math.random() * 2);
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
        const base = (i / n) * Math.PI * 2 - Math.PI / 2;
        const a = base + (Math.random() - 0.5) * (Math.PI / n) * 0.55;
        const rx = cx * (0.88 + Math.random() * 0.12);
        const ry = cy * (0.82 + Math.random() * 0.14);
        pts.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
    }
    const fmt = (p: { x: number; y: number }) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    return {
        svgPoints: pts.map(fmt).join(" "),
        clipPath: `polygon(${pts.map(p => `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`).join(", ")})`,
    };
}

export function ScrollCrystal({ onClick }: { onClick?: () => void }) {
    const shape = useRef(makeCrystal());
    const { svgPoints } = shape.current;

    const [r, g, b] = CRYSTAL_BASE_COLOR;
    const o = CRYSTAL_OPACITY;
    const lr = Math.round(r * 0.4 + 255 * 0.6);
    const lg = Math.round(g * 0.4 + 255 * 0.6);
    const lb = Math.round(b * 0.4 + 255 * 0.6);
    const col = (a: number) => `rgba(${r},${g},${b},${+(a * o).toFixed(2)})`;
    const colL = (a: number) => `rgba(${lr},${lg},${lb},${+(a * o).toFixed(2)})`;

    return (
        <div
            className="cover__hint-crystal-wrap"
            onClick={onClick}
            style={{ cursor: onClick ? "pointer" : "default" }}
        >
            <motion.div
                className="cover__hint-crystal"
                animate={{
                    scale: [1, 1.045, 1],
                    filter: [
                        `drop-shadow(0 2px 12px ${col(0.22)})`,
                        `drop-shadow(0 4px 28px ${col(0.60)}) drop-shadow(0 0 14px ${colL(0.30)})`,
                        `drop-shadow(0 2px 12px ${col(0.22)})`,
                    ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg
                    viewBox={`0 0 ${BTN_W} ${BTN_H}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
                >
                    <defs>
                        <linearGradient id="lg-crystal-body" x1="20%" y1="0%" x2="80%" y2="100%">
                            <stop offset="0%" stopColor={colL(0.24)} />
                            <stop offset="100%" stopColor={col(0.10)} />
                        </linearGradient>
                        <linearGradient id="lg-crystal-sheen" x1="0%" y1="0%" x2="42%" y2="58%">
                            <stop offset="0%" stopColor={colL(0.52)} />
                            <stop offset="100%" stopColor={colL(0)} />
                        </linearGradient>
                    </defs>
                    <polygon points={svgPoints} fill="url(#lg-crystal-body)" />
                    <polygon points={svgPoints} fill="url(#lg-crystal-sheen)" />
                    <polygon points={svgPoints} fill="none" stroke={colL(0.55)} strokeWidth={1} />
                    <polygon points={svgPoints} fill="none" stroke={colL(0.88)} strokeWidth={0.5} />
                </svg>
            </motion.div>
            <span className="cover__hint-text">See You Tomorrow</span>
        </div>
    );
}
