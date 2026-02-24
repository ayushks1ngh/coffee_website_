"use client";

import Footer from "@/components/Footer";

interface PageShellProps {
  children: React.ReactNode;
  theme?: "dark" | "light";
}

/**
 * PageShell — shared layout wrapper for inner pages.
 * Provides navbar clearance, theme, grain, ambient glow, and Footer.
 */
export default function PageShell({ children, theme = "light" }: PageShellProps) {
  const isDark = theme === "dark";

  return (
    <div className={isDark ? "theme-dark" : "theme-light"}>
      <main
        className="min-h-screen pt-28 pb-20 px-6 md:px-16 lg:px-24 relative overflow-hidden"
        style={{
          background: isDark ? "#0a0908" : "#eae0d5",
          color: isDark ? "#eae0d5" : "#0a0908",
        }}
      >
        {/* Grain */}
        <div className={isDark ? "grain-overlay" : "grain-overlay-light"} />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[600px] h-[500px] rounded-full"
            style={{
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              background: isDark
                ? "radial-gradient(circle, rgba(139,116,90,0.06) 0%, transparent 60%)"
                : "radial-gradient(circle, rgba(198,172,143,0.12) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Page content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      <Footer theme={theme} />
    </div>
  );
}
