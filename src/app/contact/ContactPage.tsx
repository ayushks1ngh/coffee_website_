"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const CONTACT_CHANNELS = [
  { label: "General Inquiries", value: "hello@coffeecrave.com" },
  { label: "Wholesale & Partners", value: "partners@coffeecrave.com" },
  { label: "Press & Media", value: "press@coffeecrave.com" },
];

const SOCIALS = [
  { label: "Instagram", href: "#", handle: "@coffeecrave" },
  { label: "Twitter/X", href: "#", handle: "@coffeecrave" },
  { label: "LinkedIn", href: "#", handle: "Coffee Crave" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        subject: data.get("subject"),
        message: data.get("message"),
      }),
    });
    setSubmitted(true);
  };

  return (
    <PageShell theme="light">
      {/* ── Header ── */}
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
          Connect
        </span>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-6"
          style={{ color: "#0a0908" }}
        >
          GET IN TOUCH
        </h1>
        <div className="w-16 h-[1px] mb-6" style={{ background: "rgba(94,80,63,0.25)" }} />
        <p
          className="text-base md:text-lg font-light leading-relaxed max-w-xl"
          style={{ color: "rgba(90,70,50,0.6)" }}
        >
          Whether you&apos;re a café owner, a journalist, or simply curious — we&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* ── Left Column: Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-xs tracking-[0.4em] uppercase mb-8 pb-3 border-b"
            style={{ color: "rgba(94,80,63,0.5)", borderColor: "rgba(94,80,63,0.12)" }}
          >
            Send a Message
          </h2>

          {submitted ? (
            <motion.div
              className="py-16 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-4xl mb-4 block">✓</span>
              <p className="text-lg font-light" style={{ color: "rgba(10,9,8,0.7)" }}>
                Message received. We&apos;ll be in touch within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "rgba(94,80,63,0.5)" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b py-3 text-base font-light outline-none transition-colors duration-300 focus:border-stone_brown/40"
                    style={{
                      color: "rgba(10,9,8,0.8)",
                      borderColor: "rgba(94,80,63,0.15)",
                    }}
                    placeholder="Your name" name="name"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "rgba(94,80,63,0.5)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b py-3 text-base font-light outline-none transition-colors duration-300 focus:border-stone_brown/40"
                    style={{
                      color: "rgba(10,9,8,0.8)",
                      borderColor: "rgba(94,80,63,0.15)",
                    }}
                    placeholder="you@email.com" name="email"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "rgba(94,80,63,0.5)" }}>
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b py-3 text-base font-light outline-none transition-colors duration-300 focus:border-stone_brown/40"
                  style={{
                    color: "rgba(10,9,8,0.8)",
                    borderColor: "rgba(94,80,63,0.15)",
                  }}
                  placeholder="What's this about?" name="subject"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "rgba(94,80,63,0.5)" }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-transparent border-b py-3 text-base font-light outline-none transition-colors duration-300 resize-none focus:border-stone_brown/40"
                  style={{
                    color: "rgba(10,9,8,0.8)",
                    borderColor: "rgba(94,80,63,0.15)",
                  }}
                  placeholder="Tell us more..." name="message"
                />
              </div>

              <motion.button
                type="submit"
                className="self-start bg-[#0a0908] text-[#eae0d5] px-8 py-3.5 rounded-full text-sm tracking-[0.2em] uppercase cursor-pointer mt-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* ── Right Column: Info ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-12"
        >
          {/* Email Channels */}
          <div>
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-8 pb-3 border-b"
              style={{ color: "rgba(94,80,63,0.5)", borderColor: "rgba(94,80,63,0.12)" }}
            >
              Email Us
            </h2>
            <div className="flex flex-col gap-6">
              {CONTACT_CHANNELS.map((ch) => (
                <div key={ch.label}>
                  <p className="text-sm font-light mb-1" style={{ color: "rgba(90,70,50,0.5)" }}>
                    {ch.label}
                  </p>
                  <a
                    href={`mailto:${ch.value}`}
                    className="text-base font-light tracking-tight transition-opacity duration-300 hover:opacity-70"
                    style={{ color: "rgba(10,9,8,0.75)" }}
                  >
                    {ch.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-8 pb-3 border-b"
              style={{ color: "rgba(94,80,63,0.5)", borderColor: "rgba(94,80,63,0.12)" }}
            >
              Follow Us
            </h2>
            <div className="flex flex-col gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center justify-between py-2 group"
                >
                  <span className="text-base font-light" style={{ color: "rgba(10,9,8,0.7)" }}>
                    {s.label}
                  </span>
                  <span
                    className="text-sm font-light transition-opacity duration-300 group-hover:opacity-70"
                    style={{ color: "rgba(94,80,63,0.45)" }}
                  >
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Location Quick Links */}
          <div>
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-8 pb-3 border-b"
              style={{ color: "rgba(94,80,63,0.5)", borderColor: "rgba(94,80,63,0.12)" }}
            >
              Visit In Person
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { name: "Flagship Studio — Melbourne", hours: "Mon–Fri 7AM–5PM" },
                { name: "Tasting Lab — Sydney", hours: "Mon–Sat 8AM–4PM" },
              ].map((loc) => (
                <Link
                  key={loc.name}
                  href="/locations"
                  className="flex items-center justify-between py-2 group"
                >
                  <span className="text-base font-light" style={{ color: "rgba(10,9,8,0.7)" }}>
                    {loc.name}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase transition-opacity duration-300 group-hover:opacity-70"
                    style={{ color: "rgba(94,80,63,0.4)" }}
                  >
                    {loc.hours}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
