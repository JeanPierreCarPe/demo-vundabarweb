import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { siteContent } from '@/data/siteContent';
import Button from '@/components/ui/Button';
import AppLink from '@/components/ui/AppLink';

export default function Navbar() {
  const { brand, nav } = siteContent;
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  // A link is current when its path matches (the homepage only when there is no section hash).
  const isCurrent = (href: string) => (href === '/' ? pathname === '/' && !hash : pathname.startsWith(href.split('#')[0]) && !href.includes('#'));

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-page px-5 py-5 md:px-10 lg:px-20">
        <div className="relative flex items-center justify-between gap-4">
          <AppLink href="/" className="shrink-0">
            <img
              src={brand.logo}
              alt={brand.logoAlt}
              width={298}
              height={50}
              className="h-8 w-auto transition-all duration-300 hover:drop-shadow-[0_0_14px_rgba(156,75,224,0.95)] motion-safe:hover:scale-105 md:h-10 lg:h-9 xl:h-[50px]"
            />
          </AppLink>

          <nav
            aria-label={nav.ariaLabel}
            className="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:block lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <ul className="flex items-center gap-6 xl:gap-8">
              {nav.links.map((link) => (
                <li key={link.label}>
                  <AppLink
                    href={link.href}
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                    className="link-underline text-trim font-body text-base font-normal text-snow/80 xl:text-xl"
                  >
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <Button href={nav.cta.href} variant="light" className="hidden lg:inline-flex lg:px-8 xl:px-[50px]">
            {nav.cta.label}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            className="flex size-11 flex-col items-center justify-center gap-[6px] rounded-[10px] border-[3px] border-snow transition-all duration-300 hover:bg-snow/20 hover:shadow-glow-snow motion-safe:active:scale-90 lg:hidden"
          >
            <span className={`h-[3px] w-5 rounded bg-snow transition-transform ${open ? 'translate-y-[9px] rotate-45' : ''}`} />
            <span className={`h-[3px] w-5 rounded bg-snow transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[3px] w-5 rounded bg-snow transition-transform ${open ? '-translate-y-[9px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-snow/20 bg-ink/95 px-5 pb-6 pt-4 backdrop-blur lg:hidden md:px-10">
          <nav aria-label={nav.ariaLabel}>
            <ul className="flex flex-col gap-4">
              {nav.links.map((link) => (
                <li key={link.label}>
                  <AppLink
                    href={link.href}
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className="link-underline font-body text-xl text-snow/80"
                  >
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={nav.cta.href} variant="light" className="mt-6">
            {nav.cta.label}
          </Button>
        </div>
      )}
    </header>
  );
}
