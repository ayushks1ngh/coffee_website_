"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ── Floating coffee bean shapes (pure CSS, no images) ──
function CoffeeBeans({ opacity, y }: { opacity: any; y: any }) {
  const beans = [
    { x: "22%", top: "18%", size: 28, rot: 35, delay: 0 },
    { x: "68%", top: "25%", size: 22, rot: -20, delay: 2 },
    { x: "40%", top: "60%", size: 32, rot: 55, delay: 4 },
    { x: "75%", top: "55%", size: 18, rot: -45, delay: 1 },
    { x: "30%", top: "40%", size: 24, rot: 15, delay: 3 },
    { x: "58%", top: "72%", size: 20, rot: -65, delay: 5 },
    { x: "15%", top: "65%", size: 16, rot: 70, delay: 2.5 },
    { x: "85%", top: "38%", size: 14, rot: -30, delay: 4.5 },
  ];

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity, y }}>
      {beans.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[50%]"
          style={{
            left: b.x,
            top: b.top,
            width: b.size,
            height: b.size * 1.4,
            background: `radial-gradient(ellipse at 35% 30%, rgba(139,116,90,0.5) 0%, rgba(90,70,50,0.8) 50%, rgba(40,30,20,0.9) 100%)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            rotate: b.rot,
            boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.5), inset 1px 1px 3px rgba(200,170,130,0.15)",
          }}
          animate={{
            y: [0, -15, 5, -20, 0],
            rotate: [b.rot, b.rot + 8, b.rot - 5, b.rot + 12, b.rot],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}
    </motion.div>
  );
}

// ── Ambient particles ──
function BrewParticles() {
  const dots = [
    { x: "10%", y: "30%", s: 2, dur: 28 },
    { x: "80%", y: "50%", s: 3, dur: 34 },
    { x: "50%", y: "80%", s: 2, dur: 22 },
    { x: "35%", y: "20%", s: 3, dur: 30 },
    { x: "90%", y: "70%", s: 2, dur: 26 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-khaki_beige"
          style={{ width: d.s, height: d.s, left: d.x, top: d.y, filter: "blur(2px)", opacity: 0.04 }}
          animate={{ y: [0, -40, -10, -55, 0], opacity: [0.03, 0.07, 0.04, 0.08, 0.03] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "linear", delay: i * 3 }}
        />
      ))}
    </div>
  );
}

export default function BrewingExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.0005 });

  // ═══════════════════════════════════════
  // STAGE 1 — BEAN ORIGIN: 0 → 0.25
  // ═══════════════════════════════════════
  const s1Op      = useTransform(smooth, [0, 0.04, 0.18, 0.25], [0, 1, 1, 0]);
  const s1TextY   = useTransform(smooth, [0, 0.04, 0.18, 0.25], [40, 0, 0, -40]);
  const s1BeansOp = useTransform(smooth, [0, 0.04, 0.20, 0.25], [0, 0.7, 0.7, 0]);
  const s1BeansY  = useTransform(smooth, [0, 0.25], [0, -30]);

  // ═══════════════════════════════════════
  // STAGE 2 — EXTRACTION: 0.22 → 0.50
  // ═══════════════════════════════════════
  const s2Op      = useTransform(smooth, [0.22, 0.30, 0.42, 0.50], [0, 1, 1, 0]);
  const s2TextY   = useTransform(smooth, [0.22, 0.30, 0.42, 0.50], [40, 0, 0, -40]);
  const s2FlowH   = useTransform(smooth, [0.22, 0.35], ["0%", "70%"]);
  const s2FlowOp  = useTransform(smooth, [0.22, 0.30, 0.44, 0.50], [0, 0.8, 0.8, 0]);
  const s2GlowOp  = useTransform(smooth, [0.25, 0.35, 0.44, 0.50], [0, 0.6, 0.6, 0]);
  const s2GlowS   = useTransform(smooth, [0.25, 0.40], [0.6, 1.2]);

  // ═══════════════════════════════════════
  // STAGE 3 — INFUSION: 0.47 → 0.75
  // ═══════════════════════════════════════
  const s3Op      = useTransform(smooth, [0.47, 0.55, 0.67, 0.75], [0, 1, 1, 0]);
  const s3TextY   = useTransform(smooth, [0.47, 0.55, 0.67, 0.75], [40, 0, 0, -40]);
  const s3SwirlRot = useTransform(smooth, [0.47, 0.75], [0, 180]);
  const s3SwirlOp  = useTransform(smooth, [0.47, 0.55, 0.68, 0.75], [0, 0.5, 0.5, 0]);
  const s3MilkY    = useTransform(smooth, [0.47, 0.60], [-100, 0]);
  const s3MilkOp   = useTransform(smooth, [0.47, 0.56, 0.68, 0.75], [0, 0.4, 0.4, 0]);

  // ═══════════════════════════════════════
  // STAGE 4 — FINAL FORM: 0.72 → 1.0
  // ═══════════════════════════════════════
  const s4Op      = useTransform(smooth, [0.72, 0.80, 0.94, 1.0], [0, 1, 1, 0.9]);
  const s4TextY   = useTransform(smooth, [0.72, 0.80, 0.94, 1.0], [40, 0, 0, -10]);
  const s4CupS    = useTransform(smooth, [0.72, 0.82, 0.94, 1.0], [0.85, 1, 1, 0.92]);
  const s4CupOp   = useTransform(smooth, [0.72, 0.80, 0.96, 1.0], [0, 1, 1, 0.8]);
  const s4GlowOp  = useTransform(smooth, [0.74, 0.84, 0.96, 1.0], [0, 0.8, 0.8, 0.4]);

  // Global background
  const bgY = useTransform(smooth, [0, 1], [0, -60]);

  return (
    <div ref={sectionRef} className="relative h-[400vh] bg-black">

      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black to-transparent z-20 pointer-events-none" />

      {/* ═══ Sticky Brewing Stage ═══ */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Slow atmosphere */}
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ y: bgY }}>
          <div className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(139,116,90,0.04) 0%, transparent 50%)",
            }}
          />
        </motion.div>

        <BrewParticles />

        {/* Grain noise overlay */}
        <div className="grain-overlay" />

        {/* ════════════════════════════════════
            STAGE 1 — BEAN ORIGIN
        ════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: s1Op }}
        >
          {/* Floating beans */}
          <CoffeeBeans opacity={s1BeansOp} y={s1BeansY} />

          {/* Center text */}
          <motion.div className="relative z-10 text-center px-6" style={{ y: s1TextY }}>
            <span className="text-xs tracking-[0.5em] uppercase text-stone_brown/60 mb-4 block">
              Stage 01
            </span>
            <h3
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-almond_cream/90 mb-5 leading-[1.05]"
              style={{ textShadow: "0 2px 25px rgba(0,0,0,0.5)" }}
            >
              ORIGIN
            </h3>
            <p className="text-base md:text-lg text-almond_cream/60 font-light max-w-md mx-auto leading-relaxed"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}>
              Every experience begins with selection.
            </p>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════
            STAGE 2 — EXTRACTION
        ════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: s2Op }}
        >
          {/* Extraction flow — vertical amber stream */}
          <motion.div
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[3px] pointer-events-none"
            style={{ height: s2FlowH, opacity: s2FlowOp }}
          >
            <div className="w-full h-full"
              style={{
                background: "linear-gradient(180deg, rgba(198,172,143,0.0) 0%, rgba(198,172,143,0.6) 30%, rgba(139,116,90,0.8) 70%, rgba(90,70,50,0.4) 100%)",
                filter: "blur(1px)",
              }}
            />
            {/* Flow glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40px] h-full pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(198,172,143,0.08) 40%, rgba(139,116,90,0.12) 70%, transparent 100%)",
                filter: "blur(15px)",
              }}
            />
          </motion.div>

          {/* Amber glow at impact point */}
          <motion.div
            className="absolute top-[55%] left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ opacity: s2GlowOp, scale: s2GlowS }}
          >
            <div className="w-[300px] h-[200px] rounded-full"
              style={{
                background: "radial-gradient(ellipse at 50% 40%, rgba(198,172,143,0.2) 0%, rgba(139,116,90,0.08) 40%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div className="relative z-10 text-center px-6" style={{ y: s2TextY }}>
            <span className="text-xs tracking-[0.5em] uppercase text-stone_brown/60 mb-4 block">
              Stage 02
            </span>
            <h3
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-almond_cream/90 mb-5 leading-[1.05]"
              style={{ textShadow: "0 2px 25px rgba(0,0,0,0.5)" }}
            >
              PRESSURE
            </h3>
            <p className="text-base md:text-lg text-almond_cream/60 font-light max-w-md mx-auto leading-relaxed"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}>
              9 bars. Perfect extraction.
            </p>
            {/* Pressure readout */}
            <motion.div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-light text-khaki_beige/70 tabular-nums">9.0</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-stone_brown/50 mt-1">BAR</span>
              </div>
              <div className="w-[1px] h-8 bg-stone_brown/20" />
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-light text-khaki_beige/70 tabular-nums">93°</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-stone_brown/50 mt-1">CELSIUS</span>
              </div>
              <div className="w-[1px] h-8 bg-stone_brown/20" />
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-light text-khaki_beige/70 tabular-nums">25s</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-stone_brown/50 mt-1">PULL</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════
            STAGE 3 — INFUSION
        ════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: s3Op }}
        >
          {/* Swirling blend — rotating rings */}
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] pointer-events-none"
            style={{ rotate: s3SwirlRot, opacity: s3SwirlOp }}
          >
            <div className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, rgba(198,172,143,0.12) 25%, transparent 50%, rgba(234,224,213,0.08) 75%, transparent 100%)",
                filter: "blur(20px)",
              }}
            />
            <div className="absolute inset-[15%] rounded-full"
              style={{
                background: "conic-gradient(from 180deg, transparent 0%, rgba(234,224,213,0.1) 30%, transparent 60%, rgba(198,172,143,0.06) 80%, transparent 100%)",
                filter: "blur(15px)",
              }}
            />
          </motion.div>

          {/* Milk stream entering */}
          <motion.div
            className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[2px] h-[35%] pointer-events-none"
            style={{ y: s3MilkY, opacity: s3MilkOp }}
          >
            <div className="w-full h-full"
              style={{
                background: "linear-gradient(180deg, rgba(234,224,213,0.0) 0%, rgba(234,224,213,0.5) 40%, rgba(234,224,213,0.3) 80%, transparent 100%)",
                filter: "blur(1px)",
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30px] h-full"
              style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(234,224,213,0.06) 30%, rgba(234,224,213,0.04) 70%, transparent 100%)",
                filter: "blur(12px)",
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div className="relative z-10 text-center px-6" style={{ y: s3TextY }}>
            <span className="text-xs tracking-[0.5em] uppercase text-stone_brown/60 mb-4 block">
              Stage 03
            </span>
            <h3
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-almond_cream/90 mb-5 leading-[1.05]"
              style={{ textShadow: "0 2px 25px rgba(0,0,0,0.5)" }}
            >
              BALANCE
            </h3>
            <p className="text-base md:text-lg text-almond_cream/60 font-light max-w-md mx-auto leading-relaxed"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}>
              Texture meets strength.
            </p>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════
            STAGE 4 — FINAL FORM
        ════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: s4Op }}
        >
          {/* Final drink glow */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ opacity: s4GlowOp }}
          >
            <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(198,172,143,0.15) 0%, rgba(139,116,90,0.06) 40%, transparent 65%)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>

          {/* Abstract final cup — geometric vessel */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ scale: s4CupS, opacity: s4CupOp }}
          >
            {/* Cup body */}
            <div className="relative w-[120px] h-[160px] md:w-[160px] md:h-[200px] mx-auto">
              <div className="absolute inset-0 rounded-b-[40%] overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, rgba(198,172,143,0.25) 0%, rgba(139,116,90,0.4) 40%, rgba(90,70,50,0.3) 100%)",
                  border: "1px solid rgba(198,172,143,0.15)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 -20px 40px rgba(139,116,90,0.1)",
                }}
              >
                {/* Liquid level */}
                <div className="absolute bottom-0 left-0 right-0 h-[75%]"
                  style={{
                    background: "linear-gradient(180deg, rgba(198,172,143,0.3) 0%, rgba(139,116,90,0.5) 50%, rgba(90,70,50,0.6) 100%)",
                    borderRadius: "0 0 40% 40%",
                  }}
                />
                {/* Foam */}
                <div className="absolute top-[22%] left-0 right-0 h-[8%]"
                  style={{
                    background: "linear-gradient(180deg, rgba(234,224,213,0.35) 0%, rgba(234,224,213,0.1) 100%)",
                    filter: "blur(2px)",
                  }}
                />
              </div>
              {/* Ice cubes (small bright rectangles) */}
              <div className="absolute top-[30%] left-[25%] w-[18px] h-[14px] md:w-[22px] md:h-[16px] rounded-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(234,224,213,0.25) 0%, rgba(234,224,213,0.08) 100%)",
                  border: "1px solid rgba(234,224,213,0.1)",
                  transform: "rotate(-8deg)",
                }}
              />
              <div className="absolute top-[38%] right-[22%] w-[14px] h-[12px] md:w-[18px] md:h-[14px] rounded-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(234,224,213,0.2) 0%, rgba(234,224,213,0.06) 100%)",
                  border: "1px solid rgba(234,224,213,0.08)",
                  transform: "rotate(12deg)",
                }}
              />
              {/* Rim highlight */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(234,224,213,0.2), transparent)" }}
              />
            </div>
            {/* Ground reflection */}
            <div className="w-[100px] md:w-[130px] h-[15px] mx-auto mt-2 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(139,116,90,0.15) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div className="relative z-10 text-center px-6 mt-[320px] md:mt-[380px]" style={{ y: s4TextY }}>
            <span className="text-xs tracking-[0.5em] uppercase text-stone_brown/60 mb-4 block">
              Stage 04
            </span>
            <h3
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-almond_cream/90 mb-5 leading-[1.05]"
              style={{ textShadow: "0 2px 25px rgba(0,0,0,0.5)" }}
            >
              PERFECTION
            </h3>
            <p className="text-base md:text-lg text-almond_cream/60 font-light max-w-md mx-auto leading-relaxed"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}>
              Engineered indulgence.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Global progress ring ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-stone_brown/30">
            <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
            <motion.circle
              cx="20" cy="20" r="16" fill="none"
              stroke="rgba(198,172,143,0.5)"
              strokeWidth="1.5"
              strokeDasharray="100.53"
              strokeLinecap="round"
              style={{
                strokeDashoffset: useTransform(smooth, [0, 1], [100.53, 0]),
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            />
          </svg>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black to-transparent z-20 pointer-events-none" />
    </div>
  );
}
