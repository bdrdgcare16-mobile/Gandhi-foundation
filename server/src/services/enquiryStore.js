import { mkdir, appendFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPool, isDbConfigured } from './db.js';

const here = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(here, '../../data/enquiries.json');

// Two backends, one interface. MySQL is used whenever it is configured;
// otherwise enquiries append to a local JSONL file so the app still runs on a
// laptop with no database installed.
export function storageMode() {
  return isDbConfigured() ? 'mysql' : 'file';
}

async function saveToDb(record) {
  const pool = getPool();
  await pool.execute(
    `INSERT INTO enquiries
       (id, name, organisation, email, phone, topic, message, received_at, ip, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      record.id,
      record.name,
      record.organisation || '',
      record.email,
      record.phone,
      record.topic,
      record.message || null,
      // MySQL DATETIME wants 'YYYY-MM-DD HH:MM:SS', not an ISO string with a Z.
      new Date(record.receivedAt).toISOString().slice(0, 19).replace('T', ' '),
      record.ip || null,
      (record.userAgent || '').slice(0, 500),
    ]
  );
}

async function saveToFile(record) {
  await mkdir(dirname(FILE), { recursive: true });
  await appendFile(FILE, JSON.stringify(record) + '\n', 'utf8');
}

export async function saveEnquiry(record) {
  if (isDbConfigured()) return saveToDb(record);
  return saveToFile(record);
}

export async function listEnquiries({ limit = 100 } = {}) {
  if (isDbConfigured()) {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM enquiries ORDER BY received_at DESC LIMIT ?',
      [Number(limit)]
    );
    return rows;
  }

  try {
    const raw = await readFile(FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map(line => { try { return JSON.parse(line); } catch { return null; } })
      .filter(Boolean)
      .reverse()
      .slice(0, limit);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}