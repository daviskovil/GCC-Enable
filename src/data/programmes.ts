/**
 * Programme catalogue. Every programme card, dropdown entry, footer link and
 * detail page (/programmes/[slug]/) is generated from this file.
 * To add a programme, add an object to the array; the site picks it up automatically.
 */

export type ProgrammeCategory = 'Leadership' | 'AI' | 'Managers' | 'Onboarding';

export interface ProgrammeFormat {
  name: string;
  duration: string;
  detail: string;
}

export interface Programme {
  slug: string;
  title: string;
  /** Lucide icon name */
  icon: string;
  summary: string;
  categories: ProgrammeCategory[];
  audienceShort: string;
  durationShort: string;
  formatShort: string;
  whoFor: string[];
  challenge: string[];
  outcomes: string[];
  modules: { title: string; description: string }[];
  formats: ProgrammeFormat[];
  impact: string[];
  related: string[];
  cta: string;
}

export const programmeCategories: ProgrammeCategory[] = ['Leadership', 'AI', 'Managers', 'Onboarding'];

export const programmes: Programme[] = [
  {
    slug: 'ai-ready-leadership',
    title: 'AI-Ready Leadership',
    icon: 'compass',
    summary:
      'AI literacy for the people who decide where the centre goes next: what changes, what to redesign and how to make the case to HQ.',
    categories: ['Leadership', 'AI'],
    audienceShort: 'Site leaders, directors, N-1s',
    durationShort: '1 day + optional sprints',
    formatShort: 'Leadership workshop',
    whoFor: [
      'GCC site leaders and managing directors',
      'Directors and their N-1 leadership teams',
      'CoE and portfolio heads who own a function’s roadmap',
      'HR and L&D heads shaping the centre’s AI workforce plan',
    ],
    challenge: [
      'HQ expects the India centre to lead on AI, not wait for instructions. Yet most leadership teams have had little structured time to understand what AI actually changes in their own work.',
      'Without that shared understanding, decisions stall. Pilots multiply without a business case, roles are redesigned by accident, and governance arrives after the risk. This programme gives leaders a common language and a practical plan.',
    ],
    outcomes: [
      'Explain clearly where AI changes the centre’s work, and where it does not',
      'Identify the roles and workflows to redesign first, with a realistic view of effort and risk',
      'Set simple governance for safe, compliant AI use that HQ security and legal teams will accept',
      'Build a business case for HQ that links AI adoption to a bigger mandate for the centre',
    ],
    modules: [
      {
        title: 'What AI really changes in a GCC',
        description: 'A plain-language view of current AI capabilities and limits, mapped to the kinds of work captive centres do.',
      },
      {
        title: 'Mapping your centre’s work',
        description: 'Leaders map their own portfolio: which activities AI will automate, augment or leave untouched.',
      },
      {
        title: 'Role redesign and the talent plan',
        description: 'How roles, spans and career paths shift, and what that means for hiring, reskilling and the pyramid.',
      },
      {
        title: 'Governance and safe use',
        description: 'Data, IP and security guardrails that work with HQ policy rather than around it.',
      },
      {
        title: 'Building the case for HQ',
        description: 'Turning AI adoption into a story about capability and ownership, with measures HQ cares about.',
      },
      {
        title: 'Your 90-day plan',
        description: 'Each leader leaves with priorities, owners and the first experiments for their own area.',
      },
    ],
    formats: [
      {
        name: 'Leadership workshop',
        duration: '1 day',
        detail: 'On-site with the leadership team. Grounded in your centre’s portfolio, not generic case studies.',
      },
      {
        name: 'Team AI-redesign sprints',
        duration: '2–4 weeks per team (optional)',
        detail: 'Facilitated sprints where individual teams redesign one workflow end to end and measure the result.',
      },
    ],
    impact: [
      'Pre and post AI literacy assessment for every participant',
      'Number of workflows redesigned and moved into pilot within 90 days',
      'Quality of the HQ business case, reviewed with your business sponsor',
    ],
    related: ['genai-engineering-delivery', 'ownership-mandate-transfer'],
    cta: 'Plan a leadership workshop',
  },
  {
    slug: 'genai-engineering-delivery',
    title: 'GenAI for Engineering and Delivery Teams',
    icon: 'code-xml',
    summary:
      'Hands-on use of AI copilots and agents in real engineering and delivery workflows, done safely and measured properly.',
    categories: ['AI'],
    audienceShort: 'Engineers, tech leads, QA, delivery',
    durationShort: '1–2 days or multi-week',
    formatShort: 'Bootcamp or cohort',
    whoFor: [
      'Software engineers and tech leads',
      'QA and test automation engineers',
      'Delivery, release and operations teams',
      'Engineering managers who need to show productivity gains',
    ],
    challenge: [
      'Most teams have access to AI tools. Few use them well. Usage is uneven, results are anecdotal and nobody is sure what is allowed under the client or HQ data policy.',
      'This programme moves teams from occasional prompting to consistent, safe use inside the workflows they already run, with a baseline so you can show HQ what changed.',
    ],
    outcomes: [
      'Use AI copilots and agents confidently across design, coding, testing, documentation and support',
      'Apply your organisation’s data and security policies in day-to-day AI use',
      'Review and verify AI output so quality and accountability stay with the team',
      'Measure productivity and quality impact against an agreed baseline',
    ],
    modules: [
      {
        title: 'Working with AI in the delivery lifecycle',
        description: 'Where copilots and agents help most, from requirements to production support.',
      },
      {
        title: 'Prompting and context for engineering work',
        description: 'Practical techniques for code, tests, reviews and documentation, using your own stack.',
      },
      {
        title: 'Agents and automation',
        description: 'Using AI agents for multi-step tasks, and knowing when a human must stay in the loop.',
      },
      {
        title: 'Safe use and data policy',
        description: 'What can and cannot go into a prompt, licensing, IP and the audit trail HQ expects.',
      },
      {
        title: 'Quality and verification',
        description: 'Reviewing AI-generated work, catching subtle errors and keeping standards high.',
      },
      {
        title: 'Measuring the gain',
        description: 'Setting a baseline, choosing honest metrics and reporting results to leadership.',
      },
    ],
    formats: [
      {
        name: 'Hands-on bootcamp',
        duration: '1–2 days',
        detail: 'Lab-based sessions using your tools and sample work from your own repositories where policy allows.',
      },
      {
        name: 'Multi-week cohort',
        duration: '4–6 weeks',
        detail: 'Short weekly sessions with on-the-job assignments and a measured team project at the end.',
      },
    ],
    impact: [
      'Baseline and follow-up on agreed delivery metrics (for example cycle time, review effort, defect rates)',
      'Adoption and confident-use survey at 30 and 90 days',
      'Policy compliance checks agreed with your security team',
    ],
    related: ['ai-ready-leadership', 'services-to-captive-onboarding'],
    cta: 'Discuss a team bootcamp',
  },
  {
    slug: 'gcc-manager-accelerator',
    title: 'GCC Manager Accelerator',
    icon: 'users',
    summary:
      'A cohort programme for the “missing middle”: new and mid-level managers who must lead, decide and coach without escalating to HQ.',
    categories: ['Managers', 'Leadership'],
    audienceShort: 'New and mid-level managers',
    durationShort: '3–4 months',
    formatShort: 'Cohort with coaching',
    whoFor: [
      'Engineers and specialists recently promoted to manager',
      'Mid-level managers taking on larger or distributed teams',
      'High-potential leads being prepared for a first management role',
    ],
    challenge: [
      'As centres grow, strong individual contributors are promoted fast, often without preparation. They keep doing the work themselves, escalate decisions to HQ and struggle with difficult conversations.',
      'That gap in the middle limits how much ownership HQ is willing to hand over. The Accelerator builds the habits of a confident manager over several months, not in a single classroom day.',
    ],
    outcomes: [
      'Make the shift from individual contributor to leader, and delegate real ownership',
      'Run coaching 1:1s and feedback conversations that improve performance',
      'Take decisions locally, and know when escalation is genuinely needed',
      'Lead distributed and cross-time-zone teams with clarity and trust',
    ],
    modules: [
      {
        title: 'From doing to leading',
        description: 'Redefining your role, managing your time and letting go of the work you used to own.',
      },
      {
        title: 'Coaching 1:1s and feedback',
        description: 'A simple structure for regular 1:1s, plus practice on difficult conversations.',
      },
      {
        title: 'Delegation and ownership',
        description: 'Delegating outcomes, not tasks, and building a team that does not need you in every decision.',
      },
      {
        title: 'Deciding without escalating',
        description: 'Decision rights, risk judgement and how to brief HQ after the fact with confidence.',
      },
      {
        title: 'Leading distributed teams',
        description: 'Rituals, communication and trust across locations and time zones.',
      },
      {
        title: 'On-the-job project',
        description: 'Each manager leads a real improvement in their area and presents the result to sponsors.',
      },
    ],
    formats: [
      {
        name: 'Cohort programme',
        duration: '3–4 months',
        detail: 'Monthly workshops, peer learning groups and practice between sessions. Typically 15–25 managers per cohort.',
      },
      {
        name: 'Individual coaching',
        duration: '3–4 sessions per manager',
        detail: 'One-to-one coaching with experienced leaders to work through real situations.',
      },
      {
        name: 'On-the-job project',
        duration: 'Runs alongside the cohort',
        detail: 'A sponsored project that applies the learning to the manager’s own team.',
      },
    ],
    impact: [
      '180-degree feedback from team members at the start and end',
      'Reduction in escalations to HQ for decisions the manager owns',
      'Project outcomes reviewed by business sponsors',
    ],
    related: ['global-stakeholder-management', 'ownership-mandate-transfer'],
    cta: 'Plan a manager cohort',
  },
  {
    slug: 'services-to-captive-onboarding',
    title: 'Services-to-Captive Onboarding',
    icon: 'door-open',
    summary:
      'Helps laterals from IT services firms make the shift to ownership, outcomes and product thinking, so they become productive sooner.',
    categories: ['Onboarding'],
    audienceShort: 'Laterals from IT services firms',
    durationShort: '2–3 days',
    formatShort: 'Runs every intake',
    whoFor: [
      'Lateral hires joining from IT services and consulting firms',
      'Hiring managers who onboard laterals into their teams',
      'HR and L&D teams responsible for induction',
    ],
    challenge: [
      'Most GCC laterals come from services firms. They are capable, but used to a world of clients, SOWs and utilisation targets. In a captive centre they are the owner, and the measure is the outcome for the business.',
      'Generic induction covers policies and tools, not that mindset shift. This programme tackles it directly, so new joiners stop waiting for a spec and start acting like owners.',
    ],
    outcomes: [
      'Understand how a GCC works with HQ, and where they fit in the global organisation',
      'Shift from scope, SOW and utilisation thinking to ownership, outcomes and product thinking',
      'Build relationships with global counterparts quickly and with confidence',
      'Reach full productivity faster, with a clear 90-day plan agreed with their manager',
    ],
    modules: [
      {
        title: 'How a captive centre really works',
        description: 'The GCC operating model, funding, governance and the relationship with HQ.',
      },
      {
        title: 'From client to owner',
        description: 'What changes when there is no client to escalate to and no SOW to hide behind.',
      },
      {
        title: 'Outcome and product thinking',
        description: 'Understanding the business you serve and measuring success by its results.',
      },
      {
        title: 'Working with global colleagues',
        description: 'Communication norms, meetings and building trust with HQ counterparts.',
      },
      {
        title: 'Your first 90 days',
        description: 'A personal plan agreed with the hiring manager, with clear milestones.',
      },
    ],
    formats: [
      {
        name: 'Onboarding programme',
        duration: '2–3 days',
        detail: 'Interactive sessions built around real GCC situations, ideally in the first month after joining.',
      },
      {
        name: 'Recurring intakes',
        duration: 'Monthly or quarterly',
        detail: 'Runs for every intake so the experience stays consistent as the centre scales.',
      },
      {
        name: 'Manager briefing',
        duration: '90 minutes',
        detail: 'A short session for hiring managers on supporting laterals through the transition.',
      },
    ],
    impact: [
      'Time to productivity, compared with previous intakes',
      'New joiner and manager confidence surveys at 30, 60 and 90 days',
      'Early attrition among laterals in their first year',
    ],
    related: ['global-stakeholder-management', 'gcc-manager-accelerator'],
    cta: 'Set up onboarding for your next intake',
  },
  {
    slug: 'global-stakeholder-management',
    title: 'Global Stakeholder Management',
    icon: 'globe',
    summary:
      'Practical skills for working with HQ: influencing without authority, pushing back well and running global meetings that decide things.',
    categories: ['Managers'],
    audienceShort: 'Managers and leads working with HQ',
    durationShort: '1–2 days',
    formatShort: 'Workshop',
    whoFor: [
      'Managers and leads with HQ or global stakeholders',
      'Product owners, programme managers and architects',
      'Anyone who presents to, negotiates with or reports to global leaders',
    ],
    challenge: [
      'A centre earns more ownership when its people are seen as peers, not order-takers. That depends less on technical skill and more on how people influence, disagree and communicate across cultures.',
      'Many capable managers say yes too readily, struggle to push back or lose the room in global calls. This workshop builds those skills through practice on real scenarios.',
    ],
    outcomes: [
      'Map stakeholders and build influence without formal authority',
      'Push back constructively and negotiate scope, timelines and priorities',
      'Communicate clearly across cultures and with senior global leaders',
      'Run global meetings that end with decisions and owners',
    ],
    modules: [
      {
        title: 'Stakeholder mapping',
        description: 'Understanding who matters, what they need and how decisions are really made at HQ.',
      },
      {
        title: 'Influencing without authority',
        description: 'Building credibility and making a case that global leaders act on.',
      },
      {
        title: 'Saying no, constructively',
        description: 'Pushing back on unrealistic asks while protecting the relationship.',
      },
      {
        title: 'Cross-cultural communication',
        description: 'Working styles across the US, UK, Europe and APAC, and avoiding common misreads.',
      },
      {
        title: 'Running effective global meetings',
        description: 'Preparation, facilitation and follow-up that make every call count.',
      },
    ],
    formats: [
      {
        name: 'Workshop',
        duration: '1–2 days',
        detail: 'Practice-heavy sessions with role plays built from situations your teams face.',
      },
      {
        name: 'Follow-up clinic',
        duration: '2 hours, after 4–6 weeks',
        detail: 'Participants bring real situations from the weeks after the workshop.',
      },
    ],
    impact: [
      'Stakeholder feedback from HQ counterparts before and after',
      'Self and manager ratings on agreed behaviours',
      'Examples of decisions taken locally that previously went to HQ',
    ],
    related: ['gcc-manager-accelerator', 'ownership-mandate-transfer'],
    cta: 'Book a workshop',
  },
  {
    slug: 'ownership-mandate-transfer',
    title: 'Ownership and Mandate Transfer',
    icon: 'arrow-right-left',
    summary:
      'For leaders taking over work from HQ: plan the transition, transfer knowledge, manage risk and prove the centre is ready.',
    categories: ['Leadership'],
    audienceShort: 'Delivery and programme leaders',
    durationShort: 'Workshop + playbook',
    formatShort: 'Workshop, playbook, coaching',
    whoFor: [
      'Delivery and programme leaders taking on work from HQ',
      'Transition managers and PMO leads',
      'Site leaders preparing a case for a larger mandate',
    ],
    challenge: [
      'Winning a new mandate is only the start. Transitions slip when knowledge transfer is shallow, risks are not surfaced early and HQ teams are unsure the centre is ready to run the work alone.',
      'This programme gives transition leaders a shared method and a playbook they can reuse, so each transfer is faster and builds HQ’s confidence for the next one.',
    ],
    outcomes: [
      'Plan a transition through shadow, reverse shadow and independent phases',
      'Run knowledge transfer that captures how work is really done, not only the documents',
      'Identify, track and manage transition risk with HQ counterparts',
      'Prove readiness to HQ with clear evidence and exit criteria',
    ],
    modules: [
      {
        title: 'Anatomy of a successful transfer',
        description: 'What separates transitions that build trust from those that damage it.',
      },
      {
        title: 'Planning the phases',
        description: 'Shadow, reverse shadow and independent operation, with entry and exit criteria for each.',
      },
      {
        title: 'Knowledge transfer that sticks',
        description: 'Capturing tacit knowledge, decisions and context, not only process documents.',
      },
      {
        title: 'Risk and governance',
        description: 'A simple risk register, escalation paths and the governance rhythm with HQ.',
      },
      {
        title: 'Proving readiness',
        description: 'Building the evidence pack that gives HQ confidence to hand over ownership.',
      },
    ],
    formats: [
      {
        name: 'Workshop',
        duration: '1–2 days',
        detail: 'Works through a live or upcoming transition so the plan is ready to use.',
      },
      {
        name: 'Transition playbook',
        duration: 'Included',
        detail: 'Templates, checklists and readiness criteria adapted to your centre.',
      },
      {
        name: 'Transition coaching',
        duration: 'Optional, through the transition',
        detail: 'Regular check-ins with the transition lead at each phase gate.',
      },
    ],
    impact: [
      'Transition milestones met against plan',
      'Readiness criteria agreed and signed off with HQ',
      'Post-transition stability: incidents, escalations and stakeholder satisfaction',
    ],
    related: ['ai-ready-leadership', 'global-stakeholder-management'],
    cta: 'Talk about your next transition',
  },
];

/** Shown alongside the programme cards */
export const customWorkshop = {
  title: 'Custom workshop',
  icon: 'pencil-ruler',
  summary: 'Have a specific challenge? We design workshops around your centre’s mandate.',
  href: '/contact/',
};

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);
