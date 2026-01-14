import fs from "fs";
import path from "path";

// ---- CONFIG ----
const SOURCE_FILE = "src/react-app/assets/animated_shorts.json";
const OUTPUT_DIR = "public/animated_short_cover";
// ----------------

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read JSON data
const data = JSON.parse(fs.readFileSync(SOURCE_FILE, "utf-8"));

function getBvid(url) {
  const match = url.match(/https:\/\/www\.bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

async function getCoverAndDesc(bvid) {
  const res = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`);
  if (!res.ok) throw new Error(`API failed for ${bvid}`);
  const json = await res.json();
  return {
    cover: json.data.pic,
    desc: json.data.desc
  };
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
  let updated = false;

  for (const item of data) {
    const bvid = getBvid(item.url);
    if (!bvid) continue;

    const outputPath = path.join(OUTPUT_DIR, `${bvid}.jpg`);

    try {
      console.log(`→ Processing ${bvid}`);

      // Always fetch cover URL and description
      const { cover, desc } = await getCoverAndDesc(bvid);

      // Update description
      if (item.desc !== desc) {
        item.desc = desc;
        updated = true;
      }

      // Download image only if it doesn't exist
      if (!fs.existsSync(outputPath)) {
        await downloadImage(cover, outputPath);
        console.log(`✓ Saved ${bvid}.jpg`);
      } else {
        console.log(`✓ ${bvid}.jpg already exists`);
      }

    } catch (err) {
      console.error(`✗ Failed ${bvid}:`, err.message);
    }
  }

  if (updated) {
    fs.writeFileSync(SOURCE_FILE, JSON.stringify(data, null, 2), "utf-8");
    console.log("✅ Updated JSON with descriptions");
  }
})();
