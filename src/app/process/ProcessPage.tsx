"use client";

import { motion } from "framer-motion";
import IngredientJourney from "@/components/IngredientJourney";
import BrewingExperience from "@/components/BrewingExperience";
import Footer from "@/components/Footer";

export default function ProcessPage() {
  return (
    <div className="theme-dark">
      {/* ── Hero Header ── */}
      <section
        className="relative min-h-[70vh] flex items-end pb-20 px-6 md:px-16 lg:px-24 overflow-hidden"
        style={{ background: "#0a0908" }}
      >
        <div className="grain-overlay" />

        {/* Ghost number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-[30vw] font-bold text-almond_cream leading-none"
            style={{ opacity: 0.02 }}
          >
            04
          </span>
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[600px] h-[500px] rounded-full"
            style={{
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(circle, rgba(139,116,90,0.08) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-stone_brown/50 block mb-6">
            The Method
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight text-almond_cream/90 leading-[1.05] mb-8">
            PRECISION IS
            <br />
            <span className="text-khaki_beige/60">THE PRODUCT</span>
          </h1>
          <div className="w-20 h-[1px] bg-stone_brown/30 mb-8" />
          <p className="text-base md:text-lg text-almond_cream/55 font-light leading-[1.7] max-w-xl">
            From volcanic highland to final sip — every step measured, every variable refined,
            every result intentional. This is how coffee becomes engineered.
          </p>
        </motion.div>
      </section>

      {/* ── Phase 1-3: Ingredient Journey (Sourcing → Roasting → Extraction) ── */}
      <IngredientJourney />

      {/* ── Phase 4: Brewing Experience (4-stage simulation) ── */}
      <BrewingExperience />

      {/* ── Precision Philosophy Close ── */}
      <section
        className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
        style={{ background: "#050505" }}
      >
        <div className="grain-overlay" />

        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[500px] h-[400px] rounded-full"
            style={{
              top: "20%",
              right: "10%",
              background: "radial-gradient(circle, rgba(198,172,143,0.04) 0%, transparent 55%)",
              filter: "blur(50px)",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-stone_brown/50 block mb-8">
            The Standard
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-almond_cream/90 leading-[1.1] mb-10">
            Zero variables left
            <br />
            <span className="text-khaki_beige/50">to chance.</span>
          </h2>
          <div className="w-12 h-[1px] bg-stone_brown/30 mx-auto mb-10" />
          <p className="text-base text-almond_cream/50 font-light leading-[1.8] mb-6">
            200+ samples tasted. 40+ roast curves tested. 12kg micro-batches tuned to ±0.5°C.
            25-second pulls at precisely 93°C and 9-bar pressure.
          </p>
          <p className="text-base text-almond_cream/40 font-light leading-[1.8]">
            This isn&apos;t coffee. It&apos;s a controlled substance — legal, delicious, and
            calibrated to the molecule.
          </p>
        </motion.div>
      </section>

      <Footer theme="dark" />
    </div>
  );
}
