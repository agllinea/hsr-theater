import { useState } from "react";
import clsx from "clsx";
import { legends } from "../assets/actors";
import "./Legends.css";

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
            className={clsx("legend-item", currentLegend === legend.code ? "active" : "")}
            onClick={() => handleLegendClick(legend.code)}
          >
            <span className={clsx("legend-block", legend.code)}></span>
            <span className="legend-code">{legend.code}</span>
            <span className="legend-label">{legend.label}</span>
          </div>
        ))}
      </div>
      <div className="legend-detail-container">
        <div
          className="legend-detail"
          dangerouslySetInnerHTML={{
            __html:
              (currentLegend &&
                legends.find((l) => l.code === currentLegend)?.description) ??
              "",
          }}
        ></div>
      </div>
    </div>
  );
};
