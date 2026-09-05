import { Router } from 'express';
import contactRoutes from './contact.routes.js';

const router = Router();

router.get('/health', (req, res) =>
  res.json({ ok: true, uptime: Math.round(process.uptime()), timestamp: new Date().toISOString() })
);

router.use('/contact', contactRoutes);

// Future content endpoints (programs, impact, gallery, documents) mount here.

export default router;
