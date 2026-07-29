# CLAUDE.md — Working Agreement, Commands & Guardrails

> Project brain file for the **EAC-PM portal revamp** (`eacpm.gov.in`). Built in-house by **Digital India Corporation (DIC)** — a MeitY Section-8 company — for **NITI Aayog / EAC-PM**. Timeline **3 months**. Hosting **National Government Cloud (NGC)**, coordinated with **NIC**.
>
> Read this alongside [`PRODUCT.md`](PRODUCT.md) (who/why/tone), [`DESIGN.md`](DESIGN.md) (tokens/type/motion), and [`PLAN.md`](PLAN.md) (milestones/acceptance). Source of intent is [`PROMPT.md`](PROMPT.md).

---

## 1. What we are building (one paragraph)

A bilingual (English + Hindi) government website that does **two jobs at once**: (1) the Council's authoritative, GIGW-3.0-compliant institutional home — publications, working papers, members, notices, media; and (2) a credible, high-signal **showcase of India's economic story** for global investors, world economists, researchers, educators, students, international forums, and citizens. It must be fast on a ₹8,000 Android on a congested network, accessible to WCAG 2.1 AA (AAA on body contrast), and maintainable by DIC's team after handover. See [`PRODUCT.md`](PRODUCT.md).

---

## 2. Prime directives (non-negotiable — a merge gate, not aspirations)

1. **UX4G Design System 3.0 is the only visual vocabulary.** All colour, spacing, radius, elevation, type come from UX4G tokens/classes. No hardcoded hex, no arbitrary px, no third-party UI kit (no Bootstrap themes, MUI, shadcn defaults) for anything UX4G provides.
   **We may keep our own style guide on top of it**, under the three-step policy in [`DESIGN.md`](DESIGN.md) §0.1: use the vendor component if it exists → adopt-and-bridge if it exists but fails a project gate → build an extension if it doesn't exist or would break a settled product decision. Every extension is declared in `DESIGN.md` §9.2 with its reason and consumes `--ux4g-*` tokens throughout.
   A declared extension is **not** non-compliance. A raw hex, a magic px, or a silent fork of vendor CSS **is**. The audit question is *"does every value trace to a `--ux4g-*` token, and is the divergence declared?"* — not *"is the class `ux4g-`-prefixed?"*
2. **Never fabricate.** No invented statistic, quote, date, name, designation, or citation — ever. The correct fallback is always a `{{ FACT-CHECK REQUIRED: … }}` placeholder plus an entry in [`content/FACTCHECK_QUEUE.md`](content/FACTCHECK_QUEUE.md). A wrong number on a GoI economic site is far worse than a blank one. Every displayed figure carries **source + period + last-updated**. Historical GDP-share figures are contested *estimates* and must be labelled as such. (Full rules: [`PRODUCT.md`](PRODUCT.md) §Governance.)
3. **Accessibility is a gate.** WCAG 2.1 AA minimum, AAA on body text contrast. Keyboard-complete, screen-reader tested (NVDA + VoiceOver), skip links, landmarks, visible focus rings, `prefers-reduced-motion` honoured. axe-core clean **and** a manual audit per page.
4. **GIGW 3.0 compliance** — every mandatory page + policy, tracked in `docs/GIGW_COMPLIANCE_MATRIX.md`. No page ships that fails its matrix rows.
5. **Bilingual parity.** `/en/` and `/hi/` routes, correct `lang`/`hreflang`, toggle preserves route. Machine translation may draft; **no unreviewed MT ships on policy content**. Devanagari is Unicode-only.
6. **Mobile-first & within the performance budget** ([`PLAN.md`](PLAN.md) §Budgets) — a gate.
7. **Infra: capable, but disciplined.** Per the client (2026-07-24) **assume no hardware/provisioning limits** on NGC — we may run Node + PostgreSQL + object storage + a self-hosted CMS + a search service + self-hosted analytics. This is *not* licence for bloat: the mandate is **"fast and beautiful."** Keep the **policy** constraints regardless — self-host fonts/icons/scripts, **no third-party CDN for critical assets, no offshore data/analytics**, no vendor-locked edge runtime.
8. **Boring, documented, low-magic code** — DIC maintainers and non-developer editors run this after handover.
9. **No data loss on migration** — reconciliation report proving old URL → new URL for every asset, plus 301s.
10. **Security:** CSP with no `unsafe-inline`, SRI where external refs are unavoidable, no client-side secrets, sanitised uploads, rate-limited search, STQC/CERT-In audit readiness (`docs/SECURITY_AUDIT_PACK.md`).

---

## 3. UX4G integration — how we actually consume it (grounded, verified 2026-07-24)

> ⚠️ **Reality differs from `PROMPT.md` §3's assumption.** The prompt assumed `ux4g-web-components` ships **custom elements** to be wrapped in React with `ClientOnly` boundaries. Inspection of the published package shows it is a **CSS-first utility + token framework** (Bootstrap-style), *not* custom elements. This is better for us (SSR-friendly, cheaper JS). The CSS-first model is now the implemented approach — see [`DESIGN.md`](DESIGN.md) §0. ⏳ ADR `docs/adr/0002-ux4g-css-first-integration.md` still to be written; **confirm against Section 18 Q1** before locking.

