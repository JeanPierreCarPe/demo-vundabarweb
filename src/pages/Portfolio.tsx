import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { meta, portfolioPage as page } from '@/data/pages';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import CoverStack, { COVER_STACK_LAYOUT } from '@/components/ui/CoverStack';
import CtaPanel from '@/components/ui/CtaPanel';
import { Glow, OutlineShape } from '@/components/ui/Decor';
import FeatureRow from '@/components/ui/FeatureRow';
import FilterChips from '@/components/ui/FilterChips';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Counters from '@/components/sections/Counters';
import Testimonials from '@/components/sections/Testimonials';

const featured = projects.find((project) => project.featured) ?? projects[0];
const industries = new Set(projects.map((project) => project.industry)).size;

const STACK_SLUGS = ['castro-capital', 'atlas-architects', 'studio-reverie'];

function HeroFacts() {
  const items = STACK_SLUGS.map((slug, index) => {
    const project = projects.find((p) => p.slug === slug)!;
    return { href: `/portfolio/${slug}`, label: project.title, image: project.cover, ...COVER_STACK_LAYOUT[index] };
  });
  const chips = [
    { value: projects.length, label: page.hero.statLabels.projects },
    { value: industries, label: page.hero.statLabels.industries },
    { value: page.hero.countries, label: page.hero.statLabels.countries },
  ];
  return <CoverStack items={items} chips={chips} />;
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>(page.filter.all);
  const options = useMemo(() => [page.filter.all, ...services.map((service) => service.title)], []);

  const visible = useMemo(() => {
    const slug = services.find((service) => service.title === filter)?.slug;
    return projects.filter((project) => project !== featured && (!slug || project.services.includes(slug)));
  }, [filter]);

  return (
    <>
      <PageMeta {...meta.portfolio} />
      <PageHero label={page.hero.label} title={page.hero.title} intro={page.hero.intro} aside={<HeroFacts />} shape="triangle" />

      {/* Featured project */}
      <PageSection
        decor={
          <>
            <Glow className="-left-[350px] top-[0]" />
            <OutlineShape shape="square" rotate={-50} squareSize={380} className="right-[-180px] top-[60px] size-[520px]" />
          </>
        }
      >
        <SectionHeading title={page.featured.title} label={page.featured.label} />
        <FeatureRow
          image={featured.cover}
          imageAlt={featured.coverAlt}
          title={featured.title}
          eyebrow={featured.headlineResult}
          tags={featured.tags}
          body={featured.summary}
          cta={{ label: page.featured.cta, href: `/portfolio/${featured.slug}` }}
        />
      </PageSection>

      {/* Filter + grid */}
      <PageSection decor={<Glow className="-right-[350px] top-[20%]" />} className="gap-10">
        <div className="sticky top-0 z-20 -mx-5 bg-ink/85 px-5 py-4 backdrop-blur md:-mx-10 md:px-10 lg:-mx-20 lg:px-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <FilterChips options={options} value={filter} onChange={setFilter} ariaLabel={page.filter.label} />
            <p aria-live="polite" className="font-display text-lg font-semibold text-snow/70">
              {visible.length} {visible.length === 1 ? page.filter.resultSingular : page.filter.resultPlural}
            </p>
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-center font-display text-2xl font-medium text-snow/70">{page.filter.empty}</p>
        ) : (
          <ul className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="lg:even:mt-24"
                >
                  <ProjectCard project={project} tall={project.shape === 'tall'} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </PageSection>

      <Counters backdrop={page.results.backdrop} items={page.results.items} />
      <Testimonials />
      <CtaPanel {...page.cta} />
    </>
  );
}
