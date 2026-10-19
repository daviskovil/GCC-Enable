/**
 * Programme catalogue. Every programme card, dropdown entry, footer link and
 * detail page (/programmes/[slug]/) is generated from this file.
 * To add a programme, add an object to the array; the site picks it up automatically.
 */

import { topics, type TopicSlug } from './topics';

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
  /** Topic area this programme sits under (see src/data/topics.ts) */
  topic: TopicSlug;
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

export const programmes: Programme[] = [
  {
    slug: 'ai-ready-leadership',
    title: 'AI-Ready Leadership',
    icon: 'compass',
    summary:
      'AI literacy for the people who decide where the centre goes next: what changes, what to redesign and how to make the case to HQ.',
    topic: 'ai',
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
    topic: 'ai',
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
    topic: 'leadership',
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
      'A “GCC 101” for laterals from IT services firms: the shift to ownership, outcomes and product thinking, so they become productive sooner.',
    topic: 'onboarding',
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
    topic: 'stakeholder',
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
    topic: 'leadership',
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
  {
    slug: 'product-thinking',
    title: 'Product Management and Product Thinking',
    icon: 'lightbulb',
    summary:
      'Helps GCC teams move from delivering requirements to owning problems, outcomes and product decisions alongside HQ.',
    topic: 'product',
    audienceShort: 'Product owners, leads, engineers',
    durationShort: '2 days or 6-week cohort',
    formatShort: 'Workshop or cohort',
    whoFor: [
      'Product owners and product managers in the centre',
      'Engineering and tech leads who want a bigger say in what gets built',
      'Business analysts moving into product roles',
      'Leaders building product ownership in India',
    ],
    challenge: [
      'As HQ hands over whole products rather than tasks, India teams are expected to decide what to build, not only how. Many have grown up in a requirements-driven world where the backlog arrives fully formed.',
      'This programme builds the habits of product thinking: understanding users and the business, framing problems, prioritising with evidence and measuring outcomes, so the centre earns a real seat in product decisions.',
    ],
    outcomes: [
      'Frame work as problems and outcomes, not features and tickets',
      'Understand users and the business model behind the product',
      'Prioritise a roadmap with clear trade-offs and evidence',
      'Define and track product metrics that HQ product leaders recognise',
    ],
    modules: [
      {
        title: 'From project to product',
        description: 'What changes when a GCC team owns a product, and what HQ expects of a product owner in India.',
      },
      {
        title: 'Understanding users and the business',
        description: 'Customer discovery, journey mapping and the commercial model behind the product.',
      },
      {
        title: 'Problem framing and prioritisation',
        description: 'Writing problem statements, sizing opportunities and making trade-offs visible.',
      },
      {
        title: 'Roadmaps and stakeholder alignment',
        description: 'Building outcome-based roadmaps and aligning them with HQ product leadership.',
      },
      {
        title: 'Product metrics and experiments',
        description: 'Choosing metrics that matter, running small experiments and learning from the results.',
      },
      {
        title: 'Working with engineering and design',
        description: 'Running discovery and delivery together, so ideas reach users faster.',
      },
    ],
    formats: [
      {
        name: 'Workshop',
        duration: '2 days',
        detail: 'Practical sessions using a product from your own portfolio as the running case.',
      },
      {
        name: 'Cohort programme',
        duration: '6 weeks',
        detail: 'Weekly sessions with assignments applied to live products, ending with a roadmap review.',
      },
    ],
    impact: [
      'Quality of problem statements and roadmaps, reviewed with product sponsors',
      'Share of backlog items linked to a measurable outcome',
      'HQ product leaders’ feedback on India team contribution',
    ],
    related: ['global-stakeholder-management', 'delivery-excellence-agile'],
    cta: 'Discuss product thinking for your teams',
  },
  {
    slug: 'cloud-data-security-certifications',
    title: 'Cloud, Data and Cybersecurity Certification Tracks',
    icon: 'cloud',
    summary:
      'Structured, cohort-based preparation for cloud, data and security certifications, tied to the skills your roadmap needs.',
    topic: 'cloud-data-security',
    audienceShort: 'Engineers, data and security teams',
    durationShort: '6–10 weeks per track',
    formatShort: 'Certification cohort',
    whoFor: [
      'Engineers moving onto cloud platforms',
      'Data engineers, analysts and platform teams',
      'Security, risk and infrastructure teams',
      'L&D teams running certification targets for the centre',
    ],
    challenge: [
      'Certification targets are common in GCC talent plans, but self-study pass rates are often low and the learning rarely connects to the work the centre is taking on.',
      'We design certification tracks around your technology roadmap, with structured study, hands-on practice and regular progress reviews, so more people pass and the skills show up on projects.',
    ],
    outcomes: [
      'Prepare for the certifications that match the centre’s cloud, data and security roadmap',
      'Build hands-on skills through labs, not only exam practice',
      'Apply what they learn to real projects in the centre',
      'Track progress and readiness across the cohort',
    ],
    modules: [
      {
        title: 'Skills and certification mapping',
        description: 'Matching roles to the right certifications on your chosen cloud, data and security platforms.',
      },
      {
        title: 'Cloud foundations and architecture',
        description: 'Core services, architecture patterns, cost and operations on your primary cloud.',
      },
      {
        title: 'Data engineering and analytics',
        description: 'Pipelines, platforms and governance for data and analytics teams.',
      },
      {
        title: 'Cybersecurity essentials',
        description: 'Security fundamentals, cloud security and the controls HQ audit teams look for.',
      },
      {
        title: 'Exam preparation and practice',
        description: 'Study plans, practice assessments and review sessions before each exam.',
      },
      {
        title: 'Applying it at work',
        description: 'Short applied projects so the certification turns into contribution on live work.',
      },
    ],
    formats: [
      {
        name: 'Certification cohort',
        duration: '6–10 weeks per track',
        detail: 'Guided study with weekly live sessions, labs and practice assessments.',
      },
      {
        name: 'Bootcamp',
        duration: '3–5 days',
        detail: 'Intensive preparation for teams with a near-term certification deadline.',
      },
      {
        name: 'Progress reporting',
        duration: 'Throughout',
        detail: 'Regular readiness reports to L&D and engineering leaders.',
      },
    ],
    impact: [
      'Certification pass rates against previous self-study cohorts',
      'Time from enrolment to certification',
      'Number of certified people deployed onto relevant projects',
    ],
    related: ['genai-engineering-delivery', 'delivery-excellence-agile'],
    cta: 'Plan a certification track',
  },
  {
    slug: 'delivery-excellence-agile',
    title: 'Delivery Excellence and Agile at Scale',
    icon: 'gauge',
    summary:
      'Predictable, high-quality delivery across distributed teams: Agile at scale (including SAFe), flow and engineering productivity.',
    topic: 'delivery',
    audienceShort: 'Delivery leads, Scrum masters, managers',
    durationShort: '2 days + optional coaching',
    formatShort: 'Workshop and team coaching',
    whoFor: [
      'Delivery managers and programme leads',
      'Scrum masters, release train engineers and Agile coaches',
      'Engineering managers responsible for team productivity',
      'Teams working across India and HQ on shared roadmaps',
    ],
    challenge: [
      'Distributed delivery is hard. Plans slip between locations, dependencies surface late and “Agile” becomes a set of ceremonies rather than a faster way to deliver value.',
      'This programme focuses on what actually improves delivery: clear planning across teams, healthy flow, fewer handoffs and honest metrics, adapted to the framework your organisation already uses, whether SAFe or another approach.',
    ],
    outcomes: [
      'Plan and coordinate work across multiple teams and locations',
      'Apply Agile at scale practices, including SAFe where it is your organisation’s framework',
      'Improve flow by reducing handoffs, waiting time and rework',
      'Use delivery and productivity metrics that drive improvement, not reporting theatre',
    ],
    modules: [
      {
        title: 'What delivery excellence looks like in a GCC',
        description: 'Common failure points in distributed delivery, and what high-performing centres do differently.',
      },
      {
        title: 'Agile at scale in practice',
        description: 'Planning across teams, managing dependencies and aligning with HQ roadmaps, with SAFe and other frameworks.',
      },
      {
        title: 'Flow and engineering productivity',
        description: 'Value stream thinking, work in progress limits and removing bottlenecks.',
      },
      {
        title: 'Quality built in',
        description: 'Definition of done, test automation and release practices that prevent rework.',
      },
      {
        title: 'Metrics that matter',
        description: 'Flow and delivery metrics, and how to use them for improvement rather than blame.',
      },
      {
        title: 'Improvement plan',
        description: 'Each team leaves with three changes to try and a way to measure them.',
      },
    ],
    formats: [
      {
        name: 'Workshop',
        duration: '2 days',
        detail: 'For delivery leaders and Agile roles, built around your current programmes.',
      },
      {
        name: 'Team coaching',
        duration: '6–8 weeks (optional)',
        detail: 'Coaching selected teams or release trains as they apply the changes.',
      },
    ],
    impact: [
      'Predictability: planned versus delivered work across teams',
      'Flow metrics such as cycle time and work in progress',
      'Escaped defects and rework, compared with the baseline',
    ],
    related: ['ownership-mandate-transfer', 'genai-engineering-delivery'],
    cta: 'Discuss delivery excellence',
  },
  {
    slug: 'domain-upskilling',
    title: 'Domain Upskilling: Banking, Insurance, Pharma and Automotive',
    icon: 'landmark',
    summary:
      'Teaches engineers and analysts how the business they support actually works, so they can contribute ideas, not only code.',
    topic: 'domain',
    audienceShort: 'Engineers, analysts, new joiners',
    durationShort: '2–5 days per domain',
    formatShort: 'Domain bootcamp or series',
    whoFor: [
      'Engineers and analysts supporting banking, insurance, pharma or automotive businesses',
      'Laterals joining from a different industry',
      'Product owners and BAs who need deeper domain knowledge',
      'Leaders building domain-led centres of excellence',
    ],
    challenge: [
      'HQ increasingly wants India teams to understand the business, not just the system. Engineers who know how a loan is priced, a claim is settled or a clinical trial runs make better decisions and ask better questions.',
      'Most domain training is either too generic or too academic. These programmes are built around the processes, regulations and terminology your teams meet every day, with examples from your own systems.',
    ],
    outcomes: [
      'Explain the core business processes and value chain of their domain',
      'Understand the key regulations and controls that shape the work',
      'Use domain language confidently with HQ business stakeholders',
      'Spot improvement opportunities where technology and business meet',
    ],
    modules: [
      {
        title: 'Banking and financial services',
        description: 'Retail and corporate banking, payments, lending, risk and regulatory reporting.',
      },
      {
        title: 'Insurance',
        description: 'Products, underwriting, policy administration, claims and distribution.',
      },
      {
        title: 'Pharma and life sciences',
        description: 'Drug development, clinical trials, regulatory affairs, pharmacovigilance and GxP basics.',
      },
      {
        title: 'Automotive',
        description: 'Vehicle development, manufacturing, supply chain, software-defined vehicles and aftersales.',
      },
      {
        title: 'Regulation and compliance in practice',
        description: 'The rules that shape each domain and what they mean for technology teams.',
      },
      {
        title: 'Applying domain knowledge',
        description: 'Case work linking business processes to the systems and data your teams own.',
      },
    ],
    formats: [
      {
        name: 'Domain bootcamp',
        duration: '2–5 days per domain',
        detail: 'Intensive programme for a team or intake, customised to your business lines.',
      },
      {
        name: 'Learning series',
        duration: 'Weekly, over 6–8 weeks',
        detail: 'Short sessions alongside work, with case studies and quizzes.',
      },
    ],
    impact: [
      'Domain knowledge assessment before and after',
      'Business stakeholder feedback on India team contribution',
      'Improvement ideas raised and taken forward by participants',
    ],
    related: ['product-thinking', 'services-to-captive-onboarding'],
    cta: 'Discuss domain upskilling',
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

/** Programmes grouped under each topic, in topic order (topics with no programme are skipped). */
export const programmesByTopic = topics
  .map((topic) => ({ topic, programmes: programmes.filter((p) => p.topic === topic.slug) }))
  .filter((g) => g.programmes.length > 0);
