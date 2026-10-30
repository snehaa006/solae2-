import type { CSSProperties, ReactNode } from "react";
import styles from "./Frame.module.css";

export type FrameShape = "rounded" | "arch" | "oval" | "ticket" | "stamp" | "square";
export type FrameTone = "none" | "lagoon" | "coral" | "sunshine" | "paper";

export interface FrameProps {
  /**
   * rounded: soft corners (Sage, The Queen).
   * arch: a doorway (Helm House "what's trending").
   * oval: a cameo (Helm House).
   * ticket: notched corners (Thynk Natural product rows).
   * stamp: a perforated postage stamp with a paper border (Seaborn postcards).
   * square: no shaping.
   */
  shape?: FrameShape;
  /** Aspect ratio, e.g. "4 / 5". */
  ratio?: string;
  /** Background behind the content: a pale tint of one of the three hues. */
  tone?: FrameTone;
  /** A thin outline floating just outside the shape (Helm House frames). Not available on ticket and stamp. */
  ring?: boolean;
  /** Shortcut for a photo: fills the frame and crops to fit. */
  src?: string;
  alt?: string;
  /** object-position for the photo, e.g. "50% 30%". */
  focus?: string;
  loading?: "lazy" | "eager";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Shapes the edge of a photo or a product shot. Use one or two shapes per section. */
export function Frame({ shape = "rounded", ratio = "4 / 5", tone = "none", ring, src, alt = "", focus, loading = "lazy", className, style, children }: FrameProps) {
  return (
    <div
      className={[styles.frame, styles[shape], styles[`tone-${tone}`], src && tone === "none" && styles.photo, ring && styles.ring, className].filter(Boolean).join(" ")}
      style={{ aspectRatio: ratio, ...style }}
    >
      <div className={styles.inner}>
        {src && <img src={src} alt={alt} loading={loading} decoding="async" style={{ objectPosition: focus }} className={styles.img} />}
        {children}
      </div>
    </div>
  );
}
