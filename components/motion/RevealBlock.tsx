"use client";

/**
 * RevealBlock — fade + subtle upward reveal for content blocks
 * (paragraphs, cards, grid items). Less dramatic than RevealText.
 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface RevealBlockProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "article" | "li" | "span";
}

export function RevealBlock({
  children,
  delay = 0,
  className,
  style,
  as: Tag = "div",
}: RevealBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "0px 0px -40px 0px",
  });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
