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
   - Node version is pinned by `.node-version` (22); no need to set it by hand.
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

Forms POST JSON to `/api/lead`, handled by `functions/api/lead.js`. Until a
provider key is set the endpoint accepts submissions and logs them, so nothing
500s — but **nothing reaches your inbox either**.

Two providers are supported. Whichever key is present is used; Brevo is checked
first. Set these in the Pages project under Settings → Environment variables:

| Variable | Value |
| --- | --- |
| `BREVO_API_KEY` *or* `RESEND_API_KEY` | API key — store as an **encrypted secret** |
| `LEAD_TO` | Where enquiries go, e.g. `info@mahastarmedicalbilling.llc` |
| `LEAD_FROM` | A verified sender on your domain, e.g. `website@mahastarmedicalbilling.llc` |

**Environment variables only apply to new deployments.** After adding them,
retry the latest deployment or push a commit, or the running site will not see
them.

The sending domain has to be authenticated with the provider (SPF and DKIM
records) before mail is accepted. To add a different provider, add a branch to
`deliver()` in `functions/api/lead.js`.

### This domain's current mail setup

- **Receiving** is on Cloudflare Email Routing (MX records point at
  `route1/2/3.mx.cloudflare.net`). Email Routing forwards; it does not send.
- **SPF** is `v=spf1 include:_spf.mx.cloudflare.net ~all`, which authorizes
  Cloudflare only. Sending through Brevo or Resend needs their `include:` added
  to that same record — one TXT record, not two, or SPF breaks.
- A `brevo-code` TXT record is already present, so Brevo setup was started.
  Finish domain authentication in Brevo and use `BREVO_API_KEY`.

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
      notification procedure), add each to `safeguards` in `src/data.js` (it
      appears on the `/compliance/` page) and, if relevant, the FAQ. Publish nothing before it is true: a
      practice's compliance officer can ask you to evidence any of it.
- [x] **Logo** — full Mahastar mark (M, cross, star, stethoscope) from the
      designer artwork, as transparent PNGs in `public/assets/`: `logo-mark.png`
      (header), `logo-mark-light.png` (dark footer), `logo-full.png` /
      `logo-full-light.png` (full lockup with wordmark), `og-image.png` (social
      preview), `favicon-32.png` and `apple-touch-icon.png`.
- [ ] **Vector logo** — the PNGs were cut from a 1200px raster. Ask the
      designer for the original SVG/AI/EPS for print and very large sizes, then
      swap the files in place (same names).
- [ ] **Testimonials** — deliberately omitted. Add only with written client
      permission, and take care not to identify patients.

## Image and map credits

Photos in `public/assets/img/` are from [Pexels](https://www.pexels.com/license/)
(free for commercial use, no attribution required), cropped and converted to WebP:
8376228 (doctor-laptop), 7688191 (billing-review), 6627907 (front-desk),
5998442 (clinician-notes), 40568 (stethoscope-records).

The interactive map in `src/usmap.js` is generated from
[us-atlas](https://github.com/topojson/us-atlas) (U.S. Census Bureau cartographic
boundaries, ISC licence). Clicking a state links to `/contact/?state=XX`, which
prefills the contact form.
