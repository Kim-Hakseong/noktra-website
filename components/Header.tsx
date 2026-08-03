"use client";

// nexys-website Header 골격 이식 → NOKTRA 시안 헤더로 재구성
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { switchLocalePath, useLang } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/products", en: "Products", ko: "제품" },
  { href: "/method", en: "Method", ko: "방법론" },
  { href: "/notes", en: "Notes", ko: "노트" },
  { href: "/contact", en: "Contact", ko: "문의" },
];

// 언어 토글 = 반대 로케일의 같은 페이지로 가는 링크 (라우트가 언어를 결정)
function LangSwitch() {
  const { lang } = useLang();
  const pathname = usePathname();
  return (
    <div className="tg" role="group" aria-label="Language">
      <Link
        className="tg__seg"
        data-on={lang === "en"}
        aria-current={lang === "en" ? "true" : undefined}
        href={switchLocalePath(pathname, "en")}
        hrefLang="en"
      >
        ENG
      </Link>
      <Link
        className="tg__seg"
        data-on={lang === "ko"}
        aria-current={lang === "ko" ? "true" : undefined}
        href={switchLocalePath(pathname, "ko")}
        hrefLang="ko"
      >
        KOR
      </Link>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { lang } = useLang();
  const home = lang === "ko" ? "/ko" : "/";
  const p = (href: string) => (lang === "ko" ? `/ko${href}` : href);
  const isActive = (href: string) =>
    pathname === p(href) || pathname.startsWith(`${p(href)}/`);

  return (
    <header className="site-header">
      <div className="wrap site-header__in">
        <div className="brand">
          <Link className="brand__logo" href={home} aria-label="NOKTRA Home">
            {SITE.name}
          </Link>
          <span className="brand__tag">{SITE.tagline}</span>
        </div>
        <nav className="nav" aria-label="Main menu">
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.href}
              href={p(n.href)}
              aria-current={isActive(n.href) ? "page" : undefined}
            >
              {lang === "ko" ? n.ko : n.en}
            </Link>
          ))}
          <LangSwitch />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
