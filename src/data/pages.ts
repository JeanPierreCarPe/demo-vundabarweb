import type { Cta, Faq } from '@/types';

/** Copy for the inner pages. Everything shown on /services, /portfolio, /about, /team, /contact, /journal and 404. */

const startProject: Cta = { label: 'Start a project', href: '/contact' };
const seeWork: Cta = { label: 'See our work', href: '/portfolio' };

export const meta = {
  services: { title: 'Services | Vundabarweb', description: 'Product strategy, digital marketing, UI/UX design, web development and brand identity for small brands, artists and founders.' },
  portfolio: { title: 'Our Work | Vundabarweb', description: 'Selected projects from Vundabarweb: brands, websites and apps designed and built with care.' },
  about: { title: 'About | Vundabarweb', description: 'Meet the boutique creative and dev studio behind Vundabarweb: our story, values and ways of working.' },
  team: { title: 'Team | Vundabarweb', description: 'The designers, developers and strategists behind Vundabarweb, and the roles we are hiring for.' },
  contact: { title: 'Contact | Vundabarweb', description: 'Tell us about your project. We reply within one business day.' },
  journal: { title: 'Journal | Vundabarweb', description: 'Notes and ideas on design, development and strategy from the Vundabarweb studio.' },
  privacy: { title: 'Privacy Policy | Vundabarweb', description: 'How Vundabarweb collects, uses and protects your personal data.' },
  terms: { title: 'Terms and Conditions | Vundabarweb', description: 'The terms that apply when you work with Vundabarweb.' },
  notFound: { title: 'Page not found | Vundabarweb', description: 'The page you are looking for does not exist.' },
} as const;

