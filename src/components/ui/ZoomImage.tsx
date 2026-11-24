import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ZoomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Sizing classes for the card (aspect ratio, width, height). */
  className?: string;
  /** Drop shadow + orange glow on hover. Turn off for photos that have no shadow in the design. */
  shadow?: boolean;
  /** Eager loading for above-the-fold images. */
  eager?: boolean;
  /** Overlay content (badges, "view" pills) positioned inside the frame. */
  children?: ReactNode;
}

/**
 * Image card: on hover it lifts, gets an orange glow and the photo slowly zooms inside its frame.
 * The wrapper is the only element that clips, and only its own photo.
 */
export default function ZoomImage({ src, alt, width, height, className, shadow = true, eager, children }: ZoomImageProps) {
  return (
    <div
      className={cn(
        'group/zoom relative overflow-hidden transition-all duration-500 ease-out motion-safe:hover:-translate-y-2',
        shadow && 'shadow-image hover:shadow-image-hover',
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        className="size-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover/zoom:scale-110"
      />
      {children}
    </div>
  );
}
