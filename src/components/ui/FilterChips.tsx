import { cn } from '@/utils/cn';

interface FilterChipsProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
}

/** Row of toggle chips (single selection). The active chip is filled orange. */
export default function FilterChips({ options, value, onChange, ariaLabel, className }: FilterChipsProps) {
  return (
    <div role="group" aria-label={ariaLabel} className={cn('flex flex-wrap gap-3', className)}>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border-[3px] px-6 font-display text-base font-semibold tracking-[0.7px] transition-all duration-300',
              'motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-95',
              active
                ? 'border-accent bg-accent text-ink shadow-glow-accent'
                : 'border-snow/80 text-snow/90 hover:border-accent hover:bg-accent/15 hover:text-accent',
            )}
          >
            <span className="text-trim">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
