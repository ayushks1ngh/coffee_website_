import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee Crave | Premium Iced Latte",
  description: "Experience the inner truth of coffee. Crafted beyond taste. Engineered for sensation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-almond_cream antialiased overflow-x-clip`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
