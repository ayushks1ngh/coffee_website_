"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import { useCart } from "@/context/CartContext";

interface LocationData {
  id: string;
  city: string;
  address: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const TAX_RATE = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.08);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const [locations, setLocations] = useState<LocationData[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location_id: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((d) => {
        setLocations(d.locations || []);
        if (d.locations?.length) setForm((f) => ({ ...f, location_id: d.locations[0].id }));
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        location_id: form.location_id,
        items: items.map((i) => ({
          product_id: i.productId || i.id.split("-").slice(0, -2).join("-"),
          size: i.size,
          quantity: i.quantity,
        })),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setSubmitting(false);
      return;
    }

    clearCart();
    router.push("/order-success");
  };

  const isValid =
    form.name.trim() && form.email.trim() && form.phone.trim();

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
          Almost There
        </span>
        <h1
          className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-4"
          style={{ color: "#0a0908" }}
        >
          CHECKOUT
        </h1>
        <div
          className="w-16 h-[1px]"
          style={{ background: "rgba(94,80,63,0.25)" }}
        />
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p
            className="text-lg font-light italic mb-6"
            style={{ color: "rgba(90,70,50,0.4)" }}
          >
            Nothing to checkout yet.
          </p>
          <button
            onClick={() => router.push("/menu")}
            className="bg-[#0a0908] text-[#eae0d5] px-8 py-3.5 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer"
          >
            Browse Menu
          </button>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
        >
          {/* Left: Customer Details */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="text-[11px] tracking-[0.4em] uppercase mb-8"
              style={{ color: "rgba(94,80,63,0.4)" }}
            >
              Customer Details
            </h2>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="block text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "rgba(94,80,63,0.4)" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl text-sm font-light outline-none transition-all duration-300"
                  style={{
                    background: "rgba(10,9,8,0.025)",
                    border: "1px solid rgba(94,80,63,0.1)",
                    color: "rgba(10,9,8,0.8)",
                  }}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "rgba(94,80,63,0.4)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl text-sm font-light outline-none transition-all duration-300"
                  style={{
                    background: "rgba(10,9,8,0.025)",
                    border: "1px solid rgba(94,80,63,0.1)",
                    color: "rgba(10,9,8,0.8)",
                  }}
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "rgba(94,80,63,0.4)" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl text-sm font-light outline-none transition-all duration-300"
                  style={{
                    background: "rgba(10,9,8,0.025)",
                    border: "1px solid rgba(94,80,63,0.1)",
                    color: "rgba(10,9,8,0.8)",
                  }}
                  placeholder="+91 000 000 0000"
                />
              </div>

              {/* Pickup Location */}
              <div>
                <label
                  className="block text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "rgba(94,80,63,0.4)" }}
                >
                  Pickup Location
                </label>
                <select
                  name="location_id"
                  value={form.location_id}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl text-sm font-light outline-none cursor-pointer transition-all duration-300 appearance-none"
                  style={{
                    background: "rgba(10,9,8,0.025)",
                    border: "1px solid rgba(94,80,63,0.1)",
                    color: "rgba(10,9,8,0.8)",
                  }}
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.city} — {loc.address}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}
            </div>
          </motion.div>

          {/* Right: Order Summary */}
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

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-light truncate"
                        style={{ color: "rgba(10,9,8,0.7)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: "rgba(94,80,63,0.35)" }}
                      >
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <span
                      className="text-sm tabular-nums font-light"
                      style={{ color: "rgba(139,116,90,0.6)" }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="h-[1px] mb-4"
                style={{ background: "rgba(94,80,63,0.1)" }}
              />

              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span
                    className="text-sm font-light"
                    style={{ color: "rgba(90,70,50,0.5)" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="text-sm tabular-nums"
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
                    className="text-sm tabular-nums"
                    style={{ color: "rgba(10,9,8,0.7)" }}
                  >
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div
                  className="h-[1px] my-3"
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

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!isValid || submitting}
                className="w-full py-4 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #c6ac8f 0%, #8b745a 100%)",
                  color: "#0a0908",
                }}
                whileHover={isValid && !submitting ? { scale: 1.02 } : {}}
                whileTap={isValid && !submitting ? { scale: 0.97 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </motion.button>
            </div>
          </motion.div>
        </form>
      )}
    </PageShell>
  );
}
