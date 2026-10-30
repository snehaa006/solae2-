import { useId, type ReactNode } from "react";
import styles from "./OptionGroup.module.css";

export interface Option {
  value: string;
  label: string;
  /** Swatch colour (swatch variant). */
  hex?: string;
  disabled?: boolean;
}

export interface OptionGroupProps {
  legend: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  /** swatch: colour dots (with the chosen name beside the legend). chip: pills of text (sizes). segmented: a joined toggle. */
  variant?: "swatch" | "chip" | "segmented";
  /** Extra content on the legend row, e.g. a size-guide link. */
  aside?: ReactNode;
  name?: string;
}

/** A single choice from a small set, built on native radio buttons. */
export function OptionGroup({ legend, options, value, onChange, variant = "chip", aside, name }: OptionGroupProps) {
  const auto = useId();
  const groupName = name ?? auto;
  const labelId = `${auto}-label`;
  const current = options.find((o) => o.value === value);
  return (
    <div role="radiogroup" aria-labelledby={labelId} className={[styles.group, styles[`v-${variant}`]].join(" ")}>
      <div className={styles.head}>
        <span className={styles.legend} id={labelId}>
          {legend}
          {variant === "swatch" && current && <span className={styles.current}>{current.label}</span>}
        </span>
        {aside}
      </div>
      <div className={styles.options}>
        {options.map((o) => (
          <label key={o.value} className={styles.option} title={variant === "swatch" ? o.label : undefined}>
            <input
              type="radio"
              name={groupName}
              value={o.value}
              checked={o.value === value}
              disabled={o.disabled}
              onChange={() => onChange(o.value)}
              className={styles.input}
            />
            {variant === "swatch" ? (
              <span className={styles.swatch} style={{ background: o.hex }}>
                <span className="visually-hidden">{o.label}</span>
              </span>
            ) : (
              <span className={styles.chip}>{o.label}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
