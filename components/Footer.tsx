"use client";

// nexys-website Footer 골격 이식 → NOKTRA 시안 푸터로 재구성
import LLink from "@/components/LLink";
import { SITE } from "@/lib/site";
import { VERBS } from "@/lib/products";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const year = 2026; // 정적 export — 빌드 시점 연도 고정
  const { lang } = useLang();
  const t = (en: string, ko: string) => (lang === "ko" ? ko : en);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <div className="footer__logo">{SITE.name}</div>
            <p className="footer__blurb">
              {t(
                "Verification and test-engineering instruments for work that happens where the internet doesn't reach.",
                "인터넷이 닿지 않는 곳의 일을 위한 검증·시험 엔지니어링 도구."
              )}
            </p>
          </div>
          <div className="footer__col">
            <div className="footer__head">Catalog</div>
            {VERBS.map((v) => (
              <LLink key={v.id} href={`/products#${v.id}`}>
                {v.label}
              </LLink>
            ))}
          </div>
          <div className="footer__col">
            <div className="footer__head">Resources</div>
            <LLink href="/products">{t("Downloads", "다운로드")}</LLink>
            <LLink href="/method">{t("Philosophy", "철학")}</LLink>
            <a href={SITE.github} target="_blank" rel="noopener">
              GitHub
            </a>
          </div>
          <div className="footer__col">
            <div className="footer__head">Contact</div>
            <LLink href="/contact">{t("Request a build", "빌드 요청")}</LLink>
            <a href={`mailto:${SITE.email}`}>{t("Email", "이메일")}</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {year} {SITE.name}</span>
          <span>{SITE.philosophy}</span>
          <span>{t("No analytics · No telemetry", "분석 없음 · 텔레메트리 없음")}</span>
        </div>
      </div>
    </footer>
  );
}
