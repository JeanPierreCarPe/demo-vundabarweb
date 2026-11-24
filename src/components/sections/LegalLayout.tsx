import { useEffect, useState } from 'react';
import { articlePage, common, legalPage as copy } from '@/data/pages';
import type { LegalDocument } from '@/data/legal';
import { cn } from '@/utils/cn';
import CtaPanel from '@/components/ui/CtaPanel';
import { Glow } from '@/components/ui/Decor';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';


function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label={common.backTop}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full border-[3px] border-accent bg-ink/90 text-2xl text-accent backdrop-blur transition-all duration-300 hover:bg-accent hover:text-ink hover:shadow-glow-accent motion-safe:hover:-translate-y-1',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

/** Shared layout of the Privacy Policy and Terms pages: summary cards, sticky table of contents and the document. */
export default function LegalLayout({ doc, meta }: { doc: LegalDocument; meta: { title: string; description: string } }) {
  const [current, setCurrent] = useState(doc.sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.id)),
      { rootMargin: '-15% 0px -75% 0px' },
    );
    doc.sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [doc]);

  const toc = (
    <ol className="flex flex-col gap-2 border-l-[3px] border-snow/20">
      {doc.sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            aria-current={current === section.id ? 'true' : undefined}
            className={cn(
              '-ml-[3px] block border-l-[3px] py-1 pl-4 font-display text-base font-semibold transition-all duration-300 hover:border-accent hover:text-accent',
              current === section.id ? 'border-accent text-accent' : 'border-transparent text-snow/70',
            )}
          >
            {index + 1}. {section.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <PageMeta {...meta} />
      <PageHero
        size="md"
        compact
        label={doc.label}
        title={doc.title}
        intro={doc.summary}
        actions={
          <p className="font-display text-lg font-semibold text-snow/70">
            {copy.updated}{' '}
            <time dateTime={doc.updated}>{new Date(doc.updated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>
          </p>
        }
      />

      <PageSection ariaLabel={copy.glance} className="py-6 lg:py-[40px]">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doc.glance.map((item) => (
            <li key={item.title}>
              <a
                href={`#${item.target}`}
                className="group flex h-full flex-col gap-3 rounded-[10px] border-[3px] border-solid border-snow/25 p-6 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] motion-safe:hover:-translate-y-1.5"
              >
                <h2 className="font-display text-xl font-bold uppercase leading-6 text-snow/90 transition-colors duration-300 group-hover:text-accent">{item.title}</h2>
                <p className="font-display text-lg font-medium text-snow/80">{item.text}</p>
                <span aria-hidden="true" className="mt-auto font-display text-lg font-semibold text-accent transition-transform duration-300 group-hover:translate-x-2">
                  {copy.details} →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection decor={<Glow className="-left-[350px] top-[10%]" />} className="py-10 lg:py-[60px]">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,720px)] lg:justify-center lg:gap-[80px]">
          {/* Desktop: sticky table of contents. Mobile: collapsible panel. */}
          <nav aria-label={articlePage.toc} className="lg:order-none">
            <details className="rounded-[10px] border-[3px] border-solid border-snow/25 p-5 lg:hidden">
              <summary className="cursor-pointer font-display text-lg font-semibold text-accent">{articlePage.toc}</summary>
              <div className="mt-4">{toc}</div>
            </details>
            <div className="sticky top-10 hidden flex-col gap-4 lg:flex">
              <p className="font-display text-base font-semibold uppercase tracking-[1px] text-accent">{articlePage.toc}</p>
              {toc}
            </div>
          </nav>
          <div className="flex flex-col gap-12">
            {doc.sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="flex scroll-mt-10 flex-col gap-6">
                <h2 id={`${section.id}-title`} className="flex items-baseline gap-5 font-display text-3xl font-bold uppercase leading-9 text-snow/90 lg:gap-6">
                  <span className="min-w-[2ch] shrink-0 text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <span>{section.title}</span>
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="font-display text-lg font-medium leading-8 text-snow/85 lg:text-xl lg:leading-9">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </PageSection>

      <CtaPanel {...doc.cta} primary={doc.cta.primary} secondary={doc.cta.secondary} />
      <BackToTop />
    </>
  );
}
