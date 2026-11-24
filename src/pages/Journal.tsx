import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { journalPage as page, meta } from '@/data/pages';
import { postCategories, posts } from '@/data/posts';
import { cn } from '@/utils/cn';
import AppLink from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import CoverStack, { COVER_STACK_LAYOUT } from '@/components/ui/CoverStack';
import { Glow, OutlineShape } from '@/components/ui/Decor';
import FilterChips from '@/components/ui/FilterChips';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import PostCard, { formatDate } from '@/components/ui/PostCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Tag from '@/components/ui/Tag';
import ZoomImage from '@/components/ui/ZoomImage';

const featuredPost = posts.find((post) => post.featured) ?? posts[0];
const mostRead = [posts[2], posts[0], posts[6], posts[4], posts[1]];
const PAGE_SIZE = 6;
const STEP = 3;

/** Connect to your newsletter provider. Resolves when the address has been subscribed. */
async function subscribe(email: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info('Newsletter signup', email);
}

const STACK_SLUGS = ['designing-for-the-first-minute', 'performance-is-a-design-decision', 'what-we-learned-from-twenty-launches'];
const averageRead = Math.round(posts.reduce((sum, post) => sum + parseInt(post.readingTime, 10), 0) / posts.length);

function JournalHeroStack() {
  const items = STACK_SLUGS.map((slug, index) => {
    const post = posts.find((p) => p.slug === slug)!;
    return { href: `/journal/${slug}`, label: post.title, image: post.cover, ...COVER_STACK_LAYOUT[index] };
  });
  const chips = [
    { value: posts.length, label: page.hero.statLabels.articles },
    { value: postCategories.length, label: page.hero.statLabels.topics },
    { value: averageRead, label: page.hero.statLabels.read },
  ];
  return <CoverStack items={items} chips={chips} />;
}

function Featured() {
  return (
    <PageSection decor={<Glow className="-left-[350px] top-[0]" />}>
      <article className="group/card grid items-center gap-8 lg:grid-cols-[733px_1fr] lg:gap-[50px]">
        <ZoomImage src={featuredPost.cover} alt={featuredPost.coverAlt} width={733} height={500} eager className="aspect-[733/500] w-full" />
        <div className="flex flex-col items-start gap-6">
          <Tag>{featuredPost.category}</Tag>
          <h2 className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 transition-colors duration-300 group-hover/card:text-accent md:text-4xl lg:text-heading">
            {featuredPost.title}
          </h2>
          <p className="font-display text-lg font-medium text-snow/85 md:text-xl lg:text-2xl">{featuredPost.excerpt}</p>
          <p className="font-display text-base font-semibold text-snow/60">
            {featuredPost.author} · <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time> · {featuredPost.readingTime}
          </p>
          <Button href={`/journal/${featuredPost.slug}`}>{page.featured.cta}</Button>
        </div>
      </article>
    </PageSection>
  );
}

function Newsletter() {
  const n = page.newsletter;
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error');
      return;
    }
    setState('sending');
    await subscribe(email);
    setState('done');
  };

  return (
    <PageSection decor={<Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />} className="py-10 lg:py-[80px]">
      <div className="flex flex-col gap-10 rounded-[10px] border-[5px] border-solid border-accent bg-ink/60 px-6 pb-12 pt-20 backdrop-blur-sm md:px-12 md:pt-24 lg:flex-row lg:items-center lg:justify-between lg:px-[70px] lg:pb-[70px] lg:pt-[110px]">
        <div className="flex flex-col gap-6 lg:max-w-[520px]">
          <SectionHeading title={n.title} label={n.label} titleClassName="lg:leading-[48px]" />
          <p className="font-display text-lg font-medium text-snow/85 md:text-xl">{n.text}</p>
        </div>
        {state === 'done' ? (
          <p role="status" className="font-display text-2xl font-bold text-accent lg:max-w-[420px]">{n.success}</p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-3 lg:max-w-[460px]">
            <label htmlFor="newsletter-email" className="font-display text-base font-semibold text-snow/90">{n.emailLabel}</label>
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                value={email}
                placeholder={n.placeholder}
                aria-invalid={state === 'error' ? true : undefined}
                aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
                onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
                className="min-w-0 flex-1 rounded-[10px] border-[3px] border-solid border-snow/30 bg-transparent px-5 py-3.5 font-display text-lg font-medium text-snow placeholder:text-snow/40 transition-all duration-300 hover:border-snow/60 focus:border-accent focus:outline-none focus:shadow-[0_0_20px_0_rgba(242,159,88,0.35)] aria-[invalid=true]:border-danger"
              />
              <button
                type="submit"
                disabled={state === 'sending'}
                className="inline-flex h-[54px] items-center justify-center rounded-[10px] border-[3px] border-accent bg-accent px-8 font-display text-xl font-semibold text-ink transition-all duration-300 hover:shadow-glow-accent motion-safe:hover:-translate-y-1 motion-safe:active:scale-95 disabled:cursor-wait disabled:opacity-70"
              >
                <span className="text-trim">{state === 'sending' ? n.sending : n.submit}</span>
              </button>
            </div>
            {state === 'error' && <p id="newsletter-error" role="alert" className="font-display text-base font-semibold text-danger">{n.error}</p>}
          </form>
        )}
      </div>
    </PageSection>
  );
}

