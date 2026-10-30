import type { CSSProperties, ReactNode } from "react";
import styles from "./Band.module.css";

export interface StripesProps {
  /** Stripe colour; the gaps are always paper. */
  hue?: "lagoon" | "coral" | "sunshine";
  /** Band height, any CSS length. */
  height?: string;
  /** Stripe width, any CSS length. */
  stripe?: string;
  /** Spaced labels laid over the stripes, like the Seaborn card ("HIGH QUALITY · SUSTAINABLE · SWIMWEAR"). */
  labels?: ReactNode[];
  /** Round the band's corners (for cards) instead of running edge to edge. */
  rounded?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Cabana stripes, after the Seaborn Co. thank-you card. */
export function Stripes({ hue = "lagoon", height = "3.5rem", stripe = "clamp(1.75rem, 1rem + 3vw, 4rem)", labels, rounded, className, style, children }: StripesProps) {
  return (
    <div
      className={[styles.stripes, styles[hue], rounded && styles.rounded, className].filter(Boolean).join(" ")}
      style={{ minHeight: height, "--stripe": stripe, ...style } as CSSProperties}
    >
      {labels && (
        <div className={styles.labels}>
          {labels.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

export interface CheckerProps {
  hue?: "lagoon" | "coral" | "sunshine";
  /** Size of one square. */
  cell?: string;
  /** Number of rows of squares. */
  rows?: 1 | 2;
  className?: string;
  style?: CSSProperties;
}

/** A tight check strip between sections (Helm House, and Dollop's dashed edge with one row). */
export function Checker({ hue = "coral", cell = "0.75rem", rows = 2, className, style }: CheckerProps) {
  return (
    <div
      className={[styles.checker, styles[hue], rows === 1 && styles.single, className].filter(Boolean).join(" ")}
      style={{ "--cell": cell, ...style } as CSSProperties}
      aria-hidden="true"
    />
  );
}

export interface EdgeProps {
  /** wave: a soft sea line. scallop: a row of half-circles, like an awning. */
  shape?: "wave" | "scallop";
  /** Colour of the edge itself: use the colour of the section it belongs to. */
  color?: string;
  /** top: sits on top of the next section. bottom: hangs off the previous one. */
  position?: "top" | "bottom";
  height?: string;
  className?: string;
}

/** A shaped edge where two section colours meet. */
export function Edge({ shape = "wave", color = "var(--bg-canvas)", position = "top", height = "clamp(1.25rem, 0.8rem + 2vw, 2.75rem)", className }: EdgeProps) {
  const d =
    shape === "wave"
      ? "M0 40V22C120 22 120 6 240 6S360 22 480 22 600 6 720 6 840 22 960 22 1080 6 1200 6 1320 22 1440 22V40Z"
      : Array.from({ length: 24 }, (_, i) => `M${i * 60} 40A30 30 0 0 1 ${i * 60 + 60} 40`).join("") + "Z";
  return (
    <svg
      className={[styles.edge, styles[`edge-${position}`], className].filter(Boolean).join(" ")}
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      style={{ height, color }}
      aria-hidden="true"
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}
