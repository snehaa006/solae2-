import type { SVGProps } from "react";
import { PRIMARY, SUN, WORDMARK } from "./paths";
import styles from "./Logo.module.css";

export type LogoVariant = "primary" | "horizontal" | "sun" | "wordmark";
export type LogoTone = "ink" | "lagoon" | "coral" | "sunshine" | "paper" | "current";

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /**
   * primary: sun above the name (the primary and stacked logo).
   * horizontal: sun beside the name, for headers.
   * sun: the submark on its own (icon, favicon, swimsuit label).
   * wordmark: the name on its own.
   */
  variant?: LogoVariant;
  /** Logo colour. All five are allowed on the matching backgrounds; see the Logo docs. */
  tone?: LogoTone;
  /** Accessible name. Pass an empty string when the logo sits next to visible text that already says "Solae". */
  title?: string;
}

const toneVar: Record<LogoTone, string> = {
  ink: "var(--text-strong)",
  lagoon: "var(--color-lagoon-500)",
  coral: "var(--color-coral-500)",
  sunshine: "var(--color-sunshine-500)",
  paper: "var(--color-sunshine-50)",
  current: "currentColor",
};

/* The horizontal lockup: the sun at 1.15x the wordmark's height, then a gap. */
const H_SUN_SCALE = (WORDMARK.height * 1.15) / SUN.height;
const H_SUN_W = SUN.width * H_SUN_SCALE;
const H_GAP = 34;
const H_W = H_SUN_W + H_GAP + WORDMARK.width;
const H_H = WORDMARK.height * 1.15;

export function Logo({ variant = "primary", tone = "ink", title = "Solae", className, style, ...rest }: LogoProps) {
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
  const common = {
    ...a11y,
    ...rest,
    className: [styles.logo, styles[variant], className].filter(Boolean).join(" "),
    style: { color: toneVar[tone], ...style },
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (variant === "horizontal") {
    return (
      <svg viewBox={`0 0 ${H_W.toFixed(1)} ${H_H.toFixed(1)}`} {...common}>
        <g transform={`scale(${H_SUN_SCALE.toFixed(4)}) translate(-10 -6)`}>
          <path d={SUN.d} fill="currentColor" fillRule="evenodd" />
        </g>
        <g transform={`translate(${(H_SUN_W + H_GAP - 8).toFixed(1)} ${((H_H - WORDMARK.height) / 2 - 9 + 4).toFixed(1)})`}>
          <path d={WORDMARK.d} fill="currentColor" fillRule="evenodd" />
        </g>
      </svg>
    );
  }

  const art = variant === "sun" ? SUN : variant === "wordmark" ? WORDMARK : PRIMARY;
  return (
    <svg viewBox={art.viewBox} {...common}>
      <path d={art.d} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
