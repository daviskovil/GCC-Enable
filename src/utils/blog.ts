import { getCollection } from 'astro:content';

/** Published articles, newest first */
export const getArticles = async () =>
  (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
