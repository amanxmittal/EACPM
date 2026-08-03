import { thumbnailForType, type Report } from "@/lib/reports";
import { Icon } from "@/components/ui/Icon";

// A large bleeding glyph per report type, so every cover reads as "about
// something" at a glance without needing a bespoke (and hard-to-license)
// photo per publication.
const typeGlyph: Record<string, string> = {
  Report: "chart",
  "Working Paper": "book",
  "Occasional Paper": "quote",
  "Partner Report": "users",
};

// Typographic cover — a cohesive editorial system instead of inconsistent PDF thumbnails.
// Reports with a self-hosted `imageUrl` (an actual cover scan) get that instead —
// cropped from the top via object-position so it never stretches/distorts, and
// without the synthetic glyph/label overlay, since the real page already carries
// its own series number, "Working Paper" label and title.
export function CoverArt({ report }: { report: Report }) {
  // Every Working Paper / Report uses its client-supplied thumbnail site-wide,
  // not its own real scan (see chat history) — .cover-thumbnail's
  // object-position keeps the left-anchored text/logo visible regardless of
  // the box's own aspect ratio on whichever page renders it.
  const thumbnail = thumbnailForType(report.type);
  if (thumbnail) {
    return (
      <div className="cover cover-photo cover-thumbnail" data-variant={report.type}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumbnail} alt="" />
      </div>
    );
  }

  if (report.imageUrl) {
    return (
      <div className="cover cover-photo" data-variant={report.type}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={report.imageUrl} alt={`Cover of ${report.title}`} />
      </div>
    );
  }

  return (
    <div className="cover" data-variant={report.type}>
      <Icon name={typeGlyph[report.type] ?? "landmark"} className="cover-glyph" aria-hidden="true" />
      <span className="cover-mark">EAC·PM</span>
      <span className="cover-type">{report.type}</span>
      <span className="cover-title">{report.title}</span>
    </div>
  );
}
