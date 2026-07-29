# Image & Asset Attributions

Editorial photography on the homepage is licensed for reuse and self-hosted under
`apps/web/public/img/` (no third-party CDN, per project policy). Credits below satisfy
the CC BY-SA / GODL-India attribution requirements and are surfaced in-product as image
credits.

| File | Subject | Author | License | Source |
|---|---|---|---|---|
| `mumbai-marine-drive.jpg` | Marine Drive, Mumbai (night) | BroKholi94 | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Marine_Drive_of_Mumbai.jpg) |
| `rashtrapati-bhavan.jpg` | Rashtrapati Bhavan facade (cropped to the front-facade half of the source, which is a two-photo composite) | President's Secretariat | GODL-India | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Rashtrapati_Bhavan_1.jpg) |
| `bandra-worli-sealink.jpg` | Bandra-Worli Sea Link at sunset | Capturedmumbai | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bandra_worli_sea-link_at_sunset.jpg) |
| `delhi-metro.jpg` | Delhi Metro commuters | Celestinesucess | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Delhi_Metro_Station_(P1140769).jpg) |
| `jnpt-port.jpg` | Jawaharlal Nehru Port, container handling | Ccmarathe | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:JNPT_Port_container_handling.jpg) |

Institutional logos under `apps/web/public/brand/` (NITI Aayog, PMINDIA, MyGov, Cabinet
Secretariat, India.gov.in, apps.gov.in, national emblem) are official Government of India
marks used to indicate affiliation; they are not covered by the licenses above.

`india-gov-in.svg` is sourced from the National Portal of India
(`https://www.india.gov.in/image/static/npi_logo_Beta_Blue.svg`) and optimised with `svgo`
(precision reduced; no visual change) to cut its footprint from ~225 KB to ~85 KB before
self-hosting.

`apps-gov-in.svg` is sourced from the Government App Store
(`https://apps.gov.in/assets/svg/appstore-new.svg` — their own favicon asset; used
unmodified, no optimisation needed at 3.3 KB). The "Gov.in / AppStore" wordmark shown next
to it on the homepage is live text (`page.tsx`, `.affil-lockup`), matching how the source
site itself pairs this icon with real HTML text in its header rather than a flattened logo
image — kept as text here too, for Hindi parity and screen-reader access.
