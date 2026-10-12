# BLOODTHRONE — Design System

Dark medieval fantasy developer portfolio. This file is the implementation contract:
every colour, type size, spacing value, motion duration and component pattern used in
code traces back to a token declared here. Adding a token means adding it here first.

---

## 0. Research Log

| Lane | Deliverable |
| --- | --- |
| Layer A — taste skill | Loaded `references/design/gpt-tasteskill.md`. Selected by the brief's own words: "cinematic", "immersive", "scroll-triggered", "memorable". Kept: wide 2-line hero rule, real GSAP/ScrollTrigger over static UI, huge section rhythm, zero-empty-cell grids, no emoji icons, no cheap meta-labels. **Rejected as brief-conflicting:** pill/rounded shapes, Satoshi/Geist/Outfit font stack, `picsum.photos` stock imagery, bento card grids, the "simulate a Python RNG to pick your layout" ritual (cargo cult — decisions here come from the brief, not a dice roll). |
| Layer B — brand system | **Skipped, deliberately.** `_INDEX.md` was searched for `dark|brutal|gothic|medieval|noir`. Every dark-mode candidate in the 70-brand library is neon/gradient SaaS (`minimax`, `cursor`, `raycast`, `kraken`, `superhuman`, `revolut`). Applying any of them would directly violate PLAN.MD §20 ("no gradients, no neon, no glassmorphism"). A generic modern brand is the exact failure mode this brief forbids, so importing one would be regression, not research. |
| User brief as substitute | PLAN.MD + STACK.MD supply what Layer B normally provides: exact palette, typography direction, component bans, motion rules, accessibility constraints. Treated as the token source of truth. |
| Lazyweb real-product screens | **Skipped.** The subject matter is a 2011 fantasy TV property; scraping modern SaaS landing pages would return gradients and glass cards. Nothing to harvest that the brief does not already forbid. |
| Imagen concept drafts | **Skipped.** The visual identity is fully specified — four hex values, an explicit no-gradient rule, and a named sigil concept. Imagegen would produce gradients and "medieval cinematic" wallpaper; the brief calls for flat, sharp, black-and-crimson surfaces. Cheaper and more accurate to draw the sigil as original SVG. |

---

## 1. Design Principles

1. **Sharp or nothing.** `border-radius: 0` everywhere. No pills, no soft cards.
2. **Black is the material, not the absence of one.** Depth comes from solid tonal layers, 1px steel hairlines, engraved SVG texture and hard drop shadows. Never from a gradient.
3. **Blood is an accent, never a fill.** Crimson appears on ~5% of pixels: rules, glyphs, the sigil, the moment of the cut.
4. **Motion is consequence.** Every animation depicts an action with stakes — a blade falling, a gate opening, ash drifting. Nothing loops decoratively.
5. **Atmosphere never blocks the portfolio.** If an effect delays reading a project name, the effect loses.

---

## 2. Colour

Defined in OKLCH so the ramps are perceptually even and contrast is predictable.
Raw hex is banned in components; only these tokens are legal.

**Four tokens are spec anchors.** PLAN.MD §1 names exact hexes for them. Their OKLCH values
below were computed from those hexes, not eyeballed, and are marked `SPEC ANCHOR` in
`globals.css`. Do not hand-tune them — if a value here is changed, the anchor is broken.
(An earlier draft drifted: `--blood-700` was written as `oklch(0.36 0.132 20)`, which
compiles to `#730f1e`, not the specified `#8B0000`.) The remaining ramp steps are
interpolated and may be tuned freely.

