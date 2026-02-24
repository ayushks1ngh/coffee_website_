import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact | Coffee Crave",
  description: "Get in touch with Coffee Crave — partnerships, wholesale inquiries, and press.",
};

export default function Page() {
  return <ContactPage />;
}
