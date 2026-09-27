/**
 * Cloudflare Pages Function: POST /api/lead
 *
 * Receives consultation requests from the site forms and emails them on via
 * the Resend API. Configure these in the Pages project (Settings → Environment
 * variables) — store RESEND_API_KEY as an encrypted secret:
 *
 *   RESEND_API_KEY   Resend API key
 *   LEAD_TO          where enquiries should land, e.g. info@mahastarmedicalbilling.llc
 *   LEAD_FROM        a verified sender on your domain, e.g. website@mahastarmedicalbilling.llc
 *
 * Without RESEND_API_KEY the endpoint still accepts and logs submissions so the
 * site works before email is wired up. Swap in another provider by replacing
 * deliver() — nothing else depends on Resend.
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

function validate(data) {
  const errors = [];
  if (!data.name) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.push('email');
  if (data.phone.replace(/\D/g, '').length < 10) errors.push('phone');
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

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.LEAD_FROM || 'website@mahastarmedicalbilling.llc',
      to: [env.LEAD_TO || 'info@mahastarmedicalbilling.llc'],
      reply_to: data.email,
      subject: `Consultation request — ${data.name}${data.practice ? ` (${data.practice})` : ''}`,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Email provider returned ${res.status}`);
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

  const errors = validate(data);
  if (errors.length) return json(422, { error: 'Invalid fields', fields: errors });

  const meta = {
    at: new Date().toISOString(),
    country: request.headers.get('cf-ipcountry') || 'unknown',
  };

  if (!env.RESEND_API_KEY) {
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
