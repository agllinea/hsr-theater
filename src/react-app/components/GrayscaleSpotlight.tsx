import { useEffect, useRef } from "react";
import { useMotionValue, animate } from "framer-motion";
import { useGrayscaleSpotlight } from "../hooks/useGrayscaleSpotlight";
import "./GrayscaleSpotlight.css";

export function GrayscaleSpotlight() {
  const { enabled, radius, softness, burstFrom, setEnabled, setBurstFrom } = useGrayscaleSpotlight();
  const overlayRef = useRef<HTMLDivElement>(null);
  const animRadius = useMotionValue(radius);
  const isBursting = useRef(false);

  // Push radius changes to the overlay's mask imperatively — avoids re-renders per frame
  useEffect(() => {
    return animRadius.on("change", (v) => {
      const el = overlayRef.current;
      if (!el) return;
      const feather = Math.min(v * softness, 80);
      const hard = Math.max(v - feather, 0);
      const mask = `radial-gradient(circle ${v}px at var(--spotlight-x) var(--spotlight-y), transparent ${hard}px, black ${v}px)`;
      el.style.setProperty("mask", mask);
      el.style.setProperty("-webkit-mask", mask);
    });
  }, [softness]);

  // Cursor tracking
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.style.setProperty("--spotlight-x", "-9999px");
    root.style.setProperty("--spotlight-y", "-9999px");

    const onMove = (e: MouseEvent) => {
      if (isBursting.current) return;
      root.style.setProperty("--spotlight-x", `${e.clientX}px`);
      root.style.setProperty("--spotlight-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      root.style.removeProperty("--spotlight-x");
      root.style.removeProperty("--spotlight-y");
    };
  }, [enabled]);

  // Burst animation: radius expands from button center to fill the screen
  useEffect(() => {
    if (!burstFrom || !enabled) return;
    isBursting.current = true;

    const root = document.documentElement;
    root.style.setProperty("--spotlight-x", `${burstFrom.x}px`);
    root.style.setProperty("--spotlight-y", `${burstFrom.y}px`);
    animRadius.set(radius);

    const diagonal = Math.hypot(window.innerWidth, window.innerHeight) * 1.1;
    const controls = animate(animRadius, diagonal, {
      duration: 1.4,
      ease: [0.1, 0, 0.15, 1],
      onComplete: () => {
        isBursting.current = false;
        setEnabled(false);
        setBurstFrom(null);
        animRadius.set(radius);
      },
    });

    return () => {
      controls.stop();
      isBursting.current = false;
    };
  }, [burstFrom]);

  if (!enabled) return null;

  const featherPx = Math.min(Math.round(radius * softness), 80);
  const hardStop = radius - featherPx;
  const initialMask = `radial-gradient(circle ${radius}px at var(--spotlight-x) var(--spotlight-y), transparent ${hardStop}px, black ${radius}px)`;

  return (
    <div
      ref={overlayRef}
      className="grayscale-spotlight"
      style={{ mask: initialMask, WebkitMask: initialMask }}
    />
  );
}