export const servicesPage = {
  hero: {
    label: 'What we do',
    title: 'Services',
    intro: 'Five ways we help small brands, artists and founders look sharp, work smoothly and grow with confidence.',
    primary: startProject,
    secondary: { label: 'Browse services', href: '#all-services' } satisfies Cta,
  },
  grid: { label: 'Five ways', title: 'Everything we do', cardCta: 'Learn more' },
  focus: {
    label: 'In focus',
    title: 'Service in focus',
    outcomesTitle: 'What you can expect',
    cta: 'Explore',
    prev: 'Previous service',
    next: 'Next service',
  },
  process: {
    label: 'Our process',
    title: 'How we work',
    steps: [
      { title: 'Discover', text: 'We learn your goals, audience and constraints in a focused workshop.', meta: '1 week' },
      { title: 'Define', text: 'Strategy, scope and a plan everyone agrees on before design starts.', meta: '1 week' },
      { title: 'Design', text: 'Wireframes, visuals and prototypes, reviewed together at every step.', meta: '3 to 4 weeks' },
      { title: 'Build', text: 'Clean, fast, accessible code on a live link you can follow along.', meta: '3 to 5 weeks' },
      { title: 'Launch & grow', text: 'A calm launch, a handover and support while the site settles in.', meta: 'Ongoing' },
    ],
  },
  benefits: {
    label: 'Why us',
    title: 'What you get',
    intro: 'A small studio with senior people, honest communication and work built to last. No handoffs, no mystery.',
    image: '/images/studio-collab.webp',
    imageAlt: 'Studio colleagues working together around a laptop',
    items: [
      { title: 'Senior people only', text: 'You work with the people doing the work, from the first call.' },
      { title: 'Fixed scope', text: 'Clear proposals and prices, so there are no surprises on the invoice.' },
      { title: 'Built to be edited', text: 'Simple content tools so you can update the site yourself.' },
      { title: 'Performance included', text: 'Fast, accessible and search-friendly by default, not as an extra.' },
      { title: 'Launch support', text: 'We stay close after launch to fix, tune and answer questions.' },
      { title: 'Honest communication', text: 'Weekly updates and straight answers, including when we disagree.' },
    ],
  },
  packages: {
    label: 'Engagements',
    title: 'Choose how we work',
    note: 'Every project is quoted individually. Prices are a starting point.',
    banner: {
      image: '/images/studio-shoot.webp',
      imageAlt: 'Two designers reviewing photographs together in a bright studio',
      label: 'Senior hands',
      title: 'A small team that cares about every detail',
      text: 'No juniors learning on your project and no handoffs. The people you meet are the people who do the work.',
    },
    cta: 'Talk to us',
    badge: 'Most popular',
    items: [
      { name: 'Launch', audience: 'For a focused website or landing page.', price: 'From $4,000', features: ['Discovery call', 'Up to 5 pages', 'Responsive design', 'Basic SEO setup', 'Two review rounds'], highlighted: false },
      { name: 'Studio', audience: 'For brands that need design and build together.', price: 'From $9,500', features: ['Strategy workshop', 'Brand refresh', 'Custom website up to 12 pages', 'Content setup and training', 'Launch support'], highlighted: true },
      { name: 'Partner', audience: 'For ongoing design and development.', price: 'From $2,500 / month', features: ['Dedicated senior team', 'Monthly roadmap', 'Priority support', 'Performance reports', 'Cancel anytime after 3 months'], highlighted: false },
    ],
  },
  faq: {
    label: 'Questions',
    title: 'Good questions',
    image: '/images/studio-monitors.webp',
    imageAlt: 'A designer at two monitors in the studio',
    items: [
      { question: 'How long does a typical project take?', answer: 'A focused website takes six to eight weeks. A full brand and website usually takes three to four months, depending on feedback speed.' },
      { question: 'What is your pricing based on?', answer: 'On scope and complexity, not hours. You get a fixed proposal after our first conversation so you can plan with confidence.' },
      { question: 'How many revisions do I get?', answer: 'Two focused rounds per stage. Because we agree on direction early, most projects need fewer.' },
      { question: 'Who owns the final work?', answer: 'You do. All designs, code and files are yours at the end of the project, with documentation.' },
      { question: 'Do you offer maintenance after launch?', answer: 'Yes. Optional monthly plans cover updates, backups, performance checks and small changes.' },
      { question: 'Can you work with our team remotely?', answer: 'We are remote-first and work with clients in many time zones, with weekly check-ins and shared project spaces.' },
    ] satisfies Faq[],
  },
  cta: {
    label: 'Next step',
    title: 'Ready when you are',
    text: 'Tell us about your project and we will reply within one business day with ideas and next steps.',
    primary: startProject,
    secondary: seeWork,
  },
} as const;

export const portfolioPage = {
  hero: {
    label: 'Selected',
    title: 'Our Work',
    intro: 'Brands, websites and apps made with care for people who care about what they do.',
    statLabels: { projects: 'projects', industries: 'industries', countries: 'countries' },
    countries: 4,
  },
  filter: { label: 'Filter projects', all: 'All', resultSingular: 'project', resultPlural: 'projects', empty: 'No projects match this filter yet.' },
  featured: { label: 'Featured', title: 'Featured project', cta: 'View case study' },
  grid: { label: 'More work', title: 'Recent projects' },
  results: {
    backdrop: 'Results',
    items: [
      { value: '30+', label: 'Projects launched' },
      { value: '98', label: 'Average Lighthouse score' },
      { value: '7 yrs', label: 'In business' },
      { value: '85%', label: 'Clients who return' },
    ],
  },
  cta: {
    label: 'Your turn',
    title: 'Have a project in mind?',
    text: 'We would love to hear what you are building. A short message is enough to get started.',
    primary: startProject,
    secondary: { label: 'Our services', href: '/services' } satisfies Cta,
  },
} as const;

