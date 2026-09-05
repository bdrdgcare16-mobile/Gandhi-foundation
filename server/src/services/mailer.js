import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transport = null;

function getTransport() {
  if (!env.mail.enabled) return null;
  if (!transport) {
    transport = nodemailer.createTransport({
      host: env.mail.host,
      port: env.mail.port,
      secure: env.mail.secure,
      auth: env.mail.user ? { user: env.mail.user, pass: env.mail.pass } : undefined,
    });
  }
  return transport;
}

const escape = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function sendEnquiryMail(enquiry) {
  const tx = getTransport();
  if (!tx) return { sent: false, reason: 'mail-disabled' };

  const rows = [
    ['Name', enquiry.name],
    ['Organisation', enquiry.organisation || '—'],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone || '—'],
    ['Topic', enquiry.topic],
    ['Received', new Date(enquiry.receivedAt).toLocaleString('en-IN')],
  ];

  await tx.sendMail({
    from: env.mail.from,
    to: env.mail.to,
    // Lets staff hit Reply and reach the enquirer directly, while the
    // envelope sender stays on our own verified domain.
    replyTo: `${enquiry.name} <${enquiry.email}>`,
    subject: `Website enquiry — ${enquiry.topic} — ${enquiry.name}`,
    text:
      rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
      `\n\nMessage:\n${enquiry.message || '(none)'}\n`,
    html:
      `<table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`)
        .join('')}</table>` +
      `<p><strong>Message</strong></p><p>${escape(enquiry.message || '(none)').replace(/\n/g, '<br>')}</p>`,
  });

  return { sent: true };
}

export async function verifyMail() {
  const tx = getTransport();
  if (!tx) return { ok: false, reason: 'mail-disabled' };
  await tx.verify();
  return { ok: true };
}
