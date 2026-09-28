import { icon } from './layout.js';
import { serviceArt } from './serviceicons.js';
import { site } from './data.js';

/** Lead capture form. Posts to Cloudflare Pages Function at /api/lead. */
export function leadForm({ heading, note = '', compact = false, id = 'lead' }) {
  return `<form class="lead-form${compact ? ' compact' : ''}" id="${id}" method="post" action="/api/lead" novalidate>
  ${heading ? `<h3 class="lead-form-title">${heading}</h3>` : ''}
  <div class="field">
    <label for="${id}-name">Name <span aria-hidden="true">*</span></label>
    <input id="${id}-name" name="name" required autocomplete="name">
  </div>
  <div class="field">
    <label for="${id}-email">Email <span aria-hidden="true">*</span></label>
    <input id="${id}-email" name="email" type="email" required autocomplete="email">
  </div>
  <div class="field">
    <label for="${id}-phone">Phone <span aria-hidden="true">*</span></label>
    <input id="${id}-phone" name="phone" type="tel" required autocomplete="tel">
  </div>
  <div class="field">
    <label for="${id}-practice">Practice name</label>
    <input id="${id}-practice" name="practice" autocomplete="organization">
  </div>
  ${compact ? '' : `<div class="field">
    <label for="${id}-specialty">Specialty</label>
    <input id="${id}-specialty" name="specialty">
  </div>
  <div class="field">
    <label for="${id}-message">What would you like help with?</label>
    <textarea id="${id}-message" name="message" rows="3"></textarea>
  </div>`}
  <input type="text" name="company_website" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">
  <button class="btn btn-accent btn-block" type="submit">Book a Free Consultation</button>
  <p class="form-note">${note || 'Please do not include patient health information in this form.'}</p>
  <p class="form-status" role="status" aria-live="polite"></p>
</form>`;
}

export function sectionHead({ eyebrow, title, intro, align = 'center' }) {
  return `<div class="section-head ${align}">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h2>${title}</h2>
    ${intro ? `<p class="section-intro">${intro}</p>` : ''}
  </div>`;
}

export function serviceCard(s) {
  return `<article class="service-card">
    <span class="service-icon">${serviceArt(s.slug, icon(s.icon))}</span>
    <h3>${s.title}</h3>
    <p>${s.short}</p>
    <a class="link-arrow" href="/services/${s.slug}/">Explore more</a>
  </article>`;
}

export function accordion(items, idPrefix = 'faq') {
  return `<div class="accordion">
    ${items.map(([q, a], i) => `<details${i === 0 ? ' open' : ''} name="${idPrefix}">
      <summary>${q}</summary>
      <div class="accordion-body"><p>${a}</p></div>
    </details>`).join('\n    ')}
  </div>`;
}

/** Closing call to action, shared by every page. */
export function ctaBand() {
  return `<section class="cta-band">
  <div class="container cta-band-inner">
    <div>
      <h2>Not sure where your revenue is leaking?</h2>
      <p>Book a free review. We will look at your recent claims, denial patterns and A/R aging, and tell you what we find — whether or not you work with us.</p>
    </div>
    <div class="cta-band-actions">
      <a class="btn btn-accent" href="/contact/">Book a Free Consultation</a>
      <a class="btn btn-ghost" href="${site.phoneHref}">${icon('phone', 'icon icon-sm')} ${site.phone}</a>
    </div>
  </div>
</section>`;
}

/**
 * Metric tiles. Every value here is a placeholder: the real figures have to come
 * from the practice's own reporting before this goes live.
 */
export function statBand(stats) {
  return `<section class="stat-band">
  <div class="container stat-grid">
    ${stats.map(([value, label]) => `<div class="stat">
      <p class="stat-value">${value}</p>
      <p class="stat-label">${label}</p>
    </div>`).join('\n    ')}
  </div>
</section>`;
}
