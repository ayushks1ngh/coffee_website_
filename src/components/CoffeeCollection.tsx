"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    name: "ICED LATTE",
    tagline: "Silk. Strength. Balance.",
    notes: ["Ethiopian Arabica", "Velvet Milk", "Slow Chill Extraction"],
    image: "/products/iced-latte.png",
    number: "01",
  },
  {
    name: "COLD BREW RESERVE",
    tagline: "Depth. Patience. Clarity.",
    notes: ["Colombian Single-Origin", "18-Hour Steep", "Zero Heat Process"],
    image: "/products/cold-brew.png",
    number: "02",
  },
  {
    name: "CARAMEL ESPRESSO",
    tagline: "Warmth. Velvet. Indulgence.",
    notes: ["Brazilian Cerrado", "Salted Caramel", "9-Bar Pressure Pull"],
    image: "/products/caramel-espresso.png",
    number: "03",
  },
];

// ── Floating micro particles ──
function GalleryParticles() {
  const dots = [
    { x: "12%", y: "25%", size: 3, dur: 30, delay: 0 },
    { x: "82%", y: "60%", size: 2, dur: 26, delay: 5 },
    { x: "55%", y: "85%", size: 4, dur: 35, delay: 3 },
    { x: "90%", y: "18%", size: 2, dur: 28, delay: 10 },
    { x: "30%", y: "70%", size: 3, dur: 32, delay: 7 },
    { x: "70%", y: "40%", size: 2, dur: 24, delay: 14 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-khaki_beige"
          style={{ width: d.size, height: d.size, left: d.x, top: d.y, filter: "blur(2px)", opacity: 0.05 }}
          animate={{ y: [0, -50, -15, -65, 0], opacity: [0.04, 0.08, 0.05, 0.09, 0.04] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "linear", delay: d.delay }}
        />
      ))}
    </div>
  );
}

