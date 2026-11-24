import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import AppLink from './AppLink';

export interface CoverStackItem {
  href: string;
  /** Accessible name of the link (the cover itself is decorative). */
  label: string;
  image: string;
  /** Position, width, tilt and stacking of this card inside the stack. */
  className: string;
  /** Seconds of delay for the floating loop, so the cards do not move in sync. */
  delay: number;
}

interface CoverStackProps {
  items: readonly CoverStackItem[];
  chips: readonly { value: string | number; label: string }[];
}

/** Standard card positions: a back-left, a back-right and a larger front card. */
export const COVER_STACK_LAYOUT = [
  { className: 'left-0 top-[16%] w-[54%] -rotate-[9deg] z-[1]', delay: 0 },
  { className: 'right-0 top-0 w-[54%] rotate-[7deg] z-[2]', delay: 1.2 },
  { className: 'left-[19%] top-[38%] w-[62%] -rotate-[3deg] z-[3]', delay: 2.4 },
] as const;

/**
 * Hero visual for index pages: a fanned stack of linked covers with outlined number cards floating over it.
 * The tilt sits on a wrapper and the floating motion on the inner element, so the two transforms don't overwrite each other.
 */
export default function CoverStack({ items, chips }: CoverStackProps) {
  return (
    <div className="relative h-[330px] w-full max-w-[560px] sm:h-[400px] lg:h-[470px] lg:w-[560px] lg:shrink-0">
      {items.map(({ href, label, image, className, delay }) => (
        <div key={href} className={cn('absolute', className)}>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity, delay }}>
            <AppLink
              href={href}
              aria-label={label}
              className="group/card block aspect-[4/3] overflow-hidden shadow-image transition-all duration-500 hover:z-10 hover:shadow-image-hover motion-safe:hover:-translate-y-2 motion-safe:hover:scale-105"
            >
              <img
                src={image}
                alt=""
                width={400}
                height={300}
                loading="eager"
                className="size-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
            </AppLink>
          </motion.div>
        </div>
      ))}

      <ul className="absolute -bottom-3 left-0 right-0 z-[4] flex justify-center gap-3 sm:gap-4">
        {chips.map((chip, index) => (
          <motion.li
            key={chip.label}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: index * 0.8 }}
          >
            <div className="group flex min-w-[96px] flex-col items-center rounded-[10px] border-[3px] border-solid border-accent bg-ink/90 px-4 py-3 text-center backdrop-blur-sm transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.4)] motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 sm:min-w-[120px] sm:px-6">
              <span className="font-display text-4xl font-bold leading-none text-snow/90 transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                {chip.value}
              </span>
              <span className="mt-2 font-display text-xs font-semibold uppercase tracking-[1px] text-snow/80 sm:text-sm">{chip.label}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
