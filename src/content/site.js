import { FaLinkedinIn, FaGithub, FaEtsy } from 'react-icons/fa';

/**
 * Site-wide content/config — the single place to edit global page data
 * (identity, navigation, contact). Screens import from here so copy lives in
 * one layer rather than scattered through JSX. See ARCHITECTURE.md › content/.
 */

export const IDENTITY = {
  name: 'Michael Keohane',
  avatar: '/images/app-wide/icon.png',
  // The thesis the whole site exists to land (see PROJECT.md).
  pitch:
    'I turn ambiguous problems into shipped products, whether working across cross-functional teams or owning zero-to-one execution. I pair that product judgment and execution range with deep, practical experience building LLM systems under real cost, latency, and reliability constraints. Together, those strengths let me identify the right problem, shape the product, and ship it end to end with speed and discipline.',
  tagline: 'AI-Native Product Engineer · Greater Boston',
};

export const CONTACT_EMAIL = 'michaeljkeohane713@gmail.com';

export const RESUME = {
  href: '/resume_summer_2026.pdf',
  label: 'Resume',
};

/** Primary navigation. Internal routes render as client-side links. */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Experiences', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Games', href: '/games' },
];

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-keohane', icon: FaLinkedinIn },
  { label: 'GitHub', href: 'https://github.com/MJKeo', icon: FaGithub },
  { label: 'Etsy', href: 'https://www.etsy.com/shop/KeohanePhotography', icon: FaEtsy },
];
