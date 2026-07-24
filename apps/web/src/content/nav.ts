export type NavItem = {
  label: string;
  href: string;
  desc?: string;
  children?: NavItem[];
};

// Primary navigation — matches the approved DIC/EAC-PM Scope of Work §3.1 exactly:
// Home, About EAC-PM, Publications, Media and Events, Notices, What's New, Contact Us.
// "Data & Dashboards" is an agreed addition (SoW §3.11 calls it "a core feature" of the
// site, even though §3.1's nav list predates that requirement being scoped in detail).
export const primaryNav: NavItem[] = [
  {
    label: "About EAC-PM",
    href: "/about",
    children: [
      { label: "About EAC-PM", href: "/about", desc: "Organisational information only" },
      { label: "Message from the Chairperson", href: "/about#chairperson", desc: "A signed message" },
      { label: "Team", href: "/about#team", desc: "Categorised, clickable profiles" },
      { label: "Previous Chairpersons", href: "/about#previous", desc: "Chronological legacy" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    children: [
      { label: "All", href: "/publications", desc: "71 papers & reports" },
      { label: "Working Papers", href: "/publications?type=Working+Paper", desc: "Including Monographs" },
      { label: "Reports", href: "/publications?type=Report", desc: "Including Partner Reports" },
      { label: "Archives", href: "/publications?archive=1", desc: "Older than 5 years" },
    ],
  },
  {
    label: "Data & Dashboards",
    href: "/data",
    children: [
      { label: "India at a Glance", href: "/data", desc: "Macro dashboard" },
      { label: "Paper Datasets", href: "/data#datasets", desc: "Explore data behind papers" },
      { label: "Download Centre", href: "/data#downloads", desc: "CSV / XLSX + dictionaries" },
    ],
  },
  {
    label: "Media and Events",
    href: "/media",
    children: [
      { label: "Articles by EAC-PM Members", href: "/media#articles", desc: "59 bylined articles" },
      { label: "EAC-PM in News", href: "/media#news", desc: "Press coverage" },
      { label: "Gallery", href: "/media#gallery", desc: "Events & photographs" },
    ],
  },
  {
    label: "Notices",
    href: "/notices",
    children: [
      { label: "Tenders", href: "/notices?type=Tender", desc: "Procurement notices" },
      { label: "Vacancy Circulars", href: "/notices?type=Vacancy+Circular", desc: "Open positions" },
      { label: "Work at EAC-PM", href: "/notices?type=Work+at+EAC-PM", desc: "Internships & consultancy" },
      { label: "Other Notices", href: "/notices?type=Other", desc: "Circulars & announcements" },
    ],
  },
  { label: "What's New", href: "/whats-new" },
  { label: "Contact Us", href: "/contact" },
];
