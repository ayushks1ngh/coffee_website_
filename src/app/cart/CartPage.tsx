"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, itemCount } =
    useCart();

  const TAX_RATE = 0.08;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <PageShell theme="light">
      {/* ── Hero ── */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-[10px] tracking-[0.5em] uppercase block mb-6"
          style={{ color: "rgba(94,80,63,0.5)" }}
        >
          Your Order
        </span>
        <h1
          className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-4"
          style={{ color: "#0a0908" }}
        >
          YOUR CART
        </h1>
        <div
          className="w-16 h-[1px] mb-4"
          style={{ background: "rgba(94,80,63,0.25)" }}
        />
        <p
          className="text-base font-light"
          style={{ color: "rgba(90,70,50,0.5)" }}
        >
          {itemCount === 0
            ? "Your cup awaits."
            : `${itemCount} item${itemCount > 1 ? "s" : ""} in your cart`}
        </p>
      </motion.div>

      {/* ── Empty State ── */}
      {items.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="text-6xl mb-6 opacity-20"
            style={{ color: "rgba(94,80,63,0.5)" }}
          >
            ☕
          </div>
          <p
            className="text-xl font-light italic mb-8"
            style={{ color: "rgba(90,70,50,0.4)" }}
          >
            Your cup awaits.
          </p>
          <Link href="/menu">
            <motion.button
              className="bg-[#0a0908] text-[#eae0d5] px-8 py-3.5 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Browse Menu
            </motion.button>
          </Link>
        </motion.div>
      )}

      {/* ── Cart Items ── */}
      {items.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Items */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  className="flex gap-4 md:gap-6 p-4 md:p-6 rounded-2xl mb-4"
                  style={{
                    background: "rgba(10,9,8,0.025)",
                    border: "1px solid rgba(94,80,63,0.08)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.06 * idx,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-black">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base md:text-lg font-light tracking-tight mb-1"
                      style={{ color: "rgba(10,9,8,0.85)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-[10px] tracking-[0.25em] uppercase mb-3"
                      style={{ color: "rgba(94,80,63,0.4)" }}
                    >
                      {item.size}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-sm"
                        style={{
                          background: "rgba(10,9,8,0.05)",
                          color: "rgba(10,9,8,0.5)",
                          border: "1px solid rgba(94,80,63,0.1)",
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        −
                      </motion.button>
                      <span
                        className="text-sm tabular-nums w-6 text-center font-medium"
                        style={{ color: "rgba(10,9,8,0.7)" }}
                      >
                        {item.quantity}
                      </span>
                      <motion.button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-sm"
                        style={{
                          background: "rgba(10,9,8,0.05)",
                          color: "rgba(10,9,8,0.5)",
                          border: "1px solid rgba(94,80,63,0.1)",
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <span
                      className="text-lg font-light tabular-nums"
                      style={{ color: "rgba(139,116,90,0.7)" }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <motion.button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] tracking-[0.2em] uppercase cursor-pointer mt-2"
                      style={{ color: "rgba(94,80,63,0.35)" }}
                      whileHover={{ color: "rgba(180,60,60,0.7)" }}
                    >
                      Remove
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right: Summary */}
          <motion.div
            className="lg:w-80 xl:w-96"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="rounded-2xl p-6 md:p-8 sticky top-28"
              style={{
                background: "rgba(10,9,8,0.03)",
                border: "1px solid rgba(94,80,63,0.08)",
              }}
            >
              <h3
                className="text-[11px] tracking-[0.4em] uppercase mb-6"
                style={{ color: "rgba(94,80,63,0.4)" }}
              >
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span
                    className="text-sm font-light"
                    style={{ color: "rgba(90,70,50,0.5)" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="text-sm font-light tabular-nums"
                    style={{ color: "rgba(10,9,8,0.7)" }}
                  >
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className="text-sm font-light"
                    style={{ color: "rgba(90,70,50,0.5)" }}
                  >
                    Tax (8%)
                  </span>
                  <span
                    className="text-sm font-light tabular-nums"
                    style={{ color: "rgba(10,9,8,0.7)" }}
                  >
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div
                  className="h-[1px] my-4"
                  style={{ background: "rgba(94,80,63,0.1)" }}
                />
                <div className="flex justify-between">
                  <span
                    className="text-base font-medium"
                    style={{ color: "rgba(10,9,8,0.8)" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-xl font-light tabular-nums"
                    style={{ color: "rgba(10,9,8,0.9)" }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <motion.button
                  className="w-full py-4 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #0a0908 0%, #1a1816 100%)",
                    color: "#eae0d5",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Proceed to Checkout
                </motion.button>
              </Link>

              <Link href="/menu" className="block mt-4">
                <p
                  className="text-center text-xs tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: "rgba(94,80,63,0.4)" }}
                >
                  ← Continue Shopping
                </p>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </PageShell>
  );
}
