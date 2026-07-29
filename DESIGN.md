# DESIGN.md — Design Tokens, Type, Elevation & Motion (resolved from UX4G)

> **Single source of truth for visual decisions.** All values below are **resolved from the real package `ux4g-web-components@1.0.2`** (`styles/ux4g.css`), re-verified **2026-07-28**. Nothing here is invented.
>
> **Rule:** consume tokens by name. Never write a raw hex or px value that UX4G already exposes. Anything UX4G does not provide is an **extension** and must be declared in §9 under the policy in §0.1.

---

## 0. How the system is consumed

- **Tokens:** `src/styles/ux4g-tokens.css` — the `--ux4g-*` layer lifted from the bundle (758 declarations incl. the 212-token dark block). Loaded first.
- **Components:** `src/styles/ux4g-components.css` — **generated** by `scripts/extract-ux4g-components.mjs`, which lifts only the families we use out of `styles/ux4g.css`. We do **not** `import "ux4g-web-components/styles.css"` (see §10).
- **Class naming:** `.ux4g-<component>` on markup, exactly as the vendor defines it — **verified against the CSS, never against the README** (see §12).
- **Theme switch:** `[data-theme="dark"]` on `:root` (see §7).
- **Interactivity:** the vendor runtime is **not used** — `initRuntime()` injects inline `<script>` tags, which violates the CSP rule in CLAUDE.md §10. Interactive behaviour is ours, written against the vendor's documented class names and ARIA contract.

### 0.1 Governing policy — UX4G first, style guide sanctioned

UX4G Design System 3.0 is the **mandatory** visual vocabulary. Our own style guide exists on top of it and is legitimate — but only under these rules, in this order:

1. **If UX4G provides it, use it.** Adopt the vendor class; do not re-implement.
2. **If UX4G provides it but it fails a project gate** — accessibility (CLAUDE.md §2.3), performance, or bilingual parity — adopt the class and correct it via the **token bridge** (§0.2), never by forking component CSS. Record the defect in §12.
3. **If UX4G does not provide it, or its version would break an established product decision**, build it as an **extension**: consume `--ux4g-*` tokens for every value, name it in our own namespace (`--app-*`, unprefixed classes), and declare it in §9 with the reason it isn't the vendor's.

An extension is **not** non-compliance. A raw hex, a magic px, or a silent fork **is**. The audit question is never "is this class `ux4g-`-prefixed?" but "does every value trace to a `--ux4g-*` token, and is the divergence declared?"

### 0.2 The token bridge

Adopted components read UX4G's *semantic* tokens, whose stock values are flat greys. Our design tints neutrals toward primary, so unbridged components read grey next to the rest of the site. `globals.css` re-points those semantic tokens at our `--app-*` layer.

Two rules, both load-bearing:

- The bridge selector is **`:root, :root[data-theme="dark"]`**. `ux4g-tokens.css` redefines the same tokens inside `:root[data-theme="dark"]` (specificity 0,2,0); a plain `:root` bridge is silently outranked and dark mode falls back to stock grey.
- **Never bridge `--ux4g-radius-*`, `--ux4g-shadow-l*`, or the font families.** `--app-radius`, `--app-shadow-*` and `--font-sans` are already defined *from* those tokens — re-pointing them creates a reference cycle.

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

## 9. Adoption ledger & extensions

### 9.1 Adopted from UX4G

Families lifted by `scripts/extract-ux4g-components.mjs` (add to `FAMILIES` and re-run to adopt more):

| Family | Classes | Wired into |
|---|---|---|
| Input / textarea | `ux4g-input`, `-input-input`, `ux4g-textarea`, `-textarea-input` | Contact form |
| Form group / label | `ux4g-form-group`, `ux4g-label-m-strong` | Contact form |
| Pagination | `ux4g-pagination`, `ux4g-page-number`, `ux4g-page-nav` | Publications (12/page) |
| Empty state | `ux4g-empty-state` (+ icon, content) | Publications, Notices, What's New |
| Divider | `ux4g-divider-horizontal` | Contact |
| Tag | `ux4g-tag-tonal-*`, `ux4g-tag-s` | Notice status badges, publication-type badges, illustrative-data flags, static dataset-dimension labels |
| Chip | `ux4g-choice-chip-md` (+ bare `.active`) | Publications / Notices / What's New filter chips |
| Search | `ux4g-search`, `-search-input`, `-search-leading-icon` | Publications toolbar |
| Buttons | `ux4g-btn`, `-btn-primary`, `-btn-outline-primary`, sizes `-sm`/`-md`/`-lg` | All buttons site-wide |
| Icon button | `ux4g-icon-btn`, `-icon-btn-pill` | Hero carousel arrows |
| Avatar | `ux4g-avatar` | Team member initials (About) |
| Breadcrumb | `ux4g-breadcrumb`, `-divider`, `-list`, `-item`, `-link` | Publication detail, Policy pages |

