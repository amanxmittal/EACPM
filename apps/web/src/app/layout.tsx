import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSansDisplay = Noto_Sans_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-noto-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EAC-PM — Economic Advisory Council to the Prime Minister",
    template: "%s · EAC-PM",
  },
  description:
    "The institutional home of the Economic Advisory Council to the Prime Minister, and India's economic story told with evidence — publications, data and analysis.",
  metadataBase: new URL("https://eacpm.gov.in"),
};

// Runs before paint to prevent theme flash. (MVP: inline; production moves to a nonce'd/external script under CSP.)
const themeInit = `(function(){try{var d=document.documentElement,ls=localStorage;var t=ls.getItem('eac-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.setAttribute('data-theme',t);if(ls.getItem('eac-contrast')==='1')d.classList.add('contrast-more');var fs=ls.getItem('eac-font-scale');if(fs)d.style.setProperty('--app-font-scale',fs);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoSansDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
