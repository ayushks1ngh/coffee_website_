"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PHASES = [
  {
    number: "01",
    title: "SOURCING",
    description:
      "Single-origin beans hand-selected from volcanic plateaus for unmatched clarity and depth.",
    meta: ["Altitude: 1,800m+", "Region: Volcanic Highlands", "Selection: Hand-Picked"],
  },
  {
    number: "02",
    title: "ROASTING",
    description:
      "Micro-batch drum roasting tuned to thermal precision, unlocking layered sweetness.",
    meta: ["Curve: Medium-Dark", "Batch: 12kg Micro", "Control: ±0.5°C"],
  },
  {
    number: "03",
    title: "EXTRACTION",
    description:
      "Triple-filtered pressure extraction engineered for balance, texture, and clarity.",
    meta: ["Pressure: 9 Bar", "Filter: Triple-Pass", "Ratio: 1:2.3"],
  },
];

// Micro floating particles — render once, shared across phases
function FloatingParticles() {
  const particles = [
    { size: 3, x: "15%", y: "20%", dur: 28, delay: 0 },
    { size: 2, x: "78%", y: "65%", dur: 34, delay: 4 },
    { size: 4, x: "45%", y: "80%", dur: 22, delay: 8 },
    { size: 2, x: "88%", y: "30%", dur: 38, delay: 2 },
    { size: 3, x: "25%", y: "55%", dur: 26, delay: 12 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-khaki_beige/20"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            filter: "blur(3px)",
          }}
          animate={{
            y: [0, -60, -20, -80, 0],
            opacity: [0.04, 0.08, 0.05, 0.09, 0.04],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function IngredientJourney() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.0005,
  });

  // ═══ Phase A — SOURCING: 0 → 0.40 ═══
  const aOpacity     = useTransform(smooth, [0, 0.05, 0.25, 0.40], [0, 1, 1, 0]);
  const aY           = useTransform(smooth, [0, 0.05, 0.25, 0.40], [60, 0, 0, -60]);
  const aScale       = useTransform(smooth, [0, 0.05, 0.25, 0.40], [0.96, 1, 1, 0.96]);
  const aTitleY      = useTransform(smooth, [0, 0.06, 0.25, 0.40], [30, 0, 0, -20]);
  const aDescOpacity = useTransform(smooth, [0.03, 0.10], [0, 1]);
  const aMetaOpacity = useTransform(smooth, [0.06, 0.14], [0, 1]);
  const aBigNumY     = useTransform(smooth, [0, 0.05, 0.25, 0.42], [40, 0, 0, -100]);
  // Environment parallax (moves slower than content)
  const aEnvY        = useTransform(smooth, [0, 0.40], ["0%", "8%"]);
  const aGlowOp      = useTransform(smooth, [0, 0.06, 0.28, 0.40], [0, 1, 1, 0]);
  // Side anchor
  const aAnchorOp    = useTransform(smooth, [0, 0.08, 0.25, 0.40], [0, 0.1, 0.1, 0]);

  // ═══ Phase B — ROASTING: 0.28 → 0.72 ═══
  const bOpacity     = useTransform(smooth, [0.28, 0.38, 0.58, 0.72], [0, 1, 1, 0]);
  const bY           = useTransform(smooth, [0.28, 0.38, 0.58, 0.72], [60, 0, 0, -60]);
  const bScale       = useTransform(smooth, [0.28, 0.38, 0.58, 0.72], [0.96, 1, 1, 0.96]);
  const bTitleY      = useTransform(smooth, [0.28, 0.39, 0.58, 0.72], [30, 0, 0, -20]);
  const bDescOpacity = useTransform(smooth, [0.32, 0.42], [0, 1]);
  const bMetaOpacity = useTransform(smooth, [0.35, 0.45], [0, 1]);
  const bBigNumY     = useTransform(smooth, [0.28, 0.38, 0.58, 0.74], [40, 0, 0, -100]);
  const bEnvY        = useTransform(smooth, [0.28, 0.72], ["0%", "8%"]);
  const bGlowOp      = useTransform(smooth, [0.28, 0.38, 0.60, 0.72], [0, 1, 1, 0]);
  const bAnchorOp    = useTransform(smooth, [0.28, 0.40, 0.58, 0.72], [0, 0.1, 0.1, 0]);

  // ═══ Phase C — EXTRACTION: 0.60 → 1.0 ═══
  const cOpacity     = useTransform(smooth, [0.60, 0.72, 0.92, 1.0], [0, 1, 1, 0.85]);
  const cY           = useTransform(smooth, [0.60, 0.72, 0.92, 1.0], [60, 0, 0, -10]);
  const cScale       = useTransform(smooth, [0.60, 0.72, 1.0], [0.96, 1, 1.02]);
  const cTitleY      = useTransform(smooth, [0.60, 0.73, 0.92, 1.0], [30, 0, 0, -10]);
  const cDescOpacity = useTransform(smooth, [0.65, 0.76], [0, 1]);
  const cMetaOpacity = useTransform(smooth, [0.68, 0.78], [0, 1]);
  const cBigNumY     = useTransform(smooth, [0.60, 0.72, 0.92, 1.0], [40, 0, 0, -30]);
  const cEnvY        = useTransform(smooth, [0.60, 1.0], ["0%", "8%"]);
  const cGlowOp      = useTransform(smooth, [0.60, 0.72, 0.94, 1.0], [0, 1, 1, 0.7]);
  const cAnchorOp    = useTransform(smooth, [0.60, 0.74, 0.92, 1.0], [0, 0.1, 0.1, 0.06]);

  // Global
  const bgY      = useTransform(smooth, [0, 1], [0, -80]);
  const bgRotate = useTransform(smooth, [0, 1], [0, 12]);
  const lineScaleY = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-black">

      {/* Gradient transition INTO this section */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black to-transparent z-10 pointer-events-none" />

      {/* ── Sticky Viewport ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Persistent slow atmosphere */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{
              top: "10%", right: "-10%",
              background: "radial-gradient(circle, rgba(139,116,90,0.06) 0%, transparent 65%)",
              rotate: bgRotate,
            }}
          />
          <div className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              bottom: "5%", left: "5%",
              background: "radial-gradient(circle, rgba(198,172,143,0.04) 0%, transparent 65%)",
            }}
          />
        </motion.div>

        {/* Floating particles */}
        <FloatingParticles />

        {/* Grain noise overlay */}
        <div className="grain-overlay" />

        {/* Vertical progress */}
        <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 h-[45%] w-[1px] bg-stone_brown/10">
          <motion.div
            className="absolute top-0 left-0 w-full bg-stone_brown/40 origin-top"
            style={{ scaleY: lineScaleY, height: "100%" }}
          />
        </div>

        {/* ═══════════════════════════════════════
             Phase A — SOURCING
        ═══════════════════════════════════════ */}

        {/* A: Environment layer (moves slower) */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ y: aEnvY, opacity: aGlowOp }}
        >
          {/* Amber volcanic glow — top right */}
          <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(ellipse at 40% 40%, rgba(139,116,90,0.08) 0%, rgba(139,116,90,0.03) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          {/* Vignette light bloom — center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,116,90,0.05) 0%, transparent 60%)",
            }}
          />
        </motion.div>

        {/* A: Side visual anchor — left cluster */}
        <motion.div
          className="absolute left-[4%] top-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{ opacity: aAnchorOp }}
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-stone_brown/30 blur-sm" />
            <div className="w-5 h-5 rounded-full bg-stone_brown/20 blur-sm" />
            <div className="w-10 h-10 rounded-full bg-stone_brown/25 blur-md" />
            <div className="w-4 h-4 rounded-full bg-khaki_beige/15 blur-sm" />
            <div className="w-7 h-7 rounded-full bg-stone_brown/20 blur-sm" />
          </div>
        </motion.div>

        {/* A: Content */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 z-[5]"
          style={{ opacity: aOpacity, y: aY, scale: aScale }}
        >
          <motion.span
            className="absolute text-[20vw] font-bold text-stone_brown pointer-events-none select-none leading-none opacity-[0.05]"
            style={{ y: aBigNumY }}
          >
            01
          </motion.span>

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <motion.h3
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-almond_cream/90 mb-5 leading-[1.05]"
              style={{ y: aTitleY, textShadow: "0 2px 25px rgba(0,0,0,0.5)" }}
            >
              {PHASES[0].title}
            </motion.h3>
            <motion.p
              className="text-base md:text-lg text-almond_cream/60 font-light leading-relaxed max-w-lg mb-8"
              style={{ opacity: aDescOpacity, textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
            >
              {PHASES[0].description}
            </motion.p>
            <motion.div className="w-12 h-[1px] bg-stone_brown/40 mb-5" style={{ opacity: aMetaOpacity }} />
            <motion.div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start" style={{ opacity: aMetaOpacity }}>
              {PHASES[0].meta.map((m, i) => (
                <span key={i} className="text-[11px] tracking-[0.3em] uppercase text-khaki_beige/60 font-light">{m}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════
             Phase B — ROASTING
        ═══════════════════════════════════════ */}

        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ y: bEnvY, opacity: bGlowOp }}
        >
          {/* Thermal heat bloom — bottom left */}
          <div className="absolute bottom-[8%] left-[8%] w-[450px] h-[550px] rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(198,172,143,0.07) 0%, rgba(139,116,90,0.03) 40%, transparent 65%)",
              filter: "blur(55px)",
            }}
          />
          {/* Warm center bloom */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
            style={{
              background: "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(198,172,143,0.04) 0%, transparent 55%)",
            }}
          />
        </motion.div>

        {/* B: Side anchor — right cluster */}
        <motion.div
          className="absolute right-[4%] top-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{ opacity: bAnchorOp }}
        >
          <div className="flex flex-col gap-5 items-center">
            <div className="w-6 h-6 rounded-full bg-khaki_beige/20 blur-sm" />
            <div className="w-10 h-10 rounded-full bg-stone_brown/25 blur-md" />
            <div className="w-4 h-4 rounded-full bg-stone_brown/15 blur-sm" />
            <div className="w-8 h-8 rounded-full bg-khaki_beige/15 blur-sm" />
            <div className="w-5 h-5 rounded-full bg-stone_brown/20 blur-sm" />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 z-[5]"
          style={{ opacity: bOpacity, y: bY, scale: bScale }}
        >
          <motion.span
            className="absolute text-[20vw] font-bold text-stone_brown pointer-events-none select-none leading-none opacity-[0.05]"
            style={{ y: bBigNumY }}
          >
            02
          </motion.span>

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <motion.h3
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-almond_cream/90 mb-5"
              style={{ y: bTitleY, textShadow: "0 2px 25px rgba(0,0,0,0.5)" }}
            >
              {PHASES[1].title}
            </motion.h3>
            <motion.p
              className="text-base md:text-lg text-almond_cream/60 font-light leading-relaxed max-w-lg mb-8"
              style={{ opacity: bDescOpacity, textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
            >
              {PHASES[1].description}
            </motion.p>
            <motion.div className="w-12 h-[1px] bg-stone_brown/40 mb-5" style={{ opacity: bMetaOpacity }} />
            <motion.div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start" style={{ opacity: bMetaOpacity }}>
              {PHASES[1].meta.map((m, i) => (
                <span key={i} className="text-[11px] tracking-[0.3em] uppercase text-khaki_beige/60 font-light">{m}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════
             Phase C — EXTRACTION
        ═══════════════════════════════════════ */}

        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ y: cEnvY, opacity: cGlowOp }}
        >
          {/* Cool extraction mist — top right */}
          <div className="absolute top-[15%] right-[5%] w-[500px] h-[400px]"
            style={{
              background: "radial-gradient(ellipse at 60% 45%, rgba(234,224,213,0.06) 0%, rgba(198,172,143,0.02) 45%, transparent 70%)",
              filter: "blur(50px)",
              borderRadius: "40%",
            }}
          />
          {/* Center clarity glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]"
            style={{
              background: "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(234,224,213,0.04) 0%, transparent 55%)",
            }}
          />
        </motion.div>

        {/* C: Side anchor — left cluster */}
        <motion.div
          className="absolute left-[5%] top-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{ opacity: cAnchorOp }}
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="w-6 h-6 rounded-full bg-almond_cream/10 blur-sm" />
            <div className="w-9 h-9 rounded-full bg-stone_brown/20 blur-md" />
            <div className="w-4 h-4 rounded-full bg-khaki_beige/15 blur-sm" />
            <div className="w-7 h-7 rounded-full bg-almond_cream/8 blur-sm" />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 z-[5]"
          style={{ opacity: cOpacity, y: cY, scale: cScale }}
        >
          <motion.span
            className="absolute text-[20vw] font-bold text-stone_brown pointer-events-none select-none leading-none opacity-[0.05]"
            style={{ y: cBigNumY }}
          >
            03
          </motion.span>

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <motion.h3
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-almond_cream/90 mb-5"
              style={{ y: cTitleY, textShadow: "0 2px 25px rgba(0,0,0,0.5)" }}
            >
              {PHASES[2].title}
            </motion.h3>
            <motion.p
              className="text-base md:text-lg text-almond_cream/60 font-light leading-relaxed max-w-lg mb-8"
              style={{ opacity: cDescOpacity, textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
            >
              {PHASES[2].description}
            </motion.p>
            <motion.div className="w-12 h-[1px] bg-stone_brown/40 mb-5" style={{ opacity: cMetaOpacity }} />
            <motion.div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start" style={{ opacity: cMetaOpacity }}>
              {PHASES[2].meta.map((m, i) => (
                <span key={i} className="text-[11px] tracking-[0.3em] uppercase text-khaki_beige/60 font-light">{m}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Gradient transition OUT of this section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black to-transparent z-10 pointer-events-none" />

    </section>
  );
}
