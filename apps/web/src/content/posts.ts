// Real posts from the Council's official X account (@EACtoPM) — text transcribed
// verbatim from the source post (CLAUDE.md §2: never fabricate/paraphrase). No
// per-post permalink is modelled since the individual post URL wasn't captured;
// "view on X" links out to the verified profile (content/channels.ts) instead.
export type Post = {
  id: string;
  author: string;
  handle: string;
  text: string;
};

export const posts: Post[] = [
  {
    id: "2026-07-28-cooperative-management-book-release",
    author: "EAC-PM",
    handle: "@EACtoPM",
    text: "Dr. @ASHISHBHUTANI14,Secretary, Ministry of Cooperation, launched Cooperative Management:The Indian Perspectives (Nurturing Cooperation through Cooperatives), authored by Dr. K.K. Tripathy, Shri Harekrishna Misra & Shri Sagar Kisan Wadekar, in New Delhi on 27 July @MinofCooperatn",
  },
  {
    id: "2026-07-16-ppp-working-paper",
    author: "EAC-PM",
    handle: "@EACtoPM",
    text: "New EAC-PM working paper 'The World in Purchasing Power Parity (Trends since 1992)' by @sanjeevsanyal (Member), @AakankshaArora5 (Director) and @payalsharma62 (Young Professional) looks at the relative long-term economic performance of countries in PPP. eacpm.gov.in/wp-content/upl…",
  },
  {
    id: "2026-07-09-solar-capacity",
    author: "EAC-PM",
    handle: "@EACtoPM",
    text: "India has built solar capacity at remarkable speed- 29% of all installed capacity, up from 2% a decade ago. The next challenge is supplying it at the right time. @sanjeevsanyal and Satvik Dev write on why India must store sunshine.",
  },
];
