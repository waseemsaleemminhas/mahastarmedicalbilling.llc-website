// Single source of truth for site content.
// Anything a non-developer is likely to change lives here, not in the templates.

export const site = {
  name: 'Mahastar Medical Billing LLC',
  shortName: 'Mahastar',
  domain: 'https://www.mahastarmedicalbilling.llc',
  tagline: 'Medical Billing & Revenue Cycle Management',
  phone: '+92 311 027 1554',
  phoneHref: 'tel:+923110271554',
  email: 'info@mahastarmedicalbilling.llc',
  hours: 'Monday – Friday, 9:00 AM – 5:00 PM (EST)',
  // Add street and city once there is a public office address to publish.
  location: 'Virginia, United States',
  region: 'VA',
  country: 'US',
};

export const nav = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Medical Billing', href: '/services/medical-billing/' },
      { label: 'Medical Coding', href: '/services/medical-coding/' },
      { label: 'Revenue Cycle Management', href: '/services/revenue-cycle-management/' },
      { label: 'Denial Management', href: '/services/denial-management/' },
      { label: 'A/R Recovery', href: '/services/ar-recovery/' },
      { label: 'Provider Credentialing', href: '/services/credentialing/' },
      { label: 'Practice Audit', href: '/services/practice-audit/' },
    ],
  },
  { label: 'Specialties', href: '/specialties/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const services = [
  {
    slug: 'medical-billing',
    title: 'Medical Billing',
    short: 'End-to-end claim preparation, submission and follow-up for every payer you work with.',
    icon: 'file',
    hero: 'Claims submitted clean the first time, and followed until they are paid.',
    intro:
      'We take over the full billing workflow after the visit: charge entry, claim scrubbing, electronic submission, payment posting and follow-up on anything that does not pay. You keep visibility through monthly reporting; we handle the day-to-day chase.',
    points: [
      ['Charge entry and claim scrubbing', 'Every claim is checked against payer rules before it leaves, so avoidable rejections are caught early.'],
      ['Electronic submission', 'Claims go out electronically to commercial payers, Medicare and Medicaid on a regular schedule.'],
      ['Payment posting', 'ERA and EOB posting with reconciliation, so your ledger matches what actually arrived.'],
      ['Patient statements', 'Clear statements and a documented follow-up cadence for patient balances.'],
    ],
    faqs: [
      ['Do you work inside our existing system?', 'Yes. We work in the practice management system and clearinghouse you already use, so there is no migration unless you want one.'],
      ['How often are claims submitted?', 'On a regular schedule agreed during onboarding, typically daily or every other business day.'],
    ],
  },
  {
    slug: 'medical-coding',
    title: 'Medical Coding',
    short: 'ICD-10, CPT and HCPCS coding reviewed for accuracy, specificity and compliance.',
    icon: 'code',
    hero: 'Coding that reflects the care you actually delivered.',
    intro:
      'Under-coding leaves money on the table and over-coding invites audits. We code from your documentation to the level it supports, and flag notes where the documentation and the service do not line up.',
    points: [
      ['ICD-10, CPT and HCPCS', 'Diagnosis and procedure coding kept current with annual code set changes.'],
      ['Modifier review', 'Correct modifier use so bundled and related services are not denied out of hand.'],
      ['Documentation feedback', 'We tell you where a note will not support the code, before it becomes a denial.'],
      ['Specialty-aware', 'Coders familiar with the conventions of your specialty rather than generalists.'],
    ],
    faqs: [
      ['Will you query our providers?', 'Yes, where documentation is unclear we raise a query rather than guessing at the code.'],
    ],
  },
  {
    slug: 'revenue-cycle-management',
    title: 'Revenue Cycle Management',
    short: 'The whole cycle, from eligibility check before the visit to the last dollar collected.',
    icon: 'cycle',
    hero: 'One team accountable for the entire revenue cycle.',
    intro:
      'Piecemeal billing support creates gaps where revenue leaks. Full RCM puts eligibility, coding, submission, denials, A/R and patient collections under one accountable process, with reporting that shows where the cycle is slowing down.',
    points: [
      ['Eligibility and benefits verification', 'Coverage checked before the visit so surprises do not become write-offs.'],
      ['Prior authorization support', 'Tracking and follow-up on authorizations that services depend on.'],
      ['Full billing and collections', 'Everything from charge entry through patient balance follow-up.'],
      ['Reporting and KPIs', 'Days in A/R, clean claim rate, denial rate and collections trends, reviewed with you.'],
    ],
    faqs: [
      ['Is RCM different from billing?', 'Billing is claim submission and follow-up. RCM adds the steps before and after: eligibility, authorizations, patient collections and the reporting that ties it together.'],
    ],
  },
  {
    slug: 'denial-management',
    title: 'Denial Management',
    short: 'Every denial worked, appealed where justified and traced back to its cause.',
    icon: 'shield',
    hero: 'Denials are worked, not written off.',
    intro:
      'A denial is a decision that can be challenged, not a dead end. We work each one, appeal with the documentation the payer asks for, and track denial reasons so the same category stops recurring.',
    points: [
      ['Denial triage', 'Denials sorted by reason and value so the recoverable ones are worked first.'],
      ['Appeals with documentation', 'Appeal letters assembled with the records and references the payer requires.'],
      ['Root-cause tracking', 'Denial reasons categorised and reported, so recurring causes get fixed upstream.'],
      ['Timely filing discipline', 'Appeal deadlines tracked so claims are not lost to the clock.'],
    ],
    faqs: [
      ['Do you work old denials?', 'Yes, subject to each payer\'s timely filing and appeal windows. We will tell you what is still recoverable before we start.'],
    ],
  },
  {
    slug: 'ar-recovery',
    title: 'A/R Recovery',
    short: 'Structured follow-up on aging claims to bring down days in accounts receivable.',
    icon: 'chart',
    hero: 'Aging claims worked systematically, oldest and largest first.',
    intro:
      'Accounts receivable that drifts past 90 and 120 days gets progressively harder to collect. We work aged claims on a defined cadence, document every payer contact, and report what is collectable versus what genuinely needs writing off.',
    points: [
      ['Aging analysis', 'A clear picture of what is outstanding, by bucket, payer and value.'],
      ['Prioritised follow-up', 'Effort directed where recovery is most likely and most valuable.'],
      ['Documented payer contact', 'Call reference numbers and payer responses recorded against each claim.'],
      ['Honest write-off guidance', 'We tell you what is not collectable rather than billing you to chase it.'],
    ],
    faqs: [
      ['Can you take on a backlog?', 'Yes. Aged A/R cleanup can be scoped as a project alongside or separately from ongoing billing.'],
    ],
  },
  {
    slug: 'credentialing',
    title: 'Provider Credentialing',
    short: 'Payer enrollment and credentialing handled from application through approval.',
    icon: 'badge',
    hero: 'Enrollment handled, tracked and kept current.',
    intro:
      'Credentialing delays mean services you cannot bill. We prepare applications, manage CAQH, submit to each payer and follow up until approval comes through, then keep revalidation dates from slipping.',
    points: [
      ['Payer enrollment', 'Applications to commercial payers, Medicare and Medicaid, tracked to approval.'],
      ['CAQH management', 'Profiles kept complete, attested and current.'],
      ['Revalidation tracking', 'Expiry and revalidation dates monitored so enrollment does not lapse.'],
      ['New provider onboarding', 'Adding providers to an existing group without a gap in billable time.'],
    ],
    faqs: [
      ['How long does credentialing take?', 'It depends almost entirely on the payer, and commonly runs 60 to 120 days. We track and follow up, but the payer sets the pace.'],
    ],
  },
  {
    slug: 'practice-audit',
    title: 'Practice Audit',
    short: 'A review of your current billing to find where revenue is being lost.',
    icon: 'search',
    hero: 'Find out what your current billing is costing you.',
    intro:
      'Before changing anything, it is worth knowing where the gaps are. An audit reviews a sample of recent claims, your denial patterns and your A/R aging, and reports what is recoverable and what is structurally leaking.',
    points: [
      ['Claim sample review', 'Coding accuracy and submission quality checked against documentation.'],
      ['Denial pattern analysis', 'Which denial reasons recur, and what is driving them.'],
      ['A/R aging review', 'What is outstanding, how old it is and how much is realistically collectable.'],
      ['Written findings', 'A plain report of what we found and what we would change, whether or not you hire us.'],
    ],
    faqs: [
      ['Is the audit really free?', 'The initial review is offered at no cost and with no obligation. A deeper audit engagement is quoted separately.'],
    ],
  },
];

