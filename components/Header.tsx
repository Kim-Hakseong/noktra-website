"use client";

// nexys-website Header 골격 이식 → NOKTRA 시안 헤더로 재구성
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
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
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
