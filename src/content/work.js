/**
 * Work content — the evidence behind the homepage argument.
 *
 *   FLAGSHIPS    the three strongest proofs (CineMind, Meta, Home Depot) that
 *                the homepage leads with, per the IA spec.
 *   EXPLORATIONS the smaller "AI year" projects — progressively smaller paths
 *                into Michael's broader AI/product work.
 *
 * Every item is data-only so screens and the reusable <ProjectCard> can render
 * it. `category` drives which index screen lists it (projects/experience/games).
 * `href` points at the item's detail route. Thumbnails are intentional
 * placeholders until real imagery is supplied (see <Thumbnail>).
 */

export const FLAGSHIPS = [
  {
    slug: 'cinemind',
    category: 'project',
    href: '/projects/cinemind',
    title: 'CineMind',
    cover: '/images/projects/cinemind_banner.png',
    subtitle: 'Advanced LLM systems and zero-to-one product ownership',
    summary:
      'A film discovery platform centered around describing what you\'re in the mood for. Its two core LLM systems work from opposite sides of the search problem: one represents each movie across complementary semantic vector spaces and lexical data, while the other converts natural-language intent into executable searches over that representation. Reduced generation costs by 4x and search latency by 25% through evaluation-driven optimization. Currently deployed and in active iteration.',
  },
  {
    slug: 'instagram',
    category: 'experience',
    href: '/experience/instagram',
    title: 'Instagram',
    cover: '/images/experiences/instagram_banner.png',
    subtitle: 'Cross-functional execution at scale',
    summary:
      'Here I shipped user-facing products to millions of creators inside mature, high-traffic systems, often while designs and dependencies were still moving. We worked quickly, wearing whatever hat was needed to meet our deadlines. Beyond implementation, owned the experimentation and analysis needed to understand what worked, why, and what to build next. By the end of my tenure I was leading self-initiated projects involving multiple engineers and XFN collaborators.',
  },
  {
    slug: 'orangeworks-innovation-lab',
    category: 'experience',
    href: '/experience/orangeworks-innovation-lab',
    title: 'OrangeWorks Innovation Lab',
    cover: '/images/experiences/orangeworks_banner.png',
    subtitle: 'Stakeholder research and solution design',
    summary:
      'Given a broad problem space rather than a feature request, I spent weeks interviewing stakeholders to understand where Pro customers were experiencing the most friction. I identified in-store waiting as a recurring pain point, designed and built a prototype for pre-authorized purchasing allowances, and pitched it to executives. They approved the concept for production, and it is now a launched feature within Home Depot\'s Pro Extra program.',
  },
];

export const EXPLORATIONS = [
  {
    slug: 'interviewpro',
    category: 'project',
    href: '/projects/interviewpro',
    title: 'InterviewPro',
    cover: '/images/projects/interview_pro_banner.png',
    summary:
      'An AI interview-prep platform that researches a target role, conducts a tailored mock interview, and provides answer-by-answer feedback.',
    tags: ['Multi-agent', 'LLM-as-judge', 'Voice'],
  },
  {
    slug: 'nerdbot',
    category: 'game',
    href: '/games/nerdbot',
    title: 'NerdBot',
    cover: '/images/projects/nerdbot_banner.png',
    summary:
      'A conversational video game discovery assistant that researches and recommends games from a live database.',
    tags: ['Agents', 'Tool use', 'Gradio'],
  },
  {
    slug: 'wizard-battle',
    category: 'game',
    href: '/games/wizard-battle',
    title: 'Wizard Battle',
    cover: '/images/projects/wizard_battle_banner.png',
    summary:
      'A two-player battle game where AI turns free-form wizard descriptions into combatants and controls their decisions in turn-based duels.',
    tags: ['Structured generation', 'Eval', 'Game state'],
  },
];

/**
 * EARLIER_WORK — the wider, non-AI portfolio (apps, games, academic, hackathons)
 * from before/beyond the AI year. Each carries a one-line `summary` and a `cover`
 * banner (sourced from the old Personal-Website-2.0 repo). `category: 'earlier'`.
 */
export const EARLIER_WORK = [
  {
    slug: 'orm-strength-tracker',
    category: 'earlier',
    href: '/projects/orm-strength-tracker',
    title: 'ORM: Strength Progress Tracker',
    cover: '/images/projects/orm_strength_tracker_banner.png',
    summary:
      'An iOS app for lifters that uses one-rep max conversions to let you track your strength over time without needing to risk injury through high-weight, low-rep sets.',
  },
  {
    slug: 'tyes',
    category: 'earlier',
    href: '/projects/tyes',
    title: 'Tyes',
    cover: '/images/projects/tyes_banner.png',
    summary:
      'Formed through Georgia Tech\'s Grand Challenges LLC we sought to create intelligent medical devices that aided in muscular spasticity recovery.',
  },
  {
    slug: 'intelligent-tutoring-systems',
    category: 'earlier',
    href: '/projects/intelligent-tutoring-systems',
    title: 'Intelligent Tutoring Systems',
    cover: '/images/projects/intelligent_tutoring_systems_banner.png',
    summary:
      'A classroom analytics platform that pulls together years of student performance data so teachers can spot weak assignments and struggling students, and students can see where they stand and where to improve.',
  },
  {
    slug: 'ape-unit',
    category: 'earlier',
    href: '/projects/ape-unit',
    title: 'Ape Unit',
    cover: '/images/projects/ape_unit_banner.png',
    summary:
      'Using primate-themed browser games alongside comprehensive unit tests for our Data Structures class to improve comprehension and start a cultural movement.',
  },
  {
    slug: 'chaos-colleagues',
    category: 'earlier',
    href: '/projects/chaos-colleagues',
    title: 'Chaos Colleagues',
    cover: '/images/projects/chaos_colleagues_banner.png',
    summary:
      'A cross-platform party game combining the accessibility of Jackbox games with the chaos of Mario Party and the immersion of VR.',
  },
  {
    slug: 'project-shatter',
    category: 'earlier',
    href: '/projects/project-shatter',
    title: 'Project Shatter',
    cover: '/images/projects/project_shatter_banner.png',
    summary:
      'A platform concept that links rural Georgia students with paid, computing-related gig work from local businesses, so students who lack CS in school and can\'t afford to study instead of work can build real skills and earn income at the same time.',
  },
];

/** Everything, for index screens that filter by category. */
export const ALL_WORK = [...FLAGSHIPS, ...EXPLORATIONS, ...EARLIER_WORK];

export const byCategory = (category) => ALL_WORK.filter((w) => w.category === category);
export const bySlug = (slug) => ALL_WORK.find((w) => w.slug === slug);
