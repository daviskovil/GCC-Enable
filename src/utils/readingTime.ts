/** Minutes to read at roughly 220 words per minute. */
export const readingTime = (text: string) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 220));
