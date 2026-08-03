// Field Notes — 각 제품 README(소유자 작성)의 논지를 확장한 짧은 에세이.
// 새 기술 주장 없음: 저장소에 이미 문서화된 설계 결정만 다룬다.
// testbench.tools의 notes 패턴(Article JSON-LD + citation) 이식.

export interface Note {
  slug: string;
  title: string;
  titleKo: string;
  description: string;
  descriptionKo: string;
  published: string; // ISO date
  relatedSlug: string; // 관련 제품
  source: string; // 논지의 출처 저장소
  body: string[]; // en 문단
  bodyKo: string[]; // ko 문단
}

export const NOTES: Note[] = [
  {
    slug: "a-skipped-step-is-not-a-pass",
    title: "A skipped step is not a pass",
    titleKo: "건너뛴 단계는 합격이 아니다",
    description:
      "Why a test run with an unexecuted step must fail, and how quietly reporting unknowns as passes is the exact failure a test tool exists to prevent.",
    descriptionKo:
      "실행되지 않은 단계가 있는 시험 런은 왜 실패여야 하는가 — 미지수를 합격으로 조용히 보고하는 것이야말로 시험 도구가 막아야 할 바로 그 실패다.",
    published: "2026-08-03",
    relatedSlug: "test-sequencer",
    source: "https://github.com/Kim-Hakseong/NOKTRA-test-sequencer",
    body: [
      "Every test executive has to answer one uncomfortable question: what is the verdict of a step that never ran? A sequence aborts at step 7 of 20. Steps 8 through 20 produced no measurements, judged no limits, exercised nothing. What goes in the report?",
      "The tempting answer is to leave them blank, or grey, or 'skipped' — and then to summarise the run by the steps that did execute. Six passed, one failed, the rest didn't happen. On a busy bench, three weeks later, that summary line is all anyone reads. And a summary that says 'passed 6 of 7 executed' has a way of becoming 'mostly passing' in a slide, and 'passing' in a decision.",
      "NOKTRA Sequencer takes the strict position: if a step never ran, the run failed. Not because the unit under test did anything wrong, but because the run does not know whether it did. A test report is a claim about what was verified. A skipped step is precisely the absence of verification, and reporting an absence as anything adjacent to success is how bad units ship with clean paperwork.",
      "This sounds obvious written down. It is not the default in practice, because strictness is annoying. An operator who aborts a run to fix a cable does not want a red FAIL over something that 'wasn't a real failure'. The pressure to soften the verdict is constant and reasonable-sounding, and it must lose every time, because the report outlives the context. The paper does not remember that the abort was innocent.",
      "There is a second design consequence. If unexecuted means failed, then teardown must still run — power-down, discharge, disconnect — even in a failing run, and the report must show that it ran. Failure handling stops being an edge case and becomes part of the sequence contract: what aborts, what is skipped, what always executes.",
      "The verdict logic itself stays deliberately dumb: pass and fail come from a pure function of the rule and the measurement. No clock, no I/O, no state. Two runs over the same readings cannot disagree. All of the judgement lives in one place a reviewer can read, and none of it lives in the moment when someone is tired and wants the run to be over.",
    ],
    bodyKo: [
      "모든 테스트 이그제큐티브는 한 가지 불편한 질문에 답해야 합니다: 실행되지 않은 단계의 판정은 무엇인가? 20단계짜리 시퀀스가 7단계에서 중단됐습니다. 8~20단계는 아무것도 측정하지 않았고, 어떤 한계도 판정하지 않았습니다. 리포트에는 뭐라고 적힙니까?",
      "유혹적인 답은 그 칸들을 비워두거나, 회색으로 두거나, '건너뜀'이라 적고 — 실행된 단계만으로 런을 요약하는 것입니다. 6개 합격, 1개 불합격, 나머지는 없었던 일. 바쁜 벤치에서 3주가 지나면 모두가 읽는 것은 그 요약 한 줄뿐입니다. 그리고 '실행된 7개 중 6개 합격'이라는 요약은 슬라이드에서 '대체로 합격'이 되고, 의사결정에서는 '합격'이 되는 습성이 있습니다.",
      "NOKTRA Sequencer는 엄격한 입장을 취합니다: 단계가 실행되지 않았다면, 그 런은 실패입니다. 시험 대상이 뭔가 잘못해서가 아니라 — 잘못했는지 여부를 그 런이 모르기 때문입니다. 시험 리포트는 '무엇이 검증되었는가'에 대한 주장입니다. 건너뛴 단계는 정확히 검증의 부재이고, 부재를 성공 비슷한 무엇으로 보고하는 것이야말로 불량 유닛이 깨끗한 서류와 함께 출하되는 경로입니다.",
      "글로 적으면 당연해 보입니다. 실무에서 기본값이 아닌 이유는, 엄격함이 성가시기 때문입니다. 케이블을 고치려고 런을 중단한 운용자는 '진짜 실패도 아닌 것' 때문에 빨간 FAIL이 찍히는 걸 원치 않습니다. 판정을 부드럽게 하자는 압력은 상시적이고 그럴듯하게 들리며 — 그리고 매번 져야 합니다. 리포트는 맥락보다 오래 살아남기 때문입니다. 종이는 그 중단이 무해했다는 사정을 기억하지 않습니다.",
      "두 번째 설계 귀결이 있습니다. 미실행이 곧 실패라면, teardown은 실패한 런에서도 반드시 돌아야 합니다 — 전원 차단, 방전, 분리 — 그리고 리포트는 그것이 돌았음을 보여줘야 합니다. 실패 처리는 예외 케이스가 아니라 시퀀스 계약의 일부가 됩니다: 무엇이 중단시키고, 무엇이 건너뛰어지고, 무엇이 언제나 실행되는가.",
      "판정 로직 자체는 의도적으로 단순하게 남습니다: 합격과 불합격은 규칙과 측정값의 순수 함수에서 나옵니다. 시계도, I/O도, 상태도 없습니다. 같은 판독값을 두 번 판정해 다른 결론이 나올 수 없습니다. 판단의 전부는 리뷰어가 읽을 수 있는 한 곳에 살고, 그 무엇도 '피곤해서 런을 빨리 끝내고 싶은 순간'에 살지 않습니다.",
    ],
  },
  {
    slug: "byte-identical-logs-are-a-test-tool",
    title: "Byte-identical logs are a test tool",
    titleKo: "바이트 단위로 동일한 로그는 그 자체로 시험 도구다",
    description:
      "When the same scenario produces the same CSV down to the byte, diff becomes a regression harness — no framework required.",
    descriptionKo:
      "같은 시나리오가 바이트까지 같은 CSV를 만들면, diff가 곧 회귀 시험 장치가 된다 — 프레임워크 없이.",
    published: "2026-08-03",
    relatedSlug: "sil-runtime",
    source: "https://github.com/Kim-Hakseong/NOKTRA-sil-runtime",
    body: [
      "NOKTRA SIL Runtime makes a promise that sounds modest and is not: run the same scenario twice, and the two log files are identical. Not similar, not equal-within-tolerance — byte for byte. LF endings on every platform, UTF-8 without BOM, invariant number formatting, and no wall-clock timestamp written into the file.",
      "The last item is the tell. A timestamp inside a log is harmless until the day you want to compare two logs, at which point every line differs and the comparison needs a parser, a tolerance, and a meeting. Leave the timestamp out and the comparison collapses into the oldest tool on the machine: diff. Empty output, or a finding.",
      "This turns reproducibility from a philosophical stance into a daily instrument. Refactored the integrator? Run the golden scenario, diff against the stored log. Changed a compiler flag? Diff. Upgraded the framework? Diff. Anyone can run this check, it takes seconds, and its verdict cannot be argued with — which is the property that matters in review.",
      "Getting there costs real design decisions, and they are worth naming. Simulation time is always step-index times dt, never accumulated, so 10,000 cycles at 1 kHz land on exactly 10.0 seconds with no float drift. Wall-clock pacing decides when a cycle runs, never what it computes, so a paced run for watching and a fast run for CI produce the same numbers. Display buffers live outside the deterministic path, so dropping a UI sample can never change a result. Even the compiled C models are built with FP contraction off, because a fused multiply-add is more accurate and differently wrong.",
      "There is a general lesson here that extends past simulation. Any tool that writes results — reports, exports, generated code — quietly chooses whether its output can be diffed. Timestamps, map iteration order, locale formatting, float printing: each one is a small decision that either preserves diffability or spends it. Most software spends it without noticing.",
      "The offline angle closes the loop. On an air-gapped bench there is no dashboard service to compare runs for you. There is the file, and there is diff. A tool designed for that room had better make those two things sufficient.",
    ],
    bodyKo: [
      "NOKTRA SIL Runtime은 소박하게 들리지만 소박하지 않은 약속을 합니다: 같은 시나리오를 두 번 돌리면, 두 로그 파일이 동일하다. 비슷한 게 아니라, 오차 내에서 같은 것도 아니라 — 바이트 단위로. 모든 플랫폼에서 LF 줄바꿈, BOM 없는 UTF-8, 불변 숫자 포매팅, 그리고 파일 안에 벽시계 타임스탬프를 쓰지 않음.",
      "마지막 항목이 핵심입니다. 로그 안의 타임스탬프는 두 로그를 비교하고 싶어지는 날까지는 무해합니다. 그날이 오면 모든 줄이 달라져 있고, 비교에는 파서와 허용 오차와 회의가 필요해집니다. 타임스탬프를 빼면 비교는 머신에서 가장 오래된 도구로 환원됩니다: diff. 출력이 비어 있거나, 발견이 있거나.",
      "이로써 재현성은 철학적 입장이 아니라 일상의 계기가 됩니다. 적분기를 리팩터링했다? 골든 시나리오를 돌리고 보관된 로그와 diff. 컴파일러 플래그를 바꿨다? diff. 프레임워크를 올렸다? diff. 누구나 돌릴 수 있고, 몇 초면 되고, 그 판정에는 반론이 불가능합니다 — 리뷰에서 중요한 건 바로 그 속성입니다.",
      "여기 도달하는 데는 실제 설계 결정들이 들고, 이름을 불러줄 가치가 있습니다. 시뮬레이션 시간은 언제나 스텝 인덱스 × dt이며 누적이 아니라서, 1kHz로 10,000사이클이면 부동소수점 표류 없이 정확히 10.0초에 떨어집니다. 벽시계 페이싱은 사이클이 '언제' 도는지만 정하고 '무엇을' 계산하는지는 결코 건드리지 않아서, 눈으로 보는 페이싱 런과 CI용 고속 런이 같은 숫자를 냅니다. 표시용 버퍼는 결정론 경로 바깥에 살아서, UI 샘플 하나가 떨어져도 결과가 바뀔 수 없습니다. 컴파일된 C 모델조차 FP 축약을 끄고 빌드합니다 — 융합 곱셈-덧셈은 더 정확하고, 다르게 틀리기 때문입니다.",
      "시뮬레이션을 넘어서는 일반 교훈이 있습니다. 결과를 파일로 쓰는 모든 도구는 — 리포트, 내보내기, 생성 코드 — 자기 출력이 diff 가능한지를 조용히 선택하고 있습니다. 타임스탬프, 맵 순회 순서, 로케일 포매팅, 부동소수점 출력: 하나하나가 diff 가능성을 보존하거나 소모하는 작은 결정입니다. 대부분의 소프트웨어는 눈치채지 못한 채 소모합니다.",
      "오프라인이라는 조건이 고리를 닫습니다. 폐쇄망 벤치에는 런을 대신 비교해 줄 대시보드 서비스가 없습니다. 파일이 있고, diff가 있습니다. 그 방을 위해 설계된 도구라면, 그 둘로 충분하게 만들어야 합니다.",
    ],
  },
  {
    slug: "the-empty-spec-folder-is-the-feature",
    title: "The empty spec/ folder is the feature",
    titleKo: "비어 있는 spec/ 폴더가 곧 기능이다",
    description:
      "Three NOKTRA tools ship refusing to compute until a human transcribes the standard, with a citation. Why shipping 'less' is the honest design.",
    descriptionKo:
      "NOKTRA 도구 셋은 사람이 표준을 출처와 함께 옮겨 적기 전까지 계산을 거부한 채 출하된다. '덜' 담아 출하하는 것이 왜 정직한 설계인가.",
    published: "2026-08-03",
    relatedSlug: "ram-toolkit",
    source: "https://github.com/Kim-Hakseong/NOKTRA-ram-toolkit",
    body: [
      "Three NOKTRA instruments share a design decision that looks, at first glance, like a missing feature. RAM Toolkit ships with no MIL-HDBK-217F coefficients. Ch10 Viewer ships with no IRIG 106 packet layout. SECS/GEM Workbench ships with no SEMI wire constants. Out of the box, each one tells you plainly that it is blocked, and parses or computes nothing that depends on the standard.",
      "The mechanism is the same in all three: a plain-text file in spec/, next to the executable, that a human fills in from their own copy of the standard — each value with a citation to the section and page it came from. The loader refuses any row without a source. Fill the file in and the whole product comes alive, with no rebuild and no code change.",
      "Why ship it empty? The first reason is legal and boring: these standards are licensed documents, and their constants are not the tool vendor's to redistribute. But the deeper reason is about failure modes. A reliability figure derived from a half-remembered coefficient, a flight-test channel decoded with a guessed byte offset, a SECS frame parsed with a format code lifted from someone else's implementation — these do not fail loudly. They produce plausible numbers that are wrong, and plausible-but-wrong is the most expensive failure class in verification, because it is discovered after the analysis, by someone else.",
      "The transcription step converts an invisible risk into a visible chore. Yes, someone must spend an afternoon with the handbook and a text editor. In exchange, every constant in the pipeline has a name attached — this value, from this table, on this page, entered by this person. When an auditor asks where a number came from, the answer is a citation, not an archaeology project. RAM Toolkit goes one further: every report states which spec excerpts were in force when it was generated.",
      "There is also a quiet capability hiding in the mechanism. Because the layout is data, not code, a non-standard variant — a vendor's private extension, a program-specific framing — is handled by editing a text file, not by requesting a build from the vendor. The gate that enforces honesty doubles as the extension point.",
      "The pattern generalises to a rule worth stealing: when a tool's correctness depends on a document it cannot legally or reliably contain, the tool should carry the document's shape and refuse to guess its contents. Shipping less, loudly, beats shipping more, wrongly.",
    ],
    bodyKo: [
      "NOKTRA 도구 셋은 언뜻 보면 기능 누락처럼 보이는 설계 결정을 공유합니다. RAM Toolkit은 MIL-HDBK-217F 계수 없이 출하됩니다. Ch10 Viewer는 IRIG 106 패킷 레이아웃 없이 출하됩니다. SECS/GEM Workbench는 SEMI 와이어 상수 없이 출하됩니다. 상자를 열면 셋 모두 자신이 막혀 있음을 분명히 알리고, 표준에 의존하는 것은 아무것도 파싱하지도 계산하지도 않습니다.",
      "메커니즘은 셋 다 같습니다: 실행 파일 옆 spec/ 폴더의 평문 파일. 사람이 자기가 보유한 표준 사본에서 옮겨 적습니다 — 각 값마다 출처 절·페이지 표기와 함께. 로더는 출처 없는 행을 거부합니다. 파일을 채우면 제품 전체가 살아납니다. 재빌드도, 코드 수정도 없이.",
      "왜 비워서 출하하는가? 첫 번째 이유는 법적이고 재미없습니다: 이 표준들은 라이선스 문서이고, 그 상수는 도구 제작자가 재배포할 수 있는 것이 아닙니다. 하지만 더 깊은 이유는 실패 양식에 있습니다. 어렴풋이 기억하는 계수로 도출된 신뢰도 수치, 추측한 바이트 오프셋으로 디코드된 비행시험 채널, 남의 구현에서 베껴온 포맷 코드로 파싱된 SECS 프레임 — 이것들은 요란하게 실패하지 않습니다. 그럴듯하지만 틀린 숫자를 만들어냅니다. 그리고 '그럴듯하지만 틀림'은 검증에서 가장 비싼 실패 유형입니다. 분석이 끝난 뒤에, 다른 사람에 의해 발견되기 때문입니다.",
      "옮겨 적기 단계는 보이지 않는 리스크를 보이는 잡무로 바꿉니다. 그렇습니다, 누군가 핸드북과 텍스트 에디터로 오후를 보내야 합니다. 그 대가로 파이프라인의 모든 상수에 이름이 붙습니다 — 이 값은, 이 표에서, 이 페이지에서, 이 사람이 입력했다. 감사관이 숫자의 출처를 물을 때 답은 출처 표기이지, 고고학 프로젝트가 아닙니다. RAM Toolkit은 한 걸음 더 갑니다: 모든 리포트가 생성 시점에 유효했던 spec 발췌를 명시합니다.",
      "이 메커니즘에는 조용한 능력 하나가 숨어 있습니다. 레이아웃이 코드가 아니라 데이터이므로, 비표준 변형 — 벤더의 사설 확장, 프로그램 특유의 프레이밍 — 은 벤더에게 빌드를 요청하는 게 아니라 텍스트 파일을 고쳐서 다룹니다. 정직을 강제하는 게이트가 곧 확장 지점을 겸합니다.",
      "이 패턴은 훔쳐갈 만한 규칙으로 일반화됩니다: 도구의 정확성이 법적으로든 신뢰성으로든 내장할 수 없는 문서에 의존한다면, 도구는 그 문서의 '형태'를 지니되 '내용'을 추측하기를 거부해야 한다. 덜 담아 요란하게 출하하는 것이, 더 담아 틀리게 출하하는 것을 이깁니다.",
    ],
  },
];

export function noteBySlug(slug: string): Note | undefined {
  return NOTES.find((n) => n.slug === slug);
}
