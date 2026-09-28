// Animated specialty illustrations, drawn in the same style as the service
// icons (src/serviceicons.js) and sharing their colour and motion classes.
// Resting state is always the finished picture; motion runs while on screen.

const heart = (x, y, cls = 'coin') =>
  `<path class="${cls}" d="M${x} ${y + 9}s-7.5-4.4-7.5-9.4a3.9 3.9 0 0 1 7.5-1.5 3.9 3.9 0 0 1 7.5 1.5c0 5-7.5 9.4-7.5 9.4z"/>`;

const art = {
  // A family together; the heart above them beats.
  'Family & Primary Care': `
    <circle class="m" cx="19" cy="25" r="5"/><path class="m" d="M10 46a9 9 0 0 1 18 0"/>
    <circle class="m" cx="45" cy="25" r="5"/><path class="m" d="M36 46a9 9 0 0 1 18 0"/>
    <circle class="a" cx="32" cy="36" r="4"/><path class="a" d="M25.5 53a6.5 6.5 0 0 1 13 0"/>
    <g class="beat">${heart(32, 6)}</g>`,

  // Stethoscope; the chest piece sends out a listening ripple.
  'Internal Medicine': `
    <path class="m" d="M14 8h6M34 8h6M17 8v12a10 10 0 0 0 20 0V8"/>
    <path class="m" d="M27 30v8a11 11 0 0 0 22 0v-3"/>
    <circle class="ripple" cx="49" cy="29" r="6"/>
    <g class="beat"><circle class="coin" cx="49" cy="29" r="6"/><circle class="coin-f" cx="49" cy="29" r="2"/></g>`,

  // A person in profile with a steady heart inside.
  'Behavioral Health': `
    <path class="m" d="M24 57v-8c-7-3.5-11-9.5-11-17.5C13 20 22 11 33 11c10.5 0 18 7.5 18 17l4.5 8H51v6a4 4 0 0 1-4 4h-6v11"/>
    <g class="beat">${heart(31, 23)}</g>`,

  // A brain whose four regions light up in turn.
  'Psychiatry': `
    <path class="m" d="M32 13c-3-3.5-9.5-3.5-11.5 1-5 0-8.5 5-6.5 9.5-4.5 3-4.5 9.5 0 12.5-1 5 3 9.5 8.5 9 2 4.5 7.5 5.5 9.5 2"/>
    <path class="m" d="M32 13c3-3.5 9.5-3.5 11.5 1 5 0 8.5 5 6.5 9.5 4.5 3 4.5 9.5 0 12.5 1 5-3 9.5-8.5 9-2 4.5-7.5 5.5-9.5 2"/>
    <path class="m" d="M32 13v34M32 47v9"/>
    <circle class="step s1" cx="23" cy="24" r="3"/><circle class="step s2" cx="41" cy="24" r="3"/>
    <circle class="step s3" cx="41" cy="36" r="3"/><circle class="step s4" cx="23" cy="36" r="3"/>`,

  // Heart with an ECG trace running across it.
  'Cardiology': `
    <g class="beat"><path class="m" d="M32 55S9 41 9 24.5a11.5 11.5 0 0 1 23-5 11.5 11.5 0 0 1 23 5C55 41 32 55 32 55z"/></g>
    <path class="a draw" pathLength="1" d="M4 33h13l4-8 6 16 5-13 3 5h25"/>`,

  // A bone that rocks gently; a healing plus pops beside it.
  'Orthopedics': `
    <g transform="rotate(-40 32 34)"><g class="wiggle">
      <circle class="fill-m" cx="17" cy="29" r="5"/><circle class="fill-m" cx="17" cy="39" r="5"/>
      <circle class="fill-m" cx="47" cy="29" r="5"/><circle class="fill-m" cx="47" cy="39" r="5"/>
      <rect class="fill-m" x="17" y="30" width="30" height="8" rx="2"/>
    </g></g>
    <path class="a pop" d="M51 5v10M46 10h10"/>`,

  // A dumbbell being lifted, with the effort arrow.
  'Physical Therapy': `
    <g class="bob">
      <path class="m" d="M20 34h24"/>
      <rect class="m" x="9" y="24" width="7" height="20" rx="2"/><rect class="m" x="48" y="24" width="7" height="20" rx="2"/>
      <rect class="a" x="16" y="28" width="4" height="12" rx="1"/><rect class="a" x="44" y="28" width="4" height="12" rx="1"/>
    </g>
    <path class="a arrow-up" d="M32 18V6M27 11l5-5 5 5"/>
    <path class="m" d="M14 56h36"/>`,

  // A spine; each vertebra is highlighted from top to bottom.
  'Chiropractic': `
    <rect class="m vert v1" x="25" y="5" width="14" height="8" rx="3"/>
    <rect class="m vert v2" x="27" y="16" width="14" height="8" rx="3"/>
    <rect class="m vert v3" x="28" y="27" width="14" height="8" rx="3"/>
    <rect class="m vert v4" x="27" y="38" width="14" height="8" rx="3"/>
    <rect class="m vert v5" x="24" y="49" width="14" height="8" rx="3"/>
    <path class="a" d="M17 10c-3 10 3 22-1 42M48 12c3 9-2 24 1 38"/>`,

  // A drop of care for the skin, with sparkles.
  'Dermatology': `
    <path class="m" d="M30 8C22 20 14 29 14 38a16 16 0 0 0 32 0c0-9-8-18-16-30z"/>
    <path class="a" d="M22 40a8 8 0 0 0 8 8"/>
    <path class="a twinkle" d="M51 7v12M45 13h12"/>
    <path class="a twinkle t2" d="M54 30v7M50.5 33.5h7"/>`,

  // Stomach outline with digestion moving through it.
  'Gastroenterology': `
    <path class="m" d="M24 5v10c0 5-9 8-9 20 0 11.5 8.5 20 20 20 11 0 19-8 19-18.5C54 27 48 22.5 41 22.5c-6.5 0-9.5 4.5-9.5 9.5 0 3.5-2.5 5.5-5.5 5.5"/>
    <path class="a draw" pathLength="1" d="M24 45c5 3.5 12 3.5 17-1"/>
    <path class="m" d="M47 50l5 7"/>`,

  // An emergency light, flashing.
  'Urgent Care': `
    <path class="m" d="M20 45V33a12 12 0 0 1 24 0v12"/>
    <rect class="m" x="14" y="45" width="36" height="9" rx="2"/>
    <circle class="coin flash" cx="32" cy="35" r="4.5"/>
    <path class="a flash f2" d="M32 5v6M13 13l4.5 4.5M51 13l-4.5 4.5M6 31h6M58 31h-6"/>`,

  // A friendly teddy bear that tilts its head.
  'Pediatrics': `
    <g class="wiggle">
      <circle class="m" cx="17" cy="19" r="6"/><circle class="m" cx="47" cy="19" r="6"/>
      <circle class="m node" cx="32" cy="34" r="17"/>
      <circle class="fill-m" cx="25.5" cy="31" r="2"/><circle class="fill-m" cx="38.5" cy="31" r="2"/>
      <ellipse class="coin" cx="32" cy="41" rx="6.5" ry="5"/>
      <circle class="coin-f" cx="32" cy="39.5" r="1.6"/>
    </g>`,

  // Women's health symbol with a heart beating at its centre.
  'OB/GYN': `
    <circle class="m" cx="32" cy="25" r="17"/>
    <path class="m" d="M32 42v16M25 51h14"/>
    <g class="beat">${heart(32, 19)}</g>`,

  // Kidneys, with flow running down the ureters.
  'Urology': `
    <path class="m" d="M23 8c-8.5 0-13 8.5-13 18s4.5 19 13 19c4.5 0 6.5-3.5 6.5-7s-3.5-5.5-3.5-12 3.5-8 3.5-11.5S27.5 8 23 8z"/>
    <path class="m" d="M41 8c8.5 0 13 8.5 13 18s-4.5 19-13 19c-4.5 0-6.5-3.5-6.5-7s3.5-5.5 3.5-12-3.5-8-3.5-11.5S36.5 8 41 8z"/>
    <path class="a draw d1" pathLength="1" d="M28 36c2.5 6 4 10 4 20"/>
    <path class="a draw d2" pathLength="1" d="M36 36c-2.5 6-4 10-4 20"/>`,

  // Pain eased: calming ripples spread and the pain bolt fades.
  'Pain Management': `
    <circle class="ripple" cx="32" cy="32" r="12"/>
    <circle class="m" cx="32" cy="32" r="20"/>
    <path class="a fade" d="M35 17l-10 17h8l-3 13 11-18h-8z"/>`,

  // A footprint; the toes tap in one after another.
  'Podiatry': `
    <path class="m" d="M30 25c8 0 13 6 13 14 0 9-4 11-4 16.5 0 4.5-3.5 7.5-8.5 7.5S21 59 21 53c0-10 1.5-12 1.5-18 0-6 2.5-10 7.5-10z"/>
    <circle class="coin toe s1" cx="22" cy="15" r="4"/>
    <circle class="coin toe s2" cx="30.5" cy="10.5" r="3.4"/>
    <circle class="coin toe s3" cx="38" cy="11.5" r="3"/>
    <circle class="coin toe s4" cx="43.5" cy="16" r="2.6"/>
    <circle class="coin toe s5" cx="46.5" cy="22" r="2.2"/>`,

  // A neural network with signals travelling to the centre.
  'Neurology': `
    <path class="m" d="M15 15L32 32M49 13L32 32M13 50L32 32M51 51L32 32"/>
    <path class="sig" pathLength="1" d="M15 15L32 32"/>
    <path class="sig g2" pathLength="1" d="M49 13L32 32"/>
    <path class="sig g3" pathLength="1" d="M51 51L32 32"/>
    <path class="sig g4" pathLength="1" d="M13 50L32 32"/>
    <circle class="m node" cx="15" cy="15" r="5"/><circle class="m node" cx="49" cy="13" r="5"/>
    <circle class="m node" cx="13" cy="50" r="5"/><circle class="m node" cx="51" cy="51" r="5"/>
    <g class="beat"><circle class="coin" cx="32" cy="32" r="7"/></g>`,

  // An eye that looks around and blinks.
  'Ophthalmology': `
    <g class="lid">
      <path class="m" d="M4 32s10-16 28-16 28 16 28 16-10 16-28 16S4 32 4 32z"/>
      <g class="look"><circle class="a" cx="32" cy="32" r="8.5"/><circle class="fill-m" cx="32" cy="32" r="3.5"/></g>
    </g>`,

  // A lab flask with bubbles rising.
  'Laboratory': `
    <path class="liquid" d="M19.5 42h25l5.5 10a2 2 0 0 1-1.8 3H15.8a2 2 0 0 1-1.8-3z"/>
    <path class="m" d="M25 7h14M28 7v17L13.5 51a4 4 0 0 0 3.5 6h30a4 4 0 0 0 3.5-6L36 24V7"/>
    <circle class="a rise" cx="28" cy="47" r="2"/>
    <circle class="a rise r2" cx="36" cy="49" r="1.6"/>
    <circle class="a rise r3" cx="32" cy="41" r="1.4"/>`,

  // Care delivered at home: the medical cross pulses in the house.
  'Home Health': `
    <path class="m" d="M7 30L32 9l25 21"/>
    <path class="m" d="M14 25v30h36V25"/>
    <g class="beat">
      <rect class="coin" x="23" y="31" width="18" height="18" rx="4"/>
      <path class="coin-s" d="M32 35v10M27 40h10"/>
    </g>`,
};

export function specialtyArt(name, fallback = '') {
  const body = art[name];
  if (!body) return fallback;
  return `<svg class="svc-art" viewBox="0 0 64 64" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
