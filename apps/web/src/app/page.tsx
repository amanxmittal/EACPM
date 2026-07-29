import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/art/CountUp";
import { CoverArt } from "@/components/ui/CoverArt";
import { HeroCarousel, type HeroSlide } from "@/components/art/HeroCarousel";
import { AnimatedAreaChart } from "@/components/charts/AnimatedAreaChart";
import { LineChart } from "@/components/charts/LineChart";
import { Sparkline } from "@/components/charts/Sparkline";
import { reports, readMinutes } from "@/lib/reports";
import { indicators } from "@/content/indicators";
import { articles, notices } from "@/content/media";

// Rotating hero backdrop: India's economy across sectors. Real, CC BY-SA photographs,
// self-hosted; credits in content/ATTRIBUTIONS.md and surfaced in the hero.
const heroSlides: HeroSlide[] = [
  { src: "/img/bandra-worli-sealink.jpg", theme: "Infrastructure", place: "Bandra-Worli Sea Link, Mumbai", alt: "The Bandra-Worli Sea Link stretching across the sea at sunset", credit: { name: "Capturedmumbai", href: "https://commons.wikimedia.org/wiki/File:Bandra_worli_sea-link_at_sunset.jpg" } },
  { src: "/img/delhi-metro.jpg", theme: "People & mobility", place: "Delhi Metro", alt: "Commuters boarding a Delhi Metro train at a station platform", credit: { name: "Celestinesucess", href: "https://commons.wikimedia.org/wiki/File:Delhi_Metro_Station_(P1140769).jpg" } },
  { src: "/img/jnpt-port.jpg", theme: "Trade & exports", place: "Jawaharlal Nehru Port, Navi Mumbai", alt: "Gantry cranes loading containers onto a ship at Jawaharlal Nehru Port", credit: { name: "Ccmarathe", href: "https://commons.wikimedia.org/wiki/File:JNPT_Port_container_handling.jpg" } },
];

// Illustrative GDP-growth shape for the indicators band (stylised, not official; flagged).
const heroLabels = ["FY19", "FY20", "FY21", "FY22", "FY23", "FY24", "FY25", "FY26"];
const heroPoints = [6.1, 6.4, 5.2, 7.8, 8.4, 7.4, 6.9, 6.5];

// Illustrative UPI volume for the dashboard preview.
const upiLabels = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
const upiPoints = [0.8, 1.3, 2.3, 4.5, 8.7, 12.5, 15.8, 18.4];

const affiliations = [
  { src: "/brand/NITI-Aayog-logo.png", alt: "NITI Aayog", href: "https://www.niti.gov.in/" },
  { src: "/brand/PMINDIA.png", alt: "Prime Minister of India", href: "https://www.pmindia.gov.in/" },
  { src: "/brand/Cabinet-Secretariat.png", alt: "Cabinet Secretariat", href: "https://cabsec.gov.in/" },
  { src: "/brand/mygov-logo.png", alt: "MyGov", href: "https://www.mygov.in/" },
];

