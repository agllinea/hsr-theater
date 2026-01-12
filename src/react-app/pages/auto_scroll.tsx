import React, { ElementType, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

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

  const isInView = useInView(ref, { amount,margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isInView]);

  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
}
