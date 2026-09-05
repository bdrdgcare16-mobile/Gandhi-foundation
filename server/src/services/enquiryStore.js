import { mkdir, appendFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(here, '../../data/enquiries.json');

// Append-only JSONL: one enquiry per line. Safe under concurrent appends and
// impossible to corrupt the whole file with a partial write.
export async function saveEnquiry(record) {
  await mkdir(dirname(FILE), { recursive: true });
  await appendFile(FILE, JSON.stringify(record) + '\n', 'utf8');
}

export async function listEnquiries() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map(line => {
        try { return JSON.parse(line); } catch { return null; }
      })
      .filter(Boolean);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}
