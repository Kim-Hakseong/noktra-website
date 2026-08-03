import type { Metadata } from "next";
import NotesIndexPage from "@/components/pages/NotesIndexPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "노트",
  description:
    "필드 노트: NOKTRA 도구들 안의 설계 결정에 대한 짧은 에세이 — 전부 공개 저장소에 근거합니다.",
  alternates: localeAlternates("/notes/", "ko"),
};

export default function Page() {
  return <NotesIndexPage />;
}
