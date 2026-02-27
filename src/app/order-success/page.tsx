import type { Metadata } from "next";
import OrderSuccessPage from "./OrderSuccessPage";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description:
    "Your Coffee Crave order is confirmed. Your precision-crafted coffee is being prepared.",
};

export default function Page() {
  return <OrderSuccessPage />;
}
