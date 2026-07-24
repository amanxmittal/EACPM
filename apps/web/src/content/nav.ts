export type NavItem = {
  label: string;
  href: string;
  desc?: string;
  children?: NavItem[];
};

// Primary nav kept to 7 items (PROMPT.md §4). "For You" lives as a hub, not a top-level item.
export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About EAC-PM", href: "/about", desc: "Mandate, constitution & functions" },
      { label: "Message from the Chairperson", href: "/about#chairperson", desc: "A signed message" },
      { label: "Team", href: "/about#team", desc: "Members & officials" },
      { label: "Previous Chairpersons", href: "/about#previous", desc: "Chronological legacy" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    children: [
      { label: "All Publications", href: "/publications", desc: "71 papers & reports" },
      { label: "Working Papers", href: "/publications?type=Working+Paper", desc: "Incl. monographs" },
      { label: "Reports", href: "/publications?type=Report", desc: "Incl. partner & occasional" },
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
    label: "The India Story",
    href: "/india-story",
    children: [
      { label: "From Sanskrit to Silicon", href: "/india-story", desc: "3,000 years of economic thought" },
      { label: "Digital Public Infrastructure", href: "/india-story#dpi", desc: "India's most exported idea" },
      { label: "The Last-Mile Ledger", href: "/india-story#last-mile", desc: "Inclusion to the last village" },
    ],
  },
  {
    label: "Media & Events",
    href: "/media",
    children: [
      { label: "Articles by Members", href: "/media#articles", desc: "59 bylined articles" },
      { label: "EAC-PM in News", href: "/media#news", desc: "Press coverage" },
      { label: "Gallery", href: "/media#gallery", desc: "Events & photographs" },
    ],
  },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" },
];

export const audienceLanes: NavItem[] = [
  { label: "Investors & Industry", href: "/for-you/investors", desc: "Is India a sound place to commit capital?" },
  { label: "Researchers & Academia", href: "/for-you/researchers", desc: "Papers, data, methodology, citations." },
  { label: "Students & Educators", href: "/for-you/students", desc: "Explainers, timelines, reading lists." },
  { label: "Media & Global Forums", href: "/for-you/media", desc: "Chart embeds, press kit, bios." },
];
