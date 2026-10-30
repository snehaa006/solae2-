import type { ElementType, ReactNode } from "react";
import { IconButton } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import styles from "./ProductCard.module.css";

export interface ProductCardSwatch {
  name: string;
  hex: string;
}

export interface ProductCardProps {
  name: string;
  /** Short line under the name, e.g. "One-piece + shorts". */
  kind?: string;
  /** Pre-formatted price, e.g. "SAR 319". */
  price: string;
  /** Pre-formatted old price for markdowns. */
  compareAt?: string;
  /** The picture: usually an <Outfit/> of stickers, or a <Frame/> photo. */
  media: ReactNode;
  /** Pale backdrop behind the picture. */
  tone?: "lagoon" | "coral" | "sunshine";
  swatches?: ProductCardSwatch[];
  badge?: string;
  href: string;
  /** Link component to render, e.g. a router Link adapter that takes `href`. Defaults to <a>. */
  linkAs?: ElementType;
  /** Shows a quick-add button over the picture. */
  onQuickAdd?: () => void;
}

/** A product in the grid: a picture on a pale tint, the name in Fraunces, then price and colours. */
export function ProductCard({ name, kind, price, compareAt, media, tone = "lagoon", swatches, badge, href, linkAs: LinkTag = "a", onQuickAdd }: ProductCardProps) {
  const shown = swatches?.slice(0, 5) ?? [];
  const more = (swatches?.length ?? 0) - shown.length;
  return (
    <article className={[styles.card, styles[tone]].join(" ")}>
      <div className={styles.media}>
        {media}
        {badge && (
          <Tag variant="solid" hue="sunshine" size="sm" className={styles.badge}>
            {badge}
          </Tag>
        )}
        {onQuickAdd && <IconButton icon="plus" label={`Add ${name} to bag`} variant="solid" size="sm" className={styles.quick} onClick={onQuickAdd} />}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>
          <LinkTag href={href} className={styles.link}>
            {name}
          </LinkTag>
        </h3>
        {kind && <p className={styles.kind}>{kind}</p>}
        <div className={styles.row}>
          <p className={styles.price}>
            {compareAt && (
              <s className={styles.was}>
                <span className="visually-hidden">Was </span>
                {compareAt}
              </s>
            )}
            {price}
          </p>
          {shown.length > 0 && (
            <ul className={styles.swatches} aria-label={`${swatches!.length} colours`}>
              {shown.map((s) => (
                <li key={s.name} title={s.name} style={{ background: s.hex }}>
                  <span className="visually-hidden">{s.name}</span>
                </li>
              ))}
              {more > 0 && <li className={styles.more}>+{more}</li>}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
