# PRD.md — NOKTRA 웹사이트
## 페이지
| 경로 | 내용 |
|---|---|
| / | 히어로(워드마크+포지셔닝 한 줄+시그널 모티프) → 5동사 제품 그리드(9카드+상태 배지) → 신뢰 기둥 3(Offline-first/Deterministic/Single-file) → 철학 스트립("Proof, not consensus." 대형 세리프) → 푸터 |
| /products | 인덱스(5동사 그룹, 상태 배지, 검색 불요) |
| /products/[slug] | 상세 템플릿 ×9: 이름·한줄·스크린샷 프레임·기능 3·상태·spec 표(모노)·GitHub/다운로드 CTA |
| /method | 철학+방법론: Proof not consensus / 골든 벡터 / 오프라인 우선 / 인프라 사실(CI 팜·로컬 LLM 벤치·Jetson 테스트베드) — 텍스트 주도, 조용하게 |
| /contact | mailto + GitHub 링크 (폼 없음 — 정적) |
## 마일스톤
| M | 산출물 | DoD |
|---|---|---|
| W1 | nexys-website 골격 이식(Nexys 콘텐츠 제거, 밴드·컴포넌트 보존) + pnpm 전환 + tokens.css 슬롯 + 테마 토글(FOUC) | build 성공, 빈 홈 렌더, 토글 동작 |
| W2 | products.json 데이터층 + 홈 전체(히어로~푸터) | 홈 완성, 배지 3상태 렌더 확인 |
| W3 | 제품 상세 템플릿 + 9페이지 정적 생성 | 전 slug 라우트 export 포함 |
| W4 | /products 인덱스 + /method + /contact | 전 페이지 완성 |
| W5 | SEO(메타·OG·sitemap·JSON-LD Organization/SoftwareApplication) + 반응형·다크 폴리시 | Lighthouse SEO/성능 90+ 기록 |
| W6 | GitHub Pages 배포 워크플로 + README(도메인 연결 절차 포함) | out/ 확인, 배포 문서 완비 |
