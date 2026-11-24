import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface LightboxProps {
  images: readonly { src: string; alt: string }[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
  labels: { close: string; prev: string; next: string; counter: (current: number, total: number) => string };
}

const buttonClass =
  'flex size-12 items-center justify-center rounded-full border-[3px] border-snow bg-ink/70 font-display text-2xl font-semibold text-snow transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink hover:shadow-glow-accent motion-safe:hover:scale-110';

/** Accessible image lightbox: focus moves into it and is trapped, Esc closes, arrow keys navigate, page scroll is locked. */
export default function Lightbox({ images, index, onChange, labels }: LightboxProps) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const count = images.length;

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onChange(null);
      else if (event.key === 'ArrowRight') onChange((((index ?? 0) + 1) % count + count) % count);
      else if (event.key === 'ArrowLeft') onChange((((index ?? 0) - 1) % count + count) % count);
      else if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocused.current?.focus();
    };
  }, [open, index, count, onChange]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.counter((index ?? 0) + 1, count)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink/95 p-4 backdrop-blur md:p-10"
          onClick={(event) => event.target === event.currentTarget && onChange(null)}
        >
          <div className="flex w-full max-w-[1200px] items-center justify-between">
            <p className="font-display text-lg font-semibold text-snow/80">{labels.counter((index ?? 0) + 1, count)}</p>
            <button type="button" className={buttonClass} onClick={() => onChange(null)} aria-label={labels.close}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="flex w-full max-w-[1200px] flex-1 items-center justify-center gap-4">
            <button type="button" className={buttonClass} onClick={() => onChange((((index ?? 0) - 1) % count + count) % count)} aria-label={labels.prev}>
              <span aria-hidden="true">←</span>
            </button>
            <motion.img
              key={index}
              src={images[index ?? 0].src}
              alt={images[index ?? 0].alt}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[70vh] min-w-0 flex-1 object-contain shadow-image"
            />
            <button type="button" className={buttonClass} onClick={() => onChange((((index ?? 0) + 1) % count + count) % count)} aria-label={labels.next}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
