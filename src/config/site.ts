/**
 * Central site settings. Edit values here; no layout code needs to change.
 * Anything marked PLACEHOLDER must be updated before launch (see README).
 */

export interface Video {
  title: string;
  /** YouTube video ID (the part after watch?v=). IDs starting with "PLACEHOLDER" show a "coming soon" card. */
  youtubeId: string;
  /** ISO date, e.g. 2026-11-01 */
  date: string;
  description: string;
}

export const site = {
  name: 'GCC Enable',
  tagline: 'Helping GCCs win their next mandate.',
  shortTagline: 'Built for GCCs. Only GCCs.',
  description:
    'Training, upskilling and workshops built only for Global Capability Centres in India. Leadership, AI readiness, manager development and onboarding programmes from Pune.',
  domain: 'gccenable.com',
  url: 'https://gccenable.com',

  /** PLACEHOLDER: confirm the mailbox exists before launch */
  email: 'hello@gccenable.com',
  /** Leave empty to hide the phone number everywhere */
  phone: '',
  location: {
    city: 'Pune',
    region: 'Maharashtra',
    country: 'India',
    display: 'Pune, Maharashtra, India',
  },
  /** PLACEHOLDER: registered legal entity name shown in the footer */
  legalEntity: '[Legal entity name]',

  /** Social links. Leave a value empty to hide that icon. PLACEHOLDER URLs. */
  social: {
    linkedin: 'https://www.linkedin.com/company/gccenable',
    youtube: 'https://www.youtube.com/@gccenable',
    instagram: 'https://www.instagram.com/gccenable',
    x: 'https://x.com/gccenable',
  },

  /** PLACEHOLDER: YouTube / podcast channel */
  youtubeChannelUrl: 'https://www.youtube.com/@gccenable',

  /**
   * Videos for the Insights page and home teaser (first three are shown on home).
   * PLACEHOLDER: replace the IDs with real YouTube IDs once episodes are published.
   */
  videos: [
    {
      title: 'What HQ looks for before handing a GCC a bigger mandate',
      youtubeId: 'PLACEHOLDER-1',
      date: '2026-11-03',
      description: 'The readiness signals global sponsors check before moving ownership to India.',
    },
    {
      title: 'The missing middle: why new GCC managers struggle',
      youtubeId: 'PLACEHOLDER-2',
      date: '2026-11-10',
      description: 'Why strong engineers stall after promotion, and what helps them lead.',
    },
    {
      title: 'Services to captive: the first 90 days',
      youtubeId: 'PLACEHOLDER-3',
      date: '2026-11-17',
      description: 'The mindset shifts laterals from IT services firms need to make, and fast.',
    },
  ] as Video[],

  /** Calendar booking link (Calendly, Cal.com, Google Calendar). Leave empty to hide the button. */
  bookingUrl: '',

  /** Contact form handler: 'web3forms' (default) or 'php' (uses public/contact.php on Hostinger). */
  formHandler: 'web3forms' as 'web3forms' | 'php',
  /** PLACEHOLDER: free access key from https://web3forms.com */
  web3formsKey: 'YOUR_WEB3FORMS_KEY',

  /**
   * Newsletter form action URL (Beehiiv / Substack / Mailchimp embed form action).
   * While it is empty or a PLACEHOLDER, signups are sent through the contact form handler instead.
   */
  newsletterEmbed: 'PLACEHOLDER_NEWSLETTER_FORM_ACTION_URL',

  /** Google Analytics 4 measurement ID, e.g. G-XXXXXXX. Empty = no analytics and no cookie notice. */
  ga4Id: '',

  /** Feature flags */
  showTestimonials: false,
  showClientLogos: false,
  showFacultySection: false,
  showTopBar: true,
};

export type Site = typeof site;

export const isPlaceholder = (value: string) => !value || /PLACEHOLDER|YOUR_/i.test(value);
