import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a build, report an issue, or ask about licensing.",
  alternates: localeAlternates("/contact/", "en"),
};

export default function Page() {
  return <ContactPage />;
}
