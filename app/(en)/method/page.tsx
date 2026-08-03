import type { Metadata } from "next";
import MethodPage from "@/components/pages/MethodPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Method",
  description:
    "Proof, not consensus. Golden vectors, deterministic checkers, offline-first design, and the engineer's signature.",
  alternates: localeAlternates("/method/", "en"),
};

export default function Page() {
  return <MethodPage />;
}
