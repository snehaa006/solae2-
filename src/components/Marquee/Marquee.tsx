import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Sun } from "./Sun";
import styles from "./Marquee.module.css";

export interface MarqueeProps {
  items: ReactNode[];
  /** lagoon / coral / sunshine fill, or a quiet line on the page colour. */
  tone?: "lagoon" | "coral" | "sunshine" | "plain";
  /** Seconds for one full loop. */
  speed?: number;
  /** Run right-to-left (default) or left-to-right. */
  reverse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

/**
 * A running line of words, separated by little suns (Kava's "100% organic
 * ingredients" ticker). It pauses on hover and stands still for people who
 * prefer reduced motion.
 */
export function Marquee({ items, tone = "lagoon", speed = 40, reverse, size = "sm", className, style }: MarqueeProps) {
  const run = (hidden: boolean) => (
    <div className={styles.run} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className={styles.item}>{item}</span>
          <Sun className={styles.sep} />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div
      className={[styles.marquee, styles[tone], styles[size], reverse && styles.reverse, className].filter(Boolean).join(" ")}
      style={{ "--speed": `${speed}s`, ...style } as CSSProperties}
    >
      <div className={styles.track}>
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
