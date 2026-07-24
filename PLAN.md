# PLAN.md — Delivery Plan, Tech Decisions & Acceptance Criteria

> Milestone plan for the EAC-PM revamp, mapped to `PROMPT.md` §16. Read with [`CLAUDE.md`](CLAUDE.md), [`PRODUCT.md`](PRODUCT.md), [`DESIGN.md`](DESIGN.md).
> **Status: awaiting sign-off.** Tech choices below are *proposed* and locked only after the remaining Section 18 answers (esp. **Q1** distribution). **Q2 resolved (2026-07-24): assume a capable NGC stack** — so the CMS/DB/search/analytics choices below are unblocked, subject to the "fast and beautiful" bar. No application code is scaffolded yet.

---

## 1. Proposed technology (confirm before locking — Section 18 Q1/Q2)

| Area | Proposal | Why / caveat |
|---|---|---|
| **Framework** | **Next.js (App Router, TypeScript), static-export-first**; thin Node service only for search, dashboard API, analytics counters. | Crawlable static HTML for content pages; SSR-friendly with UX4G's CSS-first model. Astro is an acceptable pure-static alternative — argue, don't switch silently. |
| **UX4G integration** | **CSS-first** — import `ux4g-web-components/styles.css`, build React components applying `.ux4g-*` classes + `--ux4g-*` tokens; optional `runtime/bootstrap` for interactivity. | ⚠️ **Revises PROMPT §3's "custom-elements + wrappers" assumption** — the package is a CSS/token framework, not custom elements. ADR `0002`. |
| **CSS delivery** | Purge + strip embedded fonts + self-host subset woff2. | The raw bundle is 7.6MB. ADR `0003`, [`DESIGN.md`](DESIGN.md) §10. **Gates the perf budget.** |
| **Content** | Editorial content as **MDX/JSON in git**; publications/notices/media/team in a **self-hosted headless CMS (Strapi or Directus)** on NGC. | Non-developers must publish without a deploy. ✅ Unblocked (Q2). Recommend **migrating off WordPress** — see note below. |
| **Database** | **PostgreSQL** — `pg_trgm` + `tsvector`; dedicated `publication_text` table for extracted PDF text. | ✅ Unblocked (Q2). |
| **Search** | **Typesense/Meilisearch self-hosted** (fuzzy, typo-tolerant, Hindi+EN) with Postgres FTS behind it; static index (Orama/Lunr) prebuilt as offline fallback. | ✅ Unblocked (Q2). Graceful degradation if the API is down. |
| **Charts** | **Apache ECharts**, themed from UX4G tokens; a11y table + CSV per chart. | Permissive licence, SSR-able, a11y hooks. [`DESIGN.md`](DESIGN.md) §9. |
| **PDF pipeline** | `pdfjs`/`pdftotext` + `tesseract` OCR fallback; store text + page numbers + snippet index. | Full-text-in-PDF search (§10 of prompt). |
| **i18n** | `next-intl` (or equiv); all copy in message catalogues; zero hardcoded strings. | EN/HI parity gate. |
| **Testing** | Vitest/Jest · Playwright e2e + visual regression · `@axe-core/playwright` · Lighthouse CI budgets. | Every PR-sized chunk passes all. |
| **Analytics** | Self-hosted **Matomo/Umami** on NGC, or none. | No offshore data. Depends on **Q7**. |

Each locked choice → an ADR in `docs/adr/`.

---

## 2. Performance / SEO / resilience budgets (a gate)

| Metric | Budget |
|---|---|
| LCP (mobile, 4× CPU throttle, Slow 4G) | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.05 |
| JS shipped — landing pages | ≤ 150KB gz |
| JS shipped — dashboard pages | ≤ 350KB gz (chart bundle lazy) |
| Lighthouse Perf / A11y / Best-Practices / SEO | ≥ 95 / 100 / ≥ 95 / 100 |
| Fonts | self-hosted, subset, ≤ 2 families, ≤ 4 weights |

Plus: static/SSR HTML for all content (works with JS off), JSON-LD (`GovernmentOrganization`, `ScholarlyArticle`, `Dataset`, `BreadcrumbList`), OG/Twitter cards per publication & story chapter, split XML sitemaps, RSS/Atom, canonical + hreflang, 2G-readable degradation.

---

## 3. Milestones (3 months, mapped to PROMPT §16)

