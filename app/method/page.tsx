// /method — Philosophy 시안 정본: 선언 → 방법론 4절 → 인프라 사실 → 권위의 순서 → 거부 목록 → 맺음
// 본문 카피는 시안 원문, 인프라 사실은 CONTEXT.md 기재 사실만.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Method",
  description:
    "Proof, not consensus. Golden vectors, deterministic checkers, offline-first design, and the engineer's signature.",
};

const SECTIONS = [
  {
    no: "01",
    title: "A golden vector is a promise you can re-check",
    body: "Every tool ships with a suite of inputs whose correct outputs are known and fixed. They are not examples and not documentation — they are the thing the build is measured against, and they travel inside the executable.",
    body2:
      "If a change makes one vector disagree, the build does not ship. There is no discussion about whether the difference matters, because the vector was agreed upon while nobody was under deadline.",
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
    body: "Anything that can be decided by a rule is decided by a rule. Address overlaps, impossible ranges, unit collisions, missing scale factors, coverage thresholds — these are arithmetic, not judgement, and arithmetic does not have opinions on Friday afternoon.",
    body2:
      "AI is used where rules genuinely cannot reach: reading a badly-scanned table, guessing what an ambiguous field name meant, drafting a first test case. Its output enters the pipeline as a proposal and is checked like anything else.",
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
    body: "These tools are built for rooms where the network is deliberately absent: classified programs, flight-test benches, fab floors. That constraint is accepted at the start, because retrofitting it later never actually works.",
    body2:
      "One consequence is that the software cannot phone home for licences, models, updates or analytics. Another is that you can read the whole trust boundary in one sentence: the file you copied, and nothing else.",
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
    body: "Approval is only meaningful if the person approving can inspect what they are approving. Every derived value carries its provenance: which page it came from, which rule accepted it, which vector covered it.",
    body2:
      "That audit trail is also what makes the work defensible months later, in a design review, to someone who was not in the room and should not have to take anyone at their word.",
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
  },
  {
    k: "Local LLM bench",
    v: "Local models are benchmarked on real extraction workloads; a measured model catalog decides what ships as a default.",
  },
  {
    k: "Hardware testbed",
    v: "A Jetson Orin companion-computer testbed exercises MAVLink-family links against real hardware.",
  },
];

const REFUSALS = [
  {
    k: "No silent fixes",
    v: "A tool never quietly corrects your document. It shows the conflict and waits for a decision.",
  },
  {
    k: "No cloud fallback",
    v: "If a local model is unavailable, the step fails loudly. It does not reach for an API to finish the job.",
  },
  {
    k: "No opinion as verdict",
    v: "AI output is never labelled pass or fail. Only deterministic checkers issue verdicts.",
  },
  {
    k: "No hidden state",
    v: "Configuration and results are files you can read, diff and keep in your own version control.",
  },
  {
    k: "No roadmap theatre",
    v: "In-development instruments are listed as such, with no date, until a build exists you can run.",
  },
];

export default function MethodPage() {
  return (
    <>
      {/* Statement */}
      <section className="band band--hero">
        <div className="wrap">
          <div className="statusbar">
            <span>Philosophy &nbsp;/&nbsp; The method</span>
            <span>Written once · revised when proven wrong</span>
          </div>
          <div className="statement">
            <div className="strip__tick" />
            <h1>
              Proof,
              <br />
              not consensus.
            </h1>
            <p className="statement__lead">
              A test that passes because everyone agreed it should is not a
              test. It is a meeting. Verification is the practice of arranging
              matters so that agreement is unnecessary.
            </p>
          </div>
        </div>
      </section>

      {/* The method */}
      <section id="method" className="band band--catalog">
        <div className="wrap band__in">
          <div className="t-label">The method</div>
          {SECTIONS.map((s) => (
            <Reveal className="method-sec" key={s.no}>
              <div>
                <div className="method-sec__no">{s.no}</div>
                <h2>{s.title}</h2>
              </div>
              <div className="method-sec__body" style={{ minWidth: 0 }}>
                <p>{s.body}</p>
                <p>{s.body2}</p>
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
              <div className="t-label">Behind the builds</div>
              <h2>The infrastructure this runs on</h2>
            </div>
            <div>
              {INFRA.map((r) => (
                <div className="refusal" key={r.k}>
                  <span className="k">{r.k}</span>
                  <span className="v">{r.v}</span>
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
            <h2>Order of authority</h2>
            <p className="side">
              Three parties touch every result. Their order is fixed, and only
              one of them can say yes.
            </p>
          </Reveal>
          <div className="cells" style={{ marginTop: 0 }}>
            <Reveal className="cell">
              <div className="cell__no cell__no--faint">Proposes</div>
              <h3>Local AI</h3>
              <p>
                Reads documents, drafts candidates, suggests test cases. Runs
                on the engineer&apos;s own machine and is never granted the
                last word.
              </p>
              <div className="cell__foot st-mute">Authority · none</div>
            </Reveal>
            <Reveal className="cell" delay={1}>
              <div className="cell__no">Judges</div>
              <h3>Deterministic checkers</h3>
              <p>
                Golden vectors, lint rules, compilers, coverage. They cannot be
                persuaded, and they return the same verdict on the same input
                forever.
              </p>
              <div className="cell__foot st-ok">Authority · verdict</div>
            </Reveal>
            <Reveal className="cell" delay={2}>
              <div className="cell__no cell__no--faint">Approves</div>
              <h3>The engineer</h3>
              <p>
                Reads the verdict, signs the spec, and owns what ships. A tool
                that removes this step is not saving anyone time; it is moving
                the blame.
              </p>
              <div className="cell__foot" style={{ color: "var(--text-mid)" }}>
                Authority · release
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
              <div className="t-label">Commitments</div>
              <h2>What these tools will not do</h2>
            </div>
            <div>
              {REFUSALS.map((r) => (
                <div className="refusal" key={r.k}>
                  <span className="k">{r.k}</span>
                  <span className="v">{r.v}</span>
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
              Nothing here needs to be believed. Run the golden vectors on your
              own machine, with the network unplugged, and see whether the
              verdict holds.
            </p>
            <div className="closing__ctas">
              <Link className="btn" href="/products">
                Download a build
              </Link>
              <Link className="btn btn--ghost" href="/products/icd-refinery">
                See a datasheet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
