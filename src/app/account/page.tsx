"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { Order } from "@/lib/types";
import PageShell from "@/components/PageShell";
import { useCurrency } from "@/context/CurrencyContext";

const STATUS_STEPS = ["pending", "confirmed", "preparing", "ready", "picked_up"] as const;

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const { format } = useCurrency();
  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: { name?: string } } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return; // middleware handles redirect
      setUser(user);
      fetch("/api/orders")
        .then((r) => r.json())
        .then((d) => setOrders(d.orders || []))
        .finally(() => setLoading(false));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Real-time order status updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("order-status")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` },
        (payload) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === payload.new.id ? { ...o, ...payload.new } : o))
          );
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user?.id, supabase]);

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

  const statusIndex = (s: string) => STATUS_STEPS.indexOf(s as typeof STATUS_STEPS[number]);

  return (
    <PageShell theme="light">
      <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="text-[10px] tracking-[0.5em] uppercase block mb-6" style={{ color: "rgba(94,80,63,0.5)" }}>Account</span>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4" style={{ color: "#0a0908" }}>
          {user?.user_metadata?.name || "Your Account"}
        </h1>
        <p className="text-sm font-light mb-4" style={{ color: "rgba(90,70,50,0.5)" }}>{user?.email}</p>
        <button onClick={handleSignOut} className="text-xs tracking-[0.2em] uppercase text-red-500/60 hover:text-red-500 transition-colors cursor-pointer">
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
            <button className="bg-[#0a0908] text-[#eae0d5] px-8 py-3.5 rounded-full text-sm tracking-[0.25em] uppercase cursor-pointer">Browse Menu</button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStep = statusIndex(order.status);
            const isCancelled = order.status === "cancelled";

            return (
              <motion.div
                key={order.id}
                className="p-5 md:p-6 rounded-2xl"
                style={{ background: "rgba(10,9,8,0.025)", border: "1px solid rgba(94,80,63,0.08)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(10,9,8,0.8)" }}>
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(94,80,63,0.4)" }}>
                      {new Date(order.created_at).toLocaleDateString()} · {format(order.total)}
                    </p>
                  </div>
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                    style={{ color: statusColor(order.status), border: `1px solid ${statusColor(order.status)}` }}
                  >
                    {order.status.replace("_", " ")}
                  </span>
                </div>

                {/* Status Tracker */}
                {!isCancelled && (
                  <div className="flex items-center gap-1 mt-3">
                    {STATUS_STEPS.map((step, i) => (
                      <div key={step} className="flex-1 flex items-center gap-1">
                        <div
                          className="h-1.5 flex-1 rounded-full transition-all duration-500"
                          style={{
                            background: i <= currentStep
                              ? "linear-gradient(90deg, #c6ac8f, #8b745a)"
                              : "rgba(94,80,63,0.1)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {!isCancelled && (
                  <div className="flex justify-between mt-2">
                    {STATUS_STEPS.map((step, i) => (
                      <span
                        key={step}
                        className="text-[8px] tracking-[0.1em] uppercase"
                        style={{ color: i <= currentStep ? "rgba(94,80,63,0.6)" : "rgba(94,80,63,0.2)" }}
                      >
                        {step.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
