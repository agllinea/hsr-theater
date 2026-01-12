// src/App.tsx

import { useEffect, useState } from "react";


import "./App.css";
import { useTheme } from "./stores/useTheme";
import clsx from "clsx";
import Main from "./pages/main";

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

    return (
        <body className={clsx(theme, dark ? "dark" : "light")}>
            {/* {progress < 1 && <Loading progress={progress} />}
            {progress >= 1 && <Main />} */}
            <Main />
        </body>
    );
}

export default App;
