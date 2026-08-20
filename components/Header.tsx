"use client";

// nexys-website Header 골격 이식 → NOKTRA 시안 헤더로 재구성
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { switchLocalePath, useLang } from "@/lib/i18n";
import { motionIsStatic, setMotion } from "@/lib/motion";
import ThemeToggle from "./ThemeToggle";

// 정적 모드(OS 동작줄이기 등)일 때만 나타나는 칩 — 왜 인터랙션이 없는지 알리고,
// 클릭 한 번으로 모션을 되살릴 수 있게 한다 (조용한 강등 금지).
function MotionChip() {
  const { lang } = useLang();
  const [isStatic, setIsStatic] = useState(false);
  useEffect(() => setIsStatic(motionIsStatic()), []);
  if (!isStatic) return null;
  return (
    <button
      className="motion-chip"
      onClick={() => setMotion("on")}
      title={
        lang === "ko"
          ? "OS 동작 줄이기 설정으로 모션이 꺼져 있습니다. 클릭하면 이 사이트에서만 켭니다."
          : "Motion is off (OS reduce-motion). Click to enable it for this site."
      }
    >
      <span className="motion-chip__dot" aria-hidden="true" />
      {lang === "ko" ? "정적 모드 · 모션 켜기" : "STATIC MODE · ENABLE"}
    </button>
  );
}

const NAV_ITEMS = [
  { href: "/products", en: "Products", ko: "제품" },
  { href: "/method", en: "Method", ko: "방법론" },
  { href: "/notes", en: "Notes", ko: "노트" },
  { href: "/brand", en: "Brand", ko: "CI" },
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
          {/* 자매 브랜드 칩 — 보더+도트+↗로 '눌리는 제휴 링크'임을 드러낸다 */}
          <a
            className="nav__tb"
            href={lang === "ko" ? "https://testbench.tools/ko/" : "https://testbench.tools/"}
            target="_blank"
            rel="noopener"
            aria-label="TestBench.tools — free web tools"
            title={lang === "ko" ? "자매 사이트 — 무료 웹툴" : "Sister site — free web tools"}
          >
            <span className="nav__tb-dot" aria-hidden="true" />
            TestBench<span className="nav__tb-dim">.tools</span>
            <span className="nav__tb-arr" aria-hidden="true">↗</span>
          </a>
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.href}
              href={p(n.href)}
              aria-current={isActive(n.href) ? "page" : undefined}
            >
              {lang === "ko" ? n.ko : n.en}
            </Link>
          ))}
          <MotionChip />
          <LangSwitch />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
