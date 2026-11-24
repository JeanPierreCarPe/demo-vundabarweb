import type { ReactNode } from 'react';

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex h-[30px] cursor-default items-center justify-center whitespace-nowrap rounded-full border-[3px] border-snow/90 px-[30px] font-display text-sm font-semibold tracking-[0.7px] text-snow/90 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-110">
      <span className="text-trim">{children}</span>
    </li>
  );
}
