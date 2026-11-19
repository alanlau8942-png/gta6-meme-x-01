// gta6-meme-x-01 entry (Node 22, standard library only).
// The entry is the X post itself: an AI-made GTA 6 meme with make.fun's ghost
// in the picture, posted on X with make.fun and the entrant's play code.
// This program only hands the house the post's address: it copies POST.json
// from the repository root to /output/POST.json, where the gate reads it.
// Nothing this program writes about the post is judged.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// POST.json must name the real post (https://x.com/<handle>/status/<id>):
// the gate refuses a placeholder address, so the program checks the copied
// file parses as JSON and carries a post URL before it exits.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_URL = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/(\w+\/status\/\d+|i\/web\/status\/\d+)$/;

mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, 'POST.json');
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), outPath);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
try {
  const post = JSON.parse(readFileSync(outPath, 'utf8')) as { url?: unknown };
  if (typeof post.url !== 'string' || !POST_URL.test(post.url)) {
    throw new Error('POST.json has no X post URL');
  }
} catch (err) {
  console.error(`POST.json failed validation: ${(err as Error).message}`);
  process.exit(1);
}
