import type { Metadata } from "next";
import NotesIndexPage from "@/components/pages/NotesIndexPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Field notes: short essays on the design decisions inside NOKTRA instruments, each grounded in a public repository.",
  alternates: localeAlternates("/notes/", "en"),
};

export default function Page() {
  return <NotesIndexPage />;
}
