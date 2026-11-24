import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { articlePage as page, common, meta } from '@/data/pages';
import { getPost, posts } from '@/data/posts';
import { getService } from '@/data/services';
import { teamProfiles } from '@/data/team';
import { cn } from '@/utils/cn';
import AppLink from '@/components/ui/AppLink';
import CtaPanel from '@/components/ui/CtaPanel';
import { Glow } from '@/components/ui/Decor';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import PostCard, { formatDate } from '@/components/ui/PostCard';
import SectionHeading from '@/components/ui/SectionHeading';
import NotFound from './NotFound';
import type { Post } from '@/types';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  if (reduce) return null;
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-accent shadow-glow-accent" />;
}

function ShareButtons({ title, vertical }: { title: string; vertical?: boolean }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === 'undefined' ? '' : window.location.href;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API blocked or unavailable: fall back to a temporary text field.
      const field = document.createElement('textarea');
      field.value = url;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(field);
      if (!ok) return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const base =
    'inline-flex h-11 items-center justify-center rounded-full border-[3px] border-snow/70 px-4 font-display text-base font-semibold text-snow/90 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink hover:shadow-glow-accent motion-safe:hover:-translate-y-0.5';
  return (
    <div className={cn('flex gap-3', vertical && 'flex-col')}>
      <button type="button" onClick={copy} className={base}>
        <span className="text-trim" aria-live="polite">{copied ? page.share.copied : page.share.copy}</span>
      </button>
      <a className={base} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>
        <span className="text-trim">{page.share.linkedin}</span>
      </a>
      <a className={base} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}>
        <span className="text-trim">{page.share.x}</span>
      </a>
    </div>
  );
}