Verified facts about `ux4g-web-components@1.0.2` (published by `support.ux4g@digitalindia.gov.in`; re-verified 2026-07-28 — CSS, runtime and types are **byte-identical** across 1.0.0 → 1.0.2, only README/metadata changed):

- **Consumption:** `import "ux4g-web-components/styles.css"` (maps to `styles/ux4g.css`) + apply `.ux4g-*` classes. Optional interactive behaviours via `ux4g-web-components/runtime/bootstrap`. TS types under `/types` ("Class_Builder").
- **Tokens:** CSS custom properties prefixed `--ux4g-*` (colour, `space`, `size`, `radius`, `shadow`/elevation, `fs` type scale, semantic text/link/status). Full inventory + values in [`DESIGN.md`](DESIGN.md).
- **Theme:** `[data-theme="dark"]` on a root element. Default from `prefers-color-scheme`, manual override persisted.
- **53 components** documented, **2,280 distinct `.ux4g-*` classes** in the CSS. Includes Navbar, Mega Menu, Breadcrumb, Footer, Search, Table, Card, Journey Timeline, Stepper, and an Accessibility Bar — though the last is a **CSS shell only** (6 classes, no font-resize or contrast behaviour), so the GIGW toolbar is ours. **No chart component** → charts are a token-based extension (ECharts). Adoption status per family: [`DESIGN.md`](DESIGN.md) §9.1.
- **The companion `ux4g-skill` package** generates HTML/React/Angular markup using UX4G classes — use it as a reference for correct component markup, not as a runtime dependency. (Authenticity caveat: maintained under a personal Gmail — see Section 18 note.)

**Hard engineering constraints — handled, do not regress:**

1. `styles/ux4g.css` is **7.6MB**, ~94% of it 7 fonts embedded as base64. **Never ship it raw and never `import "ux4g-web-components/styles.css"`.** Tokens live in `src/styles/ux4g-tokens.css`; components are lifted by `node scripts/extract-ux4g-components.mjs` into `src/styles/ux4g-components.css`. Extraction (not PurgeCSS) because the vendor uses `[class*=spinner-]` substring selectors and ~50 bare state classes that purging drops. See [`DESIGN.md`](DESIGN.md) §10.
2. The bundle has **no Noto Sans Devanagari**, and ships **weight 400 only** for every face — Hindi typography and all non-400 weights are on us. See [`DESIGN.md`](DESIGN.md) §2.
3. **The vendor runtime is not used.** `initRuntime()` injects inline `<script>` tags, which breaks the CSP rule in §10 below. Interactive behaviour is written in-house against the vendor's class names and ARIA contract.

**Rules:**
- Never fork or copy UX4G component internals. To correct vendor behaviour, use the **token bridge** in `globals.css` (`DESIGN.md` §0.2) — and note the bridge selector must be `:root, :root[data-theme="dark"]`, or dark mode is silently outranked.
- **Verify every class against `styles/ux4g.css`, never against the README** — 45 documented class names don't exist in the CSS, and the "For LLMs" quick-reference has 15 of 25 utilities wrong. Full register: [`DESIGN.md`](DESIGN.md) §12.
- **Never assume a vendor token pair passes contrast.** Its dark warning tag ships at 3.58:1, under the AA floor. Measure, then bridge if it fails.
- Every new primitive consumes `--ux4g-*` tokens and ships a Storybook story + a11y notes.

---

## 4. Repository layout (target — Section 17 of PROMPT.md)

```
/                 PROMPT.md CLAUDE.md PLAN.md PRODUCT.md DESIGN.md README.md
/apps/web         Next.js app (App Router, TS)                 ⏳ pending Q1/Q2 scaffold
/apps/api         search + dashboard + analytics (if separated)
/packages/ui      UX4G-based components, charts, layout primitives (Storybook)
/packages/content schemas, message catalogues, MDX
/audit            CURRENT_SITE_AUDIT.md, baseline Lighthouse/axe reports
/docs             UX4G_NOTES.md, GIGW_COMPLIANCE_MATRIX.md, SECURITY_AUDIT_PACK.md,
                  CONTENT_EDITOR_GUIDE.md, adr/, runbooks/
/migration        manifests, RECONCILIATION.csv, redirect map
/scripts          migrate/ ingest-pdf/ ingest-dataset/ a11y/ perf/
/content          FACTCHECK_QUEUE.md, ATTRIBUTIONS.md, schemas/
/tests            e2e, visual, a11y, perf budgets
```

Nothing under `/apps`, `/packages`, `/scripts` is scaffolded yet — **no application code until the plan and Section 18 answers are confirmed.**

---

## 5. Commands (target scripts — available after scaffold; ⏳ pending Q1/Q2)

These are the intended npm scripts once the repo is stood up in M1. **Do not assume they exist yet.**

