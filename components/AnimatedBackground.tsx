"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedBackground — floating glowing orbs rendered on a canvas.
 * Fixed full-screen, behind all content (z-index: -1).
 * Respects prefers-reduced-motion (stops animation on low-motion preference).
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Orb definition
    interface Orb {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      color: string;
      alpha: number;
      alphaDir: number;
    }

    const ORBS: Orb[] = [
      // Vermilion — top right area
      { x: canvas.width * 0.7, y: canvas.height * 0.15, vx: 0.18, vy: 0.12, radius: 340, color: "255,90,43",   alpha: 0.07, alphaDir: 1 },
      // Amber — mid left
      { x: canvas.width * 0.15, y: canvas.height * 0.55, vx: -0.14, vy: 0.09, radius: 260, color: "245,166,35", alpha: 0.05, alphaDir: -1 },
      // Deep teal — bottom right
      { x: canvas.width * 0.8, y: canvas.height * 0.8, vx: -0.10, vy: -0.14, radius: 200, color: "56,189,248",  alpha: 0.03, alphaDir: 1 },
      // Warm rose — center
      { x: canvas.width * 0.45, y: canvas.height * 0.4, vx: 0.07, vy: -0.11, radius: 180, color: "220,80,100",  alpha: 0.04, alphaDir: -1 },
    ];

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const orb of ORBS) {
        // Drift
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges (with radius padding)
        if (orb.x < -orb.radius)     orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius)  orb.x = -orb.radius;
        if (orb.y < -orb.radius)     orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Pulse alpha
        orb.alpha += orb.alphaDir * 0.0003;
        if (orb.alpha > 0.11 || orb.alpha < 0.02) orb.alphaDir *= -1;

        // Draw radial gradient
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0,   `rgba(${orb.color},${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(${orb.color},${orb.alpha * 0.4})`);
        grad.addColorStop(1,   `rgba(${orb.color},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}
