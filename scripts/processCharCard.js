import fs from "fs";
import path from "path";
import sharp from "sharp";
import cv from "@techstark/opencv-js";

async function loadImageMat(filePath) {
  // Use sharp to decode webp to raw RGBA
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Convert Node.js Buffer to Uint8Array for WASM
  const u8 = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);

  // Create Mat in CV_8UC4 (RGBA)
  const mat = cv.matFromArray(info.height, info.width, cv.CV_8UC4, u8);

  return mat;
}

cv['onRuntimeInitialized'] = async () => {
  cv['print'] = () => {}; // disables stdout logging from WASM
  cv['printErr'] = () => {}; // disables stderr logging from WASM
  await main();
};

// Paths
const CHAR_DIR = path.resolve("./public/characters");
const ACTORS_FILE = path.resolve("./src/react-app/assets/actors.json");
const OUTPUT_FILE = path.resolve(
  "./src/react-app/assets/characterFocus.generated.ts"
);


// Template match: returns normalized center
function matchIcon(fullMat, iconMat, fileName) {
  const resultCols = fullMat.cols - iconMat.cols + 1;
  const resultRows = fullMat.rows - iconMat.rows + 1;

  const result = new cv.Mat(resultRows, resultCols, cv.CV_32FC1);
  cv.matchTemplate(fullMat, iconMat, result, cv.TM_CCOEFF_NORMED);

  const { maxLoc, maxVal } = cv.minMaxLoc(result);
console.log(`Matched ${fileName} with confidence ${maxVal.toFixed(3)}`);
//   if (maxVal < 0.6) {
//     console.warn(`⚠️ Low confidence match for ${fileName}`);
//   }

  const centerX = maxLoc.x + iconMat.cols / 2;
  const centerY = maxLoc.y + iconMat.rows / 2;

  result.delete();

  return {
    focusX: centerX / fullMat.cols,
    focusY: centerY / fullMat.rows,
  };
}

async function main() {
  const actors = JSON.parse(fs.readFileSync(ACTORS_FILE, "utf-8"));

  const output = [];

  for (const actor of actors) {
    const id = actor.id;

    const fullPath = path.join(CHAR_DIR, `${id}-character_cut_in_front.webp`);
    const iconPath = path.join(CHAR_DIR, `${id}-character_icon.webp`);

    if (!fs.existsSync(fullPath) || !fs.existsSync(iconPath)) {
      console.warn(`⚠️ Missing images for ${id}`);
      continue;
    }

    const fullMat = await loadImageMat(fullPath);
    const iconMat = await loadImageMat(iconPath);

    const focus = matchIcon(fullMat, iconMat, id);

    fullMat.delete();
    iconMat.delete();

    output.push({ id, ...focus });
  }

  const fileContent = `// AUTO-GENERATED – DO NOT EDIT
export interface CharacterFocus {
  id: string;
  focusX: number;
  focusY: number;
}

export const characterFocus: CharacterFocus[] = ${JSON.stringify(output, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent, "utf-8");
  console.log("✅ Character focus data generated:", OUTPUT_FILE);
}

await main();