### Blood ramp — warm reds, hue 18–38
| Token | OKLCH | Role |
| --- | --- | --- |
| `--blood-950` | `oklch(0.14 0.04 18)` | dried blood in shadow; deepest surface tint |
| `--blood-900` | `oklch(0.20 0.065 18)` | raised blood surface |
| `--blood-800` | `oklch(0.28 0.10 19)` | hover fill |
| `--blood-700` | `oklch(0.3999 0.1641 29.2)` | **SPEC ANCHOR** = `#8B0000` |
| `--blood-600` | `oklch(0.4927 0.1918 26.4)` | **SPEC ANCHOR** = `#B5121B` |
| `--blood-500` | `oklch(0.58 0.18 28)` | hover / focus on dark text |
| `--blood-300` | `oklch(0.72 0.105 30)` | crimson text on black |
| `--blood-200` | `oklch(0.82 0.065 34)` | fresh-cut highlight, splatter core |
| `--blood-100` | `oklch(0.90 0.035 38)` | wet sheen on steel |

### Steel ramp — neutral greys (chroma ≤ 0.01, so hue is perceptually inert)
| Token | OKLCH | Role |
| --- | --- | --- |
| `--steel-1000` | `oklch(0 0 0)` | **SPEC ANCHOR** = `#000000`, page ground |
| `--steel-950` | `oklch(0.173 0 90)` | **SPEC ANCHOR** = `#101010`, section ground |
| `--steel-900` | `oklch(0.145 0.005 250)` | raised panel |
| `--steel-850` | `oklch(0.185 0.006 250)` | hairline-adjacent surface |
| `--steel-800` | `oklch(0.235 0.007 250)` | **borders** — visible but not loud |
| `--steel-700` | `oklch(0.30 0.008 250)` | strong border / disabled edge |
| `--steel-600` | `oklch(0.40 0.009 250)` | muted steel text |
| `--steel-500` | `oklch(0.52 0.010 250)` | secondary text |
| `--steel-400` | `oklch(0.64 0.009 250)` | body-on-black minimum |
| `--steel-300` | `oklch(0.75 0.008 250)` | **body text** |
| `--steel-200` | `oklch(0.9001 0.0208 81.8)` | **SPEC ANCHOR** = `#E5DDCF`, headings |
| `--steel-100` | `oklch(0.94 0.005 250)` | parchment highlight |

### Contrast contract (WCAG 2.1 AA)

Measured on the production build via canvas-normalised RGB sampling, not estimated.
Lowest measured ratio across every probe was **8.13:1**, so the floor is AA and most
text clears AAA (7:1).

| Element | Token | Measured |
| --- | --- | --- |
| Hero / section headings | `--steel-200` on black | **15.58:1** |
| Weapon titles | `--steel-200` on black | **15.58:1** |
| Hero label | `--blood-300` on black | **8.13:1** |
| Primary CTA text | `--steel-100` on `--blood-700` | **8.38:1** |
| Body copy | `--steel-300` on black | **9.41:1** |
| Section h2 on charcoal | `--steel-200` on `--steel-950` | **14.11:1** |

Re-measure if any of these tokens change; the ratios are a property of the pair, not
of the element. Crimson on black is **never** the sole carrier of meaning — every
state pairs colour with a glyph, a border change or a label (PLAN §19, §20).

**`--steel-400` is the darkest token permitted for text.** Measured on pure black,
`steel-500` is 3.80:1, `steel-600` is 2.28:1 and `steel-700` is 1.54:1 — all fail
AA. Those three are for borders, rules and decorative marks only. An earlier draft
used them for labels, the scroll hint and empty-state copy; Lighthouse caught it at
accessibility 96 and it reached 100 once they were lifted to `steel-300`/`steel-400`.
Lighthouse did **not** flag every instance — it sampled one — so this rule, not the
audit, is what keeps the bug fixed.

### Forbidden
`linear-gradient`, `radial-gradient`, `conic-gradient`, `backdrop-filter`,
`mix-blend-screen`, any hex literal in a component, any neon hue.

---

## 3. Typography

Both families self-hosted via `next/font/google` — zero runtime requests to Google.

| Role | Family | Treatment |
| --- | --- | --- |
| Display / section titles | **Cinzel** (variable) | uppercase, `letter-spacing: 0.14em`, weight 600–700. Engraved-Roman inscriptional caps: monumental without being a GoT house-sigil copy. |
| Body / prose | **Spectral** (variable) | sentence case, weight 400, `line-height: 1.7`, max `62ch`. A screen-optimised old-style serif — warm, but built for reading at 16px rather than imitating a manuscript. |
| Labels / eyebrow text | **Cinzel** | uppercase, `0.72rem`, `letter-spacing: 0.32em`, `--steel-600` |

