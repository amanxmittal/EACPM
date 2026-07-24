# Claude Code Master Prompt — EAC-PM Portal Revamp (UX4G Design System 3.0)

> **How to use this file.** Save it as `PROMPT.md` at the root of an empty repo, open Claude Code in that directory, and start with:
> `Read PROMPT.md end to end. Do not write any code yet. Enter plan mode, then produce PLAN.md, CLAUDE.md, PRODUCT.md and DESIGN.md as described in Section 0 and Section 17, and come back to me with the open questions in Section 18.`
> Everything below is written to be pasted verbatim into the agent's context.

---

## 0. Role, mandate and first actions

You are the lead engineer + design technologist for the complete redevelopment of the **Economic Advisory Council to the Prime Minister (EAC-PM)** website (`https://eacpm.gov.in/`), executed in-house by **Digital India Corporation (DIC)**, a Section 8 company under **MeitY**, for **NITI Aayog / EAC-PM**. Timeline: **3 months**. Hosting target: **National Government Cloud (NGC)**, coordinated with **NIC**.

### 0.1 Before you write a single line of code

Do these in order, and report back after each:

1. **Fetch and read the reference site.** Crawl `https://eacpm.gov.in/` (respect robots.txt, use a polite crawl delay). Produce `audit/CURRENT_SITE_AUDIT.md` containing:
   - Full sitemap with URL → title → content type → last-updated.
   - Complete inventory of every PDF (working papers, reports, monographs, occasional papers, partner reports), with title, author(s), date, size, and the URL. This inventory becomes the migration manifest — **no-data-loss migration is a contractual obligation.**
   - Inventory of notices, tenders, vacancy circulars, media items, gallery images, team profiles.
   - Lighthouse + axe-core baseline scores (performance, a11y, SEO) so improvement is measurable.
   - A blunt list of what is broken: navigation, IA, discoverability, mobile behaviour, contrast, heading structure, PDF accessibility.
2. **Install and read the design system.**
   ```bash
   npm view ux4g-web-components            # confirm real name, latest version, exports
   npm view ux4g-skill
   npm i ux4g-web-components
   npm i -D ux4g-skill                     # or install per its own README instructions
   ```
   Then **read the skill's `SKILL.md` and every reference file it ships** before designing anything. If either package name resolves differently on the registry, stop and tell me — do not silently substitute a lookalike package.
   Also read the live docs: `https://www.ux4g.gov.in/` (Design System 3.0 — 77 components across React, Angular and Web Components, WCAG 2.1 AA), `https://www.ux4g.gov.in/designsystem/documentation`, and the component/foundation pages. Record what you learn in `docs/UX4G_NOTES.md` (component list, tag names, props/slots, token names, theming hooks, JS dependencies).
3. **Write the project brain files:** `CLAUDE.md` (working agreement + commands + guardrails), `PRODUCT.md` (audiences, tone, anti-references, strategic principles), `DESIGN.md` (tokens actually resolved from UX4G, type scale, elevation, motion rules). If the `impeccable` / `frontend-design` skill is available in this environment, use it — register for the public-facing pages is **brand**, register for the dashboard and admin is **product**.
4. **Produce `PLAN.md`** — milestone plan mapped to Section 16, with per-page acceptance criteria.
5. **Ask me the questions in Section 18.** Do not guess on those.

### 0.2 Working style

- Plan → confirm → build in continuous passes. Small, reviewable commits with conventional messages.
- Use subagents for parallelisable research (site crawl, UX4G component catalogue, GIGW checklist extraction, dataset schema design).
- Use a browser automation MCP (Playwright/Chrome) to visually verify every page at 360px, 768px, 1280px, 1920px, in light and dark mode, in English and Hindi, before you call anything done.
- Every PR-sized chunk must pass: typecheck, lint, unit tests, axe-core a11y scan, Lighthouse budget check.

---

## 1. The strategic brief — why this is not a normal government microsite

The existing site is a static noticeboard for an advisory body. The new site has **two jobs**, and both must be served without either one damaging the other:

**Job 1 — The Council's institutional home.** Authoritative, precise, archival. Publications, working papers, reports, members, notices, media. This is the compliance-bound, GIGW-3.0 backbone described in the DIC proposal.

**Job 2 — India's economic story, told to the world.** The site must work as a credible, high-signal *showcase and marketing surface for the Indian economy* aimed at:

