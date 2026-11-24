import type {
  Cta,
  HeroSlide,
  NavLink,
  ProjectItem,
  ServiceItem,
  SocialLink,
  Stat,
  TeamMember,
  Testimonial,
} from '@/types';

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

const heroSlides: HeroSlide[] = [
  {
    src: '/images/hero/letter-d.svg',
    inset: '-0.9% -2.87% -4.04% -6.42%',
    words: { primary: 'Digital', secondary: 'Strategy' },
    labels: { primary: 'Impact', secondary: 'Identity' },
    leftBlurb: 'We help shape your digital presence with smart, scalable strategies built for growth.',
    rightBlurb: 'Whether launching or evolving, we align your goals with clear, creative direction.',
  },
  {
    src: '/images/hero/letter-3.svg',
    inset: '-0.7% -4.06% -0.6% -3.4%',
    words: { primary: 'Custom', secondary: 'Code' },
    labels: { primary: 'Backend', secondary: 'Frontend' },
    leftBlurb: 'We build websites and apps from the ground up—fast, flexible, and uniquely yours.',
    rightBlurb: 'Every line of code is tailored to your brand’s needs, with performance and polish in mind.',
  },
  {
    src: '/images/hero/letter-2.svg',
    inset: '-1.02% 0 -1.2% 0',
    words: { primary: 'Intuitive', secondary: 'Design' },
    labels: { primary: 'Unique', secondary: 'Creative' },
    leftBlurb: 'We craft beautiful, user-centered interfaces that feel effortless to use.',
    rightBlurb: 'From wireframes to final visuals, every detail is designed with purpose and precision.',
  },
];

const services: ServiceItem[] = [
  {
    id: 'product-strategy',
    title: 'Product Strategy',
    description:
      'We turn big ideas into clear roadmaps, aligning your goals, audience, and product vision from day one.',
    image: '/images/service-product-strategy.webp',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'We build campaigns and content that feel human, helping small brands get seen, remembered, and chosen.',
    image: '/images/service-digital-marketing.webp',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description:
      'We create intuitive, user-centered interfaces that make navigating your product effortless and enjoyable.',
    image: '/images/service-ui-ux-design.webp',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Clean, fast, and scalable code that brings every design to life exactly as it was imagined.',
    image: '/images/service-web-development.webp',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description:
      'Logos, palettes, and voice systems that capture who you are and make your brand unmistakable.',
    image: '/images/service-brand-identity.webp',
  },
];

const projects: ProjectItem[] = [
  {
    title: 'Studio Reverie',
    tags: ['Brand Identity', 'Creative Direction', 'Web Design', 'Portfolio'],
    description:
      'A dreamy digital showcase for a multidisciplinary artist collective—where every scroll reveals a new layer of expression.',
    image: '/images/work-studio-reverie.webp',
    imageAlt: 'Studio Reverie website shown on a laptop screen',
    cta: 'Learn More',
    href: '/portfolio/studio-reverie',
  },
  {
    title: 'Bloom Journal',
    tags: ['E-commerce', 'UI/UX Design', 'Web Development'],
    description:
      'A minimalist online store for a wellness brand, blending calming visuals with a seamless shopping experience.',
    image: '/images/work-bloom-journal.webp',
    imageAlt: 'Bloom Journal online store being browsed on a laptop',
    cta: 'Learn More',
    href: '/portfolio/bloom-journal',
  },
  {
    title: 'Pixelmint',
    tags: ['Web App', 'UI/UX Design', 'Creative Tools', 'Frontend Dev'],
    description:
      'A browser-based photo editor built for fast, friendly edits, with a calm interface that never gets in the way of the picture.',
    image: '/images/work-pixelmint.webp',
    imageAlt: 'Pixelmint photo editing app open on a widescreen monitor',
    cta: 'Learn More',
    href: '/portfolio/pixelmint',
  },
];

const team: TeamMember[] = [
  {
    name: 'Lina Marquez',
    role: 'Creative Director',
    image: '/images/team-lina-marquez.webp',
    imageAlt: 'Portrait of Lina Marquez holding a sticker-covered laptop',
  },
  {
    name: 'Elliot Tanaka',
    role: 'Lead Developer',
    image: '/images/team-elliot-tanaka.webp',
    imageAlt: 'Portrait of Elliot Tanaka working at a laptop with headphones',
  },
  {
    name: 'Rosa Kim',
    role: 'Product Designer',
    image: '/images/team-rosa-kim.webp',
    imageAlt: 'Portrait of Rosa Kim sketching in a notebook beside a laptop',
  },
  {
    name: 'Noah Castell',
    role: 'Strategy & Growth Lead',
    image: '/images/team-noah-castell.webp',
    imageAlt: 'Portrait of Noah Castell seated at a desk',
  },
];

const stats: Stat[] = [
  { value: '30+', label: 'Projects Launched' },
  { value: '15', label: 'Creative Collaborators' },
  { value: '100%', label: 'Custom Built' },
  { value: '10K+', label: 'Users Reached' },
];

