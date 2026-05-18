import type { ReactNode } from "react";
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
  scripts:<Scripts />,
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
              <p>本站展示的角色、剧本与短片版权归米哈游所有。角色的排序、稀有度标注与收录范围，以及剧本、短片的展示选择，均出于作者个人喜好，不代表任何官方立场。</p>
              <p>如有冒犯——那你是对的，我道歉。</p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AppV2() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);

  return (
    <div className={clsx("app", phase === "cover" && "app--cover-mode")}>
      <AnimatePresence mode="wait">
        {phase === "cover" ? (
          <Cover key="cover" onLeave={() => setPhase("main")} />
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