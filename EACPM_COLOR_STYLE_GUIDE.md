# EAC-PM Colour Style Guide — "Ink, Indigo & Light"

**A theme layer for UX4G Design System 3.0.** This does not replace UX4G. It specifies *which* UX4G semantic slots get which values, and defines the small, documented set of extension tokens UX4G does not cover (chiefly data visualisation). Drop this into `DESIGN.md` in the build repo.

---

## 0. Ground rules

1. **UX4G 3.0 owns the structure.** Component colours are consumed through UX4G's semantic token layer (`Background/*`, `Text/*`, `Action/Brand/*`, `Icon/*`, `Border/*`). No component is restyled by overriding its internals.
2. **Before implementing, resolve the real tokens.** Export UX4G's Colour Styles collection (256 values, Light/Dark modes) and record the actual hex for every semantic slot in `docs/UX4G_NOTES.md`. UX4G 3.0's brand hue is a deep violet (the design-system site ships `theme-color: #4a2bc2`), and the token map reserves `Background/Brand/Primary/Stronger` as a deep purple that must **not** be used for ordinary CTAs. Verify both before writing a line of CSS — everything below is designed to sit correctly next to that violet, but the exact ramp must come from the source, not from this document.
3. **Extensions are allowed, but only three kinds:** (a) an institutional accent family for EAC-PM's editorial surfaces, (b) a data-visualisation palette, (c) surface tints. Each is declared in `DESIGN.md` with a rationale, a contrast proof, and a token name in UX4G's naming style. Nothing else may introduce a new colour.
4. **Colour never carries meaning alone.** Every status, series or category is also labelled, patterned or iconed. This is a WCAG 1.4.1 requirement and a practical one — a third of this site's charts will be read in greyscale print or on a poor phone screen.

---

## 1. The idea

The brief is a contradiction worth resolving: *international standard* and *Indian roots*, on a Government of India domain, for readers at the IMF and readers in a district college.

**What we do not do:** saffron-white-green as a decorative palette. Tricolour-as-theme is the default move for Indian government sites and it is the wrong one here — it reads as flag-literalism rather than institutional identity, it constrains data visualisation badly (orange and green are the two hues you most need free for "up" and "down"), and the flag's colours carry statutory dignity that a marketing surface should not casually appropriate. The Emblem and the tricolour appear where protocol requires them, at full fidelity, and nowhere else.

**What we do instead:** draw the palette from India's *material and economic* history — the same story the site is telling.

| Hue | Root | Why it earns its place |
|---|---|---|
| **Indigo (नील)** | India's most-traded dye for two millennia; the pigment that coloured global commerce and later named a colonial economy | Deep blue-violet reads as authority and analysis everywhere in the world — the register of central banks and research institutions — while being the single most historically Indian colour in trade |
| **Ink black (काजल / lamp-black)** | Manuscript ink on palm leaf and birch bark | Warm near-black for body text; softer and more readable than pure `#000` |
| **Parchment / Sandstone** | Palm-leaf manuscript, Ashokan and Mughal sandstone | Warm off-white page ground. Long-form economics is read for 20 minutes at a time; a warm ground reduces glare fatigue versus stark white |
| **Haldi ochre (हल्दी)** | Turmeric, marigold, gold leaf | The highlight. Used sparingly for emphasis, "new", and one data series |
| **Terracotta / Laterite** | Earthenware, Indian soil, Chettinad and Kutch red | Editorial accent and a warm data hue that is not "danger red" |
| **Peacock teal** | Verdigris, peacock, temple bronze patina | The second analytical hue; pairs with indigo without colliding |
| **Plum & Moss** | Jamun, indigo-vat greens | Reserve categories for dense charts |

The result is a palette a reader in Geneva parses as serious institutional design, and a reader in Delhi recognises as Indian — without a single flag reference.

---

## 2. Primitive ramps (extension tokens)

Namespace: `eac.*`. These are *primitives*; components never reference them directly, only through the semantic map in Section 3.

