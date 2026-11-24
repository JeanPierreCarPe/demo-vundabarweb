import { siteContent } from '@/data/siteContent';
import AppLink from '@/components/ui/AppLink';

const linkClass = 'link-underline text-trim font-body text-lg font-normal text-snow/80 lg:text-xl';

export default function Footer() {
  const { brand, footer } = siteContent;

  return (
    <footer id="contact">
      <div className="mx-auto flex max-w-page flex-col gap-5 px-5 py-10 md:px-10 lg:px-20 lg:py-[43px]">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <AppLink href="/" className="shrink-0">
            <img
              src={brand.logo}
              alt={brand.logoAlt}
              width={406}
              height={68}
              className="h-10 w-auto transition-all duration-300 hover:drop-shadow-[0_0_16px_rgba(156,75,224,0.95)] motion-safe:hover:scale-105 md:h-12 lg:h-[68px]"
            />
          </AppLink>
          <nav aria-label={footer.navAriaLabel}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:gap-x-10">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <AppLink href={link.href} className={linkClass}>
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="h-0 w-full border-0 border-t-2 border-snow/60" />

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:gap-x-10">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <AppLink href={link.href} className={linkClass}>
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
          <ul aria-label={footer.socialAriaLabel} className="flex items-start gap-[30px]">
            {footer.social.map((item) => (
              <li key={item.label}>
                <AppLink href={item.href} aria-label={item.label} className="group block rounded-full p-2 -m-2">
                  <img
                    src={item.icon}
                    alt=""
                    width={item.width}
                    height={item.height}
                    className="block transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(242,159,88,1)] motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:scale-150"
                  />
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