### M0 — Week 1: Discovery  *(in progress)*
**Deliverables:** `audit/CURRENT_SITE_AUDIT.md` (full sitemap, complete PDF/notice/media/team inventory = migration manifest, Lighthouse+axe baseline, blunt breakage list) · `docs/UX4G_NOTES.md` (component/pattern catalogue, token/class names, theming, JS deps) · IA proposal · content model (`content/schemas/`) · tech decision record (ADRs) · this plan signed off.
**Exit criteria:** migration manifest complete and reconciled to a count; UX4G catalogue documented; Section 18 answered; plan approved.
**Done this session:** UX4G package + Storybook inspected, real tokens resolved into [`DESIGN.md`](DESIGN.md), brain files written. **Still owed:** site crawl/audit, UX4G_NOTES.md, schemas, GIGW matrix skeleton.

### M1 — Weeks 2–3: Foundation
Repo + CI; design tokens wired from UX4G + **CSS diet/self-host fonts**; base component library (header w/ GoI identity + Accessibility Bar, footer, nav/mega-menu, search shell); i18n scaffolding (EN/HI); light/dark theming; a11y test harness; CMS stood up (pending Q2); **Storybook of every primitive**.
**Exit:** layout shell passes axe + renders EN/HI light/dark at all breakpoints; token lint (no raw hex/px) enforced in CI; perf budget harness green on the shell.

### M2 — Weeks 4–6: Core site
Home; About (+ Chairperson Message, Team, Previous Chairpersons); Publications list/detail/archives; Notices; Media & Events; What's New; Contact; **all mandatory GIGW pages**. Migration scripts running against real data.
**Exit:** each page meets the §5 DoD; migration dry-run reconciles; GIGW matrix rows for shipped pages pass.

### M3 — Weeks 7–9: Data & narrative
Dashboard (both tiers: India-at-a-Glance + per-publication explorer); dataset ingestion + validator; chart system; **PDF full-text search pipeline**; The India Story; The Last-Mile Ledger; audience hub pages; embeds + press kit.
**Exit:** search finds text inside PDFs with page-deep links; every chart has table+CSV+aria summary; every story figure sourced or FACTCHECK-flagged; embeds carry baked-in attribution.

### M4 — Weeks 10–11: Hardening
Full migration + `migration/RECONCILIATION.csv`; Hindi content pass (human-reviewed); accessibility **manual** audit + fixes; perf tuning to budget; security hardening + VAPT prep; SEO/redirects; load test.
**Exit:** 301s verified for every legacy URL; manual a11y report clean; budgets green; `docs/SECURITY_AUDIT_PACK.md` ready for STQC/CERT-In.

### M5 — Week 12: Handover
NGC deployment with NIC; runbooks; editor training (EN/HI) + `docs/CONTENT_EDITOR_GUIDE.md`; DIC maintenance walkthrough; GIGW matrix sign-off; launch checklist; 2-week stabilisation plan.

*Each milestone ends with a demo build, a written status note, and an updated risk register (§5).*

---

## 4. Per-page acceptance criteria

**Every page** must satisfy the DoD in [`CLAUDE.md`](CLAUDE.md) §7. Page-specific additions:

| Page | Key acceptance criteria (beyond DoD) |
|---|---|
| **Home** | GoI header w/ Emblem + Accessibility Bar; hero = one thesis + 3–4 live indicators each with source/period/last-updated + dashboard link; audience router (4 cards); one **real** interactive chart (not a screenshot); privacy-safe click-to-load social; notices strip links out; rationalised footer w/ all GIGW links + visitor counter + ownership + DIC credit. No link-farm blocks. |
| **Publications — list** | Faceted filters (type/year/author/theme/language/data-flag), sort, grid/list toggle, results count, sticky mobile filter bar; filters carried into URL + results. |
| **Publications — detail** | Authors linked to profiles; abstract; DOI/permalink; accessible PDF viewer w/ text layer; view+download counters (server-side, bot-filtered); cite-as (APA/Chicago/BibTeX copy); related; "Explore the data" when a dataset exists; JSON-LD `ScholarlyArticle`; print stylesheet. |
| **Archives** | Everything > 5 years, same facets, labelled archived, archival policy linked, URLs preserved. |
| **Data & Dashboards** | India-at-a-Glance indicators each w/ source/frequency/last-updated/revision note/series download; per-publication explorer w/ schema validation, cross-filter, table+CSV per view, permalinked filter state, embed code; keyboard-operable; aria chart summaries; official map boundaries; server-side aggregation for large files. |
| **The India Story** | Chaptered scroll longform; sticky/swipeable era rail; deep-link anchors (`#arthashastra`); evidence drawer per chapter; **every number sourced+dated or FACTCHECK-flagged**; contested estimates labelled; full text works with JS off; share → OG card. |
| **Last-Mile Ledger** | "Delhi → last village" transfer trace fully narrated in text (map is enhancement only); honest gaps section; disaggregation where official data allows; all figures sourced. |
| **Team / Profile** | Categorised grid → `/team/{slug}` w/ photo, designation, bio, focus areas, authored publications, media; official-source data only, empty+flagged when unknown. |
| **Notices** | Table+card responsive; publish/close dates; status badges (Open/Closing soon/Closed); attachments; email/RSS subscription. |
| **What's New** | Auto-populated from content timestamps (zero manual curation); type filters; RSS/Atom. |
| **Contact** | Postal address top; phone/email/hours; click-to-load accessible map (no auto-load third-party); validated feedback form w/ confirmation; RTI + grievance officer. |
| **Mandatory GIGW pages** | Website Policies, Terms, Copyright, Hyperlinking, Privacy, Accessibility Statement, Help, Sitemap (HTML+XML), Feedback, Contact, RTI, Archive Policy, Content Review Policy — each present, linked in footer, matrix row passing. |
| **404 / 500** | Route users somewhere useful; 404 suggests closest match via search. |

