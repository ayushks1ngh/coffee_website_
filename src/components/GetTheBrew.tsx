"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function GetTheBrew() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#eae0d5" }}
    >
      {/* Subtle warm radial depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(198,172,143,0.15) 0%, transparent 65%)",
        }}
      />

      {/* Grain overlay — light variant */}
      <div className="grain-overlay-light" />

      {/* Content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={contentInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Micro label */}
        <motion.span
          className="text-[10px] tracking-[0.5em] uppercase mb-8 block"
          style={{ color: "rgba(90,70,50,0.5)" }}
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Limited Allocation
        </motion.span>

        {/* Headline */}
        <h2
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[1] mb-8"
          style={{
            color: "#0a0908",
            textShadow: "0 1px 20px rgba(0,0,0,0.05)",
          }}
        >
          GET THE
          <br />
          <span style={{ color: "rgba(139,116,90,0.7)" }}>BREW</span>
        </h2>

        {/* Supporting text */}
        <motion.p
          className="text-sm md:text-base font-light tracking-wide mb-12"
          style={{ color: "rgba(90,70,50,0.6)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Weekly allocations · Fresh roasted · Global shipping
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/menu">
            <motion.button
              className="bg-[#0a0908] text-almond_cream px-10 py-4 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer relative z-20"
              whileHover={{ scale: 1.03, filter: "brightness(1.15)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Discover the Menu
            </motion.button>
          </Link>
        </motion.div>

        {/* Reassurance */}
        <motion.p
          className="text-xs font-light tracking-wide mt-8"
          style={{ color: "rgba(90,70,50,0.4)" }}
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Roasted to order. Dispatched within 24 hours.
        </motion.p>
      </motion.div>
    </section>
  );
}
