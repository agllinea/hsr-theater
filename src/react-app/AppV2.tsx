import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { create } from "zustand";
import "./AppV2.css";
import HeaderNav, { type Tab } from "./components/HeaderNav";
import { SongPlayer } from "./components/SongPlayer";
import { songs } from "./assets/songs";
import Characters from "./pages/Characters";
import Clips from "./pages/Clips";
import Scripts from "./pages/Scripts";
import { Background } from "./components/Background";
import { useBackground } from "./hooks/useBackground";
import { GrayscaleSpotlight } from "./components/GrayscaleSpotlight";
import { useGrayscaleSpotlight } from "./hooks/useGrayscaleSpotlight";

// ─── Transition timing ────────────────────────────────────────────────────────

const BURST_DURATION_S = 0.9;  // burst 动画持续时长（秒）
const MAIN_DELAY_S = 0.1;      // burst 结束后额外等待时长（秒），之后切换到 main

// ─── Store ────────────────────────────────────────────────────────────────────

interface AppState {
  phase: "cover" | "main";
  activeTab: Tab;
  setPhase: (p: "cover" | "main") => void;
  setTab: (t: Tab) => void;
}

const useAppStore = create<AppState>((set) => ({
  phase: "cover",
  activeTab: "roles",
  setPhase: (phase) => set({ phase }),
  setTab: (activeTab) => set({ activeTab }),
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

// ─── Cover crystal hint ───────────────────────────────────────────────────────

const BTN_W = 224;
const BTN_H = 62;

// 调色参数
const CRYSTAL_BASE_COLOR: [number, number, number] = [255, 120, 170]; // 主色 RGB
const CRYSTAL_OPACITY = 1.3;                                            // 整体透明度系数 (0–1)

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

function ScrollCrystal({ onClick }: { onClick?: () => void }) {
  const shape = useRef(makeCrystal());
  const { svgPoints } = shape.current;

  const [r, g, b] = CRYSTAL_BASE_COLOR;
  const o = CRYSTAL_OPACITY;
  // 高光色：主色与白色按 4:6 混合
  const lr = Math.round(r * 0.4 + 255 * 0.6);
  const lg = Math.round(g * 0.4 + 255 * 0.6);
  const lb = Math.round(b * 0.4 + 255 * 0.6);
  const col  = (a: number) => `rgba(${r},${g},${b},${+(a * o).toFixed(2)})`;
  const colL = (a: number) => `rgba(${lr},${lg},${lb},${+(a * o).toFixed(2)})`;

  return (
    <motion.div
      className="cover__hint-crystal"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
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
      <span className="cover__hint-text">See You Tomorrow</span>
    </motion.div>
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
  const { setBackground } = useBackground();
  const setBurstFrom = useGrayscaleSpotlight((s) => s.setBurstFrom);
  const crystalRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [crystalGone, setCrystalGone] = useState(false);

  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);

  useEffect(() => { setBackground(`/bg.jpg`); }, []);

  const handleCrystalClick = () => {
    if (crystalRef.current) {
      const rect = crystalRef.current.getBoundingClientRect();
      setBurstFrom({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setCrystalGone(true);
    leaveTimer.current = setTimeout(
      () => setPhase("main"),
      (BURST_DURATION_S + MAIN_DELAY_S) * 1000,
    );
  };

  return (
    <>
      <Background />
      <GrayscaleSpotlight />
      <AnimatePresence>
        {phase === "cover" && !crystalGone && (
          <motion.div
            className="cover__hint"
            ref={crystalRef}
            variants={{
              hidden:  { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.4, duration: 0.8 } },
              exit:    { opacity: 0, transition: { duration: BURST_DURATION_S, ease: "easeOut" } },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ScrollCrystal onClick={handleCrystalClick} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="app">
        <AnimatePresence mode="wait">
          {phase === "main" && (
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
    </>
  );
}