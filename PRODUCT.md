# PRODUCT.md — Audiences, Tone, Anti-references & Strategic Principles

> The "why" and "for whom" behind the EAC-PM revamp. Read with [`CLAUDE.md`](CLAUDE.md) (how we work), [`DESIGN.md`](DESIGN.md) (visual system), [`PLAN.md`](PLAN.md) (delivery).

---

## 1. Two jobs, neither allowed to damage the other

**Job 1 — The Council's institutional home.** Authoritative, precise, archival. Publications, working papers, reports, members, notices, media. The compliance-bound, GIGW-3.0 backbone.

**Job 2 — India's economic story, told to the world.** A credible, high-signal showcase and marketing surface for the Indian economy — evidence-first, never boosterish.

The homepage cannot be a link farm. It **opens with a point of view** — India's economic trajectory — and routes each audience to its lane within *one scroll and one click*.

---

## 2. The seven audiences

| Audience | Came for | Must be one click away | Primary lane |
|---|---|---|---|
| **Global industry / FDI decision-makers** | Is India a sound place to commit capital for 10 years? | Macro dashboard, sector deep-dives, policy direction, reform timeline; links to Invest India / National Single Window / GIFT City / PLI | Investors & Industry |
| **World economists & institutions** (IMF, World Bank, WEF, OECD, BIS, ADB) | Serious analysis they can cite | Full-text papers, methodology, datasets, DOIs/permalinks, citation export, author profiles | Researchers & Academia |
| **Economic researchers & PhD candidates** | Replicable data & papers | Downloadable datasets, data dictionaries, stable working-paper URLs, full-text-in-PDF search | Researchers & Academia |
| **Finance/economics colleges & faculty** | Teachable material | Curated collections, explainers, classroom-licensed chart packs, reading lists | Students & Educators |
| **Economics students (India + abroad)** | An entry ramp | Visual explainers, the India Story timeline, glossary, "start here" paths, internships | Students & Educators |
| **International forums** (Davos, G20, IMF-WB) | Shareable, quotable, embeddable | Chart embeds, press kit, member bios/speeches, media coverage, OG cards | Media & Global Forums |
| **Domestic policy audience & citizens** | What this Council does for me | Plain-language summaries, Hindi parity, inclusion story, contact/feedback | Home / Media & Events |

**Design consequence:** homepage = thesis + live indicators + audience router (four cards) + one real interactive chart + latest thinking + India Story teaser — not a wall of links.

---

## 3. Tone

- **Confident, evidence-first, never boosterish.** Persuasion comes from the quality of the data and the clarity of its presentation — not adjectives. This is an advisory council, not an ad agency.
- **Every claim carries a source and a date.** No exceptions.
- **Acknowledge limitations.** A credible research institution says what the data does *not* yet show — this is precisely what makes the site persuasive to IMF/WEF-grade readers (see the honest-gaps rule in Last-Mile, §7).
- **Never investment advice.** The site presents evidence; investors decide. Investor-facing pages carry the disclaimer (EAC-PM-reviewed).
- **Plain language for citizens; rigour for economists.** The same fact, two reading depths — a one-line takeaway over a methodology drawer, never dumbed down and never gatekept.

### Register split
- **Public-facing pages = brand register** (Home, India Story, Last-Mile, audience hubs, About). Editorial, spacious, a point of view.
- **Dashboard & admin = product register.** Dense, functional, legible, fast. Same tokens, different rhythm.

---

## 4. Strategic principles (the visual thesis — full tokens in [`DESIGN.md`](DESIGN.md))

1. **Editorial, not portal.** Think a research institution's journal: generous measure (65–75ch), strong vertical rhythm, real hierarchy, restraint with boxes and borders. **Whitespace is the primary luxury signal.**
2. **Data as decoration.** Visual interest comes from charts, timelines, and numerals — not gradients or glassmorphism. Large display numerals, inline sparklines, small multiples.
3. **A disciplined accent system.** UX4G brand tokens as the spine; a small semantic set for data categories. **Never encode meaning in colour alone** — always pair with label, pattern, or shape.
4. **Motion with intent.** Scroll-linked reveals on the India Story timeline, number count-ups on first view, chart transitions on filter change. All < 300ms, all UX4G easing, all disabled under `prefers-reduced-motion`. No parallax, no auto-playing carousels, no scroll-jacking.
5. **Credibility through provenance.** Source + period + last-updated is a *design element*, present wherever a number is.

---

## 5. Anti-references (what we are NOT)

