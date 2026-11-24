import type { OpenRole } from '@/types';

export interface TeamProfile {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: string;
  funFact: string;
}

/** Six team members. The first four also appear on the homepage. */
export const teamProfiles: TeamProfile[] = [
  {
    name: 'Lina Marquez',
    role: 'Creative Director',
    image: '/images/team-lina-marquez.webp',
    imageAlt: 'Portrait of Lina Marquez holding a sticker-covered laptop',
    bio: 'Leads creative direction and brand work. Believes every project deserves one unexpected idea.',
    funFact: 'Has a sticker for every conference she has ever attended.',
  },
  {
    name: 'Elliot Tanaka',
    role: 'Lead Developer',
    image: '/images/team-elliot-tanaka.webp',
    imageAlt: 'Portrait of Elliot Tanaka working at a laptop with headphones',
    bio: 'Builds fast, accessible products and mentors the team on clean code and performance.',
    funFact: 'Writes his best code with the same ambient playlist on loop.',
  },
  {
    name: 'Rosa Kim',
    role: 'Product Designer',
    image: '/images/team-rosa-kim.webp',
    imageAlt: 'Portrait of Rosa Kim sketching in a notebook beside a laptop',
    bio: 'Turns messy ideas into clear flows and interfaces. Starts every project with paper.',
    funFact: 'Keeps a notebook of interfaces she loves, 14 volumes and counting.',
  },
  {
    name: 'Noah Castell',
    role: 'Strategy & Growth Lead',
    image: '/images/team-noah-castell.webp',
    imageAlt: 'Portrait of Noah Castell seated at a desk',
    bio: 'Helps clients decide what to build and how to grow it, from first workshop to measurement.',
    funFact: 'Has run a marathon in four different countries.',
  },
  {
    name: 'Maya Okafor',
    role: 'Frontend Developer',
    image: '/images/team-maya-okafor.webp',
    imageAlt: 'Portrait of Maya Okafor smiling',
    bio: 'Brings designs to life with careful motion, accessible components and a love of detail.',
    funFact: 'Can name any font from across the room.',
  },
  {
    name: 'Daniel Reyes',
    role: 'Brand & Motion Designer',
    image: '/images/team-daniel-reyes.webp',
    imageAlt: 'Portrait of Daniel Reyes',
    bio: 'Designs identities and animations that feel alive, with a soft spot for typography.',
    funFact: 'Hand-letters the studio birthday cards.',
  },
];

export const culture = [
  { title: 'Remote-first', text: 'Work from wherever you do your best thinking, and meet in person every quarter.' },
  { title: 'Focus Wednesdays', text: 'No meetings on Wednesdays, so the day stays protected for deep work.' },
  { title: 'Learning budget', text: 'Every person gets a yearly budget for courses, books and conferences.' },
  { title: 'Real ownership', text: 'Small team, big responsibility. You will shape projects, not just execute tasks.' },
] as const;

export const openRoles: OpenRole[] = [
  { title: 'Senior Frontend Developer', type: 'Full-time', location: 'Remote (Europe / Americas)', summary: 'Build polished React interfaces with motion and strong accessibility.' },
  { title: 'Product Designer', type: 'Full-time', location: 'Remote', summary: 'Own design from discovery to launch for small brands and founders.' },
  { title: 'Content Strategist', type: 'Part-time', location: 'Remote', summary: 'Shape messaging, copy and content plans across client projects.' },
];
