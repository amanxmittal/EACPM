import type { Metadata } from "next";
import { articles } from "@/content/media";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Media & Events",
  description: "Articles by EAC-PM members, EAC-PM in the news, and the gallery.",
};

const news = [
  { title: "GDP may grow 9–11% in FY22, 7% in FY23: Bibek Debroy", href: "https://eacpm.gov.in/news/gdp-may-grow-9-11-in-fy22-7-in-fy23-bibek-debroy/" },
  { title: "EAC-PM calls for a unified labour law", href: "https://eacpm.gov.in/news/economic-advisory-council-to-the-pm-calls-for-unified-labour-law/" },
  { title: "Economy to grow 7–7.5% next fiscal year: EAC-PM", href: "https://eacpm.gov.in/news/economy-to-grow-7-7-5-next-fiscal-year-eac-pm/" },
  { title: "Govt reconstitutes seven-member EAC-PM for a two-year period", href: "https://eacpm.gov.in/news/govt-reconstitutes-seven-member-eac-pm-for-two-year-period/" },
];

export default function MediaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="eyebrow">Media &amp; Events</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem" }}>
            Articles, news &amp; the gallery
          </h1>
          <p className="t-lead measure" style={{ marginTop: "0.8rem" }}>
            Bylined articles by Council members, press coverage, and photographs from events —
            with source attribution and outbound links.
          </p>
        </div>
      </section>

      <section className="section" id="articles" style={{ scrollMarginTop: "84px" }}>
        <div className="ux4g-container">
          <SectionHeader eyebrow="Articles by members" title="In their own words" />
          <div className="grid grid-2">
            {articles.map((a) => (
              <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" className="card card-hover" style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
                <div>
                  <h3 className="t-h4">{a.title}</h3>
                  <p className="t-micro text-muted" style={{ marginTop: "0.3rem" }}>
                    {a.author} · {a.outlet}
                  </p>
                </div>
                <Icon name="external" size={18} />
              </a>
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
          <div className="grid grid-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="card"
                style={{ aspectRatio: "4 / 3", background: "linear-gradient(150deg, var(--app-accent-soft), var(--app-bg-subtle))", display: "grid", placeItems: "center" }}
              >
                <Icon name="chart" size={22} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
