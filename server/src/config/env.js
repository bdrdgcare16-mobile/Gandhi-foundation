import 'dotenv/config';

function bool(value, fallback = false) {
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),

  // Comma-separated list of origins allowed to call the API.
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean),

  // Serve the built React app from this same process (single-service deploys).
  serveClient: bool(process.env.SERVE_CLIENT, false),
  clientDir: process.env.CLIENT_DIR || '../gandhi-foundation-react/dist',

  mail: {
    // Without SMTP_HOST the app still accepts enquiries — it stores them
    // instead of emailing, so the form never fails because mail is misconfigured.
    enabled: Boolean(process.env.SMTP_HOST),
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: bool(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM || 'Gandhi Foundation <no-reply@gandhifoundation.org>',
    to: process.env.MAIL_TO || '',
  },
};

export function configWarnings() {
  const problems = [];
  if (env.mail.enabled && !env.mail.to) {
    problems.push('SMTP_HOST is set but MAIL_TO is empty — enquiries would have no recipient.');
  }
  if (!env.mail.enabled) {
    problems.push('SMTP_HOST is not set — enquiries will be stored to disk, not emailed.');
  }
  if (env.nodeEnv === 'production' && env.corsOrigins.some(o => o.includes('localhost'))) {
    problems.push('CORS_ORIGINS still contains localhost in production.');
  }
  return problems;
}
