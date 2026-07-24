# CURRENT_SITE_AUDIT.md — `eacpm.gov.in`

> Audit of the existing EAC-PM website, captured **2026-07-24** for the DIC revamp. Method: polite `curl` crawl of `robots.txt`, `wp-sitemap.xml` + sub-sitemaps, the `/reports/` archive, and sampled detail pages (the WP REST API is disabled — see §2). This file is the **migration manifest backbone**; no-data-loss migration is a contractual obligation.

## 1. Summary of findings (the blunt list)

- **Platform:** WordPress (custom theme), served by `GoIServer` behind a hardened proxy. Strong security headers already present (HSTS, CSP `frame-ancestors 'none'`, `X-Content-Type-Options`, `X-Frame-Options`).
- **Content is thin at the detail level.** Each `reports` detail page is a **stub** — title + a one-paragraph abstract + a featured image, with **no author, no date, and no PDF link** in the page itself. The actual PDFs are linked **only from the `/reports/` archive listing**. Detail pages offer almost no value and no metadata.
- **PDFs are recoverable but metadata is not.** 73 report PDFs are downloadable, but **publication date, author(s), series, and abstract are not exposed** in machine-readable form anywhere we can reach. Reconstructing them reliably needs a **WordPress export / DB access** from the current maintainers (see §7 risk).
- **No real search, no filtering, no facets** on the publications archive — it is one long HTML page linking 73 PDFs.
- **Notices are scattered** (tenders/vacancy PDFs live on the homepage and in `wp-content/uploads`, not in a dedicated section).
- **REST API disabled** (`/wp-json/wp/v2/types` → HTTP 500; no `X-WP-Total`) — good for security, so migration must use sitemaps + HTML + a source export.
- **Two existing "data" pages** — State-level and District-level **Social Progress Index** — are the only dashboard-like surfaces; they anchor the new Data & Dashboards module.
- **Baseline Lighthouse/axe scores: PENDING** — to be captured with tooling in M0/M1 (not runnable from this environment); the new build must beat them on record.

## 2. Technical fingerprint

| Item | Finding |
|---|---|
| CMS | WordPress (custom theme; `wp-content`, `wp-json`, `xmlrpc.php`, `wp-sitemap.xml`) |
| Server | `GoIServer` (HTTP/2), `x-forwarded-host: www.eacpm.gov.in` |
| robots.txt | present but **empty** |
| Sitemap | `wp-sitemap.xml` index → per-type sub-sitemaps (used for this inventory) |
| REST API | **disabled/blocked** (`/wp-json/wp/v2/types` → 500) |
| Security headers | HSTS (preload), CSP `frame-ancestors 'none'`, `X-Frame-Options SAMEORIGIN`, `X-XSS-Protection`, `X-Content-Type-Options nosniff`, `Referrer-Policy no-referrer` |
| Caching | `cache-control: no-cache, must-revalidate, max-age=0` (nothing cached — a performance red flag) |

## 3. Content inventory (counts → new-IA destination)

| Type (WP) | Count | Migrates to (new IA) |
|---|---:|---|
| `page` (static) | 16 | Various (About, Contact, GIGW pages, Gallery, SPI dashboards) |
| `reports` (CPT) + `report_type` taxonomy | 73 | **Publications** (Working Papers / Reports / Archives) |
| `articles` (CPT) | 59 | Media & Events → **Articles by EAC-PM Members** |
| `news` (CPT) | 6 | Media & Events → **EAC-PM in News** |
| `team_member` (CPT) | 15 | About → **Team** (`/team/{slug}`) |
| `users` (authors) | — | Author profiles (link publications ↔ members) |
| **Total content URLs** | **~169** + 73 PDFs | |

### 3.1 `report_type` taxonomy → new consolidation
Existing terms: `working-paper`, `our-reports`, `partner-reports`, `monographs-occasional-papers`.
New order (per brief): **All → Working Papers (incl. Monographs) → Reports (incl. Partner Reports, Occasional Papers) → Archives (>5 yrs)**.

### 3.2 Report PDF manifest (73 PDFs)
Downloadable, HTTP 200; sampled sizes 0.6–2.9MB. **By upload year:** 2019 ×1 · 2022 ×8 · 2023 ×29 · 2024 ×16 · 2025 ×4 · 2026 ×15. Full URL list saved to `migration/reports_pdf_manifest.csv` (working copy). The working-paper series is active (15 already in 2026).

<details><summary>All 73 report titles (decoded)</summary>

