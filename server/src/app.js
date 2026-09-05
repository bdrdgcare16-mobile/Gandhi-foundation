import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errors.js';

const here = dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  // Required for correct req.ip (and therefore rate limiting) behind a
  // reverse proxy such as Nginx, Render or Railway.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(helmet());
  app.use(compression());
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

  app.use(cors({
    origin(origin, callback) {
      // No origin: curl, server-to-server, same-origin form posts.
      if (!origin || env.corsOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    },
  }));

  // 100kb is far more than the contact form needs and blocks oversized posts.
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  app.use('/api', apiRoutes);

  if (env.serveClient) {
    const dist = resolve(here, '..', env.clientDir);
    if (existsSync(dist)) {
      app.use(express.static(dist));
      // React Router owns client-side routes, so anything not matched above
      // returns index.html rather than a 404.
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) return next();
        res.sendFile(resolve(dist, 'index.html'));
      });
    } else {
      console.warn(`[startup] SERVE_CLIENT is on but ${dist} does not exist. Run the frontend build first.`);
    }
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
