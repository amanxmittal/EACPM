// Articles & notices sourced from the live eacpm.gov.in (titles/authors/outlets are real;
// exact dates come from the CMS/migration — omitted rather than guessed).
export type Article = { title: string; author: string; outlet: string; href: string; imageUrl?: string };
export const articles: Article[] = [
  {
    title: "The manufacturing opportunity",
    author: "Shri Nilesh Shah",
    outlet: "The Indian Express",
    href: "https://eacpm.gov.in/article/the-manufacturing-opportunity-by-nilesh-shah-indian-express/",
    imageUrl: "/img/Articles/Manufacturing%20Opportunity.jpg",
  },
  {
    title: "The Seventh Schedule relook",
    author: "Dr. Bibek Debroy",
    outlet: "The Indian Express",
    href: "https://eacpm.gov.in/article/the-seventh-schedule-relook-by-dr-bibek-debroy-published-in-the-indian-express/",
    imageUrl: "/img/Articles/The%20seventh%20schedule.jpg",
  },
  {
    title: "The difficulty in spending",
    author: "Dr. Neelkanth Mishra",
    outlet: "Business Standard",
    href: "https://eacpm.gov.in/article/the-difficulty-in-spending-by-neelkanth-mishra-published-in-business-standard/",
    imageUrl: "/img/Articles/Spending.jpg",
  },
  {
    title: "Where will India's economic growth settle in the next 2–3 years?",
    author: "Dr. Poonam Gupta",
    outlet: "The Economic Times",
    href: "https://eacpm.gov.in/article/where-will-indias-economic-growth-settle-in-the-next-2-3-years-by-dr-poonam-gupta-published-in-the-economic-times/",
    imageUrl: "/img/Articles/economy%20growth.jpg",
  },
];

// kind is one of the four official Notices categories (Scope of Work §3.6).
export type NoticeKind = "Tender" | "Vacancy Circular" | "Work at EAC-PM" | "Other";
export type NoticeStatus = "open" | "soon" | "closed";

/**
 * Notice status → UX4G tag classes. Single source of truth so the Notices page
 * and the homepage panel can't drift, and so the status palette comes from
 * UX4G's semantic status tokens rather than hand-picked hex.
 */
export const noticeStatusClass: Record<NoticeStatus, string> = {
  open: "ux4g-tag-tonal-success ux4g-tag-s",
  soon: "ux4g-tag-tonal-warning ux4g-tag-s",
  closed: "ux4g-tag-tonal-neutral ux4g-tag-s",
};

export const noticeStatusLabel: Record<NoticeStatus, string> = {
  open: "Open",
  soon: "Opening soon",
  closed: "Closed",
};

/** Condensed variant for the homepage panel, where the row is tighter. */
export const noticeStatusLabelShort: Record<NoticeStatus, string> = {
  open: "Open",
  soon: "Soon",
  closed: "Closed",
};

export type Notice = {
  title: string;
  kind: NoticeKind;
  status: NoticeStatus;
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

// Client-supplied thumbnails used for every notice of these kinds, site-wide —
// see HomeNotices.tsx — instead of a per-notice imageUrl. Other kinds (Work at
// EAC-PM, Other) keep the neutral icon placeholder.
export const TENDER_THUMBNAIL = "/img/tenders%20thumbnail.png";
export const VACANCY_THUMBNAIL = "/img/Careers%20thumbnail.jpg";
export function thumbnailForNoticeKind(kind: NoticeKind): string | undefined {
  if (kind === "Tender") return TENDER_THUMBNAIL;
  if (kind === "Vacancy Circular") return VACANCY_THUMBNAIL;
  return undefined;
}

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
