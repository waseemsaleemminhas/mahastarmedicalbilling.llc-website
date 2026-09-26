import { site, services, specialties, differentiators, process, faqs } from './data.js';
import { icon } from './layout.js';
import { leadForm, sectionHead, serviceCard, accordion, ctaBand, statBand } from './components.js';

// PLACEHOLDER METRICS — replace each value with a real, documented figure
// before launch, or delete the tile. Do not publish numbers you cannot support.
const STATS = [
  ['[ 00 ]+', 'Practices served'],
  ['[ 00 ]+', 'Specialties supported'],
  ['[ 00 ]%', 'Clean claim rate'],
  ['50', 'States covered'],
];

export function home() {
  return `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow light">${site.tagline}</p>
      <h1>Medical billing that gets your practice <span class="hl">paid in full, on time</span></h1>
      <p class="lead">${site.name} manages billing, coding, denials and credentialing for healthcare providers across the United States — so your revenue keeps moving while you focus on patients.</p>
      <ul class="hero-points">
        <li>${icon('check', 'icon icon-sm')} Claims scrubbed before submission</li>
        <li>${icon('check', 'icon icon-sm')} Every denial worked and appealed</li>
        <li>${icon('check', 'icon icon-sm')} We work in the software you already use</li>
        <li>${icon('check', 'icon icon-sm')} Transparent percentage-of-collections pricing</li>
      </ul>
      <div class="hero-actions">
        <a class="btn btn-accent" href="/contact/">Get a Free Billing Review</a>
        <a class="btn btn-ghost" href="/services/">Explore Services</a>
      </div>
    </div>
    <div class="hero-form">
      ${leadForm({ heading: 'Talk to a billing specialist', compact: true, id: 'hero' })}
    </div>
  </div>
</section>

${statBand(STATS)}

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'What we do',
      title: 'Medical billing services, end to end',
      intro: 'Take the whole revenue cycle or just the part that is costing you the most. Each service stands on its own, and they work better together.',
    })}
    <div class="service-grid">
      ${services.map(serviceCard).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container split">
    <div class="split-copy">
      <p class="eyebrow">Why Mahastar</p>
      <h2>A billing partner that answers the phone</h2>
      <p>Most practices do not leave their billing company over a spreadsheet. They leave because nobody picks up, claims sit untouched, and nobody can explain where the money went.</p>
      <p>We are built around the opposite: a named account manager, a documented follow-up cadence on every claim, and a monthly report written in plain language rather than payer jargon.</p>
      <a class="btn btn-primary" href="/about/">More about how we work</a>
    </div>
    <div class="feature-list">
      ${differentiators.map(([t, d]) => `<div class="feature">
        <span class="feature-check">${icon('check', 'icon icon-sm')}</span>
        <div><h3>${t}</h3><p>${d}</p></div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'How it works',
      title: 'From first call to steady cash flow',
      intro: 'Onboarding is deliberately short. Most practices are live within one to two weeks.',
    })}
    <ol class="steps">
      ${process.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="section section-dark">
  <div class="container split split-reverse">
    <div class="split-copy">
      <p class="eyebrow light">Specialty billing</p>
      <h2>Billing teams that know your specialty</h2>
      <p>Coding rules, payer policies and denial patterns differ sharply between specialties. Behavioral health does not bill like orthopedics, and a generalist biller learns that the expensive way.</p>
      <p>We assign billers familiar with the conventions of your field, and tailor claim scrubbing rules to the codes you actually use.</p>
      <a class="btn btn-accent" href="/specialties/">View all specialties</a>
    </div>
    <ul class="specialty-chips">
      ${specialties.slice(0, 12).map((s) => `<li>${s}</li>`).join('\n      ')}
      <li class="more"><a href="/specialties/">+ more</a></li>
    </ul>
  </div>
</section>

<section class="section section-alt">
  <div class="container audit-grid">
    <div>
      ${sectionHead({
        eyebrow: 'Free practice audit',
        title: 'Which of these sounds like your practice?',
        intro: 'If you recognise more than one, a billing review is worth an hour of your time.',
        align: 'left',
      })}
      <ul class="pain-list">
        <li>${icon('check', 'icon icon-sm')} Claims and payments are not followed up consistently</li>
        <li>${icon('check', 'icon icon-sm')} Accounts receivable is aging past 90 or 120 days</li>
        <li>${icon('check', 'icon icon-sm')} Patient balances keep climbing and rarely get collected</li>
        <li>${icon('check', 'icon icon-sm')} You cannot get a straight answer on where claims stand</li>
        <li>${icon('check', 'icon icon-sm')} Collections are drifting down and nobody can say why</li>
      </ul>
    </div>
    <div class="audit-form">
      ${leadForm({ heading: 'Claim your free practice audit', id: 'audit' })}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Pricing',
      title: 'Outsourced billing, without in-house overhead',
      intro: 'One in-house biller costs a salary, benefits, software, training and cover for holidays. Outsourced billing costs a percentage of what is actually collected.',
    })}
    <div class="compare-grid">
      <div class="compare-card">
        <h3>In-house billing</h3>
        <ul class="compare-list">
          <li><span>Salary and benefits</span><strong>Fixed cost</strong></li>
          <li><span>Billing software and clearinghouse</span><strong>Fixed cost</strong></li>
          <li><span>Training and certification</span><strong>Ongoing</strong></li>
          <li><span>Cover for leave and turnover</span><strong>Your problem</strong></li>
          <li><span>Paid when claims are denied</span><strong>Yes</strong></li>
        </ul>
      </div>
      <div class="compare-card highlight">
        <span class="badge">Mahastar</span>
        <h3>Outsourced to us</h3>
        <ul class="compare-list">
          <li><span>Percentage of collections</span><strong>Variable</strong></li>
          <li><span>Setup fees</span><strong>None</strong></li>
          <li><span>Denial appeals</span><strong>Included</strong></li>
          <li><span>Coverage and capacity</span><strong>Our problem</strong></li>
          <li><span>Paid when claims are denied</span><strong>No</strong></li>
        </ul>
        <a class="btn btn-accent btn-block" href="/pricing/">See pricing</a>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'FAQs', title: 'Questions practices ask us' })}
    ${accordion(faqs)}
  </div>