export default function Home() {
  const feature = reports[0];
  const lead = reports[1] ?? reports[0];
  const readingList = reports.slice(2, 7);
  const featureExcerpt = feature.abstract.split(". ").slice(1, 3).join(". ").slice(0, 240);
  const featureQuote = feature.abstract.split(". ")[0];

  const whatsNew = [
    { when: "This week", title: feature.title, note: `${feature.type} · ${feature.year ?? "recent"}`, href: `/publications/${feature.slug}` },
    { when: "This week", title: notices[0].title, note: `${notices[0].kind} · ${notices[0].date}`, href: notices[0].href },
    { when: "Recent", title: lead.title, note: `${lead.type} · ${lead.year ?? "recent"}`, href: `/publications/${lead.slug}` },
    { when: "Recent", title: articles[0].title, note: `${articles[0].author} · ${articles[0].outlet}`, href: articles[0].href },
    { when: "Recent", title: reports[3].title, note: `${reports[3].type} · ${reports[3].year ?? "recent"}`, href: `/publications/${reports[3].slug}` },
  ];

  return (
    <>
      {/* ============ 1 · HERO (cinematic, rotating) ============ */}
      <section className="hero-cine">
        <HeroCarousel slides={heroSlides}>
          <div className="hero-cine-inner">
            <div className="hero-cine-copy hero-cine-entrance">
              <Link href={`/publications/${feature.slug}`} className="hero-badge">
                <span className="pulse" aria-hidden /> New: latest working paper
              </Link>
              <span className="hero-cine-eyebrow">Economic Advisory Council to the Prime Minister</span>
              <h1 className="hero-cine-title">
                India&apos;s growth story, read with <span className="u">evidence</span>.
              </h1>
              <p className="hero-cine-sub">
                The data, working papers and analysis behind the world&apos;s most-watched economy.
                Sourced, dated, and open to everyone.
              </p>
            </div>
          </div>
        </HeroCarousel>
      </section>

      {/* ============ 2 · INDICATORS ============ */}
      <section className="measured">
        <div className="container">
          <div className="measured-grid">
            <div>
              <span className="measured-kicker">Live indicators</span>
              <h2>India, measured in the open</h2>
              <p>
                A standing read on the macro picture. Every figure links to its dataset with source
                and period attached; contested historical estimates are labelled as estimates.
              </p>
              <span className="flag-inline"><span className="d" aria-hidden /> Illustrative, pending verification</span>
              <Reveal className="measured-chart">
                <div className="mc-head">
                  <span className="mc-title">Real GDP growth</span>
                  <span className="mc-sub">Annual, illustrative shape</span>
                </div>
                <AnimatedAreaChart
                  labels={heroLabels}
                  points={heroPoints}
                  color="var(--cat-1)"
                  height={190}
                  yUnit="%"
                  suffix="%"
                  ariaSummary="Illustrative real GDP growth shape across recent financial years, staying between roughly 5 and 8.5 percent."
                />
              </Reveal>
            </div>
            <div className="ind-list">
              {indicators.map((ind) => (
                <div key={ind.key} className={`ind-row ${ind.direction ?? "flat"}`}>
                  <div>
                    <div className="name">{ind.label}</div>
                    <div className="src">{ind.source} · {ind.period}</div>
                  </div>
                  <span className="spark"><Sparkline data={ind.spark} width={88} height={30} /></span>
                  <div className="fig"><CountUp value={parseFloat(ind.value)} decimals={(ind.value.split(".")[1] || "").length} />{ind.unit && <span className="u">{ind.unit}</span>}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3 · FEATURED STORY ============ */}
      <section className="story">
        <div className="container">
          <div className="story-grid">
            <Reveal className="story-cover">
              <span className="story-tag">Featured paper</span>
              <div className="frame">
                <CoverArt report={feature} />
              </div>
            </Reveal>
            <div>
              <span className="story-flag">{feature.type}</span>
              <h2>{feature.title}</h2>
              <p className="story-quote">{featureQuote}.</p>
              <p className="story-dek">{featureExcerpt}.</p>
              <div className="story-meta">
                <div><span className="k">Published</span><span className="v">{feature.year ?? "Recent"}</span></div>
                <div><span className="k">Read time</span><span className="v">{readMinutes(feature)} min</span></div>
                <div><span className="k">Series</span><span className="v">EAC-PM</span></div>
              </div>
              <div className="story-actions">
                <Link href={`/publications/${feature.slug}`} className="btn btn-primary btn-lg">
                  Read the paper <Icon name="arrowRight" size={18} />
                </Link>
                <a href={feature.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                  <Icon name="download" size={18} /> PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4 · EDITORIAL BANNER (photograph) ============ */}
      <section className="banner bleed">
        <div className="bg" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/mumbai-marine-drive.jpg" alt="" loading="lazy" />
        </div>
        <div className="scrim" aria-hidden />
        <div className="container inner">
          <span className="banner-kicker">The stakes</span>
          <h2>A billion people. One economy the world is watching.</h2>
          <p>
            From digital public infrastructure to the mathematics of growth, the choices made here
            reach a fifth of humanity. The Council&apos;s work is to bring evidence to those choices.
          </p>
          <div className="actions">
            <Link href="/publications" className="btn btn-light btn-lg">Read the analysis</Link>
            <Link href="/about" className="btn btn-ondark btn-lg">About the Council</Link>
          </div>
        </div>
        <span className="img-credit">
          Marine Drive, Mumbai ·{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Marine_Drive_of_Mumbai.jpg" target="_blank" rel="noopener noreferrer">BroKholi94 / CC BY-SA 4.0</a>
        </span>
      </section>

      {/* ============ 5 · PUBLICATIONS (magazine) ============ */}
      <section className="pubs">
        <div className="container">
          <div className="pubs-head">
            <h2>The latest thinking</h2>
            <Link href="/publications" className="view-all">All {reports.length} publications <Icon name="arrowRight" size={16} /></Link>
          </div>
          <div className="pubs-grid">
            <Link href={`/publications/${lead.slug}`} className="pub-lead">
              <CoverArt report={lead} />
              <div className="body">
                <span className="badge">{lead.type}</span>
                <h3 style={{ marginTop: "0.6rem" }}>{lead.title}</h3>
                <p>{lead.abstract}</p>
              </div>
            </Link>
            <div className="readlist">
              {readingList.map((r, i) => (
                <Link key={r.slug} href={`/publications/${r.slug}`} className="readrow">
                  <span className="no">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{r.title}</h4>
                    <div className="meta">{r.type} · {r.year ?? "Recent"} · {readMinutes(r)} min read</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6 · DASHBOARDS PROMO ============ */}
      <section className="dashp bleed">
        <div className="container">
          <div className="dashp-grid">
            <div>
              <h2>Data you can open, filter and download</h2>
              <p>
                For every data-heavy paper, an interactive dashboard. Filter across identifiers, read
                the chart, then take the dataset with you.
              </p>
              <div className="points">
                <span className="point"><span className="tick"><Icon name="check" size={14} /></span> Source, period and last-updated on every series</span>
                <span className="point"><span className="tick"><Icon name="check" size={14} /></span> An accessible data table ships with every chart</span>
                <span className="point"><span className="tick"><Icon name="check" size={14} /></span> CSV and XLSX downloads, no login</span>
              </div>
              <div style={{ marginTop: "1.6rem" }}>
                <Link href="/data" className="btn btn-primary btn-lg">Open the dashboards <Icon name="arrowRight" size={18} /></Link>
              </div>
            </div>
            <div className="dashp-preview">
              <div className="bar">
                <span className="legend"><span className="sw" /> UPI transaction volume (bn / month)</span>
                <span className="flag-inline"><span className="d" aria-hidden /> Illustrative</span>
              </div>
              <LineChart
                labels={upiLabels}
                series={[{ name: "UPI volume (bn/mo)", color: "var(--cat-1)", points: upiPoints }]}
                height={260}
                ariaSummary="Illustrative UPI monthly transaction volume rising from about 0.8 billion in 2019 to about 18 billion in 2026."
                caption="Illustrative shape only. The real series will be sourced from NPCI with period and retrieval date."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7 · INSTITUTION (photograph) ============ */}
      <section className="inst">
        <div className="container">
          <div className="inst-grid">
            <Reveal className="inst-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/rashtrapati-bhavan.jpg" alt="Rashtrapati Bhavan, the seat of the Government of India in New Delhi" loading="lazy" />
              <span className="cap">Rashtrapati Bhavan, New Delhi</span>
            </Reveal>
            <div>
              <span className="inst-kicker">About the Council</span>
              <h2>Independent counsel to the Prime Minister on the economy</h2>
              <p>
                The Economic Advisory Council to the Prime Minister is an independent body that advises
                the Prime Minister on economic and related matters. It analyses the economy, flags the
                issues that need attention, and offers evidence-based policy counsel.
              </p>
              <p style={{ marginTop: "1.3rem" }}>
                <Link href="/about" className="view-all">Read about EAC-PM <Icon name="arrowRight" size={16} /></Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8 · NEWSROOM ============ */}
      <section className="news">
        <div className="container">
          <div className="news-grid">
            <div>
              <div className="news-h">
                <h3>Members in the media</h3>
                <Link href="/media" className="view-all">All media <Icon name="arrowRight" size={16} /></Link>
              </div>
              <div className="media-list">
                {articles.map((a) => (
                  <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" className="media-item">
                    <div>
                      <div className="t">{a.title}</div>
                      <div className="byline">{a.author}</div>
                    </div>
                    <span className="outlet">{a.outlet}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="news-h">
                <h3>Notices</h3>
                <Link href="/notices" className="view-all">All notices <Icon name="arrowRight" size={16} /></Link>
              </div>
              <div className="notices-panel">
                {notices.map((n) => (
                  <a key={n.title} href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="notice-line">
                    <div>
                      <div className="nt">{n.title}</div>
                      <div className="nk">{n.kind} · {n.date}</div>
                    </div>
                    <span className={`status status-${n.status === "open" ? "open" : n.status === "soon" ? "soon" : "closed"}`}>
                      {n.status === "open" ? "Open" : n.status === "soon" ? "Soon" : "Closed"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* What's New rail */}
          <div style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <div className="rail-head">
              <h3>What&apos;s new</h3>
              <Link href="/whats-new" className="view-all">Everything recent <Icon name="arrowRight" size={16} /></Link>
            </div>
            <div className="rail">
              {whatsNew.map((w, i) => (
                <a key={i} href={w.href} target={w.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rail-card">
                  <span className="when">{w.when}</span>
                  <span className="rt">{w.title.length > 74 ? w.title.slice(0, 72) + "…" : w.title}</span>
                  <span className="rd">{w.note}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 9 · AFFILIATION + SOCIAL ============ */}
      <section className="affil bleed">
        <div className="container">
          <div className="affil-lead">
            <span className="k">Part of the Government of India</span>
          </div>
          <div className="affil-logos">
            {affiliations.map((a) => (
              <a key={a.alt} href={a.href} target="_blank" rel="noopener noreferrer" aria-label={a.alt}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.src} alt={a.alt} loading="lazy" />
              </a>
            ))}
          </div>
          <div className="affil-social">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="EAC-PM on X"><Icon name="spark" size={18} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="EAC-PM on LinkedIn"><Icon name="users" size={18} /></a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="EAC-PM on Facebook"><Icon name="globe" size={18} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