export const aboutPage = {
  hero: {
    label: 'Our story',
    title: 'Small studio. Big care.',
    intro: 'We are a boutique creative and dev studio that designs and builds with small brands, artists and founders.',
    image: '/images/studio-collab.webp',
    imageAlt: 'The Vundabarweb team working together around a table with shelves behind them',
  },
  story: {
    label: 'Story',
    title: 'Why we started',
    images: [
      { src: '/images/studio-shoot.webp', alt: 'Two colleagues reviewing photographs in a bright studio' },
      { src: '/images/studio-shelves.webp', alt: 'Warm studio shelves with design objects and the team at work' },
    ],
    paragraphs: [
      'Vundabarweb began with a simple frustration: small brands were being offered either templates that looked like everyone else or agency retainers they could not afford.',
      'We set up a studio where senior designers and developers work directly with founders, with fixed scopes and no layers in between.',
      'Today we are fifteen collaborators across four time zones, still working with a small number of clients at a time, and still answering our own email.',
    ],
    milestones: [
      { year: '2019', title: 'The first project', text: 'Two friends launch a site for a local ceramics studio.' },
      { year: '2021', title: 'A proper studio', text: 'We incorporate and take on our first full brand project.' },
      { year: '2022', title: 'Remote-first', text: 'The team grows to eight across three countries.' },
      { year: '2024', title: 'Thirty launches', text: 'We ship our thirtieth website and our first product.' },
      { year: '2025', title: 'Fifteen of us', text: 'A bigger team, the same small-studio promise.' },
    ],
  },
  values: {
    label: 'Values',
    title: 'What we believe',
    items: [
      { title: 'Craft over speed', text: 'We would rather take a day longer and get the details right.' },
      { title: 'Clarity first', text: 'Clear words, clear structure and clear communication, always.' },
      { title: 'Small is beautiful', text: 'Fewer clients means more care for each of them.' },
      { title: 'Built to last', text: 'Work you can maintain, edit and grow without us.' },
    ],
  },
  numbers: { backdrop: 'Studio' },
  principles: {
    label: 'Principles',
    title: 'How we work',
    items: [
      { title: 'Few clients at a time', body: 'We limit ourselves to a handful of projects so every one gets real attention.', image: '/images/studio-meeting.webp', imageAlt: 'The team meeting around a table' },
      { title: 'Talk to the maker', body: 'You always speak to the person doing the work, not an account manager.', image: '/images/studio-monitors.webp', imageAlt: 'A designer working at two monitors' },
      { title: 'We hand over everything', body: 'Files, code and documentation are yours, organised so anyone can continue.', image: '/images/studio-review.webp', imageAlt: 'Designers reviewing photographs together' },
    ],
  },
  rituals: {
    label: 'Rituals',
    title: 'Ways of working',
    items: [
      { title: 'Friday demos', text: 'Everyone shows work in progress, unfinished is welcome.' },
      { title: 'Async updates', text: 'Short written updates replace most meetings.' },
      { title: 'Shared Notion', text: 'One home for briefs, decisions and documentation.' },
      { title: 'Design critiques', text: 'Fifteen kind, direct minutes before anything ships.' },
      { title: 'Focus Wednesdays', text: 'No meetings, only deep work.' },
      { title: 'Quarterly meet-ups', text: 'We meet in person to plan, eat and laugh.' },
    ],
    toolsTitle: 'Tools we use',
    tools: ['Figma', 'Notion', 'Linear', 'Slack', 'GitHub', 'Vercel', 'Loom', 'Miro'],
  },
  gallery: {
    label: 'Inside',
    title: 'Inside the studio',
    prev: 'Previous photo',
    next: 'Next photo',
    items: [
      { src: '/images/studio-shelves.webp', alt: 'Warm studio shelves with design objects' },
      { src: '/images/studio-collab.webp', alt: 'Team members collaborating at a table' },
      { src: '/images/studio-shoot.webp', alt: 'Two colleagues reviewing photos in a bright room' },
      { src: '/images/studio-monitors.webp', alt: 'Designer at two monitors in black and white' },
      { src: '/images/studio-review.webp', alt: 'Colleagues checking a camera display' },
    ],
  },
  cta: {
    label: 'Say hello',
    title: 'Join the conversation',
    text: 'Start a project with us, or come and work with us. Either way, we would love to hear from you.',
    primary: startProject,
    secondary: { label: 'Join the team', href: '/team#open-roles' } satisfies Cta,
  },
} as const;

