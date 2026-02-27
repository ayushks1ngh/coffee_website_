"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LocationCardProps {
  city: string;
  address: string;
  image: string;
  hours: string;
  mapLink: string;
  index: number;
}

export default function LocationCard({
  city,
  address,
  image,
  hours,
  mapLink,
  index,
}: LocationCardProps) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(10,9,8,0.03)",
        border: "1px solid rgba(94,80,63,0.1)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.7,
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        transition: { duration: 0.35, ease: "easeOut" },
      }}
    >
      {/* Store Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={`Coffee Crave ${city}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(10,9,8,0.6) 100%)",
          }}
        />
        {/* City name overlay */}
        <span
          className="absolute bottom-4 left-5 text-lg md:text-xl font-light tracking-tight text-white/90"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          {city}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 md:p-6">
        {/* Address */}
        <p
          className="text-sm font-light leading-relaxed mb-3"
          style={{ color: "rgba(90,70,50,0.7)" }}
        >
          {address}
        </p>

        {/* Hours */}
        <p
          className="text-[11px] tracking-[0.15em] uppercase mb-5"
          style={{ color: "rgba(94,80,63,0.45)" }}
        >
          {hours}
        </p>

        {/* Get Directions Button */}
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            className="w-full py-3 rounded-full text-[11px] tracking-[0.25em] uppercase cursor-pointer transition-all duration-300"
            style={{
              background: "rgba(10,9,8,0.06)",
              color: "rgba(90,70,50,0.7)",
              border: "1px solid rgba(94,80,63,0.12)",
            }}
            whileHover={{
              background: "rgba(10,9,8,0.9)",
              color: "rgba(234,224,213,1)",
              borderColor: "rgba(10,9,8,0.9)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            Get Directions
          </motion.button>
        </a>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(198,172,143,0.08) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