### Indigo — institutional anchor
| Token | Hex | Use |
|---|---|---|
| `eac.indigo.900` | `#0B1633` | Dark-mode page ground; masthead; hero |
| `eac.indigo.800` | `#132251` | Footer, dark surfaces |
| `eac.indigo.700` | `#1B2F73` | Headings on light; chart series 1 |
| `eac.indigo.600` | `#25409B` | Secondary action, active nav |
| `eac.indigo.500` | `#3355C4` | Links on light ground |
| `eac.indigo.300` | `#8AA0E0` | Dark-mode borders, muted marks |
| `eac.indigo.200` | `#B9C7EE` | Dark-mode headings |
| `eac.indigo.100` | `#DDE4F7` | Selected rows, subtle fills |
| `eac.indigo.50`  | `#EEF2FB` | Table zebra, callouts |

### Warm neutrals — the reading surface
| Token | Hex | Use |
|---|---|---|
| `eac.parchment` | `#FBF8F2` | Default page background (light) |
| `eac.sand` | `#F2EDE3` | Raised/secondary surface, cards |
| `eac.line` | `#E2DCD1` | Hairlines, dividers, table rules |
| `eac.ink.900` | `#14110F` | Body text, headings |
| `eac.ink.700` | `#3A3632` | Secondary text |
| `eac.ink.500` | `#5F5A54` | Metadata, captions, disabled label |

### Accents
| Token | Hex | Use |
|---|---|---|
| `eac.ochre.700` | `#8A5A08` | Ochre text on light (AA-safe) |
| `eac.ochre.600` | `#B0740C` | Icons, large type, chart series |
| `eac.ochre.500` | `#D99512` | Highlight rules, "New" badges, chart series |
| `eac.ochre.300` | `#F0C46A` | Dark-mode ochre text, highlight underlay |
| `eac.ochre.100` | `#FBEBCD` | Highlight wash behind pull-quotes |
| `eac.teal.700` | `#0C5E5A` | Teal text on light |
| `eac.teal.600` | `#0F7A74` | Chart series, secondary icons |
| `eac.teal.300` | `#5FCFC5` | Dark-mode teal |
| `eac.terra.700` | `#8C3A22` | Terracotta text on light |
| `eac.terra.600` | `#AE4A2C` | Chart series, editorial rules |
| `eac.terra.300` | `#E9A188` | Dark-mode terracotta |
| `eac.plum.700` | `#5B2350` | Chart series 5 |
| `eac.moss.700` | `#3F5D2A` | Chart series 6 |
| `eac.slate.600` | `#4A5A6A` | Chart series 7, "other/unclassified" |

**Semantic status colours stay UX4G's.** Success, warning, error, info and the ten status-badge values in the UX4G status vocabulary are used unchanged — a citizen who has seen one government service should read a status badge identically here.

---

## 3. Semantic mapping

Bind these onto UX4G's slots. `→` means "this UX4G semantic token resolves to".

### Light mode (default)
| UX4G slot | Value | Notes |
|---|---|---|
| `Background/Neutral/Default` | `eac.parchment` | Warm page ground |
| `Background/Neutral/Subtle` | `eac.sand` | Cards, table headers, filter rails |
| `Background/Brand/Primary/Stronger` | `eac.indigo.900` | **Reserved** — masthead, hero, footer, selected nav only |
| `Action/Brand/Primary/Default/Background` | UX4G brand violet | **Unchanged.** All primary CTAs stay UX4G-native |
| `Action/Brand/Primary/Hover/Background` | UX4G brand violet, hover step | Unchanged |
| `Text/Neutral/Primary` | `eac.ink.900` | Body, headings |
| `Text/Neutral/Secondary` | `eac.ink.700` | Standfirsts, secondary copy |
| `Text/Neutral/Tertiary` | `eac.ink.500` | Dates, sources, captions |
| `Text/Link/Default` | `eac.indigo.500` | Underlined by default in body copy |
| `Text/Link/Visited` | `eac.plum.700` | Real visited states — this is a research archive |
| `Border/Neutral/Default` | `eac.line` | 1px hairlines |
| `Icon/Brand/Primary/Default` | `eac.indigo.700` | Editorial icons |
| Focus ring | UX4G focus token, 3px, 2px offset | Never removed, never colour-only |

