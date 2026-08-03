import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "문의",
  description: "빌드 요청, 이슈 제보, 라이선스 문의.",
  alternates: localeAlternates("/contact/", "ko"),
};

export default function Page() {
  return <ContactPage />;
}
