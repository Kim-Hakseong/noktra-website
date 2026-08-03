import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: localeAlternates("/", "ko"),
};

export default function Page() {
  return <HomePage />;
}
