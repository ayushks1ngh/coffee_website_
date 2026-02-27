import type { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your curated selection of Coffee Crave drinks before checkout. Adjust quantities, choose sizes, and proceed to checkout.",
};

export default function Page() {
  return <CartPage />;
}
