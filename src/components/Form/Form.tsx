import { useId, useState, type ComponentPropsWithoutRef, type FormEvent } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Form.module.css";

export interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  /** Hide the label visually but keep it for screen readers. */
  hideLabel?: boolean;
  hint?: string;
  error?: string;
}

export function TextField({ label, hideLabel, hint, error, id, className, ...rest }: TextFieldProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const describedBy = [hint && `${inputId}-hint`, error && `${inputId}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      <label htmlFor={inputId} className={hideLabel ? "visually-hidden" : styles.label}>
        {label}
      </label>
      <input id={inputId} className={styles.input} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
      {hint && !error && (
        <p id={`${inputId}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export interface NewsletterFormProps {
  /** Called with the email once it looks valid. */
  onSubmit?: (email: string) => void;
  placeholder?: string;
  /** Message shown after a successful sign-up. */
  success?: string;
  tone?: "default" | "inverse";
}

/** A pill email field with an arrow button (Dollop's footer sign-up). */
export function NewsletterForm({ onSubmit, placeholder = "Your email", success = "You're on the list. Check your inbox for 10% off.", tone = "default" }: NewsletterFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    onSubmit?.(email);
    setState("done");
  };

  if (state === "done") {
    return (
      <p className={[styles.done, styles[tone]].join(" ")} role="status">
        <Icon name="check" /> {success}
      </p>
    );
  }

  return (
    <form className={[styles.newsletter, styles[tone]].join(" ")} onSubmit={submit} noValidate>
      <label htmlFor={id} className="visually-hidden">
        Email address
      </label>
      <div className={styles.pill}>
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error" || undefined}
          aria-describedby={state === "error" ? `${id}-err` : undefined}
          className={styles.pillInput}
        />
        <button type="submit" className={styles.go} aria-label="Sign up">
          <Icon name="arrowRight" />
        </button>
      </div>
      {state === "error" && (
        <p id={`${id}-err`} className={styles.error}>
          Please enter an email like name@example.com.
        </p>
      )}
    </form>
  );
}
