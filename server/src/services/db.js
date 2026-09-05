import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

let pool = null;

// Railway exposes MYSQL_URL on its MySQL service. Referencing it from the app
// service as ${{MySQL.MYSQL_URL}} is all the configuration this needs.
export function isDbConfigured() {
  return Boolean(env.db.url || env.db.host);
}

export function getPool() {
  if (!isDbConfigured()) return null;
  if (pool) return pool;

  pool = env.db.url
    ? mysql.createPool(env.db.url)
    : mysql.createPool({
        host: env.db.host,
        port: env.db.port,
        user: env.db.user,
        password: env.db.password,
        database: env.db.database,
      });

  pool.on('connection', () => {});
  return pool;
}

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS enquiries (
  id            CHAR(36)     NOT NULL PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  organisation  VARCHAR(160) NOT NULL DEFAULT '',
  email         VARCHAR(160) NOT NULL,
  phone         VARCHAR(20)  NOT NULL,
  topic         VARCHAR(80)  NOT NULL,
  message       TEXT         NULL,
  received_at   DATETIME     NOT NULL,
  ip            VARCHAR(45)  NULL,
  user_agent    VARCHAR(500) NULL,
  INDEX idx_received_at (received_at),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

// Called once at startup. Safe to run on every boot — it only creates the
// table if it is missing, so no separate migration step is needed.
export async function initDb() {
  const p = getPool();
  if (!p) return { ready: false, reason: 'not-configured' };
  await p.query(CREATE_TABLE);
  return { ready: true };
}

export async function closeDb() {
  if (pool) await pool.end();
  pool = null;
}