import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { saveEnquiry } from '../services/enquiryStore.js';
import { sendEnquiryMail } from '../services/mailer.js';

// Mirrors the dropdown on the Contact page.
export const TOPICS = [
  'CSR / Institutional Partnership',
  'Volunteer',
  'Program Support',
  'Donation',
  'General Enquiry',
];

// Accepts the ways people actually type a number — "+91 98765 43210",
// "098765-43210", "(98765) 43210" — then requires exactly 10 digits.
// Only an explicit +91/0091 country code or a single leading trunk 0 is
// stripped; a bare leading "91" is kept, since 9198765432 is itself a
// valid 10-digit number.
const phone = z
  .string({ required_error: 'Please enter your phone number.' })
  .trim()
  .min(1, 'Please enter your phone number.')
  .transform(v => v.replace(/[\s\-().]/g, '').replace(/^(?:\+91|0091|0)/, ''))
  .pipe(z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits.'));

export const enquirySchema = z.object({
  name: z.string({ required_error: 'Please enter your name.' })
    .trim()
    .min(2, 'Please enter your name.')
    .max(120),
  organisation: z.string().trim().max(160).optional().default(''),
  email: z.string({ required_error: 'Please enter your email address.' })
    .trim()
    .toLowerCase()
    .min(1, 'Please enter your email address.')
    .email('Please enter a valid email address.')
    .max(160),
  phone,
  topic: z.enum(TOPICS, {
    errorMap: () => ({ message: 'Please choose how you would like to connect.' }),
  }),
  message: z.string().trim().max(4000).optional().default(''),
  // Honeypot: a hidden field real people never fill in. Bots fill everything.
  website: z.string().max(0, 'Rejected.').optional().default(''),
});

export async function createEnquiry(req, res) {
  const { website, ...data } = req.body;

  const enquiry = {
    id: randomUUID(),
    ...data,
    receivedAt: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.get('user-agent') || '',
  };

  // Store first, then email. If the mail server is down the enquiry is still
  // captured rather than lost, and the visitor still gets a success response.
  await saveEnquiry(enquiry);

  let delivered = false;
  try {
    const result = await sendEnquiryMail(enquiry);
    delivered = result.sent;
  } catch (err) {
    console.error('[mail] delivery failed for enquiry', enquiry.id, err.message);
  }

  res.status(201).json({
    ok: true,
    id: enquiry.id,
    delivered,
    message: 'Thank you. Your enquiry has been received and someone will be in touch.',
  });
}