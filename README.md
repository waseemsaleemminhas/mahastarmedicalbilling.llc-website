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
- [ ] **Homepage stats** — the `STATS` array in `src/pages.js` shows `[ 00 ]`
      placeholders. Replace with real, documented figures or delete the tiles.
      Do not publish numbers you cannot support.
- [ ] **Pricing rate** — `[ 0.00 ]%` on the pricing page
- [ ] **Street address** — only the state is published; add city and street if you
      have a public office (also fills in the structured-data address)
- [ ] **Privacy policy** — the template at `/privacy/` needs review by counsel
- [ ] **Logo** — `public/assets/logo.svg` is a placeholder mark
- [ ] **Testimonials** — deliberately omitted. Add only with written client
      permission, and take care not to identify patients.
