# DESIGN.md — Design Tokens, Type, Elevation & Motion (resolved from UX4G)

> **Single source of truth for visual decisions.** All values below are **resolved from the real package `ux4g-web-components@1.0.0`** (`styles/ux4g.css`), inspected **2026-07-24**. Nothing here is invented. Values marked `⚠️ verify` were not captured in the first pass and must be confirmed from the installed bundle during M1 (`npm run tokens:extract`).
>
> **Rule:** consume tokens by name. Never write a raw hex or px value that UX4G already exposes. New primitives (charts, timeline) must be built **on these tokens** and documented in §9.

---

## 0. How the system is consumed

- **Import:** `import "ux4g-web-components/styles.css"` → apply `.ux4g-*` classes to markup.
- **Token prefix:** `--ux4g-*` CSS custom properties. **Class naming:** `.ux4g-<component>` (e.g. `.ux4g-btn`, `.ux4g-card`, `.ux4g-navbar`, `.ux4g-table`, `.ux4g-breadcrumb`).
- **Theme switch:** `[data-theme="dark"]` on a root element (see §7).
- **Interactivity:** optional `ux4g-web-components/runtime/bootstrap` JS for behaviours (dropdown, modal, accordion…). Prefer progressive enhancement.
- ⚠️ **Do not ship `ux4g.css` raw** — it is **7.6MB** with fonts base64-embedded. See §10.

---

## 1. Colour tokens (real values)

Palette scales run **50 → 950** with the prefix `--ux4g-color-<hue>-<step>`.

### Brand
| Token | Value | Role |
|---|---|---|
| `--ux4g-color-primary-500` | `#6a4eff` | Brand primary (indigo/violet) |
| `--ux4g-color-primary-600` | `#4a2bc2` | Primary text/links default (`--ux4g-text-brand-primary-default`) |
| `--ux4g-color-primary-50` / `-900` / `-950` | `#f2efff` / `#24145c` / `#1a0e3d` | Tint / deep / deepest |
| `--ux4g-color-secondary-500` | `#c47d00` | Secondary (amber/gold) |
| `--ux4g-color-secondary-400` / `-700` | `#e89c30` / `#764a00` | |
| `--ux4g-color-tertiary-500` | `#a66acc` | Tertiary (purple) |
| `--ux4g-color-tertiary-600` | `#8e55b3` | |

Primary full scale (verified): `50 #f2efff · 100 #dcd4ff · 200 #c0b3ff · 300 #a391ff · 400 #8670ff · 500 #6a4eff · 600 #4a2bc2 · 700 #3d239f · 800 #301c7d · 900 #24145c · 950 #1a0e3d`.

### Neutral
`--ux4g-color-neutral-0 #fff · 50 #fafafa · 100 #f5f5f5 · 200 #e5e5e5 · 300 #d9d9d9 · 400 #a1a1a1 · 500 #737373 · … · 900` (⚠️ verify 600–950 stops).

### Status / semantic (reference the hue scales, never raw)
| Semantic token | Resolves to |
|---|---|
| `--ux4g-text-neutral-primary` / `-secondary` / `-tertiary` | `neutral-900` / `-700` / `-500` |
| `--ux4g-text-brand-primary-default` | `primary-600` |
| `--ux4g-text-status-success` / `-error` / `-warning` / `-info` | `green-800` / `red-800` / `orange-800` / `cyan-800` |
| `--ux4g-text-link-default-{default,hover,active,visited,disabled,inverse}` | `primary-600 / -700 / -800 / -800 / -400 / -200` |

Additional hue families present (per Storybook Tokens + status refs): **Blue, Sky Blue, Purple, Pink, Lime, Gold, Yellow, Green, Red, Orange, Cyan, Neutral** — available for the data-category palette (§9).

**Contrast:** target **WCAG AA** on all text; **AAA** on body copy. Verify every brand-on-surface pairing with a contrast check; do not assume a token pair passes.

---

## 2. Typography

