import { AnimatePresence, motion } from "framer-motion";
import { create } from "zustand";
import WaveText from "./wave_text";
import { useTheme } from "../stores/useTheme";
import "./loading.css";

interface LoadingStore {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
}));

// Hook for components to use
export const useLoading = () => {
    const isLoading = useLoadingStore((state) => state.isLoading);
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);
    return { isLoading, setIsLoading };
};

// Loading Component
export const Loading: React.FC = () => {
    const { isLoading } = useLoading();
    const { theme } = useTheme();
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    id="loading-container"
                >
                    <div id="loading-box">
                        <img src={`/meow_${theme}.gif`} />
                        <WaveText text="LOADING..."></WaveText>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