*Checkbox / radio / switch / table / alert / context-alert / filter-chip were extracted in an earlier pass with no consumer and have been dropped from `FAMILIES` — 55 KB of dead CSS. Re-add (and re-verify against the CSS) if a real surface needs them.*

**Gap-fills.** The vendor's *reset* layer is not extracted, so adopted controls keep the UA border/outline; `components.css` strips it for `.ux4g-input-input` / `.ux4g-textarea-input`. The vendor also ships **no current-page style** for pagination — `[aria-current="page"]` is ours. Both are documented inline at the rule.

**Chip radius is pinned, and selection uses the vendor's bare `.active`.** `[class*="ux4g-choice-chip"]` gets `radius-full` — the site's chip and badge language is pill-shaped where the vendor default is `radius-sm`. Selection must emit the unprefixed `active` class alongside `aria-pressed` / `aria-current`; that is safe because the vendor's selectors are `:is(.ux4g-choice-chip-*).active`, so `.active` only binds on an element that already carries a chip class. **Choose by behaviour:** interactive filters are chips (`ux4g-choice-chip-md`), static labels are tags (`ux4g-tag-tonal-*`) — the tag family has *no* hover/active/cursor rules at all.

**Button weight is pinned.** `[class*="ux4g-btn"] { --ux4g-fw-current: semibold }` — the vendor default is medium (500); this site settled on semibold. Height (40/48px), radius (8px) and horizontal padding (16/20px) already matched exactly, so weight is the *only* divergence. A `:active` press transform is also added, which the vendor lacks. Use `ux4g-btn-sm` (32px) for compact buttons rather than inline padding.

**Tag weight is pinned** the same way — `[class*="ux4g-tag-tonal-"] { font-weight: semibold }` — vendor default is medium.

**Icon buttons have no neutral-ghost variant.** The vendor only ships `-primary`/`-outline-primary`/`-tonal-primary`/`-text-primary` for `ux4g-icon-btn` — every one is accent-tinted at rest. The hero carousel arrows want neutral-at-rest, accent-on-hover (same ghost language as `.iconBtn` in the nav), so `.hero-arrow` pins border/background/color on top of the bare `ux4g-icon-btn ux4g-icon-btn-pill` base — same treatment as `.btn-light`/`.btn-ondark` below.

**The extractor now also matches `[class^=…]` attribute selectors**, not just `.class` tokens. The vendor's type-ramp engine — the rule that turns `--ux4g-fs-current`/`--ux4g-fw-current`/`--ux4g-lh-current` into real `font-size`/`font-weight`/`line-height` — is written as `[class^=ux4g-body-],[class^=ux4g-breadcrumb-],[class^=ux4g-heading-],[class^=ux4g-label-],...`, which a plain `.class` regex never matches. Adopting breadcrumb or label without this fix would extract the per-size rules but silently lose the rule that applies them (text renders at browser defaults, not vendor type).

### 9.2 Sanctioned extensions

Built on `--ux4g-*` tokens; each has a reason it is not the vendor's component.

