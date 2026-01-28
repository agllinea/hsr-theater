#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// enable ts imports
import "ts-node/register";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// paths
const ACTORS_PATH = path.resolve("src/react-app/assets/actors.ts");
const SCRIPTS_PATH = path.resolve("src/react-app/assets/scripts.ts");
const MD_DIR = path.resolve("public/scripts");

// dynamic imports
import { pathToFileURL } from "url";

const { actors_by_fraction } = await import(pathToFileURL(ACTORS_PATH).href);

const { scripts } = await import(pathToFileURL(SCRIPTS_PATH).href);

// flatten actors
const actors = Object.values(actors_by_fraction).flat();

// helper
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function stripMarkdownAndHtml(text) {
  return (
    text
      // remove HTML tags
      .replace(/<[^>]*>/g, "")

      // remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]*`/g, "")

      // remove markdown images & links, keep text
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

      // remove headings, blockquotes, emphasis, lists
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/^>\s*/gm, "")
      .replace(/[*_~]+/g, "")
      .replace(/^\s*[-+*]\s+/gm, "")

      // normalize whitespace
      .replace(/\s+/g, "")
      .trim()
  );
}

function getPlainTalkAmount(content) {
  const lines = content.split(/\r?\n/);

  const sectionPairs = [
    { start: "###### PPT对话开始", end: "###### PPT对话结束" },
    { start: "###### 站桩对话开始", end: "###### 站桩对话结束" },
  ];

  let inSection = false;
  let activeEnd = null;

  let sectionText = "";
  let fullText = "";

  for (const line of lines) {
    fullText += line + "\n";

    const startMatch = sectionPairs.find((p) => line.startsWith(p.start));
    if (startMatch) {
      inSection = true;
      activeEnd = startMatch.end;
      continue;
    }

    if (inSection && line.startsWith(activeEnd)) {
      inSection = false;
      activeEnd = null;
      continue;
    }

    if (inSection) {
      sectionText += line + "\n";
    }
  }

  const cleanSection = stripMarkdownAndHtml(sectionText);
  const cleanFull = stripMarkdownAndHtml(fullText);

  if (!cleanFull.length) return 0;

  return Number(((cleanSection.length / cleanFull.length) * 100).toFixed(2));
}

function getVideoNames(content) {
  const regex = /^>\s*播放短片「(.+?)」/gm;
  const names = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    names.push(match[1]);
  }

  return names;
}
function getTotalTalkLineCount(content) {
  return content.split(/\r?\n/).filter((line) => line.startsWith("* ")).length;
}
function getPlainTalkLineCount(content) {
  const lines = content.split(/\r?\n/);

  const sectionPairs = [
    { start: "###### PPT对话开始", end: "###### PPT对话结束" },
    { start: "###### 站桩对话开始", end: "###### 站桩对话结束" },
  ];

  let inSection = false;
  let activeEnd = null;
  let count = 0;

  for (const line of lines) {
    // section start
    const startMatch = sectionPairs.find((p) => line.startsWith(p.start));
    if (startMatch) {
      inSection = true;
      activeEnd = startMatch.end;
      continue;
    }

    // section end
    if (inSection && line.startsWith(activeEnd)) {
      inSection = false;
      activeEnd = null;
      continue;
    }

    // count bullet talk lines
    if (inSection && line.startsWith("* ")) {
      count++;
    }
  }

  return count;
}
// process scripts
const updatedScripts = scripts.map((script) => {
  const mdPath = path.join(MD_DIR, `${script.id}.md`);

  if (!fs.existsSync(mdPath)) {
    console.warn(`⚠️  Missing md: ${script.id}.md`);
    return script;
  }

  const content = fs.readFileSync(mdPath, "utf-8");

  const matchedActors = script.lock
    ? script.actors
    : actors
        .filter((actor) => {
          const regex = new RegExp(escapeRegExp(actor.name), "g");
          return regex.test(content);
        })
        .map((actor) => actor.id);

  const totalTalkLineCount = getTotalTalkLineCount(content);
  const plainTalkLineCount = getPlainTalkLineCount(content);

  return {
    ...script,
    actors: [...new Set(matchedActors)],
    clips: getVideoNames(content),
    lock: false,
    stats: {
      totalTalkLineCount: totalTalkLineCount,
      plainTalkAmount:
        totalTalkLineCount === 0
          ? 0
          : Number(
              ((plainTalkLineCount / totalTalkLineCount) * 100).toFixed(2),
            ),
    },
  };
});

// rewrite scripts.ts
const output = `export interface Script {
  id: string;
  chapter: string;
  title: string;
  status: string;
  desc?: string;
  actors?: string[];
  clips?: string[];
  lock?: boolean;
  stats?: {
    totalTalkLineCount: number;
    plainTalkAmount: number;
  };
}

export const scripts: Script[] = ${JSON.stringify(updatedScripts, null, 2)};
`;

fs.writeFileSync(SCRIPTS_PATH, output, "utf-8");

console.log("✅ scripts.ts actors updated");

// node scripts/processMission.js
