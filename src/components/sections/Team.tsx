import { siteContent } from '@/data/siteContent';
import { DecorLayer, Glow, OutlineShape } from '@/components/ui/Decor';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ZoomImage from '@/components/ui/ZoomImage';

export default function Team() {
  const { label, title, members } = siteContent.team;

  return (
    <section id="team" className="relative">
      <DecorLayer>
        <Glow className="-bottom-[400px] left-1/2 -translate-x-1/2" />
        <OutlineShape
          shape="triangle"
          rotate={-10}
          className="left-[-225px] top-[calc(50%+335.25px)] h-[444.495px] w-[491.552px] -translate-y-1/2"
        />
        <OutlineShape
          shape="square"
          rotate={-55}
          squareSize={400}
          className="right-[-230.09px] top-[calc(50%-220.12px)] size-[557.091px] -translate-y-1/2"
        />
      </DecorLayer>

      <Reveal className="relative mx-auto flex max-w-page flex-col items-center gap-12 px-5 py-20 md:px-10 lg:gap-[50px] lg:px-20 lg:py-[100px]">

        <SectionHeading
          title={title}
          label={label}
          labelScale={1.53}
          className="w-full items-center lg:w-[437px]"
          titleClassName="text-center lg:w-[468px] lg:shrink-0"
          labelClassName="lg:left-[-78px] lg:top-[-73px] lg:h-[109.386px] lg:w-[153.934px]"
        />

        <ul className="grid w-full max-w-[1280px] grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between">
          {members.map((member) => (
            <li key={member.name} className="group/member flex flex-col items-center gap-5 lg:max-w-[296px] lg:flex-1">
              <ZoomImage
                src={member.image}
                alt={member.imageAlt}
                width={296}
                height={450}
                className="aspect-[296/450] h-auto w-full hover:shadow-[0_0_45px_0_rgba(242,159,88,0.55)] lg:h-[450px]"
                shadow={false}
              />
              <div className="flex w-full flex-col gap-2.5 px-5 text-center capitalize text-snow/90 transition-all duration-300 motion-safe:group-hover/member:-translate-y-1">
                <h3 className="font-display text-2xl font-semibold leading-[30px] transition-colors duration-300 group-hover/member:text-accent">
                  {member.name}
                </h3>
                <p className="font-display text-xl font-medium leading-[30px]">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
