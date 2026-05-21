import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { create } from "zustand";
import "./AppV2.css";
import HeaderNav, { type Tab } from "./components/HeaderNav";
import { SongPlayer } from "./components/SongPlayer";
import { songs } from "./assets/songs";
import Characters from "./pages/Characters";
import Clips from "./pages/Clips";
import Scripts from "./pages/Scripts";
import Cover from "./pages/Cover";

// ─── Store ────────────────────────────────────────────────────────────────────

type Theme = "dark" | "light";

interface AppState {
  phase: "cover" | "main";
  activeTab: Tab;
  theme: Theme;
  setPhase: (p: "cover" | "main") => void;
  setTab: (t: Tab) => void;
  toggleTheme: () => void;
}

const savedTheme = (localStorage.getItem("theme") as Theme | null) ?? "dark";

const useAppStore = create<AppState>((set) => ({
  phase: "cover",
  activeTab: "roles",
  theme: savedTheme,
  setPhase: (phase) => set({ phase }),
  setTab: (activeTab) => set({ activeTab }),
  toggleTheme: () =>
    set((s) => {
      const next: Theme = s.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      document.documentElement.dataset.theme = next;
      return { theme: next };
    }),
}));

// ─── Content map ──────────────────────────────────────────────────────────────

const CONTENT: Record<Tab, ReactNode> = {
  roles: <Characters />,
  scripts: <Scripts />,
  shorts: <Clips />,
};

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const { activeTab, setTab } = useAppStore();

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <SongPlayer song={songs[1]} autoPlay />
      <HeaderNav activeTab={activeTab} setTab={setTab} />
    </motion.header>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────

function MainContent() {
  const activeTab = useAppStore((s) => s.activeTab);

  return (
    <div className="main">
      <Header />
      <div className="main__stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="content-panel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          >
            {CONTENT[activeTab]}
            <footer className="site-footer">
              <div className="site-footer-inner">
                <p>本站展示的角色、剧本与短片版权归米哈游所有。角色的排序、稀有度标注与收录范围，以及剧本、短片的展示选择，均出于作者个人喜好，不代表任何官方立场。</p>
                <p>如有冒犯——那你是对的，我道歉。</p>
              </div>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Scroll to top ────────────────────────────────────────────────────────────

// Slim upward arrow-crystal: narrow shoulders, elongated body, shallow V-notch
const CRYSTAL_BASE = [
  [50, 2],  // top apex
  [78, 44],  // right shoulder (waist)
  [72, 94],  // right base
  [50, 82],  // bottom notch (shallow)
  [28, 94],  // left base
  [22, 44],  // left shoulder (waist)
] as const;

function generateCrystalPoints(): string {
  const j = (range: number) => (Math.random() - 0.5) * range * 2;
  return CRYSTAL_BASE
    .map(([x, y], i) => {
      const isWaist = i === 1 || i === 5;
      return `${(x + j(4)).toFixed(1)},${(y + j(isWaist ? 12 : 4)).toFixed(1)}`;
    })
    .join(" ");
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [points, setPoints] = useState(generateCrystalPoints);

  useEffect(() => {
    if (visible) setPoints(generateCrystalPoints());
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Scroll to top"
        >
          {/* crystal shell */}
          <div className="scroll-to-top__crystal">
            <motion.div
              style={{ width: "100%", height: "100%" }}
              animate={{
                filter: [
                  "drop-shadow(0 0 1.5px rgba(255,255,255,0.2))",
                  "drop-shadow(0 0 7px rgba(255,255,255,0.75)) drop-shadow(0 0 14px rgba(255,255,255,0.2))",
                  "drop-shadow(0 0 1.5px rgba(255,255,255,0.2))",
                ],
              }}
              transition={{ filter: { repeat: Infinity, duration: 2.8, ease: "easeInOut" } }}
            >
              <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible" }}>
                <polygon
                  points={points}
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.88)"
                  strokeWidth={0.8}
                />
              </svg>
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AppV2() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={clsx("app", phase === "cover" && "app--cover-mode")}>
      <AnimatePresence mode="wait">
        {phase === "cover" ? (
          <Cover key="cover" onLeave={() => setPhase("main")} theme={theme} onToggleTheme={toggleTheme} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", minHeight: "100vh" }}
          >
            <MainContent />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}