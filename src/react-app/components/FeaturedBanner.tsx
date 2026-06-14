import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    PushPinIcon,
    SpeakerHighIcon,
    SpeakerSlashIcon,
    ArrowCounterClockwiseIcon,
    FrameCornersIcon,
} from "@phosphor-icons/react";
import "./FeaturedBanner.css";

export function FeaturedBanner() {
    const [expanded, setExpanded] = useState(true);
    const [muted, setMuted] = useState(false);
    const [paused, setPaused] = useState(false);
    const [ended, setEnded] = useState(false);
    const innerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if (innerRef.current) setHeight(innerRef.current.offsetHeight);
    }, []);

    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = muted;
    }, [muted]);

    useEffect(() => {
        if (!expanded) setPaused(false);
    }, [expanded]);

    const handleToggle = () => {
        if (!expanded) setEnded(false);
        setExpanded((v) => !v);
    };

    const handleReplay = () => {
        setEnded(false);
        setExpanded(true);
    };

    const handleFullscreen = () => {
        videoRef.current?.requestFullscreen?.();
    };

    return (
        <motion.div
            animate={{ height }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
        >
            <div ref={innerRef}>
                <div className="featured-banner__header-row">
                    <div className={`featured-banner__pill${expanded ? " featured-banner__pill--expanded" : ""}`}>
                        <button className="featured-banner__trigger" onClick={handleToggle}>
                            <PushPinIcon size={14} weight="duotone" />
                            <span>作者最难忘的</span>
                        </button>
                        {ended && (
                            <button className="featured-banner__icon-btn" onClick={handleReplay}>
                                <ArrowCounterClockwiseIcon size={15} weight="duotone" />
                            </button>
                        )}
                        {expanded && (
                            <button className="featured-banner__icon-btn" onClick={handleFullscreen}>
                                <FrameCornersIcon size={15} weight="duotone" />
                            </button>
                        )}
                        <button className="featured-banner__icon-btn" onClick={() => setMuted((v) => !v)}>
                            {muted
                                ? <SpeakerSlashIcon size={15} weight="duotone" />
                                : <SpeakerHighIcon size={15} weight="duotone" />
                            }
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            className="featured-banner__body"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <video
                                ref={videoRef}
                                className={`featured-banner__video${paused ? " featured-banner__video--paused" : ""}`}
                                src="/videos/你好，世界.webm"
                                autoPlay
                                playsInline
                                onPlay={() => setPaused(false)}
                                onPause={() => setPaused(true)}
                                onEnded={() => { setExpanded(false); setEnded(true); }}
                                onClick={() => {
                                    const v = videoRef.current;
                                    if (!v) return;
                                    v.paused ? v.play() : v.pause();
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
