import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateBody } from '../middleware/validate.js';
import { asyncRoute } from '../middleware/errors.js';
import { createEnquiry, enquirySchema, TOPICS } from '../controllers/contact.controller.js';

const router = Router();

// Five submissions per IP per fifteen minutes — generous for a person,
// restrictive for a script.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many enquiries from this address. Please try again later.' },
});

router.get('/topics', (req, res) => res.json({ ok: true, topics: TOPICS }));
router.post('/', limiter, validateBody(enquirySchema), asyncRoute(createEnquiry));

export default router;
