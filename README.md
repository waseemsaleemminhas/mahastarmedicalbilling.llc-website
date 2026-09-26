# Mahastar Medical Billing LLC — Website

Source for https://www.mahastarmedicalbilling.llc, a static site hosted on **Cloudflare Pages**.

It's plain HTML and CSS, so there's no build step.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Home page (services, why us, process, FAQ, contact) |
| `404.html` | Not-found page (Cloudflare Pages serves it automatically) |
| `assets/` | Stylesheet and favicon |
| `_headers` | Security and cache headers (Cloudflare Pages) |
| `_redirects` | Path redirects (Cloudflare Pages) |
| `robots.txt`, `sitemap.xml` | SEO |

## Deploying on Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the repository `waseemsaleemminhas/mahastarmedicalbilling.llc-website`.
3. Build settings:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. Click **Save and Deploy**. The site goes live at `<project>.pages.dev`.
5. Open the project's **Custom domains** tab and add `www.mahastarmedicalbilling.llc`, then add `mahastarmedicalbilling.llc`.
   If the domain's DNS is on Cloudflare, the DNS records are created automatically.
6. To send the bare domain to `www`, create a **Redirect Rule** (Rules → Redirect Rules):
   hostname equals `mahastarmedicalbilling.llc` → `https://www.mahastarmedicalbilling.llc${uri}`, status 301.
7. Under **SSL/TLS**, turn on **Always Use HTTPS**.

Every push to `main` redeploys the site. Other branches get preview URLs.

## Before launch

- Replace the placeholder phone number in `index.html` (search for `TODO`).
- Check that the email address `info@mahastarmedicalbilling.llc` exists.
- The contact form currently opens the visitor's email app (`mailto:`). To receive submissions directly, connect it to a form service or a Cloudflare Pages Function.

## Local preview

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.
