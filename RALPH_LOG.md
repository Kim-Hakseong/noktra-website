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

## W2 — products.json 데이터층 + 홈 전체 (2026-08-01)
- lib/products.ts: content/products.json 단일 소비층(타입·refOf NK-01~09·verb 그룹·상태 라벨/클래스·집계). 문구 무수정.
- 홈 완성(Home v2 시안 정본 순서): 히어로(프로브 마스크 연출·상태바·CTA) → Instrument index(좌 리스트+우 상세 패널, 선택 인터랙션) → 신뢰 기둥 3 → 철학 스트립. framer-motion은 히어로 인트로에 사용, 스크롤 리빌은 골격 Reveal.
- [결정] PRD의 "5동사 제품 그리드(9카드)"와 시안의 리스트+상세 패널 구성이 상충 → DESIGN_VISUAL 충돌 심판 규정대로 시안 승.
- [결정] 시안 데모 데이터(버전·용량·상태·블러브)는 무시하고 products.json 값만 렌더. 현재 9종 전부 in-development → 배지는 mute만 노출(3상태 로직·색은 available/beta/in-development 전부 구현, 데이터 승격 시 자동 반영). 다운로드 URL 빈 값 → "In development" 비활성 처리(규칙 5).
- DoD: pnpm build 성공, 홈 전 밴드 렌더, 배지 상태 렌더 확인.
