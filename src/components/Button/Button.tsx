import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "accent" | "sun" | "inverse" | "link";
export type ButtonSize = "sm" | "md" | "lg";

type OwnProps<E extends ElementType> = {
  /** Render as another element or component, e.g. `a` or a router `Link`. */
  as?: E;
  /**
   * primary: Lagoon fill, the one main action in a view.
   * secondary: outline pill (Thynk "SHOP NOW").
   * accent: Coral fill, for promotions and the add-to-bag moment.
   * sun: Sunshine fill, on dark Lagoon sections.
   * inverse: outline in paper, on dark or photo backgrounds.
   * link: underlined text with an arrow, for quiet "view all" links.
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconStart?: IconName;
  iconEnd?: IconName;
  fullWidth?: boolean;
  children?: ReactNode;
};

export type ButtonProps<E extends ElementType = "button"> = OwnProps<E> & Omit<ComponentPropsWithoutRef<E>, keyof OwnProps<E>>;

export function Button<E extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  iconStart,
  iconEnd,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps<E>) {
  const Tag: ElementType = as ?? "button";
  const isButton = Tag === "button";
  return (
    <Tag
      {...(isButton && !("type" in rest) ? { type: "button" } : null)}
      className={[styles.button, styles[variant], styles[size], fullWidth && styles.full, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {iconStart && <Icon name={iconStart} className={styles.icon} />}
      <span className={styles.label}>{children}</span>
      {iconEnd && <Icon name={iconEnd} className={`${styles.icon} ${styles.iconEnd}`} />}
    </Tag>
  );
}

export interface IconButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  icon: IconName;
  /** Required: icon buttons have no visible text. */
  label: string;
  variant?: "plain" | "outline" | "solid";
  size?: ButtonSize;
  /** Small count bubble, e.g. items in the bag. */
  badge?: number;
}

export function IconButton({ icon, label, variant = "plain", size = "md", badge, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={badge ? `${label} (${badge})` : label}
      className={[styles.iconButton, styles[`ib-${variant}`], styles[`ib-${size}`], className].filter(Boolean).join(" ")}
      {...rest}
    >
      <Icon name={icon} />
      {badge ? (
        <span className={styles.badge} aria-hidden="true">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
