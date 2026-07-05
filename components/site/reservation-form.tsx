"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { checkReservationTime } from "@/lib/opening-hours";

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20];

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Client-side reservation form. Posts JSON to /api/reservations, which
 * forwards to the restaurant via Resend. Honeypot field traps bots.
 */
export function ReservationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Block out-of-hours requests before hitting the network; the API
    // re-checks this server-side as the authoritative guard.
    const timeCheck = checkReservationTime(
      String(data.date ?? ""),
      String(data.time ?? ""),
    );
    if (!timeCheck.ok) {
      setErrorMsg(
        timeCheck.message ?? "Please pick a time within our opening hours.",
      );
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/reservations", {
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
        "Couldn't reach the server. Check your connection or call us at " +
          siteConfig.phoneDisplay +
          ".",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 rounded-3xl border border-brand-orange-300/40 bg-brand-orange-400/10 p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-300">
          Request sent
        </p>
        <h3 className="mt-4 font-impact text-3xl uppercase leading-tight tracking-tight text-cream sm:text-4xl">
          See you soon.
        </h3>
        <p className="mt-5 text-cream/75">
          We&rsquo;ve received your reservation request — a confirmation
          email is on its way to your inbox. A team member will follow up
          by phone or email within an hour during open hours. If you
          don&rsquo;t hear back, call us at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-brand-orange-300 underline underline-offset-4 hover:text-brand-orange-200"
          >
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-brand-orange-300 underline underline-offset-4 transition-colors hover:text-brand-orange-200"
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-8">
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
            className="rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <Field id="name" label="Full name" type="text" autoComplete="name" required />

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="phone" label="Phone" type="tel" autoComplete="tel" required />
        <Field id="email" label="Email" type="email" autoComplete="email" required />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="date" label="Date" type="date" required />
        <Field id="time" label="Time" type="time" required />
      </div>

      <div>
        <label
          htmlFor="partySize"
          className="block text-xs font-semibold uppercase tracking-[0.25em] text-cream/55"
        >
          Party size
        </label>
        <select
          id="partySize"
          name="partySize"
          defaultValue="2"
          required
          className="mt-2 block w-full appearance-none border-b border-cream/20 bg-transparent px-0 py-3 text-lg text-cream outline-none transition-colors focus:border-brand-orange-400"
        >
          {partySizes.map((n) => (
            <option key={n} value={n} className="bg-brand-navy-900 text-cream">
              {n === 1 ? "1 guest" : `${n} guests`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-xs font-semibold uppercase tracking-[0.25em] text-cream/55"
        >
          Special requests <span className="text-cream/35">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Highchair, dietary needs, occasion…"
          className="mt-2 block w-full resize-none border-b border-cream/20 bg-transparent px-0 py-3 text-lg text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-brand-orange-400"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-brand-orange-400 px-8 text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy-900 transition-all hover:bg-brand-orange-300 hover:shadow-lg hover:shadow-brand-orange-400/30 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[18rem]"
      >
        {status === "submitting" ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          <>
            Request reservation <span aria-hidden>→</span>
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-cream/55">
        We&rsquo;ll confirm by phone, email, or WhatsApp within an hour
        during open hours. Prefer to chat?{" "}
        <a
          href={`tel:${siteConfig.phone}`}
          className="text-brand-orange-300 transition-colors hover:text-brand-orange-200"
        >
          Call {siteConfig.phoneDisplay}
        </a>{" "}
        or{" "}
        <a
          href={`https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
            "Hi! I'd like to make a reservation at Meet and Eat.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-orange-300 transition-colors hover:text-brand-orange-200"
        >
          message on WhatsApp
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type,
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-[0.25em] text-cream/55"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 block w-full border-b border-cream/20 bg-transparent px-0 py-3 text-lg text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-brand-orange-400 [color-scheme:dark]"
      />
    </div>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 animate-spin"
      aria-hidden
    >
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M17 10a7 7 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