export const teamPage = {
  hero: {
    label: 'The minds',
    title: 'Team',
    intro: 'Designers, developers and strategists who care about the details, and about each other.',
    image: '/images/studio-meeting.webp',
    imageAlt: 'The Vundabarweb team gathered around a long table with laptops',
  },
  grid: { label: 'Meet us', title: 'The people', socials: 'Say hello to' },
  founder: {
    label: 'Note',
    title: 'From our creative director',
    name: 'Lina Marquez',
    role: 'Creative Director',
    image: '/images/team-lina-marquez.webp',
    imageAlt: 'Portrait of Lina Marquez holding a sticker-covered laptop',
    quote: 'Good work comes from small teams that trust each other and listen first.',
    bio: 'I started Vundabarweb to build the studio I wanted to hire: honest, curious and obsessed with detail. Everything we make starts by understanding the person who will use it.',
    caresTitle: 'Things I care about',
    cares: ['Typography', 'Plain language', 'Slow mornings', 'Accessible design'],
    signature: 'Lina Marquez',
  },
  culture: { label: 'Culture', title: 'How we work together' },
  roles: {
    id: 'open-roles',
    label: 'Join us',
    title: 'Open roles',
    apply: 'Apply',
    open: { title: 'Open application', summary: 'Do not see a fit? Tell us how you would like to help.' },
    empty: 'There are no open roles right now, but we always like to hear from talented people.',
    email: 'hello@vundabarweb.com',
  },
  cta: {
    label: 'Your portfolio',
    title: 'Don’t see your role?',
    text: 'Send us your portfolio and a few lines about what you would like to build. We read everything.',
    primary: { label: 'Send your portfolio', href: 'mailto:hello@vundabarweb.com?subject=Portfolio' } satisfies Cta,
    secondary: { label: 'Learn about us', href: '/about' } satisfies Cta,
  },
} as const;

