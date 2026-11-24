import type { CaseStudy } from '@/types';
import { cn } from '@/utils/cn';
import AppLink from './AppLink';
import ZoomImage from './ZoomImage';
import Tag from './Tag';

interface ProjectCardProps {
  project: CaseStudy;
  /** 4:5 image instead of 3:2 (used for the staggered portfolio grid). */
  tall?: boolean;
  className?: string;
}

/** Whole card is one link to the case study. A "View case study" pill slides up over the photo on hover / focus. */
export default function ProjectCard({ project, tall, className }: ProjectCardProps) {
  return (
    <AppLink href={`/portfolio/${project.slug}`} className={cn('group/card flex flex-col gap-5', className)}>
      <ZoomImage
        src={project.cover}
        alt={project.coverAlt}
        width={800}
        height={tall ? 1000 : 533}
        className={cn('w-full', tall ? 'aspect-[6/7]' : 'aspect-[3/2]')}
      >
        <span className="absolute bottom-5 left-5 inline-flex h-11 translate-y-4 items-center gap-2 rounded-full bg-accent px-6 font-display text-base font-semibold text-ink opacity-0 shadow-glow-accent transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100">
          <span className="text-trim">View case study</span>
          <span aria-hidden="true">→</span>
        </span>
      </ZoomImage>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-2xl font-bold uppercase leading-8 text-snow/90 transition-colors duration-300 group-hover/card:text-accent lg:text-[32px] lg:leading-9">
          {project.title}
        </h3>
        <p className="font-display text-lg font-medium text-snow/70">
          {project.client} · {project.year}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} className="group-hover/card:border-accent">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </AppLink>
  );
}