### Dark mode
| UX4G slot | Value |
|---|---|
| `Background/Neutral/Default` | `eac.indigo.900` |
| `Background/Neutral/Subtle` | `eac.indigo.800` |
| `Text/Neutral/Primary` | `eac.parchment` |
| `Text/Neutral/Secondary` | `eac.indigo.200` |
| `Text/Link/Default` | `#9FB6F2` (8.9:1) |
| `Border/Neutral/Default` | `eac.indigo.700` |
| Accents | `eac.*.300` steps throughout |

Dark mode follows `prefers-color-scheme` with a persisted manual override. Both modes ship at parity — no "dark mode as afterthought" contrast failures.

---

## 4. Data visualisation palette

UX4G does not ship a charting palette; this is a declared extension. Every chart also ships a data table and a CSV.

**Categorical (ordered — use in this sequence, stop when you run out):**

`eac.indigo.700` → `eac.ochre.600` → `eac.teal.600` → `eac.terra.600` → `eac.plum.700` → `eac.moss.700` → `eac.slate.600` → `eac.indigo.500`

Indigo and ochre first because they are the most separable pair for deuteranopia and protanopia, and they survive greyscale conversion (11.6:1 vs 3.7:1 against parchment). Never plot more than 7 categories; beyond that, group into "other" or switch to small multiples.

**Sequential (magnitude, e.g. state-wise choropleth):**
`#EEF2FB → #DDE4F7 → #8AA0E0 → #3355C4 → #25409B → #1B2F73 → #0B1633` — single-hue indigo, 7 bins, always with a legend showing bin edges and an explicit "no data" hatch (never grey-that-looks-like-a-value).

**Diverging (above/below a benchmark — growth vs contraction, surplus vs deficit):**
`#8C3A22 ← #C96A4A ← #F7E2DA ← #FBF8F2 → #DDE4F7 → #3355C4 → #1B2F73` — terracotta to indigo, neutral parchment midpoint. **Do not use red-green for economic direction**; it fails for the ~8% of male readers with red-green deficiency and it imports a moral valence ("green good") into figures that are often neither.

**Semantic-in-charts:** actuals solid, projections dashed with a "Projected" label; revisions annotated; provisional data carries a `Provisional` badge in `eac.ochre.500`.

---

## 5. Contrast (computed, WCAG 2.1)

Against `eac.parchment #FBF8F2`:

| Token | Ratio | Verdict |
|---|---|---|
| `ink.900 #14110F` | **17.74** | AAA body ✓ |
| `ink.700 #3A3632` | **11.30** | AAA ✓ |
| `ink.500 #5F5A54` | **6.44** | AA body, AAA large ✓ |
| `indigo.900 #0B1633` | **16.83** | AAA ✓ |
| `indigo.700 #1B2F73` | **11.65** | AAA ✓ |
| `indigo.500 #3355C4` | **6.12** | AA body ✓ (links) |
| `teal.700 #0C5E5A` | **7.17** | AAA large, AA body ✓ |
| `teal.600 #0F7A74` | **4.88** | AA body ✓ (borderline — prefer 700 for text) |
| `terra.700 #8C3A22` | **7.22** | AA body ✓ |
| `ochre.700 #8A5A08` | **5.59** | AA body ✓ |
| `ochre.600 #B0740C` | **3.70** | ✗ body text · ✓ large text & graphics (≥3:1) |
| `ochre.500 #D99512` | **2.40** | ✗ text · fills and rules only |
| UX4G brand violet `#4A2BC2` | **8.20** | AAA ✓ |

Against `eac.indigo.900 #0B1633` (dark mode): parchment 16.8, `indigo.200` 10.6, `ochre.300` 10.9, `teal.300` 9.5, `terra.300` 8.4, link `#9FB6F2` 8.9 — all AAA.

**Rule:** `ochre.500` and `ochre.600` never carry text below 18.66px/24px bold. They are for rules, fills, badges with dark text, and chart marks.

---

## 6. Proportion and application

**60 / 30 / 10.** 60% parchment and sand surface, 30% ink and indigo type and structure, 10% accent. If a page looks colourful, it is wrong. Colour on this site is a wayfinding and data tool, not decoration.

