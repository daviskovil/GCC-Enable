/**
 * Main menu. The header (desktop and mobile) and footer are built from this file.
 * Items with `show: false` are left out everywhere. "Programmes" is rendered as a topic mega menu.
 */
import { site } from '../config/site';
import { audiences } from './audiences';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** Lucide icon name */
  icon?: string;
  show?: boolean;
}

export interface NavGroup {
  label: string;
  /** Landing page for the group (also used to highlight the active item) */
  href: string;
  kind: 'mega' | 'dropdown' | 'link';
  items?: NavLink[];
  show?: boolean;
}

const visible = <T extends { show?: boolean }>(list: T[]) => list.filter((i) => i.show !== false);

export const mainNav: NavGroup[] = visible<NavGroup>([
  { label: 'Programmes', href: '/programmes/', kind: 'mega' },
  {
    label: 'Who we help',
    href: '/who-we-help/',
    kind: 'dropdown',
    items: audiences.map((a) => ({ label: a.label, href: `/who-we-help/${a.slug}/`, description: a.short, icon: a.icon })),
  },
  {
    label: 'Resources',
    href: '/resources/',
    kind: 'dropdown',
    items: visible([
      { label: 'Blog', href: '/resources/blog/', description: 'Practical articles for GCC leaders and managers.', icon: 'notebook-pen' },
      { label: 'Podcast and videos', href: '/resources/videos/', description: 'Conversations on running and growing a GCC.', icon: 'circle-play' },
      { label: 'Newsletter', href: '/resources/newsletter/', description: 'A practical weekly note for managers and L&D.', icon: 'mail' },
      {
        label: 'Guides and toolkits',
        href: '/resources/guides/',
        description: 'Checklists and templates you can use straight away.',
        icon: 'file-text',
        show: site.showGuides,
      },
    ]),
  },
  { label: 'Events', href: '/events/', kind: 'link', show: site.showEvents },
  {
    label: 'About',
    href: '/about/',
    kind: 'dropdown',
    items: visible([
      { label: 'Our story', href: '/about/', description: 'Why GCC Enable exists and what we believe.', icon: 'book-open' },
      { label: 'How we work', href: '/how-we-work/', description: 'Diagnose, design, deliver, measure.', icon: 'route' },
      {
        label: 'Faculty',
        href: '/about/faculty/',
        description: 'The practitioners who lead our programmes.',
        icon: 'presentation',
        show: site.showFacultySection,
      },
      { label: 'Careers / Join as faculty', href: '/careers/', description: 'Work with us or teach with us.', icon: 'briefcase-business' },
      { label: 'Book a discovery call', href: site.bookingPage, description: 'Pick a 30-minute slot that suits you.', icon: 'calendar-check' },
      { label: 'Contact', href: '/contact/', description: 'Send us a note or an enquiry.', icon: 'send' },
    ]),
  },
]);

/** True when the current path belongs to this group */
export const isGroupActive = (group: NavGroup, path: string) =>
  path.startsWith(group.href) || (group.items ?? []).some((i) => path.startsWith(i.href));
