# Gandhi Foundation — API

Express backend for the Gandhi Foundation website. Handles contact-form
enquiries: validates them, stores them, and emails them to the Foundation.

## Setup

```bash
cd server
npm install
cp .env.example .env    # then edit .env
npm run dev             # http://localhost:4000
```

`npm run dev` uses Node's built-in `--watch`, so no nodemon is needed.

Run the frontend in a second terminal with `npm run dev` inside
`gandhi-foundation-react`. Vite proxies `/api` to port 4000, so the browser
sees one origin and CORS never comes into play during development.

## Endpoints

| Method | Path                   | Purpose                                    |
| ------ | ---------------------- | ------------------------------------------ |
| GET    | `/api/health`          | Liveness check — uptime and timestamp      |
| GET    | `/api/contact/topics`  | The enquiry topics the form offers         |
| POST   | `/api/contact`         | Submit an enquiry                          |

### POST /api/contact

```json
{
  "name": "Priya R",
  "organisation": "Acme Ltd",
  "email": "priya@example.com",
  "phone": "+91 90000 00000",
  "topic": "Volunteer",
  "message": "I would like to help with tuition classes."
}
```

`name`, `email` and `topic` are required; the rest are optional. Success
returns `201` with `{ ok, id, delivered, message }`. `delivered` is `false`
when email is switched off or the mail server rejected the message — the
enquiry is stored either way.

Validation failures return `400` with a `details` array of
`{ field, message }`, which the React form maps onto the individual inputs.

## Email

Leave `SMTP_HOST` empty and the API still works: enquiries are appended to
`data/enquiries.json` (one JSON object per line) and nothing is lost. Fill in
the SMTP settings when the Foundation's mailbox is ready.

Delivery is attempted *after* the enquiry is stored, so a mail outage never
turns into a failed submission for the visitor.

## Notes on the choices here

- **Storage is a JSONL file, not a database.** The site expects a handful of
  enquiries a week. A file has no operational cost and is trivial to read.
  Swap `services/enquiryStore.js` for a database when volume justifies it —
  nothing else needs to change.
- **Rate limit** is five submissions per IP per fifteen minutes.
- **Honeypot** field named `website` is hidden from users; any value in it is
  rejected. Catches most naive spam bots without a CAPTCHA.
- `trust proxy` is on, which is required for correct client IPs — and so
  correct rate limiting — behind Nginx, Render, Railway or similar.

## Deploying as one service

Build the frontend, then set `SERVE_CLIENT=true`. Express serves the static
build and falls back to `index.html` for React Router paths.

```bash
cd gandhi-foundation-react && npm run build
cd ../server && SERVE_CLIENT=true NODE_ENV=production npm start
```
