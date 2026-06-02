import { useRef, useState } from "react";
import { Wrench, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../AppV2";
import { useSongPlayer } from "../hooks/useSongPlayer";
import "./DevTool.css";

const DEV_TOOL_FORCE = false;
const DEV_TOOL_DISABLED = false;
const DEV_CLICK_TARGET = 6;
const DEV_CLICK_RESET_MS = 1500;

export function DevTool() {
  if (DEV_TOOL_DISABLED) return null;
  const reloadCover = useAppStore((s) => s.reloadCover);
  const isPlaying = useSongPlayer((s) => s.isPlaying);
  const progress = useSongPlayer((s) => s.progress);
  const songTitle = useSongPlayer((s) => s.songTitle);
  const play = useSongPlayer((s) => s.play);
  const pause = useSongPlayer((s) => s.pause);
  const skipNext = useSongPlayer((s) => s.skipNext);
  const skipPrev = useSongPlayer((s) => s.skipPrev);
  const seekTo = useSongPlayer((s) => s.seekTo);

  const [devOpen, setDevOpen] = useState(DEV_TOOL_FORCE);
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