| Audience | What they came for | What must be one click away |
|---|---|---|
| **Global industry / FDI decision-makers** | Is India a sound place to commit capital for 10 years? | Macro dashboard, sector deep-dives, policy direction, reform timeline, links to Invest India / National Single Window / GIFT City / PLI schemes |
| **World economists & institutions (IMF, World Bank, WEF, OECD, BIS, ADB)** | Serious analysis they can cite | Full-text papers, methodology, datasets, DOIs/permalinks, citation export, author profiles |
| **Economic researchers & PhD candidates** | Replicable data and papers | Downloadable datasets, data dictionaries, working paper series with stable URLs, search that actually finds text inside PDFs |
| **Finance & economics colleges, faculty** | Teachable material | Curated collections, explainers, chart packs licensed for classroom reuse, syllabus-friendly reading lists |
| **Economics students (India + abroad)** | An entry ramp | Visual explainers, the India story timeline, glossary, "start here" paths, internships / "Work at EAC-PM" |
| **International forums (WEF Davos, G20, IMF-WB meetings)** | Shareable, quotable, embeddable | Chart embeds, press kit, member bios and speeches, media coverage, OG-optimised social cards |
| **Domestic policy audience & citizens** | What this Council does for me | Plain-language summaries, Hindi parity, inclusion story, contact and feedback |

**Design consequence:** the homepage cannot be a link farm. It must open with a *point of view* — India's economic trajectory — and route each of the seven audiences to their lane within one scroll and one click.

**Tone guardrails.** Confident, evidence-first, never boosterish. Every claim carries a source and a date. This is an advisory council, not an ad agency: the persuasion comes from the quality of the data and the clarity of its presentation, not from adjectives. Never present the site as offering investment advice — it presents evidence; investors decide.

---

## 2. Non-negotiable constraints

1. **UX4G Design System 3.0 is the only visual vocabulary.** Components, colour, spacing, radius, elevation, and type all come from UX4G tokens/components. No hardcoded hex, no arbitrary px spacing, no third-party UI kit (no Bootstrap themes, no MUI, no shadcn defaults) for anything that UX4G already provides. If UX4G lacks a component you need (e.g. a chart), build it **on UX4G tokens** and document it in `DESIGN.md` as an extension.
2. **Typography: Noto Sans** (and **Noto Sans Devanagari** for Hindi), self-hosted, subset, `font-display: swap`. No Inter/Roboto/system fallback creep.
3. **WCAG 2.1 AA minimum**, aiming AAA on body text contrast. Keyboard-complete. Screen-reader tested (NVDA + VoiceOver). Skip links, landmark regions, visible focus rings, `prefers-reduced-motion` honoured everywhere.
4. **GIGW 3.0 compliance** — treat as a hard gate, see Section 13.
5. **Bilingual (English + Hindi) with full content parity**, `/en/` and `/hi/` routes, `lang`/`hreflang` correct, language toggle preserving route. Machine translation may draft, but every Hindi string ships flagged for human review; never publish unreviewed MT on policy content.
6. **Mobile-first.** A large share of Indian traffic is a mid-range Android on a congested network. Performance budget in Section 14 is a gate, not an aspiration.
7. **NGC hosting, NIC coordination.** Assume conservative infrastructure: no exotic managed services, no vendor-locked edge runtime, no third-party CDN for critical assets, no external analytics that ships data offshore. Everything must run from what NIC/NGC will actually provision. Self-host fonts, icons, scripts.
8. **The existing DIC maintenance team must be able to run this after handover.** Optimise for boring, documented, low-magic code. Content editors are not developers — see Section 11.
9. **No data loss on migration**, with a reconciliation report proving old URL → new URL for every asset, plus 301s.
10. **Security:** CSP with no `unsafe-inline`, SRI where external refs are unavoidable, no client-side secrets, sanitised uploads, rate-limited search, STQC/CERT-In audit readiness. Prepare `docs/SECURITY_AUDIT_PACK.md`.

---

## 3. Technology decisions

Propose in `PLAN.md` and confirm with me before locking. Default recommendation:

