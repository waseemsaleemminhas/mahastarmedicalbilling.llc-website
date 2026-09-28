// Animated service illustrations. Each one acts out what the service does:
// a claim being filled in and paid, a denial turned into an approval, and so on.
// Every shape's resting state is the finished picture, so the icon still reads
// correctly when animation is off (reduced motion) or before it starts.
// Animation runs while the card is on screen (.is-live, set in site.js) and on hover.

const art = {
  // Claim lines fill in, then the payment coin drops onto the claim.
  'medical-billing': `
    <path class="m" d="M16 7h21l11 11v36a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3z"/>
    <path class="m" d="M37 7v11h11"/>
    <path class="a" d="M22 14v9M17.5 18.5h9"/>
    <path class="a draw d1" pathLength="1" d="M19 31h22"/>
    <path class="m draw d2" pathLength="1" d="M19 38h18"/>
    <path class="m draw d3" pathLength="1" d="M19 45h12"/>
    <g class="pop">
      <circle class="coin" cx="46" cy="48" r="10"/>
      <text class="coin-t" x="46" y="53.5" text-anchor="middle">$</text>
    </g>`,

  // A scan line reads the chart, the brackets snap shut, the review badge confirms.
  'medical-coding': `
    <rect class="m" x="9" y="10" width="42" height="29" rx="3"/>
    <path class="m" d="M4 45h52l-3 6H7z"/>
    <rect class="scan" x="11" y="12" width="38" height="4" rx="2"/>
    <path class="m nudge-l" d="M25 19l-6 6 6 6"/>
    <path class="m nudge-r" d="M35 19l6 6-6 6"/>
    <path class="a blink" d="M32 17l-4 16"/>
    <g class="pop">
      <circle class="coin" cx="50" cy="44" r="9"/>
      <path class="coin-s" d="M50 39.5v9M45.5 44h9"/>
    </g>`,

  // The cycle turns while each stage lights up in order: eligibility, claim, payment, collected.
  'revenue-cycle-management': `
    <g class="spin">
      <path class="m" d="M13 30a19 19 0 0 1 33-12"/>
      <path class="m" d="M47 11v8h-8"/>
      <path class="m" d="M51 34a19 19 0 0 1-33 12"/>
      <path class="m" d="M17 53v-8h8"/>
    </g>
    <circle class="step s1" cx="32" cy="8" r="3"/>
    <circle class="step s2" cx="56" cy="32" r="3"/>
    <circle class="step s3" cx="32" cy="56" r="3"/>
    <circle class="step s4" cx="8" cy="32" r="3"/>
    <g class="beat">
      <circle class="coin" cx="32" cy="32" r="11"/>
      <text class="coin-t" x="32" y="37.5" text-anchor="middle">$</text>
    </g>`,

  // A denied claim (red X) is worked and flips to approved (check).
  'denial-management': `
    <path class="m" d="M30 6l19 7v15c0 12.5-8 21.5-19 26.5C19 49.5 11 40.5 11 28V13z"/>
    <path class="deny" d="M24 23l12 12M36 23L24 35"/>
    <path class="a draw-check" pathLength="1" d="M22 29.5l6 6 11-12"/>
    <g class="pop">
      <circle class="coin" cx="48" cy="48" r="10"/>
      <circle class="coin-f" cx="48" cy="45" r="3"/>
      <path class="coin-s" d="M42.5 53.5a5.5 5.5 0 0 1 11 0"/>
    </g>`,

  // Aging balances shrink back into cash: bars grow, the trend arrow climbs.
  'ar-recovery': `
    <path class="m" d="M8 7v47h49"/>
    <rect class="bar b1" x="14" y="42" width="8" height="12" rx="1.5"/>
    <rect class="bar b2" x="27" y="34" width="8" height="20" rx="1.5"/>
    <rect class="bar b3" x="40" y="24" width="8" height="30" rx="1.5"/>
    <path class="a draw-trend" pathLength="1" d="M12 36l12-9 9 5 17-18"/>
    <path class="a arrow-in" d="M43 14h7v7"/>`,

  // Details are filled in on the provider card, then the approval seal stamps down.
  'credentialing': `
    <rect class="m" x="5" y="11" width="44" height="32" rx="4"/>
    <circle class="m" cx="17" cy="24" r="5"/>
    <path class="m" d="M9.5 37a7.5 7.5 0 0 1 15 0"/>
    <path class="a draw d1" pathLength="1" d="M30 22h13"/>
    <path class="m draw d2" pathLength="1" d="M30 29h11"/>
    <path class="m draw d3" pathLength="1" d="M30 36h8"/>
    <g class="stamp">
      <circle class="coin" cx="48" cy="47" r="10"/>
      <path class="coin-s" d="M43.5 47l3 3 6-6.5"/>
    </g>`,

  // The magnifier sweeps the billing and flags the line where revenue leaks.
  'practice-audit': `
    <rect class="m" x="7" y="5" width="34" height="46" rx="3"/>
    <path class="m" d="M13 14h22M13 22h22M13 38h22"/>
    <rect class="flag" x="11" y="27" width="26" height="6" rx="2"/>
    <path class="m" d="M13 30h22"/>
    <g class="sweep">
      <circle class="lens" cx="40" cy="38" r="9"/>
      <path class="m" d="M46.5 44.5l9 9"/>
    </g>`,
};

export function serviceArt(slug, fallback = '') {
  const body = art[slug];
  if (!body) return fallback;
  return `<svg class="svc-art svc-${slug}" viewBox="0 0 64 64" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
