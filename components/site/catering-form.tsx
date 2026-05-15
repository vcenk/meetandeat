"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/site-config";

const eventTypes = [
  "Corporate / office",
  "Birthday",
  "Wedding",
  "Engagement / shower",
  "Religious holiday",
  "Other private event",
];

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Catering quote-request form. Posts JSON to /api/catering, which forwards
 * to the restaurant + sends a confirmation back to the customer via Resend.
 */
export function CateringForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg(
        `Couldn't reach the server. Check your connection or call us at ${siteConfig.phoneDisplay}.`,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-brand-orange-300/50 bg-brand-orange-50 p-8 sm:p-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
          Inquiry sent
        </p>
        <h3 className="mt-4 font-impact text-3xl uppercase leading-tight tracking-tight text-brand-navy-900 sm:text-4xl">
          Thanks — we&rsquo;ll be in touch.
        </h3>
        <p className="mt-5 text-ink-soft">
          We&rsquo;ll send a custom proposal within one business day. A
          confirmation email is on its way to your inbox. If you have a hard
          deadline, call us at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-medium text-brand-navy-800 underline underline-offset-4 hover:text-brand-orange-500"
          >
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-brand-navy-800 underline underline-offset-4 transition-colors hover:text-brand-orange-500"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-brand-navy-100 bg-cream-soft p-6 sm:p-10"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 opacity-0"
      />

      <AnimatePresence>
        {status === "error" && errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-5 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldText label="Your name" name="name" required autoComplete="name" />
        <FieldText label="Email" name="email" type="email" required autoComplete="email" />
        <FieldText label="Phone" name="phone" type="tel" autoComplete="tel" />
        <FieldText label="Event date" name="date" type="date" />
        <FieldSelect label="Event type" name="event_type" options={eventTypes} />
        <FieldText label="Guest count" name="guests" type="number" />
      </div>

      <div className="mt-5">
        <FieldTextarea
          label="Tell us anything else"
          name="message"
          rows={4}
          placeholder="Venue, dietary needs, time of day, anything we should know."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-navy-800 px-8 text-sm font-medium text-cream transition-colors hover:bg-brand-navy-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          "Send request"
        )}
      </button>

      <p className="mt-4 text-xs text-ink-soft">
        By sending you agree to be contacted about your event. We don&rsquo;t
        share your details.
      </p>
    </form>
  );
}

function FieldText({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-brand-navy-800">
        {label}
        {required && <span className="text-brand-orange-500"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 rounded-full border border-brand-navy-100 bg-cream px-4 text-base text-brand-navy-800 outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand-orange-300 focus:ring-2 focus:ring-brand-orange-200 sm:text-sm"
      />
    </label>
  );
}

function FieldSelect({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-brand-navy-800">{label}</span>
      <select
        name={name}
        className="h-11 rounded-full border border-brand-navy-100 bg-cream px-4 text-base text-brand-navy-800 outline-none transition-colors focus:border-brand-orange-300 focus:ring-2 focus:ring-brand-orange-200 sm:text-sm"
        defaultValue=""
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  rows,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-brand-navy-800">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="rounded-3xl border border-brand-navy-100 bg-cream px-4 py-3 text-base text-brand-navy-800 outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand-orange-300 focus:ring-2 focus:ring-brand-orange-200 sm:text-sm"
      />
    </label>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 animate-spin" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M17 10a7 7 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
