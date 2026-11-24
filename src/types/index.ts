export interface NavLink {
  label: string;
  href: string;
}

export interface HeroSlide {
  /** Large decorative letter behind the headline. */
  src: string;
  /** CSS inset shorthand: the SVG bleeds slightly past its 600px box (taken from Figma). */
  inset: string;
  /** Big headline words: `primary` top right, `secondary` bottom left. */
  words: { primary: string; secondary: string };
  /** Orange script words laid over the headline words. */
  labels: { primary: string; secondary: string };
  leftBlurb: string;
  rightBlurb: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ProjectItem {
  title: string;
  tags: string[];
  description: string;
  image: string;
  imageAlt: string;
  cta: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  width: number;
  height: number;
}

export interface Cta {
  label: string;
  href: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Deliverable {
  title: string;
  text: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  /** Script word laid over the page title. */
  label: string;
  summary: string;
  intro: string;
  image: string;
  imageAlt: string;
  /** Typical deliverables, shown as small tags on the services grid. */
  tags: string[];
  outcomes: Stat[];
  deliverables: Deliverable[];
  approach: { title: string; text: string; image: string }[];
  tools: string[];
  faqs: Faq[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: string;
  /** Script word laid over the title, e.g. "Brand + Web". */
  label: string;
  industry: string;
  /** Slugs of the services involved (see ServiceDetail). */
  services: string[];
  tags: string[];
  timeline: string;
  summary: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  /** Tall / wide hint for the portfolio grid. */
  shape: 'wide' | 'tall';
  headlineResult: string;
  brief: string;
  challenge: string;
  pullQuote: string;
  solution: { label: string; title: string; text: string; image: string; imageAlt: string }[];
  gallery: { src: string; alt: string }[];
  results: { value: string; text: string }[];
  testimonial: Testimonial;
}

export type PostBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption: string }
  | { type: 'code'; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date. */
  date: string;
  readingTime: string;
  author: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  /** Related service slug for the closing CTA. */
  service: string;
  content: PostBlock[];
}

export interface OpenRole {
  title: string;
  type: string;
  location: string;
  summary: string;
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}
