import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

// ---- paths ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const actorsPath = path.resolve(
  __dirname,
  "../src/react-app/assets/actors.json"
);

const outputDir = path.resolve(
  __dirname,
  "../public/characters"
);

// ensure output folder exists
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
  const raw = fs.readFileSync(actorsPath, "utf-8");
  const actors = JSON.parse(raw);

  for (const actor of actors) {
    if (!actor?.id) continue;

    const fileName = `${actor.id}-character_cut_in_front.webp`;
    const target = path.join(outputDir, fileName);

    // ✅ skip if file already exists
    if (fs.existsSync(target)) {
      console.log(`⏭️  exists, skip: ${actor.id}`);
      continue;
    }

    const url = `https://starrail.honeyhunterworld.com/img/character/${fileName}`;
    const ok = await downloadImage(url, target);

    if (!ok) {
      console.warn(`❌ failed, skipped: ${actor.id}`);
    } else {
      console.log(`✅ downloaded: ${actor.id}`);
    }
  }

  console.log("Done.");
}

run();
