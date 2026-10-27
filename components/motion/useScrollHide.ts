"use client";

/**
 * useScrollHide — hides nav on scroll-down, reveals on scroll-up.
 * Returns { hidden: boolean } — apply translateY(-100%) when hidden.
 */

import { useEffect, useRef, useState } from "react";

export function useScrollHide(threshold = 8) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) < threshold) return;

      // Always show nav at top of page
      if (y < 80) {
        setHidden(false);
      } else {
        setHidden(y > lastY.current);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { hidden };
}
