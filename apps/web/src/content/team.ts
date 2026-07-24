// Member names are real (sourced from the current eacpm.gov.in /team roster).
// Designations/bios are intentionally NOT invented — per governance rule, they must
// come from official sources. They render as "pending verification" until the CMS
// (Q6/Q-A) supplies them. See PRODUCT.md §7.
export type Member = {
  slug: string;
  name: string;
  affiliation: string;
  designation?: string; // undefined => shown as "pending verification"
};

export const members: Member[] = [
  { slug: "dr-s-mahendra-dev", name: "Dr. S. Mahendra Dev", affiliation: "EAC-PM" },
  { slug: "shri-rakesh-mohan", name: "Shri Rakesh Mohan", affiliation: "EAC-PM" },
  { slug: "dr-sajjid-z-chinoy", name: "Dr. Sajjid Z. Chinoy", affiliation: "EAC-PM" },
  { slug: "dr-neelkant-mishra", name: "Dr. Neelkanth Mishra", affiliation: "EAC-PM" },
  { slug: "prof-pulak-ghosh", name: "Prof. Pulak Ghosh", affiliation: "EAC-PM" },
  { slug: "nilesh-shah", name: "Shri Nilesh Shah", affiliation: "EAC-PM" },
  { slug: "prof-t-t-ram-mohan", name: "Prof. T. T. Ram Mohan", affiliation: "EAC-PM" },
  { slug: "shri-sanjeev-sanyal", name: "Shri Sanjeev Sanyal", affiliation: "EAC-PM" },
  { slug: "dr-shamika-ravi", name: "Dr. Shamika Ravi", affiliation: "EAC-PM" },
  { slug: "sanjay-kumar-mishra", name: "Shri Sanjay Kumar Mishra", affiliation: "EAC-PM" },
  { slug: "dr-k-v-raju", name: "Dr. K. V. Raju", affiliation: "EAC-PM" },
  { slug: "professor-pami-dua", name: "Prof. Pami Dua", affiliation: "EAC-PM" },
];
