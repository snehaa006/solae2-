/** Corners, shadows and motion. */

export const radius = {
  none: "0",
  xs: "4px",
  sm: "8px",
  md: "14px",
  lg: "24px",
  xl: "36px",
  pill: "999px",
  /** The arch frame: a doorway shape (Helm House "what's trending"). */
  arch: "999px 999px 14px 14px",
} as const;

export const shadow = {
  /** Hairline lift for cards on the page colour. */
  xs: "0 1px 2px rgba(4, 41, 43, 0.06)",
  sm: "0 2px 8px -2px rgba(4, 41, 43, 0.10), 0 1px 2px rgba(4, 41, 43, 0.06)",
  md: "0 14px 30px -12px rgba(4, 41, 43, 0.22)",
  lg: "0 30px 60px -24px rgba(4, 41, 43, 0.30)",
  /** Frosted header (Sage). */
  glass: "0 8px 32px -12px rgba(4, 41, 43, 0.25), inset 0 0 0 1px rgba(255, 252, 240, 0.35)",
} as const;

export const motion = {
  duration: {
    instant: "90ms",
    fast: "160ms",
    base: "260ms",
    slow: "480ms",
    slower: "800ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    emphasized: "cubic-bezier(0.3, 0, 0, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  header: 50,
  overlay: 80,
  drawer: 90,
  toast: 100,
} as const;
