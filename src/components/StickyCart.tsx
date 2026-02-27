"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

/**
 * StickyCart — contextual sticky cart panel for the menu page.
 * Desktop: fixed right sidebar visible once items are added.
 * Mobile: slide-up bottom drawer triggered by a floating cart pill.
 */
export default function StickyCart() {
  const { items, updateQuantity, removeFromCart, subtotal, itemCount } =
    useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasItems = itemCount > 0;

  return (
    <>
      {/* ═══════════════════════════════════════════
          DESKTOP — Sticky Side Panel
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {hasItems && (
          <motion.aside
            className="hidden lg:flex flex-col w-[320px] shrink-0 sticky top-28 self-start rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,9,8,0.03)",
              border: "1px solid rgba(94,80,63,0.1)",
              maxHeight: "calc(100vh - 8rem)",
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(94,80,63,0.08)" }}
            >
              <span
                className="text-[10px] tracking-[0.4em] uppercase"
                style={{ color: "rgba(94,80,63,0.5)" }}
              >
                Your Order
              </span>
              <span
                className="text-xs tabular-nums"
                style={{ color: "rgba(94,80,63,0.4)" }}
              >
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex items-start gap-3 py-3"
                    style={{
                      borderBottom: "1px solid rgba(94,80,63,0.06)",
                    }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-light truncate"
                        style={{ color: "rgba(10,9,8,0.85)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase mt-0.5"
                        style={{ color: "rgba(94,80,63,0.4)" }}
                      >
                        {item.size}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.id, item.quantity - 1)
                            : removeFromCart(item.id)
                        }
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer transition-colors duration-200"
                        style={{
                          background: "rgba(94,80,63,0.08)",
                          color: "rgba(94,80,63,0.6)",
                        }}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span
                        className="text-xs tabular-nums w-5 text-center"
                        style={{ color: "rgba(10,9,8,0.7)" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer transition-colors duration-200"
                        style={{
                          background: "rgba(94,80,63,0.08)",
                          color: "rgba(94,80,63,0.6)",
                        }}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span
                      className="text-sm tabular-nums shrink-0"
                      style={{ color: "rgba(10,9,8,0.6)" }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer — Subtotal + CTA */}
            <div
              className="px-5 py-4"
              style={{ borderTop: "1px solid rgba(94,80,63,0.08)" }}
            >
              <div className="flex justify-between mb-4">
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "rgba(94,80,63,0.5)" }}
                >
                  Subtotal
                </span>
                <span
                  className="text-sm font-medium tabular-nums"
                  style={{ color: "rgba(10,9,8,0.85)" }}
                >
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Link href="/cart">
                <motion.button
                  className="w-full py-3 rounded-full text-[11px] tracking-[0.25em] uppercase cursor-pointer"
                  style={{
                    background: "#0a0908",
                    color: "#eae0d5",
                  }}
                  whileHover={{
                    scale: 1.02,
                    filter: "brightness(1.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  View Cart & Checkout
                </motion.button>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          MOBILE — Floating Cart Pill + Slide-up Drawer
      ═══════════════════════════════════════════ */}

      {/* Floating cart pill */}
      <AnimatePresence>
        {hasItems && !mobileOpen && (
          <motion.button
            className="lg:hidden fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-5 py-3.5 rounded-full cursor-pointer"
            style={{
              background: "rgba(10,9,8,0.92)",
              color: "#eae0d5",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              border: "1px solid rgba(94,80,63,0.2)",
            }}
            onClick={() => setMobileOpen(true)}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            aria-label="Open cart"
          >
            <span className="text-sm">🛒</span>
            <span className="text-[11px] tracking-[0.15em] uppercase">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            <span className="text-xs tabular-nums font-medium">
              ${subtotal.toFixed(2)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-up drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 z-[150]"
              style={{ background: "rgba(10,9,8,0.4)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[160] rounded-t-2xl overflow-hidden"
              style={{
                background: "#e2d6c6",
                maxHeight: "75vh",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "rgba(94,80,63,0.2)" }}
                />
              </div>

              {/* Header */}
              <div
                className="px-6 py-3 flex items-center justify-between"
                style={{ borderBottom: "1px solid rgba(94,80,63,0.08)" }}
              >
                <span
                  className="text-[10px] tracking-[0.4em] uppercase"
                  style={{ color: "rgba(94,80,63,0.5)" }}
                >
                  Your Order
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-xs cursor-pointer"
                  style={{ color: "rgba(94,80,63,0.4)" }}
                  aria-label="Close cart drawer"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div
                className="overflow-y-auto px-6 py-3 space-y-3"
                style={{ maxHeight: "40vh" }}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-3"
                    style={{
                      borderBottom: "1px solid rgba(94,80,63,0.06)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-light truncate"
                        style={{ color: "rgba(10,9,8,0.85)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase mt-0.5"
                        style={{ color: "rgba(94,80,63,0.4)" }}
                      >
                        {item.size}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.id, item.quantity - 1)
                            : removeFromCart(item.id)
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer"
                        style={{
                          background: "rgba(94,80,63,0.08)",
                          color: "rgba(94,80,63,0.6)",
                        }}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span
                        className="text-sm tabular-nums w-5 text-center"
                        style={{ color: "rgba(10,9,8,0.7)" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer"
                        style={{
                          background: "rgba(94,80,63,0.08)",
                          color: "rgba(94,80,63,0.6)",
                        }}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <span
                      className="text-sm tabular-nums shrink-0"
                      style={{ color: "rgba(10,9,8,0.6)" }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-6 py-4"
                style={{ borderTop: "1px solid rgba(94,80,63,0.08)" }}
              >
                <div className="flex justify-between mb-4">
                  <span
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ color: "rgba(94,80,63,0.5)" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="text-base font-medium tabular-nums"
                    style={{ color: "rgba(10,9,8,0.85)" }}
                  >
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <Link href="/cart" onClick={() => setMobileOpen(false)}>
                  <motion.button
                    className="w-full py-3.5 rounded-full text-[11px] tracking-[0.25em] uppercase cursor-pointer"
                    style={{
                      background: "#0a0908",
                      color: "#eae0d5",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Cart & Checkout
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
