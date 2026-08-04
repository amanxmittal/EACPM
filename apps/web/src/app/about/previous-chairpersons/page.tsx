import type { Metadata } from "next";
import { members } from "@/content/team";
import { RevealStagger } from "@/components/motion/Reveal";
import { MemberAvatar } from "@/components/ui/MemberAvatar";

export const metadata: Metadata = {
  title: "Previous Chairpersons",
  description: "A chronological legacy of the Economic Advisory Council to the Prime Minister.",
};

export default function PreviousChairpersonsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="kicker">Previous Chairpersons</span>
          <h1 className="t-h1 balance ux4g-mt-xs">A chronological legacy</h1>
          <p className="text-muted measure ux4g-mt-s">
            Names and photographs shown here are drawn from the current roster pending the
            official dated list of former Chairpersons; tenure dates are not yet verified.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="ux4g-container">
          <RevealStagger className="grid ux4g-row">
            {members.slice(0, 8).map((m) => (
              <div key={m.slug} className="ux4g-col-12 ux4g-col-sm-6 ux4g-col-lg-3">
                <div className="card member">
                  <MemberAvatar member={m} />
                  <div>
                    <h3>{m.name}</h3>
                    <p className="text-muted t-small">{m.affiliation} · {m.designation ?? "designation pending"}</p>
                    <p className="text-muted t-small ux4g-mt-2xs">Duration: pending verification</p>
                  </div>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
