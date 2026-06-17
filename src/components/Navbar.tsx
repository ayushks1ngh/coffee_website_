"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useCart } from "@/context/CartContext";

/* ══════════════════════════════════════════════
   ROUTE DEFINITIONS
   ══════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Process", href: "/process" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ══════════════════════════════════════════════
   MAGNETIC HOVER — individual nav item
   ══════════════════════════════════════════════ */

const MagneticNavItem = memo(function MagneticNavItem({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Raw motion values for magnetic pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springy output
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });
  const scale = useSpring(1, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Pull toward cursor (max ±3px)
      const dx = (e.clientX - centerX) * 0.08;
      const dy = (e.clientY - centerY) * 0.12;
      x.set(Math.max(-3, Math.min(3, dx)));
      y.set(Math.max(-3, Math.min(3, dy)));
      scale.set(1.06);
    },
    [x, y, scale],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [x, y, scale]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, scale }}
    >
      <Link href={href}>
        <span
          className={`
            relative px-5 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase cursor-pointer
            transition-all duration-300 block select-none
            ${isActive
              ? "text-almond_cream"
              : "text-almond_cream/45 hover:text-almond_cream/80"
            }
          `}
        >
          {/* Active capsule background */}
          {isActive && (
            <motion.span
              className="absolute inset-0 rounded-full bg-white/[0.08]"
              layoutId="nav-active-pill"
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </span>
      </Link>
    </motion.div>
  );
});

/* ══════════════════════════════════════════════
   CART BADGE — item counter
   ══════════════════════════════════════════════ */

