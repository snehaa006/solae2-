import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { FontStep } from "../../tokens";
import styles from "./Typography.module.css";

const cx = (...c: Array<string | false | undefined | null>) => c.filter(Boolean).join(" ");

type Polymorphic<E extends ElementType, P> = P & { as?: E } & Omit<ComponentPropsWithoutRef<E>, keyof P | "as">;

export type HeadingProps<E extends ElementType = "h2"> = Polymorphic<
  E,
  {
    /** Fluid type step from the scale (-2 to 7). Defaults to 5. */
    size?: FontStep;
    /** display: Fraunces (default). sans: Jost, for compact UI headings. */
    font?: "display" | "sans";
    align?: "start" | "center" | "end";
    /** Text colour role. */
    tone?: "strong" | "inverse" | "accent" | "sun" | "inherit";
    children?: ReactNode;
  }
>;

/**
 * Headings in Fraunces. Wrap one word in <em> for the italic accent
 * ("how we're <em>different</em>"); keep it to one per heading.
 */
export function Heading<E extends ElementType = "h2">({ as, size = "5", font = "display", align, tone = "strong", className, style, ...rest }: HeadingProps<E>) {
  const Tag: ElementType = as ?? "h2";
  return (
    <Tag
      className={cx(styles.heading, styles[font], styles[`tone-${tone}`], align && styles[`align-${align}`], className)}
      style={{ fontSize: `var(--step-${size})`, ...style }}
      {...rest}
    />
  );
}

export type TextProps<E extends ElementType = "p"> = Polymorphic<
  E,
  {
    size?: FontStep;
    tone?: "body" | "muted" | "strong" | "inverse" | "inherit";
    align?: "start" | "center" | "end";
    /** Limit the line length to a comfortable measure. */
    measure?: boolean;
    children?: ReactNode;
  }
>;

export function Text<E extends ElementType = "p">({ as, size = "0", tone = "body", align, measure, className, style, ...rest }: TextProps<E>) {
  const Tag: ElementType = as ?? "p";
  return (
    <Tag
      className={cx(styles.text, styles[`text-${tone}`], align && styles[`align-${align}`], measure && styles.measure, className)}
      style={{ fontSize: `var(--step-${size})`, ...style }}
      {...rest}
    />
  );
}

export interface EyebrowProps extends ComponentPropsWithoutRef<"p"> {
  /** Adds a short rule before the label. */
  rule?: boolean;
  tone?: "accent" | "muted" | "inverse" | "inherit";
}

/** Small spaced capitals that sit above a heading, as in the Brand Starter. */
export function Eyebrow({ rule, tone = "accent", className, children, ...rest }: EyebrowProps) {
  return (
    <p className={cx(styles.eyebrow, styles[`eyebrow-${tone}`], rule && styles.rule, className)} {...rest}>
      {children}
    </p>
  );
}

export interface HandProps extends ComponentPropsWithoutRef<"span"> {
  /** Lay a strip of coloured tape behind the words (the Seaborn thank-you card). */
  tape?: "lagoon" | "coral" | "sunshine";
  rotate?: number;
}

/** Handwritten notes and signatures. Use for a few words at a time. */
export function Hand({ tape, rotate = 0, className, style, ...rest }: HandProps) {
  return (
    <span
      className={cx(styles.hand, tape && styles.tape, tape && styles[`tape-${tape}`], className)}
      style={{ rotate: rotate ? `${rotate}deg` : undefined, ...style }}
      {...rest}
    />
  );
}
