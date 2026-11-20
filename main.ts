// gta6-clipper-01 — "STILL WAITING FOR GTA 6? STOP WAITING. START EARNING."
// Node 22, standard library only, no network. Deterministic: the same run
// always writes the same bytes to /output.
// The entry is the video itself: a 20s vertical (720x1280) YouTube Short.
// An AI-made Vice City neon street, a gamer in a hoodie looking up at a
// glowing GTA 6 billboard, then the make.fun pitch burned in on screen:
// "STOP WAITING. START EARNING. make.fun pays you to make clips with AI."
// The clip is two beats: 0-9s the hook ("STILL WAITING FOR GTA 6?"), 9-20s
// the pitch, with the play code on screen at the end.
// This program validates VIDEO.json (it must name a real public YouTube
// Shorts/video URL — the starter placeholder is refused), copies it to the
// output directory where the gate reads it, and writes clip.json, a manifest
// of the clip, so the entry is self-describing.
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The clip, as rendered: 20s vertical YouTube Short, 720x1280, h264+aac.
const CLIP = {
  title: 'Still Waiting for GTA 6? Stop Waiting. Start Earning on make.fun',
  format: 'vertical Short, 9:16',
  durationSeconds: 20,
  width: 720,
  height: 1280,
  pitch: 'make.fun pays you to make clips with AI',
  bounty: 'https://make.fun/bounty/gta6-clipper-01',
  playCode: 'makefun-skylark-ladybug-ocelot',
};

function readVideoJson(): { url: string } {
  const raw = readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8');
  const data = JSON.parse(raw) as { url?: unknown };
  if (typeof data.url !== 'string' || data.url.length === 0) {
    throw new Error('VIDEO.json has no url string');
  }
  return { url: data.url };
}

function isRealYouTubeUrl(url: string): boolean {
  // A real public Short/video URL. The starter placeholder (<id>) and any
  // placeholder text are refused here, so a bad VIDEO.json fails loudly
  // instead of reaching the gate.
  if (url.includes('<id>') || url.includes('placeholder')) return false;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'https:') return false;
  if (parsed.hostname === 'www.youtube.com') {
    return parsed.pathname.startsWith('/shorts/') || parsed.pathname.startsWith('/watch');
  }
  if (parsed.hostname === 'youtu.be') return parsed.pathname.length > 1;
  return false;
}

function main(): void {
  const video = readVideoJson();
  if (!isRealYouTubeUrl(video.url)) {
    throw new Error(`VIDEO.json url is not a real public YouTube URL: ${video.url}`);
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
  const manifest = { ...CLIP, url: video.url };
  writeFileSync(join(OUTPUT_DIR, 'clip.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`clip: ${video.url}`);
}

main();
