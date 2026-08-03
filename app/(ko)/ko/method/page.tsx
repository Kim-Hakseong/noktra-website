import type { Metadata } from "next";
import MethodPage from "@/components/pages/MethodPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "방법론",
  description:
    "합의가 아니라 증명. 골든 벡터, 결정론적 검사기, 오프라인 우선 설계, 그리고 엔지니어의 서명.",
  alternates: localeAlternates("/method/", "ko"),
};

export default function Page() {
  return <MethodPage />;
}
