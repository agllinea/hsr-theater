#!/usr/bin/env node

import fs from "fs";
import path from "path";

const CHARACTERS_INDEX = path.resolve("public/characters/index.txt");
const SCRIPTS_INDEX = path.resolve("public/scripts/index.txt");
const SCRIPTS_CONTENT_DIR = path.resolve("public/scripts/content");

// Parse characters/index.txt → { chineseName: charId }
// Each block: line1=ID|Name|Rarity|sort, line2=VA, line3=fractions, line4=card, line5=avatar
function parseCharacters(text) {
  const nameToId = {};
  for (const block of text.split(/\r?\n\r?\n/)) {
    const firstLine = block.trim().split(/\r?\n/)[0];
    if (!firstLine) continue;
    const parts = firstLine.split("|");
    if (parts.length < 2) continue;
    nameToId[parts[1].trim()] = parts[0].trim();
  }
  return nameToId;
}

// Find all characters mentioned as speakers ({name}：) in md content
function findCharacters(content, nameToId) {
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `(${Object.keys(nameToId).map(escapeRegExp).join("|")})：`,
    "g"
  );
  const found = new Set();
  let match;
  while ((match = pattern.exec(content)) !== null) {
    found.add(nameToId[match[1]]);
  }
  return [...found];
}

const nameToId = parseCharacters(fs.readFileSync(CHARACTERS_INDEX, "utf-8"));

const scriptText = fs.readFileSync(SCRIPTS_INDEX, "utf-8");
const useCRLF = scriptText.includes("\r\n");
const NL = useCRLF ? "\r\n" : "\n";

// Parse into blocks (arrays of non-empty lines), preserving order
const rawLines = scriptText.split(/\r?\n/);
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

// Update each block's 4th line with discovered characters (line 3 is now tag)
const updatedBlocks = blocks.map((block) => {
  const idMatch = block[0].match(/^(\d+)\|/);
  if (!idMatch) return block;

  const scriptId = idMatch[1];
  const mdPath = path.join(SCRIPTS_CONTENT_DIR, `${scriptId}.md`);

  if (!fs.existsSync(mdPath)) {
    console.warn(`⚠️  Missing md: ${scriptId}.md`);
    return block;
  }

  const characters = findCharacters(fs.readFileSync(mdPath, "utf-8"), nameToId);
  if (!characters.includes("Trailblazer")) characters.unshift("Trailblazer");
  const out = [block[0], block[1]];
  if (block[2]) out.push(block[2]); // preserve tag line
  if (characters.length > 0) out.push(characters.join("|"));
  return out;
});

fs.writeFileSync(
  SCRIPTS_INDEX,
  updatedBlocks.map((b) => b.join(NL)).join(NL + NL),
  "utf-8"
);

console.log("✅ scripts/index.txt characters updated");

// node scripts/processMission.js
