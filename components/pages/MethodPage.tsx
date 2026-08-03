// /method — Philosophy 시안 정본: 선언 → 방법론 4절 → 인프라 사실 → 권위의 순서 → 거부 목록 → 맺음
// 본문 카피는 시안 원문(영), 한국어는 의미 보존 번역. 인프라 사실은 CONTEXT.md 기재 사실만.
import LLink from "@/components/LLink";
import Reveal from "@/components/Reveal";
import { Tx } from "@/lib/i18n";

const SECTIONS = [
  {
    no: "01",
    title: "A golden vector is a promise you can re-check",
    titleKo: "골든 벡터는 다시 확인할 수 있는 약속이다",
    body: "Every tool ships with a suite of inputs whose correct outputs are known and fixed. They are not examples and not documentation — they are the thing the build is measured against, and they travel inside the executable.",
    bodyKo:
      "모든 도구는 정답이 알려져 있고 고정된 입력들의 스위트와 함께 배포됩니다. 예제도 문서도 아닙니다 — 빌드가 측정되는 기준 그 자체이고, 실행 파일 안에 함께 들어갑니다.",
    body2:
      "If a change makes one vector disagree, the build does not ship. There is no discussion about whether the difference matters, because the vector was agreed upon while nobody was under deadline.",
    body2Ko:
      "어떤 변경이 벡터 하나라도 어긋나게 하면 그 빌드는 출하되지 않습니다. 그 차이가 중요한지에 대한 토론은 없습니다 — 벡터는 아무도 마감에 쫓기지 않던 시점에 합의된 것이기 때문입니다.",
    noteLabel: "Suite",
    notes: [
      ["Shipped with build", "Always"],
      ["Runs offline", "Yes"],
      ["Re-run cost", "Seconds"],
    ],
  },
  {
    no: "02",
    title: "Determinism before intelligence",
    titleKo: "지능보다 결정론이 먼저다",
    body: "Anything that can be decided by a rule is decided by a rule. Address overlaps, impossible ranges, unit collisions, missing scale factors, coverage thresholds — these are arithmetic, not judgement, and arithmetic does not have opinions on Friday afternoon.",
    bodyKo:
      "규칙으로 결정할 수 있는 것은 전부 규칙이 결정합니다. 주소 중복, 불가능한 범위, 단위 충돌, 누락된 스케일 팩터, 커버리지 임계값 — 이것들은 판단이 아니라 산수이고, 산수는 금요일 오후에도 의견을 갖지 않습니다.",
    body2:
      "AI is used where rules genuinely cannot reach: reading a badly-scanned table, guessing what an ambiguous field name meant, drafting a first test case. Its output enters the pipeline as a proposal and is checked like anything else.",
    body2Ko:
      "AI는 규칙이 정말로 닿지 못하는 곳에 씁니다: 스캔 상태가 나쁜 표를 읽는 일, 모호한 필드명의 의도를 짐작하는 일, 첫 테스트 케이스의 초안. 그 출력은 '제안'으로 파이프라인에 들어와 다른 모든 것과 똑같이 검사받습니다.",
    noteLabel: "Division of labour",
    notes: [
      ["Rules decide", "Structure · limits"],
      ["AI proposes", "Reading · drafting"],
      ["Model location", "On-device"],
      ["Network calls", "None"],
    ],
  },
  {
    no: "03",
    title: "Offline is a design constraint, not a feature flag",
    titleKo: "오프라인은 기능 플래그가 아니라 설계 제약이다",
    body: "These tools are built for rooms where the network is deliberately absent: classified programs, flight-test benches, fab floors. That constraint is accepted at the start, because retrofitting it later never actually works.",
    bodyKo:
      "이 도구들은 네트워크가 의도적으로 존재하지 않는 방을 위해 만들어졌습니다: 보안 프로그램, 비행시험 벤치, 팹 플로어. 이 제약은 처음부터 받아들입니다 — 나중에 덧대는 방식은 실제로는 결코 성공하지 못하기 때문입니다.",
    body2:
      "One consequence is that the software cannot phone home for licences, models, updates or analytics. Another is that you can read the whole trust boundary in one sentence: the file you copied, and nothing else.",
    body2Ko:
      "그 결과 하나: 소프트웨어는 라이선스·모델·업데이트·분석 그 무엇을 위해서도 외부 서버에 연결하지 않습니다. 또 하나: 신뢰 경계 전체를 한 문장으로 읽을 수 있습니다 — 당신이 복사한 그 파일, 그 이상은 없다.",
    noteLabel: "Deployment",
    notes: [
      ["Artefact", "Single .exe"],
      ["Runtime install", "None"],
      ["Telemetry", "None, ever"],
    ],
  },
  {
    no: "04",
    title: "The engineer signs, so the engineer must be able to see",
    titleKo: "엔지니어가 서명하므로, 엔지니어는 볼 수 있어야 한다",
    body: "Approval is only meaningful if the person approving can inspect what they are approving. Every derived value carries its provenance: which page it came from, which rule accepted it, which vector covered it.",
    bodyKo:
      "승인은 승인하는 사람이 그 대상을 들여다볼 수 있을 때에만 의미가 있습니다. 파생된 모든 값은 자기 출처를 지니고 다닙니다: 어느 페이지에서 왔는지, 어느 규칙이 통과시켰는지, 어느 벡터가 커버했는지.",
    body2:
      "That audit trail is also what makes the work defensible months later, in a design review, to someone who was not in the room and should not have to take anyone at their word.",
    body2Ko:
      "그 감사 추적이야말로 몇 달 뒤 설계 리뷰에서, 그 자리에 없었고 누구의 말도 그대로 믿을 이유가 없는 사람 앞에서 작업을 방어 가능하게 만드는 것입니다.",
    noteLabel: "Traceability",
    notes: [
      ["Per-field origin", "Recorded"],
      ["Rule that passed it", "Recorded"],
      ["Re-runs", "Byte-identical"],
    ],
  },
];

