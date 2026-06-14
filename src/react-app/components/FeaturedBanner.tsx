import { ArrowCounterClockwiseIcon, FrameCornersIcon, PushPinIcon, SpeakerHighIcon, SpeakerSlashIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import Hls from "hls.js";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import "./FeaturedBanner.css";

export function FeaturedBanner() {
    const [expanded, setExpanded] = useState(true);
    const [muted, setMuted] = useState(false);
    const [paused, setPaused] = useState(false);
    const innerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const mutedRef = useRef(muted);
    const [height, setHeight] = useState(0);

    mutedRef.current = muted;

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

    const setVideoRef = useCallback((video: HTMLVideoElement | null) => {
        videoRef.current = video;
        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }
        if (!video) return;
        video.muted = mutedRef.current;
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource("/videos/hellow_world/playlist.m3u8");
            hls.attachMedia(video);
            hlsRef.current = hls;
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = "/videos/hellow_world/playlist.m3u8";
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = muted;
    }, [muted]);

    useEffect(() => {
        if (!expanded) setPaused(false);
    }, [expanded]);

    const handleReplay = () => setExpanded(true);
    const handleFullscreen = () => videoRef.current?.requestFullscreen?.();

    return (
        <motion.div
            animate={{ height }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
        >
            <div ref={innerRef}>
                <div className="featured-banner__header-row">
                    <div className={`featured-banner__pill${expanded ? " featured-banner__pill--expanded" : ""}`}>
                        <div className="featured-banner__trigger">
                            <PushPinIcon size={14} weight="duotone" />
                            <span>作者最难忘的</span>
                        </div>
                        {expanded ? (
                            <>
                                <button className="featured-banner__icon-btn" onClick={() => setMuted((v) => !v)}>
                                    {muted ? (
                                        <SpeakerSlashIcon size={15} weight="duotone" />
                                    ) : (
                                        <SpeakerHighIcon size={15} weight="duotone" />
                                    )}
                                </button>
                                <button className="featured-banner__icon-btn" onClick={handleFullscreen}>
                                    <FrameCornersIcon size={15} weight="duotone" />
                                </button>
                                <button className="featured-banner__icon-btn" onClick={() => setExpanded(false)}>
                                    <XIcon size={15} weight="duotone" />
                                </button>
                            </>
                        ) : (
                            <button className="featured-banner__icon-btn" onClick={handleReplay}>
                                <ArrowCounterClockwiseIcon size={15} weight="duotone" />
                            </button>
                        )}
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
                                ref={setVideoRef}
                                className={`featured-banner__video${paused ? " featured-banner__video--paused" : ""}`}
                                autoPlay
                                playsInline
                                onPlay={() => setPaused(false)}
                                onPause={() => setPaused(true)}
                                onEnded={() => setExpanded(false)}
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
