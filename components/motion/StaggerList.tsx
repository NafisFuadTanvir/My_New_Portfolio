"use client";

/**
 * StaggerList — wraps children with staggered reveal.
 * Parent triggers children one-by-one as a sequence.
 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
  as?: "ul" | "ol" | "div";
}

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerList({
  children,
  className,
  style,
  staggerDelay = 0.08,
  as: Tag = "div",
}: StaggerListProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "0px 0px -30px 0px",
  });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/** Wrap each child item with this for the stagger effect */
export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={shouldReduce ? itemVariantsReduced : itemVariants}
    >
      {children}
    </motion.div>
  );
}
