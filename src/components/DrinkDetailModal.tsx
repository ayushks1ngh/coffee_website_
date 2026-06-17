"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

// ── Types ──
export interface DrinkData {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  origin: string;
  temp: string;
  flavorNotes: string[];
  ingredients: string[];
  tags: string[];
}

interface DrinkDetailModalProps {
  drink: DrinkData | null;
  onClose: () => void;
}

const SIZES = [
  { label: "Small", multiplier: 1 },
  { label: "Medium", multiplier: 1.3 },
  { label: "Large", multiplier: 1.6 },
] as const;

type SizeLabel = (typeof SIZES)[number]["label"];

export default function DrinkDetailModal({
  drink,
  onClose,
}: DrinkDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<SizeLabel>("Medium");
  const { addToCart } = useCart();

  if (!drink) return null;

  const sizeData = SIZES.find((s) => s.label === selectedSize)!;
  const adjustedPrice = (drink.price * sizeData.multiplier).toFixed(2);

  const handleAddToOrder = () => {
    addToCart({
      productId: drink.id,
      name: drink.name,
      size: selectedSize,
      price: parseFloat(adjustedPrice),
      image: drink.image,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {drink && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] cursor-pointer"
            style={{ background: "rgba(10,9,8,0.7)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative pointer-events-auto w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10"
              style={{
                background: "linear-gradient(180deg, #0a0908 0%, #141210 100%)",
                border: "1px solid rgba(94,80,63,0.15)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center text-almond_cream/40 hover:text-almond_cream/80 transition-colors duration-300 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Left: Image */}
                <div className="relative flex-shrink-0 w-full md:w-[45%]">
                  <div
                    className="relative aspect-square rounded-2xl overflow-hidden"
                    style={{ background: "rgba(20,18,16,1)" }}
                  >
                    <Image
                      src={drink.image}
                      alt={drink.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />

                    {/* Ambient glow behind image */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 80%, rgba(139,116,90,0.15) 0%, transparent 60%)",
                      }}
                    />
                  </div>

                  {/* Origin badge */}
                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                      style={{
                        color: "rgba(198,172,143,0.6)",
                        background: "rgba(198,172,143,0.08)",
                      }}
                    >
                      {drink.origin}
                    </span>
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                      style={{
                        color: "rgba(198,172,143,0.6)",
                        background: "rgba(198,172,143,0.08)",
                      }}
                    >
                      {drink.temp}
                    </span>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Name + Price */}
                  <div>
                    <span
                      className="text-[10px] tracking-[0.5em] uppercase block mb-3"
                      style={{ color: "rgba(198,172,143,0.4)" }}
                    >
                      {drink.tags.join(" · ")}
                    </span>

                    <h2
                      className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-3"
                      style={{ color: "rgba(234,224,213,0.9)" }}
                    >
                      {drink.name}
                    </h2>

                    <span
                      className="text-2xl md:text-3xl font-light tabular-nums block mb-6"
                      style={{ color: "rgba(198,172,143,0.7)" }}
                    >
                      ${adjustedPrice}
                    </span>

                    {/* Divider */}
                    <div
                      className="w-12 h-[1px] mb-6"
                      style={{ background: "rgba(94,80,63,0.2)" }}
                    />

                    {/* Description */}
                    <p
                      className="text-sm md:text-base font-light leading-[1.8] mb-6"
                      style={{ color: "rgba(234,224,213,0.5)" }}
                    >
                      {drink.desc}
                    </p>

                    {/* Flavor Notes */}
                    <div className="mb-6">
                      <span
                        className="text-[10px] tracking-[0.4em] uppercase block mb-3"
                        style={{ color: "rgba(198,172,143,0.35)" }}
                      >
                        Flavor Notes
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {drink.flavorNotes.map((note) => (
                          <span
                            key={note}
                            className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                            style={{
                              color: "rgba(234,224,213,0.5)",
                              border: "1px solid rgba(94,80,63,0.15)",
                            }}
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Ingredients */}
                    <div className="mb-8">
                      <span
                        className="text-[10px] tracking-[0.4em] uppercase block mb-3"
                        style={{ color: "rgba(198,172,143,0.35)" }}
                      >
                        Ingredients
                      </span>
                      <p
                        className="text-xs font-light leading-relaxed"
                        style={{ color: "rgba(234,224,213,0.4)" }}
                      >
                        {drink.ingredients.join(" · ")}
                      </p>
                    </div>
                  </div>

                  {/* Size Selector + CTA */}
                  <div>
                    {/* Size Selector */}
                    <div className="mb-6">
                      <span
                        className="text-[10px] tracking-[0.4em] uppercase block mb-3"
                        style={{ color: "rgba(198,172,143,0.35)" }}
                      >
                        Size
                      </span>
                      <div className="flex gap-3">
                        {SIZES.map((size) => (
                          <button
                            key={size.label}
                            onClick={() => setSelectedSize(size.label)}
                            className="flex-1 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-300"
                            style={{
                              background:
                                selectedSize === size.label
                                  ? "rgba(234,224,213,0.9)"
                                  : "rgba(234,224,213,0.05)",
                              color:
                                selectedSize === size.label
                                  ? "#0a0908"
                                  : "rgba(234,224,213,0.4)",
                              border: `1px solid ${
                                selectedSize === size.label
                                  ? "rgba(234,224,213,0.9)"
                                  : "rgba(94,80,63,0.15)"
                              }`,
                            }}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to Order */}
                    <motion.button
                      onClick={handleAddToOrder}
                      className="w-full py-4 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #c6ac8f 0%, #8b745a 100%)",
                        color: "#0a0908",
                        border: "none",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      Add to Order — ${adjustedPrice}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
