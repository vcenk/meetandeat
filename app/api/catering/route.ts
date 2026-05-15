/**
 * POST /api/catering
 *
 * Catering inquiry form on /catering. Same dual-email pattern as the
 * reservations endpoint:
 *   1. Manager notification — full request details. Reply-To set to the
 *      customer so the manager can reply directly from Gmail.
 *   2. Customer acknowledgment — "we've got your inquiry, proposal in one
 *      business day." Reply-To set to the manager's inbox.
 *
 * Required env vars:
 *   RESEND_API_KEY              re_… secret from resend.com
 *   CATERING_TO_EMAIL           where the manager notification lands.
 *                               Falls back to RESERVATIONS_TO_EMAIL, then
 *                               to the default below.
 *   RESERVATIONS_FROM_EMAIL     verified sender on the meetandeat.ca domain
 */

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

const MANAGER_EMAIL =
  process.env.CATERING_TO_EMAIL ||
  process.env.RESERVATIONS_TO_EMAIL ||
  "meetandeat.ca@gmail.com";
const FROM_EMAIL =
  process.env.RESERVATIONS_FROM_EMAIL ||
  "Meet and Eat <reservations@meetandeat.ca>";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  event_type?: string;
  guests?: string | number;
  message?: string;
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

  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const date = body.date?.trim();
  const eventType = body.event_type?.trim();
  const guests = body.guests?.toString().trim();
  const message = body.message?.trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please tell us your name and email at minimum." },
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

  const managerSubject = `Catering inquiry · ${name}${eventType ? ` · ${eventType}` : ""}${guests ? ` · ${guests} guests` : ""}`;
  const managerHtml = `
    <div style="font-family:-apple-system,Segoe UI,Inter,sans-serif;line-height:1.55;color:#111;max-width:560px">
      <h2 style="font-size:20px;margin:0 0 16px">New catering inquiry</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 0;width:120px;color:#666">Name</td><td style="padding:6px 0;font-weight:600">${esc(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 0;color:#666">Phone</td><td style="padding:6px 0"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>` : ""}
        ${date ? `<tr><td style="padding:6px 0;color:#666">Event date</td><td style="padding:6px 0">${esc(date)}</td></tr>` : ""}
        ${eventType ? `<tr><td style="padding:6px 0;color:#666">Event type</td><td style="padding:6px 0">${esc(eventType)}</td></tr>` : ""}
        ${guests ? `<tr><td style="padding:6px 0;color:#666">Guests</td><td style="padding:6px 0">${esc(guests)}</td></tr>` : ""}
        ${message ? `<tr><td style="padding:6px 0;color:#666;vertical-align:top">Notes</td><td style="padding:6px 0;white-space:pre-wrap">${esc(message)}</td></tr>` : ""}
      </table>
      <p style="margin:24px 0 8px;color:#666;font-size:13px">Hit reply to message ${esc(name)} directly — Reply-To is set to ${esc(email)}.</p>
      <p style="margin:0;color:#666;font-size:13px">A confirmation email has already gone out to the customer letting them know we received the inquiry.</p>
    </div>
  `;
  const managerText = [
    "New catering inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    date ? `Event date: ${date}` : null,
    eventType ? `Event type: ${eventType}` : null,
    guests ? `Guests: ${guests}` : null,
    message ? `Notes: ${message}` : null,
    "",
    "Hit reply to message the customer directly.",
  ]
    .filter(Boolean)
    .join("\n");

  const customerSubject = `We got your catering inquiry — Meet and Eat`;
  const logoUrl = `${siteConfig.url}/images/logo/logo.png`;
  const customerHtml = `
    <div style="font-family:-apple-system,Segoe UI,Inter,sans-serif;line-height:1.55;color:#111;max-width:560px">
      <img src="${logoUrl}" alt="Meet and Eat" width="80" height="80" style="display:block;width:80px;height:auto;margin:0 0 24px" />
      <h2 style="font-size:24px;margin:0 0 16px;color:#0c1f3f">Thanks, ${esc(name)} — we&rsquo;ve got your inquiry.</h2>
      <p style="margin:0 0 16px">We&rsquo;ll send a custom proposal within one business day. If you have a hard deadline or anything urgent, reply to this email or call us at <a href="tel:${esc(siteConfig.phone)}" style="color:#0c1f3f">${esc(siteConfig.phoneDisplay)}</a>.</p>

      ${
        date || eventType || guests || message
          ? `
      <p style="margin:24px 0 8px;font-weight:600">Your inquiry</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border-top:1px solid #e6dcc4">
        ${eventType ? `<tr><td style="padding:8px 0;width:120px;color:#666;border-bottom:1px solid #e6dcc4">Event type</td><td style="padding:8px 0;border-bottom:1px solid #e6dcc4">${esc(eventType)}</td></tr>` : ""}
        ${date ? `<tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #e6dcc4">Date</td><td style="padding:8px 0;border-bottom:1px solid #e6dcc4">${esc(date)}</td></tr>` : ""}
        ${guests ? `<tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #e6dcc4">Guests</td><td style="padding:8px 0;border-bottom:1px solid #e6dcc4">${esc(guests)}</td></tr>` : ""}
        ${message ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Notes</td><td style="padding:8px 0;white-space:pre-wrap">${esc(message)}</td></tr>` : ""}
      </table>
      `
          : ""
      }

      <p style="margin:28px 0 0;color:#666;font-size:13px">— The Meet and Eat team<br/>3663 East Hastings, Vancouver, BC</p>
    </div>
  `;
  const customerText = [
    `Thanks, ${name} — we've got your inquiry.`,
    "",
    "We'll send a custom proposal within one business day.",
    `If you have a hard deadline or anything urgent, reply to this email or call us at ${siteConfig.phoneDisplay}.`,
    eventType || date || guests || message ? "" : null,
    eventType || date || guests || message ? "Your inquiry:" : null,
    eventType ? `  Event type: ${eventType}` : null,
    date ? `  Date: ${date}` : null,
    guests ? `  Guests: ${guests}` : null,
    message ? `  Notes: ${message}` : null,
    "",
    "— The Meet and Eat team",
    "3663 East Hastings, Vancouver, BC",
  ]
    .filter((line) => line !== null)
    .join("\n");

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
    console.error("[catering] manager email failed:", managerResult.error);
    return NextResponse.json(
      { error: "We couldn't send your inquiry. Please try again or call us." },
      { status: 502 },
    );
  }

  if (customerResult && "error" in customerResult && customerResult.error) {
    console.error(
      "[catering] customer confirmation failed:",
      customerResult.error,
    );
  }

  return NextResponse.json({ ok: true });
}
