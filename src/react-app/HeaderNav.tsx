import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

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

function CrystalBg({ points, isActive }: { points: string; isActive: boolean }) {
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
        animate={
          isActive
            ? {
                filter: [
                  "drop-shadow(0 0 1.5px rgba(255,255,255,0.2))",
                  "drop-shadow(0 0 7px rgba(255,255,255,0.75)) drop-shadow(0 0 14px rgba(255,255,255,0.2))",
                  "drop-shadow(0 0 1.5px rgba(255,255,255,0.2))",
                ],
              }
            : { filter: "none" }
        }
        transition={
          isActive
            ? { filter: { repeat: Infinity, duration: 2.8, ease: "easeInOut" } }
            : { duration: 0.25 }
        }
      >
        <svg
          viewBox="0 0 100 40"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <polygon
            points={points}
            fill={isActive ? "rgba(255,255,255,0.05)" : "rgba(245,243,238,0.03)"}
            stroke={isActive ? "rgba(255,255,255,0.88)" : "rgba(245,243,238,0.32)"}
            strokeWidth={0.75}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Nav button ───────────────────────────────────────────────────────────────

function NavButton({
  navKey,
  label,
  isActive,
  hoveredKey,
  onClick,
  onHoverStart,
  onHoverEnd,
}: {
  navKey: Tab;
  label: string;
  isActive: boolean;
  hoveredKey: Tab | null;
  onClick: () => void;
  onHoverStart: (key: Tab) => void;
  onHoverEnd: () => void;
}) {
  const hovered = hoveredKey === navKey;
  const [crystalPoints, setCrystalPoints] = useState(generateCrystalPoints);

  const handleMouseEnter = useCallback(() => {
    if (!isActive) setCrystalPoints(generateCrystalPoints());
    onHoverStart(navKey);
  }, [isActive, navKey, onHoverStart]);

  const handleMouseLeave = useCallback(() => onHoverEnd(), [onHoverEnd]);

  // show crystal only if this button is hovered, OR it's active and nothing else is hovered
  const showCrystal = hovered || (isActive && hoveredKey === null);
  const crystalKey = isActive ? "active" : crystalPoints;

  return (
    <button
      className={clsx("nav-btn", isActive && "nav-btn--active")}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-current={isActive ? "page" : undefined}
    >
      <AnimatePresence>
        {showCrystal && (
          <CrystalBg key={crystalKey} points={crystalPoints} isActive={isActive} />
        )}
      </AnimatePresence>

      <span className="nav-btn__label">{label}</span>

      {isActive && (
        <motion.span
          className="nav-btn__underline"
          layoutId="nav-underline"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
    </button>
  );
}

// ─── HeaderNav ────────────────────────────────────────────────────────────────

interface HeaderNavProps {
  activeTab: Tab;
  setTab: (t: Tab) => void;
}

export default function HeaderNav({ activeTab, setTab }: HeaderNavProps) {
  const [hoveredKey, setHoveredKey] = useState<Tab | null>(null);

  return (
    <nav className="header__nav" role="navigation" aria-label="主导航">
      {TABS.map(({ key, label }) => (
        <NavButton
          key={key}
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
