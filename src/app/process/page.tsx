import type { Metadata } from "next";
import ProcessPage from "./ProcessPage";

export const metadata: Metadata = {
  title: "Our Process | Coffee Crave",
  description: "From volcanic highland sourcing to precision extraction — discover the science behind every sip.",
};

export default function Page() {
  return <ProcessPage />;
}