- **Families:** `--ux4g-font-family-base: "Noto Sans", system-ui, sans-serif` · `--ux4g-font-family-display: "Noto Sans Display", "Noto Sans", sans-serif`. ✅ Matches the Noto Sans mandate.
- ⚠️ **Hindi/Devanagari is NOT in the UX4G bundle.** We must self-host **Noto Sans Devanagari** (subset, woff2, `font-display: swap`), exposed via `[lang="hi"]` so `--ux4g-font-family-base` falls through to it. Track as an extension.
- **Weights:** `--ux4g-font-weight-regular 400 · medium 500 · semibold 600 · bold 700` (display: semibold 600, bold 700). Budget: **≤ 4 weights total** across Latin + Devanagari.
- **Font-size tokens:** `--ux4g-fs-8…60` mapped to `--ux4g-size-*` (e.g. `fs-16 = 1rem`). Component-local sizing via `--ux4g-fs-current`.
- **Line-height tokens:** `--ux4g-line-height-14…80` (rem).

### Semantic type-role scale (use these utility classes, not raw sizes)
Each role has `-default` and `-strong` (weight) variants:

| Tier | Roles |
|---|---|
| **Display** | `.ux4g-display-l` · `-m` · `-s` · `-xs` |
| **Heading** | `.ux4g-heading-2xl` · `-xl` · `-l` · `-m` · `-s` · `-xs` · `-2xs` |
| **Title** | `.ux4g-title-l` · `-m` · `-s` |
| **Body** | `.ux4g-body-m` · `-s` · `-xs` |
| **Label** | `.ux4g-label-l` · `-m` |

**Editorial rules:** Display for hero numerals & story chapter marks; Heading for page/section structure; Body at **65–75ch measure**; one H1 per page, no skipped levels (a11y). Numerals in Display styles are a primary design element (see PRODUCT.md §4.2 "data as decoration").

---

## 3. Spacing (two real scales)

- **`--ux4g-space-*` (px, layout rhythm):** `none 0 · 1 2px · 2 4px · 3 6px · 4 8px · 5 12px · 6 16px · 7 20px · 8 24px · 9 32px · 10 40px · 11 48px · 12 56px · 13 64px · 14 80px · 15 120px · 16 360px`.
- **`--ux4g-size-*` (rem, component sizing):** `8 .5rem · 12 .75rem · 16 1rem · 20 1.25rem · 24 1.5rem · 32 2rem · 40 2.5rem · 48 3rem · 60 3.75rem · 64 4rem · 80 5rem · 120 7.5rem`.
- Grid gap default `--ux4g-grid-gap: var(--ux4g-space-5)` (12px). Icon size `--ux4g-icon-size: 18px`.

Never write bare px margins/padding — use `.ux4g-p-*` / `.ux4g-m-*` / `.ux4g-gap-*` utilities bound to these tokens.

---

## 4. Radius

`--ux4g-radius-0 0 · 1 2px · 2 4px · 3 8px · 4 12px · 5 16px · 6 24px · circular 999px`, with semantic aliases `none · xs(2) · sm(4) · md(8) · lg(12) · xl(16) · 2xl(24) · full(999)`. Default card/control radius: `md`. Editorial restraint — prefer whitespace and rule lines over heavy rounded boxes.

---

## 5. Elevation / shadow

Layered elevation `--ux4g-shadow-l0…l4` (l0 = none; l1 subtle → l4 modal), built from `--ux4g-elevation-color-*` (rgba black at 4/8/16/24%). Focus system: `--ux4g-shadow-focus-ring`, `--ux4g-shadow-focus-border`, `--ux4g-shadow-focus-inset`. **Use the focus tokens for every interactive element** — visible focus rings are a hard a11y requirement. Use elevation sparingly; the editorial look leans on whitespace, not drop shadows.

---

## 6. Motion

