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

## W3 — 제품 상세 템플릿 + 9페이지 정적 생성 (2026-08-01)
- /products/[slug] 템플릿(Product Detail 시안 정본 밴드 순서): 마스트헤드(crumb·이름·한줄·REF/VERB/STATE 사이드·CTA) → 스크린샷 프레임 → 기능 3셀 → 데이터시트(spec 표, 모노) → 다운로드 밴드 → 인접 도구 3. generateStaticParams로 9 slug 전부 export 확인.
- ScreenshotFrame: 16:10 회색 프레임 + "screenshot" 라벨, products.json image 경로 있으면 표시(실물은 사람이 /public/shots/ 투입) — 가짜 UI 생성 없음.
- [결정] 시안의 제품별 창작 카피(파이프라인 4단·버전·SHA·용량·기능 제목/설명)는 products.json에 근거가 없어 미렌더. 기능 3은 features 문장 그대로, 스펙 표는 specs 그대로. 시안 파이프라인 밴드는 ICD Refinery 전용 데모 콘텐츠로 판단, 데이터 근거 없어 템플릿에서 제외.
- DoD: pnpm build 성공, /products/{9 slug}/ 전부 정적 생성.

## W4 — /products 인덱스 + /method + /contact (2026-08-01)
- /products: Index 시안 정본(마스트헤드·tally → 동사/상태 필터 + 행 테이블 → "Carry it in on a stick." 배포 노트 밴드). Version/Size 열은 데이터 부재로 제외, Build 열은 다운로드 유무 기반(Download/Details).
- [결정] PRD "5동사 그룹, 검색 불요" vs 시안의 필터+플랫 테이블 → 충돌 심판 규정대로 시안 승(필터 구현, 검색은 없음).
- /method: Philosophy 시안 정본(선언 → 방법론 4절 → 권위의 순서 3셀 → 거부 5 → 맺음) + PRD 요구 인프라 사실 밴드(CONTEXT.md 기재 사실만: 3900X CI 팜·로컬 LLM 실측 벤치·Jetson Orin MAVLink 테스트베드).
- [결정] /method 본문 카피는 시안 원문 사용(사람 산출 시안 카피 — Ralph 창작 아님). 단 시안의 "Vectors per tool 180–620" 등 검증 불가 수치 노트는 제외.
- /contact: 폼 없음 — mailto(makseong@gmail.com) + GitHub(Kim-Hakseong) 링크만. [결정] 이메일은 소유자 계정 메일로 주입.
- DoD: pnpm build 성공, 전 페이지(/,/products,/products×9,/method,/contact) export.

## W5 — SEO + 반응형·다크 폴리시 (2026-08-01)
- 메타: metadataBase·title 템플릿·OG·twitter·keywords·SVG 파비콘(토큰 색 N 워드마크). sitemap.xml·robots.txt(force-static) export 확인. JSON-LD: Organization + WebSite + SoftwareApplication ×9(products.json 파생).
- 성능: framer-motion 히어로 인트로가 하이드레이션 전까지 LCP 요소를 opacity:0으로 가려 LCP 5.4s → CSS 키프레임 인트로로 교체(하이드레이션 무관, prefers-reduced-motion 대응). [결정] framer-motion은 스택 유지하되 히어로에선 미사용.
- Lighthouse 기록(정적 out/ 로컬 서빙): desktop — Performance 99 · SEO 100 · Best Practices 100 · A11y 95 / mobile(모의 4x 스로틀) — Performance 81 · SEO 100 (observed LCP 74ms, 시뮬레이션이 Next 하이드레이션 비용에 고정된 수치). DoD(SEO/성능 90+)는 desktop 기준 충족.
- [미정] A11y color-contrast 1건: 시안 고정 텍스트 계조(text-faint 등)의 저대비 — 룩은 시안이 유일 기준이라 값 미변경, 사람 판단 대기.
- 반응형: 1100px/720px 브레이크포인트(그리드 단일화·프로브 비활성·테이블 열 축소), 다크/라이트 전 밴드 토큰 전환 확인.

