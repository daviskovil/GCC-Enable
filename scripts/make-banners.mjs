/**
 * Generates 1600×640 blog banners in the brand style (no text, so no font issues).
 * Usage: node scripts/make-banners.mjs            → all banners below
 *        node scripts/make-banners.mjs <slug>     → one banner
 * Output: src/assets/blog/<slug>/banner.png
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const nodes = require('lucide-static/icon-nodes.json');
const root = path.resolve(import.meta.dirname, '..');

const NAVY = '#0F2A4A';
const NAVY7 = '#1A3A5F';
const SAFFRON = '#F5A623';
const TEAL = '#1F8A8A';
const LINE = '#E4E7EC';
const SLATE = '#5B6675';

/** Lucide icon as SVG markup at (x, y) with size s */
const icon = (name, x, y, s, color = TEAL, sw = 2) => {
  const inner = nodes[name]
    .map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`)
    .join('');
  return `<g transform="translate(${x} ${y}) scale(${s / 24})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
};

const defs = `
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7F8FA"/><stop offset="1" stop-color="#EDF0F4"/></linearGradient>
  <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="${NAVY}" opacity="0.10"/></pattern>
  <linearGradient id="navy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${NAVY7}"/><stop offset="1" stop-color="${NAVY}"/></linearGradient>
  <filter id="sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="${NAVY}" flood-opacity="0.14"/></filter>
</defs>
<rect width="1600" height="640" fill="url(#bg)"/>
<rect width="1600" height="640" fill="url(#dots)"/>`;

/** White card with a big icon tile and two text bars */
const card = (x, y, w, h, iconName, { progress = 0.7, check = false } = {}) => `
  <g filter="url(#sh)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#fff"/></g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="none" stroke="${LINE}"/>
  <rect x="${x + 24}" y="${y + 24}" width="56" height="56" rx="14" fill="${TEAL}" opacity="0.13"/>
  ${icon(iconName, x + 36, y + 36, 32)}
  <rect x="${x + 96}" y="${y + 32}" width="${w - 140}" height="12" rx="6" fill="${NAVY}" opacity="0.8"/>
  <rect x="${x + 96}" y="${y + 56}" width="${(w - 140) * 0.6}" height="10" rx="5" fill="${SLATE}" opacity="0.35"/>
  ${
    h > 120
      ? `<rect x="${x + 24}" y="${y + h - 40}" width="${w - 48}" height="10" rx="5" fill="${LINE}"/>
         <rect x="${x + 24}" y="${y + h - 40}" width="${(w - 48) * progress}" height="10" rx="5" fill="${TEAL}"/>`
      : ''
  }
  ${check ? `<circle cx="${x + w - 26}" cy="${y + 26}" r="14" fill="${TEAL}"/><path d="M${x + w - 33} ${y + 26} l5 5 l10 -11" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
