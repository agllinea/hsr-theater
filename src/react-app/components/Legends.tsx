import { useState } from "react";
import clsx from "clsx";
import { legends } from "../assets/actors";
import "./Legends.css";
import { AnimatePresence, motion } from "framer-motion";

export const Legends = () => {
  const [currentLegend, setCurrentLegend] = useState<string | null>(null);
  const handleLegendClick = (code: string) => {
    if (currentLegend === code) {
      setCurrentLegend(null);
    } else {
      setCurrentLegend(code);
    }
  };
  return (
    <div className="legend-container">
      <div className="legend-lables">
        {legends.map((legend, index) => (
          <div
            key={index}
            className={clsx(
              "legend-item",
              currentLegend === legend.code ? "active" : ""
            )}
            onMouseEnter={() => setCurrentLegend(legend.code)}
            onMouseLeave={()=>setCurrentLegend(null)}
          >
            <span className={clsx("legend-block", legend.code)}></span>
            <span className="legend-code">{legend.code}</span>
            <span className="legend-label">{legend.label}</span>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {currentLegend && (
          <motion.div className="legend-detail-container"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <div
              className="legend-detail"
              dangerouslySetInnerHTML={{
                __html:
                  (currentLegend &&
                    legends.find((l) => l.code === currentLegend)?.description) ??
                  "",
              }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
