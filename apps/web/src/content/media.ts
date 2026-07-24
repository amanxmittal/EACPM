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

export type Notice = {
  title: string;
  kind: string;
  status: "open" | "soon" | "closed";
  date: string; // illustrative for MVP
  href: string;
};
export const notices: Notice[] = [
  {
    title: "Vacancy Circular — Consultants & Young Professionals",
    kind: "Vacancy",
    status: "open",
    date: "Closes soon",
    href: "https://eacpm.gov.in/wp-content/uploads/2025/08/Vacancy-Circular.pdf",
  },
  {
    title: "Guidelines for Engagement of Consultancy Services",
    kind: "Notice",
    status: "open",
    date: "Active",
    href: "https://eacpm.gov.in/wp-content/uploads/2025/08/New-Consultancy-Guidelines.pdf",
  },
  {
    title: "Empanelment of research agencies (illustrative)",
    kind: "Tender",
    status: "soon",
    date: "Opening soon",
    href: "/notices",
  },
];
