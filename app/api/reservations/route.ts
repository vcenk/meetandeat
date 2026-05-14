/**
 * POST /api/reservations
 *
 * Receives JSON from the /reservations form, validates the inputs, traps
 * bots via the `website` honeypot, and sends a notification email to the
 * restaurant via Resend. The customer's email becomes the Reply-To, so
 * the restaurant can hit reply and the message goes straight back to them.
 *
 * Required env vars (set in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY            re_… secret from resend.com
 *   RESERVATIONS_TO_EMAIL     where the request should land (default below)
 *   RESERVATIONS_FROM_EMAIL   verified sender on the meetandeat.ca domain
 */

import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO_EMAIL =
  process.env.RESERVATIONS_TO_EMAIL || "info@meetandeat.ca";
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

  // Honeypot: bots fill the `website` field — return success so they think
  // it worked, but don't actually send anything.
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

  // Basic email shape check — server-side belt to go with the HTML5 suspenders.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const subject = `Reservation request · ${name} · ${date} ${time} · ${partySize} guests`;
  const html = `
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
      <p style="margin:24px 0 0;color:#666;font-size:13px">Hit reply to message ${esc(name)} directly — Reply-To is set to ${esc(email)}.</p>
    </div>
  `;
  const text = [
    "New reservation request",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Party: ${partySize} guests`,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[reservations] resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your request. Please try again or call us." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reservations] threw:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us." },
      { status: 500 },
    );
  }
}
