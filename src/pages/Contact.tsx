import { useId, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { contactPage as page, meta } from '@/data/pages';
import { services } from '@/data/services';
import { cn } from '@/utils/cn';
import AppLink from '@/components/ui/AppLink';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { Glow, OutlineShape } from '@/components/ui/Decor';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/ui/PageMeta';
import PageSection from '@/components/ui/PageSection';
import SectionHeading from '@/components/ui/SectionHeading';
import ZoomImage from '@/components/ui/ZoomImage';

interface BriefValues {
  name: string;
  email: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
  reference: string;
  consent: boolean;
}

type Errors = Partial<Record<keyof BriefValues, string>>;
const empty: BriefValues = { name: '', email: '', company: '', services: [], budget: '', timeline: '', message: '', reference: '', consent: false };

/** Connect this to your email / CRM / API of choice. Resolves when the brief has been sent. */
async function submitBrief(values: BriefValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  console.info('Project brief ready to send', values);
}

const inputClass =
  'w-full rounded-[10px] border-[3px] border-solid border-snow/30 bg-transparent px-5 py-3.5 font-display text-lg font-medium text-snow placeholder:text-snow/40 transition-all duration-300 hover:border-snow/60 focus:border-accent focus:outline-none focus:shadow-[0_0_20px_0_rgba(242,159,88,0.35)] aria-[invalid=true]:border-danger';

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-display text-base font-semibold text-snow/90">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="font-display text-base font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function Chip({ active, onClick, children, type = 'checkbox' }: { active: boolean; onClick: () => void; children: ReactNode; type?: 'checkbox' | 'radio' }) {
  return (
    <button
      type="button"
      role={type}
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border-[3px] px-5 font-display text-base font-semibold transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-95',
        active ? 'border-accent bg-accent text-ink shadow-glow-accent' : 'border-snow/60 text-snow/90 hover:border-accent hover:bg-accent/15 hover:text-accent',
      )}
    >
      <span className="text-trim">{children}</span>
    </button>
  );
}

