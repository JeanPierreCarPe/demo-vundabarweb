import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

/** Inline pill (a <span>, unlike the list-item Badge). Same outline as the homepage tags. */
export default function Tag({ children, className, active }: { children: ReactNode; className?: string; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-[30px] items-center justify-center whitespace-nowrap rounded-full border-[3px] px-[22px] font-display text-sm font-semibold tracking-[0.7px] transition-all duration-300',
        active ? 'border-accent bg-accent text-ink' : 'border-snow/90 text-snow/90',
        className,
      )}
    >
      <span className="text-trim">{children}</span>
    </span>
  );
}