```bash
# dev / build
npm run dev              # local dev server
npm run build            # static-export-first production build
npm run start            # serve the production build

# quality gates (every PR-sized chunk must pass all)
npm run typecheck        # tsc --noEmit
npm run lint             # eslint + stylelint (bans raw hex/px in app CSS)
npm run test             # unit (Vitest/Jest)
npm run test:e2e         # Playwright e2e + visual regression
npm run test:a11y        # @axe-core/playwright
npm run lighthouse       # Lighthouse CI against budgets in PLAN.md
npm run i18n:check       # fail on missing/hardcoded strings, en↔hi key parity

# data / migration pipelines
npm run migrate          # crawl → download → normalise → map → import → verify
npm run ingest:pdf       # extract text (+OCR fallback), chunk w/ page numbers, index
npm run ingest:dataset   # validate CSV/XLSX + data dictionary, load

# design system
npm run tokens:extract   # regenerate DESIGN.md token tables from installed ux4g.css
npm run storybook        # component library w/ a11y addon
```

Verify-before-done loop (browser MCP): every page at **360 / 768 / 1280 / 1920 px**, **light + dark**, **English + Hindi**, before calling anything done.

---

## 6. Working style

- **Plan → confirm → build in continuous passes.** Small, reviewable commits, **conventional messages** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
- **Use subagents for parallelisable research** — site crawl, UX4G catalogue, GIGW checklist extraction, dataset schema design. Keep the conclusion, not the file dumps.
- **Every non-obvious decision → an ADR** in `docs/adr/NNNN-title.md`. Explain *why*, never *what*.
- **Every component → a Storybook story** with a11y notes; unit test; e2e path; visual snapshot.
- **Every user-facing string → the message catalogue.** Zero hardcoded copy.
- When blocked on something only the user/EAC-PM/NIC can decide, **stop and ask** — do not guess (especially the Section 18 items and any statistic).

---

## 7. Definition of Done — per page & merge gate (Section 19)

- [ ] Built only from UX4G components/tokens; zero rogue hex, px spacing, or fonts.
- [ ] English + Hindi at parity, verified in both locales.
- [ ] axe-core clean; manual keyboard + screen-reader pass documented.
- [ ] Meets the performance budget on a throttled mobile profile.
- [ ] Renders usefully with JS disabled; degrades gracefully on slow/2G.
- [ ] Every number carries source + period + last-updated; zero unverified claims.
- [ ] GIGW matrix rows for this page marked pass, with evidence.
- [ ] Legacy URLs 301 to new; content reconciled against the migration manifest.
- [ ] Storybook entry, unit tests, e2e path, visual snapshot.
- [ ] An editor can update the content without a developer, and it's documented.

---

## 8. Guardrails — do NOT

- ❌ Ship raw `ux4g.css` (7.6MB) or any base64-embedded font. Purge + self-host subset woff2.
- ❌ Introduce a non-UX4G UI kit, hardcode hex/px, or invent tokens.
- ❌ Publish any statistic/quote/name without a verifiable source — placeholder + FACTCHECK queue instead.
- ❌ Attribute a policy position to EAC-PM / NITI Aayog / GoI that isn't in a citeable published document.
- ❌ Use a third-party India map with incorrect boundaries — **official GoI boundary files only** (legal requirement).
- ❌ Publish unreviewed machine-translated Hindi on policy content.
- ❌ Add offshore analytics, third-party CDNs for critical assets, auto-loading third-party embeds (maps/social), or client-side secrets.
- ❌ Use `unsafe-inline` in CSP.
- ❌ Substitute a lookalike npm package silently — if a package resolves unexpectedly, stop and flag.

---

## 9. ⏳ PENDING confirmation (blocks locking parts of this file) — see [`PLAN.md`](PLAN.md) & Section 18

| # | Question | Blocks |
|---|---|---|
| Q1 | UX4G distribution (React/Angular/Web Components); is `ux4g-web-components` the approved package/version? | §3 integration model, DESIGN.md |
| Q2 | ✅ **Resolved 2026-07-24** — assume capable NGC stack (Node+PG+object storage+CMS+search+self-hosted analytics); keep policy constraints + "fast and beautiful". Deploy pipeline into NGC still TBD. | — |
| Q3 | Approved EN+HI content source; who signs off Hindi | §2.5, i18n workflow |
| Q4 | 🟡 **Partial** — dimension dictionary provided (`EC_MetaDataList.xlsx`); still need a real series+viz sample and a scanned/legacy PDF for OCR | ingest pipelines |
| Q5 | EAC-PM fact-check owner + turnaround | FACTCHECK loop |
| Q6 | Brand assets vs placeholders | design, Team/Chairperson pages |
| Q7 | Analytics approach (Matomo/Umami self-hosted vs none) | §7 constraint |
| Q8 | Dataset + embed licensing | Data module |
| Q9 | Is "For You" allowed as top-level nav? | IA, PRODUCT.md |
| Q10 | DIC single point of contact + review cadence | governance |
