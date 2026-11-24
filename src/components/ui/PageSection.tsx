import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { DecorLayer } from './Decor';
import Reveal from './Reveal';

interface PageSectionProps {
  id?: string;
  /** Decorations (glows, outline shapes). Rendered in a DecorLayer next to the content, never inside Reveal. */
  decor?: ReactNode;
  /** Classes for the inner content wrapper (gap, extra padding). */
  className?: string;
  /** Accessible name when the section has no visible heading id. */
  ariaLabel?: string;
  children: ReactNode;
}

/**
 * Standard section frame, same rhythm as the homepage: 1440px frame, 80px side padding on desktop,
 * fade-in on scroll. No overflow clipping, so decorations bleed into neighbouring sections.
 */
export default function PageSection({ id, decor, className, ariaLabel, children }: PageSectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className="relative">
      {decor && <DecorLayer>{decor}</DecorLayer>}
      <Reveal
        className={cn(
          'relative mx-auto flex max-w-page flex-col gap-12 px-5 py-16 md:px-10 md:py-20 lg:gap-[60px] lg:px-20 lg:py-[100px]',
          className,
        )}
      >
        {children}
      </Reveal>
    </section>
  );
}
