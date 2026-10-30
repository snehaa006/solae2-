import { fluid, fluidStep } from "./fluid.ts";

/**
 * Type.
 *
 * Fraunces  the display serif. Soft, high-contrast and elegant at large sizes,
 *           with an italic we use for one accent word per heading
 *           ("how we're *different*", after the Helm House pin).
 * Jost      the sans for body, UI and the widely spaced labels (the Brand
 *           Starter sets its labels in spaced capitals; Jost is the lighter,
 *           more refined cousin of its Poppins).
 * Hand      "Nothing You Could Do", used only for short notes and signatures
 *           (the Seaborn thank-you card and The Queen's handwritten asides).
 */
export const fontFamily = {
  display: '"Fraunces Variable", "Fraunces", "Iowan Old Style", Georgia, serif',
  sans: '"Jost Variable", "Jost", "Avenir Next", "Segoe UI", system-ui, sans-serif',
  hand: '"Nothing You Could Do", "Segoe Print", "Bradley Hand", cursive',
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Fluid type scale. Each step grows smoothly between a 360px and a 1440px
 * viewport: a 16px base on a 1.2 ratio on phones, an 18px base on a 1.25
 * ratio on desktops. Steps below 0 are for small print and labels.
 */
const min = { base: 16, ratio: 1.2 };
const max = { base: 18, ratio: 1.25 };

export const fontSize = {
  "-2": fluidStep(-2, min, max),
  "-1": fluidStep(-1, min, max),
  "0": fluidStep(0, min, max),
  "1": fluidStep(1, min, max),
  "2": fluidStep(2, min, max),
  "3": fluidStep(3, min, max),
  "4": fluidStep(4, min, max),
  "5": fluidStep(5, min, max),
  "6": fluidStep(6, min, max),
  "7": fluidStep(7, min, max),
  /** Poster-sized words that run behind a section (The Queen, Sage's "new"). */
  poster: fluid(72, 260),
} as const;

export type FontStep = keyof typeof fontSize;

export const lineHeight = {
  tight: 1.02,
  snug: 1.15,
  heading: 1.2,
  body: 1.6,
  loose: 1.8,
} as const;

export const letterSpacing = {
  tight: "-0.02em",
  normal: "0",
  wide: "0.04em",
  label: "0.18em",
  wordmark: "0.32em",
} as const;
