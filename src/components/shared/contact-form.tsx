"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "sending" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

function validate(values: { name: string; email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

const inputClasses =
  "w-full rounded-md border border-border-default bg-surface px-4 py-3 text-[15.5px] text-primary transition-colors duration-150 placeholder:text-muted/70 focus:border-accent focus:outline-none";

/**
 * Contact form — Phase 8 §37 state language.
 * Operator voice only: WORKING… / ✓ SENT / precise recovery paths. No "Oops."
 */
export function ContactForm(): React.ReactElement {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const setField = (field: keyof typeof values, value: string): void => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const fieldErrors = validate(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Send a message">
      <div className="space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block font-mono text-xs tracking-wider text-muted uppercase"
          >
            NAME
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClasses}
          />
          {errors.name ? (
            <p id="contact-name-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm">
              <span aria-hidden>⚠</span>
              <span className="text-danger">{errors.name}</span>
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block font-mono text-xs tracking-wider text-muted uppercase"
          >
            EMAIL
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClasses}
          />
          {errors.email ? (
            <p id="contact-email-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm">
              <span aria-hidden>⚠</span>
              <span className="text-danger">{errors.email}</span>
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block font-mono text-xs tracking-wider text-muted uppercase"
          >
            MESSAGE
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${inputClasses} resize-y`}
          />
          {errors.message ? (
            <p id="contact-message-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm">
              <span aria-hidden>⚠</span>
              <span className="text-danger">{errors.message}</span>
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="pressable mt-7 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-md bg-primary px-6 font-mono text-xs font-medium tracking-wider text-bg hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "WORKING…" : "SEND MESSAGE →"}
      </button>

      <div aria-live="polite" className="min-h-12 mt-4">
        {status === "success" ? (
          <p className="state-in flex items-start gap-2 text-sm text-secondary">
            <span aria-hidden className="text-live">✓</span>
            <span>
              SENT. I read every message and reply personally.
              <br />
              For anything urgent, use{" "}
              <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4 hover:text-primary">
                EMAIL →
              </a>{" "}
              directly.
            </span>
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="state-in flex items-start gap-2 text-sm text-secondary">
            <span aria-hidden className="text-danger">⚠</span>
            <span>
              MESSAGE NOT SENT. Check your connection and try again, or use EMAIL →
              directly.
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
}