### Scale
`--fs-display: clamp(2.75rem, 7.5vw, 7rem)` · `--fs-h2: clamp(2rem, 4.5vw, 3.5rem)` ·
`--fs-h3: clamp(1.35rem, 2.2vw, 1.75rem)` · `--fs-body: 1rem` · `--fs-label: 0.72rem`

**Hero rule:** H1 uses `--fs-display` in a `max-w-6xl` container and MUST wrap to 2–3 lines
at 1440px. A 5-line wall is a defect, not a style.

---

## 4. Spacing & Rhythm

4px base. Section padding `clamp(5rem, 12vh, 9rem)` block — sections read as distinct
chapters, never cramped. Content max-width `72rem` (`max-w-6xl`).

Elevation is expressed by **tone + hairline + shadow**, never blur:
- `--shadow-cut`: `0 0 0 1px var(--steel-800), 0 18px 40px -24px oklch(0 0 0 / 0.9)`
- `--shadow-blade`: `0 0 24px -6px oklch(0.45 0.163 21 / 0.35)`

---

## 5. Primitives

| Primitive | States |
| --- | --- |
| `RoyalSigil` | `idle`, `forge` (initial metallic reveal), `size: sm\|md\|lg\|xl` |
| `SwordCursor` | `default`, `strike` (pointer over interactive), `cut` (on click) |
| `SentenceOfDeath` | `idle`, `cutting`, `done`; plus `reduced` (animation-free) |
| `HeraldButton` | `rest`, `hover`, `focus-visible`, `pressed` — the **only** clickable primitive; every nav/action routes through it |
| `ArmoryWeapon` (skill card) | `rest`, `hover` (blade draws), `focus-within` |
| `OrnamentDivider` | `static`, `cut` (bleeds crimson on trigger) |
| `SectionHeading` | composed, not stateful |
| `SigilSecret` | `sealed`, `unsealing` (2 presses), `broken` (3rd press → KINGSLAYER); taps reset after 3s |
| `EmptyRecord` | stateful: renders in-theme copy + the plain fact when a collection is empty. Used by War Table, Raven's Archive and Iron Throne. |

### EmptyRecord pattern

Three sections read from `data/site.ts` arrays that ship empty, because PLAN §8/§9/§10
forbid inventing projects, clients, employment history or contact methods. Those
sections must therefore look **deliberate** when empty, not broken.

- One `<p class="prose-throne">` in `--color-steel-500`, centred, plain sentence.
- Wording states the actual fact ("No campaigns are recorded in the ledger yet"), never
  a themed placeholder that implies content exists off-screen. PLAN §14 permits themed
  *flavour*, but requires the real issue stay legible.
- The section heading, ornament and full `py-section` rhythm render regardless, so
  filling the array adds content without changing layout.
- ScrollTrigger reveals are skipped entirely when the collection is empty — animating a
  single empty-state paragraph would be slop.

Rules: every interactive element is a real `<button>`/`<a>`, has a visible
`:focus-visible` ring in `--blood-600`, has an accessible name, and never shifts
layout on hover (`transform`/`opacity` only).

---

## 6. Motion

Durations: `--dur-snap: 120ms` (states) · `--dur-cut: 320ms` (Sentence of Death) ·
`--dur-reveal: 900ms` (ScrollTrigger entrances). Easing:
`--ease-blade: cubic-bezier(0.16, 1, 0.3, 1)` (fast out, decisive settle).

- **GPU-only:** animate `transform` / `opacity` / `clip-path`. Never `top`, `width`, `height`.
- **GSAP lifecycle:** every timeline and ScrollTrigger is created in `useGSAP` or a
  `useLayoutEffect` and reverted in the cleanup return. No duplicate animations, no leaks.