- **Framework:** Next.js (App Router, TypeScript) in **static-export-first** mode, with a thin Node service only where dynamism is unavoidable (search, dashboard API, analytics counters). Astro is an acceptable alternative if NIC prefers pure static + separate API; argue the case, don't just switch.
- **UX4G integration:** consume `ux4g-web-components` as custom elements; write thin typed React wrappers in `src/components/ux4g/` (`ClientOnly` boundaries where the element needs DOM). Never fork or copy component internals.
- **Content:** file-based (MDX/JSON) in git for editorial content + a **headless CMS** (Strapi or Directus, self-hosted on NGC) for publications, notices, media, and team — because non-developers must publish without a deploy. If NIC will not host a CMS, fall back to a git-backed editor (Decap/Sveltia) and say so loudly in the plan.
- **Database:** PostgreSQL. `pg_trgm` + `tsvector` for search; a dedicated `publication_text` table for extracted PDF text.
- **Search:** Postgres FTS first; **Typesense or Meilisearch self-hosted** if fuzzy quality demands it. Prebuild a static index (Orama/Lunr) as a graceful-degradation fallback so search still works if the API is down.
- **Charts:** Apache ECharts (permissive licence, strong a11y hooks, SSR-able) themed **entirely from UX4G tokens**. Every chart ships with an accessible `<table>` equivalent and a CSV download.
- **PDF pipeline:** `pdfjs`/`pdftotext` for text extraction, plus OCR (`tesseract`) fallback for scanned legacy documents. Store extracted text, page numbers, and a snippet index.
- **Testing:** Vitest/Jest unit, Playwright e2e + visual regression, `@axe-core/playwright` a11y, Lighthouse CI budgets in the pipeline.
- **i18n:** `next-intl` or equivalent; all copy in message catalogues, zero hardcoded user-facing strings.

---

## 4. Information architecture

Primary navigation (from the approved scope, **plus** the new outward-facing sections):

```
Home
About EAC-PM
  ├─ About EAC-PM (organisational only)
  ├─ Message from the Chairperson
  ├─ Team                      (categorised, clickable profiles: photo, name, designation, bio, publications by that member)
  └─ Previous Chairpersons
Publications
  ├─ All
  ├─ Working Papers            (includes Monographs)
  ├─ Reports                   (includes Partner Reports, Occasional Papers)
  └─ Archives                  (> 5 years old)
Data & Dashboards              ← NEW, flagship
  ├─ India at a Glance         (macro dashboard)
  ├─ Paper Datasets            (interactive dataset per data-heavy publication)
  └─ Download Centre           (CSV/XLSX + data dictionaries)
The India Story                ← NEW, the narrative spine (Section 7)
  ├─ From Sanskrit to Silicon  (economic-thought timeline)
  ├─ Ideas India Gave the World
  ├─ Digital Public Infrastructure
  └─ The Last-Mile Ledger      (inclusion, Section 8)
For You                        ← NEW, audience router (can live as a hub page, not necessarily a nav item)
  ├─ Investors & Industry
  ├─ Researchers & Academia
  ├─ Students & Educators
  └─ Media & Global Forums
Media and Events
  ├─ Articles by EAC-PM Members
  ├─ EAC-PM in News
  └─ Gallery
Notices
  ├─ Tenders
  ├─ Vacancy Circulars
  ├─ Work at EAC-PM
  └─ Other Notices
What's New
Contact Us
```

**IA rules:**
- Maximum 7 top-level items on desktop; collapse "The India Story" and "For You" into a mega-menu section if it exceeds that. Test the label wording with me before finalising.
- Every page ≤ 3 clicks from home. Every publication ≤ 2.
- Breadcrumbs on all inner pages. Persistent, permalinked URLs — `/publications/working-papers/{year}/{slug}`. Old URLs 301 to new.
- **Do not orphan the old "News" and "Reports" labels** — 301 `news → media-and-events`, `reports → publications`.

---

## 5. Page-by-page build specification

### 5.1 Home
Sequence, top to bottom:
1. **GoI-compliant header** — Emblem of India, "Government of India | भारत सरकार", NITI Aayog attribution, accessibility toolbar (font size A- A A+, high-contrast toggle, screen-reader access link), language switch, search entry.
2. **Hero with a thesis, not a slideshow.** One statement about where the Indian economy is and where it's going, backed by 3–4 live headline indicators (GDP growth, inflation, UPI transaction volume, digital-payments/DBT reach — final list to be confirmed). Each figure shows **source + period + last-updated**, and links to its dashboard. No stock photography of handshakes. Consider an abstract, token-coloured data-driven visual (e.g. an animated sparkline field or a subtle India choropleth) that degrades to a static image with reduced motion.
3. **Latest thinking** — 3 featured publications with cover, one-line takeaway, read time, download count.
4. **The India Story teaser** — horizontally scannable timeline strip (Arthashastra → zero/decimal → Indian Ocean trade → 1991 → India Stack → AI) linking into the full narrative.
5. **Audience router** — four cards: Investors & Industry, Researchers, Students & Educators, Media & Forums.
6. **Data & Dashboards teaser** — one live chart, real, interactive, not a screenshot.
7. **Media and Events** (replacing "News") + social feeds (X/Twitter, LinkedIn, Facebook) via **privacy-safe, lazy, click-to-load embeds** — no third-party scripts on first load.
8. **Notices strip** — latest tenders/vacancies, linking to the Notices section (all notices migrate off the homepage).
9. **What's New** — auto-populated from newest/updated content.
10. **Footer** — rationalised: no duplicate links, structured contact block with postal address, social links, mandatory GIGW links (Website Policies, Terms, Privacy, Copyright, Hyperlinking, Accessibility Statement, Help, Sitemap, Feedback, RTI, Archive Policy), **visitor counter**, last-updated stamp, "Content owned and maintained by EAC-PM", "Designed & developed by Digital India Corporation", STQC/CERT-In audit line, Digital India / NIC / NGC marks as required.

