"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import PageShell from "@/components/PageShell";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

interface LocationData {
  id: string;
  city: string;
  address: string;
}

type PaymentMethod = "stripe" | "razorpay";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { currency, format } = useCurrency();
  const router = useRouter();

  const TAX_RATE = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.08);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const [locations, setLocations] = useState<LocationData[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", location_id: "" });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(currency === "INR" ? "razorpay" : "stripe");
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

  useEffect(() => {
    setPaymentMethod(currency === "INR" ? "razorpay" : "stripe");
  }, [currency]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const orderPayload = {
    customer_name: form.name,
    customer_email: form.email,
    customer_phone: form.phone,
    location_id: form.location_id,
    currency,
    items: items.map((i) => ({
      product_id: i.productId,
      size: i.size,
      quantity: i.quantity,
    })),
  };

  const handleStripePayment = async () => {
    const res = await fetch("/api/payments/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Payment failed"); return; }
    // Redirect to Stripe Checkout
    clearCart();
    window.location.href = data.url;
  };

  const handleRazorpayPayment = async () => {
    const res = await fetch("/api/payments/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Payment failed"); return; }

    const options = {
      key: data.key_id,
      amount: data.amount,
      currency: data.currency,
      name: "Coffee Crave",
      description: "Coffee Order",
      order_id: data.razorpay_order_id,
      prefill: { name: form.name, email: form.email, contact: form.phone },
      theme: { color: "#0a0908" },
      method: { upi: true, card: true, netbanking: true, wallet: true },
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        const verifyRes = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...response, order_id: data.order_id }),
        });
        if (verifyRes.ok) {
          clearCart();
          router.push("/order-success");
        } else {
          setError("Payment verification failed");
        }
      },
      modal: { ondismiss: () => setSubmitting(false) },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (paymentMethod === "stripe") {
        await handleStripePayment();
      } else {
        await handleRazorpayPayment();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const isValid = form.name.trim() && form.email.trim() && form.phone.trim();

  const inputStyle = {
    background: "rgba(10,9,8,0.025)",
    border: "1px solid rgba(94,80,63,0.1)",
    color: "rgba(10,9,8,0.8)",
  };

  return (
    <PageShell theme="light">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Hero */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[10px] tracking-[0.5em] uppercase block mb-6" style={{ color: "rgba(94,80,63,0.5)" }}>
          Almost There
        </span>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-4" style={{ color: "#0a0908" }}>
          CHECKOUT
        </h1>
        <div className="w-16 h-[1px]" style={{ background: "rgba(94,80,63,0.25)" }} />
      </motion.div>

      {items.length === 0 ? (
        <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-lg font-light italic mb-6" style={{ color: "rgba(90,70,50,0.4)" }}>
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
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Customer Details + Payment Method */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-[11px] tracking-[0.4em] uppercase mb-8" style={{ color: "rgba(94,80,63,0.4)" }}>
              Customer Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(94,80,63,0.4)" }}>Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-5 py-3.5 rounded-xl text-sm font-light outline-none transition-all duration-300" style={inputStyle} placeholder="Your name" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(94,80,63,0.4)" }}>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full px-5 py-3.5 rounded-xl text-sm font-light outline-none transition-all duration-300" style={inputStyle} placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(94,80,63,0.4)" }}>Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                  className="w-full px-5 py-3.5 rounded-xl text-sm font-light outline-none transition-all duration-300" style={inputStyle} placeholder="+91 000 000 0000" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(94,80,63,0.4)" }}>Pickup Location</label>
                <select name="location_id" value={form.location_id} onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl text-sm font-light outline-none cursor-pointer transition-all duration-300 appearance-none" style={inputStyle}>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>{loc.city} — {loc.address}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <h2 className="text-[11px] tracking-[0.4em] uppercase mt-10 mb-6" style={{ color: "rgba(94,80,63,0.4)" }}>
              Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("stripe")}
                className="p-4 rounded-xl text-center transition-all duration-300 cursor-pointer"
                style={{
                  background: paymentMethod === "stripe" ? "rgba(10,9,8,0.06)" : "transparent",
                  border: `1.5px solid ${paymentMethod === "stripe" ? "rgba(94,80,63,0.3)" : "rgba(94,80,63,0.1)"}`,
                }}
              >
                <span className="text-sm font-medium block" style={{ color: "rgba(10,9,8,0.8)" }}>💳 Card</span>
                <span className="text-[10px] mt-1 block" style={{ color: "rgba(94,80,63,0.4)" }}>Stripe · International</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("razorpay")}
                className="p-4 rounded-xl text-center transition-all duration-300 cursor-pointer"
                style={{
                  background: paymentMethod === "razorpay" ? "rgba(10,9,8,0.06)" : "transparent",
                  border: `1.5px solid ${paymentMethod === "razorpay" ? "rgba(94,80,63,0.3)" : "rgba(94,80,63,0.1)"}`,
                }}
              >
                <span className="text-sm font-medium block" style={{ color: "rgba(10,9,8,0.8)" }}>🇮🇳 UPI / Card</span>
                <span className="text-[10px] mt-1 block" style={{ color: "rgba(94,80,63,0.4)" }}>Razorpay · UPI · QR · Cards</span>
              </button>
            </div>

            {paymentMethod === "razorpay" && (
              <p className="text-[11px] mt-3 font-light" style={{ color: "rgba(94,80,63,0.5)" }}>
                Pay via UPI (GPay, PhonePe, Paytm), QR code, cards, netbanking, or wallets.
              </p>
            )}

            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
          </motion.div>

          {/* Right: Order Summary */}
          <motion.div
            className="lg:w-80 xl:w-96"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl p-6 md:p-8 sticky top-28" style={{ background: "rgba(10,9,8,0.03)", border: "1px solid rgba(94,80,63,0.08)" }}>
              <h3 className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color: "rgba(94,80,63,0.4)" }}>Order Summary</h3>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-light truncate" style={{ color: "rgba(10,9,8,0.7)" }}>{item.name}</p>
                      <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(94,80,63,0.35)" }}>{item.size} × {item.quantity}</p>
                    </div>
                    <span className="text-sm tabular-nums font-light" style={{ color: "rgba(139,116,90,0.6)" }}>
                      {format(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-[1px] mb-4" style={{ background: "rgba(94,80,63,0.1)" }} />

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm font-light" style={{ color: "rgba(90,70,50,0.5)" }}>Subtotal</span>
                  <span className="text-sm tabular-nums" style={{ color: "rgba(10,9,8,0.7)" }}>{format(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-light" style={{ color: "rgba(90,70,50,0.5)" }}>Tax (8%)</span>
                  <span className="text-sm tabular-nums" style={{ color: "rgba(10,9,8,0.7)" }}>{format(tax)}</span>
                </div>
                <div className="h-[1px] my-3" style={{ background: "rgba(94,80,63,0.1)" }} />
                <div className="flex justify-between">
                  <span className="text-base font-medium" style={{ color: "rgba(10,9,8,0.8)" }}>Total</span>
                  <span className="text-xl font-light tabular-nums" style={{ color: "rgba(10,9,8,0.9)" }}>{format(total)}</span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={!isValid || submitting}
                className="w-full py-4 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #c6ac8f 0%, #8b745a 100%)", color: "#0a0908" }}
                whileHover={isValid && !submitting ? { scale: 1.02 } : {}}
                whileTap={isValid && !submitting ? { scale: 0.97 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {submitting ? "Processing..." : paymentMethod === "stripe" ? "Pay with Card" : "Pay Now"}
              </motion.button>
            </div>
          </motion.div>
        </form>
      )}
    </PageShell>
  );
}
