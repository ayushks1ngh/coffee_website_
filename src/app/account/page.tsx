"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { Order } from "@/lib/types";
import PageShell from "@/components/PageShell";

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string; user_metadata?: { name?: string } } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/login?next=/account"); return; }
      setUser(user);
      fetch("/api/orders")
        .then((r) => r.json())
        .then((d) => setOrders(d.orders || []))
        .finally(() => setLoading(false));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const statusColor = (s: string) => {
    const colors: Record<string, string> = {
      confirmed: "rgba(34,197,94,0.7)",
      preparing: "rgba(250,204,21,0.7)",
      ready: "rgba(59,130,246,0.7)",
      picked_up: "rgba(148,163,184,0.5)",
      cancelled: "rgba(239,68,68,0.6)",
      pending: "rgba(250,204,21,0.5)",
    };
    return colors[s] || "rgba(148,163,184,0.5)";
  };

  return (
    <PageShell theme="light">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.5em] uppercase block mb-6" style={{ color: "rgba(94,80,63,0.5)" }}>
          Account
        </span>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4" style={{ color: "#0a0908" }}>
          {user?.user_metadata?.name || "Your Account"}
        </h1>
        <p className="text-sm font-light mb-4" style={{ color: "rgba(90,70,50,0.5)" }}>
          {user?.email}
        </p>
        <button
          onClick={handleSignOut}
          className="text-xs tracking-[0.2em] uppercase text-red-500/60 hover:text-red-500 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </motion.div>

      <h2 className="text-xs tracking-[0.4em] uppercase mb-6 pb-3 border-b" style={{ color: "rgba(94,80,63,0.5)", borderColor: "rgba(94,80,63,0.12)" }}>
        Order History
      </h2>

      {loading ? (
        <div className="py-10 text-center text-sm" style={{ color: "rgba(90,70,50,0.4)" }}>Loading...</div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-light italic mb-6" style={{ color: "rgba(90,70,50,0.4)" }}>No orders yet.</p>
          <Link href="/menu">
            <button className="bg-[#0a0908] text-[#eae0d5] px-8 py-3.5 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer">
              Browse Menu
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className="p-5 rounded-2xl flex items-center justify-between"
              style={{ background: "rgba(10,9,8,0.025)", border: "1px solid rgba(94,80,63,0.08)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: "rgba(10,9,8,0.8)" }}>
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(94,80,63,0.4)" }}>
                  {new Date(order.created_at).toLocaleDateString()} · ${order.total.toFixed(2)}
                </p>
              </div>
              <span
                className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                style={{ color: statusColor(order.status), border: `1px solid ${statusColor(order.status)}` }}
              >
                {order.status}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
