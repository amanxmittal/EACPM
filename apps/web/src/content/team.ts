// Member names are real (sourced from the current eacpm.gov.in /team roster).
// Designations are Chairman / Member / Part-time Member, as confirmed for this
// migration. Bios remain unset — those still require an official source and
// render as "pending verification" until the CMS (Q6/Q-A) supplies them. See
// PRODUCT.md §7.
export type Member = {
  slug: string;
  name: string;
  affiliation: string;
  designation?: string; // undefined => shown as "pending verification"
  /** Self-hosted headshot, e.g. "/img/Rakesh-mohan.png". Falls back to the
   * initials-on-gradient avatar when absent. */
  imageUrl?: string;
};

export function initials(name: string): string {
  return name
    .replace(/^(Dr|Shri|Prof|Professor|Mr|Ms|Smt)\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Ordered Chairman → Member → Part-time Member, per the roles given.
export const members: Member[] = [
  { slug: "dr-s-mahendra-dev", name: "Dr. S. Mahendra Dev", affiliation: "EAC-PM", designation: "Chairman", imageUrl: "/img/chairman-NITI.jpeg" },
  { slug: "shri-sanjeev-sanyal", name: "Shri Sanjeev Sanyal", affiliation: "EAC-PM", designation: "Member", imageUrl: "/img/Sanjeev.jpg" },
  { slug: "sanjay-kumar-mishra", name: "Shri Sanjay Kumar Mishra", affiliation: "EAC-PM", designation: "Member", imageUrl: "/img/SKM.jpg" },
  { slug: "dr-shamika-ravi", name: "Dr. Shamika Ravi", affiliation: "EAC-PM", designation: "Member", imageUrl: "/img/Dr.-Shamika-Ravi.jpg" },
  { slug: "shri-rakesh-mohan", name: "Shri Rakesh Mohan", affiliation: "EAC-PM", designation: "Part-time Member", imageUrl: "/img/Rakesh-mohan.png" },
  { slug: "dr-sajjid-z-chinoy", name: "Dr. Sajjid Z. Chinoy", affiliation: "EAC-PM", designation: "Part-time Member", imageUrl: "/img/sajjid.png" },
  { slug: "dr-neelkant-mishra", name: "Dr. Neelkanth Mishra", affiliation: "EAC-PM", designation: "Part-time Member", imageUrl: "/img/neelkanth.png" },
  { slug: "prof-pulak-ghosh", name: "Prof. Pulak Ghosh", affiliation: "EAC-PM", designation: "Part-time Member", imageUrl: "/img/pulak.jpeg" },
  { slug: "nilesh-shah", name: "Shri Nilesh Shah", affiliation: "EAC-PM", designation: "Part-time Member", imageUrl: "/img/Nilesh-Shah-New.png" },
  { slug: "prof-t-t-ram-mohan", name: "Prof. T. T. Ram Mohan", affiliation: "EAC-PM", designation: "Part-time Member", imageUrl: "/img/TT-Ram-Mohan.png" },
  { slug: "dr-k-v-raju", name: "Dr. K. V. Raju", affiliation: "EAC-PM", designation: "Part-time Member", imageUrl: "/img/KV-raju.jpeg" },
  { slug: "professor-pami-dua", name: "Prof. Pami Dua", affiliation: "EAC-PM", designation: "Part-time Member", imageUrl: "/img/Pami.jpeg" },
];
