import { HttpError } from './errors.js';

// Validates req.body against a zod schema and replaces it with the parsed
// result, so controllers only ever see clean, trimmed data.
export const validateBody = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const details = result.error.issues.map(i => ({
      field: i.path.join('.') || '(body)',
      message: i.message,
    }));
    return next(new HttpError(400, 'Please check the highlighted fields.', details));
  }
  req.body = result.data;
  next();
};
