import { useState, useCallback, useRef, useLayoutEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import "./HeaderNav.css";

export type Tab = "roles" | "scripts" | "shorts";

export const TABS: { key: Tab; label: string }[] = [
  { key: "roles", label: "角色" },
  { key: "scripts", label: "剧本" },
  { key: "shorts", label: "短片" },
];

// ─── Crystal polygon generator ────────────────────────────────────────────────

function generateCrystalPoints(): string {
  const cx = 50, cy = 20;
  const n = Math.floor(Math.random() * 3) + 5;
  const jitter = (Math.PI * 1.2) / n;
  const angles = Array.from({ length: n }, (_, i) =>
    (i / n) * Math.PI * 2 + (Math.random() - 0.5) * jitter
  ).sort((a, b) => a - b);

  return angles
    .map((a) => {
      const rx = 42 + Math.random() * 14;
      const ry = 16 + Math.random() * 9;
      return `${(cx + Math.cos(a) * rx).toFixed(1)},${(cy + Math.sin(a) * ry).toFixed(1)}`;
    })
    .join(" ");
}

// ─── Crystal background ───────────────────────────────────────────────────────

function CrystalBg({ points }: { points: string }) {
  const c = "162, 90, 240";

  return (
    <motion.div
      className="nav-btn__crystal"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ width: "100%", height: "100%" }}
        animate={{
          filter: [
            `drop-shadow(0 0 1.5px rgba(${c},0.2))`,
            `drop-shadow(0 0 7px rgba(${c},0.75)) drop-shadow(0 0 14px rgba(${c},0.2))`,
            `drop-shadow(0 0 1.5px rgba(${c},0.2))`,
          ],
        }}
        transition={{ filter: { repeat: Infinity, duration: 2.8, ease: "easeInOut" } }}
      >
        <svg viewBox="0 0 100 40" width="100%" height="100%" style={{ overflow: "visible" }}>
          <polygon
            points={points}
            fill={`rgba(${c},0.03)`}
            stroke={`rgba(${c},0.88)`}
            strokeWidth={0.75}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Nav button ───────────────────────────────────────────────────────────────

type NavButtonSize = "sm" | "md" | "lg";

const NavButton = forwardRef<HTMLButtonElement, {
  navKey: Tab;
  label: string;
  isActive: boolean;
  hoveredKey: Tab | null;
  size?: NavButtonSize;
  onClick: () => void;
  onHoverStart: (key: Tab) => void;
  onHoverEnd: () => void;
}>(function NavButton(
  { navKey, label, isActive, hoveredKey, size = "md", onClick, onHoverStart, onHoverEnd },
  ref,
) {
  const hovered = hoveredKey === navKey;
  const [crystalPoints, setCrystalPoints] = useState(generateCrystalPoints);

  const handleMouseEnter = useCallback(() => {
    if (!isActive) setCrystalPoints(generateCrystalPoints());
    onHoverStart(navKey);
  }, [isActive, navKey, onHoverStart]);

  const handleMouseLeave = useCallback(() => onHoverEnd(), [onHoverEnd]);

  const showCrystal = hovered || (isActive && hoveredKey === null);

  return (
    <button
      ref={ref}
      className={clsx("nav-btn", `nav-btn--${size}`, isActive && "nav-btn--active")}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-current={isActive ? "page" : undefined}
    >
      <AnimatePresence>
        {showCrystal && (
          <CrystalBg key={crystalPoints} points={crystalPoints} />
        )}
      </AnimatePresence>
      <span className="nav-btn__label">{label}</span>
    </button>
  );
});

// ─── HeaderNav ────────────────────────────────────────────────────────────────

interface HeaderNavProps {
  activeTab: Tab;
  setTab: (t: Tab) => void;
}

export default function HeaderNav({ activeTab, setTab }: HeaderNavProps) {
  const [hoveredKey, setHoveredKey] = useState<Tab | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const btnRefs = useRef<Partial<Record<Tab, HTMLButtonElement>>>({});
  const [highlight, setHighlight] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const btn = btnRefs.current[activeTab];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const btnRect = btn.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    setHighlight({
      left: btnRect.left - navRect.left + 10,
      width: btnRect.width - 20,
    });
  }, [activeTab]);

  return (
    <nav ref={navRef} className="header__nav" role="navigation" aria-label="主导航">
      {highlight !== null && (
        <motion.span
          className="nav-btn__highlight"
          initial={false}
          animate={{ left: highlight.left, width: highlight.width }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      {TABS.map(({ key, label }) => (
        <NavButton
          key={key}
          ref={(el: HTMLButtonElement | null) => {
            if (el) btnRefs.current[key] = el;
            else delete btnRefs.current[key];
          }}
          navKey={key}
          label={label}
          isActive={activeTab === key}
          hoveredKey={hoveredKey}
          onClick={() => setTab(key)}
          onHoverStart={setHoveredKey}
          onHoverEnd={() => setHoveredKey(null)}
        />
      ))}
    </nav>
  );
}
