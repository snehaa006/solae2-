import type { CSSProperties, ReactNode } from "react";
import styles from "./Starburst.module.css";

export interface StarburstProps {
  children: ReactNode;
  hue?: "sunshine" | "coral" | "lagoon";
  /** Diameter, any CSS length. */
  size?: string;
  /** Number of points around the edge. */
  points?: number;
  rotate?: number;
  /** Slow spin, for one badge per view at most. */
  spin?: boolean;
  className?: string;
  style?: CSSProperties;
}

function burstPath(points: number, outer = 50, inner = 45.5) {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
  }
  return d + "Z";
}

/**
 * The zig-zag seal from the Thynk Natural pins, for prices and "new" badges.
 * Text inside stays upright and readable even when the badge is rotated.
 */
export function Starburst({ children, hue = "sunshine", size = "6.5rem", points = 28, rotate = -8, spin, className, style }: StarburstProps) {
  return (
    <span className={[styles.burst, styles[hue], className].filter(Boolean).join(" ")} style={{ width: size, rotate: `${rotate}deg`, ...style }}>
      <svg viewBox="0 0 100 100" className={[styles.shape, spin && styles.spin].filter(Boolean).join(" ")} aria-hidden="true">
        <path d={burstPath(points)} />
      </svg>
      <span className={styles.content}>{children}</span>
    </span>
  );
}
