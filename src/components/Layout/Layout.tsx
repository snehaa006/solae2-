import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import type { SpaceStep } from "../../tokens";
import styles from "./Layout.module.css";

const cx = (...c: Array<string | false | undefined | null>) => c.filter(Boolean).join(" ");

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  /** wide: the full container. narrow: a reading column. bleed: no max width, gutters only. */
  width?: "wide" | "narrow" | "bleed";
}

export function Container({ width = "wide", className, ...rest }: ContainerProps) {
  return <div className={cx(styles.container, styles[width], className)} {...rest} />;
}

export type SectionTone = "canvas" | "surface" | "sunken" | "lagoon" | "lagoonSoft" | "coral" | "coralSoft" | "sunshine" | "sunshineSoft" | "ink";

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  /** Background role. Dark tones switch the text to paper automatically. */
  tone?: SectionTone;
  /** Vertical padding: the fluid section step by default. */
  padding?: "none" | "s" | "m" | "l";
  as?: ElementType;
  children?: ReactNode;
}

/** A full-width band of the page with one background colour. */
export function Section({ tone = "canvas", padding = "l", as, className, ...rest }: SectionProps) {
  const Tag: ElementType = as ?? "section";
  return <Tag className={cx(styles.section, styles[`tone-${tone}`], styles[`pad-${padding}`], className)} {...rest} />;
}

export interface StackProps extends ComponentPropsWithoutRef<"div"> {
  gap?: SpaceStep;
  align?: CSSProperties["alignItems"];
  /** Lay children in a row instead (a cluster that wraps). */
  direction?: "column" | "row";
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
  as?: ElementType;
}

export function Stack({ gap = "s", align, direction = "column", justify, wrap, as, className, style, ...rest }: StackProps) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={cx(styles.stack, className)}
      style={{
        gap: `var(--space-${gap})`,
        flexDirection: direction,
        alignItems: align ?? (direction === "row" ? "center" : undefined),
        justifyContent: justify,
        flexWrap: (wrap ?? direction === "row") ? "wrap" : undefined,
        ...style,
      }}
      {...rest}
    />
  );
}
