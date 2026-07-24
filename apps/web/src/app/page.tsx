import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { Sparkline } from "@/components/charts/Sparkline";
import { LineChart } from "@/components/charts/LineChart";
import { SparklineField } from "@/components/art/SparklineField";
import { CountUp } from "@/components/art/CountUp";
import { reports } from "@/lib/reports";
import { indicators } from "@/content/indicators";
import { chapters } from "@/content/story";
import { audienceLanes } from "@/content/nav";
import { articles, notices } from "@/content/media";

const audienceIcons = ["chart", "book", "users", "globe"];
const audienceHrefs = ["/data", "/publications", "/india-story", "/media"];

const upiLabels = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
const upiPoints = [0.8, 1.3, 2.3, 4.5, 8.7, 12.5, 15.8, 18.4];

export default function Home() {
  const latest = reports.slice(0, 3);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero-stage grain section">
        <div className="hero-field" aria-hidden>
          <SparklineField />
        </div>
        <div className="container hero-content">
          <span className="kicker">The Indian Economy · A standing assessment</span>
          <h1 className="t-display balance" style={{ maxWidth: "20ch", marginTop: "0.9rem" }}>
            The world&apos;s most-watched growth story, told with evidence.
          </h1>
          <hr className="gold-rule" style={{ margin: "1.3rem 0" }} />
          <p className="t-lead measure">
            The Economic Advisory Council to the Prime Minister publishes the data, working
            papers and analysis behind India&apos;s economic trajectory — from the mathematics
            of zero to population-scale digital public infrastructure.
          </p>
          <div className="hero-cta">
            <Link href="/data" className="btn btn-primary btn-lg">
              <Icon name="chart" size={18} /> Explore the data
            </Link>
            <Link href="/publications" className="btn btn-outline btn-lg">
              <Icon name="book" size={18} /> Read the papers
            </Link>
          </div>

          <div className="stat-ribbon">
            {indicators.map((ind) => {
              const num = parseFloat(ind.value);
              const dec = (ind.value.split(".")[1] || "").length;
              return (
                <div className="stat-cell" key={ind.key}>
                  <div className="lbl">
                    {ind.label}
                    <span className={`stat-spark trend-${ind.direction}`}>
                      <Sparkline data={ind.spark} width={56} height={20} />
                    </span>
                  </div>
                  <div className="num">
                    <CountUp value={num} decimals={dec} />
                    {ind.unit && <span className="u">{ind.unit}</span>}
                  </div>
                  <div className="src">
                    {ind.period} · {ind.source}
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ marginTop: "1.1rem" }}>
            <span className="flag">Illustrative data — pending verification</span>
          </p>
        </div>
      </section>

      {/* ---------------- Latest thinking ---------------- */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Latest thinking" title="Newest working papers & reports" href="/publications">
            Fresh analysis from the Council and its partners — {reports.length} publications and counting.
          </SectionHeader>
          <div className="grid grid-3">
            {latest.map((r) => (
              <PublicationCard key={r.slug} report={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- India Story teaser ---------------- */}
      <section className="section tint">
        <div className="container">
          <SectionHeader eyebrow="The India Story" title="From the Arthashastra to LLMs" href="/india-story" linkLabel="Enter the story">
            Three thousand years of economic thought and practice, in one scrollable arc —
            Sanskrit → zero → digital rails → LLMs.
          </SectionHeader>
          <div className="story-rail">
            {chapters.map((c) => (
              <Link key={c.id} href={`/india-story#${c.id}`} className="card card-hover story-chip">
                <span className="story-era">{c.era}</span>
                <h3>{c.title}</h3>
                <p>{c.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Audience router ---------------- */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="For you" title="Whoever you are, your evidence is one click away">
            Investors, economists, researchers, educators, students, the press — each has a lane.
          </SectionHeader>
          <div className="grid grid-4">
            {audienceLanes.map((a, i) => (
              <Link key={a.href} href={audienceHrefs[i]} className="card card-hover audience-card">
                <span className="audience-ico">
                  <Icon name={audienceIcons[i]} size={22} />
                </span>
                <h3>{a.label}</h3>
                <p>{a.desc}</p>
                <span className="link-arrow t-small">
                  Enter <Icon name="arrowRight" size={16} />
                </span>
              </Link>
            ))}
          </div>
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
              <SectionHeader eyebrow="Media & events" title="Articles by members" href="/media" linkLabel="All media" />
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
    </>
  );
}
