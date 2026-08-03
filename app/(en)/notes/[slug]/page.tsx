import type { Metadata } from "next";
import NoteDetailPage from "@/components/pages/NoteDetailPage";
import { NOTES, noteBySlug } from "@/content/notes";
import { localeAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const n = noteBySlug(params.slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.description,
    alternates: localeAlternates(`/notes/${n.slug}/`, "en"),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <NoteDetailPage slug={params.slug} lang="en" />;
}
