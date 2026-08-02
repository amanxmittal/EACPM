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
            </div>
            <div className="grid ux4g-row">
              <div className="ux4g-col-12 ux4g-col-sm-6">
                <div className="card">
                  <h3 className="t-h4 ux4g-d-flex ux4g-inline-gap-s ux4g-ai-center">
                    <Icon name="mail" size={16} /> Email
                  </h3>
                  <p className="text-muted t-small ux4g-mt-xs">
                    eacpm-niti[at]gov[dot]in
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
            <div className="card map-card" style={{ aspectRatio: "21 / 8" }}>
              <MapIllustration />
              <p className="map-card-note t-small text-muted">
                <Icon name="mapPin" size={14} /> Accessible map loads on click
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
