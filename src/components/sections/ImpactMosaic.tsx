import { cn } from '@/utils/cn';
import { Glow } from '@/components/ui/Decor';
import PageSection from '@/components/ui/PageSection';
import SectionHeading from '@/components/ui/SectionHeading';
import ZoomImage from '@/components/ui/ZoomImage';

interface ImpactMosaicProps {
  label: string;
  title: string;
  /** Big translucent word behind the mosaic (desktop). */
  backdrop: string;
  /** Four figures. */
  stats: readonly { value: string; label: string }[];
  /** Four photos. */
  images: readonly string[];
}

/** Grid cells (4 columns x 3 rows on desktop, 2 columns on mobile). Photos and stat cards alternate. */
const CELLS = [
  { kind: 'image', index: 0, className: 'col-span-2 row-span-2' },
  { kind: 'image', index: 1, className: '' },
  { kind: 'stat', index: 0, className: '' },
  { kind: 'stat', index: 1, className: '' },
  { kind: 'image', index: 2, className: '' },
  { kind: 'stat', index: 2, className: '' },
  { kind: 'image', index: 3, className: 'col-span-2' },
  { kind: 'stat', index: 3, className: '' },
] as const;

/** Mosaic of photos and outcome cards: a more visual take on the homepage stat row. */
export default function ImpactMosaic({ label, title, backdrop, stats, images }: ImpactMosaicProps) {
  return (
    <PageSection
      decor={
        <>
          <Glow className="-right-[300px] top-[10%]" />
          <span className="absolute -z-10 hidden select-none whitespace-nowrap bg-gradient-to-br from-purple-700 to-purple-500 bg-clip-text font-display text-giant font-bold uppercase text-transparent opacity-30 blur-[1.5px] lg:left-1/2 lg:top-1/2 lg:block lg:-translate-x-1/2 lg:-translate-y-1/2">
            {backdrop}
          </span>
        </>
      }
    >
      <SectionHeading title={title} label={label} />
      <ul className="grid auto-rows-[170px] grid-cols-2 gap-4 md:auto-rows-[220px] lg:grid-cols-4 lg:gap-5">
        {CELLS.map((cell) => (
          <li key={`${cell.kind}-${cell.index}`} className={cn('min-h-0', cell.className)}>
            {cell.kind === 'image' ? (
              <ZoomImage src={images[cell.index]} alt="" width={600} height={600} className="size-full" />
            ) : (
              <div className="group flex size-full flex-col items-center justify-center gap-3 rounded-[10px] border-[5px] border-solid border-accent bg-ink/60 px-4 text-center backdrop-blur-sm transition-all duration-300 ease-out hover:bg-accent/15 hover:shadow-[0_0_28px_0_rgba(242,159,88,0.3)] motion-safe:hover:-translate-y-2 motion-safe:hover:scale-105">
                <strong className="font-display text-3xl font-bold uppercase leading-9 text-snow/90 transition-colors duration-300 group-hover:text-accent md:text-4xl lg:text-heading">
                  {stats[cell.index].value}
                </strong>
                <span className="font-display text-base font-semibold text-snow md:text-lg">{stats[cell.index].label}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
