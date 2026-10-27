"use client";

/**
 * RevealText — mask-up reveal for headings and display text.
 * Wraps children in a clip container; on enter, the inner span
 * slides up from translateY(100%) to 0.
 * Respects prefers-reduced-motion — renders instantly if set.
 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface RevealTextProps {
  children: React.ReactNode;
  /** Delay before the animation starts, in seconds */
  delay?: number;
  /** Which HTML element to use for the outer clip wrapper */
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "li";
  className?: string;
  style?: React.CSSProperties;
}

export function RevealText({
  children,
  delay = 0,
  className,
  style,
}: RevealTextProps) {
  // Always use a div as the outer clip container — keeps ref types simple.
  // The `as` prop is kept in the interface for future use / docs.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -60px 0px",
  });
  const shouldReduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", display: "block", ...style }}
    >
      <motion.span
        style={{ display: "block" }}
        initial={shouldReduce ? false : { y: "105%", opacity: 0 }}
        animate={
          inView
            ? { y: "0%", opacity: 1 }
            : shouldReduce
            ? { y: "0%", opacity: 1 }
            : { y: "105%", opacity: 0 }
        }
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        {children}
      </motion.span>
    </div>
  );
}
