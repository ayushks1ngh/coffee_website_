"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import LocationCard from "@/components/LocationCard";

const LOCATIONS = [
  {
    city: "Lucknow",
    address: "Hazratganj Square, 14 Mahatma Gandhi Marg",
    image: "/locations/lucknow.webp",
    hours: "Mon–Sat 8AM–10PM · Sun 9AM–8PM",
    mapLink: "https://www.google.com/maps?q=Hazratganj+Lucknow",
  },
  {
    city: "New Delhi",
    address: "Connaught Place, Block A, Regal Building",
    image: "/locations/delhi.webp",
    hours: "Mon–Fri 7AM–11PM · Sat–Sun 8AM–10PM",
    mapLink: "https://www.google.com/maps?q=Connaught+Place+New+Delhi",
  },
  {
    city: "Mumbai",
    address: "Colaba Causeway, Kala Ghoda Arts District",
    image: "/locations/mumbai.webp",
    hours: "Mon–Sun 7AM–11PM",
    mapLink: "https://www.google.com/maps?q=Kala+Ghoda+Mumbai",
  },
  {
    city: "Dubai",
    address: "DIFC Gate Avenue, Level 2, Tower 3",
    image: "/locations/dubai.webp",
    hours: "Sun–Thu 7AM–12AM · Fri–Sat 8AM–1AM",
    mapLink: "https://www.google.com/maps?q=DIFC+Gate+Avenue+Dubai",
  },
  {
    city: "London",
    address: "Shoreditch High St, 42 Redchurch Street",
    image: "/locations/london.webp",
    hours: "Mon–Fri 7AM–7PM · Sat 8AM–6PM · Sun 9AM–5PM",
    mapLink: "https://www.google.com/maps?q=Redchurch+Street+Shoreditch+London",
  },
  {
    city: "Singapore",
    address: "Tiong Bahru, 78 Guan Chuan Street",
    image: "/locations/singapore.webp",
    hours: "Mon–Sun 7:30AM–9PM",
    mapLink: "https://www.google.com/maps?q=Tiong+Bahru+Singapore",
  },
];

export default function LocationsPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const philRef = useRef<HTMLDivElement>(null);

  const mapInView = useInView(mapRef, { once: true, margin: "-10%" });
  const philInView = useInView(philRef, { once: true, margin: "-10%" });

  return (
    <PageShell theme="light">
      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <motion.div
        className="mb-20 md:mb-28"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-[10px] tracking-[0.5em] uppercase block mb-6"
          style={{ color: "rgba(94,80,63,0.5)" }}
        >
          Our Locations
        </span>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-6"
          style={{ color: "#0a0908" }}
        >
          FIND COFFEE CRAVE
          <br />
          <span style={{ color: "rgba(139,116,90,0.7)" }}>NEAR YOU</span>
        </h1>
        <div
          className="w-16 h-[1px] mb-6"
          style={{ background: "rgba(94,80,63,0.25)" }}
        />
        <p
          className="text-base md:text-lg font-light leading-relaxed max-w-xl"
          style={{ color: "rgba(90,70,50,0.6)" }}
        >
          Precision-crafted coffee experiences across curated locations.
        </p>
      </motion.div>

      {/* ══════════════════════════════════════
          LOCATIONS GRID
      ══════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-28 md:mb-36">
        {LOCATIONS.map((loc, idx) => (
          <LocationCard
            key={loc.city}
            city={loc.city}
            address={loc.address}
            image={loc.image}
            hours={loc.hours}
            mapLink={loc.mapLink}
            index={idx}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════
          INTERACTIVE MAP
      ══════════════════════════════════════ */}
      <motion.div
        ref={mapRef}
        className="mb-28 md:mb-36"
        initial={{ opacity: 0, y: 40 }}
        animate={mapInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <span
            className="text-[10px] tracking-[0.5em] uppercase block mb-4"
            style={{ color: "rgba(94,80,63,0.45)" }}
          >
            Worldwide
          </span>
          <h2
            className="text-3xl md:text-5xl font-light tracking-tight mb-4"
            style={{ color: "#0a0908" }}
          >
            Global Coffee Presence
          </h2>
          <div
            className="w-10 h-[1px] mx-auto"
            style={{ background: "rgba(94,80,63,0.2)" }}
          />
        </div>

        {/* Map Embed */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(94,80,63,0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          <iframe
            title="Coffee Crave Global Presence"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30000000!2d78.9629!3d20.5937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2s!4v1"
            width="100%"
            height="500"
            className="block h-[350px] md:h-[500px]"
            style={{
              border: 0,
              filter: "saturate(0.85) contrast(1.05) brightness(0.95)",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(234,224,213,0.12) 0%, transparent 15%, transparent 85%, rgba(234,224,213,0.15) 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* ══════════════════════════════════════
          LOCATION PHILOSOPHY
      ══════════════════════════════════════ */}
      <motion.div
        ref={philRef}
        className="text-center max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={philInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-[10px] tracking-[0.5em] uppercase block mb-6"
          style={{ color: "rgba(94,80,63,0.4)" }}
        >
          The Philosophy
        </span>

        <p
          className="text-xl md:text-2xl lg:text-3xl font-light italic leading-[1.5] tracking-tight mb-8"
          style={{
            color: "rgba(10,9,8,0.75)",
            textShadow: "0 1px 10px rgba(0,0,0,0.03)",
          }}
        >
          Every Coffee Crave location is engineered as a sensory environment
          — balancing design, aroma, and precision brewing.
        </p>

        <div
          className="w-12 h-[1px] mx-auto mb-6"
          style={{ background: "rgba(94,80,63,0.2)" }}
        />

        <p
          className="text-sm font-light tracking-wide"
          style={{ color: "rgba(90,70,50,0.45)" }}
        >
          Architecture meets ritual. Space meets precision.
        </p>
      </motion.div>
    </PageShell>
  );
}
