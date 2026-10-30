import type { CSSProperties, ReactNode } from "react";
import { Hand } from "../Typography/Typography";
import styles from "./Card.module.css";

export interface NoteCardProps {
  /** Small caps line across the top, e.g. "@solae.swim | solae.co". */
  meta?: ReactNode;
  /** The handwritten line, set on a strip of tape. */
  note: string;
  children: ReactNode;
  /** Spaced labels across the bottom. */
  footer?: ReactNode[];
  signature?: string;
  tone?: "sunshine" | "coral" | "lagoon";
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * A thank-you card with a bold border, a handwritten line on tape and spaced
 * labels top and bottom (the Seaborn Co. card).
 */
export function NoteCard({ meta, note, children, footer, signature, tone = "sunshine", rotate = 0, className, style }: NoteCardProps) {
  return (
    <figure className={[styles.note, styles[tone], className].filter(Boolean).join(" ")} style={{ rotate: rotate ? `${rotate}deg` : undefined, ...style }}>
      {meta && <p className={styles.meta}>{meta}</p>}
      <Hand tape={tone === "lagoon" ? "sunshine" : "lagoon"} rotate={-2} className={styles.hand}>
        {note}
      </Hand>
      <blockquote className={styles.body}>{children}</blockquote>
      {signature && <figcaption className={styles.signature}>{signature}</figcaption>}
      {footer && (
        <div className={styles.labels}>
          {footer.map((f, i) => (
            <span key={i}>{f}</span>
          ))}
        </div>
      )}
    </figure>
  );
}

export interface ValueCardProps {
  /** Small number in a pill, e.g. "01". */
  index?: string;
  title: ReactNode;
  children: ReactNode;
  /** A sticker, icon or small picture above the title. */
  art?: ReactNode;
  tone?: "paper" | "lagoon" | "coral" | "sunshine";
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * A short reason to believe, in a soft card. Lay three or four in a row and
 * tilt them a little each way (Helm House "how we're different", the gastrobox
 * site's four numbered cards).
 */
export function ValueCard({ index, title, children, art, tone = "paper", rotate = 0, className, style }: ValueCardProps) {
  return (
    <article className={[styles.value, styles[`v-${tone}`], className].filter(Boolean).join(" ")} style={{ "--tilt": `${rotate}deg`, ...style } as CSSProperties}>
      {index && <span className={styles.index}>{index}</span>}
      {art && <div className={styles.art}>{art}</div>}
      <h3 className={styles.vtitle}>{title}</h3>
      <div className={styles.vtext}>{children}</div>
    </article>
  );
}
