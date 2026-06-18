"use client";

import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>{children}</CartProvider>
    </CurrencyProvider>
  );
}
