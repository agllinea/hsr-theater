import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronUp, Wrench, SkipBack, SkipForward, Play, Pause } from "lucide-react";
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
import { ScrollCrystal } from "./components/ScrollCrystal";
import { useSongPlayer } from "./hooks/useSongPlayer";

// ─── Transition timing ────────────────────────────────────────────────────────

const BURST_DURATION_S = 0.9;  // burst 动画持续时长（秒）
const MAIN_DELAY_S = 0.1;      // burst 结束后额外等待时长（秒），之后切换到 main

// ─── Store ────────────────────────────────────────────────────────────────────

interface AppState {
  phase: "cover" | "main";
  activeTab: Tab;
  crystalGone: boolean;
  setPhase: (p: "cover" | "main") => void;
  setTab: (t: Tab) => void;
  setCrystalGone: (v: boolean) => void;
  reloadCover: () => void;
}

const useAppStore = create<AppState>((set) => ({
  phase: "cover",
  activeTab: "roles",
  crystalGone: false,
  setPhase: (phase) => set({ phase }),
  setTab: (activeTab) => set({ activeTab }),
  setCrystalGone: (crystalGone) => set({ crystalGone }),
  reloadCover: () => set({ phase: "cover", crystalGone: false }),
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
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <SongPlayer songs={songs} autoPlay />
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
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            className="content-panel"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
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


// ─── Dev Tool ─────────────────────────────────────────────────────────────────

const DEV_CLICK_TARGET = 6;
const DEV_CLICK_RESET_MS = 1500;

function DevTool() {
  const reloadCover = useAppStore((s) => s.reloadCover);
  const isPlaying = useSongPlayer((s) => s.isPlaying);
  const progress = useSongPlayer((s) => s.progress);
  const songTitle = useSongPlayer((s) => s.songTitle);
  const play = useSongPlayer((s) => s.play);
  const pause = useSongPlayer((s) => s.pause);
  const skipNext = useSongPlayer((s) => s.skipNext);
  const skipPrev = useSongPlayer((s) => s.skipPrev);
  const seekTo = useSongPlayer((s) => s.seekTo);

  const [devOpen, setDevOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHiddenClick = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    clickCountRef.current++;
    if (clickCountRef.current >= DEV_CLICK_TARGET) {
      clickCountRef.current = 0;
      setDevOpen(true);
    } else {
      resetTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, DEV_CLICK_RESET_MS);
    }
  };

  return (
    <>
      <div className="dev-trigger" onClick={handleHiddenClick} />

      <AnimatePresence>
        {devOpen && (
          <motion.button
            className="dev-fab"
            onClick={() => setPopupOpen((v) => !v)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            aria-label="Dev tools"
          >
            <Wrench size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {devOpen && popupOpen && (
          <motion.div
            className="dev-popup"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="dev-popup__section">
              <div className="dev-popup__song-title">{songTitle || "—"}</div>
              <div className="dev-popup__music-controls">
                <button className="dev-popup__icon-btn" onClick={skipPrev} aria-label="上一首">
                  <SkipBack size={14} />
                </button>
                <button className="dev-popup__icon-btn" onClick={isPlaying ? pause : play} aria-label={isPlaying ? "暂停" : "播放"}>
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button className="dev-popup__icon-btn" onClick={skipNext} aria-label="下一首">
                  <SkipForward size={14} />
                </button>
              </div>
              <input
                className="dev-popup__seek"
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progress}
                onChange={(e) => seekTo(Number(e.target.value))}
              />
            </div>
            <div className="dev-popup__divider" />
            <button
              className="dev-popup__btn"
              onClick={() => { reloadCover(); setPopupOpen(false); }}
            >
              重新加载 Cover
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Scroll to top ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

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
          <ChevronUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AppV2() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const crystalGone = useAppStore((s) => s.crystalGone);
  const setCrystalGone = useAppStore((s) => s.setCrystalGone);
  const { setBackground } = useBackground();
  const setBurstFrom = useGrayscaleSpotlight((s) => s.setBurstFrom);
  const crystalRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);

  useEffect(() => { setBackground(`/bg2.jpg`); }, []);

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
      <DevTool />
      <AnimatePresence>
        {phase === "cover" && !crystalGone && (
          <motion.div
            className="cover__hint"
            ref={crystalRef}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.4, duration: 0.8 } },
              exit: { opacity: 0, transition: { duration: BURST_DURATION_S, ease: "easeOut" } },
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