---

## 5. Initial risk register

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| R1 | UX4G is CSS-first, not custom-elements (differs from PROMPT §3) | Medium | Already re-planned to CSS-first (ADR 0002); confirm via **Q1**. |
| R2 | Raw `ux4g.css` = 7.6MB w/ embedded fonts | High (perf gate) | CSS diet + self-host subset woff2 (ADR 0003) early in M1. |
| R3 | No Noto Sans Devanagari in bundle | Medium | Self-host subset Devanagari; wire via `[lang="hi"]`. |
| R4 | ~~NGC may not provision Node/Postgres/CMS/search~~ | ✅ Retired | Client confirmed capable infra (2026-07-24). Still design graceful degradation (static search fallback, works-with-JS-off) for the "fast + resilient" bar. |
| R5 | Hindi sign-off capacity / MT risk | High (policy) | Human-review gate; never publish unreviewed MT on policy content; **Q3**. |
| R6 | Fact-check turnaround for India Story / Last-Mile | High (credibility/legal) | Placeholder + FACTCHECK_QUEUE; **Q5** owner + SLA. |
| R7 | Missing brand assets / member data | Medium | Placeholders flagged; **Q6**; never invent names/designations. |
| R8 | `ux4g-skill` maintained under personal Gmail (vs official account for `ux4g-web-components`) | Medium (supply chain) | Confirm authenticity before depending on it; pin versions; SRI/lockfile; treat as reference not runtime. |
| R9 | Map boundary compliance | High (legal) | Official GoI boundary files only; review gate. |
| R10 | No-data-loss migration | High (contractual) | Manifest → reconciliation CSV → 301 verification as a gate. **⚠️ New (from audit):** current detail pages expose **no dates/authors** and the REST API is disabled — scraping alone loses metadata. **Obtain a WordPress export (WXR/DB) + `wp-content/uploads` from maintainers/NIC** (roadblocker Q-A). |
| R11 | `EC_MetaDataList.xlsx` shows **dimension codes change across dataset versions** (state code AP = 02/28/37 across EC4/5/6) | Medium | Dataset model must **version its code lists**; never assume stable dimension codes; validator checks the declared code-set per upload. |

---

## 6. Discovery deliverables still owed (next actions after sign-off)
1. `audit/CURRENT_SITE_AUDIT.md` — crawl `eacpm.gov.in` (polite), full sitemap + PDF/asset inventory + Lighthouse/axe baseline + breakage list.
2. `docs/UX4G_NOTES.md` — full 52-component / 57-pattern catalogue, props/slots/classes, JS deps.
3. `content/schemas/` — `Publication, PublicationSeries, Dataset, Author/Member, Chairperson, Notice, MediaItem, Event, GalleryAlbum, Page, StoryChapter, Indicator`.
4. `docs/GIGW_COMPLIANCE_MATRIX.md` skeleton — every guideline → page/component/test.
5. ADRs `0001` (framework), `0002` (UX4G CSS-first), `0003` (CSS diet/fonts), `0004` (content/CMS), `0005` (search).
6. `content/FACTCHECK_QUEUE.md` + `content/ATTRIBUTIONS.md` stubs.

---

## 7. Definition of Done — launch
All per-page DoD satisfied across the site **and**: full migration reconciled with 301s verified; GIGW matrix 100% pass; manual a11y audit clean; budgets green on throttled mobile; security pack ready for STQC/CERT-In; EN/HI parity verified; editors trained; runbooks delivered; 2-week stabilisation plan agreed.
