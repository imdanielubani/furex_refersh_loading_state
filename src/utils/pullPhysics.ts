/**
 * Rubber-band resistance: tracks the finger 1:1 at first, then stiffens and
 * approaches `limit` without ever reaching it.
 */
export function rubberBand(distance: number, limit: number) {
  'worklet';
  if (distance <= 0) return 0;
  return (distance * limit) / (distance + limit);
}

/** Finger travel that produces a given rubber-banded distance. Inverse of `rubberBand`. */
export function inverseRubberBand(displayed: number, limit: number) {
  'worklet';
  if (displayed <= 0) return 0;
  const clamped = Math.min(displayed, limit * 0.999);
  return (clamped * limit) / (limit - clamped);
}
