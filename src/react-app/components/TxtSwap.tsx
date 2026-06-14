import type { ReactNode } from "react";
import "./TxtSwap.css";

interface TxtSwapProps {
    c: ReactNode;
    d: ReactNode;
}

export function TxtSwap({ c, d }: TxtSwapProps) {
    return (
        <div className="txt-swap">
            <div className="txt-c">{c}</div>
            <div className="txt-d">{d}</div>
        </div>
    );
}
