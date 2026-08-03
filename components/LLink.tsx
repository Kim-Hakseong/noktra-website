"use client";

// 로케일 인식 내부 링크 — ko 컨텍스트에서는 내부 경로에 /ko 접두어를 붙인다.
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import type { ComponentProps } from "react";

export default function LLink({
  href,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { lang } = useLang();
  const localized =
    lang === "ko" && href.startsWith("/") && !href.startsWith("/ko")
      ? href === "/"
        ? "/ko"
        : `/ko${href}`
      : href;
  return <Link href={localized} {...rest} />;
}
