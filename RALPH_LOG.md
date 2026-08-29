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

## 개선 9 — Field Notes 섹션 (2026-08-03)
- /notes + /notes/[slug] ×3 (en/ko, 총 8라우트 추가 → 39): testbench notes 패턴 이식. Article JSON-LD(citation=출처 저장소·inLanguage), sitemap·hreflang·헤더/푸터 네비 연결.
- 노트 3편(이중언어): "건너뛴 단계는 합격이 아니다"(sequencer) / "바이트 동일 로그는 시험 도구다"(sil-runtime) / "빈 spec/ 폴더가 기능이다"(ram·ch10·secsgem 게이트 패턴) — 전부 README 기존 논지의 에세이 확장, 신규 기술 주장 없음.

## 개선 10 — 히어로 재구성: 브랜드가 무엇을 하는지 첫 화면에 (2026-08-03)
- 워드마크 축소(clamp 104–156 → 72–112), 위에 액센트 모노 아이브로우("Offline-first verification instruments") 추가.
- 포지셔닝 문장 아래 구체 설명 문단(hero__desc): 9종·5영역·폐쇄망을 명시. 우측 사이드는 일반 문단 대신 다섯 동사 미니맵(Define~Assure + 역할 한 줄)으로 교체 — [결정] 시안 사이드 문단 구성에서 이탈, 브랜드 오퍼링 가독을 우선(사용자 지시).

## 세션 현황 요약 (2026-08-03 기준)
### 완료 상태
- 사이트: 39 라우트 정적 export (en 홈/제품×9/products/method/notes×3+인덱스/contact + ko 미러 + 404·sitemap·robots).
- 라이브: https://kim-hakseong.github.io/noktra-website/ — main 푸시마다 GitHub Pages 자동 배포.
- 콘텐츠 계층: products.json(단일 진실) / product-details.json(README 발췌 니즈·워크스루) / product-i18n.ko.json(한국어 전량) / notes.ts(필드 노트 3편 이중언어) / 스크린샷 23장(+OG 카드 10장).
- SEO/AEO/GEO: 로케일별 canonical+hreflang, Organization sameAs(저장소 10), SoftwareApplication×9, FAQ 가시 섹션+FAQPage JSON-LD, BreadcrumbList, Article JSON-LD(citation), llms.txt, 제품별 스크린샷 OG 카드, Lighthouse desktop 99/100/100/95.

### 합의된 방향 (전략 세션)
- 수익 축: per-seat 영구 라이선스 + 오프라인 키(Ed25519 키 파일), open-core. 구독 SaaS 배제.
- 9종 동시 운영 전제(개발 리소스 제약 없음 — Claude Code 주도). "쐐기 1개" 논리는 마케팅 집중 순서로만 유지.
- 신규 아이템 3종: 사용자가 Claude 채팅(Fable 5)에서 별도 발굴 완료 — 상세는 추후 공유 예정, 사이트 반영 대기.

### 대기/보류 항목
- [보류] 퍼널 연결(testbench.tools ↔ NOKTRA): noktra 도메인 등록 후 진행하기로 결정.
- [대기] 골든 벡터 라이브 배지: 개념 설명 완료, 사용자 판단 대기.
- [대기] 커뮤니티 바텀업 가이드: testbench.tools와 공동 진행 예정, 요청 시 상세 가이드.
- [대기] SHA-256 게시: 실물 릴리스 등장 시 products.json에 해시 주입.
- [대기] Windows 코드사이닝(OV, 연 $200~400): 첫 유료 다운로드 전까지 확보 권장.
- [미정] noktra.io 도메인: 등록 시 CNAME + basePath 제거 + SITE_URL 교체(절차는 README).

## 개선 11 — 포지셔닝 탈은유 + CI(/brand) 페이지 (2026-08-03)
- [결정] 사용자 지시로 포지셔닝 전역 교체: "Verification tools that work in the dark." / "빛이 닿지 않는 곳을 위한 검증 도구." → "Verification tools for air-gapped environments." / "폐쇄망 환경을 위한 검증 도구." (히어로·메타 title·OG 기본 카드 재생성·llms.txt·README). 히어로 아이브로우는 대상 시장 나열(방위·항공우주·산업·반도체)로 교체. nox/dark 은유 해설은 /brand로 이사.
- /brand (en) · /ko/brand (총 41라우트): CI 정본 — 이름의 유래(nox), 소개 카피 뱅크(한 줄/짧게/상세, 이중언어), 원칙 3+권위 순서, 다섯 동사 구조(제품 링크), 비주얼 아이덴티티(토큰 스와치 다크/라이트·타이포 3계층·라운드 0 규칙), 보이스(쓰는 말/쓰지 않는 말). 네비 "Brand/CI" 추가, sitemap 반영.
- 홈 인덱스 헤딩 일반화: "Instrument index / Nine instruments, five verbs." → "Product index / All instruments at a glance." (ko "제품 인덱스 / 전체 도구를 한눈에.")

