import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { common, meta, serviceDetailPage as copy } from '@/data/pages';
import { projects } from '@/data/projects';
import { getService, services } from '@/data/services';
import { cn } from '@/utils/cn';
import AppLink from '@/components/ui/AppLink';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import CtaPanel from '@/components/ui/CtaPanel';
import { Glow, OutlineShape } from '@/components/ui/Decor';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Tag from '@/components/ui/Tag';
import ZoomImage from '@/components/ui/ZoomImage';
import ImpactMosaic from '@/components/sections/ImpactMosaic';
import NotFound from './NotFound';
import type { ServiceDetail as Service } from '@/types';

function Breadcrumb({ service }: { service: Service }) {
  return (
    <nav aria-label={common.breadcrumb}>
      <ol className="flex flex-wrap items-center gap-2 font-display text-base font-semibold text-snow/70">
        <li>
          <AppLink href="/services" className="link-underline hover:text-accent">
            {copy.breadcrumbRoot}
          </AppLink>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-snow/90">
          {service.title}
        </li>
      </ol>
    </nav>
  );
}

function Deliverables({ service }: { service: Service }) {
  return (
    <PageSection decor={<Glow className="-left-[350px] top-[10%]" />}>
      <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-[80px]">
        <div className="flex flex-col gap-8">
          <SectionHeading title={copy.deliverables.title} label={copy.deliverables.label} />
          <p className="font-display text-lg font-medium text-snow/80 md:text-xl lg:text-2xl">{service.summary}</p>
        </div>
        <ul>
          {service.deliverables.map((item, index) => (
            <li
              key={item.title}
              className="group grid gap-2 border-b-2 border-snow/20 py-6 transition-all duration-300 first:border-t-2 hover:border-accent hover:bg-accent/5 motion-safe:hover:translate-x-2 md:grid-cols-[64px_240px_1fr] md:items-baseline md:gap-6 md:px-2"
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

/** Steps scroll past while a sticky photo on the right crossfades to match the step in view (desktop). */
function Approach({ service }: { service: Service }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [service.slug]);

  return (
    <PageSection decor={<OutlineShape shape="triangle" rotate={-30} className="right-[-120px] top-[60px] h-[480px] w-[520px]" />}>
      <SectionHeading title={copy.approach.title} label={copy.approach.label} />
      <div className="grid gap-10 lg:grid-cols-[1fr_560px] lg:gap-[80px]">
        <ol className="flex flex-col gap-14 lg:gap-[160px] lg:py-[60px]">
          {service.approach.map((step, index) => (
            <li
              key={step.title}
              ref={(el) => {
                refs.current[index] = el;
              }}
              data-index={index}
              className="flex flex-col gap-5 lg:min-h-[220px] lg:justify-center"
            >
              <img src={step.image} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover shadow-image lg:hidden" />
              <div className={cn('flex flex-col gap-3 transition-opacity duration-500', index === active ? 'lg:opacity-100' : 'lg:opacity-40')}>
                <span className="font-display text-xl font-semibold text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 lg:text-heading">{step.title}</h3>
                <p className="font-display text-lg font-medium text-snow/80 lg:max-w-[460px] lg:text-2xl">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="relative hidden lg:block">
          <div className="sticky top-[140px] aspect-[4/5] shadow-image">
            <AnimatePresence initial={false}>
              <motion.img
                key={service.approach[active].image}
                src={service.approach[active].image}
                alt={service.approach[active].title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function Tools({ service }: { service: Service }) {
  return (
    <PageSection>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[80px]">
        <SectionHeading title={copy.tools.title} label={copy.tools.label} className="lg:w-[400px] lg:shrink-0" />
        <div className="flex flex-col gap-8">
          <ul className="flex flex-wrap gap-3">
            {service.tools.map((tool) => (
              <li key={tool}>
                <Tag className="h-11 cursor-default px-7 text-base hover:border-accent hover:bg-accent hover:text-ink motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105">
                  {tool}
                </Tag>
              </li>
            ))}
          </ul>
          <p className="font-display text-lg font-medium text-snow/80 md:text-xl">{copy.tools.text}</p>
        </div>
      </div>
    </PageSection>
  );
}

function Related({ service }: { service: Service }) {
  const related = projects.filter((project) => project.services.includes(service.slug)).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <PageSection id="related" decor={<Glow className="-right-[350px] top-[10%]" />}>
      <SectionHeading title={copy.related_projects.title} label={copy.related_projects.label} />
      <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {related.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

function FaqAndNext({ service }: { service: Service }) {
  const next = services[(services.findIndex((s) => s.slug === service.slug) + 1) % services.length];
  return (
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-[80px]">
        <SectionHeading title={copy.faq.title} label={copy.faq.label} />
        <Accordion items={service.faqs} />
      </div>
      <AppLink
        href={`/services/${next.slug}`}
        className="group relative flex min-h-[260px] flex-col justify-end gap-3 overflow-hidden shadow-image transition-all duration-500 hover:shadow-image-hover md:min-h-[320px]"
      >
        <img
          src={next.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" aria-hidden="true" />
        <span className="relative flex items-end justify-between gap-6 p-6 md:p-10">
          <span className="flex flex-col gap-3">
            <span className="font-display text-lg font-semibold text-accent">{copy.next}</span>
            <span className="font-display text-4xl font-bold uppercase leading-tight text-snow text-shadow-service transition-colors duration-300 group-hover:text-accent md:text-6xl lg:text-[72px] lg:leading-[72px]">
              {next.title}
            </span>
          </span>
          <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-full border-[3px] border-snow text-2xl text-snow transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink motion-safe:group-hover:translate-x-2">
            →
          </span>
        </span>
      </AppLink>
    </PageSection>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <NotFound />;

  return (
    <>
      <PageMeta title={`${service.title} | ${meta.services.title}`} description={service.summary} />
      <PageHero
        size="lg"
        label={service.label}
        title={service.title}
        intro={service.intro}
        top={<Breadcrumb service={service} />}
        shape="triangle"
        actions={
          <>
            <Button href="/contact">{copy.cta}</Button>
            <AppLink href="#related" className="link-underline font-display text-xl font-semibold text-snow/90">
              {copy.related}
            </AppLink>
          </>
        }
        aside={
          <ZoomImage
            eager
            src={service.image}
            alt={service.imageAlt}
            width={620}
            height={500}
            className="aspect-[620/500] w-full lg:w-[560px] lg:shrink-0"
          />
        }
      />
      <ImpactMosaic
        label={copy.impact.label}
        title={copy.impact.title}
        backdrop={copy.backdrop}
        stats={service.outcomes}
        images={service.approach.map((step) => step.image)}
      />
      <Deliverables service={service} />
      <Approach service={service} />
      <Tools service={service} />
      <Related service={service} />
      <FaqAndNext service={service} />
      <CtaPanel {...copy.closing} primary={{ label: copy.cta, href: '/contact' }} secondary={{ label: copy.seeWork, href: '/portfolio' }} />
    </>
  );
}
