import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { CountUp } from "@/components/art/CountUp";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { Sparkline } from "@/components/charts/Sparkline";
import { LineChart } from "@/components/charts/LineChart";
import { reports } from "@/lib/reports";
import { indicators } from "@/content/indicators";
import { articles, notices } from "@/content/media";

const upiLabels = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
const upiPoints = [0.8, 1.3, 2.3, 4.5, 8.7, 12.5, 15.8, 18.4];

const heroQuickLinks = [
  { label: "Publications", href: "/publications" },
  { label: "Data & Dashboards", href: "/data" },
  { label: "Media and Events", href: "/media" },
  { label: "Notices", href: "/notices" },
];

const socialPlatforms = [
  { name: "X (Twitter)", icon: "spark" },
  { name: "LinkedIn", icon: "users" },
  { name: "Facebook", icon: "globe" },
];

export default function Home() {
  const latest = reports.slice(0, 3);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero-stage grain section">
        <div className="container hero-content">
          <div className="hero-grid">
            <div>
              <span className="kicker">The Indian Economy · A standing assessment</span>
              <h1 className="t-display balance" style={{ maxWidth: "16ch", marginTop: "0.9rem" }}>
                The world&apos;s most-watched growth story, told with <span className="text-accent">evidence</span>.
              </h1>
              <p className="t-lead" style={{ marginTop: "1.1rem", maxWidth: "42ch" }}>
                Search the Council&apos;s publications, data and analysis — or jump straight to
                what most people come here for.
              </p>

              <form action="/publications" role="search" aria-label="Search publications and data" className="hero-search" style={{ marginTop: "1.7rem" }}>
                <Icon name="search" size={19} className="text-muted" />
                <input type="search" name="q" placeholder="Search papers, notices, data…" />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>

              <div className="hero-chips" role="group" aria-label="Quick links">
                {heroQuickLinks.map((q) => (
                  <Link key={q.href} href={q.href} className="chip">
                    {q.label}
                  </Link>
                ))}
              </div>

              <Link href="/about" className="hero-start">
                <u>New here? Start with About EAC-PM</u> <Icon name="arrowRight" size={15} />
              </Link>
            </div>

            <Reveal className="spotlight-wrap">
              <div className="spotlight-shadow" aria-hidden />
              <div className="spotlight-card">
                <span className="spotlight-badge">
                  <span className="spotlight-dot" aria-hidden /> Illustrative — pending verification
                </span>
                <span className="spotlight-kicker">Featured indicator</span>
                <div className="spotlight-figure">
                  <span className="spotlight-value">
                    <CountUp value={parseFloat(indicators[0].value)} decimals={(indicators[0].value.split(".")[1] || "").length} />
                  </span>
                  <span className="spotlight-unit">{indicators[0].unit}</span>
                </div>
                <div className="spotlight-row">
                  <span className="spotlight-label">{indicators[0].label}</span>
                  <span className={`trend-${indicators[0].direction}`}>
                    <Sparkline data={indicators[0].spark} width={72} height={26} />
                  </span>
                </div>
                <div className="spotlight-foot">
                  <span className="t-micro text-muted">
                    {indicators[0].source} · {indicators[0].period}
                  </span>
                  <Link href="/data" className="link-arrow t-small">
                    Dashboard <Icon name="arrowRight" size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Latest thinking ---------------- */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Latest thinking" title="Newest working papers & reports" href="/publications">
            Fresh analysis from the Council and its partners — {reports.length} publications and counting.
          </SectionHeader>
          <RevealStagger className="grid grid-3">
            {latest.map((r) => (
              <PublicationCard key={r.slug} report={r} />
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ---------------- Data teaser ---------------- */}
      <section className="section tint">
        <div className="container">
          <SectionHeader eyebrow="Data & dashboards" title="India, in real numbers" href="/data" linkLabel="Open dashboards">
            Every figure carries its source, period and last-updated. Every chart ships with a
            data table and a CSV — no exceptions.
          </SectionHeader>
          <div className="data-panel">
            <div className="cluster" style={{ justifyContent: "space-between" }}>
              <div className="data-legend">
                <span className="legend-item">
                  <span className="legend-swatch" style={{ background: "var(--cat-1)" }} /> UPI transaction volume (bn / month)
                </span>
              </div>
              <span className="flag">Illustrative</span>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <LineChart
                labels={upiLabels}
                series={[{ name: "UPI volume (bn/mo)", color: "var(--cat-1)", points: upiPoints }]}
                ariaSummary="Illustrative UPI monthly transaction volume rising from about 0.8 billion in 2019 to about 18 billion in 2026."
                caption="Illustrative shape only — real series will be sourced from NPCI with period and retrieval date."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Media & Notices ---------------- */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <div>
              <SectionHeader eyebrow="Media and events" title="Articles by members" href="/media" linkLabel="All media" />
              <div className="card">
                {articles.map((a) => (
                  <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" className="row-item">
                    <div className="row-main">
                      <div style={{ fontWeight: 600 }}>{a.title}</div>
                      <div className="t-micro text-muted">
                        {a.author} · {a.outlet}
                      </div>
                    </div>
                    <Icon name="external" size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Notices" title="Tenders & vacancies" href="/notices" linkLabel="All notices" />
              <div className="card">
                {notices.map((n) => (
                  <a key={n.title} href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="row-item">
                    <div className="row-main">
                      <div style={{ fontWeight: 600 }}>{n.title}</div>
                      <div className="t-micro text-muted">
                        {n.kind} · {n.date}
                      </div>
                    </div>
                    <span className={`status status-${n.status === "open" ? "open" : n.status === "soon" ? "soon" : "closed"}`}>
                      {n.status === "open" ? "Open" : n.status === "soon" ? "Opening soon" : "Closed"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Social feeds ---------------- */}
      <section className="section tint">
        <div className="container">
          <SectionHeader eyebrow="Stay connected" title="Follow the Council" />
          <div className="grid grid-3">
            {socialPlatforms.map((p) => (
              <div key={p.name} className="card" style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <span className="audience-ico">
                  <Icon name={p.icon} size={20} />
                </span>
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div className="t-micro text-muted">Feed connects once the official handle is confirmed</div>
                </div>
              </div>
            ))}
          </div>
          <p className="t-micro text-muted" style={{ marginTop: "0.8rem" }}>
            Privacy-safe, click-to-load embeds only — no third-party script runs until you open a
            feed.
          </p>
        </div>
      </section>
    </>
  );
}
