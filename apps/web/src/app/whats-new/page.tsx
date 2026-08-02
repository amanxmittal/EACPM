import type { Metadata } from "next";
import { reports, isArchived as isReportArchived } from "@/lib/reports";
import { notices, articles, isArchived as isNoticeArchived } from "@/content/media";
import { WhatsNewExplorer, type WhatsNewItem } from "@/components/whats-new/WhatsNewExplorer";

export const metadata: Metadata = {
  title: "What's New",
  description: "Newly added and recently updated content across publications, notices and media.",
};

function buildFeed(): WhatsNewItem[] {
  const pubs: WhatsNewItem[] = reports.map((r) => ({
    type: "Publication",
    title: r.title,
    meta: `${r.type} · ${r.year ?? "—"}`,
    href: `/publications/${r.slug}`,
    archived: isReportArchived(r),
  }));
  const notes: WhatsNewItem[] = notices.map((n) => ({
    type: "Notice",
    title: n.title,
    meta: `${n.kind} · ${n.date}`,
    href: n.href,
    external: n.href.startsWith("http"),
    archived: isNoticeArchived(n),
  }));
  const media: WhatsNewItem[] = articles.map((a) => ({
    type: "Media",
    title: a.title,
    meta: `${a.author} · ${a.outlet}`,
    href: a.href,
    external: true,
    // Articles carry no publish date yet — never guessed, so they stay Current
    // (see content/media.ts's own isArchived() for the same "undated stays
    // current" rule applied to notices).
    archived: false,
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
  const initialType = typeof sp.type === "string" ? sp.type : "All";
  const feed = buildFeed();

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
          <WhatsNewExplorer items={feed} initialType={initialType} />
        </div>
      </section>
    </>
  );
}
