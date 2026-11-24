import { useState } from 'react';
import { motion } from 'framer-motion';
import { aboutPage as page, meta } from '@/data/pages';
import { siteContent } from '@/data/siteContent';
import { useCyclicSlots } from '@/hooks/useCyclicSlots';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { useSlideTransition } from '@/hooks/useSlideTransition';
import Tag from '@/components/ui/Tag';
import CarouselControls from '@/components/ui/CarouselControls';
import CtaPanel from '@/components/ui/CtaPanel';
import { Glow, OutlineShape } from '@/components/ui/Decor';
import FeatureRow from '@/components/ui/FeatureRow';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import SectionHeading from '@/components/ui/SectionHeading';
import ZoomImage from '@/components/ui/ZoomImage';
import Counters from '@/components/sections/Counters';

const valueCard =
  'group flex flex-col gap-3 rounded-[10px] border-[3px] border-solid border-snow/25 p-7 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] motion-safe:hover:-translate-y-1.5';

function Story() {
  const [textImage, timelineImage] = page.story.images;
  return (
    <PageSection decor={<Glow className="-left-[350px] top-[0]" />} className="gap-14 lg:gap-[80px]">
      {/* Row 1: photo + text. The text column is wider, so its photo takes the narrower leftover space. */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-[60px]">
        <ZoomImage
          src={textImage.src}
          alt={textImage.alt}
          width={700}
          height={560}
          className="order-2 aspect-[3/2] w-full lg:order-none lg:aspect-auto lg:min-h-[460px] lg:min-w-0 lg:flex-1"
        />
        <div className="order-1 flex flex-col gap-8 lg:order-none lg:w-[620px] lg:shrink-0">
          <SectionHeading title={page.story.title} label={page.story.label} />
          {page.story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-display text-lg font-medium text-snow/85 md:text-xl lg:text-2xl">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Row 2: timeline + photo. The timeline column is narrower, so its photo gets more width. */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-[60px]">
        <ol className="relative flex flex-col gap-8 pl-10 lg:w-[440px] lg:shrink-0 lg:justify-center">
          <span aria-hidden="true" className="absolute bottom-3 left-[14px] top-3 w-[3px] bg-snow/50" />
          {page.story.milestones.map((milestone) => (
            <li key={milestone.year} className="group relative flex flex-col gap-2">
              <span className="absolute -left-10 top-1 flex size-[30px] items-center justify-center rounded-full border-2 border-solid border-snow bg-ink transition-all duration-300 group-hover:border-accent group-hover:shadow-glow-accent motion-safe:group-hover:scale-125">
                <span className="block size-[15px] rounded-full bg-snow transition-colors duration-300 group-hover:bg-accent" />
              </span>
              <p className="font-display text-xl font-semibold text-accent">{milestone.year}</p>
              <h3 className="font-display text-xl font-bold uppercase text-snow/90">{milestone.title}</h3>
              <p className="font-display text-lg font-medium text-snow/75">{milestone.text}</p>
            </li>
          ))}
        </ol>
        <ZoomImage
          src={timelineImage.src}
          alt={timelineImage.alt}
          width={780}
          height={560}
          className="aspect-[3/2] w-full lg:aspect-auto lg:min-h-[460px] lg:min-w-0 lg:flex-1"
        />
      </div>
    </PageSection>
  );
}

function Values() {
  const { mission, vision } = siteContent.about;
  return (
    <PageSection decor={<OutlineShape shape="square" rotate={-35} squareSize={440} className="right-[-200px] top-[10%] size-[640px]" />}>
      <SectionHeading title={page.values.title} label={page.values.label} />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {[mission, vision].map((item) => (
          <li key={item.label} className={`${valueCard} border-accent/60 bg-accent/5 md:col-span-1 lg:col-span-1`}>
            <span className="font-display text-xl font-semibold text-accent">{item.label}</span>
            <h3 className="font-display text-2xl font-bold uppercase leading-7 text-snow/90 transition-colors duration-300 group-hover:text-accent">{item.title}</h3>
            <p className="font-display text-lg font-medium text-snow/80">{item.body}</p>
          </li>
        ))}
        {page.values.items.map((item, index) => (
          <li key={item.title} className={valueCard}>
            <span className="font-display text-xl font-semibold text-accent">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-2xl font-bold uppercase leading-7 text-snow/90 transition-colors duration-300 group-hover:text-accent">{item.title}</h3>
            <p className="font-display text-lg font-medium text-snow/80">{item.text}</p>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

function Principles() {
  return (
    <PageSection className="gap-14 lg:gap-[100px]" decor={<Glow className="-right-[400px] top-[30%]" />}>
      <SectionHeading title={page.principles.title} label={page.principles.label} />
      {page.principles.items.map((item, index) => (
        <FeatureRow key={item.title} image={item.image} imageAlt={item.imageAlt} title={item.title} body={item.body} reversed={index % 2 === 1} eyebrow={String(index + 1).padStart(2, '0')} />
      ))}
    </PageSection>
  );
}

function Rituals() {
  return (
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[80px]">
        <div className="flex flex-col gap-8">
          <SectionHeading title={page.rituals.title} label={page.rituals.label} />
          <ul className="grid gap-6 sm:grid-cols-2">
            {page.rituals.items.map((item) => (
              <li key={item.title} className="group flex flex-col gap-2 border-l-[3px] border-snow/30 pl-5 transition-all duration-300 hover:border-accent motion-safe:hover:translate-x-1">
                <h3 className="font-display text-xl font-bold uppercase text-snow/90 transition-colors duration-300 group-hover:text-accent">{item.title}</h3>
                <p className="font-display text-lg font-medium text-snow/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6 lg:pt-6">
          <h3 className="font-display text-2xl font-bold uppercase text-snow/90">{page.rituals.toolsTitle}</h3>
          <ul className="flex flex-wrap gap-3">
            {page.rituals.tools.map((tool) => (
              <li key={tool}>
                <Tag className="h-11 cursor-default px-7 text-base hover:border-accent hover:bg-accent hover:text-ink motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105">{tool}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageSection>
  );
}

/** Infinite photo carousel: the next photo peeks in on the right (same mechanics as the testimonials). */
function Gallery() {
  const { items } = page.gallery;
  const [active, setActive] = useState(0);
  const count = items.length;
  const go = (step: number) => setActive((i) => (i + step + count) % count);
  const desktop = useIsDesktop();
  const slotOf = useCyclicSlots(active, count, -1);
  const transition = useSlideTransition();

  return (
    <PageSection decor={<Glow className="left-1/2 top-[40%] -translate-x-1/2" />}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeading title={page.gallery.title} label={page.gallery.label} />
        <CarouselControls onPrev={() => go(-1)} onNext={() => go(1)} prevLabel={page.gallery.prev} nextLabel={page.gallery.next} className="gap-[30px]" />
      </div>
      <ul className="relative aspect-[3/2] w-full lg:aspect-auto lg:h-[500px]">
        {items.map((item, index) => {
          const { slot, jump } = slotOf(index);
          return (
            <motion.li
              key={item.src}
              aria-hidden={slot !== 0}
              initial={false}
              animate={
                desktop
                  ? { x: slot * 773, opacity: slot === 0 ? 1 : slot === 1 ? 0.4 : 0 }
                  : { x: `${slot * 108}%`, opacity: slot === 0 ? 1 : 0 }
              }
              transition={transition(jump)}
              className="absolute left-0 top-0 size-full lg:w-[733px]"
            >
              <ZoomImage src={item.src} alt={item.alt} width={733} height={500} className="size-full" />
            </motion.li>
          );
        })}
      </ul>
    </PageSection>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageMeta {...meta.about} />
      <PageHero
        size="lg"
        label={page.hero.label}
        title={page.hero.title}
        intro={page.hero.intro}
        shape="triangle"
        aside={
          <ZoomImage eager src={page.hero.image} alt={page.hero.imageAlt} width={620} height={500} className="aspect-[620/500] w-full lg:w-[560px] lg:shrink-0" />
        }
      />
      <Story />
      <Values />
      <Counters backdrop={page.numbers.backdrop} />
      <Principles />
      <Rituals />
      <Gallery />
      <CtaPanel {...page.cta} />
    </>
  );
}
