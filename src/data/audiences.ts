/**
 * "Who we help" pages: one page per buyer type at /who-we-help/<slug>/.
 * `programmes` lists programme slugs from programmes.ts, in the order shown.
 */

export interface Audience {
  slug: string;
  /** Menu label */
  label: string;
  /** Lucide icon name */
  icon: string;
  /** One line for menus and cards */
  short: string;
  title: string;
  intro: string;
  priorities: string[];
  challenges: { icon: string; title: string; body: string }[];
  howWeHelp: string[];
  programmes: string[];
  measures: string[];
  ctaTitle: string;
}

export const audiences: Audience[] = [
  {
    slug: 'site-leaders',
    label: 'Site leaders and MDs',
    icon: 'compass',
    short: 'Build the leadership bench and capability to win the next mandate.',
    title: 'For GCC site leaders and managing directors',
    intro:
      'You are accountable to HQ for what the centre delivers today and for the bigger mandate it wins next. We help you build the leaders, managers and AI readiness that make the case for more ownership.',
    priorities: [
      'Winning bigger, higher-value mandates from HQ',
      'A leadership team with a shared view of AI',
      'Managers who decide locally instead of escalating',
      'Transitions that build HQ’s confidence',
    ],
    challenges: [
      {
        icon: 'sparkles',
        title: 'HQ wants an AI plan from India',
        body: 'Your leadership team needs a common, practical view of what AI changes in the centre’s work, and a credible plan to present.',
      },
      {
        icon: 'users',
        title: 'The middle layer is stretched',
        body: 'Fast growth has promoted strong engineers into management before they were ready. Escalations to HQ signal a centre that is not yet ready to own.',
      },
      {
        icon: 'arrow-right-left',
        title: 'Every transition is a test',
        body: 'How the last transfer went shapes HQ’s appetite for the next one. A repeatable method makes each one faster and safer.',
      },
    ],
    howWeHelp: [
      'A short diagnostic with you and your N-1s, linked to the centre’s mandate and roadmap',
      'Leadership workshops that end with decisions and a 90-day plan',
      'Programmes for managers and transition leaders that run alongside delivery',
      'Agreed measures you can report to HQ, reviewed with you afterwards',
    ],
    programmes: ['ai-ready-leadership', 'gcc-manager-accelerator', 'ownership-mandate-transfer', 'global-stakeholder-management'],
    measures: [
      'Escalations to HQ for decisions the centre owns',
      'Transition milestones and readiness sign-off',
      'Leadership AI literacy, before and after',
    ],
    ctaTitle: 'Let’s talk about the mandate you want to win next.',
  },
  {
    slug: 'hr-ld-heads',
    label: 'HR and L&D heads',
    icon: 'graduation-cap',
    short: 'Programmes built for captive-centre realities, with results you can report.',
    title: 'For India HR and L&D heads',
    intro:
      'You need learning that the business values, not another catalogue. We design programmes around the centre’s mandate, run them alongside your L&D calendar and report on outcomes, not just attendance and feedback scores.',
    priorities: [
      'Reskilling for AI at scale',
      'A pipeline of ready first-time managers',
      'Faster ramp-up for laterals from IT services',
      'Showing business impact from the learning budget',
    ],
    challenges: [
      {
        icon: 'hourglass',
        title: 'New joiners take too long to ramp up',
        body: 'Laterals arrive with skills but not the ownership mindset of a captive centre, so time to productivity stretches out.',
      },
      {
        icon: 'user-round-cog',
        title: 'Managers promoted without preparation',
        body: 'One-day manager workshops rarely change behaviour. First-time managers need practice, coaching and time.',
      },
      {
        icon: 'chart-line',
        title: 'Hard to prove impact',
        body: 'Feedback scores do not convince business leaders. You need measures that link learning to delivery and retention.',
      },
    ],
    howWeHelp: [
      'Programmes that fit your LMS, calendar and cohort sizes',
      'Recurring onboarding for every intake, so the experience stays consistent as you scale',
      'Cohort programmes with coaching and on-the-job projects, not single classroom days',
      'Post-programme reports with the measures you agreed with business sponsors',
    ],
    programmes: ['services-to-captive-onboarding', 'gcc-manager-accelerator', 'genai-engineering-delivery', 'domain-upskilling'],
    measures: [
      'Time to productivity for new joiners, compared with earlier intakes',
      '180-degree feedback for managers, start and end',
      'Adoption and certification rates against targets',
    ],
    ctaTitle: 'Let’s plan this year’s learning around the mandate.',
  },
  {
    slug: 'engineering-coe-heads',
    label: 'Engineering and CoE heads',
    icon: 'code-xml',
    short: 'AI-ready teams, delivery excellence and product thinking.',
    title: 'For engineering and CoE heads',
    intro:
      'Your teams are expected to deliver more, use AI well and own products, not just tickets. We run hands-on programmes inside your real workflows and measure the change in delivery, quality and productivity.',
    priorities: [
      'Consistent, safe use of AI copilots and agents',
      'Predictable delivery across distributed teams',
      'Product ownership in India, not only execution',
      'Skills for the cloud, data and security roadmap',
    ],
    challenges: [
      {
        icon: 'sparkles',
        title: 'AI use is patchy',
        body: 'Some engineers use AI tools daily, others not at all, and nobody can show HQ what changed or whether it was safe.',
      },
      {
        icon: 'gauge',
        title: 'Delivery slips between locations',
        body: 'Dependencies surface late, plans drift and Agile becomes ceremony rather than a faster way to deliver.',
      },
      {
        icon: 'lightbulb',
        title: 'Teams wait for requirements',
        body: 'HQ wants India to own products, but teams are used to receiving fully formed backlogs.',
      },
    ],
    howWeHelp: [
      'Hands-on bootcamps using your tools, stack and policies',
      'Baselines taken before we start, so improvement is measured honestly',
      'Team coaching that continues after the workshop',
      'Certification tracks matched to your technology roadmap',
    ],
    programmes: [
      'genai-engineering-delivery',
      'delivery-excellence-agile',
      'product-thinking',
      'cloud-data-security-certifications',
    ],
    measures: [
      'Cycle time, review effort and defect rates against baseline',
      'AI adoption and confident-use surveys at 30 and 90 days',
      'Certification pass rates and deployment onto projects',
    ],
    ctaTitle: 'Let’s talk about your teams and your roadmap.',
  },
  {
    slug: 'new-centres',
    label: 'Centres setting up in India',
    icon: 'rocket',
    short: 'Get the first leaders, managers and hires right from day one.',
    title: 'For centres setting up in India',
    intro:
      'The first year sets the culture and HQ’s view of the centre for a long time. We help new and young GCCs onboard their first hires, build their first managers and connect early with HQ.',
    priorities: [
      'Onboarding the first waves of hires quickly and consistently',
      'A first management layer that can lead from day one',
      'Strong working relationships with HQ counterparts',
      'A culture of ownership, not a services mindset',
    ],
    challenges: [
      {
        icon: 'users',
        title: 'Hiring fast, mostly from IT services',
        body: 'Early hires bring services-firm habits. Without a deliberate shift, the centre becomes an order-taker by default.',
      },
      {
        icon: 'globe',
        title: 'HQ and India are still learning each other',
        body: 'Different working styles and unclear decision rights slow everything down in the first months.',
      },
      {
        icon: 'user-round-check',
        title: 'Managers appointed before teams exist',
        body: 'First managers have to hire, onboard and lead at the same time, often for the first time.',
      },
    ],
    howWeHelp: [
      'A “GCC 101” onboarding programme that runs for every intake',
      'Early manager development so the first leaders are ready as teams grow',
      'Stakeholder workshops that bring HQ and India teams into one way of working',
      'Domain upskilling so new hires understand the business they serve',
    ],
    programmes: [
      'services-to-captive-onboarding',
      'gcc-manager-accelerator',
      'global-stakeholder-management',
      'domain-upskilling',
    ],
    measures: [
      'Time to productivity across the first intakes',
      'Early attrition in the first year',
      'HQ stakeholder feedback on the India team',
    ],
    ctaTitle: 'Setting up a centre? Let’s get the first year right.',
  },
];

export const getAudience = (slug: string) => audiences.find((a) => a.slug === slug);