Remove entirely: redundant homepage blocks, duplicate right-panel elements, gallery/archive links from the right panel.

### 5.2 About EAC-PM
- About = organisational information only (mandate, constitution under NITI Aayog, functions, history).
- **Message from the Chairperson** — new page, portrait, signed message, optional short video with captions and transcript.
- **Team** — categorised (Chairperson, Members, Part-time Members, Officials, Research Staff). Card grid → profile page with photo, designation, bio, areas of focus, publications authored, media articles, and a stable `/team/{slug}` URL.
- **Previous Chairpersons** — new page, chronological, with tenure and legacy note.

### 5.3 Publications (the workhorse)
- Consolidation: Monographs / Occasional Papers → **Reports**; Partner Reports → **Reports**. Order: **All → Working Papers → Reports → Archives**.
- **List view:** faceted filters (type, year, author, theme/sector, language, data-availability flag), sort (newest, most downloaded, most viewed, A–Z), grid/list toggle, results count, sticky filter bar on mobile.
- **Publication detail page:** title, authors (linked to profiles), abstract, publication date, series/number, DOI or permalink, keywords, PDF viewer (accessible, with text layer), download button, **view + download counters**, cite-as block (APA/Chicago/BibTeX copy buttons), share, related publications, "Explore the data" button when a dataset exists, and JSON-LD `ScholarlyArticle` markup.
- **Archives:** everything older than 5 years, same facets, clearly labelled as archived with the archival policy linked.
- **Fuzzy full-text search across all PDFs** — see Section 10.
- Analytics: server-side view/download counting, bot-filtered, displayed publicly and exportable for EAC-PM.

### 5.4 Data & Dashboards (flagship — Section 9)

### 5.5 The India Story (Section 7) and The Last-Mile Ledger (Section 8)

### 5.6 Media and Events
Unified section with three sub-sections — **Articles by EAC-PM Members**, **EAC-PM in News**, **Gallery** — with month/year filters, source attribution and outbound links, embedded social content where licensed, and auto-archiving of items older than 5 years into a browsable archive.

### 5.7 Notices
Tenders, Vacancy Circulars, Work at EAC-PM, Other Notices. Table + card responsive pattern, publish/close dates, status badges (Open/Closing soon/Closed), attachment list, e-mail/RSS subscription option. All homepage notices migrate here.

### 5.8 What's New
Auto-populated feed of newly added and recently updated content across all sections, with type filters and an RSS/Atom feed. Driven by content timestamps, not manual curation.

### 5.9 Contact Us
Primary nav item. Postal address at the top, then phone/email/office hours, an accessible map (self-hosted tiles or a click-to-load embed — no auto-loading third-party map), a feedback form with validation and confirmation, RTI and grievance officer details.

### 5.10 Global elements
Right panel and footer rationalised (no duplicates, no gallery/archive links in the right panel). Search available from every page. 404 and 500 pages that route users somewhere useful. Print stylesheet for publications.

---

## 6. Visual direction

The brief asks for "modern with a fresh look that makes the user stay and read". Within UX4G's constraints, that means:

- **Editorial, not portal.** Think a research institution's journal — generous measure (65–75ch), strong vertical rhythm, real hierarchy, restraint with boxes and borders. Whitespace is the primary luxury signal.
- **Data as decoration.** The visual interest comes from charts, timelines and numerals — not gradients and glassmorphism. Large numerals in Display styles, sparklines inline in text, small multiples.
- **A disciplined accent system.** Use UX4G brand tokens as the spine, with a small semantic set for data categories. Never encode meaning in colour alone — always pair with label, pattern or shape.
- **Motion with intent.** Scroll-linked reveals on the India Story timeline, number count-ups on first view, chart transitions on filter change. All under 300ms, all easing from UX4G, all disabled under `prefers-reduced-motion`. No parallax, no auto-playing carousels, no scroll-jacking.
- **Dark mode** using UX4G's light/dark colour modes, respecting `prefers-color-scheme` with a manual override that persists.
- **Imagery** — real photographs of Council events, India's economic life (ports, factories floors, markets, labs, village commerce, women SHG members), never generic stock. All images need alt text, AVIF/WebP, correct aspect-ratio boxes to prevent CLS.
- **Anti-references** (say what we are not): the current EAC-PM site; template-driven department portals with marquee tickers, clip-art icons and five competing typefaces; and, on the other side, startup-landing-page maximalism.
- Reference points for *structure and craft only* (never for colour, type or copied visuals): eSankhyiki (MoSPI), IMF World Economic Outlook pages, Our World in Data, RBI DBIE, World Bank Data. **Structure may be studied; visuals come from UX4G tokens.**