</section>

${ctaBand()}
`;
}

export function servicesIndex() {
  return `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow light">Services</p>
    <h1>Billing services for every stage of the revenue cycle</h1>
    <p class="lead">Take the whole cycle or the single piece that is hurting most. Each service is offered on its own terms.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="service-grid">
      ${services.map(serviceCard).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand()}
`;
}

export function servicePage(s) {
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  return `
<section class="page-hero">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> <span>/</span> <a href="/services/">Services</a> <span>/</span> <span aria-current="page">${s.title}</span>
    </nav>
    <p class="eyebrow light">${s.title}</p>
    <h1>${s.hero}</h1>
    <p class="lead">${s.short}</p>
    <a class="btn btn-accent" href="/contact/">Book a Free Consultation</a>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="split-copy">
      <h2>What this covers</h2>
      <p>${s.intro}</p>
      <div class="feature-list">
        ${s.points.map(([t, d]) => `<div class="feature">
          <span class="feature-check">${icon('check', 'icon icon-sm')}</span>
          <div><h3>${t}</h3><p>${d}</p></div>
        </div>`).join('\n        ')}
      </div>
    </div>
    <aside class="sticky-form">
      ${leadForm({ heading: `Ask about ${s.title.toLowerCase()}`, compact: true, id: 'svc' })}
    </aside>
  </div>
</section>

${s.faqs && s.faqs.length ? `<section class="section section-alt">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'FAQs', title: `${s.title} questions` })}
    ${accordion(s.faqs, s.slug)}
  </div>
</section>` : ''}

<section class="section">
  <div class="container">
    ${sectionHead({ title: 'Other services' })}
    <div class="service-grid">
      ${others.map(serviceCard).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand()}
