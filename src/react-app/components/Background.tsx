import { motion, AnimatePresence } from "framer-motion";
import { useBackground } from "../hooks/useBackground";
import "./Background.css";

export function Background() {
    const src = useBackground((s) => s.src);

    return (
        <div className="background">
            <AnimatePresence>
                {src && (
                    <motion.div
                        key={src}
                        className="background__image"
                        style={{ backgroundImage: `url(${src})` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                )}
            </AnimatePresence>
            <div className="background__backdrop" />
        </div>
    );
}
