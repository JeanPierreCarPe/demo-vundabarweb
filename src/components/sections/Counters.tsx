import { siteContent } from '@/data/siteContent';
import { DecorLayer } from '@/components/ui/Decor';
import Reveal from '@/components/ui/Reveal';

interface CountersProps {
  /** Big translucent word behind the cards. */
  backdrop?: string;
  items?: readonly { value: string; label: string }[];
}

export default function Counters({ backdrop = siteContent.stats.backdrop, items = siteContent.stats.items }: CountersProps) {

  return (
    <section id="stats" className="relative">
      <DecorLayer>
        <span className="absolute -z-10 hidden select-none whitespace-nowrap bg-gradient-to-br from-purple-700 to-purple-500 bg-clip-text font-display text-giant font-bold uppercase text-transparent opacity-30 blur-[1.5px] lg:left-1/2 lg:top-[calc(50%+6px)] lg:block lg:-translate-x-1/2 lg:-translate-y-1/2">
          {backdrop}
        </span>
      </DecorLayer>

      <Reveal className="relative mx-auto max-w-page px-5 py-20 md:px-10 lg:px-20 lg:py-[200px]">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((stat) => (
            <li
              key={stat.label}
              className="group flex h-[150px] cursor-default flex-col items-center justify-center gap-[15px] rounded-[10px] border-[5px] border-solid border-accent px-6 py-5 text-center transition-all duration-300 ease-out hover:bg-accent/15 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] motion-safe:hover:-translate-y-2 motion-safe:hover:scale-105 lg:px-[50px]"
            >
              <strong className="font-display text-4xl font-bold uppercase leading-10 text-snow/90 transition-colors duration-300 group-hover:text-accent lg:text-heading">
                {stat.value}
              </strong>
              <span className="text-trim font-display text-lg font-semibold text-snow lg:text-xl">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
