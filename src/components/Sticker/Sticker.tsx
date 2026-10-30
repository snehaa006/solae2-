import type { CSSProperties } from "react";
import styles from "./Sticker.module.css";

export interface StickerProps {
  /** A cut-out image with a transparent background. */
  src: string;
  alt?: string;
  /** Tilt in degrees. */
  rotate?: number;
  /** White die-cut border, like a real sticker (the gastrobox site's food stickers). */
  outline?: boolean;
  /** Bob gently up and down. Use on one sticker per view. */
  float?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** A product or prop cut out of its photo and laid on the page. */
export function Sticker({ src, alt = "", rotate = 0, outline = true, float, className, style }: StickerProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={[styles.sticker, outline && styles.outline, float && styles.float, className].filter(Boolean).join(" ")}
      style={{ rotate: rotate ? `${rotate}deg` : undefined, ...style }}
    />
  );
}

export interface OutfitProps {
  /** The one-piece. */
  top?: string;
  /** The matching shorts. */
  bottom?: string;
  /** A prop that rides along, e.g. sunglasses. */
  extra?: string;
  alt?: string;
  /** stacked: one-piece above, shorts tucked in front (a set). single: one piece centred. */
  layout?: "set" | "single";
  className?: string;
  style?: CSSProperties;
}

/**
 * Lays a one-piece and its shorts together as a set, the way they'd be
 * flat-laid for a shoot. Size it with its container; it keeps a 4:5 box.
 */
export function Outfit({ top, bottom, extra, alt = "", layout = top && bottom ? "set" : "single", className, style }: OutfitProps) {
  const single = top ?? bottom;
  return (
    <div className={[styles.outfit, styles[layout], className].filter(Boolean).join(" ")} style={style} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      {layout === "set" ? (
        <>
          {top && <Sticker src={top} className={styles.top} rotate={-5} />}
          {bottom && <Sticker src={bottom} className={styles.bottom} rotate={7} />}
        </>
      ) : (
        single && <Sticker src={single} className={top ? styles.soloTop : styles.soloBottom} rotate={top ? -3 : 4} />
      )}
      {extra && <Sticker src={extra} className={styles.extra} rotate={-12} />}
    </div>
  );
}
