import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { cn } from '@/utils/cn';
import { useCyclicSlots } from '@/hooks/useCyclicSlots';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { useSlideTransition } from '@/hooks/useSlideTransition';
import { DecorLayer, Glow, OutlineShape } from '@/components/ui/Decor';
import SectionHeading from '@/components/ui/SectionHeading';
import CarouselControls from '@/components/ui/CarouselControls';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

/** Track geometry from the "Services Slides" component in Figma (px, desktop). */
const FEATURED = { width: 700, height: 470 };
const SMALL = 296;
const GAP = 109;
const NEIGHBOUR_X = FEATURED.width / 2 + GAP + SMALL / 2; // 607
const FAR_X = NEIGHBOUR_X + SMALL + GAP; // 1012
/** Slots run from two before the active card to two after it. */
const MIN_SLOT = -2;

/** Where a card sits, and how it looks, for a given slot. Card centre = track centre + x. */
function cardState(slot: number, desktop: boolean) {
  const featured = slot === 0;
  if (!desktop) {
    // Mobile / tablet: one card at a time, the others wait off to the side.
    return { x: `${slot * 105}%`, y: 0, width: '100%', height: '100%', opacity: featured ? 1 : 0, filter: 'blur(0px)' };
  }
  const width = featured ? FEATURED.width : SMALL;
  const height = featured ? FEATURED.height : SMALL;
  const centre = featured ? 0 : Math.sign(slot) * (Math.abs(slot) === 1 ? NEIGHBOUR_X : FAR_X);
  return {
    x: centre - width / 2,
    y: -height / 2,
    width,
    height,
    opacity: Math.abs(slot) === 2 ? 0 : 1,
    filter: featured ? 'blur(0px)' : 'blur(1.5px)',
  };
}

/** Hover: neighbours sharpen and grow so they clearly read as clickable; the featured card grows a little. */
function hoverState(slot: number, desktop: boolean) {
  if (!desktop || Math.abs(slot) === 2) return undefined;
  return slot === 0
    ? { scale: 1.03, transition: { duration: 0.4 } }
    : { scale: 1.12, filter: 'blur(0px)', transition: { duration: 0.3 } };
}

export default function Services() {
  const { label, title, cta, items, initialIndex, controls } = siteContent.services;
  const [active, setActive] = useState<number>(initialIndex);
  const count = items.length;
  const go = (step: number) => setActive((i) => (i + step + count) % count);
  const current = items[active];

  const desktop = useIsDesktop();
  const slotOf = useCyclicSlots(active, count, MIN_SLOT);
  const transition = useSlideTransition();

  return (
    <section id="services" className="relative">
      <DecorLayer>
        <OutlineShape
          shape="square"
          rotate={-55}
          squareSize={700}
          className="left-[calc(50%+0.45px)] top-[calc(50%+0.05px)] size-[974.91px] -translate-x-1/2 -translate-y-1/2"
        />
        <Glow className="-left-[400px] -top-[400px]" />
        <Glow className="-bottom-[400px] -right-[400px]" />
      </DecorLayer>

      <Reveal className="relative mx-auto flex max-w-page flex-col gap-8 px-5 py-20 md:px-10 lg:block lg:h-[900px] lg:p-0">
        <SectionHeading
          title={title}
          label={label}
          labelScale={1.23}
          className="lg:absolute lg:left-20 lg:top-[calc(50%-284px)] lg:w-[437px] lg:-translate-y-1/2"
          labelClassName="lg:left-[-62px] lg:top-[-91px] lg:h-[122.586px] lg:w-[203.196px]"
        />

        {/* Every card stays mounted and slides/resizes between slots, so the change is smooth and loops forever. */}
        <ul className="relative aspect-[3/2] w-full lg:absolute lg:left-[calc(50%+0.34px)] lg:top-[calc(50%-0.67px)] lg:aspect-auto lg:h-[470px] lg:w-[1510px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:-rotate-[10deg]">
          {items.map((item, index) => {
            const { slot, jump } = slotOf(index);
            const isActive = slot === 0;
            const canSelect = desktop && Math.abs(slot) === 1;
            return (
              <motion.li
                key={item.id}
                aria-hidden={!isActive}
                initial={false}
                animate={cardState(slot, desktop)}
                // Visible neighbours can be clicked to bring them to the front.
                whileHover={hoverState(slot, desktop)}
                onClick={canSelect ? () => go(slot) : undefined}
                transition={transition(jump)}
                className={cn(
                  'group absolute left-0 top-0 flex items-center justify-center shadow-image transition-shadow duration-500 hover:shadow-image-hover lg:left-1/2 lg:top-1/2',
                  canSelect && 'cursor-pointer',
                )}
              >
                {/* Only the photo is clipped (for the zoom); the 96px title is wider than the card and must overflow. */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <motion.h3
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={transition(jump)}
                  className="relative w-full px-4 text-center font-display text-4xl font-bold uppercase leading-tight tracking-[2px] text-snow text-shadow-service md:text-6xl lg:w-[850px] lg:shrink-0 lg:px-0 lg:text-statement lg:tracking-[4.8px]"
                >
                  {item.title}
                </motion.h3>
              </motion.li>
            );
          })}
        </ul>

        <CarouselControls
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          prevLabel={controls.prev}
          nextLabel={controls.next}
          className="gap-8 lg:absolute lg:left-1/2 lg:top-[calc(50%+315px)] lg:-translate-x-1/2 lg:-translate-y-1/2"
        />

        <div
          aria-live="polite"
          className="flex flex-col items-start gap-5 lg:absolute lg:bottom-[110px] lg:left-[calc(66.67%-5px)] lg:w-[405px] lg:items-end"
        >
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-lg font-medium text-snow text-shadow-blurb md:text-xl lg:text-right lg:text-2xl"
          >
            {current.description}
          </motion.p>
          <Button href={`/services/${current.id}`}>{cta.label}</Button>
        </div>
      </Reveal>
    </section>
  );
}
