import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Faq } from '@/types';
import { cn } from '@/utils/cn';

/** FAQ accordion: one answer open at a time, smooth height animation, buttons with aria-expanded. */
export default function Accordion({ items, className }: { items: readonly Faq[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className={cn('flex flex-col', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <li key={item.question} className="border-b-2 border-snow/20 first:border-t-2">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    'font-display text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-accent lg:text-2xl',
                    isOpen ? 'text-accent' : 'text-snow/90',
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative size-9 shrink-0 rounded-full border-[3px] transition-all duration-300 group-hover:border-accent group-hover:bg-accent/15',
                    isOpen ? 'rotate-45 border-accent' : 'border-snow',
                  )}
                >
                  <span className="absolute left-1/2 top-1/2 h-[3px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded bg-snow" />
                  <span className="absolute left-1/2 top-1/2 h-3.5 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded bg-snow" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[720px] pb-7 font-display text-lg font-medium text-snow/80 lg:text-xl">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
