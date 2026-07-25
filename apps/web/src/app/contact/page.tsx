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
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem" }}>
            Get in touch
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-grid">
            <div className="stack">
              <div className="card">
                <h2 className="t-h4" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <Icon name="mapPin" size={18} /> Postal address
                </h2>
                <p className="text-muted" style={{ marginTop: "0.6rem" }}>
                  Economic Advisory Council to the Prime Minister
                  <br />
                  NITI Aayog, Sansad Marg
                  <br />
                  New Delhi — 110001
                </p>
                <p className="t-micro text-muted" style={{ marginTop: "0.5rem" }}>
                  Address shown for layout; confirmed from official records during migration.
                </p>
              </div>
              <div className="grid grid-2">
                <div className="card">
                  <h3 className="t-h4" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <Icon name="mail" size={16} /> Email
                  </h3>
                  <p className="text-muted t-small" style={{ marginTop: "0.4rem" }}>
                    Provided during migration
                  </p>
                </div>
                <div className="card">
                  <h3 className="t-h4" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <Icon name="phone" size={16} /> Office hours
                  </h3>
                  <p className="text-muted t-small" style={{ marginTop: "0.4rem" }}>
                    Mon–Fri, 9:30–18:00
                  </p>
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
              <form style={{ marginTop: "1rem" }}>
                <div className="field">
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" name="message" rows={4} />
                </div>
                <button type="button" className="btn btn-primary" style={{ width: "100%" }}>
                  Send feedback
                </button>
                <p className="t-micro text-muted" style={{ marginTop: "0.6rem" }}>
                  Demo form — validation, confirmation and delivery are wired with the backend.
                </p>
              </form>
              <hr className="divider" style={{ margin: "1.2rem 0" }} />
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
