import fs from "fs";
import path from "path";

// ---- CONFIG ----
const SOURCE_FILE = "src/react-app/assets/animated_shorts.ts";
const OUTPUT_DIR = "public/animated_short_cover";
// ----------------

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const source = fs.readFileSync(SOURCE_FILE, "utf-8");

// 1. extract BV ids from urls
const bvRegex = /https:\/\/www\.bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/g;
const bvs = [...source.matchAll(bvRegex)].map(m => m[1]);

console.log(`Found ${bvs.length} videos`);

async function getCoverUrl(bvid) {
  const res = await fetch(
    `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`
  );
  if (!res.ok) throw new Error(`API failed for ${bvid}`);
  const json = await res.json();
  return json.data.pic;
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, {
    headers: {
      Referer: "https://www.bilibili.com/",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!res.ok) throw new Error(`Image download failed`);

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
}

(async () => {
  for (const bvid of bvs) {
    const outputPath = path.join(OUTPUT_DIR, `${bvid}.jpg`);

    if (fs.existsSync(outputPath)) {
      console.log(`✓ ${bvid}.jpg already exists`);
      continue;
    }

    try {
      console.log(`→ Processing ${bvid}`);
      const coverUrl = await getCoverUrl(bvid);
      await downloadImage(coverUrl, outputPath);
      console.log(`✓ Saved ${bvid}.jpg`);
    } catch (err) {
      console.error(`✗ Failed ${bvid}`, err.message);
    }
  }
})();
