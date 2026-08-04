import data from "@/content/reports.json";

// Client-supplied thumbnails used for every Working Paper's / Report's cover,
// site-wide — see CoverArt.tsx — instead of each publication's own real scan.
// Shared constants so the homepage carousel (HomePublications.tsx) and
// CoverArt reference the same files rather than each hardcoding the path.
export const WORKING_PAPER_THUMBNAIL = "/img/working-paper-thumbnail-tokenized.png";
export const REPORTS_THUMBNAIL = "/img/Reports%20-%20Thumbnail.png";

/** The site-wide thumbnail for a report's `type`, or undefined for types that
 * still use their own real scan / typographic fallback (see CoverArt.tsx). */
export function thumbnailForType(type: string): string | undefined {
  if (type === "Working Paper" || type === "Occasional Paper") return WORKING_PAPER_THUMBNAIL;
  if (type === "Report" || type === "Partner Report") return REPORTS_THUMBNAIL;
  return undefined;
}

export type Report = {
  slug: string;
  title: string;
  abstract: string;
  pdfUrl: string;
  coverUrl: string;
  /** Self-hosted cover scan, e.g. "/img/Working-paper-1.png" — distinct from
   * `coverUrl` (an external eacpm.gov.in link, not rendered anywhere yet, per
   * CLAUDE.md §7's "no third-party CDN for critical assets"). When present,
   * CoverArt renders this image instead of the typographic placeholder. */
  imageUrl?: string;
  year: number | null;
  type: string;
};

export const reports: Report[] = data as Report[];

export const reportTypes = Array.from(new Set(reports.map((r) => r.type))).sort();
export const reportYears = Array.from(
  new Set(reports.map((r) => r.year).filter((y): y is number => y != null)),
).sort((a, b) => b - a);

export function getReport(slug: string): Report | undefined {
  return reports.find((r) => r.slug === slug);
}

/** A publication older than this moves out of the default list and into Archives —
 * same 5-year cutoff and "undated stays current" rule as content/media.ts's Notices. */
export const ARCHIVE_AFTER_YEARS = 5;

export function isArchived(r: Report, now: Date = new Date()): boolean {
  if (r.year == null) return false;
  return r.year < now.getFullYear() - ARCHIVE_AFTER_YEARS;
}

export function relatedReports(r: Report, n = 3): Report[] {
  return reports.filter((x) => x.slug !== r.slug && x.type === r.type).slice(0, n);
}

// Simple, deterministic "read time" from abstract length — a real value would use full text.
export function readMinutes(r: Report): number {
  return Math.max(4, Math.round(r.abstract.split(/\s+/).length / 40) + 8);
}

// Illustrative view/download counts (Scope of Work §3.4) — deterministic from the slug so
// they're stable across renders, clearly flagged as placeholders. Real counts require
// server-side, bot-filtered tracking (PROMPT.md §5.3), not yet built.
export function illustrativeStats(r: Report): { views: number; downloads: number } {
  let hash = 0;
  for (let i = 0; i < r.slug.length; i++) hash = (hash * 31 + r.slug.charCodeAt(i)) >>> 0;
  const views = 400 + (hash % 3600);
  const downloads = 60 + ((hash >> 3) % 900);
  return { views, downloads };
}
