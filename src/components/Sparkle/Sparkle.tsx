import type { CSSProperties } from "react";
import styles from "./Sparkle.module.css";

export interface SparkleProps {
  size?: string;
  className?: string;
  style?: CSSProperties;
}

/** The long four-point star from the Thynk Natural pins. Decorative. */
export function Sparkle({ size = "2.5rem", className, style }: SparkleProps) {
  return (
    <svg viewBox="0 0 100 100" className={[styles.sparkle, className].filter(Boolean).join(" ")} style={{ width: size, ...style }} aria-hidden="true">
      <path d="M50 0C52 34 58 46 100 50 58 54 52 66 50 100 48 66 42 54 0 50 42 46 48 34 50 0Z" />
    </svg>
  );
}

export interface DividerProps {
  /** Where the sparkle sits on the rule. Omit for a plain hairline. */
  sparkle?: "start" | "center" | "end";
  className?: string;
  style?: CSSProperties;
}

/** A hairline across the column, optionally pinned with a sparkle (Thynk Natural collection list). */
export function Divider({ sparkle, className, style }: DividerProps) {
  return (
    <div className={[styles.divider, sparkle && styles[sparkle], className].filter(Boolean).join(" ")} style={style} role="separator">
      {sparkle && <Sparkle size="clamp(2.5rem, 2rem + 2vw, 4rem)" className={styles.pin} />}
    </div>
  );
}