`;

const person = (cx, cy, r, color, opacity = 1) => `
  <g opacity="${opacity}">
    <circle cx="${cx}" cy="${cy - r * 0.55}" r="${r * 0.42}" fill="${color}"/>
    <path d="M${cx - r * 0.8} ${cy + r * 0.85} a${r * 0.8} ${r * 0.8} 0 0 1 ${r * 1.6} 0 z" fill="${color}"/>
  </g>`;

const motifs = {
  /** Manager in the middle of a team, linked up to HQ */
  tiers: (ic) => `
    ${[0, 1, 2, 3, 4, 5].map((i) => person(1000 + i * 90, 470, 34, TEAL, 0.55)).join('')}
    ${[0, 1].map((i) => person(1135 + i * 180, 330, 44, TEAL, 0.9)).join('')}
    ${person(1225, 190, 50, NAVY)}
    <path d="M1225 250 L1135 290 M1225 250 L1315 290 M1135 385 L1045 430 M1135 385 L1135 430 M1135 385 L1225 430 M1315 385 L1270 430 M1315 385 L1360 430 M1315 385 L1450 430" stroke="${NAVY}" stroke-width="3" opacity="0.25"/>
    <circle cx="1270" cy="148" r="14" fill="${SAFFRON}"/>
    ${card(170, 160, 460, 170, ic, { progress: 0.45 })}
    ${card(260, 370, 400, 110, 'message-square', {})}`,

  /** Onboarding journey: door to desk along a path */
  journey: (ic) => `
    <path d="M220 480 C 480 480, 520 260, 800 260 S 1150 140, 1380 160" fill="none" stroke="${NAVY}" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round" opacity="0.45"/>
    ${[
      [220, 480],
      [560, 350],
      [800, 260],
      [1080, 190],
    ]
      .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="22" fill="#fff" stroke="${TEAL}" stroke-width="5"/><circle cx="${x}" cy="${y}" r="8" fill="${i < 3 ? TEAL : LINE}"/>`)
      .join('')}
    <circle cx="1380" cy="160" r="30" fill="${SAFFRON}"/>
    ${icon('flag', 1364, 144, 32, NAVY, 2.5)}
    ${card(150, 120, 420, 160, ic, { progress: 0.35 })}
    ${card(880, 360, 440, 160, 'calendar-check', { progress: 0.85, check: true })}`,

  /** Leadership network around a central AI node */
  network: (ic) => {
    const pts = [
      [1000, 150],
      [1380, 170],
      [1460, 430],
      [1080, 500],
      [900, 330],
    ];
    const cx = 1190;
    const cy = 320;
    return `
      ${pts.map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${NAVY}" stroke-width="3" opacity="0.2"/>`).join('')}
      ${pts.map(([x, y], i) => `<line x1="${x}" y1="${y}" x2="${pts[(i + 1) % pts.length][0]}" y2="${pts[(i + 1) % pts.length][1]}" stroke="${TEAL}" stroke-width="3" stroke-dasharray="3 10" opacity="0.5"/>`).join('')}
      ${pts.map(([x, y]) => person(x, y + 10, 36, NAVY7)).join('')}
      <circle cx="${cx}" cy="${cy}" r="78" fill="url(#navy)"/>
      ${icon('sparkles', cx - 36, cy - 36, 72, '#fff', 2)}
      <circle cx="${cx + 60}" cy="${cy - 60}" r="16" fill="${SAFFRON}"/>
      ${card(160, 150, 460, 170, ic, { progress: 0.27 })}
      ${card(230, 360, 420, 110, 'shield-check', {})}`;
  },

  /** Grid of people with a growing share reskilled */
  grid: (ic) => {
    let out = '';
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 8; c++) {
        const lit = c + r * 8 < 18;
        out += person(860 + c * 82, 150 + r * 112, 30, lit ? TEAL : SLATE, lit ? 0.95 : 0.25);
      }
    return `${out}
      <rect x="840" y="560" width="660" height="12" rx="6" fill="${LINE}"/>
      <rect x="840" y="560" width="380" height="12" rx="6" fill="${TEAL}"/>
      <circle cx="1220" cy="566" r="14" fill="${SAFFRON}"/>
      ${card(150, 150, 460, 170, ic, { progress: 0.72 })}
      ${card(220, 370, 400, 110, 'graduation-cap', {})}`;
  },

  /** Three-phase transfer: shadow → reverse shadow → independent */
  phases: (ic) => `
    ${[0, 1, 2]
      .map((i) => {
        const x = 820 + i * 240;
        const fill = i === 2 ? 'url(#navy)' : TEAL;
        const op = [0.45, 0.7, 1][i];
        return `<rect x="${x}" y="${420 - i * 90}" width="200" height="${120 + i * 90}" rx="14" fill="${fill}" opacity="${op}"/>
          ${person(x + 70, 380 - i * 90, 30, NAVY, 0.9)}${person(x + 135, 380 - i * 90, 30, i === 2 ? NAVY : '#fff', i === 2 ? 0 : 0.95)}`;
      })
      .join('')}
    <path d="M840 300 C 950 230, 1150 170, 1420 150" fill="none" stroke="${NAVY}" stroke-width="4" stroke-dasharray="3 14" stroke-linecap="round" opacity="0.4"/>
    <circle cx="1420" cy="150" r="16" fill="${SAFFRON}"/>
    ${card(150, 160, 460, 170, ic, { progress: 0.66 })}
    ${card(230, 370, 400, 110, 'list-checks', { check: true })}`,

  /** Two parties with speech cards bridging them */
  bridge: (ic) => `
    ${person(880, 420, 70, NAVY)}
    ${person(1420, 420, 70, TEAL)}
    <path d="M960 330 C 1060 230, 1240 230, 1340 330" fill="none" stroke="${NAVY}" stroke-width="4" stroke-dasharray="3 14" stroke-linecap="round" opacity="0.45"/>
    <g filter="url(#sh)"><rect x="1010" y="140" width="280" height="90" rx="18" fill="#fff"/></g>
    <rect x="1034" y="168" width="170" height="12" rx="6" fill="${NAVY}" opacity="0.8"/>
    <rect x="1034" y="192" width="110" height="10" rx="5" fill="${SLATE}" opacity="0.35"/>
    <circle cx="1252" cy="185" r="16" fill="${SAFFRON}"/>
    <g filter="url(#sh)"><rect x="1040" y="420" width="220" height="80" rx="18" fill="${NAVY}"/></g>
    ${icon('globe', 1066, 444, 32, '#fff', 2)}
    <rect x="1114" y="452" width="120" height="10" rx="5" fill="#fff" opacity="0.7"/>
    <rect x="1114" y="472" width="80" height="8" rx="4" fill="#fff" opacity="0.35"/>
    ${card(150, 150, 460, 170, ic, { progress: 0.6 })}
    ${card(220, 370, 400, 110, 'handshake', {})}`,

  /** From ticket list to outcome chart */
  outcome: (ic) => `
    <g filter="url(#sh)"><rect x="800" y="150" width="260" height="340" rx="18" fill="#fff"/></g>
    ${[0, 1, 2, 3, 4]
      .map((i) => `<rect x="826" y="${180 + i * 58}" width="208" height="40" rx="10" fill="${LINE}"/><rect x="842" y="${194 + i * 58}" width="${120 - i * 12}" height="12" rx="6" fill="${SLATE}" opacity="0.45"/>`)
      .join('')}
    <path d="M1080 320 h70" stroke="${NAVY}" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
    <path d="M1135 300 l20 20 l-20 20" fill="none" stroke="${NAVY}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
    <g filter="url(#sh)"><rect x="1180" y="150" width="320" height="340" rx="18" fill="#fff"/></g>
    <path d="M1210 450 L1280 400 L1340 420 L1410 330 L1470 250" fill="none" stroke="${TEAL}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="1470" cy="250" r="16" fill="${SAFFRON}"/>
    <rect x="1210" y="178" width="140" height="12" rx="6" fill="${NAVY}" opacity="0.8"/>
    ${card(150, 160, 460, 170, ic, { progress: 0.55 })}
    ${card(230, 370, 400, 110, 'target', {})}`,

  /** Ramp-up curve to full productivity */
  curve: (ic) => `
    <line x1="820" y1="520" x2="1500" y2="520" stroke="${NAVY}" stroke-width="3" opacity="0.2"/>
    <line x1="820" y1="520" x2="820" y2="130" stroke="${NAVY}" stroke-width="3" opacity="0.2"/>
    <path d="M820 500 C 1050 495, 1160 300, 1500 190" fill="none" stroke="${SLATE}" stroke-width="5" stroke-dasharray="4 14" stroke-linecap="round" opacity="0.5"/>
    <path d="M820 500 C 930 470, 1000 220, 1180 190 L1500 180" fill="none" stroke="${TEAL}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="820" y1="185" x2="1500" y2="185" stroke="${SAFFRON}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
    <circle cx="1180" cy="190" r="16" fill="${SAFFRON}"/>
    ${card(150, 150, 460, 170, ic, { progress: 0.8 })}
    ${card(220, 370, 400, 110, 'timer', {})}`,

  /** City skyline with a location pin */
  skyline: (ic) => {
    const bs = [
      [800, 300, 90],
      [900, 220, 110],
      [1020, 330, 80],
      [1110, 170, 120],
      [1240, 260, 100],
      [1350, 200, 90],
      [1450, 310, 70],
    ];
    return `
      ${bs.map(([x, h, w], i) => `<rect x="${x}" y="${540 - h}" width="${w}" height="${h}" rx="10" fill="${i % 3 === 1 ? TEAL : 'url(#navy)'}" opacity="${i % 2 ? 0.95 : 0.75}"/>`).join('')}
      <rect x="780" y="538" width="760" height="6" rx="3" fill="${NAVY}" opacity="0.15"/>
      <g filter="url(#sh)">
        <path d="M1170 70 a52 52 0 0 1 52 52 c0 40 -52 96 -52 96 s-52 -56 -52 -96 a52 52 0 0 1 52 -52 z" fill="${SAFFRON}"/>
      </g>
      <circle cx="1170" cy="122" r="20" fill="#fff"/>
      ${card(150, 150, 460, 170, ic, { progress: 0.62 })}
      ${card(220, 370, 400, 110, 'building', {})}`;
  },
};

export const banners = {
  'missing-middle-first-time-managers': { motif: 'tiers', icon: 'users' },
  'services-to-captive-first-90-days': { motif: 'journey', icon: 'door-open' },
  'ai-literacy-for-gcc-leadership-teams': { motif: 'network', icon: 'compass' },
  'reskilling-for-ai-at-gcc-scale': { motif: 'grid', icon: 'sparkles' },
  'running-a-mandate-transfer-that-builds-trust': { motif: 'phases', icon: 'arrow-right-left' },
  'influencing-hq-without-authority': { motif: 'bridge', icon: 'message-circle' },
  'from-tickets-to-outcomes-product-thinking': { motif: 'outcome', icon: 'lightbulb' },
  'cutting-time-to-productivity-for-gcc-new-hires': { motif: 'curve', icon: 'gauge' },
  'pune-gcc-moment-talent-and-leadership': { motif: 'skyline', icon: 'map-pin' },
};

const only = process.argv[2];
for (const [slug, { motif, icon: ic }] of Object.entries(banners)) {
  if (only && only !== slug) continue;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="640" viewBox="0 0 1600 640">${defs}${motifs[motif](ic)}</svg>`;
  const dir = path.join(root, 'src', 'assets', 'blog', slug);
  await mkdir(dir, { recursive: true });
  await sharp(Buffer.from(svg), { density: 144 }).resize(1600, 640).png({ compressionLevel: 9 }).toFile(path.join(dir, 'banner.png'));
  console.log('banner:', slug);
}
