// GIGW 3.0 mandatory / statutory pages. In the MVP these render as titled placeholders;
// real content arrives via migration + the CMS. Kept in one place so the footer and the
// /policies/[slug] catch-all stay in sync.
export type Policy = { slug: string; title: string };

export const policies: Policy[] = [
  { slug: "website-policy", title: "Website Policies" },
  { slug: "terms-conditions", title: "Terms & Conditions" },
  { slug: "copyright-policy", title: "Copyright Policy" },
  { slug: "hyperlinking-policy", title: "Hyperlinking Policy" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "accessibility-statement", title: "Accessibility Statement" },
  { slug: "screen-reader-access", title: "Screen Reader Access" },
  { slug: "help", title: "Help" },
  { slug: "sitemap", title: "Sitemap" },
  { slug: "feedback", title: "Feedback" },
  { slug: "rti", title: "RTI" },
  { slug: "archive-policy", title: "Archive Policy" },
  { slug: "content-review-policy", title: "Content Review Policy" },
  { slug: "web-information-manager", title: "Web Information Manager" },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