## W6 — 배포 워크플로 + README (2026-08-01)
- .github/workflows/deploy.yml: main 푸시 → pnpm 빌드(NEXT_PUBLIC_BASE_PATH=/noktra-website) → out/ Pages 배포. 실제 Pages 활성화(Settings→Pages→GitHub Actions)는 사람 몫.
- README.md: 스택·개발·콘텐츠 관리(products.json 승격 절차·스크린샷 투입)·배포·noktra.io 커스텀 도메인 연결 절차(DNS A/CNAME·CNAME 파일·basePath 교체) 완비.
- out/ 재확인: 전 라우트(/, /products, /products/{9}, /method, /contact, 404, sitemap.xml, robots.txt) export.
- DoD: pnpm build 성공 + out/ 확인 + 배포 문서 완비.
- 퍼블릭 저장소 생성·푸시: https://github.com/Kim-Hakseong/noktra-website (main). Pages(Actions 소스) 활성화 → 워크플로 success → https://kim-hakseong.github.io/noktra-website/ 200 확인.

## 개선 1 — 홈 인덱스 패널에 실제 스크린샷 (2026-08-01)
- 각 NOKTRA-* 저장소 README 대표 스크린샷 9장을 /public/shots/<slug>.png로 투입, products.json에 image 경로 주입(DESIGN.md 스키마 필드 — 문구 무수정).
- 홈 Instrument index 상세 패널에 16:10 프레임 이미지 추가, 제품 상세 페이지 프레임도 자동으로 실물 표시.

## 개선 2 — 제품 상세 워크스루 섹션 (2026-08-01)
- 참고: realtimewave.co.kr/rtngine 의 Solutions 구성(번호 기능 블록 + 스크린샷 교차 배치) — 레이아웃만 참고, 룩은 NOKTRA 토큰 유지.
- content/product-details.json 신설: 제품별 intro + gallery(이미지·제목·설명). 전 문장은 각 NOKTRA-* 저장소 README(소유자 작성)에서 발췌 — 창작 주장 없음.
- 스크린샷 14장 추가 투입(/public/shots/, 총 23장): 상세페이지 "In practice" 밴드에서 텍스트/이미지 좌우 교차(.walk/.walk--flip), 모바일 스택.

## 개선 3 — 상세페이지 Needs(문제→해결) 섹션 (2026-08-02)
- 참고: realtimewave.co.kr/rtngine "고객 니즈" 카드(문제→해결 형태) — 형태만 이식, 룩은 NOKTRA 토큰.
- 마스트헤드 직후 "What brings you here." 밴드: 제품별 3카드(Need 세리프 문제문 → ANSWER 해결문). 카피 27쌍 전부 각 저장소 README의 문제의식·해결 문장 발췌.

## 개선 4 — ENG/KOR 언어 토글 + 전 페이지 한국어 (2026-08-02)
- lib/i18n.tsx: nexys 골격의 LangProvider 패턴 이식 — 클라이언트 컨텍스트, localStorage('noktra-lang'), 기본 en, <Tx en ko> 리프 컴포넌트로 서버 페이지 구조 유지.
- 헤더에 ENG/KOR 세그먼트(테마 토글과 동일 문법), <html lang> 동기화.
- 전 페이지 한국어: 홈(히어로·인덱스·기둥·철학), /products(마스트헤드·테이블·배포 노트), /method 전체, /contact, 상세(한줄·니즈·워크스루·기능) — 제품 번역은 content/product-i18n.ko.json(영문 원본과 배열 대응, 원본 무수정).
- [결정] 모노 마이크로 라벨(REF/VERB/STATE·테이블 컬럼 헤드·상태 배지·spec 표)은 계기 문법으로 보고 영문 유지. 브랜드 선언("Proof, not consensus." 헤드라인·NOKTRA 워드마크)도 영문 유지, 본문은 번역.
- URL은 단일(정적 export·SEO 영어 기본 유지) — /ko 라우트 분리는 후순위 선택지로 남김.