---

## 7. "The India Story" — from Sanskrit to LLMs

A flagship narrative section that positions India as a continuous, 3,000-year contributor to economic thought and practice. Built as a **scroll-driven, chaptered longform page** with an accompanying interactive timeline, deep-linkable to each milestone (`/india-story#arthashastra`).

**Suggested chapter arc** (verify every claim; see the data-integrity rule below):

1. **Foundations of statecraft & political economy** — Kautilya's *Arthashastra*: taxation, treasury, trade regulation, price and famine policy. Indus Valley standardised weights, measures and seals as an early trade-standards regime.
2. **The mathematics that finance runs on** — the decimal place-value system, the concept and rules of zero (Brahmagupta, 628 CE), the Bakhshali manuscript, Aryabhata and Bhaskara; their transmission via Arabic scholarship into European commerce and, ultimately, into computation itself. Frame precisely: this is the arithmetic substrate of modern accounting, interest, and computing.
3. **Trade and the pre-modern world economy** — Indian Ocean trade networks, textiles, spices, steel; India's estimated share of world output in the pre-industrial era (cite the Maddison Project explicitly as an *estimate*, with the methodological caveat stated on the page — do not present it as a precise official figure).
4. **Disruption and rebuilding** — the colonial period's effect on Indian industry, and the post-1947 project of building an economy: planning, institution-building, Green Revolution, Operation Flood. Handle this chapter factually and soberly, citing peer-reviewed economic history; avoid polemic.
5. **The 1991 inflection** — liberalisation, and what three decades of compounding did.
6. **Services, software and the world's back office → front office** — the IT services era, Global Capability Centres, engineering talent.
7. **Digital Public Infrastructure — India's most exported idea** — Aadhaar, UPI, DigiLocker, CoWIN, Account Aggregator, ONDC, GSTN, FASTag, e-NAM, Bhashini, and the India Stack model of population-scale, interoperable, publicly-governed rails; DPI's adoption abroad and its place in India's G20 presidency agenda.
8. **The intelligence era** — IndiaAI Mission, Bhashini and Indic-language models, semiconductor and electronics manufacturing missions, the return of Sanskrit-adjacent computational linguistics into LLM tokenisation and multilingual NLP for 22 scheduled languages. Close the loop the brief asks for: **Sanskrit → zero → double-entry-ready arithmetic → digital rails → LLMs.**
9. **What comes next** — the Council's own forward-looking papers, linked.

**Interaction design:** a horizontal timeline rail (sticky on desktop, swipeable on mobile) with era markers; each chapter pins a visual (map, chart, artefact image, or animated diagram) while the prose scrolls; a "jump to era" control; an "evidence" drawer on each chapter listing sources; and a "share this milestone" action producing a proper OG card.

**Data-integrity rule — this is absolute.** Do **not** invent, estimate or "reasonably approximate" any statistic, date, quotation or attribution. Every number on this page comes from an official or peer-reviewed source (MoSPI, RBI, NPCI, UIDAI, PIB, Ministry of Finance, IMF WEO, World Bank, UNCTAD, Maddison Project, or an EAC-PM publication), and renders with source, period and retrieval date. Where you cannot find a verified figure, insert an explicit `{{ FACT-CHECK REQUIRED: description }}` placeholder and list it in `content/FACTCHECK_QUEUE.md` for EAC-PM sign-off. A wrong number on a Government of India economic site is a far worse outcome than a blank one. Historical-share-of-GDP figures in particular are contested estimates and must be labelled as such.

---

## 8. "The Last-Mile Ledger" — inclusion from the capital to the last village

A companion section showing how India built economic delivery that reaches every citizen. Structure it as an interactive "one rupee's journey" plus an evidence dashboard.

