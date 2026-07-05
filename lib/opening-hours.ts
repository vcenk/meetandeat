/**
 * Reservation time-window validation, derived from siteConfig.openingHours
 * (the single source of truth for hours). Used by:
 *   - app/api/reservations/route.ts        (authoritative server-side check)
 *   - components/site/reservation-form.tsx (instant client-side feedback)
 *
 * A reservation is accepted only when its date + time fall on an open day and
 * within that day's opening window (inclusive of the open and close times).
 */

import { siteConfig } from "@/lib/site-config";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type DayName = (typeof DAY_NAMES)[number];

/** "HH:MM" (24h) → minutes since midnight, or null if malformed. */
function toMinutes(time: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

/** "HH:MM" (24h) → "H:MM AM/PM" for human-readable messages. */
function toDisplay(time: string): string {
  const mins = toMinutes(time);
  if (mins === null) return time;
  const h24 = Math.floor(mins / 60);
  const min = mins % 60;
  const period = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${period}`;
}

/**
 * Day-of-week for a "YYYY-MM-DD" date string, parsed in UTC so the result
 * never shifts with the server's timezone. Returns null if unparseable.
 */
export function dayNameFromISODate(date: string): DayName | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  return DAY_NAMES[dow] ?? null;
}

/** Opening window for a given day, or null if the restaurant is closed. */
export function hoursForDay(
  day: DayName,
): { opens: string; closes: string } | null {
  for (const slot of siteConfig.openingHours) {
    if ((slot.days as readonly string[]).includes(day)) {
      return { opens: slot.opens, closes: slot.closes };
    }
  }
  return null;
}

export type ReservationTimeCheck = {
  ok: boolean;
  /** User-facing explanation when ok === false. */
  message?: string;
};

/**
 * Validates a requested reservation date + time against opening hours.
 * Malformed inputs are treated as invalid so the caller surfaces a clear
 * error rather than silently accepting garbage.
 */
export function checkReservationTime(
  date: string,
  time: string,
): ReservationTimeCheck {
  const day = dayNameFromISODate(date);
  if (!day) {
    return { ok: false, message: "Please choose a valid date." };
  }

  const mins = toMinutes(time);
  if (mins === null) {
    return { ok: false, message: "Please choose a valid time." };
  }

  const hours = hoursForDay(day);
  if (!hours) {
    return {
      ok: false,
      message: `We're closed on ${day}s. Please pick another day.`,
    };
  }

  const opens = toMinutes(hours.opens);
  const closes = toMinutes(hours.closes);
  if (opens === null || closes === null) {
    // Config is malformed — fail open on the message but block the booking.
    return { ok: false, message: "Please pick a time within our hours." };
  }

  if (mins < opens || mins > closes) {
    return {
      ok: false,
      message: `${day} reservations are available between ${toDisplay(
        hours.opens,
      )} and ${toDisplay(hours.closes)}. Please pick a time within our hours.`,
    };
  }

  return { ok: true };
}
