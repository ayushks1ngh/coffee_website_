"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Currency, detectCurrency, formatPrice, convertPrice } from "@/lib/currency";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (usdPrice: number) => string;
  convert: (usdPrice: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  format: (p) => `$${p.toFixed(2)}`,
  convert: (p) => p,
});

export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("coffee-crave-currency") as Currency | null;
    setCurrency(saved || detectCurrency());
  }, []);

  useEffect(() => {
    localStorage.setItem("coffee-crave-currency", currency);
  }, [currency]);

  const format = (usdPrice: number) => formatPrice(usdPrice, currency);
  const convert = (usdPrice: number) => convertPrice(usdPrice, currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}
