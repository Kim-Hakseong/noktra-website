# CLAUDE.md — NOKTRA 웹사이트 빌드 헌법
우선순위: CONTEXT.md → CLAUDE.md > DESIGN.md(구조) · DESIGN_VISUAL.md(룩 — 충돌 시 룩은 이것) > PRD.md
## 스택 (고정)
- 기존 nexys-website 골격 이식: Next.js 14(App/Pages 기존 방식 유지) + framer-motion + 정적 export(output:'export') + GitHub Pages 배포.
- 패키지 매니저 **pnpm** (npm install 금지 — 이식 시 lockfile 재생성). 서버 기능·API 라우트·DB 금지(전부 정적).
- 허용 의존성: 골격이 이미 쓰는 것(next, react, framer-motion)+타입 계열. 추가 금지. UI 라이브러리 금지.
## 절대 규칙
1. 룩(색·타이포·간격·라운드)은 DESIGN_VISUAL.md와 styles/tokens.css가 유일 기준. **DESIGN_VISUAL.md가 비어 있으면 뉴트럴 임시 토큰으로 구조만 완성**하고 [미정] 로그 — 임의 스타일 발명 금지.
2. 제품 정보(이름·한줄·상태·저장소 링크)는 content/products.json이 단일 진실. 하드코딩 금지.
3. 카피는 CONTEXT의 포지셔닝·철학 문구 원문 사용. 기술 주장 창작 금지(placeholder 스크린샷은 회색 프레임+"screenshot" 라벨, 가짜 UI 이미지 생성 금지).
4. 라이트/다크: <html data-theme> + 인라인 스크립트 FOUC 방지, 기본 prefers-color-scheme, localStorage 유지.
5. 다운로드 링크는 products.json의 releases URL 주입 — 빈 값이면 "In development" 처리.
## 완성 정의: pnpm build 정적 export 성공 + 라우트 전부 생성 + RALPH_LOG 기록.
