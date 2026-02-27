"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import DrinkDetailModal, { DrinkData } from "@/components/DrinkDetailModal";
import StickyCart from "@/components/StickyCart";
import { useCart } from "@/context/CartContext";

// ── Categories ──
const CATEGORIES = [
  "All",
  "Iced Coffee",
  "Espresso",
  "Signature",
  "Cold Brew",
  "Specials",
] as const;

type Category = (typeof CATEGORIES)[number];

// ── Drink Catalog ──
const DRINKS: DrinkData[] = [
  {
    name: "Iced Latte",
    desc: "Ethiopian Arabica slow-pulled through velvet milk over a 12-hour cold steep. Structured sweetness, zero bitterness.",
    price: 6.5,
    image: "/drinks/iced-latte.png",
    origin: "Ethiopia · Yirgacheffe",
    temp: "3°C Serve",
    flavorNotes: ["Caramel", "Silk Milk", "Citrus"],
    ingredients: [
      "Ethiopian Arabica",
      "Whole Milk",
      "Filtered Ice",
      "Raw Cane Sugar",
    ],
    tags: ["Iced Coffee", "Signature"],
  },
  {
    name: "Vanilla Cold Brew",
    desc: "Colombian single-origin steeped for 18 hours then infused with Madagascar vanilla. Concentrated clarity with a sweet finish.",
    price: 7.0,
    image: "/drinks/vanilla-cold-brew.png",
    origin: "Colombia · Huila",
    temp: "4°C Serve",
    flavorNotes: ["Vanilla", "Dark Chocolate", "Walnut"],
    ingredients: [
      "Colombian Beans",
      "Madagascar Vanilla",
      "Filtered Water",
      "Organic Sugar",
    ],
    tags: ["Cold Brew", "Iced Coffee"],
  },
  {
    name: "Caramel Latte",
    desc: "Brazilian Cerrado pulled at 9-bar with house-made salted caramel. Creamy, bold, architecturally balanced.",
    price: 7.5,
    image: "/drinks/caramel-latte.png",
    origin: "Brazil · Cerrado",
    temp: "3°C Serve",
    flavorNotes: ["Salted Caramel", "Toffee", "Cream"],
    ingredients: [
      "Brazilian Beans",
      "Salted Caramel",
      "Steamed Milk",
      "Vanilla Extract",
    ],
    tags: ["Iced Coffee", "Signature"],
  },
  {
    name: "Classic Espresso",
    desc: "Single-origin precision pulled. 25-second extraction at 93°C yields concentrated depth with a hazelnut finish.",
    price: 4.5,
    image: "/drinks/classic-espresso.png",
    origin: "Guatemala · Antigua",
    temp: "93°C Extract",
    flavorNotes: ["Hazelnut", "Dark Cocoa", "Smoke"],
    ingredients: ["Guatemalan Single-Origin", "Filtered Water"],
    tags: ["Espresso"],
  },
  {
    name: "Double Shot",
    desc: "Two precisely timed pulls layered for maximum intensity. Bold without harshness, structured without excess.",
    price: 5.0,
    image: "/drinks/double-shot.png",
    origin: "Kenya · Nyeri",
    temp: "92°C Extract",
    flavorNotes: ["Black Cherry", "Molasses", "Spice"],
    ingredients: ["Kenyan AA Beans", "Filtered Water"],
    tags: ["Espresso"],
  },
  {
    name: "Flat White",
    desc: "Velvet microfoam over a double ristretto. The ratio is engineered — not approximated. Silk texture, no waste.",
    price: 5.5,
    image: "/drinks/flat-white.png",
    origin: "Costa Rica · Tarrazú",
    temp: "65°C Serve",
    flavorNotes: ["Honey", "Almond", "Silk"],
    ingredients: ["Costa Rican Beans", "Microfoam Milk", "Filtered Water"],
    tags: ["Espresso", "Signature"],
  },
  {
    name: "Coffee Crave Special",
    desc: "Our house creation — a layered experience of espresso, exotic spices, and vanilla cream. Limited runs, unlimited depth.",
    price: 8.5,
    image: "/drinks/cc-special.png",
    origin: "Multi-Origin Blend",
    temp: "4°C Serve",
    flavorNotes: ["Cardamom", "Vanilla", "Gold Shimmer"],
    ingredients: [
      "House Blend",
      "Cardamom",
      "Vanilla Cream",
      "Edible Gold",
    ],
    tags: ["Signature", "Specials"],
  },
  {
    name: "Hazelnut Fusion",
    desc: "Toasted hazelnuts folded into a medium-roast cold brew. Nutty sweetness, zero artificial flavoring, all craft.",
    price: 7.5,
    image: "/drinks/hazelnut-fusion.png",
    origin: "Peru · Cajamarca",
    temp: "4°C Serve",
    flavorNotes: ["Toasted Hazelnut", "Butterscotch", "Oak"],
    ingredients: [
      "Peruvian Beans",
      "Crushed Hazelnuts",
      "Oat Milk",
      "Raw Honey",
    ],
    tags: ["Signature", "Cold Brew"],
  },
  {
    name: "Mocha Velvet",
    desc: "Belgian dark chocolate meets double espresso in a velvety marriage. Rich, indulgent, architecturally layered.",
    price: 8.0,
    image: "/drinks/mocha-velvet.png",
    origin: "Ethiopia · Sidamo",
    temp: "3°C Serve",
    flavorNotes: ["Dark Chocolate", "Raspberry", "Velvet"],
    ingredients: [
      "Ethiopian Beans",
      "Belgian Chocolate",
      "Steamed Milk",
      "Cocoa Powder",
    ],
    tags: ["Signature", "Specials"],
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedDrink, setSelectedDrink] = useState<DrinkData | null>(null);
  const { addToCart, toast } = useCart();

  const filtered =
    activeCategory === "All"
      ? DRINKS
      : DRINKS.filter((d) => d.tags.includes(activeCategory));

  /** Quick-add handler — adds as Medium by default */
  const handleQuickAdd = (
    e: React.MouseEvent,
    drink: DrinkData
  ) => {
    e.stopPropagation(); // don't open modal
    addToCart({
      name: drink.name,
      price: drink.price,
      size: "Medium",
      image: drink.image,
    });
  };

  return (
    <PageShell theme="light">
      {/* ── Hero Header ── */}
      <motion.div
        className="mb-16 md:mb-20"
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
          CRAFTED WITH
          <br />
          <span style={{ color: "rgba(139,116,90,0.7)" }}>PRECISION</span>
        </h1>
        <div
          className="w-16 h-[1px] mb-6"
          style={{ background: "rgba(94,80,63,0.25)" }}
        />
        <p
          className="text-base md:text-lg font-light leading-relaxed max-w-xl"
          style={{ color: "rgba(90,70,50,0.6)" }}
        >
          Every Coffee Crave drink is engineered for balance, texture, and
          flavor.
        </p>
      </motion.div>

      {/* ── Category Tabs ── */}
      <motion.div
        className="flex flex-wrap gap-2 mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative px-5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-300 border"
            style={{
              background:
                activeCategory === cat ? "#0a0908" : "transparent",
              borderColor:
                activeCategory === cat
                  ? "transparent"
                  : "rgba(94,80,63,0.15)",
              color:
                activeCategory === cat
                  ? "#eae0d5"
                  : "rgba(94,80,63,0.6)",
            }}
          >
            {cat}
            {activeCategory === cat && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "#0a0908", zIndex: -1 }}
                layoutId="activeTab"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* ═══════════════════════════════════════════
          TWO-COLUMN LAYOUT — Grid + Sticky Cart
      ═══════════════════════════════════════════ */}
      <div className="flex gap-8 items-start">
        {/* ── Product Grid (expands to fill available space) ── */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((drink, idx) => (
                <motion.div
                  key={drink.name}
                  layout
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: "rgba(10,9,8,0.025)",
                    border: "1px solid rgba(94,80,63,0.08)",
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.97 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.06 * idx,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => setSelectedDrink(drink)}
                >
                  {/* Product Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
                    <Image
                      src={drink.image}
                      alt={drink.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 30%, rgba(10,9,8,0.7) 100%)",
                      }}
                    />

                    {/* Price tag */}
                    <span
                      className="absolute top-4 right-4 text-sm font-light tabular-nums px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(10,9,8,0.6)",
                        color: "rgba(234,224,213,0.9)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      ${drink.price.toFixed(2)}
                    </span>

                    {/* View Drink CTA — appears on hover */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span
                        className="text-[11px] tracking-[0.25em] uppercase px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "rgba(234,224,213,0.9)",
                          color: "#0a0908",
                        }}
                      >
                        View Drink
                      </span>
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 md:p-6">
                    {/* Name + Quick Add */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        className="text-lg md:text-xl font-light tracking-tight"
                        style={{ color: "rgba(10,9,8,0.85)" }}
                      >
                        {drink.name}
                      </h3>

                      {/* Quick-add button */}
                      <motion.button
                        onClick={(e) => handleQuickAdd(e, drink)}
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer"
                        style={{
                          background: "#0a0908",
                          color: "#eae0d5",
                        }}
                        whileHover={{
                          scale: 1.1,
                          filter: "brightness(1.2)",
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        aria-label={`Add ${drink.name} to cart`}
                      >
                        +
                      </motion.button>
                    </div>

                    {/* Origin */}
                    <p
                      className="text-[10px] tracking-[0.3em] uppercase mb-3"
                      style={{ color: "rgba(94,80,63,0.4)" }}
                    >
                      {drink.origin}
                    </p>

                    {/* Divider */}
                    <div
                      className="w-8 h-[1px] mb-3 group-hover:w-12 transition-all duration-500"
                      style={{ background: "rgba(94,80,63,0.2)" }}
                    />

                    {/* Short desc */}
                    <p
                      className="text-xs font-light leading-[1.7] line-clamp-2"
                      style={{ color: "rgba(90,70,50,0.5)" }}
                    >
                      {drink.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-1.5 mt-4">
                      {drink.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] tracking-[0.2em] uppercase px-2 py-1 rounded-full"
                          style={{
                            color: "rgba(94,80,63,0.4)",
                            border: "1px solid rgba(94,80,63,0.1)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(198,172,143,0.06) 0%, transparent 70%)",
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Bottom tagline ── */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-sm font-light tracking-wide mb-2"
              style={{ color: "rgba(90,70,50,0.5)" }}
            >
              Roasted to order · Dispatched within 24 hours · Global shipping
            </p>
          </motion.div>
        </div>

        {/* ── Sticky Side Cart (desktop only — mobile uses drawer) ── */}
        <StickyCart />
      </div>

      {/* ── Drink Detail Modal ── */}
      <AnimatePresence>
        {selectedDrink && (
          <DrinkDetailModal
            drink={selectedDrink}
            onClose={() => setSelectedDrink(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 px-6 py-3 rounded-full"
            style={{
              background: "rgba(10,9,8,0.9)",
              color: "rgba(234,224,213,0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(94,80,63,0.2)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm tracking-wide">✓ {toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