| Extension | Why not UX4G |
|---|---|
| **Charts** (`LineChart`, `AnimatedAreaChart`, `SmallMultiples`, `Sparkline`) | UX4G ships **no chart component**. Every chart pairs an accessible `<table>`, CSV, and an `aria` summary. |
| **`.container`** | UX4G's container steps at breakpoints (540/720/960/1140/1320px). Ours is fluid to `--app-maxw` with a `clamp()` gutter — long-form reading needs a stable measure, not jumps. |
| **Type ramp `.t-*`** | UX4G's roles are fixed px on Noto Sans. Ours are fluid `clamp()` on the display face. Also: the vendor ramp is applied by `[class^=ux4g-body-]`, a prefix match on the whole `class` attribute — it silently fails when composed (`class="text-muted ux4g-body-s-default"`). |
| **`.grid` / `.grid-2\|3\|4`** | Ours collapse at `max-width: 960px/620px`; UX4G's are `min-width: 768px/992px` and default to `gap: 0`. |
| **`.btn-light` / `.btn-ondark`** | On-dark button variants for the banner, which sits on a photograph in both themes. UX4G ships no on-dark button, so these compose onto `.ux4g-btn`, which supplies all layout. |
| **`.hero-arrow`** | Same reasoning as `.btn-ondark`, for `ux4g-icon-btn`: the vendor's four icon-button variants are all accent-tinted at rest; the carousel wants neutral-ghost/accent-hover, composed onto the bare `ux4g-icon-btn ux4g-icon-btn-pill`. |
| **`.avatar-gradient`** | Composes onto `ux4g-avatar` (box model, radius, centring). The vendor avatar fill is flat single-tone; the gradient identity mark and the 84px size (between its `l`/`2xl` steps) are ours. |
| **`.card`** | UX4G's `card-solid` adds `shadow-l1` (ours is deliberately flat, border-only) and puts padding on `ux4g-card-body`, which is `display: flex` — it would reflow block content in 17 places. |
| **`.chip-select`** | A `<select>` styled as a chip needs room for the native dropdown arrow, which the vendor's icon-less chip padding doesn't allow for. |
| **`.row-item`** | The vendor list declares `border: none` (no row separators) and only pads inside a `.ux4g-list-*` container that also brings `shadow-l2` and its own background. |
| **Layout shell** (`MainNav`, `TopBar`, `SiteFooter`) | Vendor navbar/footer/topbar CSS is 7/4/6 classes with no font-resize or contrast implementation — insufficient for the GIGW toolbar. |
| **`Icon`** (inline SVG set) | Replaces UX4G's 5 base64 icon fonts (~2.3 MB). |
| **`FlagIndia`, `--tri-saffron`, `--tri-green`** | Official flag colours; not in any UX4G ramp. Used only where protocol requires. |
| **`.map-illo-*`, `.cover*`, `.hero-*`, `.detail-grid`** | Editorial and layout primitives with no vendor equivalent. |

**On-dark tokens.** `--app-on-dark`, `--app-on-dark-muted`, `--app-on-dark-accent` exist for surfaces that are dark in *both* themes — the hero scrim, the banner and connect bands, the GoI topbar. They deliberately do **not** flip with the theme, unlike `--app-on-accent`.

**Data-viz palette** (`--cat-1…4`) is drawn from UX4G hue tokens and locked in code so categories stay stable across charts. Colour never carries meaning alone (WCAG 1.4.1).

### 9.3 Planned extensions

UX4G has **no chart/data-viz component**, so we build these and bind every value to `--ux4g-*` tokens:

1. **Charts — Apache ECharts**, themed entirely from UX4G tokens (axis, grid, series colours from the data-category palette). Every chart ships an accessible `<table>` equivalent, a CSV/XLSX download, an `aria` text summary of the trend, colour-blind-safe series, and **no colour-only encoding** (pair with label/pattern/marker).
2. **Data-category palette** — a fixed, ordered, colour-blind-safe sequence drawn from UX4G hue tokens (Blue, Gold, Tertiary/Purple, Lime, Sky Blue, Pink…), locked in code so categories stay stable across charts. Documented here before use.
3. **India Story timeline** — built on `Journey Timeline` / `Stepper` components + Display numerals + scroll reveals; deep-linkable era anchors.
4. **Choropleth maps** — **official GoI boundary files only** (legal). Token-coloured sequential scales; keyboard-navigable; always accompanied by the data table.

Any future extension gets a subsection here + a Storybook story + an ADR.

---

## 10. ⚠️ Critical build constraint — the CSS diet

`styles/ux4g.css` is **7.6MB** because **7 `@font-face` blocks embed fonts as base64 TTF/OTF data-URIs** (Noto Sans, Noto Sans Display, 5 icon variants). Shipping it raw destroys the performance budget (landing CSS+JS ≤150KB gzip; LCP ≤2.5s on Slow 4G).

**Implemented pipeline — extraction, not purge.**