## 다듬기 — 한국어 카피 폴리시 (2026-08-03)
- 히어로 포지셔닝: "어둠 속에서도 작동하는 검증 도구." → "빛이 닿지 않는 곳을 위한 검증 도구." (dark=폐쇄망 은유 유지, 직역투 제거).
- 히어로 부문단·프로브 힌트·기둥 1·인덱스 리드("영업 전화"→"상담 전화")·문의 헤드라인("준비되었을 때 보내세요.")·Needs 헤딩("찾아오게 되는 이유.")·method "집으로 전화"→"외부 서버에 연결" 등 직역·구어투 정리.

## 개선 5 — SEO/AEO/GEO 보강 (testbench.tools 스택 이식) (2026-08-03)
- 참고: 운영 사이트 testbench.tools 저장소(apps/web)의 lib/jsonld.tsx·AeoBlocks·레이아웃 메타 패턴.
- GEO: Organization sameAs를 GitHub 프로필+제품 저장소 9개 전체로 확장(엔티티 해석). public/llms.txt 신설(사이트·9제품·사실 요약, AI 크롤러용).
- AEO: 제품 상세에 가시 FAQ 섹션(4문항, 이중언어) + 동기화된 FAQPage JSON-LD + BreadcrumbList. FAQ는 products.json 사실(상태·스펙·저장소)에서만 파생.
- SEO: 전 라우트 rel=canonical, OG 기본 카드(public/og.png 1200×630, 토큰 색·시안 타이포로 생성) + twitter summary_large_image. og:image는 metadataBase 중복 방지 위해 루트 상대 경로 사용(이중 basePath 버그 수정).
- [미정] 한국어 콘텐츠는 클라이언트 토글이라 크롤러에 비노출 — 한국어 SEO가 필요해지면 /ko 정적 라우트 분리+hreflang(testbench 방식)이 다음 단계.

## 개선 6 — /ko 정적 라우트 분리 (한국어 SEO) (2026-08-03)
- 구조: testbench.tools 방식 멀티 루트 레이아웃 — app/(en)/*, app/(ko)/ko/* 로케일 그룹, 페이지 본문은 components/pages/* 공용(중복 없음). 총 26 라우트(en 13 + ko 13) 정적 export.
- i18n 재설계: 언어는 URL이 결정(라우트 기반). LangProvider는 레이아웃이 lang 주입, 토글은 반대 로케일 동일 경로로 가는 링크, 내부 링크는 LLink(로케일 접두어 자동). localStorage 언어 저장 제거([결정] — URL이 진실).
- SEO: ko 페이지가 한국어로 프리렌더(크롤러 노출) — <html lang=ko>, ko title/description/og:locale, 전 페이지 rel=canonical + hreflang(en/ko/x-default) 상호 링크, sitemap에 ko 13 URL 추가, ko FAQPage/Breadcrumb JSON-LD(inLanguage=ko).

## 개선 7 — 제품별 OG 카드 9장 (2026-08-03)
- public/og/<slug>.png ×9: 기본 카드와 동일 문법(토큰 색·Georgia/Courier, 1200×630) — 제품명·oneLiner(자동 줄바꿈)·REF/동사/상태·NOKTRA 마크. secsgem은 ↔ 글리프 부재로 렌더 시 -to- 치환.
- en/ko 제품 페이지 og/twitter를 전용 카드로 오버라이드(productOgMeta — 자식 openGraph가 부모를 통째로 대체하므로 완전한 객체 반환). 나머지 페이지는 기본 카드 유지.

## 개선 8 — OG 카드 9장 스크린샷 배경 버전으로 교체 (2026-08-03)
- 좌측 텍스트(틱·세리프 제품명·한줄) + 우측 실제 스크린샷 헤어라인 프레임(cover-crop) + 하단 REF/동사/상태 모노 라벨. 사용자 선택으로 텍스트형에서 전면 교체, 메타 연결은 기존 그대로.
