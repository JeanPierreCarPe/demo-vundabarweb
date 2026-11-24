import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionLabelProps {
  children: ReactNode;
  /** Positioning classes. At `lg` the Figma box (left/top/width/height) is passed here. */
  className?: string;
  /** Rotation in degrees (the design uses -15, and +15 on "About"). */
  rotate?: number;
  /**
   * Size multiplier applied at `lg` on top of the design's 64px. The stand-in font is narrower than
   * "Story Of Love", so each label is scaled to fill the same Figma box and land in the same place over its title.
   * Use 1 once the real font is installed.
   */
  scale?: number;
  /** Inline style for the positioned wrapper, e.g. CSS variables consumed by `className`. */
  style?: CSSProperties;
}

/**
 * The orange handwritten accent word that sits over a heading.
 * Decorative: the heading it decorates carries the meaning, so it is hidden from assistive tech.
 * It is positioned after the heading in the DOM, so it paints over the title text.
 */
export default function SectionLabel({ children, className, rotate = -15, scale = 1, style }: SectionLabelProps) {
  const textStyle = { transform: `rotate(${rotate}deg)`, '--label-scale': scale } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn('pointer-events-none absolute left-0 top-[var(--label-top-base,-2.5rem)] flex items-center justify-center md:top-[var(--label-top-md,-3rem)]', className)}
    >
      <span
        style={textStyle}
        className="relative top-[0.15em] block flex-none whitespace-nowrap font-script text-[36px] font-normal normal-case leading-normal tracking-normal text-accent blur-[0.6px] [text-shadow:none] md:text-[44px] lg:text-[length:calc(64px*var(--label-scale))]"
      >
        {children}
      </span>
    </span>
  );
}
