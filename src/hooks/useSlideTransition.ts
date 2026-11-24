import { useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';

const SLIDE: Transition = { duration: 0.7, ease: [0.65, 0, 0.35, 1] };
const INSTANT: Transition = { duration: 0 };

/**
 * Transition shared by every carousel: a smooth ease-in-out slide, or instant when the item is
 * wrapping around off-screen (`jump`) or when the visitor prefers reduced motion.
 */
export function useSlideTransition() {
  const reduce = useReducedMotion();
  return (jump = false): Transition => (jump || reduce ? INSTANT : SLIDE);
}
