import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { topics } from './data/topics';

const topicSlugs = topics.map((t) => t.slug) as [string, ...string[]];

/**
 * Blog articles: add a .md or .mdx file to src/content/blog/ and it appears on /resources/blog/.
 * A post with a future `date` stays hidden until a build runs on or after that date (see README → Blog).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shorter title for the social share image, if the full title is long */
      ogTitle: z.string().optional(),
      description: z.string(),
      /** Publish date (IST). Future dates are scheduled. */
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      author: z.string().default('GCC Enable Editorial'),
      /** Topic area from src/data/topics.ts; drives the category label and related programmes */
      topic: z.enum(topicSlugs),
      tags: z.array(z.string()).default([]),
      /** Banner image (in src/assets/blog/) and its alt text */
      banner: image().optional(),
      bannerAlt: z.string().optional(),
      /** Programme slugs to recommend at the end of the article */
      programmes: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
