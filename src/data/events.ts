/**
 * Events: open workshops, roundtables and webinars, shown at /events/.
 * The page appears in the menu only when site.showEvents is true.
 * Past events (date before today at build time) move to a "Past events" list automatically.
 */

export interface GccEvent {
  title: string;
  /** ISO date, e.g. 2026-12-05 */
  date: string;
  /** e.g. '10:00–13:00 IST' */
  time?: string;
  type: 'Roundtable' | 'Open workshop' | 'Webinar';
  /** City name, or 'Online' */
  location: string;
  description: string;
  /** Registration link (Luma, Eventbrite, Google Form…). Leave empty to show "Registration opens soon". */
  registerUrl?: string;
}

export const events: GccEvent[] = [
  // PLACEHOLDER example. Replace with a real event before setting showEvents: true.
  {
    title: 'PLACEHOLDER: Pune GCC leaders roundtable',
    date: '2026-12-10',
    time: '17:30–19:30 IST',
    type: 'Roundtable',
    location: 'Pune',
    description: 'PLACEHOLDER: a small, closed-door conversation for GCC site leaders on a single theme.',
    registerUrl: '',
  },
];
