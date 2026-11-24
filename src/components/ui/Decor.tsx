import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Decoration layer for a section: same box as the section, capped at the 1440px design frame.
 * It has no z-index/opacity/transform, so it creates no stacking context. Its children (z-index -10)
 * therefore join the page-level context from `Layout` and always sit below every piece of content,
 * including the content of neighbouring sections. Put it in a `relative` section, never in `Reveal`.
 */
export function DecorLayer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 mx-auto max-w-page', className)}>
      {children}
    </div>
  );
}

/** Soft purple radial glow. The SVG already bakes in the blur, so it bleeds 18.75% past its box. */
export function Glow({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute -z-10 size-[400px] md:size-[600px] lg:size-[800px]', className)}>
      <img
        src="/images/decor/glow.svg"
        alt=""
        className="absolute -left-[18.75%] -top-[18.75%] block h-[137.5%] w-[137.5%] max-w-none"
      />
    </div>
  );
}

interface OutlineShapeProps {
  shape: 'square' | 'triangle';
  /** Rotation in degrees. */
  rotate: number;
  /** Positioning + bounding-box classes (Figma's rotated bounding box). Hidden below `lg`. */
  className?: string;
  /** Edge length of the square, in px. */
  squareSize?: number;
}

/** Orange blurred outline shape (square or triangle) used as background decoration on desktop. */
export function OutlineShape({ shape, rotate, className, squareSize = 500 }: OutlineShapeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute -z-10 hidden items-center justify-center lg:flex', className)}
    >
      <div style={{ transform: `rotate(${rotate}deg)` }} className="flex-none">
        {shape === 'square' ? (
          <div
            style={{ width: squareSize, height: squareSize }}
            className="border-[10px] border-solid border-accent blur-[5px]"
          />
        ) : (
          <div className="relative h-[375px] w-[433.013px]">
            <img
              src="/images/decor/triangle.svg"
              alt=""
              className="absolute -left-[2.31%] -top-[2.67%] block h-[105.33%] w-[104.62%] max-w-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
