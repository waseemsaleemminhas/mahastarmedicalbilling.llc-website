/**
 * Cloudflare Pages Function: POST /api/lead
 *
 * Receives consultation requests from the site forms and emails them on.
 *
 * Two providers are supported; whichever key is set is the one used. Set them
 * in the Pages project (Settings → Environment variables), with the API key
 * stored as an encrypted secret:
 *
 *   BREVO_API_KEY    Brevo (api.brevo.com) — checked first
 *   RESEND_API_KEY   Resend (api.resend.com) — used if no Brevo key
 *   LEAD_TO          where enquiries land, e.g. info@mahastarmedicalbilling.llc
 *   LEAD_FROM        a verified sender on your domain, e.g. website@mahastarmedicalbilling.llc
 *
 * With neither key set the endpoint still accepts and logs submissions, so the
 * site works before email is wired up — but nothing reaches an inbox. To add a
 * different provider, add a branch to deliver(); nothing else depends on which
 * one is in use.
 */

const MAX_BODY_BYTES = 8_000;
const FIELDS = ['name', 'email', 'phone', 'practice', 'specialty', 'challenges', 'message', 'page'];

const json = (status, data) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const clean = (value, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Email is always required. Name and phone are required only when the form
// actually asked for them — the "couldn't find your specialty" form collects an
// email alone, and rejecting it for a missing phone number would be wrong.
function validate(data, submitted) {
  const errors = [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.push('email');
  if (submitted.has('name') && !data.name) errors.push('name');
  if (submitted.has('phone') && data.phone.replace(/\D/g, '').length < 10) errors.push('phone');
  return errors;
}

async function deliver(env, data, meta) {
  const rows = FIELDS.filter((f) => data[f]).map(
    (f) => `<tr><td style="padding:6px 14px 6px 0;color:#6b7587">${f}</td>` +
           `<td style="padding:6px 0"><strong>${escapeHtml(data[f])}</strong></td></tr>`
  ).join('');

  const html =
    `<h2 style="font-family:system-ui">New consultation request</h2>` +
    `<table style="font-family:system-ui;font-size:14px;border-collapse:collapse">${rows}</table>` +
    `<p style="font-family:system-ui;font-size:12px;color:#6b7587">Received ${meta.at} · ${escapeHtml(meta.country)}</p>`;

  const from = env.LEAD_FROM || 'website@mahastarmedicalbilling.llc';
  const to = env.LEAD_TO || 'info@mahastarmedicalbilling.llc';
  // An email-only enquiry has no name, so fall back to the address itself.
  const who = data.name || data.email;
  const subject = `Consultation request — ${who}${data.practice ? ` (${data.practice})` : ''}`;

  const res = env.BREVO_API_KEY
    ? await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sender: { email: from, name: 'Mahastar Website' },
          to: [{ email: to }],
          replyTo: { email: data.email },
          subject,
          htmlContent: html,
        }),
      })
    : await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, html }),
      });

  if (!res.ok) {
    // The body usually says why (unverified sender, bad key); keep it in the
    // log so the cause is visible without reproducing the failure.
    const detail = await res.text().catch(() => '');
    throw new Error(`Email provider returned ${res.status} ${detail.slice(0, 300)}`);
  }
}

export async function onRequestPost({ request, env }) {
  const type = request.headers.get('content-type') || '';
  let raw;

  try {
    if (type.includes('application/json')) {
      const text = await request.text();
      if (text.length > MAX_BODY_BYTES) return json(413, { error: 'Payload too large' });
      raw = JSON.parse(text);
    } else {
      raw = Object.fromEntries(await request.formData());
    }
  } catch {
    return json(400, { error: 'Malformed request body' });
  }

  // Honeypot: real users never fill this hidden input. Accept silently so bots
  // do not learn they were caught.
  if (clean(raw.company_website)) return json(200, { ok: true });

  const data = Object.fromEntries(
    FIELDS.map((f) => [f, clean(raw[f], f === 'message' || f === 'challenges' ? 2000 : 200)])
  );

  const errors = validate(data, new Set(Object.keys(raw)));
  if (errors.length) return json(422, { error: 'Invalid fields', fields: errors });

  const meta = {
    at: new Date().toISOString(),
    country: request.headers.get('cf-ipcountry') || 'unknown',
  };

  if (!env.BREVO_API_KEY && !env.RESEND_API_KEY) {
    // Email is not configured yet; keep the submission in the logs so nothing
    // is silently dropped while the site is being set up.
    console.log('LEAD (email not configured)', JSON.stringify({ ...data, ...meta }));
    return json(200, { ok: true, delivered: false });
  }

  try {
    await deliver(env, data, meta);
  } catch (err) {
    console.error('Lead delivery failed', err);
    return json(502, { error: 'Could not send message' });
  }

  return json(200, { ok: true, delivered: true });
}

// A bare GET to the endpoint is not an error worth a stack trace, but it is not
// allowed either. (Exporting `onRequest` here would override onRequestPost.)
export const onRequestGet = () => json(405, { error: 'Method not allowed' });
