import { Fragment, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { useCyclicSlots } from '@/hooks/useCyclicSlots';
import { useSlideTransition } from '@/hooks/useSlideTransition';
import { cn } from '@/utils/cn';
import { DecorLayer, Glow } from '@/components/ui/Decor';
import SectionLabel from '@/components/ui/SectionLabel';
import CarouselControls from '@/components/ui/CarouselControls';

/** Distance between neighbouring letters, as a share of one letter's width (1228px / 600px in Figma). */
const LETTER_STEP = 204.67;

/** Headline and blurbs swap with a short fade + rise, one after the other. */
const TEXT_MOTION = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.3, ease: 'easeOut' },
} as const;

/** Floating loop of the letter in the middle (a few px up/down and a slight tilt). */
const FLOAT_ANIMATE = { y: [0, -16, 0], rotate: [0, 1.5, 0] };
const FLOAT_TRANSITION: Transition = { duration: 6, ease: 'easeInOut', repeat: Infinity };

interface LabelBox {
  /** Figma box of the script word, in px, relative to its headline word (desktop). */
  top: number;
  width: number;
  height: number;
  /** Horizontal offset: from the word's right edge (primary) or left edge (secondary). */
  side: number;
  /** Size multiplier for the stand-in script font (see SectionLabel). */
  scale: number;
}

/** Per-slide boxes of the two script words, taken from the three variants of the Hero component. */
const LABEL_BOXES: { primary: LabelBox; secondary: LabelBox }[] = [
  {
    primary: { side: -69.15, top: -76.93, width: 176.15, height: 115.339, scale: 1.37 },
    secondary: { side: -97, top: -76.24, width: 189.673, height: 118.963, scale: 1.23 },
  },
  {
    primary: { side: -67.9, top: -94.01, width: 239.901, height: 132.421, scale: 1.39 },
    secondary: { side: -97, top: -84, width: 218.651, height: 126.727, scale: 1.37 },
  },
  {
    primary: { side: -67.9, top: -94.01, width: 183.878, height: 117.41, scale: 1.28 },
    secondary: { side: -97, top: -84, width: 218.651, height: 126.727, scale: 1.54 },
  },
];

const boxVars = ({ side, top, width, height }: LabelBox): CSSProperties =>
  ({
    '--label-side': `${side}px`,
    '--label-top': `${top}px`,
    '--label-w': `${width}px`,
    '--label-h': `${height}px`,
  }) as CSSProperties;

export default function Hero() {
  const { slides, controls } = siteContent.hero;
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);
  const slotOf = useCyclicSlots(index, slides.length, -1);
  const transition = useSlideTransition();
  const slide = slides[index];
  const boxes = LABEL_BOXES[index];

  return (
    <section id="home" className="relative">
      <DecorLayer>
        <Glow className="-left-[200px] top-1/2 lg:-left-[361px] lg:top-[371px]" />
        <Glow className="-right-[200px] -top-[100px] lg:left-[calc(58.33%+29px)] lg:right-auto lg:top-[-303px]" />

        {/*
          Letter strip from the Figma "Hero letters" component: the letters sit side by side, 1228px
          apart (204.67% of a 600px letter), and the strip slides one step per slide change.
          Neighbours fade out so they never show on very wide screens (no clipping needed).
        */}
        <div className="absolute left-1/2 top-[110px] -z-10 size-[320px] -translate-x-1/2 md:top-[100px] md:size-[480px] lg:top-[120px] lg:size-[600px]">
          {slides.map((s, i) => {
            const { slot, jump } = slotOf(i);
            return (
              <motion.div
                key={s.src}
                initial={false}
                animate={{ x: `${slot * LETTER_STEP}%`, opacity: slot === 0 ? 1 : 0 }}
                transition={transition(jump)}
                className="absolute inset-0"
              >
                <motion.div
                  animate={FLOAT_ANIMATE}
                  transition={{ ...FLOAT_TRANSITION, delay: i * 1.5 }}
                  className="absolute"
                  style={{ inset: s.inset }}
                >
                  <img src={s.src} alt="" className="block size-full max-w-none" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </DecorLayer>

      <div className="relative mx-auto flex min-h-[680px] max-w-page flex-col justify-end gap-6 px-5 pb-12 pt-36 md:min-h-[760px] md:px-10 lg:block lg:h-[780px] lg:p-0">
        <h1 className="flex flex-col gap-10 font-display text-5xl font-bold uppercase text-snow text-shadow-title sm:text-7xl md:text-8xl lg:static lg:gap-0 lg:text-hero">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`primary-${index}`}
              {...TEXT_MOTION}
              className="text-trim relative text-snow/90 lg:absolute lg:right-[calc(8.33%+37px)] lg:top-[152px] lg:text-right"
            >
              {slide.words.primary}
              <SectionLabel
                scale={boxes.primary.scale}
                style={boxVars(boxes.primary)}
                className="left-auto right-0 lg:right-[var(--label-side)] lg:top-[var(--label-top)] lg:h-[var(--label-h)] lg:w-[var(--label-w)]"
              >
                {slide.labels.primary}
              </SectionLabel>
            </motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`secondary-${index}`}
              {...TEXT_MOTION}
              className="text-trim relative lg:absolute lg:left-[calc(8.33%+37px)] lg:top-[605px]"
            >
              {slide.words.secondary}
              <SectionLabel
                scale={boxes.secondary.scale}
                style={boxVars(boxes.secondary)}
                className="capitalize lg:left-[var(--label-side)] lg:top-[var(--label-top)] lg:h-[var(--label-h)] lg:w-[var(--label-w)]"
              >
                {slide.labels.secondary}
              </SectionLabel>
            </motion.span>
          </AnimatePresence>
        </h1>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`left-${index}`}
            {...TEXT_MOTION}
            className="max-w-[296px] font-display text-xl font-medium text-snow/90 lg:absolute lg:left-[calc(12.5%-100px)] lg:top-[195px] lg:w-[296px] lg:text-2xl"
          >
            {slide.leftBlurb}
          </motion.p>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`right-${index}`}
            {...TEXT_MOTION}
            className="max-w-[296px] font-display text-xl font-medium text-snow/90 lg:absolute lg:right-[calc(12.5%-100px)] lg:top-[518px] lg:w-[296px] lg:text-right lg:text-2xl"
          >
            {slide.rightBlurb}
          </motion.p>
        </AnimatePresence>

        <CarouselControls
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          prevLabel={controls.prev}
          nextLabel={controls.next}
          className="gap-[30px] lg:absolute lg:left-[calc(83.33%+30px)] lg:top-[658px]"
        />

        <div className="absolute hidden flex-col items-center lg:left-[calc(91.67%-10px)] lg:top-1/2 lg:flex lg:-translate-y-1/2">
          {slides.map((s, i) => (
            <Fragment key={s.src}>
              {i > 0 && <span aria-hidden="true" className="h-[50px] w-[3px] bg-snow/80" />}
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${controls.goTo} ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'group flex items-center justify-center rounded-full border-2 border-solid border-snow transition-all duration-300 hover:border-accent hover:shadow-glow-accent motion-safe:hover:scale-150',
                  i === index ? 'size-[30px]' : 'size-[15px]',
                )}
              >
                <span className="block size-[15px] shrink-0 rounded-full bg-snow transition-colors duration-300 group-hover:bg-accent" />
              </button>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
