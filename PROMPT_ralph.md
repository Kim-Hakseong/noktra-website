# PROMPT_ralph.md — Ralph 루프 (NOKTRA 웹사이트)
세션당 milestone 1개(W1~W6). 시작: CONTEXT→CLAUDE→PRD→DESIGN→DESIGN_VISUAL→RALPH_LOG→`pnpm install && pnpm build` green 확인(red면 복구, W1 이전이면 이식부터).
- 질문 금지, [결정]/[미정] 로그. products.json 문구 수정 금지. DESIGN_VISUAL 비어 있으면 뉴트럴 토큰+[미정].
- npm install 금지(pnpm). 서버 기능 금지 — 정적 export 깨지면 위반. 배포 워크플로는 W6, 실제 배포는 사람.
DoD: pnpm build 성공·전 라우트 export·PRD DoD·RALPH_LOG append(## W{n} 형식). 종료 시 질문 없이.
