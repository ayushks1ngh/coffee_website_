import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About | Coffee Crave",
  description: "The story behind Coffee Crave — obsessive precision, relentless refinement, and a belief that coffee can be more.",
};

export default function Page() {
  return <AboutPage />;
}