| Surface | Treatment |
|---|---|
| Masthead / GoI identity strip | `indigo.900`, Emblem and tricolour at protocol fidelity, parchment type |
| Homepage hero | `indigo.900` ground, parchment display type, one ochre rule, live indicators in parchment with ochre deltas |
| Body / long-form | Parchment ground, ink type, indigo links, ochre `100` wash behind pull-quotes only |
| Publication cards | Sand surface, hairline `eac.line`, indigo title, ink metadata, type-badge in muted accent |
| The India Story timeline | Era bands shift subtly across the warm ramp (parchment → sand → ochre.100) as the narrative moves forward in time; the *content* colour stays constant |
| Dashboards | Parchment ground, chart palette per Section 4, no coloured chart backgrounds, no gridline colour above `eac.line` |
| Footer | `indigo.800`, parchment type, `indigo.700` dividers |
| Notices / tenders | UX4G status colours, unchanged, always with text label |

**Do**
- Underline links in body copy; colour alone is not a link affordance.
- Use one accent per screen region. Ochre *or* terracotta, not both, in the same card.
- Keep the ochre highlight rare enough that it still means "look here" on the tenth page.
- Test every page in greyscale before shipping.

**Don't**
- Don't tint the Emblem of India, place it on a coloured field, or use it as a decorative motif.
- Don't use saffron/white/green as a UI palette, gradient, or chart series set.
- Don't introduce gradients on surfaces. One permitted exception: a barely-perceptible indigo `900 → 800` in the hero, and only if it survives banding tests.
- Don't encode a data category in a status colour (success green, error red) — readers will infer judgement.
- Don't recolour UX4G components' primary actions to indigo. The violet CTA is the citizen's cross-government cue.

---

## 7. Implementation

```css
/* tokens/eac-theme.css — primitives */
:root {
  --eac-indigo-900:#0B1633; --eac-indigo-800:#132251; --eac-indigo-700:#1B2F73;
  --eac-indigo-600:#25409B; --eac-indigo-500:#3355C4; --eac-indigo-300:#8AA0E0;
  --eac-indigo-200:#B9C7EE; --eac-indigo-100:#DDE4F7; --eac-indigo-50:#EEF2FB;
  --eac-parchment:#FBF8F2; --eac-sand:#F2EDE3; --eac-line:#E2DCD1;
  --eac-ink-900:#14110F; --eac-ink-700:#3A3632; --eac-ink-500:#5F5A54;
  --eac-ochre-700:#8A5A08; --eac-ochre-600:#B0740C; --eac-ochre-500:#D99512;
  --eac-ochre-300:#F0C46A; --eac-ochre-100:#FBEBCD;
  --eac-teal-700:#0C5E5A; --eac-teal-600:#0F7A74; --eac-teal-300:#5FCFC5;
  --eac-terra-700:#8C3A22; --eac-terra-600:#AE4A2C; --eac-terra-300:#E9A188;
  --eac-plum-700:#5B2350; --eac-moss-700:#3F5D2A; --eac-slate-600:#4A5A6A;
}
/* Map onto UX4G's semantic custom properties — names to be confirmed
   against the exported token set, NOT guessed. */
```

- Primitives live in one file; **application code references semantic names only.** A lint rule (`stylelint-declaration-strict-value` or equivalent) fails any raw hex outside `tokens/`.
- Mirror the same tokens in the Figma file as a UX4G-compatible variable collection with Light/Dark modes, so design and code stay in step.
- Add a Storybook "Foundations / Colour" page rendering every token with its live computed contrast ratio — so drift is visible, not discovered in audit.
- Add an automated test: every text/background pair used in the built site is extracted and asserted ≥ 4.5:1 (≥ 3:1 for large). Failing pair = failing build.

---

## 8. Before this is final

Take to EAC-PM / NIC for sign-off: (a) the departure from tricolour theming, with the rationale in Section 1 — expect this to be questioned, and it is the right conversation to have early; (b) whether an official EAC-PM or NITI Aayog identity colour already exists that must take precedence; (c) confirmation that the UX4G brand violet stays on primary actions; (d) Emblem and tricolour usage per GoI identity guidelines on both light and dark grounds. Do not build the theme until (b) is answered — an existing mandated colour outranks everything above.
