import { useInView } from "framer-motion";
import React, { ElementType, useEffect, useRef } from "react";

type AutoScrollProps<T extends ElementType> = {
    as?: T;
    children?: React.ReactNode;
    amount?: number;
} & React.ComponentPropsWithoutRef<T>;

export function AutoScroll<T extends ElementType = "section">({
    as,
    children,
    amount = 0,
    ...props
}: AutoScrollProps<T>) {
    const Component = as || "section";
    const ref = useRef<HTMLElement | null>(null);

    const isInView = useInView(ref, { amount, margin: "-100px" });

    useEffect(() => {
        if (isInView && ref.current) {
            //     console.log("AutoScroll: Scrolling into view", ref.current);
            //   ref.current.scrollIntoView({
            //     behavior: "smooth",
            //     block: "start",
            //   });
            const elementTop = ref.current.getBoundingClientRect().top;
            const offset = 0; // px below the top
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            window.scrollTo({
                top: scrollTop + elementTop - offset,
                behavior: "smooth", // or "instant"
            });
        }
    }, [isInView]);

    return (
        <Component ref={ref} {...props}>
            {children}
        </Component>
    );
}
