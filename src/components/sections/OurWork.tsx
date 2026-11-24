import { siteContent } from '@/data/siteContent';
import { DecorLayer, Glow, OutlineShape } from '@/components/ui/Decor';
import SectionHeading from '@/components/ui/SectionHeading';
import FeatureRow from '@/components/ui/FeatureRow';
import Reveal from '@/components/ui/Reveal';

export default function OurWork() {
  const { label, title, items } = siteContent.work;

  return (
    <section id="portfolio" className="relative">
      <DecorLayer>
        <Glow className="-bottom-[400px] -right-[400px]" />
        <Glow className="-left-[400px] -top-[400px]" />
        <OutlineShape
          shape="triangle"
          rotate={-45}
          className="left-[-252px] top-[calc(50%-196.32px)] size-[571.351px] -translate-y-1/2"
        />
        <OutlineShape
          shape="square"
          rotate={-55}
          squareSize={400}
          className="right-[-181.09px] top-[-108px] size-[557.091px]"
        />
      </DecorLayer>

      <Reveal className="relative mx-auto flex max-w-page flex-col items-center gap-14 px-5 py-20 md:px-10 lg:gap-[76px] lg:px-20 lg:py-[100px]">

        <SectionHeading
          title={title}
          label={label}
          labelScale={1.69}
          className="w-full max-w-[546px] items-center"
          titleClassName="text-center"
          labelClassName="lg:left-[-82.5px] lg:top-[-97px] lg:h-[148.727px] lg:w-[300.755px]"
        />

        <ul className="flex w-full max-w-[1280px] flex-col gap-16 lg:gap-[100px]">
          {items.map((project, index) => (
            <li key={project.title}>
              <FeatureRow
                image={project.image}
                imageAlt={project.imageAlt}
                title={project.title}
                tags={project.tags}
                body={project.description}
                cta={{ label: project.cta, href: project.href }}
                reversed={index % 2 === 1}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