export default function CoffeeCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.0005 });

  // ── Hero intro: 0 → 0.08 ──
  const heroOp = useTransform(smooth, [0, 0.03, 0.06, 0.10], [0, 1, 1, 0]);
  const heroY  = useTransform(smooth, [0, 0.03, 0.06, 0.10], [40, 0, 0, -30]);

  // ── Product 1: 0.08 → 0.36 ──
  const p1Op      = useTransform(smooth, [0.08, 0.14, 0.28, 0.36], [0, 1, 1, 0]);
  const p1ImgY    = useTransform(smooth, [0.08, 0.14, 0.28, 0.36], [60, 0, 0, -60]);
  const p1ImgS    = useTransform(smooth, [0.08, 0.14, 0.28, 0.36], [0.92, 1, 1, 0.92]);
  const p1TextX   = useTransform(smooth, [0.10, 0.18], [-40, 0]);
  const p1TextOp  = useTransform(smooth, [0.10, 0.18, 0.28, 0.36], [0, 1, 1, 0]);
  const p1GlowOp  = useTransform(smooth, [0.08, 0.16, 0.28, 0.36], [0, 0.7, 0.7, 0]);
  const p1NumOp   = useTransform(smooth, [0.08, 0.14, 0.30, 0.36], [0, 1, 1, 0]);
  const p1NumY    = useTransform(smooth, [0.08, 0.14, 0.28, 0.36], [50, 0, 0, -80]);

  // ── Product 2: 0.33 → 0.66 ──
  const p2Op      = useTransform(smooth, [0.33, 0.40, 0.56, 0.66], [0, 1, 1, 0]);
  const p2ImgY    = useTransform(smooth, [0.33, 0.40, 0.56, 0.66], [60, 0, 0, -60]);
  const p2ImgS    = useTransform(smooth, [0.33, 0.40, 0.56, 0.66], [0.92, 1, 1, 0.92]);
  const p2TextX   = useTransform(smooth, [0.36, 0.44], [-40, 0]);
  const p2TextOp  = useTransform(smooth, [0.36, 0.44, 0.56, 0.66], [0, 1, 1, 0]);
  const p2GlowOp  = useTransform(smooth, [0.33, 0.42, 0.56, 0.66], [0, 0.7, 0.7, 0]);
  const p2NumOp   = useTransform(smooth, [0.33, 0.40, 0.58, 0.66], [0, 1, 1, 0]);
  const p2NumY    = useTransform(smooth, [0.33, 0.40, 0.56, 0.66], [50, 0, 0, -80]);

  // ── Product 3: 0.62 → 0.94 ──
  const p3Op      = useTransform(smooth, [0.62, 0.70, 0.86, 0.94], [0, 1, 1, 0.85]);
  const p3ImgY    = useTransform(smooth, [0.62, 0.70, 0.86, 0.94], [60, 0, 0, -15]);
  const p3ImgS    = useTransform(smooth, [0.62, 0.70, 0.86, 0.94], [0.92, 1, 1, 0.85]);
  const p3TextX   = useTransform(smooth, [0.65, 0.73], [-40, 0]);
  const p3TextOp  = useTransform(smooth, [0.65, 0.73, 0.86, 0.94], [0, 1, 1, 0.7]);
  const p3GlowOp  = useTransform(smooth, [0.62, 0.72, 0.86, 0.94], [0, 0.7, 0.7, 0.3]);
  const p3NumOp   = useTransform(smooth, [0.62, 0.70, 0.88, 0.94], [0, 1, 1, 0.6]);
  const p3NumY    = useTransform(smooth, [0.62, 0.70, 0.86, 0.94], [50, 0, 0, -30]);

  // ── CTA ──
  const ctaOp = useTransform(smooth, [0.90, 0.96], [0, 1]);
  const ctaY  = useTransform(smooth, [0.90, 0.96], [20, 0]);

  // ── Background parallax (slow layer) ──
  const bgY = useTransform(smooth, [0, 1], [0, -40]);

  const sets = [
    { p: PRODUCTS[0], op: p1Op, imgY: p1ImgY, imgS: p1ImgS, textX: p1TextX, textOp: p1TextOp, glowOp: p1GlowOp, numOp: p1NumOp, numY: p1NumY },
    { p: PRODUCTS[1], op: p2Op, imgY: p2ImgY, imgS: p2ImgS, textX: p2TextX, textOp: p2TextOp, glowOp: p2GlowOp, numOp: p2NumOp, numY: p2NumY },
    { p: PRODUCTS[2], op: p3Op, imgY: p3ImgY, imgS: p3ImgS, textX: p3TextX, textOp: p3TextOp, glowOp: p3GlowOp, numOp: p3NumOp, numY: p3NumY },
  ];

  return (
    <div ref={sectionRef} className="relative h-[300vh] bg-black">

      {/* Gradient transition in */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black to-transparent z-20 pointer-events-none" />

      {/* ═══ Sticky Exhibition Stage ═══ */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Slow background atmosphere */}
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ y: bgY }}>
          <div className="absolute w-[700px] h-[700px] rounded-full"
            style={{
              top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(139,116,90,0.05) 0%, transparent 55%)",
            }}
          />
        </motion.div>

        {/* Floating particles */}
        <GalleryParticles />

        {/* Grain noise overlay */}
        <div className="grain-overlay" />

        {/* ── Hero intro ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
          style={{ opacity: heroOp, y: heroY }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-khaki_beige/50 mb-6">
            The Collection
          </span>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-almond_cream/90 leading-[1.05] mb-5"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
          >
            Our Signature
            <br />
            <span className="text-khaki_beige/70">Creations</span>
          </h2>
          <p className="text-base md:text-lg text-almond_cream/60 font-light max-w-md leading-relaxed"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}>
            Engineered for different moments of indulgence.
          </p>
        </motion.div>

        {/* ═══ Product exhibits ═══ */}
        {sets.map(({ p, op, imgY, imgS, textX, textOp, glowOp, numOp, numY }, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ opacity: op }}
          >
            {/* Ghost number (background, slowest layer) */}
            <motion.span
              className="absolute text-[30vw] font-bold text-almond_cream/[0.04] pointer-events-none select-none leading-none"
              style={{ opacity: numOp, y: numY }}
            >
              {p.number}
            </motion.span>

            {/* Exhibition layout */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20 max-w-6xl w-full px-6 md:px-16">

              {/* Product image side */}
              <div className="relative flex-shrink-0 flex items-center justify-center">

                {/* Ambient glow (slowest) */}
                <motion.div
                  className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] pointer-events-none"
                  style={{ opacity: glowOp }}
                >
                  <div className="w-full h-full rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(139,116,90,0.2) 0%, rgba(139,116,90,0.06) 40%, transparent 65%)",
                      filter: "blur(50px)",
                    }}
                  />
                </motion.div>

                {/* Ground shadow */}
                <motion.div
                  className="absolute bottom-[-10px] md:bottom-[-15px] w-[200px] md:w-[280px] h-[20px] pointer-events-none z-[9]"
                  style={{ opacity: glowOp }}
                >
                  <div className="w-full h-full rounded-full"
                    style={{
                      background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.6) 0%, transparent 70%)",
                      filter: "blur(12px)",
                    }}
                  />
                </motion.div>

                {/* Product image (medium speed) — blend into darkness */}
                <motion.div
                  className="relative w-[240px] h-[320px] md:w-[340px] md:h-[440px] z-10"
                  style={{
                    y: imgY,
                    scale: imgS,
                    mixBlendMode: "lighten",
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 240px, 340px"
                    loading="lazy"
                    style={{
                      filter: "contrast(1.1) saturate(0.9)",
                      maskImage: "radial-gradient(ellipse 85% 90% at 50% 48%, black 50%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(ellipse 85% 90% at 50% 48%, black 50%, transparent 100%)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Text block (fastest layer) */}
              <motion.div
                className="flex flex-col items-center md:items-start text-center md:text-left max-w-md z-10"
                style={{ x: textX, opacity: textOp }}
              >
                <span className="text-[11px] tracking-[0.4em] uppercase text-khaki_beige/40 mb-4">
                  {p.notes[0]}
                </span>

                <h3
                  className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-almond_cream/90 mb-3"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
                >
                  {p.name}
                </h3>

                <p className="text-lg md:text-xl text-almond_cream/50 font-light italic mb-6">
                  {p.tagline}
                </p>

                {/* Divider */}
                <div className="w-10 h-[1px] bg-stone_brown/40 mb-5" />

                {/* Flavor notes */}
                <div className="flex flex-col gap-2.5">
                  {p.notes.map((note, ni) => (
                    <span key={ni} className="text-[11px] tracking-[0.3em] uppercase text-khaki_beige/50 font-light flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-stone_brown/40 flex-shrink-0" />
                      {note}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* ═══ Micro CTA ═══ */}
        <motion.div
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: ctaOp, y: ctaY }}
        >
          <Link
            href="/menu"
            className="text-sm tracking-[0.3em] uppercase text-khaki_beige/80 border-b border-khaki_beige/30 pb-1 hover:border-khaki_beige hover:text-khaki_beige transition-all duration-500"
          >
            Discover the Menu →
          </Link>
        </motion.div>

      </div>

      {/* Gradient transition out */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black to-transparent z-20 pointer-events-none" />
    </div>
  );
}