Content pillars (all figures sourced and dated, same rule as Section 7):
- **JAM trinity** — Jan Dhan accounts, Aadhaar, mobile penetration as the identity-payment-connectivity base layer.
- **Direct Benefit Transfer** — scheme coverage, leakage reduction, transfer volumes; PM-Kisan, PMGKAY, MGNREGS, LPG subsidy.
- **UPI everywhere** — from metro retail to village kirana and street vendors (PM SVANidhi), feature-phone access (UPI123Pay), offline modes, and cross-border UPI acceptance.
- **Credit and markets for the small** — ONDC for small sellers, OCEN/account aggregator-based cash-flow lending, TReDS for MSME receivables, e-NAM for farmers, Mudra.
- **Services delivered** — Ayushman Bharat, e-Shram, DigiLocker credentials, CoWIN at scale, Common Service Centres, BharatNet and rural broadband.
- **Who it reached** — gender, rural/urban, and state-wise disaggregation wherever official data allows; be honest about gaps and remaining exclusion. Credibility with IMF/WEF-grade readers depends on the site acknowledging what is still unsolved.

**Signature interactive:** a "from Delhi to the last village" scroll — a map or schematic that follows one benefit transfer from Union budget line → treasury → NPCI rails → bank/BC → beneficiary's phone in a village, with real timings and real cost-per-transaction figures where published. Fully narrated as text for screen readers; the map is an enhancement, never the only way to get the information.

---

## 9. Data Dashboard module

A core feature, drawing on **eSankhyiki (MoSPI)** in *pattern and structure*, with all visuals from UX4G tokens. Reference dataset shape: `SampleData_&_Visualizations.xlsx` shared with DIC and NIC — parse it and derive the schema from it.

**Two tiers:**

**A. "India at a Glance" macro dashboard** — curated indicators (growth, inflation, fiscal, external sector, employment, digital payments, energy), each with source, frequency, last-updated, revision note, time-series chart, and a downloadable series. Nothing auto-scraped without a documented, authorised source.

**B. Per-publication dataset explorer** — for **every data-heavy paper**, the underlying dataset is uploadable and explorable on the site:
- Editor uploads CSV/XLSX + a **data dictionary** (required); the system validates schema, types, units, and null handling, and rejects with clear errors.
- Auto-generated explorer: filter across multiple identifiers (state/district, sector, year/quarter, gender, urban-rural, or whatever dimensions the file declares), cross-filtering, drill-down.
- Chart types: line, bar, stacked bar, area, scatter, choropleth (India state/district maps with correct official boundaries — **use the official boundary files; do not use a third-party India map with incorrect borders**), small multiples, distribution.
- Every view: table equivalent, CSV/XLSX export of the current filtered slice, "copy citation", permalink encoding the exact filter state, and an embed code for external sites (with attribution baked in).
- Accessibility: keyboard-operable filters and chart focus, `aria` descriptions summarising each chart's trend in words, colour-blind-safe palettes, no colour-only encoding.
- Performance: server-side aggregation for large files, paginated tables, lazy-loaded chart bundles.

**Governance:** dataset versioning with changelog, a "provisional / revised / final" status badge, and an explicit licence statement (recommend Government Open Data Licence – India, subject to EAC-PM approval).

---

## 10. Search

Three layers, all under one search box:

1. **Site search** — pages, publications, notices, media, team, dashboards.
2. **Publication metadata search** — title, author, abstract, keywords, year, series.
3. **Fuzzy full-text search inside every uploaded PDF** (working papers and publications), as required by the brief. Build an ingestion pipeline: on upload → extract text (OCR fallback for scans) → normalise → chunk with page numbers → index. Results show the **matched snippet with the term highlighted and the page number**, deep-linking into the PDF viewer at that page.

Requirements: typo tolerance, Hindi + English query support (including transliterated queries), stemming, phrase and boolean operators, synonyms dictionary for economic terms (GDP/GVA, CPI/WPI/inflation, FDI/foreign direct investment), instant suggestions, empty-state with useful alternatives, filters carried into results, and a search-analytics log so EAC-PM can see what people fail to find. Search must be usable by keyboard alone and announce result counts to screen readers.

---

## 11. Content model and editorial experience

Model these entities with schemas checked into `content/schemas/`: `Publication`, `PublicationSeries`, `Dataset`, `Author/Member`, `Chairperson`, `Notice`, `MediaItem`, `Event`, `GalleryAlbum`, `Page`, `StoryChapter`, `Indicator`.

Editorial rules the system must enforce:
- Bilingual fields with a "translation pending" state that never blocks English publishing but is visible in the admin.
- Required alt text on images; required data dictionary on datasets; required source+date on any numeric claim in a `StoryChapter` or `Indicator`.
- Publish/unpublish/schedule, draft preview, revision history, and role separation (author / reviewer / publisher).
- Auto-archiving rules: publications and media older than 5 years move to Archives automatically but keep their URLs.
- "What's New" and RSS derive from timestamps — zero manual maintenance.

