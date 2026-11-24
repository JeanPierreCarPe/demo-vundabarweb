import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { caseStudyPage as copy, common, meta } from '@/data/pages';
import { getProject, projects } from '@/data/projects';
import { services } from '@/data/services';
import { cn } from '@/utils/cn';
import AppLink from '@/components/ui/AppLink';
import Badge from '@/components/ui/Badge';
import CtaPanel from '@/components/ui/CtaPanel';
import { Glow, OutlineShape } from '@/components/ui/Decor';
import FeatureRow from '@/components/ui/FeatureRow';
import Lightbox from '@/components/ui/Lightbox';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import SectionHeading from '@/components/ui/SectionHeading';
import SectionLabel from '@/components/ui/SectionLabel';
import NotFound from './NotFound';
import type { CaseStudy } from '@/types';

function Facts({ project }: { project: CaseStudy }) {
  const serviceTitles = project.services.map((slug) => services.find((service) => service.slug === slug)?.title).filter(Boolean) as string[];
  const items: [string, React.ReactNode][] = [
    [copy.facts.client, project.client],
    [copy.facts.year, project.year],
    [copy.facts.timeline, project.timeline],
    [
      copy.facts.services,
      <ul key="s" className="flex flex-wrap gap-2">
        {serviceTitles.map((title) => (
          <Badge key={title}>{title}</Badge>
        ))}
      </ul>,
    ],
  ];
  return (
    <PageSection className="gap-8 py-10 md:py-12 lg:py-[50px]">
      <dl className="grid gap-8 border-y-2 border-snow/20 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.6fr] lg:items-center lg:gap-10">
        {items.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-2">
            <dt className="font-display text-base font-semibold uppercase tracking-[1px] text-accent">{label}</dt>
            <dd className="font-display text-xl font-semibold text-snow/90">{value}</dd>
          </div>
        ))}
      </dl>
    </PageSection>
  );
}

function BriefChallenge({ project }: { project: CaseStudy }) {
  return (
    <PageSection decor={<Glow className="-right-[350px] top-[0]" />}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-start lg:gap-[50px]">
        <div className="flex flex-col gap-6">
          <SectionHeading title={copy.brief.title} label={copy.brief.label} />
          <p className="font-display text-lg font-medium text-snow/85 md:text-xl">{project.brief}</p>
        </div>
        <blockquote className="relative order-last border-l-[5px] border-accent pl-8 lg:order-none lg:mt-6">
          <span aria-hidden="true" className="absolute -top-14 left-6 font-display text-[120px] leading-none text-accent">“</span>
          <p className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 lg:text-[34px] lg:leading-10">{project.pullQuote}</p>
        </blockquote>
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 md:text-4xl lg:text-heading">{copy.brief.challenge}</h2>
          <p className="font-display text-lg font-medium text-snow/85 md:text-xl">{project.challenge}</p>
        </div>
      </div>
    </PageSection>
  );
}

function Solution({ project }: { project: CaseStudy }) {
  return (
    <PageSection
      decor={
        <>
          <OutlineShape shape="triangle" rotate={-45} className="left-[-252px] top-[28%] size-[571px]" />
          <Glow className="-right-[400px] bottom-[10%]" />
        </>
      }
      className="gap-14 lg:gap-[100px]"
    >
      <SectionHeading title={copy.solution.title} label={copy.solution.label} />
      {project.solution.map((step, index) => (
        <FeatureRow
          key={step.title}
          image={step.image}
          imageAlt={step.imageAlt}
          eyebrow={step.label}
          title={step.title}
          body={step.text}
          reversed={index % 2 === 1}
        />
      ))}
    </PageSection>
  );
}

