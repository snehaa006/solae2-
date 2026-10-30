/**
 * Colour tokens.
 *
 * The site uses three hues from the Brand Starter, and nothing else:
 *   Lagoon   #119DA4  the sea (blue)
 *   Coral    #F07167  the logo letters (pink)
 *   Sunshine #F8E077  the sun (yellow)
 *
 * Every other colour on the site is a tint or shade of one of these three.
 * Text uses the deepest Lagoon steps, the page uses the palest Sunshine step,
 * so even the "neutrals" stay inside the three brand hues.
 *
 * The swimsuit collection colours are product data (see src/site/data), not
 * UI colours, exactly as the Brand Starter says ("for the swimsuits only").
 */

export type Scale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export const lagoon: Scale = {
  50: "#EEF8F8",
  100: "#D5EFF0",
  200: "#ADE0E2",
  300: "#7FCDD1",
  400: "#45B6BC",
  500: "#119DA4",
  600: "#0F858B",
  700: "#0B6A6F",
  800: "#085255",
  900: "#063D3F",
  950: "#04292B",
};

export const coral: Scale = {
  50: "#FFF4F2",
  100: "#FDE6E3",
  200: "#FBCDC8",
  300: "#F8ADA5",
  400: "#F48C83",
  500: "#F07167",
  600: "#D2554B",
  700: "#A93E36",
  800: "#82302A",
  900: "#5E241F",
  950: "#3E1714",
};

export const sunshine: Scale = {
  50: "#FFFCF0",
  100: "#FEF7DA",
  200: "#FDF0BA",
  300: "#FBE89A",
  400: "#FAE58C",
  500: "#F8E077",
  600: "#E8C951",
  700: "#C4A12E",
  800: "#8F741C",
  900: "#5F4D14",
  950: "#3D320E",
};

export const palette = { lagoon, coral, sunshine } as const;
export type Hue = keyof typeof palette;

/** The three brand colours at full strength. */
export const brand = {
  lagoon: lagoon[500],
  coral: coral[500],
  sunshine: sunshine[500],
} as const;

/**
 * Semantic roles. Components only ever use these (as CSS variables),
 * never the raw scales, so a role can be re-pointed in one place.
 */
export const semantic = {
  bg: {
    canvas: sunshine[50],
    surface: "#FFFFFF",
    sunken: sunshine[100],
    lagoon: lagoon[700],
    lagoonSoft: lagoon[50],
    coral: coral[500],
    coralSoft: coral[50],
    sunshine: sunshine[500],
    sunshineSoft: sunshine[100],
    ink: lagoon[950],
  },
  text: {
    strong: lagoon[950],
    body: lagoon[900],
    muted: lagoon[700],
    inverse: sunshine[50],
    link: lagoon[700],
    accent: coral[700],
    onLagoon: sunshine[50],
    onCoral: lagoon[950],
    onSunshine: lagoon[950],
  },
  border: {
    subtle: "rgba(4, 41, 43, 0.12)",
    default: "rgba(4, 41, 43, 0.24)",
    strong: lagoon[950],
    inverse: "rgba(255, 252, 240, 0.35)",
  },
  action: {
    primary: lagoon[800],
    primaryHover: lagoon[600],
    primaryText: sunshine[50],
    accent: coral[500],
    accentHover: coral[400],
    accentText: lagoon[950],
    sun: sunshine[500],
    sunHover: sunshine[400],
    sunText: lagoon[950],
  },
  focus: coral[600],
  state: {
    success: lagoon[700],
    danger: coral[700],
  },
  overlay: "rgba(4, 41, 43, 0.45)",
} as const;