- **Budget:** all transitions **< 300ms**, easing from UX4G. ⚠️ capture UX4G easing/duration tokens during M1.
- **Sanctioned motion:** scroll-linked reveals (India Story timeline), number count-ups on first view, chart transitions on filter change, subtle hover/focus states.
- **Banned:** parallax, auto-playing carousels, scroll-jacking, motion that conveys information without a static equivalent.
- **`prefers-reduced-motion: reduce`** disables all non-essential motion everywhere; count-ups snap to final value; the data-driven hero degrades to a static image.

---

## 7. Colour mode (light / dark)

- Mechanism: **`[data-theme="dark"]`** on `:root`. Default from `prefers-color-scheme`; a manual toggle **persists** (localStorage) and does not cause FOUC (set before paint).
- Both modes are token-driven — never hardcode a dark override; UX4G remaps semantic tokens under the dark selector. Verify contrast in **both** modes for every surface.

---

## 8. Iconography

UX4G ships **its own icon fonts** in the bundle: `UX4G Material Icons` (+ `Outlined`, `Round`, `Sharp`, `TwoTone`). Self-hosted ✅ (satisfies the no-third-party-CDN constraint). **Perf note:** the icon fonts are base64-embedded (§10) — extract to a **separate self-hosted subset** or convert used glyphs to an **SVG sprite**; never inline the whole icon font on landing pages.

---

## 9. Extensions (built ON UX4G tokens — documented, not ad-hoc)

UX4G has **no chart/data-viz component**, so we build these and bind every value to `--ux4g-*` tokens:

1. **Charts — Apache ECharts**, themed entirely from UX4G tokens (axis, grid, series colours from the data-category palette). Every chart ships an accessible `<table>` equivalent, a CSV/XLSX download, an `aria` text summary of the trend, colour-blind-safe series, and **no colour-only encoding** (pair with label/pattern/marker).
2. **Data-category palette** — a fixed, ordered, colour-blind-safe sequence drawn from UX4G hue tokens (Blue, Gold, Tertiary/Purple, Lime, Sky Blue, Pink…), locked in code so categories stay stable across charts. Documented here before use.
3. **India Story timeline** — built on `Journey Timeline` / `Stepper` components + Display numerals + scroll reveals; deep-linkable era anchors.
4. **Choropleth maps** — **official GoI boundary files only** (legal). Token-coloured sequential scales; keyboard-navigable; always accompanied by the data table.

Any future extension gets a subsection here + a Storybook story + an ADR.

---

## 10. ⚠️ Critical build constraint — the CSS diet

`styles/ux4g.css` is **7.6MB** because **7 `@font-face` blocks embed fonts as base64 TTF/OTF data-URIs** (Noto Sans, Noto Sans Display, 5 icon variants). Shipping it raw destroys the performance budget (landing CSS+JS ≤150KB gzip; LCP ≤2.5s on Slow 4G).

**Required pipeline (ADR `docs/adr/0003`):**
1. **Purge** to only the components/utilities we actually use (safelist dynamic classes).
2. **Strip** all embedded `@font-face` data-URIs from the shipped CSS.
3. **Self-host** Noto Sans + Noto Sans Display + **Noto Sans Devanagari** as **subset woff2**, `font-display: swap`, ≤4 weights total.
4. **Split** icon fonts → subset/SVG sprite, lazy where possible.
5. Keep the **token layer** (`:root { --ux4g-* }`) intact and first in the cascade.

`npm run tokens:extract` regenerates the token tables in this file from the installed bundle so this doc never drifts from reality.

---

## 11. ⏳ Pending (Section 18)
- **Q1** — confirms `ux4g-web-components@1.0.0` is the approved package/version; if a React/Angular distribution is mandated instead, revisit §0.
- **Q6** — brand palette overrides: does EAC-PM require an official Council colour that must map onto/над the UX4G brand tokens? If so, document the mapping here (still as tokens).
- **⚠️ verify** items above (neutral 600–950, easing/duration tokens, breakpoint values, container widths) — fill during M1 from the installed CSS.