`;
}

export function specialtiesPage() {
  return `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow light">Specialties</p>
    <h1>Specialty-specific medical billing</h1>
    <p class="lead">Coding rules and denial patterns vary widely by specialty. We assign billers who already know yours.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({
      title: 'Specialties we support',
      intro: 'This is not an exhaustive list. If your specialty is not here, ask — the underlying process is the same and we will tell you honestly whether we are a good fit.',
    })}
    <ul class="specialty-grid">
      ${specialties.map((s) => `<li>${icon('check', 'icon icon-sm')}<span>${s}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section section-alt">
  <div class="container narrow">
    ${sectionHead({
      title: 'Why specialty matters in billing',
      intro: 'Three things change from one specialty to the next, and each one costs money when it is handled by a generalist.',
    })}
    <div class="feature-list wide">
      <div class="feature"><span class="feature-check">${icon('check', 'icon icon-sm')}</span><div><h3>Code sets in daily use</h3><p>The codes you bill every day are a narrow slice of the full code set. Scrubbing rules tuned to that slice catch more before submission.</p></div></div>
      <div class="feature"><span class="feature-check">${icon('check', 'icon icon-sm')}</span><div><h3>Payer policies</h3><p>Coverage rules, authorization requirements and frequency limits differ by specialty and by payer. Knowing them prevents predictable denials.</p></div></div>
      <div class="feature"><span class="feature-check">${icon('check', 'icon icon-sm')}</span><div><h3>Documentation expectations</h3><p>What a payer expects in the note varies. Billers who know your specialty can flag a weak note before the claim goes out.</p></div></div>
    </div>
  </div>
</section>

${ctaBand()}
`;
}

export function pricingPage() {
  return `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow light">Pricing</p>
    <h1>Straightforward, percentage-based pricing</h1>
    <p class="lead">You pay a percentage of what we actually collect for you. If a claim does not pay, we do not earn on it.</p>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    ${sectionHead({
      title: 'How our pricing works',
      intro: 'We quote a single percentage after reviewing your practice. What moves that number is claim volume, average claim value, specialty complexity and payer mix.',
    })}
    <div class="price-card">
      <p class="price-label">Full-service medical billing</p>
      <p class="price-value">[ 0.00 ]<span>% of monthly collections</span></p>
      <p class="price-note">Placeholder — replace with your actual rate, or remove this tile and quote privately.</p>
      <ul class="price-includes">
        <li>${icon('check', 'icon icon-sm')} Charge entry, scrubbing and claim submission</li>
        <li>${icon('check', 'icon icon-sm')} Payment posting and reconciliation</li>
        <li>${icon('check', 'icon icon-sm')} Denial management and appeals</li>
        <li>${icon('check', 'icon icon-sm')} A/R follow-up</li>
        <li>${icon('check', 'icon icon-sm')} Monthly reporting and a standing review call</li>
        <li>${icon('check', 'icon icon-sm')} Dedicated account manager</li>
      </ul>
      <a class="btn btn-accent btn-block" href="/contact/">Get a Quote</a>
    </div>
    <div class="price-notes">
      <h3>What is not included</h3>
      <p>Credentialing and aged A/R cleanup are quoted separately, because both are project work rather than ongoing volume. We will tell you the cost before starting either.</p>
      <h3>No setup fee, no minimum</h3>
      <p>There is no onboarding charge and no monthly minimum. There is also no long-term contract: you give notice, we finish the claims in flight, and your data goes with you.</p>
    </div>
  </div>
</section>

${ctaBand()}
`;
}

export function aboutPage() {
  return `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow light">About us</p>
    <h1>A billing partner, not a claims processor</h1>
    <p class="lead">${site.name} is a United States medical billing company working with independent practices and clinics nationwide.</p>
  </div>
</section>

<section class="section">
  <div class="container narrow prose">
    <h2>What we do</h2>
    <p>We manage the financial side of a medical practice: coding the visit, submitting the claim, posting the payment, appealing the denial and chasing what is still outstanding. Practices bring us in either to replace an in-house billing function that has become expensive and hard to staff, or to replace a billing company that stopped being responsive.</p>

    <h2>How we work</h2>
    <p>Every client gets a named account manager rather than a shared inbox. That person knows your payer mix, your problem claims and your history, and they are who you call.</p>
    <p>We work inside your existing practice management system and clearinghouse. There is no migration, no new software to learn and no dependency on a proprietary platform that makes leaving difficult. Your data stays yours.</p>
    <p>Reporting goes out monthly, in plain language: what was billed, what was collected, what was denied and what we are doing about it. If a number moved the wrong way, the report says so rather than burying it.</p>

    <h2>Compliance</h2>
    <p>Patient data is handled under HIPAA requirements. Access is limited to the staff assigned to your account, and a business associate agreement is signed before any data changes hands.</p>

    <h2>Working with us</h2>
    <p>There is no long-term lock-in. We would rather keep clients because the collections improved than because the contract made leaving painful.</p>
  </div>
</section>

${ctaBand()}
`;
}

export function contactPage() {
  return `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow light">Contact</p>
    <h1>Book a free consultation</h1>
    <p class="lead">Tell us a little about your practice and we will come back to you with a time and an honest read on whether we can help.</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <div>
      <h2>Get in touch</h2>
      <ul class="contact-details">
        <li>${icon('phone', 'icon')}<div><h3>Phone</h3><a href="${site.phoneHref}">${site.phone}</a></div></li>
        <li>${icon('mail', 'icon')}<div><h3>Email</h3><a href="mailto:${site.email}">${site.email}</a></div></li>
        <li>${icon('clock', 'icon')}<div><h3>Hours</h3><span>${site.hours}</span></div></li>
      </ul>
      <div class="contact-note">
        <h3>Before you write</h3>
        <p>Please do not include patient health information in this form. If you need to share records or claim detail, we will set up a secure channel first.</p>
      </div>
    </div>
    <div class="contact-form-wrap">
      ${leadForm({ heading: 'Request a consultation', id: 'contact' })}
    </div>
  </div>
</section>

${ctaBand()}
`;
}

export function privacyPage() {
  return `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow light">Legal</p>
    <h1>Privacy Policy</h1>
    <p class="lead">How ${site.name} handles information collected through this website.</p>
  </div>
</section>

<section class="section">
  <div class="container narrow prose">
    <p class="callout"><strong>Template notice.</strong> This is a starting point, not legal advice. Have counsel review it against your actual data practices, your state's requirements and HIPAA before launch.</p>

    <h2>Information we collect</h2>
    <p>When you submit a form on this site we collect the name, email address, phone number and any practice details you choose to provide. We ask that you do not submit patient health information through this website.</p>

    <h2>How we use it</h2>
    <p>Submitted information is used to respond to your enquiry and to discuss our services. We do not sell it, and we do not share it with third parties except service providers who help us operate this site and our business, under confidentiality obligations.</p>

    <h2>Cookies and analytics</h2>
    <p>This site uses only what is necessary to serve the pages. If analytics are added later, this section must be updated to say what is collected and how to opt out.</p>

    <h2>Data retention</h2>
    <p>Enquiry records are kept only as long as needed for the purpose they were collected for, and for any period our legal and professional obligations require.</p>

    <h2>Your choices</h2>
    <p>To ask what we hold about you, or to have it corrected or deleted, contact <a href="mailto:${site.email}">${site.email}</a>.</p>

    <h2>Protected health information</h2>
    <p>Patient health information handled in the course of billing services is governed by HIPAA and by the business associate agreement with the covered entity, not by this policy.</p>

    <h2>Changes</h2>
    <p>If this policy changes, the revised version will be posted here.</p>
  </div>
</section>

${ctaBand()}
`;
}

export function notFoundPage() {
  return `
<section class="section error-page">
  <div class="container narrow center">
    <p class="eyebrow">404</p>
    <h1>We could not find that page</h1>
    <p class="lead">The page may have moved, or the link may be out of date.</p>
    <div class="hero-actions center-actions">
      <a class="btn btn-accent" href="/">Back to Home</a>
      <a class="btn btn-ghost" href="/services/">Browse Services</a>
    </div>
  </div>
</section>
`;
}