export default function JournalPage() {
  const [category, setCategory] = useState<string>(page.filter.all);
  const [params] = useSearchParams();
  const initial = params.get('q') ?? '';
  const [query, setQuery] = useState(initial);
  const [search, setSearch] = useState(initial.trim().toLowerCase());
  const [shown, setShown] = useState(PAGE_SIZE);

  // Debounce the search box.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(query.trim().toLowerCase()), 250);
    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => setShown(PAGE_SIZE), [category, search]);

  const hasFilters = category !== page.filter.all || search !== '';
  const matches = useMemo(() => {
    const base = hasFilters ? posts : posts.filter((post) => post !== featuredPost);
    return base.filter(
      (post) =>
        (category === page.filter.all || post.category === category) &&
        (!search || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(search)),
    );
  }, [category, search, hasFilters]);

  const counts = postCategories.map((name) => ({ name, count: posts.filter((post) => post.category === name).length }));
  const clear = () => { setCategory(page.filter.all); setQuery(''); };
  const pickTopic = (name: string) => {
    setCategory(name);
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PageMeta {...meta.journal} />
      <PageHero
        label={page.hero.label}
        title={page.hero.title}
        intro={page.hero.intro}
        shape="triangle"
        aside={<JournalHeroStack />}
      />
      <Featured />

      <PageSection id="latest" decor={<OutlineShape shape="square" rotate={-50} squareSize={380} className="right-[-180px] top-[40px] size-[520px]" />} className="gap-10">
        <SectionHeading title={page.latest.title} label={page.latest.label} />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <FilterChips options={[page.filter.all, ...postCategories]} value={category} onChange={setCategory} ariaLabel={page.filter.ariaLabel} />
          <div className="w-full lg:max-w-[340px]">
            <label htmlFor="journal-search" className="sr-only">{page.filter.searchLabel}</label>
            <input
              id="journal-search"
              type="search"
              value={query}
              placeholder={page.filter.searchPlaceholder}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border-[3px] border-solid border-snow/30 bg-transparent px-6 py-2.5 font-display text-lg font-medium text-snow placeholder:text-snow/40 transition-all duration-300 hover:border-snow/60 focus:border-accent focus:outline-none focus:shadow-[0_0_20px_0_rgba(242,159,88,0.35)]"
            />
          </div>
        </div>
        <p aria-live="polite" className="font-display text-lg font-semibold text-snow/70">
          {matches.length} {matches.length === 1 ? page.filter.resultSingular : page.filter.resultsLabel}
        </p>

        {matches.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-12 text-center">
            <p className="font-display text-2xl font-medium text-snow/70">{page.filter.empty}</p>
            <button type="button" onClick={clear} className="link-underline font-display text-xl font-semibold text-accent">
              {page.filter.clear}
            </button>
          </div>
        ) : (
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {matches.slice(0, shown).map((post) => (
                <motion.li key={post.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
                  <PostCard post={post} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
        {matches.length > shown && (
          <button
            type="button"
            onClick={() => setShown((n) => n + STEP)}
            className="inline-flex h-12 items-center justify-center self-center rounded-[10px] border-[3px] border-accent px-12 font-display text-xl font-semibold tracking-[1px] text-snow transition-all duration-300 hover:bg-accent hover:text-ink hover:shadow-glow-accent motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 motion-safe:active:scale-95"
          >
            <span className="text-trim">{page.latest.loadMore}</span>
          </button>
        )}
      </PageSection>

      <PageSection decor={<Glow className="-left-[350px] top-[10%]" />}>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-[80px]">
          <div className="flex flex-col gap-8">
            <SectionHeading title={page.topics.title} label={page.topics.label} />
            <ul className="flex flex-wrap gap-4">
              {counts.map(({ name, count }) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => pickTopic(name)}
                    className="group inline-flex h-14 items-center gap-3 rounded-full border-[3px] border-snow/70 px-7 font-display text-xl font-semibold text-snow/90 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink hover:shadow-glow-accent motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105"
                  >
                    <span className="text-trim">{name}</span>
                    <span className="rounded-full bg-snow/15 px-2.5 py-0.5 text-base group-hover:bg-ink/20">{count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 md:text-4xl lg:text-heading">{page.topics.mostRead}</h2>
            <ol>
              {mostRead.map((post, index) => (
                <li key={post.slug} className="border-b-2 border-snow/20 first:border-t-2">
                  <AppLink href={`/journal/${post.slug}`} className="group flex items-center gap-6 py-5 transition-all duration-300 motion-safe:hover:translate-x-2">
                    <span className={cn('w-14 font-display text-5xl font-bold leading-none text-accent/80 transition-all duration-300 group-hover:text-accent group-hover:[text-shadow:0_0_20px_rgba(242,159,88,0.8)]')}>
                      {index + 1}
                    </span>
                    <span className="font-display text-xl font-semibold text-snow/90 transition-colors duration-300 group-hover:text-accent">{post.title}</span>
                  </AppLink>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </PageSection>

      <Newsletter />
    </>
  );
}