## 개선 12 — SHA-256 게시 배관 (2026-08-03)
- products.json 스키마 확장: 선택 필드 sha256{win,mac} — 실물 릴리스 시 사람이 주입(문구 무수정, 현재 데이터 없음).
- 상세 다운로드 밴드: 해시 있으면 SHA-256 kv 행 표시(64자리 줄바꿈 처리), 없으면 미표시. 임시 데이터로 렌더 검증 후 원복.
- README에 필드 사용법·해시 추출 명령(shasum/certutil) 문서화. [대기] 실물 릴리스 등장 시 값 주입만 하면 됨.

## 개선 13 — 골든 벡터 라이브 배지 (2026-08-03)
- 9개 제품 저장소에 .github/workflows/verify.yml 신설: push+일일 크론(03:00 KST)+수동. dotnet 8종 dotnet test, local-test-copilot은 pytest — Ubuntu gcov 차이로 13건 실패해 macos 러너로 전환(240→253/253). secsgem은 루트 마커가 로컬 전용 CLAUDE.md라 CI에서 실패 → 커밋되는 .sln 마커로 수정(제품 저장소 테스트 인프라 버그 픽스). 최종 9/9 success.
- 웹사이트: verify-status.yml(일일 04:00 KST)이 각 저장소 최신 Verify 결론을 content/ci-status.json으로 커밋 → Pages 자동 재배포. 상세 마스트헤드에 VERIFIED 행: 성공=액센트 "SUITE PASS · 날짜", 실패=앰버 "FAILING · 날짜"(빨간 날도 공개 — 브랜드 원칙), 런 링크. 데이터 없으면 미표시.
- 비용 0(공개 저장소 Actions 무료), 방문자 브라우저 외부 호출 없음(빌드타임 정적 JSON).
- [메모] 통과/전체 카운트 표기는 후속 개선 여지(현재는 결론+날짜).

## 개선 14 — 코드 서명 무료 전략 문서화 (2026-08-03)
- [결정] OV 인증서(연 $200~400) 미구매. 무료 전략 확정: 베타까지 SHA-256 + SignPath Foundation(OSS 무료 서명, 게시자명 재단 표기 트레이드오프) + 폐쇄망용 self-signed 인증서 1회 등록 → 유료화 시 Azure Trusted Signing(연 ~$120) 전환.
- /security (en·/ko, 총 43라우트): 고객용 다운로드 검증 정본 — SHA-256 3단계 절차(외부 기록→반입→내부 대조)+OS별 내장 명령, 코드 서명 정책(공개 릴리스/폐쇄망 두 경로, "아직 공개 빌드 없음" 정직 표기), 다운로드가 하지 않는 일(설치·자동업데이트·텔레메트리 없음). 푸터 "다운로드 검증" 링크·sitemap 반영.
- docs/SIGNING.md 내부 런북: SignPath 신청 요건 체크리스트(일부 저장소 LICENSE가 All rights reserved라 OSS 요건 정리 필요 — 릴리스 전 선결 과제), self-signed 생성/서명/검증 명령 일체(타임스탬프 무료 서버 포함), 릴리스 체크리스트, Azure 전환 절차.

## 개선 15 — testbench.tools ↔ NOKTRA 퍼널 연결 (2026-08-03)
- [결정] 도메인 등록 전 진행(사용자) — 양쪽 모두 링크 베이스 상수 1곳(NOKTRA_BASE/TB_BASE)이라 noktra.io 등록 시 한 줄 교체.
- testbench: content/noktra-links.ts(툴 22종 → 제품 4종 강한 연관만: 1553/ARINC→Ch10, Modbus/CNET→Bridge, TDMS/파형/스케일링→Scope, 비트·워드오더→ICD) + ToolShell 하단 NoktraBanner(en/ko, 매핑 없으면 미렌더). 빌드 검증: mil-1553 배너 O, pt100 배너 X. 커밋 64b6f19 푸시됨.
- NOKTRA: lib/funnel.ts(제품 5종 → 웹툴 3~4개) + 상세 인접도구 밴드 상단 퍼널 행 + 푸터 "무료 웹툴" 링크. testbench ko 페이지가 있는 툴만 /ko 링크(5종), 나머지 영문 폴백(404 방지).
- [대기] testbench 라이브 반영은 wrangler login 후 `wrangler deploy` 필요(미인증).

