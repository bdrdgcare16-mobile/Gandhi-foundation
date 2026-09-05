export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function notFound(req, res) {
  res.status(404).json({ ok: false, error: `No route for ${req.method} ${req.originalUrl}` });
}

// Four arguments required — Express identifies error handlers by arity.
export function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  if (status >= 500) console.error('[error]', err);

  res.status(status).json({
    ok: false,
    error: status >= 500 ? 'Something went wrong. Please try again.' : err.message,
    ...(err.details ? { details: err.details } : {}),
  });
}

// Wraps async handlers so a rejected promise reaches errorHandler
// instead of hanging the request.
export const asyncRoute = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
