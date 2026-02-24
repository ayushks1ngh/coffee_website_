import CoffeeCraveReveal from "@/components/CoffeeCraveReveal";
import SensoryPhilosophy from "@/components/SensoryPhilosophy";
import CoffeeCollection from "@/components/CoffeeCollection";
import SystemOfPrecision from "@/components/SystemOfPrecision";
import ThemeTransition from "@/components/ThemeTransition";
import GetTheBrew from "@/components/GetTheBrew";
import BrandOutro from "@/components/BrandOutro";

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
