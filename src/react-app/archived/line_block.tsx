import { motion } from "framer-motion";
import React, { ElementType } from "react";

type LineBlockProps<T extends ElementType> = {
    as?: T;
    children?: React.ReactNode;
    amount?: number;
} & React.ComponentPropsWithoutRef<T>;

export default function LineBlock<T extends ElementType = "div">({
    as,
    children,
    amount = 0,
    ...props
}: LineBlockProps<T>) {
    const Component = motion(as || "div");

    return (
        <Component
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            {...props}
        >
            {children}
        </Component>
    );
}
