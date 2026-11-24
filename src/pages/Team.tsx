import { meta, teamPage as page } from '@/data/pages';
import { culture, openRoles, teamProfiles } from '@/data/team';
import AppLink from '@/components/ui/AppLink';
import CtaPanel from '@/components/ui/CtaPanel';
import { Glow, OutlineShape } from '@/components/ui/Decor';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import SectionHeading from '@/components/ui/SectionHeading';
import SectionLabel from '@/components/ui/SectionLabel';
import Tag from '@/components/ui/Tag';
import ZoomImage from '@/components/ui/ZoomImage';

const cultureIcons = ['◎', '◐', '✎', '✦'];
const handle = (name: string) => name.toLowerCase().replace(/[^a-z]/g, '');
const socials = [
  { name: 'LinkedIn', icon: '/images/icons/linkedin.svg', w: 17.9, h: 18, url: (name: string) => `https://www.linkedin.com/in/${handle(name)}` },
  { name: 'X', icon: '/images/icons/x.svg', w: 18, h: 16.3, url: (name: string) => `https://x.com/${handle(name)}` },
];

/** Card with the tall photo; the short bio and social links fade in over the photo on hover or keyboard focus. */
function MemberCard({ member }: { member: (typeof teamProfiles)[number] }) {
  return (
    <li className="group/member mx-auto flex w-full max-w-[360px] flex-col items-center gap-5 focus-visible:outline-none" tabIndex={0}>
      <ZoomImage
        src={member.image}
        alt={member.imageAlt}
        width={296}
        height={450}
        shadow={false}
        className="aspect-[296/450] w-full group-hover/member:shadow-[0_0_45px_0_rgba(242,159,88,0.55)] group-focus-visible/member:shadow-[0_0_45px_0_rgba(242,159,88,0.55)]"
      >
        <div className="absolute inset-0 flex flex-col justify-end gap-4 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover/member:opacity-100 group-focus-visible/member:opacity-100">
          <p className="font-display text-base font-medium text-snow/90">{member.bio}</p>
          <p className="font-display text-sm font-medium italic text-accent">{member.funFact}</p>
          <ul className="flex gap-4">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url(member.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${page.grid.socials} ${member.name} on ${social.name}`}
                  className="block transition-transform duration-300 hover:scale-125"
                >
                  <img src={social.icon} alt="" width={social.w} height={social.h} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ZoomImage>
      <div className="flex w-full flex-col gap-2.5 px-3 text-center capitalize text-snow/90 transition-all duration-300 motion-safe:group-hover/member:-translate-y-1">
        <h3 className="font-display text-2xl font-semibold leading-[30px] transition-colors duration-300 group-hover/member:text-accent">{member.name}</h3>
        <p className="font-display text-xl font-medium leading-[30px]">{member.role}</p>
      </div>
    </li>
  );
}

function Grid() {
  return (
    <PageSection decor={<Glow className="-left-[350px] top-[10%]" />}>
      <SectionHeading title={page.grid.title} label={page.grid.label} />
      <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
        {teamProfiles.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </ul>
    </PageSection>
  );
}

function Founder() {
  const f = page.founder;
  return (
    <PageSection decor={<OutlineShape shape="square" rotate={-45} squareSize={420} className="right-[-180px] top-[10%] size-[600px]" />}>
      <div className="grid items-center gap-12 lg:grid-cols-[440px_1fr] lg:gap-[80px]">
        <ZoomImage src={f.image} alt={f.imageAlt} width={440} height={560} className="aspect-[440/560] w-full max-w-[440px]" />
        <div className="relative flex flex-col gap-8">
          <SectionHeading title={f.title} label={f.label} />
          <blockquote className="border-l-[5px] border-accent pl-6">
            <p className="font-display text-2xl font-bold uppercase leading-8 text-snow/90 lg:text-[34px] lg:leading-10">“{f.quote}”</p>
          </blockquote>
          <p className="font-display text-lg font-medium text-snow/85 md:text-xl">{f.bio}</p>
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg font-semibold text-accent">{f.caresTitle}</h3>
            <ul className="flex flex-wrap gap-3">
              {f.cares.map((care) => (
                <li key={care}>
                  <Tag className="hover:border-accent hover:bg-accent hover:text-ink">{care}</Tag>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mt-6 h-[110px]">
            <SectionLabel
              scale={1.6}
              rotate={0}
              style={{ '--label-w': '460px' } as React.CSSProperties}
              className="left-0 [--label-top-base:10px] [--label-top-md:10px] lg:top-[10px] lg:h-[110px] lg:w-[var(--label-w)]"
            >
              {f.signature}
            </SectionLabel>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function Culture() {
  return (
    <PageSection>
      <SectionHeading title={page.culture.title} label={page.culture.label} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {culture.map((item, index) => (
          <li
            key={item.title}
            className="group flex flex-col gap-4 rounded-[10px] border-[3px] border-solid border-snow/25 p-7 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] motion-safe:hover:-translate-y-1.5"
          >
            <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full border-[3px] border-accent text-2xl text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-ink">
              {cultureIcons[index]}
            </span>
            <h3 className="font-display text-2xl font-bold uppercase leading-7 text-snow/90 transition-colors duration-300 group-hover:text-accent">{item.title}</h3>
            <p className="font-display text-lg font-medium text-snow/80">{item.text}</p>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

function Roles() {
  const mail = (title: string) => `mailto:${page.roles.email}?subject=${encodeURIComponent(title)}`;
  const rows = [...openRoles.map((role) => ({ ...role, key: role.title })), { title: page.roles.open.title, summary: page.roles.open.summary, type: '', location: '', key: 'open' }];
  return (
    <PageSection id={page.roles.id} decor={<Glow className="-right-[350px] top-[10%]" />}>
      <SectionHeading title={page.roles.title} label={page.roles.label} />
      {rows.length === 0 ? (
        <p className="font-display text-xl text-snow/70">{page.roles.empty}</p>
      ) : (
        <ul>
          {rows.map((role) => (
            <li key={role.key} className="border-b-2 border-snow/20 first:border-t-2">
              <AppLink
                href={mail(role.title)}
                className="group grid items-center gap-3 py-7 transition-all duration-300 hover:bg-accent/10 motion-safe:hover:pl-4 md:grid-cols-[1.2fr_1.6fr_auto] md:gap-8 md:px-2"
              >
                <span className="flex flex-col gap-2">
                  <span className="font-display text-2xl font-bold uppercase leading-7 text-snow/90 transition-colors duration-300 group-hover:text-accent">{role.title}</span>
                  {role.type && (
                    <span className="font-display text-base font-semibold text-snow/60">
                      {role.type} · {role.location}
                    </span>
                  )}
                </span>
                <span className="font-display text-lg font-medium text-snow/80">{role.summary}</span>
                <span className="inline-flex items-center gap-3 font-display text-lg font-semibold text-accent">
                  <span className="text-trim">{page.roles.apply}</span>
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </AppLink>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageMeta {...meta.team} />
      <PageHero
        label={page.hero.label}
        title={page.hero.title}
        intro={page.hero.intro}
        shape="triangle"
        aside={
          <ZoomImage eager src={page.hero.image} alt={page.hero.imageAlt} width={620} height={500} className="aspect-[620/500] w-full lg:w-[560px] lg:shrink-0" />
        }
      />
      <Grid />
      <Founder />
      <Culture />
      <Roles />
      <CtaPanel {...page.cta} />
    </>
  );
}
