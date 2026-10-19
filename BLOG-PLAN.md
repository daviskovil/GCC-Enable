# Blog plan

**Cadence:** one new post every **Monday at 09:00 IST**, bylined **GCC Enable Editorial**.

The first 10 posts are published, dated on the ten Mondays up to 19 Oct 2026. Posts that quote the PwC India–FICCI survey (Aug 2026) are dated after its release.

Posts live in `src/content/blog/` as `.mdx` files. A post with a future `date` stays hidden until a build runs on or after that date. The **Weekly publish** GitHub Action rebuilds the site every Monday at 09:05 IST, so a post written ahead of time goes live on its Monday automatically (see README → Blog).

## Published

| Date (Mon) | Title | Topic area | Stat used | Programme CTA |
| --- | --- | --- | --- | --- |
| 19 Oct 2026 | What HQ looks for before handing a GCC a bigger mandate | Leadership and managers | 2,100+ GCCs; 27% AI literacy | Ownership and Mandate Transfer |
| 12 Oct 2026 | AI literacy for GCC leadership teams: where to start | GenAI and AI literacy | 27% AI literacy | AI-Ready Leadership |
| 5 Oct 2026 | Cutting time to productivity for GCC new hires | Onboarding and GCC 101 | 8.7 months | Services-to-Captive Onboarding |
| 28 Sep 2026 | Reskilling for AI at GCC scale: a practical playbook for L&D heads | GenAI and AI literacy | 72% must reskill 40%+ | GenAI for Engineering and Delivery Teams |
| 21 Sep 2026 | From services to captive: the first 90 days for laterals joining a GCC | Onboarding and GCC 101 | 8.7 months | Services-to-Captive Onboarding |
| 14 Sep 2026 | The missing middle: why first-time managers in GCCs struggle, and what fixes it | Leadership and managers | none | GCC Manager Accelerator |
| 7 Sep 2026 | Pune’s GCC moment: what 270+ centres mean for talent and leadership | Leadership and managers | 270+ GCCs in Pune | GCC Manager Accelerator |
| 31 Aug 2026 | Shadow, reverse shadow, independent: running a mandate transfer that builds trust | Leadership and managers | none | Ownership and Mandate Transfer |
| 24 Aug 2026 | From tickets to outcomes: building product thinking in a GCC | Product thinking | none | Product Management and Product Thinking |
| 17 Aug 2026 | Influencing HQ without authority: habits of GCC managers who get heard | Stakeholders and HQ | none | Global Stakeholder Management |

## Next Mondays (ideas, not yet written)

Topic areas with no post yet come first.

| Date (Mon) | Working title | Topic area |
| --- | --- | --- |
| 26 Oct 2026 | Agile at GCC scale: why ceremonies are not delivery | Delivery and Agile |
| 2 Nov 2026 | Certifications that matter: building cloud, data and security skills that show up on projects | Cloud, data and security |
| 9 Nov 2026 | Domain knowledge is the new differentiator for GCC engineers | Domain upskilling |
| 16 Nov 2026 | Setting up a GCC in India: getting the first managers right | Leadership and managers |

## Rules for every post

- **Byline:** `GCC Enable Editorial` (the default; no need to set `author`).
- **Numbers:** use only the sourced industry statistics listed in the README, always with the source line, and never date a post before the source was published. No invented client stories, quotes or results.
- **Length:** 850+ words of body copy (run `python scripts/word-count.py`), short paragraphs, 4–6 `##` sections separated by `---` dividers.
- **Required pieces:** banner (add the slug to `scripts/make-banners.mjs`, then run `node scripts/make-banners.mjs <slug>`), `<KeyTakeaways>` near the top, at least one `<Figure>` diagram (`Steps`, `Compare` or `Timeline`), one mid-article `<Cta programme="…" />` and a closing `<Cta />`.
- **Spelling:** Indian English (programme, organisation, centre).