export const specialties = [
  'Family & Primary Care', 'Internal Medicine', 'Behavioral Health', 'Psychiatry',
  'Cardiology', 'Orthopedics', 'Physical Therapy', 'Chiropractic',
  'Dermatology', 'Gastroenterology', 'Urgent Care', 'Pediatrics',
  'OB/GYN', 'Urology', 'Pain Management', 'Podiatry',
  'Neurology', 'Ophthalmology', 'Laboratory', 'Home Health',
];

export const differentiators = [
  ['Dedicated account manager', 'One named contact who knows your practice, your payers and your history, rather than a ticket queue.'],
  ['Transparent, percentage-based pricing', 'A single percentage of what we actually collect. No setup fees, no per-claim charges, no annual minimum.'],
  ['We work in your software', 'We use the practice management system and clearinghouse you already have. No migration required.'],
  ['A signed BAA before we start', 'We sign your business associate agreement before we are given access to any patient data. Our staff are HIPAA-trained and access is limited to the people assigned to your account.'],
  ['Reporting you can actually read', 'A monthly report in plain language: what was billed, what was collected, what was denied and what we are doing about it.'],
  ['You keep your data', 'Your records remain yours. If the relationship ends, you leave with everything.'],
];

export const process = [
  ['Free consultation', 'We look at your current billing, your denial patterns and your A/R, and tell you what we find.'],
  ['Onboarding', 'Access, payer enrollments and workflows set up with your team, typically over one to two weeks.'],
  ['Billing and follow-up', 'Claims go out, payments are posted, denials are appealed and aged claims are worked.'],
  ['Reporting and review', 'A monthly report and a standing call to review performance and adjust.'],
];

