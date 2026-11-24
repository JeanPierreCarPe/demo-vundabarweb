import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { DecorLayer, Glow, OutlineShape } from './Decor';
import SectionLabel from './SectionLabel';

type HeroSize = 'xl' | 'lg' | 'md';

/** Title size per variant, plus where the script label sits over the first line of the title. */
const SIZES: Record<HeroSize, { title: string; top: number; left: number; scale: number; perChar: number }> = {
  xl: { title: 'text-5xl sm:text-6xl md:text-7xl lg:text-[96px] lg:leading-[88px]', top: -122, left: -50, scale: 1.7, perChar: 36 },
  lg: { title: 'text-4xl sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[68px]', top: -112, left: -50, scale: 1.5, perChar: 31 },
  md: { title: 'text-3xl sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[54px]', top: -108, left: -84, scale: 1.35, perChar: 27 },
};

interface PageHeroProps {
  label: string;
  title: string;
  intro?: string;
  size?: HeroSize;
  /** Buttons / links under the intro. */
  actions?: ReactNode;
  /** Content on the right on desktop (photo, stats, facts). */
  aside?: ReactNode;
  /** Small content above the title, e.g. a breadcrumb. */
  top?: ReactNode;
  /** Tilt of the script label in degrees (default -15). */
  labelRotate?: number;
  /** Background outline shape on desktop. */
  shape?: 'square' | 'triangle';
  /** Extra decorations rendered inside the hero's DecorLayer (must use z-index -10). */
  decor?: ReactNode;
  /** Less vertical space, used by legal pages. */
  compact?: boolean;
  className?: string;
}

/**
 * Hero of every inner page: giant uppercase title with the orange script label laid over it,
 * soft purple glows and an outline shape behind (z-index -10, so they never cover content).
 */
export default function PageHero({
  label,
  title,
  intro,
  size = 'xl',
  actions,
  aside,
  top,
  shape = 'square',
  labelRotate,
  compact,
  decor,
  className,
}: PageHeroProps) {
  const s = SIZES[size];
  // Long labels are made smaller (and a bit higher) so they only graze the title.
  const long = label.length > 9;
  const labelScale = long ? s.scale * Math.max(0.8, 9.5 / label.length) : s.scale;
  const vars = {
    '--label-w': `${Math.round(label.length * s.perChar * (labelScale / s.scale) + 40)}px`,
    '--label-top': `${s.top - (long ? 8 : 0)}px`,
    '--label-left': `${s.left}px`,
  } as CSSProperties;

  return (
    <section className="relative">
      <DecorLayer>
        <Glow className="-left-[300px] -top-[300px]" />
        <Glow className="-right-[250px] top-[120px]" />
        {shape === 'square' ? (
          <OutlineShape shape="square" rotate={-35} squareSize={420} className="right-[-120px] top-[40px] size-[620px]" />
        ) : (
          <OutlineShape shape="triangle" rotate={-20} className="right-[-80px] top-[60px] h-[520px] w-[560px]" />
        )}
        {decor}
      </DecorLayer>

      <div
        className={cn(
          'relative mx-auto flex max-w-page flex-col gap-10 px-5 pb-14 pt-36 md:px-10 md:pb-20 md:pt-44 lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:px-20',
          compact ? 'lg:pb-[70px] lg:pt-[185px]' : 'lg:pb-[110px] lg:pt-[215px]',
          className,
        )}
      >
        <div className="flex flex-col gap-8 lg:max-w-[720px]">
          {top && <div className="mb-10 lg:mb-24">{top}</div>}
          <div className="relative pt-8 lg:pt-0">
            <h1 className={cn('font-display font-bold uppercase leading-[1.02] text-snow/90 text-shadow-title', s.title)}>{title}</h1>
            <SectionLabel
              scale={labelScale}
              rotate={labelRotate ?? (long ? -9 : -11)}
              style={vars}
              className="-translate-y-3 lg:translate-y-0 lg:left-[var(--label-left)] lg:top-[var(--label-top)] lg:h-[130px] lg:w-[var(--label-w)]"
            >
              {label}
            </SectionLabel>
          </div>
          {intro && (
            <p className="max-w-[560px] font-display text-lg font-medium text-snow/90 text-shadow-blurb md:text-xl lg:text-2xl">{intro}</p>
          )}
          {actions && <div className="flex flex-wrap items-center gap-x-8 gap-y-5">{actions}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
