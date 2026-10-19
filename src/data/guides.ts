/**
 * Guides and toolkits, shown at /resources/guides/.
 * The section appears in the menu only when site.showGuides is true.
 * Put PDF files in public/guides/ and reference them as '/guides/file-name.pdf'.
 */

export interface Guide {
  title: string;
  description: string;
  /** Who it is for, e.g. 'First-time managers' */
  audience: string;
  /** Lucide icon name */
  icon: string;
  /** Path to the file in public/, or an external link */
  file: string;
  /** e.g. 'PDF, 12 pages' */
  format: string;
}

export const guides: Guide[] = [
  // PLACEHOLDER example. Replace with a real guide before setting showGuides: true.
  {
    title: 'PLACEHOLDER: The first 90 days for a new GCC manager',
    description: 'PLACEHOLDER: a practical checklist for the first three months in a management role.',
    audience: 'First-time managers',
    icon: 'clipboard-check',
    file: '/guides/placeholder.pdf',
    format: 'PDF',
  },
];
