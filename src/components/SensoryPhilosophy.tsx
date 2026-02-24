"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SensoryPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: content drifts upward as user scrolls through
  const contentY = useTransform(scrollYProgress, [0, 0.5], [60, -20]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.6]);

  // Staggered label animation
  const labelOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.05, 0.2], [20, 0]);

  // Hero statement — slightly delayed entrance
  const heroOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  // Supporting copy — enters last
  const copyOpacity = useTransform(scrollYProgress, [0.18, 0.38], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.18, 0.38], [30, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Atmospheric radial gradient — barely visible depth layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(139,116,90,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Grain noise overlay */}
      <div className="grain-overlay" />

      {/* Content container with scroll-linked motion */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Micro Label */}
        <motion.span
          className="text-xs tracking-[0.4em] uppercase text-khaki_beige/60 mb-8 block"
          style={{ opacity: labelOpacity, y: labelY }}
        >
          The Philosophy
        </motion.span>

        {/* Hero Statement */}
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-almond_cream/90 leading-[1.05] mb-10"
          style={{
            opacity: heroOpacity,
            y: heroY,
            textShadow: "0 2px 30px rgba(0,0,0,0.5)",
          }}
        >
          Not Just Coffee.
          <br />
          <span className="text-khaki_beige/80">A Controlled Sensory</span>
          <br />
          Experience.
        </motion.h2>

        {/* Divider — subtle stone_brown line */}
        <motion.div
          className="w-16 h-[1px] bg-stone_brown/40 mb-10"
          style={{ opacity: copyOpacity }}
        />

        {/* Supporting Copy */}
        <motion.p
          className="text-base md:text-lg text-almond_cream/60 font-light leading-relaxed max-w-xl"
          style={{
            opacity: copyOpacity,
            y: copyY,
            textShadow: "0 1px 10px rgba(0,0,0,0.4)",
          }}
        >
          Every element is measured.
          <br />
          Every variable refined.
          <br />
          Every sip engineered for balance, clarity, and indulgence.
        </motion.p>
      </motion.div>
    </section>
  );
}
