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
// POST.json ships with a placeholder address; replace it with the real post
// (https://x.com/<handle>/status/<id>) before submitting - the gate refuses
// the placeholder on purpose.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
