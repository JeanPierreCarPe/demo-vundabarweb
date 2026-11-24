import { cn } from '@/utils/cn';

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  className?: string;
}

/** Round arrow: grows, fills and glows on hover, presses in on click. */
const arrowButton =
  'block size-[50px] shrink-0 rounded-full bg-transparent transition-all duration-300 ease-out hover:bg-snow/20 hover:shadow-glow-snow motion-safe:hover:scale-125 motion-safe:active:scale-95';

export default function CarouselControls({ onPrev, onNext, prevLabel, nextLabel, className }: CarouselControlsProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <button type="button" onClick={onPrev} aria-label={prevLabel} className={arrowButton}>
        <img src="/images/icons/arrow.svg" alt="" className="size-full -scale-x-100" />
      </button>
      <button type="button" onClick={onNext} aria-label={nextLabel} className={arrowButton}>
        <img src="/images/icons/arrow.svg" alt="" className="size-full" />
      </button>
    </div>
  );
}