- **ScrollTrigger:** `once: true` on entrances — a reveal does not replay on scroll-up.
- **Reduced motion:** `gsap.matchMedia()` gates every sequence on
  `(prefers-reduced-motion: no-preference)`. Under `reduce`, content renders in its
  final state instantly, the opening sequence is skipped, and the sword cursor never
  mounts. Nothing is hidden behind an animation that may not run.

---

## 7. Background Atmosphere

Static SVG data-URI overlays at `pointer-events: none`, `z-index: 0`, `opacity ≤ 0.14`:
`--tex-scratch` (fine diagonal scoring), `--tex-grain` (noise), `--tex-stain` (faint
blood blooms, section-local only). Ash and embers are CSS-only, ≤ 8 particles, and are
disabled entirely under reduced motion.

---

## 8. Accessibility Contract

- Semantic landmarks, one `<h1>` per page, ordered heading levels.
- `prefers-reduced-motion` honoured at three levels: CSS media query, GSAP
  `matchMedia`, and a `useReducedMotion()` hook for JS-driven effects.
- The sword cursor is desktop + fine-pointer + no-reduced-motion only. Touch devices and
  keyboard users get the platform cursor and full focus rings — never a degraded one.
- The Sentence of Death never *is* the navigation. `Enter` fires it, but so does a plain
  click, and the `prefers-reduced-motion` path navigates immediately with no animation.
- Focus rings are never removed; they are restyled to `--blood-600` at 2px offset.

---

## 9. Accepted Debt

- **Sound is one sampled slash, not a synthesised one.** PLAN §17 permits it but requires an
  off-by-default toggle, which is not built yet — `playSlash()` therefore fires on every strike.
  It plays `public/54427377-sword-slash-476148.mp3` through a single preloaded `Audio` element
  (`src/lib/bladeSlash.ts`), reset to zero per play so rapid strikes restart rather than layer.
  The synthesised WebAudio version it replaced could not carry the transient of a real blade.
  Add a `<SoundToggle>` gating it when off-by-default sound is required.
- **GSAP+ScrollTrigger is 51 KB gzip of the JS payload** — the single largest asset, and
  the bulk of the 57 KB transferred on first load (measured: FCP 96ms, 12 requests, on
  localhost). STACK.MD mandates GSAP, so this is spec, not slop. If first load ever
  matters more than the motion, dynamic-import `ScrollTrigger` (used only below the
  fold by the oath, war table and archive) — expect roughly half of that 51 KB to move
  out of the initial chunk, at the cost of a load boundary a fast scroll can outrun.
- **Cursor assets are inline SVG, not PNGs.** A 32×32 `cursor: url()` bitmap cannot carry
  a blood trail or a tilt. The SVG element is the honest implementation.
- **`data/site.ts` holds placeholder identity.** PLAN §8/§9 forbid inventing projects,
  clients and awards. `name` is now set; the intro, War Table, Raven's Archive and
  Iron Throne collections are still empty by design. No invented employment history ships.
- **The Armory does not hide anything behind hover.** PLAN §7 asks hover to "reveal the
  technology's name, experience, and what I build with it", but the reveal it implies
  cannot ship as written: the only unshown item is *experience*, and PLAN §7/§9 forbid
  inventing it, while the "what I build with it" blurb is already on the card. Hiding the
  blurb behind hover to manufacture a reveal would also fail PLAN §18 — touch devices
  have no hover, so mobile users would simply lose the content. As built, all three facts
  are always present, hover adds emphasis via a crimson rule that draws in from the left,
  and no proficiency percentages are faked. If real experience data is supplied, add an
  `experience` field to `Weapon` and reveal it alongside `group-focus-within`, not
  `group-hover` alone.
- **No iron-throne illustration.** PLAN §10 asks for a throne silhouette behind the
  contact section. Deferred: with no real contact links to anchor it, it would be
  decoration in an empty section — and an unverifiable blind drawing. Add it alongside
  the first real `ravens` entry, as original SVG in the `RoyalSigil` idiom.
