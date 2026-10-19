/**
 * Social share image (1200×630) for each blog post, generated at build time.
 * Served at /og/blog/<slug>.png and used for og:image / twitter:image.
 */
import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import sharp from 'sharp';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { woffToTtf } from '../../../utils/woff.mjs';
import { getArticles } from '../../../utils/blog';
import { getTopic, type TopicSlug } from '../../../data/topics';

export async function getStaticPaths() {
  const articles = await getArticles();
  return articles.map((article) => ({ params: { slug: article.id }, props: { article } }));
}

const W = 1200;
const H = 630;
const root = process.cwd();
const fontDir = path.join(root, 'node_modules', '@fontsource', 'plus-jakarta-sans', 'files');

let fontsPromise: Promise<Record<'ExtraBold' | 'Bold' | 'SemiBold', string>> | undefined;
const fonts = () =>
  (fontsPromise ??= (async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), 'gcce-og-'));
    const out = async (weight: number) => {
      const file = path.join(tmp, `pjs-${weight}.ttf`);
      await writeFile(file, woffToTtf(await readFile(path.join(fontDir, `plus-jakarta-sans-latin-${weight}-normal.woff`))));
      return file;
    };
    return { ExtraBold: await out(800), Bold: await out(700), SemiBold: await out(600) };
  })());

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function text(str: string, size: number, weight: 'ExtraBold' | 'Bold' | 'SemiBold', color: string, width?: number) {
  const f = await fonts();
  return sharp({
    text: {
      text: `<span foreground="${color}">${esc(str)}</span>`,
      font: `Plus Jakarta Sans ${weight} ${size}`,
      fontfile: f[weight],
      rgba: true,
      dpi: 72,
      width,
      spacing: Math.round(size * 0.18),
    },
  })
    .png()
    .toBuffer();
}

export const GET: APIRoute = async ({ props }) => {
  const { article } = props as { article: CollectionEntry<'blog'> };
  const title = article.data.ogTitle ?? article.data.title;
  const topic = getTopic(article.data.topic as TopicSlug);

  const size = title.length > 70 ? 50 : title.length > 50 ? 58 : 64;
  const titleImg = await text(title, size, 'ExtraBold', '#FFFFFF', 1000);
  const titleMeta = await sharp(titleImg).metadata();

  const pillText = await text(topic.short.toUpperCase(), 20, 'Bold', '#0F2A4A');
  const pillMeta = await sharp(pillText).metadata();
  const pillW = (pillMeta.width ?? 200) + 40;
  const pill = await sharp(
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${pillW}" height="44"><rect width="${pillW}" height="44" rx="22" fill="#F5A623"/></svg>`),
  )
    .composite([{ input: pillText, left: 20, top: Math.round((44 - (pillMeta.height ?? 20)) / 2) }])
    .png()
    .toBuffer();

  const footer = await text('GCC Enable Editorial  ·  gccenable.com', 26, 'SemiBold', '#FFFFFF');
  const logo = await sharp(path.join(root, 'public', 'logo-white.png')).resize({ height: 72 }).png().toBuffer();

  const bg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F2A4A"/><stop offset="1" stop-color="#1A3A5F"/></linearGradient>
      <pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#FFFFFF" opacity="0.08"/></pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#d)"/>
    <path transform="translate(900 300) scale(3.6)" d="M13.4 13.8H86.2V86.2H72.5V37.3L23.2 86.2 13.4 76.6 62.7 27.5H13.4Z" fill="#FFFFFF" opacity="0.05"/>
    <rect x="80" y="${H - 108}" width="72" height="5" rx="2.5" fill="#F5A623"/>
  </svg>`);

  const titleTop = Math.max(180, Math.round(150 + (H - 150 - 140 - (titleMeta.height ?? 200)) / 2));
  const png = await sharp(bg)
    .composite([
      { input: logo, left: 80, top: 64 },
      { input: pill, left: W - 80 - pillW, top: 78 },
      { input: titleImg, left: 80, top: titleTop },
      { input: footer, left: 80, top: H - 84 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
