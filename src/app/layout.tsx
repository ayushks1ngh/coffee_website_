import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://coffee-website-one-gamma.vercel.app"
  ),
  title: {
    default: "Coffee Crave — Precision Crafted Coffee Experience",
    template: "%s | Coffee Crave",
  },
  description:
    "Experience the inner truth of coffee. Crafted beyond taste. Engineered for sensation. Browse our curated menu, explore our global locations, and order your next cup.",
  keywords: [
    "coffee",
    "premium coffee",
    "iced latte",
    "espresso",
    "cold brew",
    "coffee delivery",
    "specialty coffee",
    "Coffee Crave",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Coffee Crave",
    title: "Coffee Crave — Precision Crafted Coffee Experience",
    description:
      "Crafted beyond taste. Engineered for sensation. Browse our curated menu and order your next cup.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coffee Crave — Precision Crafted Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffee Crave — Precision Crafted Coffee Experience",
    description:
      "Crafted beyond taste. Engineered for sensation.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black text-almond_cream antialiased overflow-x-clip`}
      >
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:text-sm"
          >
            Skip to main content
          </a>
          <Navbar />
          <div id="main-content">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