export const contactPage = {
  hero: {
    label: 'Say hello',
    title: 'Let’s talk',
    intro: 'Tell us about your project. A few lines are enough, and we will reply within one business day.',
    promise: 'We reply within 1 business day',
  },
  form: {
    label: 'Your project',
    title: 'Project brief',
    fields: {
      name: 'Your name',
      email: 'Email address',
      company: 'Company or project',
      services: 'What do you need?',
      budget: 'Budget range',
      timeline: 'Ideal timeline',
      message: 'Tell us about your project',
      reference: 'A link we should see (optional)',
      consent: 'I agree to the privacy policy and to being contacted about my project.',
    },
    placeholders: { message: 'Goals, audience, what is not working today...', reference: 'https://' },
    budgets: ['Under $5K', '$5K to $10K', '$10K to $25K', '$25K+', 'Not sure yet'],
    timelines: ['As soon as possible', 'Within 1 to 2 months', 'Within 3 to 6 months', 'Just exploring'],
    timelinePlaceholder: 'Choose a timeline',
    submit: 'Send brief',
    sending: 'Sending...',
    errors: {
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      services: 'Choose at least one service.',
      consent: 'Please accept to continue.',
    },
    success: { title: 'Thank you!', text: 'We have your brief and will reply within one business day.', again: 'Send another brief' },
    privacyLink: { label: 'Privacy policy', href: '/privacy-policy' } satisfies Cta,
  },
  details: {
    title: 'Studio details',
    items: [
      { label: 'Email', value: 'hello@vundabarweb.com', href: 'mailto:hello@vundabarweb.com' },
      { label: 'Phone', value: '+351 21 346 0182', href: 'tel:+351213460182' },
      { label: 'Studio', value: 'Rua das Flores 12, 1200-195 Lisbon, Portugal', href: '#studio-location' },
      { label: 'Hours', value: 'Mon to Thu 9:00 to 17:00, Fri 9:00 to 14:00 (Lisbon time)' },
    ],
  },
  next: {
    label: 'What next',
    title: 'What happens next',
    steps: [
      { title: 'We read your brief', text: 'Someone senior reads every message and replies personally.', image: '/images/journal-notebook.webp', imageAlt: 'A notebook and pen beside a laptop, ready to take notes' },
      { title: 'A 30-minute call', text: 'We talk through goals, budget and timing, with no obligation.', image: '/images/studio-meeting.webp', imageAlt: 'The studio team talking around a table' },
      { title: 'Proposal in 5 days', text: 'A clear scope, timeline and fixed price you can share.', image: '/images/journal-planning.webp', imageAlt: 'A planner and sticky notes next to a laptop' },
    ],
  },
  call: {
    title: 'Prefer to talk?',
    text: 'Book a free 30-minute call and tell us about your project in your own words. Email us a couple of times that suit you, or ring the studio during opening hours.',
    cta: { label: 'Book a free call', href: 'mailto:hello@vundabarweb.com?subject=Free%2030-minute%20call&body=Hi%20Vundabarweb%2C%0A%0AI%27d%20like%20to%20book%20a%20call.%20These%20times%20suit%20me%3A%0A' } satisfies Cta,
    image: '/images/studio-review.webp',
    imageAlt: 'Two colleagues looking at a camera screen together',
  },
  faq: {
    label: 'Questions',
    title: 'Before you write',
    image: '/images/studio-shelves.webp',
    imageAlt: 'The studio with warm shelves and the team at work',
    items: [
      { question: 'What budget do I need?', answer: 'Most projects start around $4,000. If you are unsure, tell us what you have in mind and we will suggest a scope that fits.' },
      { question: 'How soon can you start?', answer: 'We usually start within three to four weeks of an agreed proposal, since we take on few projects at a time.' },
      { question: 'Do you work on small projects?', answer: 'Yes. A focused landing page is a great way to start, and many clients grow from there.' },
      { question: 'Can you work with our other agencies?', answer: 'Absolutely. We are used to collaborating with copywriters, photographers and other studios.' },
      { question: 'What if I only have an idea?', answer: 'That is fine. Our strategy service exists for exactly that: turning an idea into a plan.' },
    ] satisfies Faq[],
  },
  location: {
    label: 'Find us',
    title: 'Studio and location',
    address: ['Rua das Flores 12', '1200-195 Lisbon, Portugal'],
    addressTitle: 'Visit us (by appointment)',
    hoursTitle: 'Studio hours',
    hours: [
      ['Monday to Thursday', '9:00 to 17:00'],
      ['Friday', '9:00 to 14:00'],
      ['Weekend', 'Closed'],
    ],
    pin: 'Rua das Flores 12, Lisbon',
    mapEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=-9.1465%2C38.7083%2C-9.1385%2C38.7117&layer=mapnik&marker=38.7100%2C-9.1425',
    mapLink: { label: 'Get directions', href: 'https://www.google.com/maps/search/?api=1&query=Rua+das+Flores+12+1200-195+Lisboa+Portugal' } satisfies Cta,
    gallery: [
      { src: '/images/studio-monitors.webp', alt: 'A designer at two monitors in the studio' },
      { src: '/images/studio-shoot.webp', alt: 'Colleagues reviewing photographs in a bright room' },
      { src: '/images/studio-collab.webp', alt: 'Team members working together at a table' },
    ],
  },
} as const;

export const journalPage = {
  hero: { label: 'Notes', title: 'Journal', intro: 'Ideas and lessons on design, development and strategy from the studio.', statLabels: { articles: 'articles', topics: 'topics', read: 'min avg read' } },
  featured: { cta: 'Read article' },
  filter: { all: 'All', ariaLabel: 'Filter articles by category', searchLabel: 'Search articles', searchPlaceholder: 'Search by title or topic', empty: 'No articles match your search.', clear: 'Clear filters', resultsLabel: 'articles', resultSingular: 'article' },
  latest: { label: 'Latest', title: 'Latest articles', loadMore: 'Load more articles' },
  topics: { label: 'Explore', title: 'Topics', mostRead: 'Most read' },
  newsletter: {
    label: 'Stay in the loop',
    title: 'One useful email a month',
    text: 'Design, development and strategy notes from the studio. No spam, unsubscribe any time.',
    emailLabel: 'Email address',
    placeholder: 'you@example.com',
    submit: 'Subscribe',
    sending: 'Subscribing...',
    success: 'You are in! Check your inbox for a welcome note.',
    error: 'Enter a valid email address.',
  },
} as const;

