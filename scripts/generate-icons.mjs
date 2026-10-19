/**
 * Generates logo PNGs, favicons and the Open Graph image into public/.
 * Run with `npm run icons` after changing the logo. Source: Logo/GCC Enable Logo Design Transparent.png
 */
import sharp from 'sharp';
import { writeFile, readFile, mkdir, mkdtemp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import os from 'node:os';
import path from 'node:path';

/** Minimal WOFF 1.0 to TTF/OTF unpacker. */
function woffToTtf(buf) {
  const n = buf.readUInt16BE(12);
  let es = 1;
  let sel = 0;
  while (es * 2 <= n) {
    es *= 2;
    sel++;
  }
  const head = Buffer.alloc(12 + 16 * n);
  head.writeUInt32BE(buf.readUInt32BE(4), 0);
  head.writeUInt16BE(n, 4);
  head.writeUInt16BE(es * 16, 6);
  head.writeUInt16BE(sel, 8);
  head.writeUInt16BE(n * 16 - es * 16, 10);
  let offset = head.length;
  const chunks = [];
  for (let i = 0; i < n; i++) {
    const o = 44 + i * 20;
    const [tag, off, comp, orig, checksum] = [0, 4, 8, 12, 16].map((k) => buf.readUInt32BE(o + k));
    let data = buf.subarray(off, off + comp);
    if (comp !== orig) data = inflateSync(data);
    const h = 12 + i * 16;
    head.writeUInt32BE(tag, h);
    head.writeUInt32BE(checksum, h + 4);
    head.writeUInt32BE(offset, h + 8);
    head.writeUInt32BE(orig, h + 12);
    const pad = (4 - (data.length % 4)) % 4;
    chunks.push(data, Buffer.alloc(pad));
    offset += data.length + pad;
  }
  return Buffer.concat([head, ...chunks]);
}

const root = path.resolve(import.meta.dirname, '..');
const pub = path.join(root, 'public');
const src = path.join(root, 'Logo', 'GCC Enable Logo Design Transparent.png');
await mkdir(pub, { recursive: true });

const NAVY = { r: 0x0f, g: 0x2a, b: 0x4a };
const markSvg = (square = '#0F2A4A', arrow = '#FFFFFF', pad = 0) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${100 + pad * 2} ${100 + pad * 2}">
  <rect width="100" height="100" fill="${square}"/>
  <path d="M13.4 13.8H86.2V86.2H72.5V37.3L23.2 86.2 13.4 76.6 62.7 27.5H13.4Z" fill="${arrow}"/>
  <circle cx="83.3" cy="14.6" r="9.9" fill="#F5A623"/>
</svg>`;

// 1. Mark SVGs
await writeFile(path.join(pub, 'favicon.svg'), markSvg().trim());
await writeFile(path.join(pub, 'logo-mark.svg'), markSvg().trim());
await writeFile(path.join(pub, 'logo-mark-white.svg'), markSvg('#FFFFFF', '#0F2A4A').trim());

// 2. Favicons
// Raster favicons come from the supplied favicon artwork when present, otherwise from the SVG mark
const faviconSrc = path.join(root, 'Logo', 'GCC Enable Favicon Transparent.png');
const faviconBase = existsSync(faviconSrc) ? await sharp(faviconSrc).trim().png().toBuffer() : Buffer.from(markSvg());
const png = (size) => sharp(faviconBase).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
await writeFile(path.join(pub, 'favicon-32x32.png'), await png(32));
await writeFile(path.join(pub, 'apple-touch-icon.png'), await png(180));
await writeFile(path.join(pub, 'icon-192.png'), await png(192));
await writeFile(path.join(pub, 'icon-512.png'), await png(512));

// favicon.ico containing 16, 32 and 48px PNG images
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
await writeFile(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...entries, ...images]));

// 3. Full logo PNGs from the supplied artwork (trimmed), plus a white-text version for dark backgrounds
if (existsSync(src)) {
  const trimmed = await sharp(src).trim().png().toBuffer();
  const { data, info } = await sharp(trimmed).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  await sharp(trimmed).resize({ height: 240 }).png().toFile(path.join(pub, 'logo.png'));
  await sharp(trimmed).resize({ height: 132 }).webp({ quality: 92 }).toFile(path.join(pub, 'logo-header.webp'));

  // The mark is the left square (height x height). Recolour: text navy -> white; square navy <-> white.
  const sq = info.height;
  const out = Buffer.from(data);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const [r, g, b, a] = [out[i], out[i + 1], out[i + 2], out[i + 3]];
      if (a === 0) continue;
      const isNavy = Math.abs(r - NAVY.r) < 60 && Math.abs(g - NAVY.g) < 60 && Math.abs(b - NAVY.b) < 70 && b > r;
      const isWhite = r > 200 && g > 200 && b > 200;
      if (isNavy) {
        out[i] = 255;
        out[i + 1] = 255;
        out[i + 2] = 255;
      } else if (isWhite && x < sq) {
        out[i] = NAVY.r;
        out[i + 1] = NAVY.g;
        out[i + 2] = NAVY.b;
      }
    }
  }
  const white = await sharp(out, { raw: info }).png().toBuffer();
  await sharp(white).resize({ height: 240 }).png().toFile(path.join(pub, 'logo-white.png'));
  await sharp(white).resize({ height: 132 }).webp({ quality: 92 }).toFile(path.join(pub, 'logo-white-header.webp'));

  // 4. Open Graph image 1200x630
  const W = 1200;
  const H = 630;
  // Pango cannot read WOFF, so unpack the self-hosted WOFF files to temporary TTFs
  const fontDir = path.join(root, 'node_modules', '@fontsource', 'plus-jakarta-sans', 'files');
  const tmp = await mkdtemp(path.join(os.tmpdir(), 'gcce-'));
  const ttf = async (weight) => {
    const file = path.join(tmp, `pjs-${weight}.ttf`);
    await writeFile(file, woffToTtf(await readFile(path.join(fontDir, `plus-jakarta-sans-latin-${weight}-normal.woff`))));
    return file;
  };
  const fonts = { ExtraBold: await ttf(800), SemiBold: await ttf(600) };
  const text = (str, size, weight, color) =>
    sharp({
      text: {
        text: `<span foreground="${color}">${str}</span>`,
        font: `Plus Jakarta Sans ${weight} ${size}`,
        fontfile: fonts[weight],
        rgba: true,
        dpi: 72,
      },
    })
      .png()
      .toBuffer();

  const logoOg = await sharp(white).resize({ height: 150 }).png().toBuffer();
  const tagline = await text('Helping GCCs win their next mandate.', 54, 'ExtraBold', '#FFFFFF');
  const sub = await text('Built for GCCs. Only GCCs.  ·  Training and workshops, Pune', 30, 'SemiBold', '#F5A623');
  const domain = await text('gccenable.com', 28, 'SemiBold', '#FFFFFF');

  const bg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F2A4A"/><stop offset="1" stop-color="#1A3A5F"/></linearGradient>
      <pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#FFFFFF" opacity="0.08"/></pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#d)"/>
    <rect x="80" y="400" width="90" height="6" rx="3" fill="#F5A623"/>
    <path transform="translate(850 140) scale(3.3)" d="M13.4 13.8H86.2V86.2H72.5V37.3L23.2 86.2 13.4 76.6 62.7 27.5H13.4Z" fill="#FFFFFF" opacity="0.06"/>
  </svg>`);

  await sharp(bg)
    .composite([
      { input: logoOg, left: 80, top: 80 },
      { input: tagline, left: 80, top: 310 },
      { input: sub, left: 80, top: 440 },
      { input: domain, left: 80, top: 540 },
    ])
    .png()
    .toFile(path.join(pub, 'og-image.png'));

}

console.log('Icons, logos and OG image written to public/');
