export type Currency = "USD" | "INR";

export const CURRENCY_CONFIG: Record<Currency, { symbol: string; code: string; locale: string; rate: number }> = {
  USD: { symbol: "$", code: "USD", locale: "en-US", rate: 1 },
  INR: { symbol: "₹", code: "INR", locale: "en-IN", rate: 85 },
};

export function detectCurrency(): Currency {
  if (typeof window === "undefined") return "USD";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz?.startsWith("Asia/Kolkata") || tz?.startsWith("Asia/Calcutta")) return "INR";
  const lang = navigator.language;
  if (lang?.startsWith("hi") || lang === "en-IN") return "INR";
  return "USD";
}

export function convertPrice(usdPrice: number, currency: Currency): number {
  return Math.round(usdPrice * CURRENCY_CONFIG[currency].rate * 100) / 100;
}

export function formatPrice(usdPrice: number, currency: Currency): string {
  const converted = convertPrice(usdPrice, currency);
  const { locale, code } = CURRENCY_CONFIG[currency];
  return new Intl.NumberFormat(locale, { style: "currency", currency: code, minimumFractionDigits: 2 }).format(converted);
}