// CONTEXT.md 기재 인프라 사실만 사용
const INFRA = [
  {
    k: "CI regression farm",
    v: "A Ryzen 3900X farm runs the golden-vector regression suites 24/7 against every change.",
    vKo: "Ryzen 3900X 팜이 모든 변경에 대해 골든 벡터 회귀 스위트를 24/7 실행합니다.",
  },
  {
    k: "Local LLM bench",
    v: "Local models are benchmarked on real extraction workloads; a measured model catalog decides what ships as a default.",
    vKo: "로컬 모델을 실제 추출 워크로드로 벤치마크하고, 실측 모델 카탈로그가 기본 탑재 모델을 결정합니다.",
  },
  {
    k: "Hardware testbed",
    v: "A Jetson Orin companion-computer testbed exercises MAVLink-family links against real hardware.",
    vKo: "Jetson Orin 컴패니언 컴퓨터 테스트베드가 MAVLink 계열 링크를 실기로 검증합니다.",
  },
];

const REFUSALS = [
  {
    k: "No silent fixes",
    v: "A tool never quietly corrects your document. It shows the conflict and waits for a decision.",
    vKo: "도구는 당신의 문서를 조용히 고치지 않습니다. 충돌을 보여주고 결정을 기다립니다.",
  },
  {
    k: "No cloud fallback",
    v: "If a local model is unavailable, the step fails loudly. It does not reach for an API to finish the job.",
    vKo: "로컬 모델이 없으면 그 단계는 요란하게 실패합니다. 일을 끝내려고 API에 손을 뻗지 않습니다.",
  },
  {
    k: "No opinion as verdict",
    v: "AI output is never labelled pass or fail. Only deterministic checkers issue verdicts.",
    vKo: "AI 출력에는 결코 합격/불합격 딱지가 붙지 않습니다. 판정은 결정론적 검사기만 내립니다.",
  },
  {
    k: "No hidden state",
    v: "Configuration and results are files you can read, diff and keep in your own version control.",
    vKo: "설정과 결과는 당신이 읽고, diff하고, 직접 버전 관리에 보관할 수 있는 파일입니다.",
  },
  {
    k: "No roadmap theatre",
    v: "In-development instruments are listed as such, with no date, until a build exists you can run.",
    vKo: "개발 중인 도구는 당신이 실행할 수 있는 빌드가 존재하기 전까지, 날짜 없이, 개발 중이라고만 표시됩니다.",
  },
];

