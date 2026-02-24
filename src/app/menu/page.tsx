import type { Metadata } from "next";
import MenuPage from "./MenuPage";

export const metadata: Metadata = {
  title: "Menu | Coffee Crave",
  description: "Explore our signature collection of premium iced lattes, cold brews, and espresso creations.",
};

export default function Page() {
  return <MenuPage />;
}
