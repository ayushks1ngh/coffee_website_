"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ThemeTransition – a smooth visual bridge between the dark cinematic zone
 * and the light purchasing zone. Renders a 60vh tall gradient blend
 * from jet-black → almond-cream with a subtle midpoint glow.
 */
export default function ThemeTransition() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Warm midpoint glow breathes during scroll
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.6, 0]);
  const glowScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.8, 1, 0.8]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "60vh" }}
      aria-hidden="true"
    >
      {/* Primary gradient: dark → light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0908 0%, #1a1612 18%, #3a3028 35%, #6b5d50 48%, #a08b76 58%, #c6ac8f 70%, #ddd1c4 82%, #eae0d5 100%)",
        }}
      />

      {/* Midpoint warmth glow — prevents a flat gradient feel */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: glowOpacity, scale: glowScale }}
      >
        <div
          className="w-[700px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(198,172,143,0.25) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Grain — transitions from overlay to multiply at midpoint */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          opacity: 0.035,
          mixBlendMode: "soft-light",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
