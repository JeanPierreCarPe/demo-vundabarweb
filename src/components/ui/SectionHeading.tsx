import { cn } from '@/utils/cn';
import type { CSSProperties } from 'react';
import SectionLabel from './SectionLabel';

interface SectionHeadingProps {
  title: string;
  label: string;
  /** Classes for the wrapper (width, alignment of the block). */
  className?: string;
  /** Classes for the h2 (text alignment, width overrides). */
  titleClassName?: string;
  /**
   * Position of the script label relative to the heading block (desktop). The homepage passes the exact Figma box;
   * other pages leave it out and get a box sized from the label's length, hanging 60px to the left of the title.
   */
  labelClassName?: string;
  labelRotate?: number;
  labelScale?: number;
  /** Heading element: pages use `h1` through PageHero, sections use `h2`. */
  as?: 'h1' | 'h2';
  /** Center the label over a centered title. */
  center?: boolean;
}

export default function SectionHeading({
  title,
  label,
  className,
  titleClassName,
  labelClassName,
  labelRotate,
  labelScale,
  as: Tag = 'h2',
  center = false,
}: SectionHeadingProps) {
  const auto = labelClassName === undefined;
  // Long labels are scaled down so they stay short and collide with the title only a little.
  const scale = labelScale ?? (label.length > 9 ? Math.max(1, (1.4 * 9.5) / label.length) : 1.4);
  const width = Math.max(160, Math.round(label.length * 28 * (scale / 1.4) + 30));
  const autoClass = center
    ? 'lg:left-[-80px] lg:top-[-108px] lg:h-[125px] lg:w-[var(--label-w)]'
    : 'lg:left-[-60px] lg:top-[-108px] lg:h-[125px] lg:w-[var(--label-w)]';

  return (
    <div className={cn('relative flex flex-col gap-5', center && 'items-center', className)}>
      <Tag
        className={cn(
          'font-display text-3xl font-bold uppercase leading-9 text-snow/90 md:text-4xl md:leading-9 lg:text-heading',
          center && 'text-center',
          titleClassName,
        )}
      >
        {title}
      </Tag>
      <SectionLabel
        rotate={labelRotate ?? (auto && label.length > 9 ? -9 : undefined)}
        scale={scale}
        style={
          auto
            ? ({ '--label-w': `${width}px`, '--label-top-base': '-3.25rem', '--label-top-md': '-3.75rem' } as CSSProperties)
            : undefined
        }
        className={auto ? autoClass : labelClassName}
      >
        {label}
      </SectionLabel>
    </div>
  );
}
