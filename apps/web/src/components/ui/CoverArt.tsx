import type { Report } from "@/lib/reports";
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
export function CoverArt({ report }: { report: Report }) {
  return (
    <div className="cover" data-variant={report.type}>
      <Icon name={typeGlyph[report.type] ?? "landmark"} className="cover-glyph" aria-hidden="true" />
      <span className="cover-mark">EAC·PM</span>
      <span className="cover-type">{report.type}</span>
      <span className="cover-title">{report.title}</span>
    </div>
  );
}
