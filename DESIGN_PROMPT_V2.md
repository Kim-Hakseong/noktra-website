# DESIGN_PROMPT_V2.md — NOKTRA 리디자인용 클로드 디자인 프롬프트

> 사용법: 아래 "PROMPT" 전체를 Claude Design에 붙여넣고, 산출된 .dc.html 파일들을
> `design-mockups/v2/`에 넣어주세요. 이후 Ralph(Claude Code)가 토큰 추출 → 전 페이지 이식.
> 산출 순서 권장: ①Token Sheet → 확정 후 ②Home → ③Product Detail → ④나머지.

---

## PROMPT

You are redesigning the visual identity of **NOKTRA** (noktra — from Latin *nox*, night):
a brand of nine offline-first desktop instruments for defense, aerospace, industrial and
semiconductor test engineering. Verification tools for air-gapped environments.
Slogan: "Proof, not consensus." Live site (current, v1 look): a restrained dark
instrument-panel design — serif wordmark (Newsreader), IBM Plex Sans/Mono, single teal
accent #31A9BC, hairlines, radius 0.

The v1 look is too flat and subdued. The new direction is **"deep-space probe HUD"**:
the site should feel like mission instrumentation examining nine software instruments,
with real interactivity planned in the build (this brief includes a motion section —
draw the key *moments* as static frames).

### Reference synthesis (what to channel)

1. **Probe-HUD posters** (primary motif): a photographic/visual core framed by
   white-and-black hardware chrome — concentric scan rings, dense mono micro-labels,
   tick marks, small gauges, coordinate readouts — with ONE saturated orange tag
   carrying the name. In NOKTRA's case **the "planet" at the center is a product
   screenshot**: each of the nine instruments presented like a world being scanned.
   This is the heart of the redesign — the HUD chrome exists to aim attention at the
   software.
2. **Cosmic gradient scenes**: near-black space canvas with slow radial glows,
   defocused orange orbs, fine film grain, a sense of depth behind the chrome.
3. **Planetary dashboard**: glass/translucent panels floating over imagery, orange
   radial gauges, mono data chips — for detail-page instrument panels.
