"use client";

/**
 * useMagnet — subtle magnetic effect for primary CTA buttons (desktop only).
 * On mouse-move within the element, shifts position by ≤8px.
 * Resets smoothly on mouse-leave.
 */

import { useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

export function useMagnet(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (shouldReduce || !ref.current) return;

      // Touch / non-pointer events: skip
      if (window.matchMedia("(hover: none)").matches) return;

      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
      ref.current.style.transition = "transform 0.15s ease";
    },
    [shouldReduce, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
    ref.current.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
