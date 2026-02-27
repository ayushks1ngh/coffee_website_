"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { useCart } from "@/context/CartContext";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  // Auto-clear cart on mount (safety net)
  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageShell theme="light">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Success Icon */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(94,80,63,0.06)",
              border: "2px solid rgba(94,80,63,0.15)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {/* Inner check */}
            <motion.div
              className="text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              ✓
            </motion.div>
          </motion.div>

          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(198,172,143,0.15) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2.5, opacity: [0, 0.6, 0] }}
            transition={{ delay: 0.4, duration: 1.2 }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <span
            className="text-[10px] tracking-[0.5em] uppercase block mb-4"
            style={{ color: "rgba(94,80,63,0.5)" }}
          >
            Confirmed
          </span>
          <h1
            className="text-4xl md:text-6xl font-light tracking-tight mb-4"
            style={{ color: "#0a0908" }}
          >
            ORDER CONFIRMED
          </h1>
          <div
            className="w-12 h-[1px] mx-auto mb-6"
            style={{ background: "rgba(94,80,63,0.25)" }}
          />
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-base md:text-lg font-light italic max-w-md mb-10"
          style={{ color: "rgba(90,70,50,0.5)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Your coffee is being prepared with precision. Every detail matters.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="px-8 py-3.5 rounded-full text-sm tracking-[0.2em] uppercase cursor-pointer"
              style={{
                background: "#0a0908",
                color: "#eae0d5",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Back to Home
            </motion.button>
          </Link>
          <Link href="/menu">
            <motion.button
              className="px-8 py-3.5 rounded-full text-sm tracking-[0.2em] uppercase cursor-pointer"
              style={{
                background: "transparent",
                color: "rgba(94,80,63,0.6)",
                border: "1px solid rgba(94,80,63,0.2)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Order Again
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </PageShell>
  );
}
