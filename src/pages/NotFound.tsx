import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { meta, notFoundPage as page } from '@/data/pages';
import { projects } from '@/data/projects';
import AppLink from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import { Glow } from '@/components/ui/Decor';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';

/** Giant floating "404" behind the hero text, in the same purple gradient as the homepage hero letters. */
function Giant404() {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ y: [0, -18, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      className="absolute -top-[40px] right-[-40px] -z-10 select-none bg-gradient-to-br from-purple-700 to-purple-500 bg-clip-text font-display text-[260px] font-bold leading-none text-transparent opacity-60 blur-[1.5px] md:text-[340px] lg:right-[40px] lg:top-[40px] lg:text-[460px]"
    >
      404
    </motion.span>
  );
}

function HelpfulLinks() {
  return (
    <PageSection decor={<Glow className="-left-[350px] top-[10%]" />} className="py-10 lg:py-[60px]">
      <SectionHeading title={page.links.title} label={page.links.label} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {page.links.items.map((item) => (
          <li key={item.title}>
            <AppLink
              href={item.href}
              className="group flex h-full flex-col gap-3 rounded-[10px] border-[3px] border-solid border-snow/25 p-6 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] motion-safe:hover:-translate-y-1.5"
            >
              <span className="font-display text-2xl font-bold uppercase leading-7 text-snow/90 transition-colors duration-300 group-hover:text-accent">{item.title}</span>
              <span className="font-display text-lg font-medium text-snow/75">{item.text}</span>
              <span aria-hidden="true" className="mt-auto font-display text-2xl text-accent transition-transform duration-300 group-hover:translate-x-2">→</span>
            </AppLink>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

function SearchAndReport() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/journal?q=${encodeURIComponent(query.trim())}`);
  };
  return (
    <PageSection className="py-10 lg:py-[60px]">
      <div className="flex flex-col gap-8 rounded-[10px] border-[3px] border-solid border-snow/25 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <h2 className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 lg:max-w-[420px]">{page.search.title}</h2>
        <form onSubmit={onSubmit} role="search" className="flex w-full flex-col gap-4 sm:flex-row lg:max-w-[520px]">
          <label htmlFor="notfound-search" className="sr-only">{page.search.placeholder}</label>
          <input
            id="notfound-search"
            type="search"
            value={query}
            placeholder={page.search.placeholder}
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-0 flex-1 rounded-[10px] border-[3px] border-solid border-snow/30 bg-transparent px-5 py-3.5 font-display text-lg font-medium text-snow placeholder:text-snow/40 transition-all duration-300 hover:border-snow/60 focus:border-accent focus:outline-none focus:shadow-[0_0_20px_0_rgba(242,159,88,0.35)]"
          />
          <button type="submit" className="inline-flex h-[54px] items-center justify-center rounded-[10px] border-[3px] border-accent bg-accent px-8 font-display text-xl font-semibold text-ink transition-all duration-300 hover:shadow-glow-accent motion-safe:hover:-translate-y-1 motion-safe:active:scale-95">
            <span className="text-trim">{page.search.submit}</span>
          </button>
        </form>
        <AppLink href={page.search.report.href} className="link-underline font-display text-lg font-semibold text-accent">
          {page.search.report.label}
        </AppLink>
      </div>
    </PageSection>
  );
}

export default function NotFound() {
  const { hero } = page;
  return (
    <>
      <PageMeta {...meta.notFound} />
      <PageHero
        label={hero.label}
        title={hero.title}
        intro={hero.intro}
        size="lg"
        labelRotate={8}
        decor={<Giant404 />}
        actions={
          <>
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="light">
              {hero.secondary.label}
            </Button>
          </>
        }
      />
      <HelpfulLinks />
      <PageSection className="py-10 lg:py-[60px]">
        <SectionHeading title={page.featured.title} label={page.featured.label} />
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </PageSection>
      <SearchAndReport />
    </>
  );
}
