import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { reports } from "@/lib/reports";
import { notices, articles } from "@/content/media";

export const metadata: Metadata = {
  title: "What's New",
  description: "Newly added and recently updated content across publications, notices and media.",
};

type Feed = "Publication" | "Notice" | "Media";
const kinds: Feed[] = ["Publication", "Notice", "Media"];

type Item = { type: Feed; title: string; meta: string; href: string; external?: boolean };

function buildFeed(): Item[] {
  const pubs: Item[] = reports.slice(0, 8).map((r) => ({
    type: "Publication",
    title: r.title,
    meta: `${r.type} · ${r.year ?? "—"}`,
    href: `/publications/${r.slug}`,
  }));
  const notes: Item[] = notices.map((n) => ({
    type: "Notice",
    title: n.title,
    meta: `${n.kind} · ${n.date}`,
    href: n.href,
    external: n.href.startsWith("http"),
  }));
  const media: Item[] = articles.slice(0, 4).map((a) => ({
    type: "Media",
    title: a.title,
    meta: `${a.author} · ${a.outlet}`,
    href: a.href,
    external: true,
  }));
  // Illustrative ordering — real recency comes from content timestamps once the CMS lands.
  return [...pubs, ...notes, ...media];
}

export default async function WhatsNewPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const activeType = typeof sp.type === "string" ? sp.type : null;
  const feed = buildFeed();
  const filtered = activeType ? feed.filter((i) => i.type === activeType) : feed;

  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="kicker">What&apos;s New</span>
          <h1 className="t-h1 balance ux4g-mt-xs">
            Newly added &amp; recently updated
          </h1>
          <p className="t-lead measure ux4g-mt-s">
            Auto-populated from content across Publications, Notices and Media — zero manual
            curation, with an RSS/Atom feed once the backend lands.
          </p>
          <p className="ux4g-mt-m">
            <span className="flag ux4g-tag-tonal-warning ux4g-tag-s">Illustrative ordering — real timestamps arrive with the CMS</span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="ux4g-container">
          <div className="cluster ux4g-jc-between ux4g-mb-m">
            <div className="filter-chips" role="group" aria-label="Filter by type">
              <Link href="/whats-new" className={`ux4g-choice-chip-md${!activeType ? " active" : ""}`} aria-current={!activeType ? "true" : undefined}>
                All
              </Link>
              {kinds.map((k) => (
                <Link key={k} href={`/whats-new?type=${k}`} className={`ux4g-choice-chip-md${activeType === k ? " active" : ""}`} aria-current={activeType === k ? "true" : undefined}>
                  {k}
                </Link>
              ))}
            </div>
            <a href="#" className="ux4g-btn-outline-primary ux4g-btn-sm">
              <Icon name="rss" size={16} /> RSS
            </a>
          </div>

          {filtered.length ? (
            <ul className="card ux4g-list ux4g-list-default">
              {filtered.map((item) => (
                <li key={item.type + item.title} className="ux4g-list-item">
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="ux4g-list-item-row"
                  >
                    <span className="ux4g-list-item-start">
                      <span className="ux4g-tag-tonal-primary ux4g-tag-s">{item.type}</span>
                      <span>
                        <div style={{ fontWeight: 600 }}>{item.title}</div>
                        <div className="t-micro text-muted">{item.meta}</div>
                      </span>
                    </span>
                    <Icon name={item.external ? "external" : "arrowRight"} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="ux4g-empty-state ux4g-py-2xl ux4g-px-m">
              <span className="ux4g-empty-state-icon">
                <Icon name="spark" size={32} />
              </span>
              <div className="ux4g-empty-state-content">
                <p className="t-h4">Nothing in this category yet</p>
                <p className="text-muted t-small">New items appear here as they are published.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
