import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { useCyclicSlots } from '@/hooks/useCyclicSlots';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { useSlideTransition } from '@/hooks/useSlideTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import CarouselControls from '@/components/ui/CarouselControls';
import Reveal from '@/components/ui/Reveal';

/** Slide geometry from Figma: each testimonial is 904px wide with a 50px gap. */
const SLIDE_STEP = 954;
/** Slots run from one before the active slide (hidden, off to the left) to the end of the queue. */
const MIN_SLOT = -1;

/** Position and visibility of a slide for a given slot. */
function slideState(slot: number, desktop: boolean) {
  if (!desktop) {
    return { x: `${slot * 108}%`, opacity: slot === 0 ? 1 : 0 };
  }
  // Desktop: the active quote is fully visible and the next one peeks in from the right, dimmed.
  return { x: slot * SLIDE_STEP, opacity: slot === 0 ? 1 : slot === 1 ? 0.4 : 0 };
}

export default function Testimonials() {
  const { label, title, items, controls } = siteContent.testimonials;
  const [active, setActive] = useState(0);
  const count = items.length;
  const go = (step: number) => setActive((i) => (i + step + count) % count);

  const desktop = useIsDesktop();
  const slotOf = useCyclicSlots(active, count, MIN_SLOT);
  const transition = useSlideTransition();

  return (
    <section id="testimonials">
      <Reveal className="mx-auto flex max-w-page flex-col gap-14 px-5 py-20 md:px-10 lg:gap-[75px] lg:px-20 lg:py-[200px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            title={title}
            label={label}
            labelScale={1.34}
            className="lg:w-[437px]"
            labelClassName="lg:left-[-66px] lg:top-[-108.72px] lg:h-[145.103px] lg:w-[287.232px]"
          />
          <CarouselControls
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            prevLabel={controls.prev}
            nextLabel={controls.next}
            className="gap-[30px]"
          />
        </div>

        {/* All testimonials stay mounted in one grid cell and slide between slots, so the carousel loops forever. */}
        <ul className="grid justify-items-start lg:h-[200px]">
          {items.map((item, index) => {
            const { slot, jump } = slotOf(index);
            const isActive = slot === 0;
            return (
              <motion.li
                key={item.name}
                aria-hidden={!isActive}
                initial={false}
                animate={slideState(slot, desktop)}
                transition={transition(jump)}
                className="col-start-1 row-start-1 w-full lg:h-[200px] lg:w-[904px]"
              >
                <figure className="group flex flex-col gap-6 lg:h-full lg:flex-row-reverse lg:items-end lg:gap-8">
                  <blockquote className="font-display text-2xl font-medium text-snow/90 transition-colors duration-300 group-hover:text-snow md:text-3xl lg:w-[624px] lg:text-quote">
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-[3px] w-[50px] shrink-0 bg-snow transition-all duration-300 group-hover:w-[70px] group-hover:bg-accent"
                    />
                    <cite className="flex flex-col gap-2.5 whitespace-nowrap not-italic capitalize leading-10">
                      <span className="font-display text-2xl font-bold text-snow/90 transition-colors duration-300 group-hover:text-accent">
                        {item.name}
                      </span>
                      <span className="font-display text-base font-medium text-snow/70">{item.role}</span>
                    </cite>
                  </figcaption>
                </figure>
              </motion.li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
