// Animated illustrations for the "How it works" timeline. Each one acts out its
// stage: the A/R being read, the BAA stamped before access, the claim cycle
// turning, the month closing out. They share the `.svc-art` class vocabulary
// (see styles.css) so colour, drawing and timing behave exactly like the
// service icons — and, as there, every shape's resting state is the finished
// picture, so the art still reads with animation off or before it starts.

const art = {
  // The A/R report is read line by line, then the lens finds the trend in it.
  consultation: `
    <rect class="m" x="7" y="9" width="33" height="45" rx="4"/>
    <path class="a draw d1" pathLength="1" d="M14 21h19"/>
    <path class="m draw d2" pathLength="1" d="M14 29h15"/>
    <path class="m draw d3" pathLength="1" d="M14 37h10"/>
    <g class="beat">
      <circle class="lens" cx="42" cy="37" r="13"/>
      <path class="a draw-trend" pathLength="1" d="M36 41l4-5 3 3 5-7"/>
    </g>
    <path class="m" d="M51 46l6 6"/>`,

  // The workflow is written down, then the signed BAA lands on it — before access.
  onboarding: `
    <rect class="m" x="10" y="11" width="32" height="43" rx="4"/>
    <path class="m" d="M20 11a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3H20z"/>
    <path class="a draw d1" pathLength="1" d="M17 27h18"/>
    <path class="m draw d2" pathLength="1" d="M17 35h14"/>
    <path class="m draw d3" pathLength="1" d="M17 43h10"/>
    <g class="stamp">
      <path class="shield" d="M45 24l12 4.5v8.5c0 7.5-12 13-12 13s-12-5.5-12-13v-8.5z"/>
      <path class="shield-check draw-check" pathLength="1" d="M39.5 36.5l4 4 7-7.5"/>
    </g>`,

  // The cycle turns; the claim it carries is paid.
  billing: `
    <g class="spin">
      <path class="m" d="M12 32a20 20 0 0 1 33-14"/>
      <path class="m" d="M46 11v8h-8"/>
      <path class="m" d="M52 32a20 20 0 0 1-33 14"/>
      <path class="m" d="M18 53v-8h8"/>
    </g>
    <g class="pop">
      <circle class="coin" cx="32" cy="32" r="12"/>
      <text class="coin-t" x="32" y="37.5" text-anchor="middle">$</text>
    </g>`,

  // The month closes: collections build, the trend line is drawn over them.
  reporting: `
    <rect class="m" x="6" y="11" width="52" height="42" rx="4"/>
    <path class="m" d="M6 21h52"/>
    <circle class="step s2" cx="13" cy="16" r="1.8"/>
    <circle class="step s3" cx="20" cy="16" r="1.8"/>
    <rect class="bar" x="16" y="36" width="8" height="11" rx="2"/>
    <rect class="bar b2" x="28" y="32" width="8" height="15" rx="2"/>
    <rect class="bar b3" x="40" y="28" width="8" height="19" rx="2"/>
    <path class="a draw-trend" pathLength="1" d="M16 34l12-4 12-5"/>
    <path class="m" d="M12 47h40"/>`,
};

export function processArt(key, fallback = '') {
  const body = art[key];
  if (!body) return fallback;
  return `<svg class="svc-art step-art step-art-${key}" viewBox="0 0 64 64" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
