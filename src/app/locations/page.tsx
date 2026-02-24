import type { Metadata } from "next";
import LocationsPage from "./LocationsPage";

export const metadata: Metadata = {
  title: "Locations | Coffee Crave",
  description: "Visit our flagship studio and tasting room. Find Coffee Crave near you.",
};

export default function Page() {
  return <LocationsPage />;
}
