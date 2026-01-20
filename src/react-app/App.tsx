import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { DramaIcon, FilmIcon, MusicIcon, ScrollTextIcon } from "lucide-react";
// src/App.tsx
import "./markdown.css"
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkAlert from 'remark-github-blockquote-alert'

import { Loading } from "./components/loading";
import { Button, ButtonGroup } from "./components/zzz-button";
import Actors from "./pages/page_actors";
import AnimatedShorts from "./pages/page_clips";
import Title from "./pages/page_cover";
import Scripts from "./pages/page_scripts";
import Songs from "./pages/page_songs";
import Init from "./pages/page-init";
import { useTheme } from "./stores/useTheme";
import remarkBreaks from 'remark-breaks'
import "./App.css";
import Wiki from "./pages/page-wiki";
import { useNavigation } from "./stores/useNavigation";

export const Test = () => {
    const [markdown, setMarkdown] = useState('')

    useEffect(() => {
        fetch('/hsr script 1.md')
            .then(res => res.text())
            .then(text => setMarkdown(text))
    }, [])

    return <section className="section-container markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks,]}
            rehypePlugins={[rehypeRaw]}
        >{markdown}</ReactMarkdown>
    </section>
}



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
    const { skipCover, page, pageId, initialize } = useNavigation();

    const [showCover, setShowCover] = useState(!skipCover);
    const [showInit, setShowInit] = useState(!skipCover);

    // Initialize navigation store
    useEffect(() => {
        const cleanup = initialize(menuItems);
        return cleanup;
    }, [initialize]);

    // Update local state when skipCover changes
    useEffect(() => {
        if (skipCover) {
            setShowInit(false);
            setShowCover(false);
        }
    }, [skipCover]);

    useEffect(() => {
        if (skipCover) {
            return;
        }

        setTimeout(() => {
            setShowInit(false);
        }, 100);
        setTimeout(() => {
            setProgress(0.233);
        }, 300);
        setTimeout(() => {
            setProgress(0.52);
        }, 1800);
        setTimeout(() => {
            setProgress(0.77);
        }, 3000);
        setTimeout(() => {
            setProgress(0.93);
        }, 4100);
        setTimeout(() => {
            setProgress(1);
        }, 12000);
        setTimeout(() => {
            setShowInit(false);
        }, 13500);
    }, [skipCover]);

    const { theme, dark } = useTheme();

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = (): void => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCoverScroll = () => {
        setShowCover(false);
    };

    return (
        <body className={clsx(theme, dark ? "dark" : "light")} style={{}}>
            <img src="/bg1.jpg" className="bg" />
            <button style={{ position: "fixed", top: "0", zIndex: 9999 }} onClick={() => setShowInit(false)}>
                sheet
            </button>
            <AnimatePresence>
                {showInit ? (
                    <Init progress={progress} />
                ) : showCover ? (
                    <Title key="cover" onScroll={handleCoverScroll} />
                ) : pageId ? (
                    <Wiki key={`${page}-${pageId}`} />
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
                                            active={page === item.id}
                                            onClick={() => useNavigation.getState().setPage(item.id)}
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
                            {menuItems.find((item) => item.id === page)?.content}
                        </motion.section>
                    </motion.section>
                )}
            </AnimatePresence>
            <Loading />
        </body>
    );
}
export default App;
