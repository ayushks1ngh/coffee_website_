"use client";

import dynamic from "next/dynamic";
import CoffeeCraveReveal from "@/components/CoffeeCraveReveal";

// ── Lazy-load heavy animation sections (load after hero renders) ──
const SensoryPhilosophy = dynamic(() => import("@/components/SensoryPhilosophy"), { ssr: false });
const CoffeeCollection = dynamic(() => import("@/components/CoffeeCollection"), { ssr: false });
const SystemOfPrecision = dynamic(() => import("@/components/SystemOfPrecision"), { ssr: false });
const ThemeTransition = dynamic(() => import("@/components/ThemeTransition"), { ssr: false });
const GetTheBrew = dynamic(() => import("@/components/GetTheBrew"), { ssr: false });
const BrandOutro = dynamic(() => import("@/components/BrandOutro"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ══════════════════════════════════════
          DARK ZONE — Brand Entry Experience
      ══════════════════════════════════════ */}
      <div className="theme-dark bg-black text-almond_cream">
        <CoffeeCraveReveal />
        <SensoryPhilosophy />
        <CoffeeCollection />
        <SystemOfPrecision />
      </div>

      {/* ══════════════════════════════════════
          TRANSITION BRIDGE — Dark → Light
      ══════════════════════════════════════ */}
      <ThemeTransition />

      {/* ══════════════════════════════════════
          LIGHT ZONE — Conversion
      ══════════════════════════════════════ */}
      <div className="theme-light">
        <GetTheBrew />
        <BrandOutro />
      </div>

    </main>
  );
}
