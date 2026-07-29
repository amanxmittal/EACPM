// Articles & notices sourced from the live eacpm.gov.in (titles/authors/outlets are real;
// exact dates come from the CMS/migration — omitted rather than guessed).
export type Article = { title: string; author: string; outlet: string; href: string };
export const articles: Article[] = [
  {
    title: "The manufacturing opportunity",
    author: "Shri Nilesh Shah",
    outlet: "The Indian Express",
    href: "https://eacpm.gov.in/article/the-manufacturing-opportunity-by-nilesh-shah-indian-express/",
  },
  {
    title: "The Seventh Schedule relook",
    author: "Dr. Bibek Debroy",
    outlet: "The Indian Express",
    href: "https://eacpm.gov.in/article/the-seventh-schedule-relook-by-dr-bibek-debroy-published-in-the-indian-express/",
  },
  {
    title: "The difficulty in spending",
    author: "Dr. Neelkanth Mishra",
    outlet: "Business Standard",
    href: "https://eacpm.gov.in/article/the-difficulty-in-spending-by-neelkanth-mishra-published-in-business-standard/",
  },
  {
    title: "Where will India's economic growth settle in the next 2–3 years?",
    author: "Dr. Poonam Gupta",
    outlet: "The Economic Times",
    href: "https://eacpm.gov.in/article/where-will-indias-economic-growth-settle-in-the-next-2-3-years-by-dr-poonam-gupta-published-in-the-economic-times/",
  },
];

// kind is one of the four official Notices categories (Scope of Work §3.6).
export type NoticeKind = "Tender" | "Vacancy Circular" | "Work at EAC-PM" | "Other";
export type Notice = {
  title: string;
  kind: NoticeKind;
  status: "open" | "soon" | "closed";
  /** Display-only deadline text (e.g. "Closes soon"). Illustrative for MVP — NOT parseable. */
  date: string;
  /**
   * Machine-readable publication date, ISO `YYYY-MM-DD`. Drives the Archive tab.
   * Deliberately absent on the MVP rows below: the live site does not expose a
   * reliable publication date for them and a guessed date would silently decide
   * whether a notice is archived. Undated notices stay in Current. Real dates
   * arrive with the CMS/migration — do not backfill by inference.
   */
  published?: string;
  href: string;
};

/** A notice older than this moves out of Current and into Archive. */
export const ARCHIVE_AFTER_YEARS = 5;

/**
 * Note the cutoff is evaluated when this runs — under the static-export-first
 * build (CLAUDE.md §5) that is build time, so a notice crossing the boundary
 * moves at the next rebuild rather than the instant it ages out. Acceptable for
 * a 5-year window; revisit if notices ever need a same-day boundary.
 */
export function isArchived(n: Notice, now: Date = new Date()): boolean {
  if (!n.published) return false;
  const published = Date.parse(n.published);
  if (Number.isNaN(published)) return false;
  const cutoff = new Date(now);
  cutoff.setFullYear(cutoff.getFullYear() - ARCHIVE_AFTER_YEARS);
  return published < cutoff.getTime();
}
export const notices: Notice[] = [
  {
    title: "Vacancy Circular — Consultants & Young Professionals",
    kind: "Vacancy Circular",
    status: "open",
    date: "Closes soon",
    href: "https://eacpm.gov.in/wp-content/uploads/2025/08/Vacancy-Circular.pdf",
  },
  {
    title: "Guidelines for Engagement of Consultancy Services",
    kind: "Other",
    status: "open",
    date: "Active",
    href: "https://eacpm.gov.in/wp-content/uploads/2025/08/New-Consultancy-Guidelines.pdf",
  },
  {
    title: "Call for Young Professionals & Interns (illustrative)",
    kind: "Work at EAC-PM",
    status: "open",
    date: "Rolling basis",
    href: "/notices",
  },
  {
    title: "Empanelment of research agencies (illustrative)",
    kind: "Tender",
    status: "soon",
    date: "Opening soon",
    href: "/notices",
  },
];