export default function MethodPage() {
  return (
    <>
      {/* Statement */}
      <section className="band band--hero">
        <div className="wrap">
          <div className="statusbar">
            <span>
              <Tx en={<>Philosophy &nbsp;/&nbsp; The method</>} ko={<>철학 &nbsp;/&nbsp; 방법론</>} />
            </span>
            <span>
              <Tx
                en="Written once · revised when proven wrong"
                ko="한 번 쓰고 · 틀렸음이 증명될 때 고친다"
              />
            </span>
          </div>
          <div className="statement">
            <div className="strip__tick" />
            <h1>
              Proof,
              <br />
              not consensus.
            </h1>
            <p className="statement__lead">
              <Tx
                en="A test that passes because everyone agreed it should is not a test. It is a meeting. Verification is the practice of arranging matters so that agreement is unnecessary."
                ko="모두가 통과해야 한다고 합의했기에 통과하는 시험은 시험이 아닙니다. 그것은 회의입니다. 검증이란 합의가 필요 없도록 일을 배열하는 실천입니다."
              />
            </p>
          </div>
        </div>
      </section>

      {/* The method */}
      <section id="method" className="band band--catalog">
        <div className="wrap band__in">
          <div className="t-label">
            <Tx en="The method" ko="방법론" />
          </div>
          {SECTIONS.map((s) => (
            <Reveal className="method-sec" key={s.no}>
              <div>
                <div className="method-sec__no">{s.no}</div>
                <h2>
                  <Tx en={s.title} ko={s.titleKo} />
                </h2>
              </div>
              <div className="method-sec__body" style={{ minWidth: 0 }}>
                <p>
                  <Tx en={s.body} ko={s.bodyKo} />
                </p>
                <p>
                  <Tx en={s.body2} ko={s.body2Ko} />
                </p>
              </div>
              <div className="method-sec__notes">
                <div className="head">{s.noteLabel}</div>
                {s.notes.map(([k, v]) => (
                  <div className="row" key={k}>
                    <span className="k">{k}</span>
                    <span className="v">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 인프라 사실 (CONTEXT.md) */}
      <section className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="refusals">
            <div>
              <div className="t-label">
                <Tx en="Behind the builds" ko="빌드의 뒤편" />
              </div>
              <h2>
                <Tx
                  en="The infrastructure this runs on"
                  ko="이것이 돌아가는 인프라"
                />
              </h2>
            </div>
            <div>
              {INFRA.map((r) => (
                <div className="refusal" key={r.k}>
                  <span className="k">{r.k}</span>
                  <span className="v">
                    <Tx en={r.v} ko={r.vKo} />
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Order of authority */}
      <section className="band band--catalog">
        <div className="wrap band__in">
          <Reveal className="sec-head">
            <h2>
              <Tx en="Order of authority" ko="권위의 순서" />
            </h2>
            <p className="side">
              <Tx
                en="Three parties touch every result. Their order is fixed, and only one of them can say yes."
                ko="모든 결과에는 세 주체가 손을 댑니다. 그 순서는 고정이고, 예라고 말할 수 있는 것은 그중 하나뿐입니다."
              />
            </p>
          </Reveal>
          <div className="cells" style={{ marginTop: 0 }}>
            <Reveal className="cell">
              <div className="cell__no cell__no--faint">
                <Tx en="Proposes" ko="제안한다" />
              </div>
              <h3>
                <Tx en="Local AI" ko="로컬 AI" />
              </h3>
              <p>
                <Tx
                  en="Reads documents, drafts candidates, suggests test cases. Runs on the engineer's own machine and is never granted the last word."
                  ko="문서를 읽고, 후보를 기안하고, 테스트 케이스를 제안합니다. 엔지니어의 머신에서 돌며, 마지막 발언권은 결코 주어지지 않습니다."
                />
              </p>
              <div className="cell__foot st-mute">
                <Tx en="Authority · none" ko="권한 · 없음" />
              </div>
            </Reveal>
            <Reveal className="cell" delay={1}>
              <div className="cell__no">
                <Tx en="Judges" ko="판정한다" />
              </div>
              <h3>
                <Tx en="Deterministic checkers" ko="결정론적 검사기" />
              </h3>
              <p>
                <Tx
                  en="Golden vectors, lint rules, compilers, coverage. They cannot be persuaded, and they return the same verdict on the same input forever."
                  ko="골든 벡터, 린트 규칙, 컴파일러, 커버리지. 설득되지 않으며, 같은 입력에는 영원히 같은 판정을 돌려줍니다."
                />
              </p>
              <div className="cell__foot st-ok">
                <Tx en="Authority · verdict" ko="권한 · 판정" />
              </div>
            </Reveal>
            <Reveal className="cell" delay={2}>
              <div className="cell__no cell__no--faint">
                <Tx en="Approves" ko="승인한다" />
              </div>
              <h3>
                <Tx en="The engineer" ko="엔지니어" />
              </h3>
              <p>
                <Tx
                  en="Reads the verdict, signs the spec, and owns what ships. A tool that removes this step is not saving anyone time; it is moving the blame."
                  ko="판정을 읽고, 스펙에 서명하고, 출하되는 것을 책임집니다. 이 단계를 없애는 도구는 시간을 아껴주는 것이 아니라 책임을 옮기는 것입니다."
                />
              </p>
              <div className="cell__foot" style={{ color: "var(--text-mid)" }}>
                <Tx en="Authority · release" ko="권한 · 릴리스" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we refuse */}
      <section className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="refusals">
            <div>
              <div className="t-label">
                <Tx en="Commitments" ko="약속" />
              </div>
              <h2>
                <Tx
                  en="What these tools will not do"
                  ko="이 도구들이 하지 않을 일"
                />
              </h2>
            </div>
            <div>
              {REFUSALS.map((r) => (
                <div className="refusal" key={r.k}>
                  <span className="k">{r.k}</span>
                  <span className="v">
                    <Tx en={r.v} ko={r.vKo} />
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="band band--philosophy">
        <div className="wrap band__in closing">
          <Reveal>
            <p>
              <Tx
                en="Nothing here needs to be believed. Run the golden vectors on your own machine, with the network unplugged, and see whether the verdict holds."
                ko="여기 있는 어떤 것도 믿어줄 필요가 없습니다. 네트워크를 뽑은 당신의 머신에서 골든 벡터를 직접 돌려보고, 판정이 버티는지 확인하세요."
              />
            </p>
            <div className="closing__ctas">
              <LLink className="btn" href="/products">
                <Tx en="Download a build" ko="빌드 내려받기" />
              </LLink>
              <LLink className="btn btn--ghost" href="/products/icd-refinery">
                <Tx en="See a datasheet" ko="데이터시트 보기" />
              </LLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
