import type { Report } from "@/lib/reports";

// Typographic cover — a cohesive editorial system instead of inconsistent PDF thumbnails.
export function CoverArt({ report }: { report: Report }) {
  return (
    <div className="cover" data-variant={report.type}>
      <span className="cover-mark">EAC·PM</span>
      <span className="cover-type">{report.type}</span>
      <span className="cover-title">{report.title}</span>
    </div>
  );
}
