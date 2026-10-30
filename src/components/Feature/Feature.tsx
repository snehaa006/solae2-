import type { ReactNode } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Feature.module.css";

export interface FeatureItem {
  icon: IconName;
  title: string;
  text?: string;
}

export interface FeatureRowProps {
  items: FeatureItem[];
  /** Icon ring colour. */
  hue?: "coral" | "lagoon" | "ink";
  className?: string;
}

/** A row of promises, each with a line icon in a ring (Kava's "Paraben-free · Cruelty-free" strip). */
export function FeatureRow({ items, hue = "coral", className }: FeatureRowProps) {
  return (
    <ul className={[styles.row, styles[hue], className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <li key={item.title} className={styles.item}>
          <span className={styles.ring}>
            <Icon name={item.icon} size="1.6rem" />
          </span>
          <span className={styles.title}>{item.title}</span>
          {item.text && <span className={styles.text}>{item.text}</span>}
        </li>
      ))}
    </ul>
  );
}

export interface CheckListProps {
  items: ReactNode[];
  className?: string;
}

/** Short benefits with filled check marks (Thynk Natural product rows). */
export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={[styles.checks, className].filter(Boolean).join(" ")}>
      {items.map((item, i) => (
        <li key={i}>
          <span className={styles.tick} aria-hidden="true">
            <Icon name="check" size="0.9rem" style={{ strokeWidth: 2.4 }} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
