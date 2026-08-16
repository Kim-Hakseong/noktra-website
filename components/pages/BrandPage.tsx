// /brand — CI 정본 페이지. "NOKTRA가 무엇인지"의 단일 참조점.
// 히어로에서 걷어낸 은유(nox/dark)의 해설이 여기로 이사했다.
import Reveal from "@/components/Reveal";
import LLink from "@/components/LLink";
import { Tx } from "@/lib/i18n";
import { PRODUCTS, VERBS, refOf } from "@/lib/products";
import { SITE } from "@/lib/site";

// 비주얼 아이덴티티 — styles/tokens.css(Token Sheet 추출값)와 동일 원천
const SWATCHES = [
  { name: "--accent", dark: "#31A9BC", light: "#12707F", role: "The single accent. Links, ticks, Available." },
  { name: "--bg", dark: "#0B0E0F", light: "#F3F2EE", role: "Page ground." },
  { name: "--surface", dark: "#151A1C", light: "#FBFAF8", role: "Raised cells and panels." },
  { name: "--text-strong", dark: "#F4F6F6", light: "#0E1213", role: "Display type, product names." },
  { name: "--amber-text", dark: "#D2A253", light: "#7E5A12", role: "Beta state. Never decorative." },
  { name: "--mute-text", dark: "#8A9396", light: "#646B69", role: "In development." },
];

