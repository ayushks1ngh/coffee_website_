/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.razorpay.com https://lux.razorpay.com; frame-src https://api.razorpay.com https://checkout.stripe.com;" },
      ],
    },
    {
      source: "/api/:path*",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Cache-Control", value: "no-store" },
      ],
    },
  ],
};

export default nextConfig;