1. **Tokens** → `src/styles/ux4g-tokens.css`, loaded first, `@font-face` and base64 excluded.
2. **Components** → `node scripts/extract-ux4g-components.mjs` lifts the §9.1 families into `src/styles/ux4g-components.css`. It strips `@font-face` and any rule containing `base64`, preserves `@media` wrappers, and keeps a rule only when a class token in its selector belongs to a declared family.
3. **Fonts** self-hosted via `next/font` (Noto Sans + Schibsted Grotesk). The bundle ships **weight 400 only** and **no Devanagari** — Hindi typography is entirely ours.
4. **Icons** → inline SVG set (`components/ui/Icon.tsx`), not the vendor icon fonts.

**Why extraction and not PurgeCSS:** the vendor uses `[class*=spinner-]` substring selectors and ~50 bare state classes (`.active`, `.is-open`, `.show`), which naive purging drops. Extraction is deterministic, reviewable in git, and re-runnable — output is byte-identical across vendor patch releases.

Result: **~51 KB** of vendor CSS committed (`src/styles/ux4g-components.css`, regenerated after pruning zero-consumer families — see §9.1); **~153 KB raw / 25 KB gzipped** measured across the production build's CSS chunks (`npm run build`, 2026-07-30).

---

## 11. ⏳ Pending (Section 18)
- **Q1** — confirms `ux4g-web-components@1.0.2` is the approved package/version; if a React/Angular distribution is mandated instead, revisit §0. (Note: no React/Angular distribution exists — the README's "React" examples are the HTML examples with `class` renamed to `className`.)
- **Q6** — brand palette overrides: does EAC-PM require an official Council colour that must map onto/над the UX4G brand tokens? If so, document the mapping here (still as tokens).
- **⚠️ verify** items above (neutral 600–950, easing/duration tokens, breakpoint values, container widths) — fill during M1 from the installed CSS.

---

## 12. Vendor defect register (`ux4g-web-components@1.0.2`, verified 2026-07-28)

Re-check these on every version bump. `styles/ux4g.css`, the runtime and the types were **byte-identical** across 1.0.0 → 1.0.1 → 1.0.2; only the README and metadata changed.

| # | Defect | Our handling |
|---|---|---|
| 1 | **README is unreliable.** 45 class names it documents do not exist in the CSS — incl. `ux4g-badge`, `ux4g-divider`, `ux4g-modal-footer`, `ux4g-carousel-item`, and three typo'd (`ux4g-daft-staus-bar`). Its "For LLMs" quick-reference is the least accurate part: **15 of 25 utility classes** are wrong (`ux4g-align-center` → really `ux4g-ai-center`; `ux4g-shadow-md` → `ux4g-shadow-l1`; `ux4g-w-full` → `ux4g-w-100`). *(1.0.2 did fix the Navbar/Footer/Accessibility-Bar markup.)* | **Verify every class against the CSS before use.** Never copy README markup. |
| 2 | **Runtime injects inline `<script>`** (`initRuntime()`), breaking the no-`unsafe-inline` CSP. 278 KB, un-tree-shakeable, still handling legacy `data-bs-*`. | Runtime not used; behaviour written in-house. |
| 3 | **Dark warning tag fails WCAG AA** — orange-300 on orange-800 = **3.58:1**. Its own success tag uses a far darker ground (5.48:1); the warning ramp is inconsistent. | Bridge `--ux4g-bg-warning-soft` → `--ux4g-color-orange-900` in dark → **5.34:1**. |
| 4 | **Size-vs-variant specificity bugs.** Both are 0,1,0 and variants declare dimensions, so the variant clobbers the size. The vendor's own `cascade-fixes.css` patches this for **buttons only**; `ux4g-input-*`, `ux4g-table-*`, `ux4g-modal-*`, `ux4g-tag-*` remain unfixed. | Audit any newly adopted size/variant pair. |
| 5 | **No `prefers-color-scheme` support** (0 occurrences); dark mode is `:root[data-theme=dark]` only. The README's claim that `<div data-theme="dark">` scopes dark mode to a section is **false**. | Theme resolution is ours, set before paint. |
| 6 | **Only 2 `prefers-reduced-motion` blocks** against dozens of transitions. | Global reduced-motion guard is ours (§6). |
| 7 | **25 hardcoded values** unreachable by token override (mostly OTP/upload, several `!important`). Plus `--Action-*` and `--ux4x-icon-border-desabled` [sic] referenced but never defined. | Avoid those families, or override at equal specificity. |

---
