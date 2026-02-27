"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * ThemeTransition – a cinematic multi-step gradient bridge
 * between the dark zone and the light zone.
 * Uses jet_black → stone_brown → khaki_beige → almond_cream
 * with a breathing warm glow at the midpoint.
 */

// ── Mount Gate ──
export default function ThemeTransition() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ThemeTransitionInner />;
}

// ── Inner Component (client-only, all hooks unconditional) ──
function ThemeTransitionInner() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.3,
  });

  // Warm midpoint glow breathes during scroll
  const glowOpacity = useTransform(smooth, [0.15, 0.45, 0.75], [0, 0.6, 0]);
  const glowScale = useTransform(smooth, [0.15, 0.45, 0.75], [0.8, 1.1, 0.8]);

  // Secondary warm pulse — deeper in the transition
  const deepGlowOpacity = useTransform(
    smooth,
    [0.3, 0.55, 0.8],
    [0, 0.35, 0]
  );

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "80vh" }}
      aria-hidden="true"
    >
      {/* Multi-step gradient: jet_black → stone_brown → khaki_beige → almond_cream */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #0a0908 0%,
            #0e0c0a 6%,
            #141210 12%,
            #1e1a16 20%,
            #2c2520 28%,
            #3d342c 35%,
            #5e503f 44%,
            #7a694f 52%,
            #8b745a 58%,
            #a08b76 64%,
            #b49e87 70%,
            #c6ac8f 76%,
            #d4c4b3 82%,
            #dbd0c1 88%,
            #decfbe 94%,
            #e2d6c6 100%
          )`,
        }}
      />

      {/* Midpoint warmth glow — warm stone_brown breath */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: glowOpacity, scale: glowScale }}
      >
        <div
          className="w-[800px] h-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(198,172,143,0.3) 0%, rgba(139,116,90,0.1) 40%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
      </motion.div>

      {/* Deep warm glow — stone_brown accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: deepGlowOpacity }}
      >
        <div
          className="absolute w-[500px] h-[250px] rounded-full"
          style={{
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(94,80,63,0.2) 0%, transparent 55%)",
            filter: "blur(50px)",
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