export const articlePage = {
  back: 'All articles',
  toc: 'On this page',
  share: { title: 'Share', copy: 'Copy link', copied: 'Link copied', linkedin: 'LinkedIn', x: 'X' },
  author: { title: 'Written by', cta: 'Meet the team' },
  related: { label: 'More', title: 'Keep reading' },
  cta: {
    label: 'Need help',
    title: 'Need help with this? We build it.',
    text: 'Our studio turns ideas like this into real, working projects.',
    primary: { label: 'Explore the service', href: '/services' } satisfies Cta,
    secondary: { label: 'Contact us', href: '/contact' } satisfies Cta,
  },
} as const;

export const notFoundPage = {
  hero: {
    label: 'Oops',
    title: 'This page took a wrong turn',
    intro: 'The page you are looking for may have moved or never existed. Here is how to get back on track.',
    primary: { label: 'Back to home', href: '/' } satisfies Cta,
    secondary: { label: 'Contact us', href: '/contact' } satisfies Cta,
  },
  links: {
    label: 'Try',
    title: 'Helpful links',
    items: [
      { title: 'Services', text: 'What we do and how.', href: '/services' },
      { title: 'Portfolio', text: 'Projects we are proud of.', href: '/portfolio' },
      { title: 'About', text: 'The studio and its story.', href: '/about' },
      { title: 'Team', text: 'The people behind it.', href: '/team' },
      { title: 'Journal', text: 'Notes and ideas.', href: '/journal' },
    ],
  },
  featured: { label: 'Maybe', title: 'Maybe you were looking for this' },
  search: { title: 'Looking for something specific?', placeholder: 'Search the journal', submit: 'Search', report: { label: 'Report a broken link', href: 'mailto:hello@vundabarweb.com?subject=Broken%20link' } satisfies Cta },
} as const;

export const common = {
  breadcrumb: 'Breadcrumb',
  backTop: 'Back to top',
  newTab: '(opens in a new tab)',
} as const;

export const serviceDetailPage = {
  breadcrumbRoot: 'Services',
  related: 'See related work',
  cta: 'Start a project',
  deliverables: { label: 'Included', title: "What's included" },
  approach: { label: 'Method', title: 'Our approach' },
  tools: { label: 'Toolbox', title: 'Tools and technologies', text: 'We choose tools that you can keep using after we are gone, and avoid anything that locks you in.' },
  related_projects: { label: 'Proof', title: 'Related projects' },
  faq: { label: 'Questions', title: 'Good to know' },
  next: 'Next service',
  backdrop: 'Impact',
  impact: { label: 'Results', title: 'The impact' },
  closing: { label: 'Next step', title: 'Let’s make it real', text: 'Tell us what you are planning and we will suggest how this service can help.' },
  seeWork: 'See our work',
} as const;

export const caseStudyPage = {
  back: 'All projects',
  breadcrumbRoot: 'Portfolio',
  facts: { client: 'Client', year: 'Year', services: 'Services', timeline: 'Timeline' },
  brief: { label: 'Why', title: 'The brief', challenge: 'The challenge' },
  solution: { label: 'How', title: 'Our solution' },
  gallery: { label: 'Look', title: 'Gallery', open: 'Open image', close: 'Close gallery', prev: 'Previous image', next: 'Next image', counter: (c: number, t: number) => `Image ${c} of ${t}` },
  results: { label: 'Impact', title: 'Results' },
  testimonial: { label: 'Kind words' },
  next: 'Next project',
  closing: { label: 'Your turn', title: 'Want results like these?', text: 'Tell us about your project and we will suggest where to start.' },
  start: 'Start a project',
  allProjects: 'All projects',
} as const;

export const legalPage = { glance: 'At a glance', updated: 'Last updated', details: 'Full details' } as const;
