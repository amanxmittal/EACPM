import type { Metadata } from "next";
import { members } from "@/content/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { ChapterArt } from "@/components/art/ChapterArt";
import { MemberAvatar } from "@/components/ui/MemberAvatar";

export const metadata: Metadata = {
  title: "About EAC-PM",
  description: "Mandate, constitution, team and history of the Economic Advisory Council to the Prime Minister.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero hero-stage grain">
        <div className="ux4g-container hero-content">
          <span className="kicker">About</span>
          <h1 className="t-h1 balance ux4g-mt-xs" style={{ maxWidth: "20ch" }}>
            The Economic Advisory Council to the Prime Minister
          </h1>
          <hr className="gold-rule ux4g-my-m ux4g-mx-none" />
          <p className="t-lead measure">
            An independent body constituted to advise the Prime Minister on economic and related
            matters — analysing the economy and offering evidence-based policy counsel.
          </p>
        </div>
      </section>

      <section className="section tint" id="chairperson" style={{ scrollMarginTop: "96px" }}>
        <div className="ux4g-container container-narrow">
          <Reveal>
            <span className="kicker">Message from the Chairperson</span>
            <blockquote className="t-h3 balance dropcap ux4g-mt-s" style={{ fontWeight: 600 }}>
              The Council&apos;s work is to bring evidence to bear on the questions that matter most
              for India&apos;s growth — and to state plainly what the data does, and does not yet,
              show.
            </blockquote>
            <p className="text-muted ux4g-mt-m">
              Chairperson&apos;s portrait, signed message and an optional captioned video with a
              transcript are placeholders pending official assets.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="ux4g-container">
          <div className="grid ux4g-row ux4g-ai-center">
            <Reveal className="ux4g-col-12 ux4g-col-sm-6">
              <div className="prose">
                <h2 className="t-h2">Mandate &amp; functions</h2>
                <p>
                  The EAC-PM is a non-constitutional, non-statutory, independent body that advises
                  the Government of India, specifically the Prime Minister, on economic and related
                  issues. Its terms of reference include analysing macroeconomic developments,
                  flagging matters of economic importance, and preparing analytical papers to
                  inform policy.
                </p>
                <p className="text-muted t-small">
                  Organisational text here is placeholder for the MVP; the final mandate,
                  constitution and history are migrated verbatim from official sources.
                </p>
              </div>
            </Reveal>
            <Reveal className="ux4g-col-12 ux4g-col-sm-6" delay={120}>
              <div className="stage-frame" style={{ height: "min(46vh, 360px)" }}>
                <div className="story-art" data-active="true">
                  <ChapterArt id="arthashastra" />
                </div>
                <span className="stage-era" style={{ fontSize: "1.1rem" }}>
                  Est. 1983
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="team" style={{ scrollMarginTop: "96px" }}>
        <div className="ux4g-container">
          <SectionHeader eyebrow="Team" title="Members &amp; officials">
            Names are drawn from the current public roster. Designations, areas of focus and bios
            are shown as pending official verification — never invented.
          </SectionHeader>
          <RevealStagger className="grid ux4g-row">
            {members.map((m) => (
              <div key={m.slug} className="ux4g-col-12 ux4g-col-sm-6 ux4g-col-lg-3">
                <div className="card member">
                  <MemberAvatar member={m} />
                  <div>
                    <h3>{m.name}</h3>
                    <p className="text-muted t-small">{m.affiliation} · {m.designation ?? "designation pending"}</p>
                  </div>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section tint" id="previous" style={{ scrollMarginTop: "96px" }}>
        <div className="ux4g-container">
          <Reveal>
            <span className="kicker">Previous Chairpersons</span>
            <h2 className="t-h2 ux4g-mt-xs">
              A chronological legacy
            </h2>
            <p className="text-muted measure ux4g-mt-xs">
              A dated list of previous Chairpersons with tenure and a short legacy note is compiled
              from official records during migration.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
