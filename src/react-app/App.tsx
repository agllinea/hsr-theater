import clsx from "clsx";
// src/App.tsx

import { useEffect, useState } from "react";

import { useTheme } from "./stores/useTheme";
import Actors from "./pages/page_actors";

import "./App.css";
import { ButtonGroup, Button } from "./components/zzz-button";
import { DramaIcon, FilmIcon, ScrollTextIcon, MusicIcon } from "lucide-react";
import AnimatedShorts from "./pages/page_clips";
import Scripts from "./pages/page_scripts";
import Songs from "./pages/page_songs";
import { AnimatePresence, motion } from "framer-motion";
import Title from "./pages/page_cover";

const menuItems = [
    { id: "Actors", label: "演员", icon: <DramaIcon />, content: <Actors /> },
    {
        id: "Clips",
        label: "动画",
        icon: <FilmIcon />,
        content: <AnimatedShorts />,
    },
    {
        id: "Scripts",
        label: "剧本",
        icon: <ScrollTextIcon />,
        content: <Scripts />,
    },
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

    const [showCover, setShowCover] = useState(true);

    const handleCoverScroll = () => {
        setShowCover(false);
    };
    return (
        <body className={clsx(theme, dark ? "dark" : "light")} style={{}}>
            <img src="/bg1.jpg" className="bg" />
            <AnimatePresence>
                {showCover ? (
                    <Title key="cover" onScroll={handleCoverScroll} />
                ) : (
                    <motion.section
                        id="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    >
                        <motion.section
                            id="header"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "backOut", delay: 0.6 }}
                        >
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
                        </motion.section>
                        <motion.section
                            id="content"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        >
                            {menuItems.find((item) => item.id === activeId)?.content}
                        </motion.section>
                    </motion.section>
                )}
            </AnimatePresence>
        </body>
    );
}

export default App;
