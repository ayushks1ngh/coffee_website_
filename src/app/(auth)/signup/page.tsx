"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/login?message=Check your email to confirm your account");
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-light text-almond_cream/90 tracking-tight mb-2">Create Account</h1>
        <p className="text-sm text-almond_cream/40 mb-8">Join the Coffee Crave experience.</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-almond_cream text-sm outline-none focus:border-khaki_beige/40 transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-almond_cream text-sm outline-none focus:border-khaki_beige/40 transition-colors"
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-almond_cream text-sm outline-none focus:border-khaki_beige/40 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-khaki_beige text-black text-sm tracking-[0.15em] uppercase cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] text-almond_cream/30 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full py-3 rounded-full border border-white/10 text-almond_cream/70 text-sm tracking-wide cursor-pointer hover:bg-white/5 transition-colors"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-almond_cream/40 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-khaki_beige/70 hover:text-khaki_beige transition-colors">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
