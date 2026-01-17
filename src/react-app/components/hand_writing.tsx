import { useLayoutEffect, useRef } from "react";
type StrokePath = {
    d: string;
    strokeWidth?: number;
};

type Props = {
    paths: StrokePath[];
    duration?: number; // seconds
    pause?: number; // seconds
    stroke?: string;
    strokeWidth?: number;
};

export default function HandWriting({ paths, duration = 8, pause = 0.08, stroke = "white" }: Props) {
    const svgRef = useRef<SVGSVGElement>(null);

    // Split by "M" and rebuild valid paths
    const strokes: StrokePath[] = paths.flatMap((p) => {
        const parts = p.d
            .split(/(?=M\s)/)
            .map((s) => s.trim())
            .filter(Boolean);

        return parts.map((d) => ({
            d,
            strokeWidth: p.strokeWidth ?? 1,
        }));
    });

    useLayoutEffect(() => {
        if (!svgRef.current) return;

        const pathEls = Array.from(svgRef.current.querySelectorAll("path"));
        if (pathEls.length === 0) return;

        const lengths = pathEls.map((p) => p.getTotalLength());
        const totalLength = lengths.reduce((a, b) => a + b, 0);

        const totalTime = duration * 1000;
        const totalPauseTime = Math.max(0, (pathEls.length - 1) * pause * 1000);
        const drawableTime = Math.max(0, totalTime - totalPauseTime);

        let delay = 0;

        pathEls.forEach((path, i) => {
            const len = lengths[i];
            const pathDuration = totalLength === 0 ? 0 : (len / totalLength) * drawableTime;

            path.style.strokeDasharray = `${len}`;
            path.style.strokeDashoffset = `${len}`;
            path.style.visibility = "hidden";

            path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
                duration: pathDuration,
                easing: "linear",
                fill: "forwards",
                delay,
            });

            // Reveal exactly at animation start
            setTimeout(() => {
                path.style.visibility = "visible";
            }, delay);

            delay += pathDuration + pause * 1000;
        });
    }, [duration, pause]);

return (
  <svg
    ref={svgRef}
    viewBox="0 0 20 20"
    className="handwriting-svg"
  >
    <defs>
      {/* Mask definition */}
      <mask id="stroke-mask">
        {/* Start fully hidden */}
        <rect width="100%" height="100%" fill="black" />

        {/* Your handwriting paths reveal the background */}
        {strokes.map((s, i) => (
          <path
            key={i}
            d={s.d}
            stroke="white"
            strokeWidth={s.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </mask>
    </defs>

    {/* Background that gets revealed */}
    <rect
      width="100%"
      height="100%"
      mask="url(#stroke-mask)"
      fill="url(#bg)"
    />

    {/* Background gradient / image */}
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff00d0" />
        <stop offset="100%" stopColor="#00ff99" />
      </linearGradient>
    </defs>
  </svg>
);

}
