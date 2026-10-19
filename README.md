# GCC Enable website

Marketing website for **GCC Enable**: training, upskilling and workshops built only for Global Capability Centres (GCCs) in India.

- **Stack:** Astro 7 (static output) + Tailwind CSS 4, self-hosted fonts (`@fontsource`), Lucide icons as inline SVG, a little vanilla TypeScript.
- **Output:** plain HTML/CSS/JS in `dist/`, ready to upload to Hostinger `public_html`. No server code or database.

---

## 1. Run locally

Requires Node.js 22.22 or newer (Astro 7 requirement).

```bash
npm install
npm run dev
```

Open http://localhost:4321. Edits reload automatically.

## 2. Build

```bash
npm run build
```

The finished site is written to `dist/`. Check it before uploading with:

```bash
npm run preview
```

## 3. Deploy to Hostinger

1. Run `npm run build`.
2. In hPanel open **Files → File Manager → public_html** (or connect with FTP using the details under **Files → FTP Accounts**).
3. Delete the old site files in `public_html` (keep anything Hostinger created that you still need).
4. Upload **the contents of** `dist/` (not the `dist` folder itself) into `public_html`. Make sure the hidden `.htaccess` file is included. In File Manager, upload a zip of the `dist` contents and use **Extract**; with FTP, enable "show hidden files".
5. In hPanel → **Security → SSL**, make sure the free SSL certificate is active. `.htaccess` forces HTTPS.
6. Visit https://gccenable.com and check a few pages, plus a made-up URL to see the custom 404 page.

### Alternative: Vercel (current live hosting)

