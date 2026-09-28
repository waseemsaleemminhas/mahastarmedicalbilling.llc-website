// Per-specialty content for the individual specialty pages.
//
// `specialties` in data.js stays the source of truth for which specialties
// exist and in what order; this file adds the detail each one's page needs.
// Every specialty listed there must have an entry here, or the build fails.
//
// Keep the content specific to BILLING for that specialty — coding rules,
// payer behaviour, documentation requirements. Generic marketing copy belongs
// on the services pages, not here. Nothing here should assert volumes, client
// counts or success rates.

/** "Family & Primary Care" -> "family-primary-care" */
export const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const specialtyDetail = {
  'Family & Primary Care': {
    lead: 'Primary care runs on volume, so a small coding habit repeated across hundreds of visits is what quietly erodes collections.',
    handles: [
      ['E/M levels that match the note', 'Visit levels selected from what the documentation actually supports, rather than defaulting to a familiar code.'],
      ['Preventive and problem visits', 'Annual wellness and preventive services billed alongside problem-oriented care, with the modifiers that keep both payable.'],
      ['Chronic care management', 'Care management and remote monitoring time tracked against each program\'s monthly requirements.'],
      ['Immunizations', 'Vaccine products and their administration coded as the separate charges they are.'],
    ],
    pitfalls: [
      'A preventive visit and a problem visit on the same day, billed without modifier 25.',
      'Medicare annual wellness visits treated as routine physicals, which are not a covered benefit.',
      'Visit levels downcoded out of caution, giving away revenue the note already supports.',
    ],
  },

  'Internal Medicine': {
    lead: 'Internal medicine claims are dense with chronic conditions, and payers reimburse according to how completely those conditions are documented.',
    handles: [
      ['Chronic condition coding', 'Conditions coded to the specificity the note supports, rather than defaulting to unspecified codes.'],
      ['Annual wellness visits', 'Preventive visits and the counselling delivered inside them captured separately.'],
      ['Time or decision-making', 'E/M selected on whichever basis fits the encounter, with the supporting detail in place.'],
      ['In-office diagnostics', 'Tests performed in the practice billed with the correct professional and technical split.'],
    ],
    pitfalls: [
      'Unspecified diagnosis codes used where the record supports a more specific one.',
      'Prolonged service time billed without the time statement payers require.',
      'Chronic conditions documented but never coded, so risk-adjusted payments fall short.',
    ],
  },

  'Behavioral Health': {
    lead: 'Behavioral health billing turns on time, authorization and session limits — three things payers check closely and deny quickly.',
    handles: [
      ['Session time codes', 'Therapy codes matched to the session length the note evidences.'],
      ['Authorization tracking', 'Authorizations obtained and monitored so sessions are not delivered outside them.'],
      ['Session limits', 'Counts tracked against each plan\'s annual or benefit-period limit.'],
      ['Telehealth', 'Place-of-service codes and modifiers applied to the payer\'s current telehealth rules.'],
    ],
    pitfalls: [
      'Sessions delivered after an authorization lapsed, which are rarely recoverable on appeal.',
      'Time-based codes billed where the note records no start and end time.',
      'Intake assessments billed as therapy sessions.',
    ],
  },

  'Psychiatry': {
    lead: 'Psychiatric claims combine medication management with psychotherapy add-ons, and payers expect the two to be documented as separate work.',
    handles: [
      ['Medication management', 'E/M visits for pharmacological management, coded on decision-making.'],
      ['Psychotherapy add-ons', 'Add-on codes billed alongside E/M with the time documented separately.'],
      ['Telepsychiatry', 'Modifiers and place-of-service kept current as payer rules change.'],
      ['Collaborative care', 'Monthly collaborative care codes where the practice operates that model.'],
    ],
    pitfalls: [
      'Psychotherapy add-ons billed without therapy time recorded apart from the E/M work.',
      'Interactive complexity added where the note does not establish it.',
      'Extended or intensive treatment delivered before authorization is confirmed.',
    ],
  },

  'Cardiology': {
    lead: 'Cardiology billing hinges on splitting professional and technical components correctly, and on catching device charges that never reach the claim.',
    handles: [
      ['Component splits', 'Diagnostics billed globally or split by component according to where the service was performed.'],
      ['Device and remote monitoring', 'Device checks and remote monitoring billed within each payer\'s frequency rules.'],
      ['Procedural coding', 'Catheterization and intervention coding, including the supplies and contrast involved.'],
      ['Stress testing', 'Supervision, interpretation and tracing components billed appropriately.'],
    ],
    pitfalls: [
      'Global billing used in a facility setting where only the professional component is payable.',
      'Remote monitoring billed more often than the frequency limit allows.',
      'Diagnostic studies submitted without an indication that supports medical necessity.',
    ],
  },

  'Orthopedics': {
    lead: 'Orthopedic revenue leaks in two predictable places: visits inside a surgical global period, and equipment handed to the patient but never billed.',
    handles: [
      ['Global period tracking', 'Post-operative periods tracked so related visits are not billed in error, and unrelated ones are not missed.'],
      ['Staged and related procedures', 'Modifiers 58, 78 and 79 applied to return visits to theatre.'],
      ['Durable medical equipment', 'Braces, supports and supplies dispensed in office, billed with their documentation.'],
      ['Fracture care', 'Billed globally or itemized, depending on what the payer and the episode require.'],
    ],
    pitfalls: [
      'Unrelated care inside a global period billed without modifier 24, so it is denied as included.',
      'Bracing and supplies dispensed at the visit and never charged at all.',
      'Assistant surgeon claims filed without the documentation the payer requires.',
    ],
  },

  'Physical Therapy': {
    lead: 'Therapy billing is measured in minutes. Unit calculations and progress-note timing decide whether a claim is paid, or recouped a year later.',
    handles: [
      ['Timed units', 'Units calculated from documented treatment minutes under the eight-minute rule.'],
      ['Therapy thresholds', 'The KX modifier applied where continued care is justified and documented.'],
      ['Plan of care', 'Certifications and re-certifications obtained before they expire.'],
      ['Progress reporting', 'Progress notes scheduled to each payer\'s required interval.'],
    ],
    pitfalls: [
      'More units billed than the recorded treatment minutes support — the most common audit finding in therapy.',
      'Modifier 59 applied to code pairs that do not warrant separate reporting.',
      'Treatment continuing past an expired certification, making the whole period unpayable.',
    ],
  },

  'Chiropractic': {
    lead: 'Chiropractic is among the most closely reviewed specialties in billing. Active treatment has to be evidenced on every single claim.',
    handles: [
      ['Manipulation coding', 'Spinal manipulation coded by the number of regions actually treated.'],
      ['Active treatment', 'The AT modifier applied only where care is corrective rather than maintenance.'],
      ['Examinations', 'Initial and periodic examinations billed alongside manipulation where separately justified.'],
      ['Medicare rules', 'The specific documentation Medicare requires for chiropractic claims.'],
    ],
    pitfalls: [
      'Maintenance care billed as active treatment, which is the central chiropractic audit risk.',
      'Examinations billed with manipulation but without modifier 25.',
      'Treatment plans that do not show measurable functional improvement over time.',
    ],
  },

  'Dermatology': {
    lead: 'Dermatology claims turn on lesion detail — how many, what size, and whether the service was medical or cosmetic.',
    handles: [
      ['Lesion procedures', 'Biopsies, excisions and destructions coded by method, size and site.'],
      ['Mohs surgery', 'Stages and specimen counts coded as performed.'],
      ['Pathology', 'Professional and technical pathology components billed correctly.'],
      ['Cosmetic separation', 'Cosmetic work kept clearly apart from medically necessary care.'],
    ],
    pitfalls: [
      'Excision size taken from the pathology specimen rather than the pre-excision measurement, which understates the code.',
      'Multiple lesions treated in one visit but billed without the modifiers that keep each payable.',
      'Cosmetic services submitted to insurance.',
    ],
  },

  'Gastroenterology': {
    lead: 'The screening-versus-diagnostic distinction decides what the patient pays, so getting it wrong produces complaints as well as denials.',
    handles: [
      ['Screening and diagnostic', 'Colonoscopy coded under whichever set of rules applies to the encounter.'],
      ['Modifier PT and 33', 'Applied when a screening becomes diagnostic, protecting the patient\'s preventive benefit.'],
      ['Facility coordination', 'Professional, facility and anesthesia claims kept consistent with one another.'],
      ['Polypectomy technique', 'Coded by the removal method documented.'],
    ],
    pitfalls: [
      'A screening that found a polyp billed as purely diagnostic, wrongly shifting cost to the patient.',
      'Surveillance procedures billed sooner than the coverage interval allows.',
      'Missed modifiers that would have preserved preventive coverage.',
    ],
  },

  'Urgent Care': {
    lead: 'Urgent care is high-volume work with a wide service mix. The margin sits in billing everything that was delivered, quickly.',
    handles: [
      ['Visit levels', 'Levels supported by the presentation and the work documented.'],
      ['On-site testing', 'Point-of-care tests billed with attention to CLIA-waived status.'],
      ['Procedures', 'Laceration repair, splinting, foreign body removal and similar office procedures.'],
      ['Contract codes', 'S-codes and per-visit rates where a payer contract requires them.'],
    ],
    pitfalls: [
      'Procedures performed and documented but never charged, which is easy to miss at volume.',
      'Visit levels applied from habit rather than from the note.',
      'Claims filed under the wrong place of service for the contract in force.',
    ],
  },

  'Pediatrics': {
    lead: 'Pediatric billing combines well-child schedules with vaccine administration rules and, usually, a heavy Medicaid mix.',
    handles: [
      ['Well-child visits', 'Billed against the recommended periodicity schedule for each age.'],
      ['Immunizations', 'Vaccine products and administration coded separately, including multi-component vaccines.'],
      ['Screening instruments', 'Developmental, autism and behavioral screening billed where performed.'],
      ['Medicaid and CHIP', 'State-specific program requirements applied.'],
    ],
    pitfalls: [
      'Administration codes under-billed on multi-component vaccines.',
      'A sick complaint addressed at a well visit but billed without modifier 25.',
      'State-supplied vaccine stock billed as though the practice had purchased it.',
    ],
  },

  'OB/GYN': {
    lead: 'Maternity care is billed as a package months after the work begins, so any gap in tracking is a gap in payment.',
    handles: [
      ['Global maternity', 'Packages tracked from the first antenatal visit through postpartum care.'],
      ['Split and transferred care', 'Antenatal visits itemized when a patient changes provider or plan mid-pregnancy.'],
      ['Deliveries', 'Coded by method, including multiple births and conversions.'],
      ['Gynecology', 'Office procedures, diagnostics and surgical care alongside obstetric work.'],
    ],
    pitfalls: [
      'A global package billed where the patient changed plan or provider mid-care, so most of it is denied.',
      'High-risk visits beyond the package\'s included count never billed separately.',
      'Postpartum care omitted from the global claim.',
    ],
  },

  'Urology': {
    lead: 'Urology mixes office procedures with drug administration, and both carry unit rules that are easy to miss on a busy list.',
    handles: [
      ['Office procedures', 'Cystoscopy, urodynamics and similar in-office work.'],
      ['Drug administration', 'Units billed by the code\'s definition, with wastage documented.'],
      ['Imaging', 'Diagnostic imaging and its professional component.'],
      ['Surgical care', 'Procedures and their global periods tracked.'],
    ],
    pitfalls: [
      'Drugs billed by vial rather than by the unit the code defines.',
      'Wastage administered but not documented, so it is not reimbursed.',
      'Same-day diagnostics bundled into a procedure without the modifier that would separate them.',
    ],
  },

  'Pain Management': {
    lead: 'Pain management is authorization-heavy and frequency-limited. Sequencing the paperwork correctly is most of the billing job.',
    handles: [
      ['Injections and blocks', 'Coded by level, approach and laterality.'],
      ['Imaging guidance', 'Billed where separately payable, and not where it is bundled.'],
      ['Prior authorization', 'Obtained before the procedure is scheduled, not after.'],
      ['Frequency tracking', 'Repeat procedures monitored against each payer\'s limits.'],
    ],
    pitfalls: [
      'Procedures performed before authorization is confirmed, which payers rarely pay retrospectively.',
      'Guidance billed separately where the procedure code already includes it.',
      'Repeat injections exceeding the allowed frequency for the period.',
    ],
  },

  'Podiatry': {
    lead: 'Routine foot care is excluded by most payers unless a qualifying systemic condition is documented. That one rule drives most podiatry denials.',
    handles: [
      ['Routine foot care', 'Billed with the qualifying diagnosis and class findings modifiers that make it payable.'],
      ['Wound care', 'Debridement coded by depth and documented surface area.'],
      ['Diabetic footwear', 'Shoes and inserts billed with the certifying statement on file.'],
      ['Nail procedures', 'Procedural nail care distinguished from routine trimming.'],
    ],
    pitfalls: [
      'Routine care billed without the systemic condition that makes it a covered service.',
      'Debridement coded by site rather than by the area actually documented.',
      'Diabetic shoe claims filed before the certifying physician statement is obtained.',
    ],
  },

  'Neurology': {
    lead: 'Neurodiagnostic studies split into professional and technical components, and the number billed must match the number the report supports.',
    handles: [
      ['Neurodiagnostics', 'EEG, EMG and nerve conduction studies coded by the counts performed.'],
      ['Component splits', 'Professional and technical components billed according to setting.'],
      ['Long-term monitoring', 'Time-based monitoring coded to its recorded duration.'],
      ['Injectable therapies', 'Botulinum toxin and similar drugs billed with units and wastage.'],
    ],
    pitfalls: [
      'More nerve conduction studies billed than the report documents.',
      'Global billing in a facility where only the professional component is payable.',
      'Bilateral studies billed without the modifiers that make both sides payable.',
    ],
  },

  'Ophthalmology': {
    lead: 'Ophthalmology carries two parallel code sets and two kinds of payer. Choosing wrongly between them is the specialty\'s most common billing error.',
    handles: [
      ['Eye codes and E/M', 'Whichever set fits the encounter and pays appropriately for the work done.'],
      ['Medical versus vision', 'Claims routed to the medical or routine vision plan according to the reason for the visit.'],
      ['Diagnostic imaging', 'Imaging billed within its coverage frequency limits.'],
      ['Intravitreal injections', 'Drug units, wastage and the injection procedure billed together.'],
    ],
    pitfalls: [
      'A medical eye condition submitted to a routine vision plan, or a refraction submitted as medical.',
      'Imaging repeated more often than coverage policy allows.',
      'Post-operative visits billed inside a surgical global period.',
    ],
  },

  'Laboratory': {
    lead: 'Laboratory billing is high-volume and thin-margin, so screening for medical necessity before submission matters far more than appealing afterwards.',
    handles: [
      ['Panel coding', 'Panels billed as panels where a panel code exists.'],
      ['Medical necessity', 'Orders checked against coverage policy before the claim goes out.'],
      ['Patient notices', 'Advance beneficiary notices issued where coverage is unlikely.'],
      ['Volume processing', 'High-volume electronic submission with reconciliation.'],
    ],
    pitfalls: [
      'Component tests billed individually where a panel code exists, which payers treat as unbundling.',
      'Tests performed without a diagnosis on the order that supports them.',
      'Repeat or distinct specimens billed without the modifiers that distinguish them.',
    ],
  },

  'Home Health': {
    lead: 'Home health is paid by episode rather than by visit, and the certification paperwork decides whether the episode is payable at all.',
    handles: [
      ['Episode billing', 'Periods billed with correct start and end dates.'],
      ['Face-to-face encounters', 'Documentation obtained and retained before billing.'],
      ['Certifications', 'Plan-of-care certifications and re-certifications tracked to their deadlines.'],
      ['Visit documentation', 'Visit records kept aligned with the episode billed.'],
    ],
    pitfalls: [
      'Episodes billed without the face-to-face encounter documented, which voids payment entirely.',
      'A re-certification missed, ending payability part-way through care.',
      'Visit notes that do not support the level of care billed for the period.',
    ],
  },
};

/** Every specialty gets a slug-keyed record; used by the build and the pages. */
export function specialtyPages(names) {
  return names.map((name) => {
    const detail = specialtyDetail[name];
    if (!detail) {
      throw new Error(
        `specialtydetail.js has no entry for "${name}". Add one, or remove it from specialties in data.js.`
      );
    }
    return { name, slug: slugify(name), ...detail };
  });
}