function BriefForm() {
  const f = page.form;
  const uid = useId();
  const [values, setValues] = useState<BriefValues>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const id = (name: string) => `${uid}-${name}`;
  const set = <K extends keyof BriefValues>(key: K, value: BriefValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = f.errors.required;
    if (!values.email.trim()) next.email = f.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = f.errors.email;
    if (values.services.length === 0) next.services = f.errors.services;
    if (!values.message.trim()) next.message = f.errors.required;
    if (!values.consent) next.consent = f.errors.consent;
    return next;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById(id(Object.keys(next)[0]))?.focus();
      return;
    }
    setStatus('sending');
    await submitBrief(values);
    setStatus('success');
  };

  const ariaFor = (name: keyof BriefValues) => ({
    id: id(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
  });

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-6 rounded-[10px] border-[5px] border-solid border-accent bg-accent/5 p-8 lg:p-12">
        <h2 className="font-display text-4xl font-bold uppercase text-snow/90 lg:text-heading">{f.success.title}</h2>
        <p className="font-display text-xl font-medium text-snow/85">{f.success.text}</p>
        <button
          type="button"
          onClick={() => { setValues(empty); setStatus('idle'); }}
          className="inline-flex h-12 items-center justify-center rounded-[10px] border-[3px] border-snow px-[50px] font-display text-xl font-semibold tracking-[1px] text-snow transition-all duration-300 hover:bg-snow hover:text-ink hover:shadow-glow-snow motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 motion-safe:active:scale-95"
        >
          <span className="text-trim">{f.success.again}</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <div className="grid gap-7 md:grid-cols-2">
        <Field label={f.fields.name} id={id('name')} error={errors.name}>
          <input {...ariaFor('name')} type="text" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
        </Field>
        <Field label={f.fields.email} id={id('email')} error={errors.email}>
          <input {...ariaFor('email')} type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
        </Field>
      </div>
      <Field label={f.fields.company} id={id('company')}>
        <input id={id('company')} type="text" autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} className={inputClass} />
      </Field>

      <fieldset id={id('services')} tabIndex={-1} aria-invalid={errors.services ? true : undefined} className="flex flex-col gap-3 focus:outline-none">
        <legend className="mb-3 font-display text-base font-semibold text-snow/90">{f.fields.services}</legend>
        <div className="flex flex-wrap gap-3">
          {services.map((service) => (
            <Chip
              key={service.slug}
              active={values.services.includes(service.slug)}
              onClick={() => set('services', values.services.includes(service.slug) ? values.services.filter((s) => s !== service.slug) : [...values.services, service.slug])}
            >
              {service.title}
            </Chip>
          ))}
        </div>
        {errors.services && <p role="alert" className="font-display text-base font-semibold text-danger">{errors.services}</p>}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 font-display text-base font-semibold text-snow/90">{f.fields.budget}</legend>
        <div role="radiogroup" className="flex flex-wrap gap-3">
          {f.budgets.map((budget) => (
            <Chip key={budget} type="radio" active={values.budget === budget} onClick={() => set('budget', budget)}>
              {budget}
            </Chip>
          ))}
        </div>
      </fieldset>

      <Field label={f.fields.timeline} id={id('timeline')}>
        <select id={id('timeline')} value={values.timeline} onChange={(e) => set('timeline', e.target.value)} className={cn(inputClass, 'bg-ink')}>
          <option value="">{f.timelinePlaceholder}</option>
          {f.timelines.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label={f.fields.message} id={id('message')} error={errors.message}>
        <textarea {...ariaFor('message')} rows={6} value={values.message} placeholder={f.placeholders.message} onChange={(e) => set('message', e.target.value)} className={inputClass} />
      </Field>
      <Field label={f.fields.reference} id={id('reference')}>
        <input id={id('reference')} type="url" value={values.reference} placeholder={f.placeholders.reference} onChange={(e) => set('reference', e.target.value)} className={inputClass} />
      </Field>

      <div className="flex flex-col gap-2">
        <label htmlFor={id('consent')} className="group flex cursor-pointer items-start gap-4">
          <input
            {...ariaFor('consent')}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="peer sr-only"
          />
          <span aria-hidden="true" className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border-[3px] border-snow/60 text-transparent transition-all duration-300 group-hover:border-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent peer-aria-[invalid=true]:border-danger">
            ✓
          </span>
          <span className="font-display text-base font-medium text-snow/85">
            {f.fields.consent}{' '}
            <AppLink href={f.privacyLink.href} className="link-underline text-accent">
              {f.privacyLink.label}
            </AppLink>
          </span>
        </label>
        {errors.consent && <p id={`${id('consent')}-error`} role="alert" className="font-display text-base font-semibold text-danger">{errors.consent}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex h-14 items-center justify-center self-start rounded-[10px] border-[3px] border-accent bg-accent px-12 font-display text-xl font-semibold tracking-[1px] text-ink transition-all duration-300 hover:shadow-glow-accent motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 motion-safe:active:scale-95 disabled:cursor-wait disabled:opacity-70"
      >
        <span className="text-trim">{status === 'sending' ? f.sending : f.submit}</span>
      </button>
    </form>
  );
}

