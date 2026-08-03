import type { Metadata } from "next";
import SecurityPage from "@/components/pages/SecurityPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "보안",
  description:
    "폐쇄망에서 NOKTRA 다운로드를 검증하는 방법: SHA-256 절차, 코드 서명 정책, 그리고 다운로드가 결코 하지 않는 일.",
  alternates: localeAlternates("/security/", "ko"),
};

export default function Page() {
  return <SecurityPage />;
}
