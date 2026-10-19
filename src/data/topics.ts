/**
 * Topic areas that organise the programme catalogue (Programmes page, menus, home page, contact form).
 * The order here is the order shown on the site. Each programme in programmes.ts names one topic.
 */

export type TopicSlug =
  | 'ai'
  | 'leadership'
  | 'stakeholder'
  | 'product'
  | 'cloud-data-security'
  | 'delivery'
  | 'domain'
  | 'onboarding';

export interface Topic {
  slug: TopicSlug;
  title: string;
  /** Short label for filter chips and tight menus */
  short: string;
  /** Lucide icon name */
  icon: string;
  summary: string;
}

export const topics: Topic[] = [
  {
    slug: 'ai',
    title: 'GenAI and agentic AI for engineers, AI literacy for leaders',
    short: 'GenAI and AI literacy',
    icon: 'sparkles',
    summary: 'Hands-on AI for the teams doing the work, and a clear view of AI for the leaders deciding where it goes.',
  },
  {
    slug: 'leadership',
    title: 'Leadership and first-time manager programmes',
    short: 'Leadership and managers',
    icon: 'users',
    summary: 'Build the managers and leaders who own outcomes, decide locally and take on bigger mandates from HQ.',
  },
  {
    slug: 'stakeholder',
    title: 'Global stakeholder management, influencing HQ, cross-cultural work',
    short: 'Stakeholders and HQ',
    icon: 'globe',
    summary: 'Work with HQ as a peer: influence without authority, push back well and communicate across cultures.',
  },
  {
    slug: 'product',
    title: 'Product management and product thinking',
    short: 'Product thinking',
    icon: 'lightbulb',
    summary: 'Move teams from delivering requirements to owning problems, outcomes and product decisions.',
  },
  {
    slug: 'cloud-data-security',
    title: 'Cloud, data and cybersecurity certifications',
    short: 'Cloud, data and security',
    icon: 'cloud',
    summary: 'Structured preparation for the cloud, data and security certifications your roadmap depends on.',
  },
  {
    slug: 'delivery',
    title: 'Delivery excellence, Agile at scale, SAFe, engineering productivity',
    short: 'Delivery and Agile',
    icon: 'gauge',
    summary: 'Predictable, high-quality delivery across distributed teams, with Agile that works at GCC scale.',
  },
  {
    slug: 'domain',
    title: 'Domain upskilling: banking, insurance, pharma, automotive',
    short: 'Domain upskilling',
    icon: 'landmark',
    summary: 'Teach engineers and analysts the business they serve, so they can contribute beyond the code.',
  },
  {
    slug: 'onboarding',
    title: 'Onboarding and “GCC 101” for new joiners from IT services',
    short: 'Onboarding and GCC 101',
    icon: 'door-open',
    summary: 'Help laterals from IT services firms think like owners and reach full productivity sooner.',
  },
];

export const getTopic = (slug: TopicSlug) => topics.find((t) => t.slug === slug)!;