/** Bento gallery that opens an accessible lightbox. Mobile: horizontal scroll-snap row. */
function Gallery({ project }: { project: CaseStudy }) {
  const [open, setOpen] = useState<number | null>(null);
  const spans = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:col-span-2', 'lg:col-span-4'];

  return (
    <PageSection decor={<Glow className="left-1/2 top-[40%] -translate-x-1/2" />}>
      <SectionHeading title={copy.gallery.title} label={copy.gallery.label} />
      <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-10 md:px-10 lg:mx-0 lg:grid lg:auto-rows-[230px] lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
        {project.gallery.map((image, index) => (
          <li key={image.src} className={cn('h-[260px] w-[85%] shrink-0 snap-center sm:w-[60%] lg:h-auto lg:w-auto', spans[index])}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`${copy.gallery.open}: ${image.alt}`}
              className="group/zoom relative block size-full cursor-zoom-in overflow-hidden shadow-image transition-all duration-500 hover:shadow-image-hover motion-safe:hover:-translate-y-2"
            >
              <img
                src={image.src}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover/zoom:scale-110"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover/zoom:bg-accent/10" />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        images={project.gallery}
        index={open}
        onChange={setOpen}
        labels={{ close: copy.gallery.close, prev: copy.gallery.prev, next: copy.gallery.next, counter: copy.gallery.counter }}
      />
    </PageSection>
  );
}

function Results({ project }: { project: CaseStudy }) {
  return (
    <PageSection>
      <SectionHeading title={copy.results.title} label={copy.results.label} />
      <ul className="grid gap-6 md:grid-cols-3 lg:gap-8">
        {project.results.map((result) => (
          <li
            key={result.value}
            className="group flex flex-col gap-4 rounded-[10px] border-[5px] border-solid border-accent px-8 py-10 text-center transition-all duration-300 hover:bg-accent/15 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] motion-safe:hover:-translate-y-2"
          >
            <strong className="font-display text-5xl font-bold uppercase leading-none text-snow/90 transition-colors duration-300 group-hover:text-accent lg:text-[56px]">
              {result.value}
            </strong>
            <span className="font-display text-lg font-medium text-snow/85">{result.text}</span>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

function ClientQuote({ project }: { project: CaseStudy }) {
  const { quote, name, role } = project.testimonial;
  return (
    <PageSection className="items-center py-16 lg:py-[120px]">
      <figure className="relative mx-auto flex max-w-[960px] flex-col items-center gap-8 pt-24 text-center">
        <SectionLabel
          scale={1.5}
          rotate={-6}
          style={{ '--label-w': '260px' } as React.CSSProperties}
          className="left-1/2 [--label-top-base:0px] [--label-top-md:0px] -translate-x-1/2 lg:top-[-62px] lg:h-[120px] lg:w-[var(--label-w)]"
        >
          {copy.testimonial.label}
        </SectionLabel>
        <blockquote className="font-display text-2xl font-medium text-snow/90 md:text-4xl lg:text-[44px] lg:leading-[54px]">
          <p>“{quote}”</p>
        </blockquote>
        <figcaption className="flex flex-col gap-1">
          <span className="font-display text-2xl font-bold text-accent">{name}</span>
          <span className="font-display text-lg font-medium text-snow/70">{role}</span>
        </figcaption>
      </figure>
    </PageSection>
  );
}

function NextProject({ project }: { project: CaseStudy }) {
  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];
  return (
    <PageSection className="py-6 md:py-8 lg:py-[40px]">
      <AppLink
        href={`/portfolio/${next.slug}`}
        className="group relative flex min-h-[280px] items-end overflow-hidden shadow-image transition-all duration-500 hover:shadow-image-hover md:min-h-[360px]"
      >
        <img src={next.cover} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" aria-hidden="true" />
        <span className="relative flex w-full items-end justify-between gap-6 p-6 md:p-10">
          <span className="flex flex-col gap-3">
            <span className="font-display text-lg font-semibold text-accent">{copy.next}</span>
            <span className="font-display text-4xl font-bold uppercase leading-tight text-snow text-shadow-service transition-colors duration-300 group-hover:text-accent md:text-6xl lg:text-[80px] lg:leading-[80px]">
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

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  return (
    <>
      <PageMeta title={`${project.title} | ${meta.portfolio.title}`} description={project.summary} />
      <PageHero
        size="lg"
        label={project.label}
        title={project.title}
        intro={project.summary}
        shape="square"
        top={
          <nav aria-label={common.breadcrumb}>
            <ol className="flex flex-wrap items-center gap-2 font-display text-base font-semibold text-snow/70">
              <li>
                <AppLink href="/portfolio" className="link-underline hover:text-accent">
                  {copy.back}
                </AppLink>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-snow/90">
                {project.title}
              </li>
            </ol>
          </nav>
        }
        className="pb-8 lg:pb-[60px]"
      />
      <PageSection className="py-0 md:py-0 lg:py-0">
        <img
          src={project.cover}
          alt={project.coverAlt}
          width={1280}
          height={640}
          className="aspect-[2/1] w-full object-cover shadow-image"
        />
      </PageSection>
      <Facts project={project} />
      <BriefChallenge project={project} />
      <Solution project={project} />
      <Gallery project={project} />
      <Results project={project} />
      <ClientQuote project={project} />
      <NextProject project={project} />
      <CtaPanel {...copy.closing} primary={{ label: copy.start, href: '/contact' }} secondary={{ label: copy.allProjects, href: '/portfolio' }} />
    </>
  );
}
