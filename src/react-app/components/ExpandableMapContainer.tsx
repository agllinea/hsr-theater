import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLoading } from "./loading";

interface ExpandableMapContainerProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}

interface ExpandableMapItemProps<T> {
    item: T;
    index: number;
    nInView: number;
    setNInView: React.Dispatch<React.SetStateAction<number>>;
    renderItem: (item: T, index: number) => React.ReactNode;
}

const ExpandableMapItem = ({ item, index, nInView, setNInView, renderItem }: ExpandableMapItemProps<any>) => {
    const itemRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { amount: 0.3, once: true });

    useEffect(() => {
        if (isInView) {
            setNInView((n) => n + 1);
        }
    }, [isInView]);

    return (
        <motion.div
            key={item.title}
            ref={itemRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: (index - nInView) * 0.1,
            }}
        >
            {renderItem(item, index)}
        </motion.div>
    );
};

ExpandableMapItem.displayName = "ExpandableMapItem";

export const ExpandableMapContainer = React.forwardRef<HTMLDivElement, ExpandableMapContainerProps<any>>(
    ({ items, renderItem, className = "section-container", children }, ref) => {
        const [nInView, setNInView] = useState<number>(0);
        const [nothing, setNothing] = useState<boolean>(false);
        const { setIsLoading } = useLoading();
        useEffect(() => {
            setNothing(true);
            setNInView(0);
            setIsLoading(true);
            const timeout = setTimeout(() => {
                setNothing(false);
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timeout);
        }, [items]);
        return nothing ? (
            <></>
        ) : (
            <section className={className} ref={ref}>
                {items.map((item, index) => (
                    <ExpandableMapItem
                        key={item.title}
                        item={item}
                        index={index}
                        nInView={nInView}
                        setNInView={setNInView}
                        renderItem={renderItem}
                    />
                ))}
                {children}
            </section>
        );
    },
);

ExpandableMapContainer.displayName = "ExpandableMapContainer";
