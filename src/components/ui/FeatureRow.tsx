import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import ZoomImage from './ZoomImage';
import Badge from './Badge';
import Button from './Button';

interface FeatureRowProps {
  image: string;
  imageAlt: string;
  title: string;
  body: string;
  tags?: readonly string[];
  cta?: { label: string; href: string };
  /** Image on the right (and text right-aligned) on desktop. */
  reversed?: boolean;
  /** Eyebrow shown above the title, e.g. "01". */
  eyebrow?: ReactNode;
  className?: string;
}

/** Image + text row used by the homepage "Our Work", the About principles and the case study solution. */
export default function FeatureRow({ image, imageAlt, title, body, tags, cta, reversed, eyebrow, className }: FeatureRowProps) {
  return (
    <article
      className={cn(
        'group/card flex flex-col gap-6 lg:h-[500px] lg:items-end lg:gap-8',
        reversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
        className,
      )}
    >
      <ZoomImage
        src={image}
        alt={imageAlt}
        width={733}
        height={500}
        className="aspect-[733/500] h-auto w-full lg:h-[500px] lg:w-[733px] lg:shrink-0"
      />
      <div className={cn('flex flex-col items-start justify-center gap-[30px] lg:h-full lg:flex-1', reversed && 'lg:items-end lg:text-right')}>
        {eyebrow && <span className="font-display text-xl font-semibold text-accent">{eyebrow}</span>}
        <h3 className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 transition-colors duration-300 group-hover/card:text-accent md:text-4xl lg:text-heading">
          {title}
        </h3>
        {tags && tags.length > 0 && (
          <ul className={cn('flex flex-wrap gap-2.5', reversed && 'lg:justify-end')}>
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </ul>
        )}
        <p className="font-display text-lg font-medium text-snow/90 md:text-xl lg:w-[515px] lg:text-2xl">{body}</p>
        {cta && <Button href={cta.href}>{cta.label}</Button>}
      </div>
    </article>
  );
}
