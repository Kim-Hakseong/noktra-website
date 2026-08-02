"use client";

// nexys-website Header 골격 이식 → NOKTRA 시안 헤더로 재구성
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/products", en: "Products", ko: "제품" },
  { href: "/method", en: "Method", ko: "방법론" },
  { href: "/contact", en: "Contact", ko: "문의" },
];

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="tg" role="group" aria-label="Language">
      <button
        className="tg__seg"
        data-on={lang === "en"}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        ENG
      </button>
      <button
        className="tg__seg"
        data-on={lang === "ko"}
        aria-pressed={lang === "ko"}
        onClick={() => setLang("ko")}
      >
        KOR
      </button>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { lang } = useLang();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="wrap site-header__in">
        <div className="brand">
          <Link className="brand__logo" href="/" aria-label="NOKTRA Home">
            {SITE.name}
          </Link>
          <span className="brand__tag">{SITE.tagline}</span>
        </div>
        <nav className="nav" aria-label="Main menu">
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
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
