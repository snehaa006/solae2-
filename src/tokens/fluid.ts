/**
 * Fluid sizing helpers (Utopia-style).
 *
 * A fluid value grows linearly from `min` at the smallest viewport to `max`
 * at the largest, and is clamped outside that range. Everything is emitted in
 * rem so it still respects the reader's browser font size.
 */

export const viewport = { min: 360, max: 1440 } as const;

const rem = (px: number) => `${+(px / 16).toFixed(4)}rem`;

export function fluid(minPx: number, maxPx: number, minVw: number = viewport.min, maxVw: number = viewport.max): string {
  if (minPx === maxPx) return rem(minPx);
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const intercept = minPx - slope * minVw;
  const lo = Math.min(minPx, maxPx);
  const hi = Math.max(minPx, maxPx);
  return `clamp(${rem(lo)}, ${rem(intercept)} + ${+(slope * 100).toFixed(4)}vw, ${rem(hi)})`;
}

/** A modular scale step: base * ratio^step, at both ends of the viewport range. */
export function fluidStep(step: number, min: { base: number; ratio: number }, max: { base: number; ratio: number }): string {
  return fluid(min.base * min.ratio ** step, max.base * max.ratio ** step);
}
