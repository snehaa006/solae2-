import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Tag.module.css";

export interface TagProps extends Omit<ComponentPropsWithoutRef<"span">, "onClick"> {
  /** outline: the Thynk "NATURAL" pill. soft/solid: filled with a brand hue. */
  variant?: "outline" | "soft" | "solid";
  hue?: "lagoon" | "coral" | "sunshine" | "ink";
  size?: "sm" | "md";
  /** When set, the tag renders as a toggle button (filters, chips). */
  onClick?: () => void;
  pressed?: boolean;
  children?: ReactNode;
}

export function Tag({ variant = "outline", hue = "ink", size = "md", onClick, pressed, className, children, ...rest }: TagProps) {
  const cls = [styles.tag, styles[variant], styles[hue], styles[size], onClick && styles.interactive, className].filter(Boolean).join(" ");
  if (onClick) {
    return (
      <button type="button" className={cls} aria-pressed={pressed} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
