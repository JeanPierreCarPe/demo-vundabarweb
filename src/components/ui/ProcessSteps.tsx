import { cn } from '@/utils/cn';

interface Step {
  title: string;
  text: string;
  meta?: string;
}

/**
 * Numbered timeline. Desktop: horizontal, steps joined by a line with round markers (same language as the hero dots).
 * Mobile: vertical. Pass the grid columns for desktop through `className`, e.g. `lg:grid-cols-5`.
 */
export default function ProcessSteps({ steps, className }: { steps: readonly Step[]; className?: string }) {
  return (
    <ol className={cn('grid gap-10 lg:gap-8', className)}>
      {steps.map((step, index) => (
        <li key={step.title} className="group relative flex gap-5 pb-2 lg:flex-col lg:gap-6">
          {/* Marker + connector */}
          <div className="relative flex flex-col items-center lg:flex-row lg:items-center">
            <span className="relative z-[1] flex size-[30px] shrink-0 items-center justify-center rounded-full border-2 border-solid border-snow bg-ink transition-all duration-300 group-hover:border-accent group-hover:shadow-glow-accent motion-safe:group-hover:scale-125">
              <span className="block size-[15px] rounded-full bg-snow transition-colors duration-300 group-hover:bg-accent" />
            </span>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[14px] top-[30px] h-[calc(100%+28px)] w-[3px] bg-snow/60 lg:left-[30px] lg:top-[13.5px] lg:h-[3px] lg:w-[calc(100%+32px)]"
              />
            )}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-display text-xl font-semibold text-accent">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-2xl font-bold uppercase leading-7 text-snow/90 transition-colors duration-300 group-hover:text-accent">
              {step.title}
            </h3>
            <p className="font-display text-lg font-medium text-snow/80">{step.text}</p>
            {step.meta && <span className="font-display text-base font-semibold text-snow/60">{step.meta}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}
