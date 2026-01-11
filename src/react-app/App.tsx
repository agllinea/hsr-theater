import viteLogo from "/vite.svg";
// src/App.tsx

import { useEffect, useState } from "react";

import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import reactLogo from "./assets/react.svg";
import Loading from "./pages/Loading";

import "./App.css";
import { useTheme } from "./stores/useTheme";
import clsx from "clsx";
import Main from "./pages/main";

function App() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("unknown");
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
    const { theme, dark, setDarkPreference } = useTheme();

    return (
        <body className={clsx(theme, dark ? "dark" : "light")}>
            {/* {progress < 1 && <Loading progress={progress} />}
            {progress >= 1 && <Main />} */}
            <Main />
        </body>
    );
}

export default App;
