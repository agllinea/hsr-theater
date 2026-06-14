import { motion } from "framer-motion";
import HeaderNav, { type Tab } from "./HeaderNav";
import "./AppHeader.css";

interface AppHeaderProps {
    activeTab: Tab;
    setTab: (t: Tab) => void;
}

export function AppHeader({ activeTab, setTab }: AppHeaderProps) {
    return (
        <motion.header
            className="app-header"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <span className="app-header__title">See You Tomorrow</span>
            <HeaderNav activeTab={activeTab} setTab={setTab} />
        </motion.header>
    );
}
