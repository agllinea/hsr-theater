import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { create } from "zustand";
import "./AppV2.css";
import HeaderNav, { type Tab } from "./HeaderNav";

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

const CONTENT: Record<Tab, string> = {
  roles: "这里展示角色",
  scripts: "这里展示剧本",
  shorts: "这里展示短片",
};

// ─── Cover ────────────────────────────────────────────────────────────────────

function Cover() {
  const setPhase = useAppStore((s) => s.setPhase);
  const triggered = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (triggered.current) return;
      if (window.scrollY > 60) {
        triggered.current = true;
        setPhase("main");
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setPhase]);

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
      {/* left: intentionally empty */}
      <div className="header__left" />

      {/* right: nav */}
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
            <p className="content-panel__placeholder">{CONTENT[activeTab]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AppV2() {
  const phase = useAppStore((s) => s.phase);

  return (
    <div className={clsx("app", phase === "cover" && "app--cover-mode")}>
      <AnimatePresence mode="wait">
        {phase === "cover" ? (
          <Cover key="cover" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", minHeight: "100vh" }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}