- **The current EAC-PM site** — a static noticeboard, duplicated panels, buried publications.
- **Template-driven department portals** with marquee tickers, clip-art icons, five competing typefaces.
- **Startup-landing-page maximalism** — hero gradients, floating 3D, autoplay video, hype copy.

**Reference points for *structure and craft only*** (never for colour, type, or copied visuals — those come from UX4G tokens): eSankhyiki (MoSPI), IMF World Economic Outlook, Our World in Data, RBI DBIE, World Bank Data. Study the information architecture and the discipline of their data presentation; take nothing visual.

---

## 6. The narrative spine — content pillars

### The India Story ("from Sanskrit to LLMs") — a scroll-driven, chaptered longform
Positions India as a continuous ~3,000-year contributor to economic thought and practice, closing the loop **Sanskrit → zero → double-entry-ready arithmetic → digital rails → LLMs**. Chapter arc: statecraft & political economy (Arthashastra, Indus weights) → the mathematics finance runs on (place-value, zero, transmission) → pre-modern trade & world-output share (*labelled as contested estimates*) → disruption & post-1947 rebuilding (sober, peer-reviewed) → the 1991 inflection → services/software era → **Digital Public Infrastructure, India's most exported idea** (Aadhaar, UPI, DigiLocker, ONDC, GSTN…) → the intelligence era (IndiaAI, Bhashini, semiconductors) → what comes next (the Council's forward-looking papers).

### The Last-Mile Ledger — inclusion from the capital to the last village
JAM trinity → Direct Benefit Transfer → UPI everywhere (PM SVANidhi, UPI123Pay, offline, cross-border) → credit & markets for the small (ONDC, OCEN/AA, TReDS, e-NAM, Mudra) → services delivered (Ayushman Bharat, e-Shram, DigiLocker, CoWIN, CSCs, BharatNet) → **who it reached** (gender, rural/urban, state-wise where official data allows — *honest about remaining exclusion*). Signature interactive: "from Delhi to the last village" — one benefit transfer traced budget-line → treasury → NPCI rails → bank/BC → beneficiary's phone, fully narrated in text for screen readers.

**Absolute rule for both:** every number from an official/peer-reviewed source (MoSPI, RBI, NPCI, UIDAI, PIB, MoF, IMF WEO, World Bank, UNCTAD, Maddison Project, or an EAC-PM publication), rendered with source + period + retrieval date. No verified figure → `{{ FACT-CHECK REQUIRED: … }}` + [`content/FACTCHECK_QUEUE.md`](content/FACTCHECK_QUEUE.md).

---

## 7. Governance & factual safety (read twice — these override "make it look finished")

1. **Never fabricate** a statistic, quote, date, name, designation, or citation. Placeholder + FACTCHECK entry is always the correct fallback.
2. **Never attribute a policy position** to EAC-PM / NITI Aayog / GoI that isn't in a citeable published EAC-PM document.
3. **Member names, designations, bios** come only from official sources; when in doubt, leave empty and flag.
4. **Maps** use official GoI boundary depictions — a legal requirement, not a preference.
5. **India Story & Last-Mile present evidence including its limits** — acknowledged gaps are a credibility feature.
6. **Nothing is investment advice** — disclaimer on investor-facing pages, EAC-PM-reviewed.
7. **All third-party content** (news logos, photos, embedded posts, datasets) licensed or fair-use with attribution → [`content/ATTRIBUTIONS.md`](content/ATTRIBUTIONS.md).

---

## 8. What "success" means

Not vanity metrics. The site succeeds when **an economist in Geneva, a fund manager in Singapore, a professor in Pune, and a student on a ₹8,000 Android in Bastar get the same authoritative site — and all of them stay to read.** Concretely: papers are found (full-text search works), figures are trusted (every one sourced), the story is finished (scroll-completion on India Story), and it loads fast enough that none of them leave first (perf budget in [`PLAN.md`](PLAN.md)).

---

## 9. ⏳ Open product decisions (Section 18)

- **Q9 — "For You" audience router as top-level nav?** Product recommendation: keep primary nav ≤7 items; surface the four audience lanes as a prominent **hub page + homepage router cards + mega-menu column**, not necessarily a top-level item. Confirm with EAC-PM whether the approved scope fixes the nav labels.
- **Q3 / Q5 — content & fact-check owners** determine how much of the India Story/Last-Mile ships as live copy vs placeholders at each milestone.
- **Q6 — brand assets** determine whether Team/Chairperson/press-kit pages launch with real or placeholder imagery.