export default function BrandPage() {
  return (
    <>
      {/* Masthead */}
      <section className="band band--hero">
        <div className="wrap">
          <div className="statusbar">
            <span>
              <Tx en="Brand / CI" ko="브랜드 / CI" />
            </span>
            <span>
              <Tx en="The single source for what NOKTRA is" ko="NOKTRA가 무엇인지의 단일 기준" />
            </span>
          </div>
          <div className="masthead__grid" style={{ paddingBottom: 72 }}>
            <div style={{ minWidth: 0 }}>
              <h1 className="masthead__title">
                <Tx en="What NOKTRA is." ko="NOKTRA는 무엇인가." />
              </h1>
              <p className="masthead__lead">
                <Tx
                  en="A brand of offline-first desktop instruments for test and verification engineering — built for defense, aerospace, industrial and semiconductor sites where the network is deliberately absent."
                  ko="시험·검증 엔지니어링을 위한 오프라인 우선 데스크톱 도구 브랜드 — 네트워크가 의도적으로 존재하지 않는 국방·항공우주·산업·반도체 현장을 위해 만듭니다."
                />
              </p>
            </div>
            <div className="masthead__side">
              <div className="kv-grid">
                <div className="kv kv--edge">
                  <span className="k">NAME</span>
                  <span className="sp" />
                  <span className="v">NOKTRA</span>
                </div>
                <div className="kv kv--edge">
                  <span className="k">
                    <Tx en="READS" ko="발음" />
                  </span>
                  <span className="sp" />
                  <span className="v">
                    <Tx en="nok · tra" ko="녹트라" />
                  </span>
                </div>
                <div className="kv kv--edge">
                  <span className="k">
                    <Tx en="MAKES" ko="만드는 것" />
                  </span>
                  <span className="sp" />
                  <span className="v">
                    <Tx en="Desktop instruments" ko="데스크톱 도구" />
                  </span>
                </div>
                <div className="kv">
                  <span className="k">
                    <Tx en="PROMISE" ko="약속" />
                  </span>
                  <span className="sp" />
                  <span className="v">Proof, not consensus.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The name */}
      <section className="band band--catalog">
        <div className="wrap band__in">
          <Reveal className="method-sec" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
            <div>
              <div className="method-sec__no">01</div>
              <h2>
                <Tx en="The name" ko="이름" />
              </h2>
            </div>
            <div className="method-sec__body" style={{ minWidth: 0 }}>
              <p>
                <Tx
                  en={
                    <>
                      NOKTRA comes from <em>nox</em> — Latin for night. The
                      night here is not a mood; it is a place: the room where
                      the internet is switched off on purpose. Classified
                      programs, flight-test benches, fab floors. Where other
                      software goes blind without a connection, these
                      instruments are built to work.
                    </>
                  }
                  ko={
                    <>
                      NOKTRA는 라틴어로 밤을 뜻하는 <em>nox</em>에서 왔습니다.
                      여기서의 밤은 분위기가 아니라 장소입니다 — 인터넷이
                      의도적으로 꺼져 있는 방. 보안 프로그램, 비행시험 벤치, 팹
                      플로어. 연결이 없으면 눈이 머는 다른 소프트웨어와 달리, 이
                      도구들은 그곳에서 일하도록 만들어졌습니다.
                    </>
                  }
                />
              </p>
              <p>
                <Tx
                  en={
                    <>
                      That is the whole metaphor, and this page is where it
                      stays. Product pages and the front page say it plainly:
                      verification tools for air-gapped environments.
                    </>
                  }
                  ko={
                    <>
                      은유는 이것이 전부이고, 은유가 사는 곳은 이 페이지입니다.
                      제품 페이지와 첫 화면은 평이하게 말합니다: 폐쇄망 환경을
                      위한 검증 도구.
                    </>
                  }
                />
              </p>
            </div>
            <div className="method-sec__notes">
              <div className="head">nox</div>
              <div className="row">
                <span className="k">night</span>
                <span className="v">
                  <Tx en="offline by design" ko="설계상 오프라인" />
                </span>
              </div>
              <div className="row">
                <span className="k">offline</span>
                <span className="v">
                  <Tx en="no cloud, no telemetry" ko="클라우드·텔레메트리 없음" />
                </span>
              </div>
              <div className="row">
                <span className="k">deterministic</span>
                <span className="v">
                  <Tx en="same input, same verdict" ko="같은 입력, 같은 판정" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Copy bank */}
          <Reveal className="method-sec">
            <div>
              <div className="method-sec__no">02</div>
              <h2>
                <Tx en="How to describe it" ko="어떻게 소개하는가" />
              </h2>
            </div>
            <div className="method-sec__body" style={{ minWidth: 0 }}>
              <div className="kv kv--edge">
                <span className="k">
                  <Tx en="ONE LINE" ko="한 줄" />
                </span>
                <span className="sp" />
              </div>
              <p style={{ marginTop: 14 }}>
                <Tx
                  en="Verification tools for air-gapped environments."
                  ko="폐쇄망 환경을 위한 검증 도구."
                />
              </p>
              <div className="kv kv--edge" style={{ marginTop: 28 }}>
                <span className="k">
                  <Tx en="SHORT" ko="짧게" />
                </span>
                <span className="sp" />
              </div>
              <p style={{ marginTop: 14 }}>
                <Tx
                  en="NOKTRA builds desktop instruments for defense, aerospace, industrial and semiconductor test engineering. Single-file deploys, golden-vector suites, no telemetry — everything runs where the internet doesn't reach."
                  ko="NOKTRA는 국방·항공우주·산업·반도체 시험 엔지니어링을 위한 데스크톱 도구를 만듭니다. 단일 파일 배포, 골든 벡터 스위트, 텔레메트리 없음 — 전부 인터넷이 닿지 않는 곳에서 동작합니다."
                />
              </p>
              <div className="kv kv--edge" style={{ marginTop: 28 }}>
                <span className="k">
                  <Tx en="FULL" ko="상세" />
                </span>
                <span className="sp" />
              </div>
              <p style={{ marginTop: 14 }}>
                <Tx
                  en="NOKTRA builds desktop instruments for test and verification engineering — interface definition, MIL/SIL execution, test sequencing, telemetry, protocol work and reliability analysis. Every instrument is offline-first: it ships as a single executable with its golden-vector suite embedded, phones home for nothing, and any AI runs locally on the engineer's own machine. Deterministic checkers issue every verdict; AI only proposes; a human approves what ships. Proof, not consensus."
                  ko="NOKTRA는 시험·검증 엔지니어링을 위한 데스크톱 도구를 만듭니다 — 인터페이스 정의, MIL/SIL 실행, 시험 시퀀싱, 텔레메트리, 프로토콜 작업, 신뢰성 분석까지. 모든 도구는 오프라인 우선입니다: 골든 벡터 스위트를 내장한 단일 실행 파일로 배포되고, 무엇을 위해서도 외부에 연결하지 않으며, AI는 전부 엔지니어의 머신에서 로컬로 실행됩니다. 판정은 결정론적 검사기만 내리고, AI는 제안만 하며, 출하는 사람이 승인합니다. 합의가 아니라 증명."
                />
              </p>
            </div>
            <div className="method-sec__notes">
              <div className="head">
                <Tx en="Fixed phrases" ko="고정 문구" />
              </div>
              <div className="row">
                <span className="k">
                  <Tx en="Slogan" ko="슬로건" />
                </span>
                <span className="v">Proof, not consensus.</span>
              </div>
              <div className="row">
                <span className="k">
                  <Tx en="Wordmark" ko="워드마크" />
                </span>
                <span className="v">NOKTRA</span>
              </div>
              <div className="row">
                <span className="k">
                  <Tx en="Never" ko="금지" />
                </span>
                <span className="v">Noktra.io™, NOKTRA Suite</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="sec-head">
            <div>
              <div className="t-label">
                <Tx en="Principles" ko="원칙" />
              </div>
              <h2>
                <Tx en="Three commitments, one order." ko="세 가지 약속, 하나의 순서." />
              </h2>
            </div>
            <p className="side">
              <Tx
                en="Every instrument keeps all three, and authority always flows the same way: AI proposes, deterministic checkers judge, the engineer approves."
                ko="모든 도구가 셋을 전부 지키고, 권위는 언제나 같은 방향으로 흐릅니다: AI가 제안하고, 결정론적 검사기가 판정하고, 엔지니어가 승인합니다."
              />
            </p>
          </Reveal>
          <div className="cells" style={{ marginTop: 0 }}>
            <Reveal className="cell">
              <div className="cell__no">01</div>
              <h3>Offline-first</h3>
              <p>
                <Tx
                  en="Built for air-gapped networks. No cloud services, no accounts, no telemetry — and any AI runs locally."
                  ko="폐쇄망을 전제로 설계. 클라우드 서비스도, 계정도, 텔레메트리도 없으며 AI는 전부 로컬에서 실행됩니다."
                />
              </p>
            </Reveal>
            <Reveal className="cell" delay={1}>
              <div className="cell__no">02</div>
              <h3>
                <Tx en="Deterministic" ko="Deterministic" />
              </h3>
              <p>
                <Tx
                  en="Golden-vector suites ship inside every build. The same input gives the same verdict today, next quarter, and in the audit."
                  ko="골든 벡터 스위트가 모든 빌드에 내장됩니다. 같은 입력은 오늘도, 다음 분기에도, 감사 자리에서도 같은 판정을 냅니다."
                />
              </p>
            </Reveal>
            <Reveal className="cell" delay={2}>
              <div className="cell__no">03</div>
              <h3>Single-file</h3>
              <p>
                <Tx
                  en="One executable, copied onto the target machine. No runtime installs, no package managers, no IT ticket."
                  ko="실행 파일 하나를 대상 머신에 복사하면 끝. 런타임 설치도, 패키지 매니저도, IT 티켓도 없습니다."
                />
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Structure — five verbs, nine instruments */}
      <section className="band band--catalog">
        <div className="wrap band__in">
          <Reveal className="sec-head">
            <div>
              <div className="t-label">
                <Tx en="Structure" ko="구조" />
              </div>
              <h2>
                <Tx en="Five verbs organise the catalog." ko="다섯 개의 동사가 카탈로그를 조직한다." />
              </h2>
            </div>
            <p className="side">
              <Tx
                en="Every instrument answers to exactly one verb — what it lets an engineer do."
                ko="모든 도구는 정확히 하나의 동사에 속합니다 — 엔지니어가 그것으로 무엇을 하게 되는가."
              />
            </p>
          </Reveal>
          {VERBS.map((v) => {
            const tools = PRODUCTS.filter((p) => p.verb === v.id);
            return (
              <Reveal className="tbl__group" key={v.id} style={{ display: "block", padding: "18px 0", borderBottom: "1px solid var(--line-soft)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                  <span className="verb" style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: 22, color: "var(--text-strong)", minWidth: 110 }}>
                    {v.label}
                  </span>
                  <span style={{ flex: 1 }}>
                    {tools.map((tool, ti) => (
                      <span key={tool.slug}>
                        <LLink href={`/products/${tool.slug}`} style={{ color: "var(--text-mid)" }}>
                          {tool.name}
                        </LLink>
                        <span className="t-label t-label--faint" style={{ fontSize: 9.5, margin: "0 6px" }}>
                          {refOf(tool.slug)}
                        </span>
                        {ti < tools.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Visual identity */}
      <section className="band band--pillars">
        <div className="wrap band__in">
          <Reveal className="sec-head">
            <div>
              <div className="t-label">
                <Tx en="Visual identity" ko="비주얼 아이덴티티" />
              </div>
              <h2>
                <Tx en="Dark canvas, one accent, zero radius." ko="다크 캔버스, 액센트 하나, 라운드 0." />
              </h2>
            </div>
            <p className="side">
              <Tx
                en="The look is an instrument panel, not a landing page. Values live in styles/tokens.css; nothing is styled ad hoc."
                ko="이 룩은 랜딩 페이지가 아니라 계기판입니다. 값은 styles/tokens.css에 살고, 임의 스타일은 없습니다."
              />
            </p>
          </Reveal>

          <div className="swatches">
            {SWATCHES.map((s) => (
              <Reveal className="swatch" key={s.name}>
                <div className="swatch__pair">
                  <span className="chip" style={{ background: s.dark }} />
                  <span className="chip chip--light" style={{ background: s.light }} />
                </div>
                <div className="swatch__name">{s.name}</div>
                <div className="swatch__hex">
                  {s.dark} / {s.light}
                </div>
                <div className="swatch__role">
                  <Tx en={s.role} ko={s.role} />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="spec-grid" style={{ marginTop: 54 }}>
            <Reveal className="spec-group">
              <div className="spec-group__title">
                <Tx en="Type" ko="타이포" />
              </div>
              <div className="kv kv--edge">
                <span className="k">DISPLAY</span>
                <span className="sp" />
                <span className="v">Newsreader (serif)</span>
              </div>
              <div className="kv kv--edge">
                <span className="k">UI</span>
                <span className="sp" />
                <span className="v">IBM Plex Sans</span>
              </div>
              <div className="kv kv--edge">
                <span className="k">DATA</span>
                <span className="sp" />
                <span className="v">IBM Plex Mono</span>
              </div>
            </Reveal>
            <Reveal className="spec-group" delay={1}>
              <div className="spec-group__title">
                <Tx en="Rules" ko="규칙" />
              </div>
              <div className="kv kv--edge">
                <span className="k">RADIUS</span>
                <span className="sp" />
                <span className="v">0 — <Tx en="always" ko="언제나" /></span>
              </div>
              <div className="kv kv--edge">
                <span className="k">LINES</span>
                <span className="sp" />
                <span className="v">1px hairline</span>
              </div>
              <div className="kv kv--edge">
                <span className="k">LABELS</span>
                <span className="sp" />
                <span className="v">
                  <Tx en="mono · uppercase · tracked" ko="모노 · 대문자 · 자간" />
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Voice */}
      <section className="band band--catalog">
        <div className="wrap band__in">
          <Reveal className="refusals">
            <div>
              <div className="t-label">
                <Tx en="Voice" ko="보이스" />
              </div>
              <h2>
                <Tx en="How it speaks" ko="어떻게 말하는가" />
              </h2>
            </div>
            <div>
              <div className="refusal">
                <span className="k">
                  <Tx en="States, plainly" ko="평이하게 말한다" />
                </span>
                <span className="v">
                  <Tx
                    en="Short declaratives. Concrete nouns. A claim is either backed by a golden vector, a spec citation or a repository — or it is not made."
                    ko="짧은 평서문, 구체적인 명사. 주장은 골든 벡터·표준 출처·저장소로 뒷받침되거나, 아예 하지 않습니다."
                  />
                </span>
              </div>
              <div className="refusal">
                <span className="k">
                  <Tx en="Admits limits" ko="한계를 인정한다" />
                </span>
                <span className="v">
                  <Tx
                    en="In-development means in development. What a tool deliberately does not do is stated on its page, up front."
                    ko="개발 중이면 개발 중이라고 말합니다. 도구가 의도적으로 하지 않는 일은 그 페이지 첫머리에 밝힙니다."
                  />
                </span>
              </div>
              <div className="refusal">
                <span className="k">
                  <Tx en="Never says" ko="쓰지 않는 말" />
                </span>
                <span className="v">
                  <Tx
                    en={'"Revolutionary", "AI-powered" as a virtue, "coming soon" with a date it cannot keep, or any claim that requires trusting us instead of running the vectors.'}
                    ko={'"혁신적", 미덕으로서의 "AI 기반", 지키지 못할 날짜가 붙은 "출시 임박", 그리고 벡터를 돌려보는 대신 우리를 믿어야 성립하는 모든 주장.'}
                  />
                </span>
              </div>
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
                en="One brand, five verbs, nine instruments — and a promise every page repeats: run it yourself, with the network unplugged."
                ko="하나의 브랜드, 다섯 개의 동사, 아홉 개의 도구 — 그리고 모든 페이지가 반복하는 약속: 네트워크를 뽑고, 직접 돌려보세요."
              />
            </p>
            <div className="closing__ctas">
              <LLink className="btn" href="/products">
                <Tx en="See the instruments" ko="도구 보러 가기" />
              </LLink>
              <LLink className="btn btn--ghost" href="/method">
                <Tx en="Read the method" ko="방법론 읽기" />
              </LLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
