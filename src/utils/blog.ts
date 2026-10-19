import { getCollection, type CollectionEntry } from 'astro:content';

/** A post is live when it is not a draft and its date has arrived (checked at build time). */
export const isLive = (post: CollectionEntry<'blog'>, now = new Date()) =>
  !post.data.draft && post.data.date.valueOf() <= now.valueOf();

/** Published articles, newest first */
export const getArticles = async () =>
  (await getCollection('blog', (post) => isLive(post))).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
