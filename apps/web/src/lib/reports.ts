import data from "@/content/reports.json";

export type Report = {
  slug: string;
  title: string;
  abstract: string;
  pdfUrl: string;
  coverUrl: string;
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
