import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

// ---- paths ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, "../public/characters");

fs.mkdirSync(outputDir, { recursive: true });

// ---- helpers ----
function downloadImage(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);

    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return resolve(false);
        }

        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", () => {
        file.close();
        fs.unlink(dest, () => {});
        resolve(false);
      });
  });
}

// ---- main ----
async function run() {
  const files = fs.readdirSync(outputDir);
  const ids = files
    .filter((f) => f.endsWith("-character_cut_in_front.webp"))
    .map((f) => f.replace("-character_cut_in_front.webp", ""));

  for (const id of ids) {
    const fileName = `${id}-character_side_icon.webp`;
    const target = path.join(outputDir, fileName);

    if (fs.existsSync(target)) {
      console.log(`⏭️  exists, skip: ${id}`);
      continue;
    }

    const url = `https://starrail.honeyhunterworld.com/img/character/${fileName}`;
    const ok = await downloadImage(url, target);

    if (!ok) {
      console.warn(`❌ failed, skipped: ${id}`);
    } else {
      console.log(`✅ downloaded: ${id}`);
    }
  }

  console.log("Done.");
}

run();
