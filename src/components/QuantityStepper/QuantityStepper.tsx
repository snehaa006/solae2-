import { Icon } from "../Icon/Icon";
import styles from "./QuantityStepper.module.css";

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** What is being counted, for screen readers: "Quantity of The Flounce Set". */
  label?: string;
  size?: "sm" | "md";
}

export function QuantityStepper({ value, onChange, min = 1, max = 10, label = "Quantity", size = "md" }: QuantityStepperProps) {
  return (
    <div className={[styles.stepper, styles[size]].join(" ")} role="group" aria-label={label}>
      <button type="button" className={styles.btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease">
        <Icon name="minus" />
      </button>
      <output className={styles.value} aria-live="polite">
        {value}
      </output>
      <button type="button" className={styles.btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase">
        <Icon name="plus" />
      </button>
    </div>
  );
}
