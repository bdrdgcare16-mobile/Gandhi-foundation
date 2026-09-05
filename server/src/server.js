import { createApp } from './app.js';
import { env, configWarnings } from './config/env.js';

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`[startup] Gandhi Foundation API listening on http://localhost:${env.port}`);
  console.log(`[startup] environment: ${env.nodeEnv}`);
  console.log(`[startup] allowed origins: ${env.corsOrigins.join(', ') || '(none)'}`);
  for (const warning of configWarnings()) console.warn(`[startup] ${warning}`);
});

function shutdown(signal) {
  console.log(`[shutdown] ${signal} received, closing server.`);
  server.close(() => process.exit(0));
  // Don't hang forever on a stuck connection.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
