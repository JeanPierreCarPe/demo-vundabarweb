import type { Cta } from '@/types';
import { cn } from '@/utils/cn';
import Button from './Button';
import SectionHeading from './SectionHeading';
import PageSection from './PageSection';
import { Glow } from './Decor';

interface CtaPanelProps {
  label: string;
  title: string;
  text: string;
  primary: Cta;
  secondary?: Cta;
  className?: string;
}

/** Closing call-to-action block: orange outlined panel on a purple glow, same outline language as the stat cards. */
export default function CtaPanel({ label, title, text, primary, secondary, className }: CtaPanelProps) {
  return (
    <PageSection
      ariaLabel={title}
      decor={<Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
      className="py-10 md:py-14 lg:py-[80px]"
    >
      <div
        className={cn(
          'flex flex-col gap-10 rounded-[10px] border-[5px] border-solid border-accent bg-ink/60 px-6 pb-12 pt-20 backdrop-blur-sm md:px-12 md:pt-24 lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:px-[70px] lg:pb-[70px] lg:pt-[110px]',
          className,
        )}
      >
        <SectionHeading title={title} label={label} className="lg:max-w-[560px]" titleClassName="lg:leading-[48px]" />
        <div className="flex flex-col gap-8 lg:max-w-[460px]">
          <p className="font-display text-lg font-medium text-snow/90 md:text-xl lg:text-2xl">{text}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="light">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
