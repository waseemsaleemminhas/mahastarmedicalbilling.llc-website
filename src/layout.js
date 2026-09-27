import { site, nav } from './data.js';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// Cache-busting: assets are cached for a week at the edge, so each build
// stamps CSS/JS URLs with a short hash of the file's contents.
const ver = (f) => createHash('sha256').update(readFileSync(new URL(`../public/assets/${f}`, import.meta.url))).digest('hex').slice(0, 10);
const CSS_V = ver('styles.css');
const JS_V = ver('site.js');

const icons = {
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
  code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  cycle: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
  badge: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13.5L7 22l5-2.5L17 22l-1.5-8.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;

const navMarkup = (current) => nav.map((item) => {
  const active = current.startsWith(item.href) ? ' class="active"' : '';
  if (!item.children) return `<li><a href="${item.href}"${active}>${item.label}</a></li>`;
  return `<li class="has-sub">
        <a href="${item.href}"${active}>${item.label}<span class="caret" aria-hidden="true"></span></a>
        <button class="sub-toggle" aria-expanded="false" aria-label="Show ${item.label} submenu"></button>
        <ul class="sub">
          ${item.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('\n          ')}
        </ul>
      </li>`;
}).join('\n      ');

/**
 * Wraps page content in the shared shell.
 * `path` is the page's URL path and drives canonical links and nav highlighting.
 */
export function page({ path, title, description, body, bodyClass = '' }) {
  const canonical = site.domain + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<meta property="og:image" content="${site.domain}/assets/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css?v=${CSS_V}">
<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.domain,
  email: site.email,
  telephone: site.phone,
  description: 'Medical billing, coding, credentialing and revenue cycle management for healthcare practices in the United States.',
  areaServed: 'US',
  address: {
    '@type': 'PostalAddress',
    addressRegion: site.region,
    addressCountry: site.country,
  },
}, null, 2)}
</script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>

<div class="topbar">
  <div class="container topbar-inner">
    <p class="topbar-note">Free billing review for new practices — no obligation.</p>
    <div class="topbar-links">
      <a href="${site.phoneHref}">${icon('phone', 'icon icon-sm')} ${site.phone}</a>
      <a href="mailto:${site.email}">${icon('mail', 'icon icon-sm')} ${site.email}</a>
    </div>
  </div>
</div>

<header class="site-header">
  <div class="container nav-bar">
    <a class="brand" href="/">
      <img src="/assets/logo-mark.png" alt="" width="49" height="46">
      <span class="brand-text">Mahastar<small>Medical Billing LLC</small></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
    <nav id="primary-nav" class="primary-nav" aria-label="Primary">
      <ul>
      ${navMarkup(path)}
      </ul>
      <a class="btn btn-accent nav-cta" href="/contact/">Free Consultation</a>
    </nav>
  </div>
</header>

<main id="main">
${body}
</main>

<footer class="site-footer">
  <div class="container footer-top">
    <div class="footer-brand">
      <a class="brand brand-light" href="/">
        <img src="/assets/logo-mark-light.png" alt="" width="49" height="46">
        <span class="brand-text">Mahastar<small>Medical Billing LLC</small></span>
      </a>
      <p>${site.name} handles medical billing, coding, credentialing and revenue cycle management so healthcare practices can focus on patient care.</p>
      <ul class="footer-contact">
        <li>${icon('phone', 'icon icon-sm')}<a href="${site.phoneHref}">${site.phone}</a></li>
        <li>${icon('mail', 'icon icon-sm')}<a href="mailto:${site.email}">${site.email}</a></li>
        <li>${icon('clock', 'icon icon-sm')}<span>${site.hours}</span></li>
        <li>${icon('pin', 'icon icon-sm')}<span>${site.location}</span></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Services</h3>
      <ul>
        ${nav[0].children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('\n        ')}
      </ul>
    </div>
    <div class="footer-col">
      <h3>Company</h3>
      <ul>
        <li><a href="/about/">About Us</a></li>
        <li><a href="/specialties/">Specialties</a></li>
        <li><a href="/compliance/">HIPAA &amp; Compliance</a></li>
        <li><a href="/pricing/">Pricing</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Get started</h3>
      <p class="footer-cta-text">Book a free review of your current billing and A/R.</p>
      <a class="btn btn-accent" href="/contact/">Book a Consultation</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; <span data-year>2026</span> ${site.name}. All rights reserved.</p>
    <p class="footer-legal"><a href="/privacy/">Privacy Policy</a> · <a href="/compliance/">HIPAA &amp; Compliance</a> · <a href="/contact/">Contact</a></p>
  </div>
</footer>

<a class="call-fab" href="${site.phoneHref}" aria-label="Call ${site.phone}">${icon('phone', 'icon')}</a>
<script src="/assets/site.js?v=${JS_V}" defer></script>
</body>
</html>
`;
}