export const faqs = [
  ['What does it cost?', 'Billing is charged as a percentage of what we collect for you, so our fee moves with your revenue rather than against it. The exact rate depends on your specialty, claim volume and average claim value. You get a firm quote after the initial consultation.'],
  ['Do we have to change our software?', 'No. We work inside the practice management system, EHR and clearinghouse you already use.'],
  ['Which specialties do you support?', 'A broad range, including primary care, behavioral health, physical therapy, orthopedics, cardiology and more. If your specialty is not listed, ask us.'],
  ['How quickly can we start?', 'Most practices are onboarded within one to two weeks. Credentialing, if you need it, runs on the payers\' timelines rather than ours.'],
  ['Can you take on our aged A/R?', 'Yes, subject to timely filing limits. We will review what is still recoverable before committing to it.'],
  // Only claims that are true today. Add safeguards here as controls go in —
  // MFA, a device and email policy, a written breach procedure — and not before.
  // A practice's compliance officer can ask you to evidence anything published here.
  ['Will you sign our business associate agreement?', 'Yes, and before we are given access to any protected health information. If your practice does not have a BAA of its own, tell us and we will work through one with you. Nothing starts until it is signed.'],
  ['How do you handle patient data?', 'Under HIPAA requirements, and under the terms of the business associate agreement we sign with you. Everyone who works on your account completes HIPAA training, and access is limited to the staff assigned to it.'],
  ['Where are you based?', 'Mahastar Medical Billing LLC is based in Virginia, United States, and works with practices nationwide.'],
  ['What if we want to leave?', 'There is no long-term lock-in. You give notice, we work the claims already in flight, and your data goes with you.'],
];
