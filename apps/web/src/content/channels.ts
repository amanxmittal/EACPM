// The Council's official social channels.
//
// ⚠️ handle + href are PLACEHOLDERS. EAC-PM's verified account names and URLs must be
// confirmed by the Council before launch — see content/FACTCHECK_QUEUE.md (FC-001).
// Deliberately NOT guessed: linking a GoI site to an unofficial or parody account is
// worse than shipping a disabled link. `verified: false` keeps the card from claiming
// an official account until that confirmation lands.
//
// Note also: no post text, engagement counts or timestamps are modelled here. We do not
// mirror or fabricate social posts — the cards describe each channel and link out.
// Live third-party embeds are barred by CLAUDE.md §8 (no auto-loading social embeds).
export type Channel = {
  key: "x" | "linkedin" | "youtube";
  platform: string;
  name: string;
  handle: string | null;
  blurb: string;
  cta: string;
  href: string | null;
  verified: boolean;
};

export const channels: Channel[] = [
  {
    key: "x",
    platform: "X",
    name: "EAC-PM",
    handle: null,
    blurb:
      "Working papers and reports as they publish, with a plain-language note on what each one finds.",
    cta: "Follow on X",
    href: null,
    verified: false,
  },
  {
    key: "linkedin",
    platform: "LinkedIn",
    name: "EAC-PM",
    handle: null,
    blurb:
      "Longer analysis from Council members, vacancy circulars, and calls for research collaboration.",
    cta: "Connect on LinkedIn",
    href: null,
    verified: false,
  },
  {
    key: "youtube",
    platform: "YouTube",
    name: "EAC-PM",
    handle: null,
    blurb:
      "Recorded addresses, conclave sessions and explainers on the Council's published research.",
    cta: "Watch on YouTube",
    href: null,
    verified: false,
  },
];
