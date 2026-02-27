"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CARDS = [
  {
    num: "01",
    title: "18 Hour Cold Extraction",
    desc: "Slow steeping eliminates acidity while preserving structural sweetness. Every molecule given time to settle into its natural position.",
  },
  {
    num: "02",
    title: "Thermal Roast Control",
    desc: "Micro-batch roasting calibrated to flavor stability. Exact thermal curves unlock layered sweetness without charring complexity.",
  },
  {
    num: "03",
    title: "Pressure Balanced Pull",
    desc: "9-bar extraction engineered for texture consistency. Water meets resistance at the exact threshold of silk.",
  },
];

export default function SystemOfPrecision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-12%" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Ambient glow — asymmetric, upper-left bias */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[500px] rounded-full"
          style={{
            top: "5%",
            left: "-5%",
            background: "radial-gradient(ellipse at 50% 50%, rgba(139,116,90,0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            bottom: "10%",
            right: "5%",
            background: "radial-gradient(circle, rgba(198,172,143,0.03) 0%, transparent 55%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* ── Header Row: asymmetric split ── */}
      <motion.div
        ref={headingRef}
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16 mb-12">
          {/* Left: Label + Heading */}
          <div className="flex-1">
            <span className="text-[10px] tracking-[0.5em] uppercase text-stone_brown/60 block mb-6">
              System 01
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight leading-[1.05]">
              <span className="text-almond_cream/90 block">THE SYSTEM</span>
              <span className="text-khaki_beige/60 block">OF PRECISION</span>
            </h2>
          </div>

          {/* Right: Micro text */}
          <div className="md:text-right md:pt-14 flex-shrink-0">
            <div className="flex md:flex-col gap-4 md:gap-3 text-[10px] tracking-[0.35em] uppercase text-stone_brown/50">
              <span>Precision</span>
              <span className="text-stone_brown/20 hidden md:inline">/</span>
              <span className="text-stone_brown/20 md:hidden">/</span>
              <span>Clarity</span>
              <span className="text-stone_brown/20 hidden md:inline">/</span>
              <span className="text-stone_brown/20 md:hidden">/</span>
              <span>Depth</span>
            </div>
          </div>
        </div>

        {/* Divider — partial width */}
        <motion.div
          className="h-[1px] bg-stone_brown/20 mb-20 md:mb-28"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left", maxWidth: "70%" }}
        />
      </motion.div>

      {/* ── Cards Grid ── */}
      <div ref={cardsRef} className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              className="group relative rounded-2xl p-8 md:p-10 cursor-default transition-all duration-500"
              style={{
                background: "rgba(234,224,213,0.02)",
                border: "1px solid rgba(139,116,90,0.08)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 * idx,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(139,116,90,0.08) 0%, transparent 70%)",
                  border: "1px solid rgba(198,172,143,0.12)",
                  borderRadius: "1rem",
                }}
              />

              {/* Card number */}
              <span className="text-[10px] tracking-[0.4em] uppercase text-stone_brown/40 block mb-6">
                {card.num}
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-light tracking-tight text-almond_cream/85 mb-4 leading-[1.2]">
                {card.title}
              </h3>

              {/* Divider */}
              <div className="w-8 h-[1px] bg-stone_brown/30 mb-5 group-hover:w-12 transition-all duration-500" />

              {/* Description */}
              <p className="text-sm text-almond_cream/50 font-light leading-[1.7] group-hover:text-almond_cream/60 transition-colors duration-500">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient — easing into warm transition zone */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to top, #0a0908 0%, #0d0b09 30%, #12100e 50%, rgba(5,5,5,0.6) 75%, transparent 100%)",
        }}
      />
    </section>
  );
}
