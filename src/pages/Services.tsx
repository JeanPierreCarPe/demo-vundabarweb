import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { meta, servicesPage as page } from '@/data/pages';
import { services } from '@/data/services';
import { cn } from '@/utils/cn';
import AppLink from '@/components/ui/AppLink';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import CtaPanel from '@/components/ui/CtaPanel';
import { Glow, OutlineShape } from '@/components/ui/Decor';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import ProcessSteps from '@/components/ui/ProcessSteps';
import SectionHeading from '@/components/ui/SectionHeading';
import Tag from '@/components/ui/Tag';
import ZoomImage from '@/components/ui/ZoomImage';

function ServicesGrid() {
  return (
    <PageSection
      id="all-services"
      decor={<Glow className="-right-[300px] top-[100px]" />}
    >
      <SectionHeading title={page.grid.title} label={page.grid.label} />
      <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-6">
        {services.map((service, index) => (
          <li key={service.slug} className={cn('lg:col-span-2', index === 3 && 'lg:col-start-2', index >= 3 && 'lg:col-span-2')}>
            <AppLink href={`/services/${service.slug}`} className="group/card flex h-full flex-col gap-5">
              <ZoomImage src={service.image} alt={service.imageAlt} width={800} height={533} className="aspect-[3/2] w-full" />
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="font-display text-2xl font-bold uppercase leading-8 text-snow/90 transition-colors duration-300 group-hover/card:text-accent lg:text-[32px] lg:leading-9">
                  {service.title}
                </h3>
                <p className="font-display text-lg font-medium text-snow/80">{service.summary}</p>
                <div className="flex flex-wrap gap-2.5">
                  {service.tags.map((tag) => (
                    <Tag key={tag} className="group-hover/card:border-accent">
                      {tag}
                    </Tag>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 font-display text-lg font-semibold text-accent">
                  <span className="text-trim">{page.grid.cardCta}</span>
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover/card:translate-x-2">→</span>
                </span>
              </div>
            </AppLink>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

/** Vertical tabs on the left, big photo card with details on the right. */
function ServiceInFocus() {
  const [active, setActive] = useState(2);
  const current = services[active];

  return (
    <PageSection decor={<OutlineShape shape="square" rotate={-55} squareSize={500} className="left-[-250px] top-[100px] size-[700px]" />}>
      <SectionHeading title={page.focus.title} label={page.focus.label} />
      <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-[60px]">
        <div role="tablist" aria-orientation="vertical" className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {services.map((service, index) => {
            const isActive = index === active;
            return (
              <button
                key={service.slug}
                type="button"
                role="tab"
                id={`focus-tab-${service.slug}`}
                aria-selected={isActive}
                aria-controls="focus-panel"
                onClick={() => setActive(index)}
                className={cn(
                  'group flex shrink-0 items-center justify-between gap-4 rounded-[10px] border-[3px] px-6 py-4 text-left font-display text-lg font-semibold transition-all duration-300 lg:text-xl',
                  'motion-safe:hover:translate-x-1',
                  isActive
                    ? 'border-accent bg-accent text-ink shadow-glow-accent'
                    : 'border-snow/30 text-snow/90 hover:border-accent hover:bg-accent/10 hover:text-accent',
                )}
              >
                <span className="text-trim">{service.title}</span>
                <span aria-hidden="true" className="hidden transition-transform duration-300 group-hover:translate-x-1 lg:inline">→</span>
              </button>
            );
          })}
        </div>

        <div id="focus-panel" role="tabpanel" aria-labelledby={`focus-tab-${current.slug}`} className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-stretch">
          <div className="relative aspect-[4/3] shadow-image md:aspect-auto md:min-h-[460px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={current.slug}
                src={current.image}
                alt={current.imageAlt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-3xl font-bold uppercase leading-9 text-snow text-shadow-service md:text-[40px] md:leading-[44px]">
              {current.title}
            </p>
          </div>
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col justify-center gap-6"
          >
            <p className="font-display text-2xl font-medium text-snow/90">{current.intro}</p>
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold text-accent">{page.focus.outcomesTitle}</h3>
              <ul className="flex flex-col gap-2">
                {current.outcomes.slice(0, 3).map((outcome) => (
                  <li key={outcome.label} className="flex items-baseline gap-3 font-display text-lg font-medium text-snow/80">
                    <strong className="min-w-[84px] font-bold text-snow/90">{outcome.value}</strong>
                    <span>{outcome.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button href={`/services/${current.slug}`} className="self-start">
              {page.focus.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </PageSection>
  );
}

function Process() {
  return (
    <PageSection decor={<Glow className="-left-[350px] top-[0px]" />}>
      <SectionHeading title={page.process.title} label={page.process.label} />
      <ProcessSteps steps={page.process.steps} className="lg:grid-cols-5" />
    </PageSection>
  );
}

function Benefits() {
  return (
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-[80px]">
        <div className="flex flex-col gap-8">
          <SectionHeading title={page.benefits.title} label={page.benefits.label} />
          <p className="font-display text-lg font-medium text-snow/80 md:text-xl lg:text-2xl">{page.benefits.intro}</p>
          <ZoomImage
            src={page.benefits.image}
            alt={page.benefits.imageAlt}
            width={400}
            height={500}
            className="aspect-[3/2] w-full lg:aspect-[4/5]"
          />
        </div>
        <ul className="grid gap-6 sm:grid-cols-2">
          {page.benefits.items.map((item, index) => (
            <li
              key={item.title}
              className="group flex flex-col gap-3 rounded-[10px] border-[3px] border-solid border-snow/25 p-6 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] motion-safe:hover:-translate-y-1.5"
            >
              <span className="font-display text-xl font-semibold text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-xl font-bold uppercase leading-6 text-snow/90 transition-colors duration-300 group-hover:text-accent">
                {item.title}
              </h3>
              <p className="font-display text-lg font-medium text-snow/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageSection>
  );
}

function Packages() {
  return (
    <PageSection decor={<Glow className="left-1/2 top-[40%] -translate-x-1/2" />}>
      <SectionHeading title={page.packages.title} label={page.packages.label} />
      <ul className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
        {page.packages.items.map((pack) => (
          <li
            key={pack.name}
            className={cn(
              'group flex flex-col gap-6 rounded-[10px] border-solid bg-ink/60 p-8 backdrop-blur-sm transition-all duration-300 lg:p-10',
              pack.highlighted
                ? 'border-[5px] border-accent shadow-glow-accent lg:-my-4'
                : 'border-[3px] border-snow/30 hover:border-accent hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)]',
              'motion-safe:hover:-translate-y-2',
            )}
          >
            {pack.highlighted && (
              <span className="self-start rounded-full bg-accent px-4 py-1 font-display text-sm font-bold uppercase tracking-[1px] text-ink">
                <span className="text-trim">{page.packages.badge}</span>
              </span>
            )}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-3xl font-bold uppercase leading-9 text-snow/90">{pack.name}</h3>
              <p className="font-display text-lg font-medium text-snow/70">{pack.audience}</p>
            </div>
            <p className="font-display text-3xl font-bold text-accent">{pack.price}</p>
            <ul className="flex flex-col gap-3">
              {pack.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 font-display text-lg font-medium text-snow/90">
                  <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-accent text-sm text-accent">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button href="/contact" variant={pack.highlighted ? 'accent' : 'light'} className="mt-auto self-start">
              {page.packages.cta}
            </Button>
          </li>
        ))}
      </ul>
      <p className="font-display text-lg font-medium text-snow/70">{page.packages.note}</p>
    </PageSection>
  );
}

function Banner() {
  const b = page.packages.banner;
  return (
    <PageSection className="py-6 lg:py-[40px]">
      <div className="group/banner relative flex min-h-[340px] items-end overflow-hidden shadow-image transition-all duration-500 hover:shadow-image-hover md:min-h-[420px]">
        <img
          src={b.image}
          alt={b.imageAlt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover/banner:scale-105"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent" />
        <div className="relative flex max-w-[640px] flex-col gap-4 p-6 md:p-10">
          <span className="font-display text-lg font-semibold text-accent">{b.label}</span>
          <h2 className="font-display text-3xl font-bold uppercase leading-9 text-snow text-shadow-service md:text-5xl md:leading-[52px]">{b.title}</h2>
          <p className="font-display text-lg font-medium text-snow/90 text-shadow-blurb md:text-xl">{b.text}</p>
        </div>
      </div>
    </PageSection>
  );
}

function Faqs() {
  return (
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-[80px]">
        <div className="flex flex-col gap-10">
          <SectionHeading title={page.faq.title} label={page.faq.label} />
          <ZoomImage
            src={page.faq.image}
            alt={page.faq.imageAlt}
            width={400}
            height={500}
            className="hidden aspect-[4/5] w-full lg:block"
          />
        </div>
        <Accordion items={page.faq.items} />
      </div>
    </PageSection>
  );
}

export default function ServicesPage() {
  const { hero } = page;
  return (
    <>
      <PageMeta {...meta.services} />
      <PageHero
        label={hero.label}
        title={hero.title}
        intro={hero.intro}
        actions={
          <>
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <AppLink href={hero.secondary.href} className="link-underline font-display text-xl font-semibold text-snow/90">
              {hero.secondary.label}
            </AppLink>
          </>
        }
      />
      <ServicesGrid />
      <ServiceInFocus />
      <Process />
      <Benefits />
      <Packages />
      <Banner />
      <Faqs />
      <CtaPanel {...page.cta} />
    </>
  );
}
