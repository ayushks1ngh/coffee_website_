"use client";

import Footer from "@/components/Footer";

interface PageShellProps {
  children: React.ReactNode;
  theme?: "dark" | "light";
}

/**
 * PageShell — shared layout wrapper for inner pages.
 * Provides navbar clearance, theme, grain, atmospheric overlays, and Footer.
 */
export default function PageShell({
  children,
  theme = "light",
}: PageShellProps) {
  const isDark = theme === "dark";

  return (
    <div className={isDark ? "theme-dark" : "theme-light"}>
      <main
        role="main"
        aria-label="Page content"
        className="min-h-screen pt-28 pb-20 px-6 md:px-16 lg:px-24 relative overflow-hidden"
        style={{
          background: isDark ? "#0a0908" : "#e2d6c6",
          color: isDark ? "#e2d6c6" : "#0a0908",
        }}
      >
        {/* Grain */}
        <div
          className={isDark ? "grain-overlay" : "grain-overlay-light"}
          aria-hidden="true"
        />

        {/* Atmospheric radial overlays — prevent flat surfaces */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Top-center warm glow */}
          <div
            className="absolute w-[700px] h-[500px] rounded-full"
            style={{
              top: "3%",
              left: "50%",
              transform: "translateX(-50%)",
              background: isDark
                ? "radial-gradient(circle, rgba(139,116,90,0.06) 0%, transparent 60%)"
                : "radial-gradient(circle, rgba(198,172,143,0.1) 0%, transparent 55%)",
              filter: "blur(60px)",
            }}
          />
          {/* Bottom-left depth shadow (light theme only) */}
          {!isDark && (
            <div
              className="absolute w-[500px] h-[400px] rounded-full"
              style={{
                bottom: "5%",
                left: "-5%",
                background:
                  "radial-gradient(circle, rgba(94,80,63,0.05) 0%, transparent 55%)",
                filter: "blur(80px)",
              }}
            />
          )}
          {/* Right-side warm accent (light theme only) */}
          {!isDark && (
            <div
              className="absolute w-[400px] h-[350px] rounded-full"
              style={{
                top: "30%",
                right: "-3%",
                background:
                  "radial-gradient(circle, rgba(139,116,90,0.04) 0%, transparent 50%)",
                filter: "blur(70px)",
              }}
            />
          )}
        </div>

        {/* Page content */}
        <div className="relative z-10 max-w-6xl mx-auto">{children}</div>
      </main>

      <Footer theme={theme} />
    </div>
  );
}
