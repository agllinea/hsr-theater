import { motion } from "framer-motion";

import type { ReactNode } from "react";
import type { ReactElement } from "react";
import React from "react";
import "./zzz-button.css";

const iconSizes = {
    sm: "icon-sm",
    md: "icon-md",
    lg: "icon-lg"
};

export const Button: React.FC<{
    onClick?: () => void;
    icon: ReactNode;
    children?: ReactNode;
    title?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
    isMobile?: boolean;
    disabled?: boolean;
    active?: boolean;
}> = ({ onClick, icon, children, className = "", size = "md", disabled = false, isMobile = false, active = false }) => {
    return (
        <motion.span
            onClick={onClick}
            // disabled={disabled}
            className={`zzz-button ${isMobile ? "mobile" : ""} ${active ? "active" : ""} ${className}`}
        >
            <motion.span
                className="zzz-button-bg-wrap"
                initial={{ scale: 1, opacity: 0 }}
                animate={
                    active
                        ? {
                            scale: [1.15, 1.2, 1.15],
                            opacity: [1, 1, 1],
                        }
                        : {
                            opacity: 0,
                        }
                }
                transition={{
                    duration: active ? 2 : 0.2,
                    repeat: active ? Infinity : 0,
                    ease: "easeInOut",
                }}
            >
                <motion.span className="zzz-button-bg">
                    <motion.span className="zzz-button-bg-inner" />
                </motion.span>
            </motion.span>

            <div className="zzz-button-content">
                {isMobile ? (
                    <span className={`zzz-button-icon ${iconSizes[size]}`}>{icon}</span>
                ) : (
                    <>{icon}{children}</>
                )}
            </div>
        </motion.span>
    );
};

type ButtonElement = ReactElement<React.ComponentProps<typeof Button>, typeof Button>;

export const ButtonGroup: React.FC<{
    children: ButtonElement | ButtonElement[];
    className?: string;
}> = ({ children, className = "" }) => {
    const filteredChildren = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Button
    );
    return <div className={`zzz-button-group ${className}`}>{filteredChildren}</div>;
};