The site is also deployed on Vercel as the project `gcc-enable` (https://gcc-enable.vercel.app). `vercel.json` sets headers, caching and trailing slashes there; `.htaccess` and `contact.php` are ignored on Vercel, so keep `formHandler: 'web3forms'`.

- Deploy: `npx vercel deploy --prod` (or connect the GitHub repo in the Vercel dashboard for automatic deploys on push)
- Domains: `gccenable.com` is the primary domain; `www.gccenable.com`, `gccenable.in` and `www.gccenable.in` 301-redirect to it (configured in Vercel → Project → Settings → Domains)
- DNS (at the domain's DNS provider): one `A @ 76.76.21.21` record for each apex domain, and `CNAME www cname.vercel-dns.com`

### `.htaccess`

`public/.htaccess` is copied into `dist/` on every build. It:

- forces HTTPS
- redirects `www.gccenable.com` to `gccenable.com`. **To use www instead**, change the one line `RewriteRule ^ - [E=CANONICAL_HOST:gccenable.com]` to `www.gccenable.com`, and update `site` in `astro.config.mjs` and `url` in `src/config/site.ts` to match
- serves the custom `404.html`
- turns on gzip compression and browser caching, and adds basic security headers

### Point gccenable.in to gccenable.com

Pick one:

- **hPanel redirect (simplest):** add `gccenable.in` to your Hostinger account, then go to **Domains → gccenable.in → Redirects** and create a **301 (permanent)** redirect to `https://gccenable.com`, covering both `gccenable.in` and `www.gccenable.in`.
- **Parked domain + `.htaccess`:** park `gccenable.in` on the same hosting and add this above the canonical host rule in `public/.htaccess`:

  ```apache
  RewriteCond %{HTTP_HOST} ^(www\.)?gccenable\.in$ [NC]
  RewriteRule ^(.*)$ https://gccenable.com/$1 [R=301,L]
  ```

Get an SSL certificate for `gccenable.in` as well, so `https://gccenable.in` redirects without a browser warning.

---

## 4. Where to edit content

All copy lives in data files. You never need to touch layout code to change text.

| What | File |
| --- | --- |
| Site name, email, phone, social links, booking link, form keys, analytics, feature flags | `src/config/site.ts` |
| Topic areas (how programmes are grouped on the site) | `src/data/topics.ts` |
| Programmes (cards, menu, detail pages) | `src/data/programmes.ts` |
| Home page copy, statistics, process steps, formats, FAQ, About copy, values | `src/data/content.ts` |
| YouTube videos | `videos` array in `src/config/site.ts` |
| Articles | Markdown files in `src/content/insights/` |
| Privacy policy and terms | `src/pages/privacy.astro`, `src/pages/terms.astro` |
| Colours, fonts, spacing | `src/styles/global.css` (`@theme` block) |

**Adding a programme:** add an object to the `programmes` array in `src/data/programmes.ts` and set `topic` to one of the slugs in `src/data/topics.ts`. Its card, menu entry and `/programmes/<slug>/` page are generated automatically, under that topic. `icon` is any [Lucide icon name](https://lucide.dev/icons).

**Topic areas:** the Programmes page, the Programmes mega menu, the home page grid, the footer and the contact form's "Area of interest" list are all grouped by the topics in `src/data/topics.ts`, in that order. A topic with no programmes is hidden automatically.

**Adding a service line later** (advisory, talent, technology): add a page in `src/pages/` and a link in `links` inside `src/components/Header.astro` and `company` in `src/components/Footer.astro`. The header has room for one or two more items, or you can turn a link into a second dropdown by copying the Programmes dropdown block.

### Optional photos

The hero, About and founder sections use SVG graphics by default. To use a photo instead, drop a file named `hero.jpg`, `about.jpg` or `founder.jpg` (`.png`/`.webp` also work) into **`src/assets/images/`** and rebuild. Astro then optimises it into responsive WebP automatically. Choice made: the brief suggested `public/images/`, but files in `src/assets/` can be optimised at build time, which keeps the Lighthouse performance score high.

### Videos

Edit `videos` in `src/config/site.ts`:

```ts
{ title: 'Episode title', youtubeId: 'dQw4w9WgXcQ', date: '2026-11-03', description: 'One line.' }
```

`youtubeId` is the part after `watch?v=` in the video URL. IDs that start with `PLACEHOLDER` show a branded "Episode coming soon" card. Real IDs show the YouTube thumbnail. The player (from `youtube-nocookie.com`) loads only when the visitor clicks, so pages stay fast. The first three videos appear on the home page.

### Articles

Create `src/content/insights/my-article.md`:

```md
---
title: 'Article title'
description: 'One or two sentences for cards and search results.'
date: 2026-11-20
author: 'Your name'
authorRole: 'Founder, GCC Enable'
tags: ['Managers']
draft: false
---

Article body in Markdown.
```

It appears on `/insights/` and at `/insights/my-article/`, with reading time, an author box and a CTA. Set `draft: true` to hide it.

---

## 5. Forms

### Contact and newsletter forms: Web3Forms (default)

1. Go to https://web3forms.com, enter the inbox that should receive enquiries (for example `hello@gccenable.com`) and get your free **Access Key** by email.
2. Paste it into `web3formsKey` in `src/config/site.ts`.
3. Rebuild and upload.

Until a key is set, the forms show "This form is not connected yet. Please email us directly instead." Both forms include a hidden honeypot field (`botcheck`) for spam, client-side validation, and success and error states.

### Newsletter provider

Set `newsletterEmbed` in `src/config/site.ts` to your provider's form action URL (Beehiiv, Substack or Mailchimp embed form; the field name must be `email`). The signup forms then post straight to the provider in a new tab. While it is still the placeholder, newsletter signups go to your Web3Forms inbox with the subject "New newsletter signup".

### Alternative: PHP `mail()` on Hostinger

`public/contact.php` sends enquiries with PHP `mail()`. It is **disabled by default**.

1. In hPanel → **Emails**, create a mailbox on your domain, for example `website@gccenable.com`.
2. Open `public/contact.php` and set `$ENABLED = true`, `$TO_EMAIL` and `$FROM_EMAIL`.
3. In `src/config/site.ts` set `formHandler: 'php'`.
4. Rebuild and upload.

It checks the request origin, the honeypot and required fields, strips header-injection characters and limits each visitor to one submission every 30 seconds.

---

## 6. Analytics

Set `ga4Id` in `src/config/site.ts` to your GA4 measurement ID (`G-XXXXXXX`). When it is set:

- a small cookie notice appears with **Accept** and **Decline**
- GA4 loads **only after Accept**. The choice is remembered in the visitor's browser

When `ga4Id` is empty, no analytics script and no cookie notice are included.

---

## 7. Logo, favicons and OG image

The supplied artwork is in `Logo/`. `npm run icons` (`scripts/generate-icons.mjs`) generates everything below into `public/`. Run it again if the logo changes; the outputs are committed, so a normal build does not need it.

- `logo.png`, `logo-header.webp`: full logo for the header and Organization schema
- `logo-white.png`, `logo-white-header.webp`: white-text version for the navy footer (the mark becomes a white square with a navy arrow)
- Raster favicons are made from `Logo/GCC Enable Favicon Transparent.png`: `favicon.ico` (16/32/48), `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`
- `og-image.png`: 1200×630 social sharing image (navy background, logo, tagline), rendered in Plus Jakarta Sans

---

## 8. SEO and accessibility already in place

- A unique title (`Page | GCC Enable`), description and canonical URL on every page, on `https://gccenable.com`
- Open Graph and Twitter card tags
- JSON-LD: Organization and WebSite (every page), FAQPage (home), Course (each programme), BreadcrumbList (inner pages), Article (articles)
- `sitemap-index.xml` (via `@astrojs/sitemap`) and `robots.txt`
- Skip link, semantic landmarks, keyboard-operable dropdown and mobile menu (focus trap, Escape to close), ARIA on accordions and forms, visible focus rings (saffron with a navy inner ring), `prefers-reduced-motion` respected for every animation

---

## 9. Design decisions

- **Colours:** only the ten brand tokens exist. Tailwind's default palette is removed in `src/styles/global.css`, so off-brand colours cannot creep in.
- **Contrast:** saffron is never used as text on white; on white it is only a button background (with navy text) or an accent. Teal (`#1F8A8A`) measures about 4.1:1 on white, just under the AA threshold for body text, so it is used for icons, borders and underlines. Links are navy text with a teal underline.
- **Logo:** the header and footer use the supplied artwork (exported to PNG/WebP), not an SVG with live text, so the wordmark matches the original exactly.
- **Placeholders:** videos show "Episode coming soon" rather than borrowed YouTube content. Testimonials, client logos and faculty components are built but switched off.
- **Statistics:** only the five industry statistics from the brief are used, each with its source beside it.
- **URLs:** trailing slashes everywhere (`/about/`), matching how Hostinger serves folders.
- **Error colour:** a red (`#B42318`) is used only for form validation messages, because none of the brand colours read as an error.

---

## 10. Things to update before launch

Search the project for `PLACEHOLDER`, `YOUR_` and `[` to find them all.

**`src/config/site.ts`**

- [ ] `email`: confirm `hello@gccenable.com` exists and is monitored
- [ ] `phone`: add if wanted (it stays hidden while empty)
- [ ] `legalEntity`: replace `[Legal entity name]` with the registered company name
- [ ] `social`: real LinkedIn, YouTube, Instagram and X URLs (clear any you don't use, and its icon disappears)
- [ ] `youtubeChannelUrl`
- [ ] `videos`: replace the three `PLACEHOLDER-*` IDs once episodes are live
- [ ] `web3formsKey`: replace `YOUR_WEB3FORMS_KEY`
- [ ] `newsletterEmbed`: replace `PLACEHOLDER_NEWSLETTER_FORM_ACTION_URL`, or leave it and receive signups by email
- [ ] `bookingUrl`: add a Calendly or Cal.com link to show the calendar button on Contact
- [ ] `ga4Id`: add if you want analytics

**`src/data/content.ts`**

- [ ] `about.founder`: `[Founder name]`, `[Founder bio: …]`, optional LinkedIn URL
- [ ] Add `founder.jpg` (and optionally `hero.jpg`, `about.jpg`) to `src/assets/images/`
- [ ] Before turning on `showTestimonials`, `showClientLogos` or `showFacultySection`, replace every `PLACEHOLDER` entry with real, approved content

**Content**

- [ ] `src/content/insights/sample-what-hq-looks-for.md`: sample article, edit or delete it (the author is `[Founder name]`)
- [ ] `src/pages/privacy.astro` and `src/pages/terms.astro`: **have them reviewed by a lawyer**, then fill in `[Date]`, provider names, retention period, grievance officer and jurisdiction, and remove the "for legal review" notice in `src/layouts/LegalLayout.astro`

**Hosting**

- [ ] SSL active on gccenable.com (and gccenable.in)
- [ ] gccenable.in redirect set up (section 3)
- [ ] Submit `https://gccenable.com/sitemap-index.xml` in Google Search Console
- [ ] Send a test enquiry through the contact form and confirm it arrives
