import type { Metadata } from "next";
import BrandPage from "@/components/pages/BrandPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CI",
  description:
    "NOKTRA는 무엇인가: 시험·검증 엔지니어링을 위한 오프라인 우선 데스크톱 도구 브랜드 — 이름, 원칙, 구조, 룩의 정본.",
  alternates: localeAlternates("/brand/", "ko"),
};

export default function Page() {
  return <BrandPage />;
}
