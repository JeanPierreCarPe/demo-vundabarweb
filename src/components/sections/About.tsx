import { siteContent } from '@/data/siteContent';
import { DecorLayer, Glow, OutlineShape } from '@/components/ui/Decor';
import SectionHeading from '@/components/ui/SectionHeading';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import ZoomImage from '@/components/ui/ZoomImage';
import Reveal from '@/components/ui/Reveal';

const bodyClass = 'font-display text-lg font-medium text-snow/90 md:text-xl lg:w-[515px] lg:text-2xl';

export default function About() {
  const { intro, statement, mission, vision, image, imageAlt } = siteContent.about;

  return (
    <section id="about" className="relative">
      <DecorLayer>
        <Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <OutlineShape
          shape="triangle"
          rotate={20}
          className="left-[calc(75%-30px)] top-[calc(50%+227.24px)] h-[500.484px] w-[535.156px] -translate-y-1/2"
        />
        <OutlineShape
          shape="square"
          rotate={-25}
          squareSize={500}
          className="left-[-147px] top-[calc(50%-476.08px)] size-[664.463px] -translate-y-1/2"
        />
      </DecorLayer>

      <Reveal className="relative mx-auto flex max-w-page flex-col gap-16 px-5 py-20 md:gap-24 md:px-10 lg:gap-[200px] lg:px-20 lg:py-[150px]">

        {/* Intro */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <ZoomImage
            src={intro.image}
            alt={intro.imageAlt}
            width={621}
            height={500}
            className="aspect-[621/500] h-auto w-full lg:h-[500px] lg:w-[621px] lg:shrink-0"
          />
          <div className="flex flex-col items-start gap-[30px] lg:w-[515px] lg:items-end">
            <SectionHeading
              title={intro.title}
              label={intro.label}
              labelRotate={15}
              labelScale={1.64}
              className="w-full"
              titleClassName="lg:text-right"
              labelClassName="lg:left-[calc(100%-163.67px)] lg:top-[-91.46px] lg:h-[122.845px] lg:w-[204.162px]"
            />
            <p className={`${bodyClass} lg:text-right`}>{intro.body}</p>
            <Button href={intro.cta.href}>{intro.cta.label}</Button>
          </div>
        </div>

        {/* Statement */}
        <div className="flex justify-center">
          <h2 className="relative text-center font-display text-4xl font-bold uppercase leading-tight text-snow/90 text-shadow-title md:text-6xl lg:w-[861px] lg:text-statement">
            {statement.title}
            <SectionLabel scale={1.55} className="-left-2 [--label-top-base:-2rem] [--label-top-md:-2rem] lg:left-[-56.5px] lg:top-[-81px] lg:h-[126.727px] lg:w-[218.651px]">
              {statement.labels.left}
            </SectionLabel>
            <SectionLabel scale={1.52} className="bottom-[-2rem] left-auto right-0 [--label-top-base:auto] [--label-top-md:auto] lg:bottom-auto lg:left-[610.5px] lg:right-auto lg:top-[91.34px] lg:h-[131.386px] lg:w-[236.038px]">
              {statement.labels.right}
            </SectionLabel>
          </h2>
        </div>

        {/* Mission & Vision */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-16 lg:gap-[100px]">
            <div className="flex flex-col gap-[30px]">
              <SectionHeading
                title={mission.title}
                label={mission.label}
                labelScale={1.47}
                className="lg:w-[515px]"
                labelClassName="lg:left-[-60px] lg:top-[-94.56px] lg:h-[125.951px] lg:w-[215.753px]"
              />
              <p className={bodyClass}>{mission.body}</p>
            </div>
            <div className="flex flex-col gap-[30px]">
              <SectionHeading
                title={vision.title}
                label={vision.label}
                labelScale={1.35}
                className="lg:w-[437px]"
                labelClassName="lg:left-[-60px] lg:top-[-76.19px] lg:h-[107.574px] lg:w-[147.172px]"
              />
              <p className={bodyClass}>{vision.body}</p>
            </div>
          </div>
          <ZoomImage
            src={image}
            alt={imageAlt}
            width={621}
            height={650}
            className="aspect-[621/650] h-auto w-full lg:h-[650px] lg:w-[621px] lg:shrink-0"
          />
        </div>
      </Reveal>
    </section>
  );
}