## 개선 16 — 상단 네비 크로스 로고 링크 (2026-08-04)
- testbench 헤더: Desktop Apps 왼쪽에 NOKTRA 세리프 워드마크 링크(로케일 인식: ko→/ko). NOKTRA 헤더: Products 왼쪽에 TestBench.tools 세리프 로고 링크(.nav__tb — 모노 네비 사이 세리프로 브랜드 구분, ko→/ko/).
- 2026-08-04: wrangler 로그인 후 testbench 배포 완료 — 라이브 확인: 헤더 NOKTRA 로고 전 페이지, 퍼널 배너는 매핑된 툴에만(mil-1553 O, pt100 X). 퍼널 양방향 가동.
- 2026-08-04 (개선 16 보강): 크로스 로고 링크를 보더 칩으로 재설계(사용자 피드백 — 텍스트로만 보여 인지 안 됨). 양쪽 모두: 헤어라인 보더 + NOKTRA 액센트 도트(#31A9BC) + ↗ 화살표 + hover 강조 + title 툴팁("자매 사이트 — …"). NOKTRA 쪽은 테마/언어 세그먼트와 동일 문법, testbench 쪽은 자사 라운드 배지 문법.

## 유지보수 — 플래키 Verify 2건 수정 (2026-08-14)
- 정기 Verify 도입 후 간헐 실패 메일 다수(sil-runtime 2회, protocol-bridge 3회) — 라이브 배지가 잡아낸 실전 플래키.
- sil-runtime StartAndPauseDriveTheBackgroundHost: 느린 러너에서 Pause가 첫 사이클을 추월해 채널 전부 0 → 값 관측까지 조건 대기(상한 10s, 고정 sleep 아님) 후 Pause. 로컬 296/296 통과.
- protocol-bridge Deadband E2E: IsCompleted 폴링이 전송 중 데이터그램을 놓침 → forwarded==2 확정 후 소켓 버퍼에서 직접 await 수신 2건으로 재구성. 로컬 659/659 통과.
- 양쪽 CI success 확인, verify-status 수동 갱신으로 배지 최신화.

## 리디자인 준비 — v2 디자인 프롬프트 작성 (2026-08-16)
- 방향: "deep-space probe HUD" — 레퍼런스 7장 분석(핵심: 행성 대신 제품 스크린샷을 HUD 링 크롬으로 감싸 스캔하는 문법) + 인터랙션 1순위 레퍼런스 aaronjcunningham.com(커서 반응 입자 필드·//넘버링·라이트웨이트 모드), 보조 edolus.com.
- 팔레트 시맨틱 확정 제안: 블랙(우주 캔버스)·화이트(하드웨어 크롬)·오렌지(에너지 — 신규, 정확값은 시안이 결정)·민트 #31A9BC(라이브 신호 — 유지). beta 앰버와 브랜드 오렌지 구분 유지(병합 시 시안이 명시 제안).
- DESIGN_PROMPT_V2.md 작성 — 산출물: Token Sheet v2 + Home/Detail/Index/Philosophy v2 (.dc.html → design-mockups/v2/). 모션은 키프레임 정적 표현 + 텍스트 브리프(구현은 이식 단계에서). [대기] 사람이 Claude Design 실행 → 시안 투입 후 이식 시작.

## 브랜드 — 파비콘 확정: 스캔 링 N (2026-08-16)
- 후보 10안(레터 5 + 픽토그램 5) 비교 후 사용자 확정: A "스캔 링 N" — HUD 틱 링(36틱+메이저 12) + 오렌지 스캔 아크 + 세리프 N, v2 probe-HUD 컨셉과 1:1 호응. 임시 N 사각형 대체.
- 실서비스·v2 샘플 동시 적용, ?v=2 쿼리로 파비콘 캐시 무력화.

## v2 이식 Phase 0–3 (2026-08-16, 브랜치 v2)
- Phase 0: 샘플 확정 자산 이식(토큰·씬 홈·StarField/HudFrame/SecNo/ScrollRail·ko 폰트), DESIGN_VISUAL.md에 "v2부터 구현이 룩의 정본" 명문화.
- Phase 1: 상세페이지 HUD 마스트헤드+//넘버링(NEEDS~FAQ), 인덱스 에너지 액센트, 데드 컴포넌트 3종 제거(HeroProbe/InstrumentIndex/ScreenshotFrame).
- Phase 2: 라이트(랩 그레이) 전 페이지 스윕 통과, text-faint 대비 상향(v1 [미정] a11y 해소).
- Phase 3 성능: desktop 홈 95/96/100/100(LCP 1.5s·CLS 0), 상세 93/96. mobile 홈 71→78 — KR 폰트 CSS(292KB)가 en 청크에 섞이던 회귀를 fonts-ko.ts 분리로 해소(en CSS 351→59KB). observed LCP 122ms(시뮬레이터가 하이드레이션에 고정하는 기지 패턴, v1 동일). reduced-motion에서 씬이 통과 상태(--p=1)로 굳어 콘텐츠 소실되는 버그 발견→CSS 폴백 블록으로 정적 문서 강등 수정.

## v2 리디자인 배포 (2026-08-16)
- 사용자 승인 후 v2 브랜치 → main 머지·배포. 라이브 v2 마크업(en/ko 씬 홈) 확인.
- 라이브 Lighthouse desktop: **100 / 96 / 100 / 100** (LCP 0.6s · CLS 0 · TBT 0ms) — CDN 서빙에서 v1보다 오히려 상승.
- 이로써 probe-HUD 리디자인 완결: 씬 홈·HUD 상세·라이트(랩 그레이)·ko 폰트·스캔 링 N 파비콘 전부 라이브.

## 수정 — 모션 오버라이드 토글 (2026-08-20)
- 증상 보고: 회사 노트북 크롬에서 인터랙션만 전부 미동작(디자인은 정상) — 원인은 OS 동작줄이기(prefers-reduced-motion)에 의한 설계상 정적 강등. 조용한 강등이 UX 문제라 판단.
- 해결: <html data-motion=static|active> 체계 도입 — 인라인 스크립트가 localStorage('noktra-motion') 오버라이드 > OS 설정 순으로 결정. 전 컴포넌트(StarField/SceneHome/HudFrame/SecNo)와 CSS 폴백을 media query에서 data-motion 셀렉터로 전환(단일 진실).
- 정적 모드일 때 헤더에 에너지색 "STATIC MODE · ENABLE"(ko: 정적 모드 · 모션 켜기) 칩 표시 — 클릭 시 사이트 한정 모션 재활성(리로드). 헤더 혼잡 방지로 1600px 이하에서 장식 태그 숨김.
- 2026-08-20 (후속): 사용자 결정으로 기본값 반전 — OS 동작줄이기와 무관하게 전 방문자 모션 ON. [결정] prefers-reduced-motion 기본 존중 원칙 철회, 대신 푸터에 "모션 끄기" 마이크로 토글을 상시 노출해 접근성 탈출구 유지. 헤더 STATIC MODE 칩은 사용자가 직접 끈 경우에만 표시됨.

## 개선 — THE NINE 스크린샷 확대 + 입체 인터랙션 (2026-08-20)
- 확대: 씬 HUD 62vh→72vh, 링 내 타깃 66%→82% (체감 +45%), 리스트 열 400→340px·패딩 축소로 공간 확보. 상세페이지 HUD도 동반 확대.
- 입체: perspective 1100px 레이어(hud__persp/tilt) — ①포인터 호버 틸트(±12°/9°, lerp 감쇠) ②스크롤 관성 틸트(휠 속도 비례 젖힘→복원). 브래킷 translateZ 30px·크로스헤어 22px로 이미지 위 공중 크롬, 이중 드롭섀도(다크/라이트 별도). 정적 모드에선 틸트 완전 무해화.
- 2026-08-20 (추가 확대): 타깃을 링 내접(82%)에서 링 지름 전체(100%)로 — 포스터식 오버플로 구도(링이 패널 뒤로 지나감). 씬 상한 760px·상세 74vh/780px. 스크린샷 내 텍스트 판독 가능 확인.
- 2026-08-20 (입체감 회귀 수정): 엔트런스 클리핑(clip-path·overflow)이 .hud__target에 걸려 브래킷/크로스헤어(translateZ 공중 크롬)를 잘라내고 3D를 평탄화 → 클리핑을 이미지 전용 .hud__shot 내부 레이어로 이동해 해방. 패널 확대에 맞춰 perspective 1100→750px로 깊이 강화.

## 2026-08-23 — v4 ORBIT 홈 적용 (스킬 쇼케이스 → 본편 채택)
- 홈 전면 교체: SceneHome(v3 스크롤 씬) → OrbitHome(시네마틱 WebGL).
  - 히어로: 스캔 링(파비콘 확대판, 틱 다이얼 72 + 오렌지 스캔 아크) + 입자 NOKTRA 워드마크 어셈블-인.
  - 스크롤: 입자 양자화 모프 — 워드마크 해체 → 9개 제품 스크린샷 지그재그 재응집(좌/우 교대).
    응집은 입자 실제 수렴 거리 기반 블러→초점 크로스페이드로 실물 스크린샷 표시,
    완전 선명 시 형성 입자 완전 페이드(삐져나옴 방지). 피날레: 링·워드마크 재등장(수미상관).
  - 배경 유체 셰이더: 민트 → 용융 오렌지 스크롤 이행. 응집 중 배경 70% 감광.
  - three.js는 CDN 동적 import(webpackIgnore) — 패키지 의존성 추가 없음.
  - data-motion=static: WebGL 없이 정적 폴백(타이틀 + 9제품 카드 그리드).
  - 커스텀 커서(오렌지 점 + 지연 링)는 홈에서만, pointer:fine 한정.
- 헤더: 메뉴를 필(pill) 그룹으로 재스타일 — 활성 페이지는 화이트 필(라이트 모드는 토큰 반전).
- 홈 한정 다크 크롬 강제(body.ob-on) + 별/레일 숨김 + 헤더 z-index 50 승격(캔버스 위).
- 컨셉 탐색 이력(noktra-v3-sample): TERMINAL(픽) · DOSSIER(탈락) · KINETIC(픽) · ORBIT v8.2(최종 채택, E1 히어로).

## 2026-08-29 — 저장소 비공개 전환 + 사이트 후속 정리
- 비공개 전환 완료(14개): veristand-rs422-custom-device-starter, nexys-xgt-sim, flightsim-poc,
  blockly-subroutine-app, flight-sim-fable5, NOKTRA-* 9종.
  · noktra-website는 **공개 유지** — 무료 플랜에서 비공개 시 GitHub Pages가 중단되어 라이브 사이트가 죽기 때문(사용자 결정).
  · flight-sim-fable5의 Pages 데모(https://kim-hakseong.github.io/flight-sim-fable5/)는 이로써 오프라인.
- 후속 정리(공개 사이트에 죽은 링크가 남지 않도록):
  · lib/products.ts에 `REPOS_PUBLIC = false` 플래그 신설 — products.json의 repo URL은 보존하고
    노출만 게이팅. 공개로 되돌릴 때 이 한 줄만 true로 바꾸면 전부 복구된다.
  · 게이팅 지점: 제품 상세 GitHub 버튼·SOURCE 행, VERIFIED 배지 링크(배지 사실은 유지, 링크만 제거),
    노트 상세 출처 인용, seo.ts sameAs·소스 위치 FAQ·note citation, public/llms.txt의 Source 9건.
  · FAQ 문구에서 "개발 과정은 저장소에 공개되어 있습니다" 삭제 — 사실과 어긋나므로.
  · 검증: 빌드 산출물에 href로 걸린 비공개 저장소 링크 0건, sameAs는 브랜드 계정만 남음.
- verify-status.yml(골든 벡터 배지 집계) 보호:
  · 기본 GITHUB_TOKEN은 타 저장소의 private 저장소를 읽지 못해 수집이 0건이 된다.
  · 토큰을 `secrets.VERIFY_TOKEN || github.token`으로 바꾸고, 수집 0건이면 기존 ci-status.json을
    덮어쓰지 않도록 가드 추가 — 배지가 통째로 사라지는 대신 마지막 상태로 동결된다.
  · 배지를 되살리려면 repo 스코프 PAT를 VERIFY_TOKEN 시크릿으로 등록하면 된다.
