#!/usr/bin/env node

import fs from "fs";

const CLIPS_INDEX = "public/clips/index.txt";

function getBvid(url) {
  const match = url.match(/BV[a-zA-Z0-9]+/);
  return match ? match[0] : null;
}

async function fetchIframeParams(bvid) {
  const res = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.bilibili.com/" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const { aid, bvid: bv, pages } = json.data;
  const cid = pages[0].cid;
  return `aid=${aid}&bvid=${bv}&cid=${cid}&p=1`;
}

// Parse into blocks (arrays of non-empty lines)
const raw = fs.readFileSync(CLIPS_INDEX, "utf-8");
const useCRLF = raw.includes("\r\n");
const NL = useCRLF ? "\r\n" : "\n";

const rawLines = raw.split(/\r?\n/);
const blocks = [];
let i = 0;
while (i < rawLines.length) {
  if (!rawLines[i].trim()) { i++; continue; }
  const block = [];
  while (i < rawLines.length && rawLines[i].trim()) {
    block.push(rawLines[i]);
    i++;
  }
  blocks.push(block);
}

let updated = 0;

for (const block of blocks) {
  // line 0: title, line 1: url, line 2: cover, line 3: desc, line 4: iframe params (optional)
  if (block.length >= 5 && block[4].startsWith("aid=")) continue;

  const bvid = getBvid(block[1] ?? "");
  if (!bvid) { console.warn(`⚠️  No bvid in: ${block[0]}`); continue; }

  try {
    const params = await fetchIframeParams(bvid);
    block[4] = params;
    console.log(`✓ ${bvid} → ${params}`);
    updated++;
  } catch (err) {
    console.error(`✗ ${bvid}: ${err.message}`);
  }
}

if (updated > 0) {
  const output = blocks.map((b) => b.join(NL)).join(NL + NL);
  fs.writeFileSync(CLIPS_INDEX, output, "utf-8");
  console.log(`\n✅ Updated ${updated} clip(s) in ${CLIPS_INDEX}`);
} else {
  console.log("✅ All clips already have iframe params");
}

// node scripts/fetchClipIframeUrl.js
