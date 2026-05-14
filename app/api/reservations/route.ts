/**
 * POST /api/reservations
 *
 * Receives JSON from the /reservations form, validates the inputs, traps
 * bots via the `website` honeypot, and sends TWO emails via Resend:
 *
 *   1. Manager notification — full reservation details to the restaurant
 *      (Reply-To set to the customer, so the manager can hit reply and
 *      message the customer directly from their inbox).
 *
 *   2. Customer acknowledgment — friendly "we received your request" note
 *      back to the customer (Reply-To set to the manager's inbox, so any
 *      customer replies route to the restaurant).
 *
 * The manager email is critical: if it fails the whole request fails so the
 * customer knows to call instead. The customer email is best-effort: if it
 * fails we still return success, because the restaurant has what it needs.
 *
 * Required env vars (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY            re_… secret from resend.com
 *   RESERVATIONS_TO_EMAIL     where the manager notification lands
 *                             (e.g. meetandeat.ca@gmail.com)
 *   RESERVATIONS_FROM_EMAIL   verified sender on the meetandeat.ca domain
 *                             (e.g. "Meet and Eat <reservations@meetandeat.ca>")
 */

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

const MANAGER_EMAIL =
  process.env.RESERVATIONS_TO_EMAIL || "meetandeat.ca@gmail.com";
const FROM_EMAIL =
  process.env.RESERVATIONS_FROM_EMAIL ||
  "Meet and Eat <reservations@meetandeat.ca>";

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  partySize?: string | number;
  notes?: string;
  /** Honeypot — bots fill this; real users never see it. */
  website?: string;
};

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot — pretend it worked, but send nothing.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const date = body.date?.trim();
  const time = body.time?.trim();
  const partySize = body.partySize?.toString().trim();
  const notes = body.notes?.trim();

  if (!name || !phone || !email || !date || !time || !partySize) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // -------------------------------------------------------------------------
  // 1. Manager notification email
  // -------------------------------------------------------------------------
  const managerSubject = `Reservation request · ${name} · ${date} ${time} · ${partySize} guests`;
  const managerHtml = `
    <div style="font-family:-apple-system,Segoe UI,Inter,sans-serif;line-height:1.55;color:#111;max-width:560px">
      <h2 style="font-size:20px;margin:0 0 16px">New reservation request</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 0;width:120px;color:#666">Name</td><td style="padding:6px 0;font-weight:600">${esc(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Phone</td><td style="padding:6px 0"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#666">Date</td><td style="padding:6px 0">${esc(date)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Time</td><td style="padding:6px 0">${esc(time)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Party</td><td style="padding:6px 0">${esc(partySize)} guests</td></tr>
        ${notes ? `<tr><td style="padding:6px 0;color:#666;vertical-align:top">Notes</td><td style="padding:6px 0;white-space:pre-wrap">${esc(notes)}</td></tr>` : ""}
      </table>
      <p style="margin:24px 0 8px;color:#666;font-size:13px">Hit reply to message ${esc(name)} directly — Reply-To is set to ${esc(email)}.</p>
      <p style="margin:0;color:#666;font-size:13px">A confirmation email has already gone out to the customer letting them know we received their request.</p>
    </div>
  `;
  const managerText = [
    "New reservation request",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Party: ${partySize} guests`,
    notes ? `Notes: ${notes}` : null,
    "",
    "Hit reply to message the customer directly.",
  ]
    .filter(Boolean)
    .join("\n");

  // -------------------------------------------------------------------------
  // 2. Customer acknowledgment email
  // -------------------------------------------------------------------------
  const customerSubject = `We received your reservation request — Meet and Eat`;
  const customerHtml = `
    <div style="font-family:-apple-system,Segoe UI,Inter,sans-serif;line-height:1.55;color:#111;max-width:560px">
      <p style="font-size:14px;color:#e08612;text-transform:uppercase;letter-spacing:0.2em;margin:0 0 12px">Meet and Eat</p>
      <h2 style="font-size:24px;margin:0 0 16px;color:#0c1f3f">Thanks, ${esc(name)} — we&rsquo;ve got your request.</h2>
      <p style="margin:0 0 16px">A team member will confirm availability and get back to you by phone or email within an hour during open hours.</p>

      <p style="margin:24px 0 8px;font-weight:600">Your request</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border-top:1px solid #e6dcc4">
        <tr><td style="padding:8px 0;width:100px;color:#666;border-bottom:1px solid #e6dcc4">Date</td><td style="padding:8px 0;border-bottom:1px solid #e6dcc4">${esc(date)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #e6dcc4">Time</td><td style="padding:8px 0;border-bottom:1px solid #e6dcc4">${esc(time)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #e6dcc4">Party</td><td style="padding:8px 0;border-bottom:1px solid #e6dcc4">${esc(partySize)} guests</td></tr>
        ${notes ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Notes</td><td style="padding:8px 0;white-space:pre-wrap">${esc(notes)}</td></tr>` : ""}
      </table>

      <p style="margin:28px 0 16px">If you need to change or cancel, just reply to this email or call us at <a href="tel:${esc(siteConfig.phone)}" style="color:#0c1f3f">${esc(siteConfig.phoneDisplay)}</a>.</p>

      <p style="margin:0;color:#666;font-size:13px">— The Meet and Eat team<br/>3663 East Hastings, Vancouver, BC</p>
    </div>
  `;
  const customerText = [
    `Thanks, ${name} — we've got your request.`,
    "",
    "A team member will confirm availability and get back to you by phone or email within an hour during open hours.",
    "",
    "Your request:",
    `  Date: ${date}`,
    `  Time: ${time}`,
    `  Party: ${partySize} guests`,
    notes ? `  Notes: ${notes}` : null,
    "",
    `If you need to change or cancel, reply to this email or call us at ${siteConfig.phoneDisplay}.`,
    "",
    "— The Meet and Eat team",
    "3663 East Hastings, Vancouver, BC",
  ]
    .filter(Boolean)
    .join("\n");

  // -------------------------------------------------------------------------
  // Send both in parallel. Manager email is critical; customer is best-effort.
  // -------------------------------------------------------------------------
  const [managerResult, customerResult] = await Promise.all([
    resend.emails
      .send({
        from: FROM_EMAIL,
        to: [MANAGER_EMAIL],
        replyTo: email,
        subject: managerSubject,
        html: managerHtml,
        text: managerText,
      })
      .catch((err: unknown) => ({ error: err })),
    resend.emails
      .send({
        from: FROM_EMAIL,
        to: [email],
        replyTo: MANAGER_EMAIL,
        subject: customerSubject,
        html: customerHtml,
        text: customerText,
      })
      .catch((err: unknown) => ({ error: err })),
  ]);

  if (managerResult && "error" in managerResult && managerResult.error) {
    console.error("[reservations] manager email failed:", managerResult.error);
    return NextResponse.json(
      { error: "We couldn't send your request. Please try again or call us." },
      { status: 502 },
    );
  }

  if (customerResult && "error" in customerResult && customerResult.error) {
    // Restaurant has the info — log this but still return success.
    console.error(
      "[reservations] customer confirmation failed:",
      customerResult.error,
    );
  }

  return NextResponse.json({ ok: true });
}
