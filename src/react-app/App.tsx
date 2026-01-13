// src/App.tsx

import { useEffect, useState } from "react";


import "./App.css";
import { useTheme } from "./stores/useTheme";
import clsx from "clsx";
import Main, { Cover } from "./pages/main";
import { AutoScroll } from "./pages/auto_scroll";
import { Button, ButtonGroup } from "./pages/zzz-button";
import { FileText, Music, ToolCase, Brain, Music2, VenetianMaskIcon, DramaIcon, FilmIcon, MusicIcon, ScrollTextIcon } from "lucide-react";
import { MaskHappyIcon } from "@phosphor-icons/react";
import data from './assets/actors.json'
import { Actor } from "./types/models";
import "./actor_card.css";
import { actors } from "./assets/actors_new";
const menuItems = [
    { id: "Actors", label: "演员", icon: <DramaIcon /> },
    { id: "Clips", label: "动画", icon: <FilmIcon /> },
    { id: "Scripts", label: "剧本", icon: <ScrollTextIcon /> },
    { id: "Music", label: "音乐", icon: <MusicIcon /> },
]
function App() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => prev + 0.3);
            if (progress >= 1) {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const { theme, dark } = useTheme();


    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = (): void => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                // setSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [activeId, setActiveId] = useState<string>(menuItems[0].id);

    return (
        <body className={clsx(theme, dark ? "dark" : "light")} style={{
        }}>

            <img src="/bg1.jpg" className="bg" />
            {/* {progress < 1 && <Loading progress={progress} />}
            {progress >= 1 && <Main />} */}
            <Cover />
            <AutoScroll id="main">
                <section id="header">
                    <span></span>
                    <ButtonGroup>
                        {menuItems.map((item) => (
                            <Button
                                key={item.id}
                                isMobile={isMobile}
                                icon={item.icon}
                                aria-label={item.label}
                                active={activeId === item.id}
                                onClick={() => setActiveId(item.id)}
                            >
                                {item.label}
                            </Button>
                        ))}

                    </ButtonGroup>
                </section>
                <section id="content" className="actors-grid">
                    {
                        actors.map((actor, i) => i <= 40 && (
                            <span className={clsx("actor-card", actor.rarity??"ssr")}>
                                <div className="actor-card-image" key={i} style={{
                                    backgroundImage: `url("/character_card/${actor.id}.webp")`,
                                }}></div>
                                <div className="actor-card-flash" key={i}>
                                    <span>{actor.name}</span>

                                </div>
                            </span>

                        ))
                    }
                </section>
            </AutoScroll>
        </body>
    );
}

export default App;