A Complex Adaptive System Framework to Regulate Artificial Intelligence · A Secular Democracy in Practice · AGROFORESTRY: MISSING TREES FOR THE FOREST · Abrasions in the Federal System · Addressing Groundwater Depletion Crisis in India · Assessing the National Surveys for its Representativeness · Beekeeping Development Committee Report · Challenges of Solid Waste Management in Urban India · Changes in Durable Goods Ownership in India · Changes in India's Food Consumption and Policy Implications · Competitiveness Roadmap For India@100 · Constituency Size, Composition and the Case for Delimitation · Cultural Heritage · Delivering on the Sustainable Development Goals 2016-2030 · Documenting Traditional Knowledge · Estimating Reduction in Polling Personnel under Simultaneous Elections · Economic Performance of Parliamentary Constituencies UPA(2) vs NDA · Economic impact analysis of Priority Sector Lending · Enumeration of Legislative Powers in India · Examining trends in growth of cities · Examining volume and directions of domestic migration · Exploring Organic and Climate Resilient Agriculture · Fair Compensation and Accountability · Female Labour Force Participation Rate · Financial Inclusion as a Path to Equality · Financial Inclusion in India · Fixing the GST Process · Formalization of Labour Market in India (PLFS & ASUSE 2025) · Foundational Literacy And Numeracy Report · Golden Decade of Infrastructure Development · How To Do Process Reforms: Voluntary Liquidation · How the Pennies Drop · Process Reforms: Case study of IEPFA · Electric Mobility in India · Index on Quality of Life for elderly · India and Global IPR Treaties · India on the move · India's G20 Presidency – Emerging Issues · India's Hidden Urbanisation · India's Tryst with a Circular Economy · Infrastructure Deficit in Land Transport · Making India Self-Reliant · Monuments of National Importance · National Bank For Financing Infrastructure and Development · Need for Franchising Laws in India · Non-Tariff Barriers faced by Indian Exporters · Reforming the Legal Metrology Regime · Reimagining the Care Economy · Relative Economic Performance of Indian States · Report of the Beekeeping Development Committee (Part-II) · Reversing the Gaze · Revisiting slum definition in urban policy · Rise in Tobacco Consumption · Share of Religious Minorities: A Cross-Country Analysis · Smuggling and Counterfeiting · Social Progress Index: States and Districts of India · State Budgets in India · Status of Foundational Literacy & Numeracy · Status of Women in India · The 2023 India Cluster Panorama · The Duck and The Camel: Net Load on the Indian Power Grid · The Great Convergence: Uttarakhand and Himachal Pradesh · The Need for Amending Indian Evidence Act, 1872 · The World in Purchasing Power Parity (since 1992) · Time Spent on Employment-Related Activities · Traditional Water Conservation · Unconditional Women Cash Transfer Programmes (Maharashtra) · Unlocking Rural Property Rights (SVAMITVA) · What is "Urban/Rural" India? · What the Data Cannot Say · Why Commercial Mediation Should be Voluntary · Why India Does Poorly On Global Perception Indices · Why India Needs To Urgently Invest In Its Patent Ecosystem
</details>

### 3.3 Pages (16) → destination
`reports/` (→ Publications) · `about-us/` · `contact-us/` · `whats-new/` · `gallery/` · `archive-data/` · `rti/` · `feedback-form/` · `help/` · `screen-reader-access/` · `website-policy/` · `terms-conditions/` · `web-information-manager/` · **`state-level-social-progress-index/`** + **`district-level-social-progress-index/`** (→ Data & Dashboards) · (home).
**GIGW pages present:** Website Policy, Terms, RTI, Help, Screen Reader Access, Web Information Manager, Feedback, Archive. **Missing / to add:** Copyright Policy, Hyperlinking Policy, Privacy Policy, Accessibility Statement, HTML+XML Sitemap, Content Review Policy.

### 3.4 Team (15), Articles (59), News (6)
- **Team members (15):** Dr S. Mahendra Dev, Shri Rakesh Mohan, Dr Sajjid Z. Chinoy, Dr Neelkanth Mishra, Prof Pulak Ghosh, Nilesh Shah, Prof T.T. Ram Mohan, Shri Sanjeev Sanyal, Dr Shamika Ravi, Sanjay Kumar Mishra, Dr K.V. Raju, Prof Pami Dua, + 3 more (slugs captured). ⚠️ Verify current vs past membership against official sources — do not invent designations.
- **Articles (59)** by members (bylined op-eds in Indian Express, ET, Business Standard, The Week, etc.) — outbound links; capture title, member, outlet, date, URL for the Media section.
- **News (6)** — press coverage items.

## 4. What's broken / weak (drives the redesign)

1. **Publications undiscoverable** — no facets, no search, no metadata, PDFs only on one long archive page; detail pages are empty stubs.
2. **No full-text search** inside PDFs (a brief requirement).
3. **Metadata loss** — dates/authors/series not exposed; risks the no-data-loss obligation.
4. **Notices/tenders/vacancies scattered** on the homepage instead of a section.
5. **No dashboards** beyond two static SPI pages; no interactive data.
6. **Caching disabled**; unknown mobile performance (baseline pending) — likely poor.
7. **Accessibility unverified** — Screen Reader Access page exists, but no evidence of WCAG conformance; to be measured.
8. **No Hindi parity** visible; bilingual requirement unmet.
9. **IA duplication / dead-ends** noted on homepage panels (to detail during page-by-page teardown).

## 5. Redirect map (seed — full map in `migration/`)
`/news/` → `/media-and-events/eac-pm-in-news/` · `/reports/` → `/publications/` · `/reports/{slug}/` → `/publications/{type}/{year}/{slug}/` · `/team/{slug}/` preserved · `/article/{slug}/` → `/media-and-events/articles/{slug}/` · legacy PDF URLs under `/wp-content/uploads/**` preserved or 301'd to stable `/publications/.../{file}.pdf`.

## 6. Still to capture (next crawl pass — parallelisable via subagents)
- Per-PDF metadata (date, author, series, size, page count) + text extractability / OCR-need flag for all 73.
- Full article (59) + news (6) + team (15) field extraction.
- Gallery albums/images; the two SPI dataset structures.
- Notices/tenders/vacancy inventory + close dates.
- Homepage block-by-block teardown; 404 behaviour; Lighthouse + axe baselines.

## 7. Migration risk — read this
Because detail pages carry **no dates/authors** and the **REST API is disabled**, scraping alone will **lose metadata** and cannot guarantee lossless migration. **Strongly recommend obtaining a WordPress export (WXR XML) and/or DB + `wp-content/uploads` from the current maintainers/NIC.** This is the single highest-leverage input for a clean, contractually-compliant migration. See roadblocker Q-A.
