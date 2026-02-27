import type { Metadata } from "next";
import CheckoutPage from "./CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your Coffee Crave order. Enter your details and select a pickup location for your precision-crafted coffee.",
};

export default function Page() {
  return <CheckoutPage />;
}
