"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";

const LOCATIONS = [
  {
    name: "Flagship Studio",
    address: "42 Precision Lane, Roast District",
    city: "Melbourne, VIC 3000",
    hours: "Mon–Fri 7AM–5PM · Sat–Sun 8AM–3PM",
    mapQuery: "Melbourne+VIC+3000+Australia",
  },
  {
    name: "Tasting Lab",
    address: "18 Extraction Row, Specialty Quarter",
    city: "Sydney, NSW 2000",
    hours: "Mon–Sat 8AM–4PM · Sun Closed",
    mapQuery: "Sydney+NSW+2000+Australia",
  },
];

export default function LocationsPage() {
  return (
    <PageShell theme="light">
      {/* Page Header */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-[10px] tracking-[0.5em] uppercase block mb-6"
          style={{ color: "rgba(94,80,63,0.5)" }}
        >
          Visit Us
        </span>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-6"
          style={{ color: "#0a0908" }}
        >
          OUR LOCATIONS
        </h1>
        <div className="w-16 h-[1px] mb-6" style={{ background: "rgba(94,80,63,0.25)" }} />
        <p
          className="text-base md:text-lg font-light leading-relaxed max-w-xl"
          style={{ color: "rgba(90,70,50,0.6)" }}
        >
          Experience Coffee Crave in person. Taste the precision, feel the craft, discover the space.
        </p>
      </motion.div>

      {/* Locations */}
      <div className="flex flex-col gap-20">
        {LOCATIONS.map((loc, idx) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2 * (idx + 1),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Location Details */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2
                  className="text-2xl md:text-3xl font-light tracking-tight mb-2"
                  style={{ color: "rgba(10,9,8,0.85)" }}
                >
                  {loc.name}
                </h2>
                <p className="text-sm font-light" style={{ color: "rgba(90,70,50,0.5)" }}>
                  {loc.address}
                  <br />
                  {loc.city}
                </p>
              </div>
              <p
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "rgba(94,80,63,0.45)" }}
              >
                {loc.hours}
              </p>
            </div>

            {/* Map Container */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(94,80,63,0.1)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
              }}
            >
              <iframe
                title={`${loc.name} Map`}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${loc.mapQuery}&zoom=14&maptype=roadmap`}
                width="100%"
                height="400"
                className="block"
                style={{
                  border: 0,
                  filter: "saturate(0.85) contrast(1.05) brightness(0.95)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Subtle vignette overlay matching theme */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(234,224,213,0.15) 0%, transparent 20%, transparent 80%, rgba(234,224,213,0.2) 100%)",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