Ship `docs/CONTENT_EDITOR_GUIDE.md` (with screenshots) and a short training deck for the DIC maintenance team, in English and Hindi.

---

## 12. Migration

- Build `scripts/migrate/` with: crawl → download → normalise metadata → map to schema → import → verify.
- Produce `migration/RECONCILIATION.csv`: every legacy asset, its new location, checksum match, and HTTP status of the redirect.
- 301 map for every changed URL; a catch-all 404 page that suggests the closest match via search.
- Preserve or reconstruct publication dates and author attribution; where the legacy site lacks metadata, flag rather than invent.
- PDF remediation pass: tag headings, add document language and title metadata, verify text layer exists (OCR where it doesn't). Where a legacy PDF cannot be remediated, publish an accessible HTML summary alongside it.

---

## 13. Compliance gate (GIGW 3.0 + accessibility)

Produce `docs/GIGW_COMPLIANCE_MATRIX.md` mapping each GIGW 3.0 guideline to the implementing page/component/test, with pass/fail status. It must cover at least:

- Mandatory pages: Website Policies, Terms & Conditions, Copyright Policy, Hyperlinking Policy, Privacy Policy, Accessibility Statement, Help, Sitemap (HTML + XML), Feedback, Contact, RTI, Archive Policy, Content Review Policy.
- Emblem and identity usage per GoI guidelines; `.gov.in` domain; "Government of India" identification.
- Metadata per MDDS; `last reviewed/updated` on every page; content ownership statement.
- Screen Reader Access page listing available screen readers; accessibility toolbar (text resize, contrast).
- Visitor counter on the homepage.
- No advertisements; no third-party tracking without disclosure and consent.
- Security audit certification workflow (STQC / CERT-In empanelled auditor) and a documented VAPT remediation loop.
- Hindi content parity, and Unicode-only Devanagari (no legacy font hacks).
- WCAG 2.1 AA: automated axe scan clean, plus a **manual** audit report — keyboard traversal, screen-reader narration, zoom to 200% and 400%, focus order, error identification, form labelling.

Compliance is a merge gate: no page ships that fails the matrix.

---

## 14. Performance, SEO and resilience budgets

| Metric | Budget |
|---|---|
| LCP (mobile, 4× CPU throttle, Slow 4G) | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.05 |
| JS shipped, landing pages | ≤ 150KB gzipped |
| JS shipped, dashboard pages | ≤ 350KB gzipped (chart bundle lazy-loaded) |
| Lighthouse Perf / A11y / Best Practices / SEO | ≥ 95 / 100 / ≥ 95 / 100 |
| Fonts | self-hosted, subset, ≤ 2 families, ≤ 4 weights total |

Also: server-rendered/static HTML for all content pages (crawlable without JS), JSON-LD (`GovernmentOrganization`, `ScholarlyArticle`, `Dataset`, `BreadcrumbList`, `FAQPage` where used), OG/Twitter cards auto-generated per publication and per story chapter, XML sitemaps split by type, RSS/Atom feeds, canonical + hreflang pairs, and graceful degradation — the site must remain readable with JavaScript disabled and on a 2G connection.

---

## 15. Governance and factual safety (read twice)

1. **Never fabricate a statistic, quote, date, name, designation, or citation.** Placeholder + `FACTCHECK_QUEUE.md` entry is always the correct fallback.
2. **Never attribute a policy position to EAC-PM, NITI Aayog, or the Government of India** that is not present in a published EAC-PM document you can cite.
3. Member names, designations and bios come only from official sources; when in doubt, leave the field empty and flag it.
4. Maps must use official Government of India boundary depictions. This is a legal requirement, not a preference.
5. The India Story and Last-Mile sections must present evidence, including limitations and unresolved gaps — a credible research institution acknowledges what the data does not yet show. This is what makes the site persuasive to IMF/WEF-grade readers.
6. Nothing on the site constitutes investment advice; include the appropriate disclaimer on investor-facing pages, reviewed by EAC-PM.
7. All third-party content (news logos, photographs, embedded posts, datasets) must be licensed or fair-use with attribution; keep `content/ATTRIBUTIONS.md`.

---

## 16. Milestones (3 months)

**M0 — Week 1: Discovery.** Site audit, asset inventory, UX4G component catalogue, IA proposal, content model, tech decision record, plan sign-off.

**M1 — Weeks 2–3: Foundation.** Repo, CI, design tokens wired from UX4G, component wrappers, layout shell (header/footer/nav/search), i18n scaffolding, theming, a11y test harness, CMS stood up, Storybook of every wrapper.

**M2 — Weeks 4–6: Core site.** Home, About (+ Chairperson message, Team, Previous Chairpersons), Publications list/detail/archives, Notices, Media & Events, What's New, Contact, all mandatory GIGW pages. Migration scripts running against real data.

**M3 — Weeks 7–9: Data & narrative.** Dashboard module (both tiers), dataset ingestion and validator, chart system, PDF full-text search pipeline, The India Story, The Last-Mile Ledger, audience hub pages, embeds and press kit.

**M4 — Weeks 10–11: Hardening.** Full migration + reconciliation, Hindi content pass, accessibility manual audit + fixes, performance tuning to budget, security hardening and VAPT prep, SEO/redirects, load test.

**M5 — Week 12: Handover.** NGC deployment with NIC, runbooks, editor training, DIC maintenance-team walkthrough, compliance matrix sign-off, launch checklist, 2-week stabilisation plan.

Each milestone ends with a demo build, a written status note, and an updated risk register.

---

## 17. Repository conventions

```
/                      PROMPT.md, CLAUDE.md, PLAN.md, PRODUCT.md, DESIGN.md, README.md
/apps/web              Next.js app
/apps/api              search + dashboard + analytics services (if separated)
/packages/ui           UX4G wrappers, charts, layout primitives (Storybook)
/packages/content      schemas, message catalogues, MDX
/audit                 CURRENT_SITE_AUDIT.md, baseline reports
/docs                  UX4G_NOTES.md, GIGW_COMPLIANCE_MATRIX.md, SECURITY_AUDIT_PACK.md,
                       CONTENT_EDITOR_GUIDE.md, ADRs, runbooks
/migration             manifests, RECONCILIATION.csv, redirect map
/scripts               migrate/, ingest-pdf/, ingest-dataset/, a11y/, perf/
/tests                 e2e, visual, a11y, perf budgets
/content               FACTCHECK_QUEUE.md, ATTRIBUTIONS.md
```

Every non-obvious decision gets an ADR in `docs/adr/NNNN-title.md`. Every component gets a Storybook story with a11y notes. Comment sparingly but explain *why*, never *what*.

---

## 18. Ask me these before you start

1. Which **UX4G distribution** should we standardise on — React, Angular, or Web Components — and is `ux4g-web-components` the approved package for our target version of Design System 3.0?
2. What will **NIC/NGC actually provision**: static hosting only, or Node + PostgreSQL + object storage? Can we run a self-hosted CMS and a search service? What is the deployment pipeline into NGC?
3. Is there an approved **English + Hindi content source**, and who signs off Hindi translations?
4. Can I get `SampleData_&_Visualizations.xlsx` and 2–3 representative publication PDFs (including a scanned legacy one) to build the ingestion pipeline against?
5. Who is the **EAC-PM content owner** for fact-checking the India Story and Last-Mile figures, and what is the turnaround expectation?
6. Are there brand assets — Council logo/lockup, official photographs, Chairperson's message, member photos — or do we need placeholders?
7. Confirm the **analytics** approach: self-hosted (Matomo/Umami on NGC) versus none, given no-offshore-data constraints.
8. Confirm **licensing** for published datasets and for chart embeds used by external forums.
9. Is the "For You" audience-router allowed as top-level navigation, or must the primary nav stay exactly as specified in the approved scope?
10. Who is the single point of contact at DIC, and what is the review cadence with EAC-PM and the existing maintenance team?

---

## 19. Definition of done (per page and for launch)

- [ ] Built only from UX4G components/tokens; zero rogue hex, px spacing, or fonts.
- [ ] English and Hindi at parity, verified in both locales.
- [ ] axe-core clean; manual keyboard + screen-reader pass documented.
- [ ] Meets performance budget on a throttled mobile profile.
- [ ] Renders usefully with JS disabled; degrades gracefully offline/slow.
- [ ] Every number carries source + period + last-updated; zero unverified claims.
- [ ] GIGW matrix rows for this page marked pass with evidence.
- [ ] Legacy URLs redirect; content reconciled against the migration manifest.
- [ ] Storybook entry, unit tests, e2e path, visual snapshot.
- [ ] Editor can update the content without a developer, and it's documented.

Build it so that an economist in Geneva, a fund manager in Singapore, a professor in Pune and a student on a ₹8,000 Android phone in Bastar all get the same authoritative site — and all of them stay to read.
