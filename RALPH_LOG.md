# RALPH_LOG.md
---

## W1 — 골격 이식 + pnpm + tokens.css + 테마 토글 (2026-08-01)
- nexys-website(nexys-web/) 골격 이식: next.config.mjs(정적 export·basePath)·tsconfig·Reveal·asset 헬퍼·밴드 문법 보존, Nexys 콘텐츠(i18n·ConsultWidget·NI 배지 등) 전부 제거.
- pnpm 전환 완료(lockfile 재생성, npm 미사용).
- styles/tokens.css: Token Sheet 시안의 D/L 팔레트 원문 추출([data-theme] 2세트). ok/amber/mute line·fill·probe-ink 보조값은 Home v2 시안 THEMES에서 추출.
- 테마: <html data-theme> + head 인라인 스크립트로 FOUC 방지, 기본 prefers-color-scheme, localStorage('noktra-theme' — 시안 키 그대로) 유지. 헤더 DARK/LIGHT 세그먼트 토글(시안 정본).
- [결정] 시안 룩이 tailwind 유틸을 전혀 쓰지 않아 tailwind/postcss 의존성 미이식(순수 CSS 변수 시스템으로 재구성). 허용 의존성 내에서 축소만 수행.
- [결정] 폰트 3계층(Newsreader/IBM Plex Sans/IBM Plex Mono)은 next/font/google로 셀프호스트(woff2, 정적 export에 포함·외부 요청 0) — 전부 OFL 오픈소스라 대역 불요.
- [결정] 루트에 있던 시안 파일 7종을 design-mockups/로 이동(DESIGN_VISUAL 규정 위치, 빌드 제외·커밋 보존).
- DoD: pnpm build 성공(/, /_not-found export), 홈 렌더, 토글 동작.
