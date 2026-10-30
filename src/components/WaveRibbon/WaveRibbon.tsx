import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./WaveRibbon.module.css";

export interface WaveRibbonProps {
  /** The phrase that runs along the ribbon. It repeats to fill the length. */
  text: string;
  tone?: "coral" | "lagoon" | "sunshine";
  /** Speed in viewBox units per second. 0 stands it still. */
  speed?: number;
  /** Mirror the wave top to bottom, so it rises left to right instead. */
  flip?: boolean;
  /** How far the ribbon tips: 0 is nearly flat, 1 is a deep swell. */
  swell?: number;
  className?: string;
  style?: CSSProperties;
}

const W = 1440;
const H = 220;
const SEP = "   ·   ";

/**
 * A soft ribbon of words that drifts along a wave, crossing from one section
 * into the next (Kava's "Newness that will brighten your day", Dollop's
 * "Good things, in glaze" and the gastrobox site's looping tape).
 */
export function WaveRibbon({ text, tone = "coral", speed = 40, flip, swell = 0.6, className, style }: WaveRibbonProps) {
  const id = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [unit, setUnit] = useState(0);
  const [pathLen, setPathLen] = useState(W * 1.2);
  const reduced = usePrefersReducedMotion();

  const a = 70 * swell * (flip ? -1 : 1);
  const mid = H / 2;
  const d = `M-60 ${mid + a} C 260 ${mid - a * 1.6}, 520 ${mid - a * 1.4}, 760 ${mid + a * 0.2} S 1240 ${mid + a * 1.5}, ${W + 60} ${mid - a}`;

  useLayoutEffect(() => {
    if (measureRef.current) setUnit(measureRef.current.getComputedTextLength());
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [text, d]);

  useEffect(() => {
    const el = textPathRef.current;
    if (!el || !unit || !speed || reduced) {
      el?.setAttribute("startOffset", "0");
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const off = -(((now - start) / 1000) * speed) % unit;
      el.setAttribute("startOffset", off.toFixed(2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [unit, speed, reduced]);

  const reps = unit ? Math.ceil(pathLen / unit) + 2 : 8;
  const line = Array.from({ length: reps }, () => text + SEP).join("");

  return (
    <div className={[styles.ribbon, styles[tone], className].filter(Boolean).join(" ")} style={style} role="img" aria-label={text}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <path id={`wave-${id}`} ref={pathRef} d={d} />
        </defs>
        <use href={`#wave-${id}`} className={styles.band} />
        <text className={styles.text} ref={measureRef} visibility="hidden" x="0" y="-100">
          {text + SEP}
        </text>
        <text className={styles.text} dy="0.34em">
          <textPath ref={textPathRef} href={`#wave-${id}`} startOffset="0">
            {line}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
