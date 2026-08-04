import type { Metadata } from "next";
import { reports, isArchived as isReportArchived } from "@/lib/reports";
import { notices, articles, isArchived as isNoticeArchived, thumbnailForNoticeKind, TENDER_THUMBNAIL, VACANCY_THUMBNAIL, type NoticeKind } from "@/content/media";
import { WhatsNewExplorer, type WhatsNewItem } from "@/components/whats-new/WhatsNewExplorer";

export const metadata: Metadata = {
  title: "What's New",
  description: "Newly added and recently updated content across publications, notices and media.",
};

// thumbnailForNoticeKind() only covers Tender/Vacancy Circular (the other two
// kinds have no dedicated asset) — scoped to this page only, every card gets
// a real (if generic, reused) thumbnail rather than a mix of photos and icons.
// Other pages (the Notices explorer, homepage rail) keep their own icon
// fallback for those kinds untouched.
function whatsNewNoticeImage(kind: NoticeKind): string {
  return thumbnailForNoticeKind(kind) ?? (kind === "Work at EAC-PM" ? VACANCY_THUMBNAIL : TENDER_THUMBNAIL);
}

/**
 * Round-robins across groups (one item from each group per pass) instead of
 * concatenating them — reports.json happens to list all 52 Working Papers
 * before any Report/Partner Report/Occasional Paper, so a plain concat left
 * the first page (and "All"'s first viewport) showing nothing but Working
 * Papers. Deterministic, not random — stays stable across server/client
 * renders and reloads.
 */
function interleave<T>(groups: T[][]): T[] {
  const out: T[] = [];
  const cursors = groups.map(() => 0);
  let remaining = groups.reduce((n, g) => n + g.length, 0);
  while (remaining > 0) {
    for (let g = 0; g < groups.length; g++) {
      if (cursors[g] < groups[g].length) {
        out.push(groups[g][cursors[g]]);
        cursors[g]++;
        remaining--;
      }
    }
  }
  return out;
}

function buildFeed(): WhatsNewItem[] {
  // Grouped by subtype (Working Paper / Report / Partner Report / Occasional
  // Paper / each Notice kind / Media) so the interleave below mixes at the
  // subtype level, not just Publication vs Notice vs Media.
  const pubsByType = new Map<string, WhatsNewItem[]>();
  for (const r of reports) {
    const item: WhatsNewItem = { type: "Publication", report: r, archived: isReportArchived(r) };
    pubsByType.set(r.type, [...(pubsByType.get(r.type) ?? []), item]);
  }

  const notesByKind = new Map<string, WhatsNewItem[]>();
  for (const n of notices) {
    const item: WhatsNewItem = {
      type: "Notice",
      badge: n.kind,
      tagLabel: n.date,
      title: n.title,
      href: n.href,
      external: n.href.startsWith("http"),
      imageUrl: whatsNewNoticeImage(n.kind),
      archived: isNoticeArchived(n),
    };
    notesByKind.set(n.kind, [...(notesByKind.get(n.kind) ?? []), item]);
  }

  const media: WhatsNewItem[] = articles.map((a) => ({
    type: "Media",
    badge: "Article",
    tagLabel: a.outlet,
    title: a.title,
    href: a.href,
    external: true,
    imageUrl: a.imageUrl,
    // Articles carry no publish date yet — never guessed, so they stay Current
    // (see content/media.ts's own isArchived() for the same "undated stays
    // current" rule applied to notices).
    archived: false,
  }));

  // Illustrative ordering — real recency comes from content timestamps once the CMS lands.
  return interleave([...pubsByType.values(), ...notesByKind.values(), media]);
}

export default async function WhatsNewPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const initialType = typeof sp.type === "string" ? sp.type : "All";
  // "New" tracks position in the built feed, not any stored per-item flag —
  // whichever 2 items are newest (i.e. first, since new content is added at
  // the top of its source array — reports[0], notices[0], etc.) always carry
  // it, with nothing to update by hand when something newer replaces them.
  const feed = buildFeed().map((item, i) => ({ ...item, isNew: i < 2 }));

  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="kicker">Newly added &amp; recently updated</span>
          <h1 className="t-h1 balance ux4g-mt-xs">
            What&apos;s New
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