function Body({ post }: { post: Post }) {
  const headings = post.content.filter((block) => block.type === 'heading') as { type: 'heading'; text: string }[];
  const [current, setCurrent] = useState(headings[0] ? slugify(headings[0].text) : '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.id)),
      { rootMargin: '-20% 0px -70% 0px' },
    );
    headings.forEach((h) => {
      const el = document.getElementById(slugify(h.text));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  return (
    <PageSection decor={<Glow className="-left-[350px] top-[10%]" />} className="py-10 lg:py-[60px]">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,720px)_120px] lg:justify-center lg:gap-[50px]">
        {headings.length > 0 && (
          <nav aria-label={page.toc} className="hidden lg:block">
            <div className="sticky top-10 flex flex-col gap-4">
              <p className="font-display text-base font-semibold uppercase tracking-[1px] text-accent">{page.toc}</p>
              <ul className="flex flex-col gap-3 border-l-[3px] border-snow/20">
                {headings.map((h) => {
                  const id = slugify(h.text);
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={current === id ? 'true' : undefined}
                        className={cn(
                          '-ml-[3px] block border-l-[3px] py-1 pl-4 font-display text-base font-semibold transition-all duration-300 hover:border-accent hover:text-accent',
                          current === id ? 'border-accent text-accent' : 'border-transparent text-snow/70',
                        )}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        )}

        <div className="flex flex-col gap-7 font-display">
          {post.content.map((block, index) => {
            switch (block.type) {
              case 'heading':
                return (
                  <h2 key={index} id={slugify(block.text)} className="mt-6 scroll-mt-10 text-3xl font-bold uppercase leading-9 text-snow/90 lg:text-4xl lg:leading-[44px]">
                    {block.text}
                  </h2>
                );
              case 'paragraph':
                return <p key={index} className="text-lg font-medium leading-8 text-snow/85 lg:text-xl lg:leading-9">{block.text}</p>;
              case 'quote':
                return (
                  <figure key={index} className="border-l-[5px] border-accent py-2 pl-7">
                    <blockquote className="text-2xl font-bold leading-9 text-snow/90 lg:text-3xl lg:leading-10">“{block.text}”</blockquote>
                    {block.cite && <figcaption className="mt-3 text-base font-semibold text-accent">{block.cite}</figcaption>}
                  </figure>
                );
              case 'list':
                return (
                  <ul key={index} className="flex flex-col gap-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-4 text-lg font-medium text-snow/85 lg:text-xl">
                        <span aria-hidden="true" className="mt-2.5 size-3 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              case 'image':
                return (
                  <figure key={index} className="flex flex-col gap-3">
                    <img src={block.src} alt={block.alt} loading="lazy" className="aspect-[3/2] w-full object-cover shadow-image" />
                    <figcaption className="text-base font-medium text-snow/60">{block.caption}</figcaption>
                  </figure>
                );
              case 'code':
                return (
                  <pre key={index} className="overflow-x-auto rounded-[10px] border-[3px] border-snow/25 bg-ink p-5 text-base text-accent">
                    <code>{block.text}</code>
                  </pre>
                );
            }
          })}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-10 flex flex-col gap-4">
            <p className="font-display text-base font-semibold uppercase tracking-[1px] text-accent">{page.share.title}</p>
            <ShareButtons title={post.title} vertical />
          </div>
        </aside>
      </div>
    </PageSection>
  );
}

function AuthorBox({ post }: { post: Post }) {
  const author = teamProfiles.find((member) => member.name === post.author);
  return (
    <PageSection className="py-6 lg:py-[30px]">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8">
        <div className="group flex flex-col gap-6 rounded-[10px] border-[3px] border-solid border-snow/25 p-7 transition-all duration-300 hover:border-accent hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] sm:flex-row sm:items-center">
          {author && (
            <img src={author.image} alt={author.imageAlt} width={96} height={96} loading="lazy" className="size-24 shrink-0 rounded-full object-cover object-top" />
          )}
          <div className="flex flex-col gap-2">
            <p className="font-display text-base font-semibold uppercase tracking-[1px] text-accent">{page.author.title}</p>
            <p className="font-display text-2xl font-bold text-snow/90">{post.author}{author && <span className="font-medium text-snow/60"> · {author.role}</span>}</p>
            {author && <p className="font-display text-lg font-medium text-snow/80">{author.bio}</p>}
            <AppLink href="/team" className="link-underline self-start font-display text-lg font-semibold text-accent">{page.author.cta}</AppLink>
          </div>
        </div>
        <div className="lg:hidden">
          <ShareButtons title={post.title} />
        </div>
      </div>
    </PageSection>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;

  const related = [...posts.filter((p) => p !== post && p.category === post.category), ...posts.filter((p) => p !== post && p.category !== post.category)].slice(0, 3);
  const service = getService(post.service);

  return (
    <>
      <ReadingProgress />
      <PageMeta title={`${post.title} | ${meta.journal.title}`} description={post.excerpt} />
      <PageHero
        size="md"
        label={post.category}
        title={post.title}
        intro={post.excerpt}
        compact
        top={
          <nav aria-label={common.breadcrumb}>
            <AppLink href="/journal" className="link-underline font-display text-base font-semibold text-snow/70">
              ← {page.back}
            </AppLink>
          </nav>
        }
        actions={
          <p className="font-display text-lg font-semibold text-snow/70">
            {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
          </p>
        }
      />
      <PageSection className="py-0 md:py-0 lg:py-0">
        <img src={post.cover} alt={post.coverAlt} width={1280} height={640} className="aspect-[2/1] w-full object-cover shadow-image" />
      </PageSection>
      <Body post={post} />
      <AuthorBox post={post} />
      <PageSection decor={<Glow className="-right-[350px] top-[10%]" />}>
        <SectionHeading title={page.related.title} label={page.related.label} />
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </PageSection>
      <CtaPanel
        {...page.cta}
        primary={{ label: page.cta.primary.label, href: service ? `/services/${service.slug}` : page.cta.primary.href }}
        secondary={page.cta.secondary}
      />
    </>
  );
}
