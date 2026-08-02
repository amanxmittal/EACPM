import type { Metadata } from "next";
import { articles } from "@/content/media";
import { channels } from "@/content/channels";
import { posts } from "@/content/posts";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

const xChannel = channels.find((c) => c.key === "x")!;

// Highlights literal @mentions in a post's text — visual styling only, not
// turned into links, since we don't have a verified URL for each mentioned handle.
function renderPostText(text: string) {
  return text.split(/(@[A-Za-z0-9_]+)/g).map((part, i) =>
    part.startsWith("@") ? (
      <span key={i} className="mention">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export const metadata: Metadata = {
  title: "Media & Events",
  description: "Articles by EAC-PM members, EAC-PM in the news, and the gallery.",
};

// Exported so the homepage's "EAC-PM in news" card reads from this same list —
// the press-coverage section here stays the single source of truth.
export type PressMention = { title: string; href: string; imageUrl?: string };
export const news: PressMention[] = [
  {
    title: "GDP may grow 9–11% in FY22, 7% in FY23: Bibek Debroy",
    href: "https://eacpm.gov.in/news/gdp-may-grow-9-11-in-fy22-7-in-fy23-bibek-debroy/",
    imageUrl: "/img/News/Indian-Economy-to-grow.jpg",
  },
  {
    title: "EAC-PM calls for a unified labour law",
    href: "https://eacpm.gov.in/news/economic-advisory-council-to-the-pm-calls-for-unified-labour-law/",
    imageUrl: "/img/News/Unified-Labour-Laws-EAC-PM.jpg",
  },
  {
    title: "Economy to grow 7–7.5% next fiscal year: EAC-PM",
    href: "https://eacpm.gov.in/news/economy-to-grow-7-7-5-next-fiscal-year-eac-pm/",
    imageUrl: "/img/News/Fiscal%20year.jpg",
  },
  {
    title: "Govt reconstitutes seven-member EAC-PM for a two-year period",
    href: "https://eacpm.gov.in/news/govt-reconstitutes-seven-member-eac-pm-for-two-year-period/",
    imageUrl: "/img/News/7%20%20member%20EAC.jpg",
  },
];

export default function MediaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="eyebrow">Media &amp; Events</span>
          <h1 className="t-h1 balance ux4g-mt-xs">
            Articles, news &amp; the gallery
          </h1>
          <p className="t-lead measure ux4g-mt-s">
            Bylined articles by Council members, press coverage, and photographs from events —
            with source attribution and outbound links.
          </p>
        </div>
      </section>

      <section className="section" id="articles" style={{ scrollMarginTop: "84px" }}>
        <div className="ux4g-container">
          <SectionHeader eyebrow="Articles by members" title="In their own words" />
          <div className="grid ux4g-row">
            {articles.map((a) => (
              <div key={a.href} className="ux4g-col-12 ux4g-col-sm-6">
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="card card-hover ux4g-d-flex ux4g-jc-between ux4g-ai-center ux4g-inline-gap-l">
                  <div>
                    <h3 className="t-h4">{a.title}</h3>
                    <p className="t-micro text-muted ux4g-mt-2xs">
                      {a.author} · {a.outlet}
                    </p>
                  </div>
                  <Icon name="external" size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint" id="news" style={{ scrollMarginTop: "84px" }}>
        <div className="ux4g-container">
          <SectionHeader eyebrow="EAC-PM in news" title="Press coverage" />
          <ul className="card ux4g-list ux4g-list-default">
            {news.map((n) => (
              <li key={n.href} className="ux4g-list-item">
                <a href={n.href} target="_blank" rel="noopener noreferrer" className="ux4g-list-item-row">
                  <span className="ux4g-list-item-start">
                    <span style={{ fontWeight: 600 }}>{n.title}</span>
                  </span>
                  <Icon name="external" size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="gallery" style={{ scrollMarginTop: "84px" }}>
        <div className="ux4g-container">
          <SectionHeader eyebrow="Gallery" title="Events &amp; photographs">
            Albums migrate with alt text and correct aspect ratios; images shown here are
            placeholders in the MVP.
          </SectionHeader>
          <div className="grid ux4g-row">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="ux4g-col-12 ux4g-col-sm-6 ux4g-col-lg-3">
                <div
                  className="card ux4g-d-grid ux4g-place-items-center"
                  style={{ aspectRatio: "4 / 3", background: "linear-gradient(150deg, var(--app-accent-soft), var(--app-bg-subtle))" }}
                >
                  <Icon name="chart" size={22} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posts are real, transcribed verbatim from the source — see content/posts.ts.
          No live feed/embed: CLAUDE.md bars auto-loading third-party scripts. */}
      <section className="connect bleed" id="x-updates" style={{ scrollMarginTop: "84px" }}>
        <div className="ux4g-container">
          <div className="connect-head">
            <div>
              <span className="connect-kicker">On X</span>
              <h2>EAC-PM on X</h2>
              <p>{xChannel.blurb}</p>
            </div>
            <div className="connect-actions">
              {xChannel.href ? (
                <a href={xChannel.href} target="_blank" rel="noopener noreferrer" className="ux4g-btn-primary ux4g-btn-md">
                  <Icon name="external" size={16} /> View the handle
                </a>
              ) : (
                <span className="flag-inline">
                  <span className="d" aria-hidden /> Official handle pending confirmation
                </span>
              )}
            </div>
          </div>

          <div className="connect-grid">
            {posts.map((p) => (
              <div key={p.id} className="connect-card">
                <div className="cc-top">
                  <span className="cc-badge cc-badge-emblem" aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/brand/logo-icon.png" alt="" />
                  </span>
                  <div className="cc-id">
                    <span className="cc-name">{p.author}</span>
                    <span className="cc-platform">{p.handle}</span>
                  </div>
                </div>
                <p className="cc-blurb">{renderPostText(p.text)}</p>
                <div className="cc-foot">
                  {xChannel.href ? (
                    <a href={xChannel.href} target="_blank" rel="noopener noreferrer" className="cc-cta">
                      {xChannel.cta} <Icon name="external" size={14} />
                    </a>
                  ) : (
                    <span className="flag-inline">
                      <span className="d" aria-hidden /> Official handle pending confirmation
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
