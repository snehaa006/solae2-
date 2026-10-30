import { useId, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Accordion.module.css";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Index of an item to start open. */
  defaultOpen?: number;
  /** Let only one item be open at a time. */
  exclusive?: boolean;
  className?: string;
}

/** Product details, FAQs. Built on <details>, so it works without JavaScript and in find-in-page. */
export function Accordion({ items, defaultOpen, exclusive = true, className }: AccordionProps) {
  const id = useId();
  const name = exclusive ? `accordion-${id}` : undefined;
  return (
    <div className={[styles.accordion, className].filter(Boolean).join(" ")}>
      {items.map((item, i) => (
        <details key={item.title} className={styles.item} open={defaultOpen === i} {...(name ? { name } : null)}>
          <summary className={styles.summary}>
            <span>{item.title}</span>
            <Icon name="plus" className={styles.icon} />
          </summary>
          <div className={styles.content}>{item.content}</div>
        </details>
      ))}
    </div>
  );
}
