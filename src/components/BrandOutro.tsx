"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Footer from "@/components/Footer";

// ── Floating particles (light theme variant) ──
function OutroParticles() {
  const dots = [
    { x: "18%", y: "22%", s: 3, dur: 32, delay: 0 },
    { x: "75%", y: "55%", s: 2, dur: 28, delay: 4 },
    { x: "45%", y: "78%", s: 3, dur: 36, delay: 2 },
    { x: "88%", y: "30%", s: 2, dur: 24, delay: 8 },
    { x: "30%", y: "60%", s: 2, dur: 30, delay: 6 },
    { x: "60%", y: "15%", s: 3, dur: 34, delay: 10 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-stone_brown"
          style={{ width: d.s, height: d.s, left: d.x, top: d.y, filter: "blur(2px)", opacity: 0.06 }}
          animate={{ y: [0, -35, -10, -50, 0], opacity: [0.04, 0.07, 0.05, 0.08, 0.04] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "linear", delay: d.delay }}
        />
      ))}
    </div>
  );
}

export default function BrandOutro() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const quoteInView = useInView(quoteRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Divider width animation
  const dividerWidth = useTransform(smooth, [0.2, 0.5], [0, 96]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#e2d6c6" }}
      >
        {/* ── Layer 1: Subtle warm depth ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at 50% 45%, rgba(198,172,143,0.12) 0%, transparent 60%)",
          }}
        />

        {/* ── Layer 2: Ambient spotlight glow ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
          <div
            className="w-[600px] h-[400px] md:w-[800px] md:h-[500px] rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(94,80,63,0.05) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* ── Layer 3: Grain noise overlay (light variant) ── */}
        <div className="grain-overlay-light" />

        {/* ── Background brand text ── */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="text-[18vw] font-bold tracking-tight whitespace-nowrap"
            style={{ color: "rgba(94,80,63,0.04)" }}
          >
            COFFEE CRAVE
          </span>
        </div>

        {/* Floating particles */}
        <OutroParticles />

        {/* ── Quote content ── */}
        <motion.div
          ref={quoteRef}
          className="relative z-10 max-w-3xl mx-auto text-center px-6"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={quoteInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Opening quote mark */}
          <motion.span
            className="block text-6xl md:text-7xl font-serif leading-none mb-6 select-none"
            style={{ color: "rgba(94,80,63,0.3)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            &ldquo;
          </motion.span>

          {/* Quote text */}
          <p
            className="font-light italic leading-[1.3] tracking-tight"
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              color: "rgba(10,9,8,0.85)",
              textShadow: "0 1px 15px rgba(0,0,0,0.03)",
            }}
          >
            The most precisely engineered iced latte experience we&apos;ve ever tasted.
            It ruins standard coffee forever.
          </p>

          {/* Animated divider */}
          <div className="flex justify-center mt-12">
            <motion.div
              className="h-[1px] bg-stone_brown/40"
              style={{ width: dividerWidth }}
            />
          </div>

          {/* Attribution */}
          <motion.span
            className="block mt-10 text-xs uppercase tracking-[0.35em]"
            style={{ color: "rgba(139,116,90,0.6)" }}
            initial={{ opacity: 0, y: 15 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            &mdash; Modern Barista Magazine
          </motion.span>
        </motion.div>
      </section>

      {/* ── Shared Footer ── */}
      <Footer theme="light" />
    </>
  );
}
