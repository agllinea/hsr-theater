import { useState, useEffect } from "react";
import { Background } from "./components/Background";
import { GrayscaleSpotlight } from "./components/GrayscaleSpotlight";
import { CoverScreen } from "./components/CoverScreen";
import { ContentPanel } from "./components/ContentPanel";
import { AppHeader } from "./components/AppHeader";
import { useBackground } from "./hooks/useBackground";
import type { Tab } from "./components/HeaderNav";
import "./AppV3.css";

export default function AppV3() {
    const [phase, setPhase] = useState<"cover" | "main">("cover");
    const [activeTab, setActiveTab] = useState<Tab>("roles");
    const setBackground = useBackground((s) => s.setBackground);

    useEffect(() => {
        setBackground("bg/cyrene_and_me.jpg");
    }, [setBackground]);

    return (
        <div className="app">
            <Background />
            <GrayscaleSpotlight />
            {phase === "cover" && <CoverScreen onEnter={() => setPhase("main")} />}
            {phase === "main" && (
                <>
                    <AppHeader activeTab={activeTab} setTab={setActiveTab} />
                    <ContentPanel activeTab={activeTab} />
                </>
            )}
        </div>
    );
}