function BriefSection() {
  const { details } = page;
  return (
    <PageSection id="project-brief" decor={<Glow className="-right-[350px] top-[10%]" />} className="lg:py-[60px]">
      <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-[80px]">
        <div className="flex flex-col gap-10 lg:gap-14">
          <SectionHeading title={page.form.title} label={page.form.label} />
          <BriefForm />
        </div>
        <aside className="h-fit rounded-[10px] border-[3px] border-solid border-snow/25 bg-ink/60 p-8 backdrop-blur-sm lg:sticky lg:top-8">
          <h2 className="mb-6 font-display text-2xl font-bold uppercase text-snow/90">{details.title}</h2>
          <dl className="flex flex-col gap-5">
            {details.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="font-display text-base font-semibold uppercase tracking-[1px] text-accent">{item.label}</dt>
                <dd className="font-display text-lg font-medium text-snow/90">
                  {'href' in item && item.href ? (
                    <AppLink href={item.href} className="link-underline">
                      {item.value}
                    </AppLink>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </PageSection>
  );
}

function Next() {
  return (
    <PageSection decor={<Glow className="-left-[350px] top-[0]" />}>
      <SectionHeading title={page.next.title} label={page.next.label} />
      <ol className="grid gap-10 md:grid-cols-3 lg:gap-8">
        {page.next.steps.map((step, index) => (
          <li key={step.title} className="group/step flex flex-col gap-6">
            <ZoomImage src={step.image} alt={step.imageAlt} width={560} height={420} className="aspect-[4/3] w-full" />
            <div className="flex gap-5">
              <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full border-2 border-solid border-snow bg-ink transition-all duration-300 group-hover/step:border-accent group-hover/step:shadow-glow-accent">
                <span className="block size-[15px] rounded-full bg-snow transition-colors duration-300 group-hover/step:bg-accent" />
              </span>
              <div className="flex flex-col gap-3">
                <span className="font-display text-xl font-semibold text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl font-bold uppercase leading-7 text-snow/90 transition-colors duration-300 group-hover/step:text-accent">
                  {step.title}
                </h3>
                <p className="font-display text-lg font-medium text-snow/80">{step.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </PageSection>
  );
}

function BookCall() {
  const c = page.call;
  return (
    <PageSection className="py-6 lg:py-[40px]">
      <div className="group/call flex flex-col overflow-hidden rounded-[10px] border-[5px] border-solid border-accent bg-accent/5 md:flex-row md:items-stretch">
        <div className="relative min-h-[220px] overflow-hidden md:w-[42%] md:min-h-[300px]">
          <img
            src={c.image}
            alt={c.imageAlt}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover/call:scale-110"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink/50" />
        </div>
        <div className="flex flex-1 flex-col items-start justify-center gap-8 p-8 lg:p-12">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 lg:text-[40px] lg:leading-[44px]">{c.title}</h2>
            <p className="font-display text-lg font-medium text-snow/85 lg:text-xl">{c.text}</p>
          </div>
          <Button href={c.cta.href}>{c.cta.label}</Button>
        </div>
      </div>
    </PageSection>
  );
}

function Faqs() {
  return (
    <PageSection>
      <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-[80px]">
        <div className="flex flex-col gap-10">
          <SectionHeading title={page.faq.title} label={page.faq.label} />
          <ZoomImage
            src={page.faq.image}
            alt={page.faq.imageAlt}
            width={400}
            height={500}
            className="hidden aspect-[4/5] w-full lg:block"
          />
        </div>
        <Accordion items={page.faq.items} />
      </div>
    </PageSection>
  );
}

function Location() {
  const l = page.location;
  return (
    <PageSection id="studio-location" decor={<OutlineShape shape="triangle" rotate={-30} className="left-[-200px] top-[10%] h-[460px] w-[500px]" />}>
      <SectionHeading title={l.title} label={l.label} />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-[60px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-lg font-semibold uppercase tracking-[1px] text-accent">{l.addressTitle}</h3>
            {l.address.map((line) => (
              <p key={line} className="font-display text-2xl font-medium text-snow/90">
                {line}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg font-semibold uppercase tracking-[1px] text-accent">{l.hoursTitle}</h3>
            <dl className="flex flex-col gap-2">
              {l.hours.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-6 border-b-2 border-snow/15 pb-2 font-display text-lg font-medium text-snow/85">
                  <dt>{day}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-[10px] border-[3px] border-solid border-snow/25 bg-ink shadow-image">
            <iframe
              title={`Map showing the studio at ${l.pin}`}
              src={l.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 size-full border-0"
            />
          </div>
          <Button href={l.mapLink.href} variant="light" className="self-start">{l.mapLink.label}</Button>
        </div>
      </div>
      {/* A look at the studio */}
      <ul className="grid gap-4 sm:grid-cols-3 lg:gap-6">
        {l.gallery.map((photo) => (
          <li key={photo.src}>
            <ZoomImage src={photo.src} alt={photo.alt} width={560} height={380} className="aspect-[3/2] w-full" />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

export default function ContactPage() {
  const { hero } = page;
  return (
    <>
      <PageMeta {...meta.contact} />
      <PageHero
        label={hero.label}
        title={hero.title}
        intro={hero.intro}
        shape="square"
        actions={
          <p className="inline-flex items-center gap-3 rounded-full border-[3px] border-accent/70 px-5 py-2 font-display text-lg font-semibold text-snow/90">
            <span aria-hidden="true" className="size-3 rounded-full bg-accent shadow-glow-accent" />
            {hero.promise}
          </p>
        }
      />
      <BriefSection />
      <Next />
      <BookCall />
      <Faqs />
      <Location />
    </>
  );
}
