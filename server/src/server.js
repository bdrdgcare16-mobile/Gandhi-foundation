import { createApp } from './app.js';
import { env, configWarnings } from './config/env.js';
import { initDb, closeDb } from './services/db.js';
import { storageMode } from './services/enquiryStore.js';

// Create the table before accepting traffic, so the first enquiry of a fresh
// deployment cannot fail on a missing table.
try {
  const result = await initDb();
  if (result.ready) console.log('[startup] MySQL connected, enquiries table ready.');
} catch (err) {
  console.error('[startup] MySQL is configured but unreachable:', err.message);
  process.exit(1);
}

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`[startup] Gandhi Foundation API listening on http://localhost:${env.port}`);
  console.log(`[startup] environment: ${env.nodeEnv}`);
  console.log(`[startup] allowed origins: ${env.corsOrigins.join(', ') || '(none)'}`);
  console.log(`[startup] enquiry storage: ${storageMode()}`);
  for (const warning of configWarnings()) console.warn(`[startup] ${warning}`);
});

function shutdown(signal) {
  console.log(`[shutdown] ${signal} received, closing server.`);
  server.close(async () => {
    await closeDb().catch(() => {});
    process.exit(0);
  });
  // Don't hang forever on a stuck connection.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));