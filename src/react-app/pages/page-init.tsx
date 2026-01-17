import { motion } from "framer-motion";
import ElementsIcon from "../components/ElementsIcon";
import WaveText from "../components/wave_text";
import { useTheme } from "../stores/useTheme";

export default function Init({ progress = 0.5 }: { progress: number }) {
    const { theme } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="page loading-container text-default"
        >
            <span className="progress">
                <ElementsIcon progress={progress} />
            </span>
        </motion.div>
    );
}
