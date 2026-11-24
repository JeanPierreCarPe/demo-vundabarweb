import { useEffect, useRef } from 'react';

/**
 * Signed position of item `index` relative to `active` in a looping list of `count` items,
 * normalised into the range [min, min + count - 1]. `0` is the active item.
 */
export function cyclicSlot(index: number, active: number, count: number, min: number): number {
  return ((((index - active - min) % count) + count) % count) + min;
}

/**
 * Drives an infinite carousel where every item stays mounted and just moves between slots.
 *
 * `slotOf(index)` returns the item's slot plus `jump`: true when the item wraps from one end of the
 * track to the other. That move happens off-screen, so it must be applied instantly (duration 0),
 * otherwise the item would sweep visibly across the whole track.
 */
export function useCyclicSlots(active: number, count: number, min: number) {
  const previous = useRef(active);

  useEffect(() => {
    previous.current = active;
  }, [active]);

  return (index: number) => {
    const slot = cyclicSlot(index, active, count, min);
    const before = cyclicSlot(index, previous.current, count, min);
    return { slot, jump: Math.abs(slot - before) > 1 };
  };
}
