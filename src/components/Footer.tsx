"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Process", href: "/process" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface FooterProps {
  theme?: "dark" | "light";
}

export default function Footer({ theme = "dark" }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-5%" });

  const isDark = theme === "dark";

  return (
    <motion.footer
      ref={footerRef}
      className="relative z-50 py-16 text-center border-t"
      style={{
        background: isDark ? "#0a0908" : "#e2d7ca",
        borderColor: isDark ? "rgba(94,80,63,0.15)" : "rgba(94,80,63,0.12)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={footerInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Footer glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div
          className="w-[500px] h-[200px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(ellipse, rgba(139,116,90,0.04) 0%, transparent 60%)"
              : "radial-gradient(ellipse, rgba(198,172,143,0.08) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Brand */}
        <Link href="/">
          <span
            className="text-sm tracking-[0.4em] uppercase font-light cursor-pointer transition-opacity duration-300 hover:opacity-70"
            style={{ color: isDark ? "rgba(234,224,213,0.4)" : "rgba(10,9,8,0.35)" }}
          >
            Coffee Crave
          </span>
        </Link>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.25em] uppercase transition-all duration-500 hover:opacity-80"
              style={{
                color: isDark ? "rgba(94,80,63,0.5)" : "rgba(94,80,63,0.5)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-8 h-[1px] mt-2"
          style={{ background: isDark ? "rgba(94,80,63,0.2)" : "rgba(94,80,63,0.15)" }}
        />

        {/* Copyright */}
        <p
          className="text-[10px] tracking-[0.2em]"
          style={{ color: isDark ? "rgba(234,224,213,0.2)" : "rgba(10,9,8,0.2)" }}
        >
          © 2026 COFFEE CRAVE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </motion.footer>
  );
}
