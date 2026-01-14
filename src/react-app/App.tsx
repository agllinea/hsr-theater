import clsx from "clsx";
// src/App.tsx

import { useEffect, useState } from "react";

import { useTheme } from "./stores/useTheme";
import Main, { Cover } from "./pages/main";
import Actors from "./pages/Actors";
import { Actor } from "./types/models";

import "./App.css";
import { AutoScroll } from "./pages/auto_scroll";
import { ButtonGroup, Button } from "./pages/zzz-button";
import { DramaIcon, FilmIcon, ScrollTextIcon, MusicIcon } from "lucide-react";
import AnimatedShorts from "./pages/AnimatedShorts";
import Scripts from "./pages/Scripts";
import Songs from "./pages/Songs";

const menuItems = [
    { id: "Actors", label: "演员", icon: <DramaIcon />, content: <Actors /> },
    { id: "Clips", label: "动画", icon: <FilmIcon />, content: <AnimatedShorts /> },
    { id: "Scripts", label: "剧本", icon: <ScrollTextIcon />, content: <Scripts /> },
    { id: "Music", label: "音乐", icon: <MusicIcon />, content: <Songs /> },
];
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
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [activeId, setActiveId] = useState<string>(menuItems[0].id);


    return (
        <body className={clsx(theme, dark ? "dark" : "light")} style={{}}>
            <img src="/bg1.jpg" className="bg" />
            {/* {progress < 1 && <Loading progress={progress} />}
            {progress >= 1 && <Main />} */}
            <Cover />
            <AutoScroll id="main">
                <section id="header">
                    <section className="section-container">
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
                </section>
                <section id="content">
                    {menuItems.find((item) => item.id === activeId)?.content}
                </section>
            </AutoScroll>
        </body>
    );
}

export default App;
