# Mahastar Medical Billing LLC — Website

Source for https://www.mahastarmedicalbilling.llc, hosted on **Cloudflare Pages**.

Pages are generated from data by a small Node script — no framework, no dependencies.

## Quick start

```sh
npm run build     # generates dist/
npm run dev       # build, then serve dist/ at http://localhost:8000
```

Node 18 or newer. There is nothing to `npm install`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/data.js` | **All site content**: services, specialties, FAQs, contact details |
| `src/pages.js` | Page templates |
| `src/layout.js` | Shared shell — head, top bar, nav, footer, icons |
| `src/components.js` | Reusable blocks — forms, cards, accordions, CTA band |
| `src/build.js` | Renders every route into `dist/` |
| `public/` | Copied verbatim into `dist/` (CSS, JS, logos, `_headers`, `_redirects`) |
| `functions/api/lead.js` | Cloudflare Pages Function that receives form submissions |

To change wording, a service or a phone number, edit `src/data.js` — not the HTML.

### Pages

Home, Services (plus a page per service), Specialties, Pricing, About, Contact,
Privacy, and a 404. Adding a service to the `services` array in `src/data.js`
creates its page, its nav entry and its card automatically.

## Deploying to Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git**, then pick this repository.
2. Build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Production branch:** whichever branch you merge to (`main` once it exists)
3. **Save and Deploy.** The site goes live at `<project>.pages.dev`.
4. **Custom domains:** add `www.mahastarmedicalbilling.llc`, then `mahastarmedicalbilling.llc`.
   If the domain's DNS is on Cloudflare, records are created for you.
5. **Bare domain → www:** Rules → Redirect Rules. When hostname equals
   `mahastarmedicalbilling.llc`, redirect 301 to
   `https://www.mahastarmedicalbilling.llc${uri}`.
6. **SSL/TLS:** turn on *Always Use HTTPS*.

Pushes to the production branch redeploy. Other branches get preview URLs.

## Contact form email

Forms POST JSON to `/api/lead`, handled by `functions/api/lead.js`. Until email is
configured the endpoint accepts submissions and logs them, so nothing 500s — but
**nothing reaches your inbox either**. To receive them, set these in the Pages
project under Settings → Environment variables:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) — store as an **encrypted secret** |
| `LEAD_TO` | Where enquiries go, e.g. `info@mahastarmedicalbilling.llc` |
| `LEAD_FROM` | A verified sender on your domain, e.g. `website@mahastarmedicalbilling.llc` |

The sending domain has to be verified in Resend first, or mail is rejected. Any
other provider works too — replace `deliver()` in `functions/api/lead.js`; nothing
else depends on Resend.

The form includes a hidden honeypot field and server-side validation. For heavier
bot traffic, add Cloudflare Turnstile.

## Before launch

These are placeholders in `src/data.js` and `src/pages.js`, and must be fixed:

- [x] **Phone number** — set to +92 311 027 1554 in `src/data.js`
- [ ] **US contact number** — a US-facing billing company is usually expected to
      publish a US line; consider a forwarding number
- [x] **Location** — Virginia, USA; shown in the footer, contact page, About page and FAQ
- [ ] **Email** — confirm `info@mahastarmedicalbilling.llc` exists and is monitored
- [x] **Homepage stats** — now commitment-based (50 states, 20+ specialties,
      24-hour response, $0 setup fee). Every tile is true from day one. Swap in
      earned metrics once there is reporting to evidence them; see the note on
      the `STATS` array in `src/pages.js`.
- [ ] **24-hour response** — this is a published promise. Keep it, or change the
      tile in `src/pages.js`.
- [x] **Pricing** — the card shows "Custom quote" rather than a published rate,
      with the four factors that shape it. Swap in a headline percentage later
      if you decide to compete on a public number.
- [ ] **Street address** — only the state is published; add city and street if you
      have a public office (also fills in the structured-data address)
- [ ] **Privacy policy** — the template at `/privacy/` needs review by counsel
- [ ] **BAA template** — the site says we will work through a BAA with practices
      that lack one. Have a template drafted and reviewed by counsel before
      making that offer to a real client.
- [ ] **Further HIPAA safeguards** — the site claims only a signed BAA and
      HIPAA-trained staff, because that is what is in place. As controls go in
      (MFA on systems holding PHI, a device and email policy, a written breach
      notification procedure), add each to the FAQ in `src/data.js` and consider
      a dedicated compliance page. Publish nothing before it is true: a
      practice's compliance officer can ask you to evidence any of it.
- [x] **Logo** — navy/green M-and-star mark in `public/assets/` (logo.svg,
      logo-light.svg for dark backgrounds, favicon.svg). Site palette matches:
      `--brand: #1D2A44`, `--accent: #00A896`.
- [ ] **Full logo lockup** — the web mark is the star alone. For print,
      letterheads and social profiles, get the full artwork (with the M, cross
      and stethoscope) as an original vector from the designer.
- [ ] **Testimonials** — deliberately omitted. Add only with written client
      permission, and take care not to identify patients.
