"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const CATEGORIES = ["All", "Signature", "Cold", "Hot", "Seasonal"] as const;

type Category = (typeof CATEGORIES)[number];

interface Drink {
  name: string;
  desc: string;
  price: string;
  tags: Category[];
  origin: string;
  temp: string;
}

const DRINKS: Drink[] = [
  {
    name: "Classic Iced Latte",
    desc: "Ethiopian Arabica slow-pulled through velvet milk over a 12-hour cold steep. Structured sweetness, zero bitterness.",
    price: "$6.50",
    tags: ["Signature", "Cold"],
    origin: "Ethiopia · Yirgacheffe",
    temp: "3°C Serve",
  },
  {
    name: "Cold Brew Reserve",
    desc: "Colombian single-origin steeped for 18 hours. Concentrated clarity with dark chocolate and walnut undertones.",
    price: "$7.00",
    tags: ["Cold"],
    origin: "Colombia · Huila",
    temp: "4°C Serve",
  },
  {
    name: "Caramel Espresso",
    desc: "Brazilian Cerrado pulled at 9-bar with house-made salted caramel. Creamy, bold, architecturally balanced.",
    price: "$7.50",
    tags: ["Signature", "Cold"],
    origin: "Brazil · Cerrado",
    temp: "3°C Serve",
  },
  {
    name: "Double Espresso",
    desc: "Single-origin precision pulled. 25-second extraction at 93°C yields concentrated depth with a hazelnut finish.",
    price: "$4.50",
    tags: ["Hot"],
    origin: "Guatemala · Antigua",
    temp: "93°C Extract",
  },
  {
    name: "Flat White",
    desc: "Velvet microfoam over a double ristretto. The ratio is engineered — not approximated. Silk texture, no waste.",
    price: "$5.50",
    tags: ["Hot"],
    origin: "Kenya · Nyeri",
    temp: "65°C Serve",
  },
  {
    name: "Cortado",
    desc: "Equal parts espresso and steamed milk. Bold clarity meets smooth warmth. No distractions, no excess.",
    price: "$5.00",
    tags: ["Hot"],
    origin: "Costa Rica · Tarrazú",
    temp: "62°C Serve",
  },
  {
    name: "Honey Oat Latte",
    desc: "Raw honey folded into toasted oat milk, layered over a medium-roast pull. Cinnamon finish, seasonal only.",
    price: "$7.50",
    tags: ["Seasonal", "Cold"],
    origin: "Peru · Cajamarca",
    temp: "4°C Serve",
  },
  {
    name: "Matcha Cold Brew",
    desc: "Ceremonial-grade matcha slow-infused into our signature cold brew. Green earth meets dark roast. Limited runs.",
    price: "$8.00",
    tags: ["Seasonal", "Cold"],
    origin: "Japan · Uji",
    temp: "3°C Serve",
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? DRINKS
      : DRINKS.filter((d) => d.tags.includes(activeCategory));

  return (
    <PageShell theme="light">
      {/* ── Hero Header ── */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-[10px] tracking-[0.5em] uppercase block mb-6"
          style={{ color: "rgba(94,80,63,0.5)" }}
        >
          The Collection
        </span>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-6"
          style={{ color: "#0a0908" }}
        >
          OUR MENU
        </h1>
        <div className="w-16 h-[1px] mb-6" style={{ background: "rgba(94,80,63,0.25)" }} />
        <p
          className="text-base md:text-lg font-light leading-relaxed max-w-xl"
          style={{ color: "rgba(90,70,50,0.6)" }}
        >
          Each creation is engineered for a specific moment. Single-origin beans,
          precise extraction, zero compromise.
        </p>
      </motion.div>

      {/* ── Category Tabs ── */}
      <motion.div
        className="flex flex-wrap gap-2 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase cursor-pointer
              transition-all duration-300 border
              ${activeCategory === cat
                ? "bg-[#0a0908] text-[#eae0d5] border-transparent"
                : "bg-transparent border-stone_brown/15 hover:border-stone_brown/30"
              }
            `}
            style={{
              color: activeCategory === cat ? "#eae0d5" : "rgba(94,80,63,0.6)",
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* ── Drink Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((drink, idx) => (
            <motion.div
              key={drink.name}
              layout
              className="group relative rounded-2xl p-8 md:p-10 cursor-default transition-all duration-500"
              style={{
                background: "rgba(10,9,8,0.025)",
                border: "1px solid rgba(94,80,63,0.08)",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.97 }}
              transition={{
                duration: 0.5,
                delay: 0.06 * idx,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 },
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(198,172,143,0.08) 0%, transparent 70%)",
                  border: "1px solid rgba(94,80,63,0.12)",
                  borderRadius: "1rem",
                }}
              />

              {/* Top row: price + temp */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-2xl md:text-3xl font-light tabular-nums"
                  style={{ color: "rgba(139,116,90,0.6)" }}
                >
                  {drink.price}
                </span>
                <span
                  className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                  style={{
                    color: "rgba(94,80,63,0.5)",
                    background: "rgba(94,80,63,0.06)",
                  }}
                >
                  {drink.temp}
                </span>
              </div>

              {/* Name */}
              <h3
                className="text-xl md:text-2xl font-light tracking-tight leading-[1.2] mb-3"
                style={{ color: "rgba(10,9,8,0.85)" }}
              >
                {drink.name}
              </h3>

              {/* Origin */}
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-5"
                style={{ color: "rgba(94,80,63,0.4)" }}
              >
                {drink.origin}
              </p>

              {/* Divider */}
              <div
                className="w-8 h-[1px] mb-5 group-hover:w-12 transition-all duration-500"
                style={{ background: "rgba(94,80,63,0.2)" }}
              />

              {/* Description */}
              <p
                className="text-sm font-light leading-[1.7]"
                style={{ color: "rgba(90,70,50,0.55)" }}
              >
                {drink.desc}
              </p>

              {/* Tags */}
              <div className="flex gap-2 mt-6">
                {drink.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      color: "rgba(94,80,63,0.45)",
                      border: "1px solid rgba(94,80,63,0.1)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Order CTA ── */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-sm font-light tracking-wide mb-6"
          style={{ color: "rgba(90,70,50,0.5)" }}
        >
          Roasted to order · Dispatched within 24 hours · Global shipping
        </p>
        <Link href="/contact">
          <motion.button
            className="bg-[#0a0908] text-[#eae0d5] px-10 py-4 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Place an Order
          </motion.button>
        </Link>
      </motion.div>
    </PageShell>
  );
}
