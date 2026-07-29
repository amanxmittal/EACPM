import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { MapIllustration } from "@/components/ui/MapIllustration";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Postal address, phone, email, office hours, RTI and grievance officer details for the EAC-PM.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="eyebrow">Contact</span>
          <h1 className="t-h1 balance ux4g-mt-xs">
            Get in touch
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="ux4g-container">
          <div className="detail-grid">
            <div className="stack">
              <div className="card">
                <h2 className="t-h4 ux4g-d-flex ux4g-inline-gap-s ux4g-ai-center">
                  <Icon name="mapPin" size={18} /> Postal address
                </h2>
                <p className="text-muted ux4g-mt-xs">
                  Economic Advisory Council to the Prime Minister
                  <br />
                  NITI Aayog, Sansad Marg
                  <br />
                  New Delhi — 110001
                </p>
                <p className="t-micro text-muted ux4g-mt-xs">
                  Address shown for layout; confirmed from official records during migration.
                </p>
              </div>
              <div className="grid ux4g-row">
                <div className="ux4g-col-12 ux4g-col-sm-6">
                  <div className="card">
                    <h3 className="t-h4 ux4g-d-flex ux4g-inline-gap-s ux4g-ai-center">
                      <Icon name="mail" size={16} /> Email
                    </h3>
                    <p className="text-muted t-small ux4g-mt-xs">
                      Provided during migration
                    </p>
                  </div>
                </div>
                <div className="ux4g-col-12 ux4g-col-sm-6">
                  <div className="card">
                    <h3 className="t-h4 ux4g-d-flex ux4g-inline-gap-s ux4g-ai-center">
                      <Icon name="phone" size={16} /> Office hours
                    </h3>
                    <p className="text-muted t-small ux4g-mt-xs">
                      Mon–Fri, 9:30–18:00
                    </p>
                  </div>
                </div>
              </div>
              <div className="card map-card" style={{ aspectRatio: "16 / 7" }}>
                <MapIllustration />
                <p className="map-card-note t-small text-muted">
                  <Icon name="mapPin" size={14} /> Accessible map loads on click
                </p>
              </div>
            </div>

            <div className="card">
              <h2 className="t-h4">Feedback</h2>
              <form className="ux4g-mt-m">
                <div className="field ux4g-form-group">
                  <label className="ux4g-label-m-strong" htmlFor="c-name">Name</label>
                  <div className="ux4g-input ux4g-input-md">
                    <input className="ux4g-input-input" id="c-name" name="name" type="text" autoComplete="name" />
                  </div>
                </div>
                <div className="field ux4g-form-group">
                  <label className="ux4g-label-m-strong" htmlFor="c-email">Email</label>
                  <div className="ux4g-input ux4g-input-md">
                    <input className="ux4g-input-input" id="c-email" name="email" type="email" autoComplete="email" />
                  </div>
                </div>
                <div className="field ux4g-form-group">
                  <label className="ux4g-label-m-strong" htmlFor="c-msg">Message</label>
                  <div className="ux4g-textarea ux4g-textarea-md">
                    <textarea className="ux4g-textarea-input" id="c-msg" name="message" rows={4} />
                  </div>
                </div>
                <button type="button" className="ux4g-btn-primary ux4g-btn-md" style={{ width: "100%" }}>
                  Send feedback
                </button>
                <p className="t-micro text-muted ux4g-mt-xs">
                  Demo form — validation, confirmation and delivery are wired with the backend.
                </p>
              </form>
              <hr className="ux4g-divider-horizontal ux4g-my-l ux4g-mx-none" />
              <p className="t-small">
                <strong>RTI &amp; grievances:</strong> the CPIO and grievance officer details are
                published on the RTI page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