function CartBadge() {
  const { itemCount } = useCart();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <Link href="/cart">
          <motion.div
            className="ml-1 flex items-center justify-center rounded-full cursor-pointer"
            style={{
              width: 28,
              height: 28,
              background: "rgba(198,172,143,0.9)",
              color: "#0a0908",
              fontSize: 11,
              fontWeight: 600,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {itemCount}
          </motion.div>
        </Link>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════
   SIGN IN BUTTON
   ══════════════════════════════════════════════ */

function SignInButton() {
  return (
    <Link href="/account">
      <motion.div
        className="ml-2 px-4 py-1.5 rounded-full cursor-pointer text-[10px] tracking-[0.15em] uppercase font-medium"
        style={{
          background: "rgba(198,172,143,0.15)",
          color: "rgba(198,172,143,0.9)",
          border: "1px solid rgba(198,172,143,0.3)",
        }}
        whileHover={{ scale: 1.05, background: "rgba(198,172,143,0.25)" }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </motion.div>
    </Link>
  );
}

/* ══════════════════════════════════════════════
   MAIN NAVBAR COMPONENT
   ══════════════════════════════════════════════ */

const Navbar = memo(function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  /* ── Detect light-theme pages ── */
  const isLightPage = ["/menu", "/locations", "/about", "/contact", "/cart", "/checkout"].some(
    (p) => pathname.startsWith(p)
  );

  /* ── State ── */
  const [scrolled, setScrolled] = useState(false);         // past threshold
  const [hidden, setHidden] = useState(false);              // auto-hide
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Refs for scroll direction tracking ── */
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  /* ── Scroll handler: shrink + auto-hide/reveal ── */
  useEffect(() => {
    const SCROLL_THRESHOLD = 40;     // shrink trigger
    const HIDE_THRESHOLD = 300;       // don't hide near top
    const HIDE_DELTA = 8;             // min px to trigger hide

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Shrink state
        setScrolled(currentY > SCROLL_THRESHOLD);

        // Auto-hide: only engage below threshold
        if (currentY > HIDE_THRESHOLD) {
          const delta = currentY - lastScrollY.current;
          if (delta > HIDE_DELTA) {
            setHidden(true);  // scrolling DOWN → hide
          } else if (delta < -HIDE_DELTA) {
            setHidden(false); // scrolling UP → reveal
          }
        } else {
          setHidden(false);   // near top → always visible
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close mobile on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ── Compute auto-hide Y offset ── */
  const navY = hidden ? -120 : 0;

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP NAV — Fixed, viewport centered
      ══════════════════════════════════════ */}
      <motion.nav
        className="hidden md:flex items-center gap-0.5 px-2.5 py-2 rounded-full"
        style={{
          position: "fixed",
          top: 28,
          left: "50%",
          zIndex: 999,

          /* ── GLASSMORPHISM — adapts to light/dark pages ── */
          backdropFilter: scrolled
            ? "blur(24px) saturate(1.8)"
            : "blur(14px) saturate(1.4)",
          WebkitBackdropFilter: scrolled
            ? "blur(24px) saturate(1.8)"
            : "blur(14px) saturate(1.4)",
          background: isLightPage
            ? scrolled
              ? "rgba(94,80,63,0.55)"
              : "rgba(94,80,63,0.25)"
            : scrolled
              ? "rgba(10,9,8,0.6)"
              : "rgba(10,9,8,0.25)",
          border: isLightPage
            ? "1px solid rgba(94,80,63,0.12)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: scrolled
            ? isLightPage
              ? "0 8px 40px rgba(94,80,63,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 4px 24px rgba(0,0,0,0.12)",
        }}
        initial={{ x: "-50%", y: -80, opacity: 0, scale: 1 }}
        animate={{
          x: "-50%",
          y: navY,
          opacity: 1,
          scale: scrolled ? 0.92 : 1,
        }}
        transition={{
          // Initial entrance
          x: { duration: 0 },
          y: { type: "spring", stiffness: 260, damping: 26 },
          opacity: { duration: 0.8, delay: isHome ? 3.2 : 0.2 },
          scale: { type: "spring", stiffness: 300, damping: 25 },
        }}
      >
        {NAV_LINKS.map((link) => (
          <MagneticNavItem
            key={link.href}
            label={link.label}
            href={link.href}
            isActive={pathname === link.href}
          />
        ))}

        {/* Cart Badge */}
        <CartBadge />

        {/* Sign In */}
        <SignInButton />
      </motion.nav>

      {/* ══════════════════════════════════════
          MOBILE — Hamburger trigger
      ══════════════════════════════════════ */}
      <motion.button
        className="md:hidden flex flex-col items-center justify-center w-11 h-11 rounded-full cursor-pointer"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 999,
          backdropFilter: "blur(18px) saturate(1.5)",
          WebkitBackdropFilter: "blur(18px) saturate(1.5)",
          background: "rgba(10,9,8,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
        onClick={() => setMobileOpen(!mobileOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: hidden ? -80 : 0 }}
        transition={{
          opacity: { delay: isHome ? 3.2 : 0.2, duration: 0.5 },
          y: { type: "spring", stiffness: 260, damping: 26 },
        }}
        aria-label="Toggle navigation"
      >
        <motion.span
          className="block w-4 h-[1px] bg-almond_cream/70 mb-[4px]"
          animate={mobileOpen ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-4 h-[1px] bg-almond_cream/70"
          animate={mobileOpen ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      {/* ══════════════════════════════════════
          MOBILE — Full-screen overlay
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[998] md:hidden flex flex-col items-center justify-center gap-7"
            style={{
              backdropFilter: "blur(40px) saturate(1.8)",
              WebkitBackdropFilter: "blur(40px) saturate(1.8)",
              background: "rgba(10,9,8,0.88)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.04 * idx, duration: 0.35 }}
                >
                  <Link href={link.href} onClick={() => setMobileOpen(false)}>
                    <span
                      className={`
                        text-2xl tracking-[0.15em] uppercase cursor-pointer transition-colors duration-300
                        ${isActive ? "text-almond_cream" : "text-almond_cream/35 hover:text-almond_cream/70"}
                      `}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Sign In link in mobile */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.04 * NAV_LINKS.length, duration: 0.35 }}
            >
              <Link href="/account" onClick={() => setMobileOpen(false)}>
                <span className="text-2xl tracking-[0.15em] uppercase cursor-pointer text-khaki_beige/70 hover:text-khaki_beige">
                  Sign In
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