4. **Primary interaction reference — aaronjcunningham.com** (simple, exactly the
   right register): one continuous cursor-reactive background field ("SCROLL /
   MOVE TO DISTURB" — a particle/matter field that the cursor disturbs), numbered
   mono section indices (`//01`, `//02` — which maps perfectly onto NOKTRA's
   NK-01…NK-09 reference system), arrow-tagged links (`↗_`), and an explicit
   "lightweight experience" fallback mode. The whole site is a few strong moves,
   not many small ones.
5. **Secondary genre note** (edolus.com): scroll as continuous descent through one
   instrument — take the feeling, not the complexity.

### Palette — four colors, strict semantics

- **Black** `≈#050607` (designer refines): the space canvas. Deeper than v1. Layered
  with subtle radial glows and grain — never flat fill.
- **White** `≈#F4F6F6`: hardware chrome — HUD frames, panels, display type. In dark
  theme white chrome floats on black; the light theme inverts to a **lab-gray canvas
  (≈#E8EAEA) with white hardware panels** (like the poster references), not a beige
  paper theme.
- **Orange** (designer picks the exact value, e.g. `#FF5C1F`–`#F97316` family):
  **energy**. Name tags, primary CTAs, scan-active states, gauge heat, the one
  saturated element per composition. Never body text, never backgrounds at full
  saturation — it works because it is scarce.
- **Mint** `#31A9BC` (keep exactly): **live signal**. Live values, links, ticks,
  verified/PASS states, the probe trace. This is NOKTRA's oscilloscope-trace color —
  it must keep meaning "measurement/alive", distinct from orange's "energy/attention".
- Status semantics to preserve: available=mint family / beta=amber `#D2A253` kept
  desaturated and clearly distinct from brand orange / in-development=muted gray.
  If you'd rather fold beta into the orange family, propose it explicitly as a note.

### Typography & chrome rules

- Keep the three-tier stack: Newsreader (display serif), IBM Plex Sans (UI),
  IBM Plex Mono (data/micro-labels). Micro-label density is a feature — channel the
  posters' label texture (9–10px mono, uppercase, wide tracking, coordinates/refs).
- Base radius stays 0 for panels/frames; **pill radius allowed only for small tags
  and chips** (as in the references). Hairline weights, 1px.
- HUD chrome vocabulary to define in the Token Sheet: scan ring (circle + tick
  marks), corner brackets, crosshair, data leader lines, segmented gauge arcs,
  barcode/registration marks. These become reusable CSS/SVG primitives.

### Deliverables (same format as v1 — .dc.html canvas files)

1. **NOKTRA Token Sheet v2** — full color tokens (dark + light two sets), type scale,
   spacing, radius, plus the new HUD primitive specimens (ring, bracket, gauge, tag).
2. **NOKTRA Home v2** — band order: hero (space canvas, wordmark, positioning, a
   HUD-framed product screenshot as the centerpiece) → instrument index (nine
   products; propose an orbital/scan-list presentation where selecting a product
   swings its screenshot into the HUD frame) → trust pillars → philosophy strip →
   footer. Keep all v1 content slots (products.json drives name/one-liner/status).
3. **NOKTRA Product Detail v2** — masthead with the product screenshot as the
   scanned core + HUD chrome carrying REF/VERB/STATE/VERIFIED readouts; needs cards;
   walkthrough (alternating text/screenshot) restyled; datasheet; download band; FAQ.
4. **NOKTRA Products Index v2** — the full-catalog table restyled as a mission
   manifest.
5. **NOKTRA Philosophy v2** — the method essay page, quiet, mostly type on space.

### Motion brief (draw key frames; implementation is ours)

Keep it to a few strong moves, aaronjcunningham-style — not many small ones:

- **One reactive field**: a single full-page background particle/star field on the
  black canvas that the cursor disturbs (drift + repel), persisting across bands so
  the page feels like one space. This replaces v1's hero-only probe mask. Include a
  mono hint label in the hero: e.g. `SCROLL / MOVE TO DISTURB` register, in NOKTRA's
  voice.
- **HUD lock-on**: in the instrument index, selecting a product swings its
  screenshot into the HUD frame — chrome ticks re-aim, the orange tag re-labels
  (draw 2 frames: locked / mid-transition). This is the one "wow" interaction; it
  exists to aim attention at the software.
- **Numbered descent**: sections carry mono indices (`//01 INDEX`, `//02 METHOD`…)
  echoing NK-01…NK-09; on scroll a thin scan line travels and labels tick in.
- **Lightweight mode is a feature**: an explicit static fallback
  (prefers-reduced-motion or a visible toggle) — honest degradation fits the brand.
- No WebGL dependency; canvas2D/CSS/SVG + light JS only; LCP element never hidden
  behind animation.

### Hard constraints

- Product copy comes from data (names, one-liners, statuses) — design the slots, not
  new copy. No invented version numbers/metrics in final chrome (placeholder readouts
  in specimens are fine, mark them as placeholders).
- Both themes fully specified; dark is primary.
- Fonts: self-hostable open-source only (current three families preferred).
- The result must still read as NOKTRA: serif wordmark, mono instrument texture,
  "the interface is an instrument" — v2 turns the volume up, it does not change the song.

---

## 산출물 받은 뒤 체크리스트 (사람용)

- [ ] 파일들을 `design-mockups/v2/`에 저장 (v1은 히스토리로 보존)
- [ ] Token Sheet의 오렌지 확정값·beta 처리 제안 확인
- [ ] Ralph에게 "v2 시안 들어왔어, 이식 시작해" — 이후 토큰 추출 → 전 페이지 → 모션 구현 순
