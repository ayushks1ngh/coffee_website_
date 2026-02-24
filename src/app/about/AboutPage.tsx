"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";

const VALUES = [
  {
    title: "Precision",
    desc: "Every variable is measured. Temperature, pressure, grind size, steep time — nothing is left to chance.",
    metric: "±0.5°C",
    metricLabel: "Thermal accuracy",
  },
  {
    title: "Transparency",
    desc: "We name our farms, share our roast profiles, and publish our extraction ratios. No secrets, no shortcuts.",
    metric: "100%",
    metricLabel: "Traceability",
  },
  {
    title: "Obsession",
    desc: "We taste 200+ samples to select one lot. Then we roast it 40+ times to find the perfect curve.",
    metric: "200+",
    metricLabel: "Samples per lot",
  },
];

const TIMELINE = [
  { year: "2021", event: "First roast. A kitchen experiment that changed everything." },
  { year: "2022", event: "Flagship studio opens in Melbourne. 18-hour cold brew becomes signature." },
  { year: "2023", event: "Sydney Tasting Lab launches. Wholesale program begins." },
  { year: "2024", event: "Global shipping goes live. 12 countries, same-day roast guarantee." },
  { year: "2025", event: "Ceremonial-grade matcha line introduced. 40,000+ cups served." },
  { year: "2026", event: "The system continues. Every batch, every pull, every detail — better." },
];

export default function AboutPage() {
  return (
    <PageShell theme="dark">
      {/* ── Hero ── */}
      <motion.div
        className="mb-28 md:mb-36"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[10px] tracking-[0.5em] uppercase text-stone_brown/50 block mb-6">
          The Brand
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight text-almond_cream/90 leading-[1.05] mb-10">
          WE DON&apos;T MAKE
          <br />
          <span className="text-khaki_beige/55">COFFEE.</span>
        </h1>
        <div className="w-20 h-[1px] bg-stone_brown/30 mb-10" />
        <p className="text-xl md:text-2xl text-almond_cream/65 font-light leading-[1.6] max-w-2xl">
          We engineer experiences. Every bean sourced with intent, every roast calibrated
          to the molecule, every cup designed to make you stop — and feel something.
        </p>
      </motion.div>

      {/* ── Origin Story ── */}
      <motion.div
        className="mb-28 md:mb-36 max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xs tracking-[0.4em] uppercase text-stone_brown/50 mb-10 pb-3 border-b border-stone_brown/10">
          Origin Story
        </h2>
        <p className="text-lg text-almond_cream/65 font-light leading-[1.8] mb-8">
          Coffee Crave was born from a simple frustration: why does most iced coffee taste like
          an afterthought? Watered down, poorly extracted, mass-produced.
        </p>
        <p className="text-base text-almond_cream/50 font-light leading-[1.8] mb-8">
          We set out to prove that cold coffee can carry the same depth, complexity, and intention
          as the finest hot pour-overs. That meant rethinking every step — from the farms we source
          from, to the physics of extraction, to the way cold changes molecular structure.
        </p>
        <p className="text-base text-almond_cream/50 font-light leading-[1.8]">
          The result is a product that doesn&apos;t just taste good — it feels <em className="text-almond_cream/70 not-italic">engineered</em>.
          Because it is.
        </p>
      </motion.div>

      {/* ── Founder Vision ── */}
      <motion.div
        className="mb-28 md:mb-36"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="flex-1">
            <h2 className="text-xs tracking-[0.4em] uppercase text-stone_brown/50 mb-10 pb-3 border-b border-stone_brown/10">
              Founder&apos;s Vision
            </h2>
            <blockquote className="relative">
              <span className="text-5xl md:text-6xl font-serif text-stone_brown/20 leading-none block mb-4 select-none">
                &ldquo;
              </span>
              <p
                className="font-light italic leading-[1.5] tracking-tight text-almond_cream/80 mb-8"
                style={{ fontSize: "clamp(20px, 3vw, 32px)" }}
              >
                I wanted to build a coffee company the way Apple builds products — 
                where every detail is considered, every compromise rejected, and the
                result is something you feel before you understand.
              </p>
              <footer className="text-[10px] tracking-[0.35em] uppercase text-khaki_beige/50">
                &mdash; Founder &amp; Head of Engineering
              </footer>
            </blockquote>
          </div>

          {/* Stats column */}
          <div className="flex-shrink-0 md:w-48 flex flex-row md:flex-col gap-8 md:gap-12 md:pt-14">
            {[
              { val: "4", unit: "Countries sourced" },
              { val: "12kg", unit: "Max batch size" },
              { val: "18hr", unit: "Cold steep" },
            ].map((s, i) => (
              <motion.div
                key={s.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
              >
                <span className="text-3xl md:text-4xl font-light text-almond_cream/80 block mb-1 tabular-nums">
                  {s.val}
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-stone_brown/40">
                  {s.unit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Values Grid ── */}
      <motion.div
        className="mb-28 md:mb-36"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xs tracking-[0.4em] uppercase text-stone_brown/50 mb-10 pb-3 border-b border-stone_brown/10">
          Our Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {VALUES.map((v, idx) => (
            <motion.div
              key={v.title}
              className="group rounded-2xl p-8 md:p-10 transition-all duration-500 relative"
              style={{
                background: "rgba(234,224,213,0.02)",
                border: "1px solid rgba(139,116,90,0.08)",
              }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 * idx }}
              whileHover={{ y: -4 }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(139,116,90,0.06) 0%, transparent 70%)",
                }}
              />

              <span className="text-3xl font-light text-khaki_beige/30 block mb-4 tabular-nums">
                {v.metric}
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-stone_brown/40 block mb-6">
                {v.metricLabel}
              </span>
              <h3 className="text-xl font-light tracking-tight text-almond_cream/85 mb-4">
                {v.title}
              </h3>
              <div className="w-8 h-[1px] bg-stone_brown/25 mb-4 group-hover:w-12 transition-all duration-500" />
              <p className="text-sm text-almond_cream/45 font-light leading-[1.7]">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Timeline ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xs tracking-[0.4em] uppercase text-stone_brown/50 mb-10 pb-3 border-b border-stone_brown/10">
          Timeline
        </h2>
        <div className="flex flex-col gap-0">
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.year}
              className="flex gap-6 md:gap-10 py-6 border-b border-stone_brown/8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.5 }}
            >
              <span className="text-2xl md:text-3xl font-light text-stone_brown/30 tabular-nums flex-shrink-0 w-16 md:w-20">
                {t.year}
              </span>
              <p className="text-base text-almond_cream/55 font-light leading-[1.6] pt-1">
                {t.event}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
