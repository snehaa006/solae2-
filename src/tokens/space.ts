import { fluid } from "./fluid.ts";

/**
 * Fluid space scale. Each step is a range (phone → desktop) so gaps breathe
 * on large screens without blowing up on small ones.
 */
export const space = {
  "3xs": fluid(4, 5),
  "2xs": fluid(8, 9),
  xs: fluid(12, 14),
  s: fluid(16, 18),
  m: fluid(24, 28),
  l: fluid(32, 40),
  xl: fluid(48, 64),
  "2xl": fluid(64, 96),
  "3xl": fluid(96, 144),
  /** Vertical padding for a page section. */
  section: fluid(72, 160),
  /** Side gutter for the page container. */
  gutter: fluid(16, 48),
} as const;

export type SpaceStep = keyof typeof space;

export const layout = {
  /** Max width of the main content column. */
  container: "82.5rem",
  /** Comfortable reading measure. */
  measure: "62ch",
  narrow: "46rem",
} as const;

/** Breakpoints for the few layouts that switch rather than flow. */
export const breakpoint = {
  sm: 560,
  md: 820,
  lg: 1080,
  xl: 1320,
} as const;
