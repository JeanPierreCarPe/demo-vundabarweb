import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import AppLink from './AppLink';

interface ButtonProps {
  href: string;
  children: ReactNode;
  /** `light` = white outline (nav), `accent` = orange outline (section CTAs). */
  variant?: 'light' | 'accent';
  className?: string;
}

/** On hover the outline fills solid, the label flips to dark, the button lifts and glows. */
const variants = {
  light: 'border-snow hover:bg-snow hover:text-ink hover:shadow-glow-snow',
  accent: 'border-accent hover:bg-accent hover:text-ink hover:shadow-glow-accent',
};

export default function Button({ href, children, variant = 'accent', className }: ButtonProps) {
  return (
    <AppLink
      href={href}
      className={cn(
        'inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border-[3px] px-[50px] font-display text-xl font-semibold tracking-[1px] text-snow transition-all duration-300 ease-out',
        'motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 motion-safe:active:translate-y-0 motion-safe:active:scale-95',
        variants[variant],
        className,
      )}
    >
      <span className="text-trim">{children}</span>
    </AppLink>
  );
}
