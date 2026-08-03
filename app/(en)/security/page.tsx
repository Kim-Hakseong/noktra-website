import type { Metadata } from "next";
import SecurityPage from "@/components/pages/SecurityPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How to verify a NOKTRA download on an air-gapped network: SHA-256 procedure, code-signing policy, and what a download never does.",
  alternates: localeAlternates("/security/", "en"),
};

export default function Page() {
  return <SecurityPage />;
}
