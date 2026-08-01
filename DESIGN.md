# DESIGN.md — NOKTRA 웹사이트 (구조)
## 이식 절차(W1)
같은 소유자 저장소 github.com/Kim-Hakseong/nexys-website 를 클론 → nexys-web/ 골격 복사 → Nexys 고유 콘텐츠(로고·문구·케이스)를 제거하고 밴드 시스템(section--dark/--ink/--paper)·Header/Footer/Reveal 구조 보존 → 브랜드 상수만 NOKTRA로.
## 데이터 스키마 content/products.json
{ "verbs":[{"id":"define","label":"Define"},...5개],
  "products":[{"slug":"icd-refinery","name":"ICD Refinery","verb":"define",
    "oneLiner":"...","features":["...","...","..."],"status":"in-development|beta|available",
    "repo":"https://github.com/Kim-Hakseong/NOKTRA-icd-refinery","download":{"win":"","mac":""},
    "specs":[["Platform","Windows 10/11 x64"],["Deploy","Single-file exe"],["Network","Offline-first"]]}] }
- 시드 데이터는 content/products.json에 9개 전부 기재돼 있음(영문 한줄 포함) — Ralph는 이 파일을 소비만, 문구 수정 금지.
## 상태 배지 시맨틱: available=액센트 / beta=warn(앰버 계열) / in-development=muted — 색 값은 tokens.css 참조.
## 테마: styles/tokens.css에 [data-theme="light"]/[data-theme="dark"] CSS 변수 2세트. DESIGN_VISUAL.md 산출값 주입 지점. 히어로·철학 밴드=다크 앵커, 제품 밴드=패널 톤(라이트 모드 기준) — 다크 모드에선 패널이 침강, 다크 밴드가 잉크로 완화(시안 산출 로직 따름).
## 스크린샷 프레임: 16:10 회색 프레임 컴포넌트(제품별 이미지 경로 products.json에서, 없으면 라벨 표시). 실제 스크린샷은 사람이 /public/shots/에 투입.
