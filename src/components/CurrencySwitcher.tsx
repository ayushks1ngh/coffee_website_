"use client";

import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <button
      onClick={() => setCurrency(currency === "USD" ? "INR" : "USD")}
      className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
      style={{ border: "1px solid rgba(94,80,63,0.15)", color: "rgba(94,80,63,0.6)" }}
      aria-label={`Switch to ${currency === "USD" ? "INR" : "USD"}`}
    >
      {currency === "USD" ? "$ USD" : "₹ INR"}
    </button>
  );
}
