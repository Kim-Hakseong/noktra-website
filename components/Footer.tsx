// nexys-website Footer 골격 이식 → NOKTRA 시안 푸터로 재구성 (서버 컴포넌트)
import Link from "next/link";
import { SITE } from "@/lib/site";
import { VERBS } from "@/lib/products";

export default function Footer() {
  const year = 2026; // 정적 export — 빌드 시점 연도 고정

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <div className="footer__logo">{SITE.name}</div>
            <p className="footer__blurb">
              Verification and test-engineering instruments for work that
              happens where the internet doesn&apos;t reach.
            </p>
          </div>
          <div className="footer__col">
            <div className="footer__head">Catalog</div>
            {VERBS.map((v) => (
              <Link key={v.id} href={`/products#${v.id}`}>
                {v.label}
              </Link>
            ))}
          </div>
          <div className="footer__col">
            <div className="footer__head">Resources</div>
            <Link href="/products">Downloads</Link>
            <Link href="/method">Philosophy</Link>
            <a href={SITE.github} target="_blank" rel="noopener">
              GitHub
            </a>
          </div>
          <div className="footer__col">
            <div className="footer__head">Contact</div>
            <Link href="/contact">Request a build</Link>
            <a href={`mailto:${SITE.email}`}>Email</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {year} {SITE.name}</span>
          <span>{SITE.philosophy}</span>
          <span>No analytics · No telemetry</span>
        </div>
      </div>
    </footer>
  );
}