const testimonials: Testimonial[] = [
  {
    quote:
      '“Vundabarweb didn’t just design a website—they helped me define my entire online presence. Every page feels like an extension of my brand, and my audience noticed instantly.”',
    name: 'Isabella Reign',
    role: 'Founder, Studio Reverie',
  },
  {
    quote:
      '“Working with Vundabarweb felt like having a creative partner who genuinely cared. Smart strategy, gorgeous design, and a dev team that actually listens. Game changer.”',
    name: 'Jules Merrick',
    role: 'Creative Director, Kin Studio',
  },
  {
    quote:
      '“They took a messy pile of ideas and turned it into a site that feels exactly like us. The process was calm, clear and genuinely fun from the first call to launch day.”',
    name: 'Marta Okoye',
    role: 'Owner, Lumen Ceramics',
  },
  {
    quote:
      '“Our bookings doubled within two months of going live. Vundabarweb understood our audience better than we did and built something people actually enjoy using.”',
    name: 'Daniel Brandt',
    role: 'Co-founder, Northbound Tours',
  },
  {
    quote:
      '“Thoughtful, fast and endlessly patient with my feedback. The final portfolio is beautiful, and I get compliments on it every single week.”',
    name: 'Sofia Lindqvist',
    role: 'Photographer, Studio Lindqvist',
  },
];

const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/vundabarweb', icon: '/images/icons/linkedin.svg', width: 17.892, height: 18 },
  { label: 'Facebook', href: 'https://www.facebook.com/vundabarweb', icon: '/images/icons/facebook.svg', width: 9.45, height: 18 },
  { label: 'X', href: 'https://x.com/vundabarweb', icon: '/images/icons/x.svg', width: 18, height: 16.313 },
  { label: 'Instagram', href: 'https://www.instagram.com/vundabarweb', icon: '/images/icons/instagram.svg', width: 18, height: 18 },
];

const startCta: Cta = { label: 'Start Now', href: '/contact' };

export const siteContent = {
  brand: {
    name: 'Vundabarweb',
    logo: '/images/logo.svg',
    logoAlt: 'Vundabarweb',
  },
  // The logo already links home and the "Start Now" button goes to the contact page, so the navbar leaves
  // "Home" and "Contact" out (the footer keeps both).
  nav: { ariaLabel: 'Main navigation', links: navLinks.filter((link) => link.href !== '/' && link.href !== '/contact'), cta: startCta, menuOpen: 'Open menu', menuClose: 'Close menu' },
  hero: {
    slides: heroSlides,
    controls: { prev: 'Previous slide', next: 'Next slide', goTo: 'Go to slide' },
  },
  about: {
    intro: {
      label: 'About',
      title: 'Why We Build Beautiful Things',
      body: "Vundabarweb is a boutique creative & dev studio obsessed with craft, clarity, and connection. We work closely with small brands, artists, and founders to design and develop digital spaces that feel as intentional as they are beautiful. If it's meaningful, we want to build it.",
      cta: { label: 'Work With Us', href: '/contact' } satisfies Cta,
      image: '/images/about-studio.webp',
      imageAlt: 'Vundabarweb website designs displayed across a laptop, tablet and phone',
    },
    statement: { title: 'Design is how it feels, right and real', labels: { left: 'Creative', right: 'Emotion' } },
    mission: {
      label: 'Mission',
      title: 'What Keeps Us Moving Forward',
      body: 'We create digital experiences that connect small brands and artists with their audience. Purposeful design, clean code, and strategic thinking drive every project.',
    },
    vision: {
      label: 'Vision',
      title: 'What We See on the Horizon',
      body: 'We envision a digital space where every small voice has a chance to be heard, through thoughtful design and meaningful connections.',
    },
    image: '/images/about-mission.webp',
    imageAlt: 'A hand holding a phone that shows a curated portfolio website',
  },
  services: {
    label: 'Services',
    title: 'Designing for Experience',
    cta: { label: 'Explore More', href: '/services' } satisfies Cta,
    items: services,
    initialIndex: 2,
    controls: { prev: 'Previous service', next: 'Next service' },
  },
  stats: { backdrop: 'Develop', items: stats },
  work: { label: 'Our Work', title: 'Where Ideas Become Interfaces', items: projects },
  team: { label: 'Team', title: 'The Minds Behind the Magic', members: team },
  testimonials: {
    label: 'Testimonials',
    title: 'Kind Words From Our Clients',
    items: testimonials,
    controls: { prev: 'Previous testimonial', next: 'Next testimonial' },
  },
  footer: {
    navAriaLabel: 'Footer navigation',
    links: [...navLinks, { label: 'Journal', href: '/journal' }],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms and Conditions', href: '/terms-and-conditions' },
    ] satisfies NavLink[],
    social: socialLinks,
    socialAriaLabel: 'Social media',
  },
} as const;
