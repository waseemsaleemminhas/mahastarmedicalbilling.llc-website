import { icon } from './layout.js';
import { serviceArt } from './serviceicons.js';
import { processArt } from './processart.js';
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

/**
 * Single-field email capture, for low-commitment asks where a full form would
 * be too much to ask for. The endpoint requires only an email when that is all
 * the form sent.
 */
export function emailForm({ id = 'email-only', button = 'Send', note = '' }) {
  return `<form class="email-form" id="${id}" method="post" action="/api/lead" novalidate>
  <div class="email-form-row">
    <div class="field">
      <label class="sr-only" for="${id}-email">Your email address</label>
      <input id="${id}-email" name="email" type="email" required autocomplete="email" placeholder="you@yourpractice.com">
    </div>
    <button class="btn btn-accent" type="submit">${button}</button>
  </div>
  <input type="text" name="company_website" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">
  ${note ? `<p class="form-note">${note}</p>` : ''}
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

/**
 * "How it works" timeline. A connected rail of stages, each with its own animated
 * illustration, the point in the engagement it happens at, and the checkpoints
 * that stage delivers. The rail and the illustrations animate as the section
 * scrolls in (site.js adds `.is-live` per step); with JavaScript off, or under
 * reduced motion, every step renders in its finished state.
 *
 * @param {Array} steps       Stage objects from `process` in data.js.
 * @param {Array} assurances  Short reassurance chips shown under the rail.
 * @param {{href: string, label: string}} [cta]
 */
export function processTimeline(steps, assurances = [], cta = null) {
  const step = (s, i) => `<li class="journey-step">
        <span class="journey-link" aria-hidden="true"><i></i></span>
        <div class="journey-node">
          <span class="journey-medallion">${processArt(s.art, icon(s.icon))}</span>
          <span class="journey-num"><span class="sr-only">Step </span>${i + 1}</span>
        </div>
        <div class="journey-card">
          ${s.stage ? `<p class="journey-stage">${icon('clock', 'icon icon-sm')}${s.stage}</p>` : ''}
          <h3>${s.title}</h3>
          <p class="journey-blurb">${s.blurb}</p>
          ${s.points?.length ? `<ul class="journey-points">
            ${s.points.map((p) => `<li>${icon('check', 'icon icon-sm')}<span>${p}</span></li>`).join('\n            ')}
          </ul>` : ''}
        </div>
      </li>`;

  return `<div class="journey" data-journey>
      <ol class="journey-steps">
        ${steps.map(step).join('\n        ')}
      </ol>
      ${assurances.length || cta ? `<div class="journey-foot">
        ${assurances.length ? `<ul class="journey-assure">
          ${assurances.map((a) => `<li>${icon('check', 'icon icon-sm')}${a}</li>`).join('\n          ')}
        </ul>` : ''}
        ${cta ? `<a class="btn btn-accent" href="${cta.href}">${cta.label}</a>` : ''}
      </div>` : ''}
    </div>`;
}
