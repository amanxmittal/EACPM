import type { Metadata } from "next";
import { members } from "@/content/team";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About EAC-PM",
  description: "Mandate, constitution, team and history of the Economic Advisory Council to the Prime Minister.",
};

function initials(name: string) {
  return name
    .replace(/^(Dr|Shri|Prof|Professor|Mr|Ms|Smt)\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem" }}>
            The Economic Advisory Council to the Prime Minister
          </h1>
          <p className="t-lead measure" style={{ marginTop: "0.8rem" }}>
            An independent body constituted to advise the Prime Minister on economic and related
            matters — analysing the economy and offering evidence-based policy counsel.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow prose">
          <h2 className="t-h2">Mandate &amp; functions</h2>
          <p>
            The EAC-PM is a non-constitutional, non-statutory, independent body that advises the
            Government of India, specifically the Prime Minister, on economic and related issues.
            Its terms of reference include analysing macroeconomic developments, flagging matters
            of economic importance, and preparing analytical papers to inform policy.
          </p>
          <p className="text-muted t-small">
            Organisational text here is placeholder for the MVP; the final mandate, constitution
            and history are migrated verbatim from official sources.
          </p>
        </div>
      </section>

      <section className="section tint" id="chairperson" style={{ scrollMarginTop: "84px" }}>
        <div className="container container-narrow">
          <span className="eyebrow">Message from the Chairperson</span>
          <blockquote className="t-h3 balance" style={{ marginTop: "0.8rem", fontWeight: 600 }}>
            “The Council&apos;s work is to bring evidence to bear on the questions that matter most
            for India&apos;s growth — and to state what the data does, and does not yet, show.”
          </blockquote>
          <p className="text-muted" style={{ marginTop: "1rem" }}>
            Chairperson&apos;s portrait, signed message and an optional captioned video with a
            transcript are placeholders pending official assets.
          </p>
        </div>
      </section>

      <section className="section" id="team" style={{ scrollMarginTop: "84px" }}>
        <div className="container">
          <SectionHeader eyebrow="Team" title="Members &amp; officials">
            Names are drawn from the current public roster. Designations, areas of focus and bios
            are shown as pending official verification — never invented.
          </SectionHeader>
          <div className="grid grid-4">
            {members.map((m) => (
              <div key={m.slug} className="card member">
                <span className="avatar" aria-hidden>
                  {initials(m.name)}
                </span>
                <div>
                  <h3>{m.name}</h3>
                  <p className="text-muted t-small">{m.affiliation} · designation pending</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint" id="previous" style={{ scrollMarginTop: "84px" }}>
        <div className="container">
          <span className="eyebrow">Previous Chairpersons</span>
          <h2 className="t-h2" style={{ marginTop: "0.5rem" }}>
            A chronological legacy
          </h2>
          <p className="text-muted measure" style={{ marginTop: "0.6rem" }}>
            A dated list of previous Chairpersons with tenure and a short legacy note is compiled
            from official records during migration.
          </p>
        </div>
      </section>
    </>
  );
}
