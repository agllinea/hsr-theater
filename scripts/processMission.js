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

const { actors_by_fraction } = await import(
  pathToFileURL(ACTORS_PATH).href
);

const { scripts } = await import(
  pathToFileURL(SCRIPTS_PATH).href
);

// flatten actors
const actors = Object.values(actors_by_fraction).flat();

// helper
const escapeRegExp = (s) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// process scripts
const updatedScripts = scripts.map((script) => {
  const mdPath = path.join(MD_DIR, `${script.id}.md`);

  if (!fs.existsSync(mdPath)) {
    console.warn(`⚠️  Missing md: ${script.id}.md`);
    return script;
  }

  const content = fs.readFileSync(mdPath, "utf-8");

  const matchedActors = actors
    .filter((actor) => {
      const regex = new RegExp(escapeRegExp(actor.name), "g");
      return regex.test(content);
    })
    .map((actor) => actor.id);

  return {
    ...script,
    actors: [...new Set(matchedActors)],
  };
});

// rewrite scripts.ts
const output =
`export interface Script {
  id: string;
  chapter: string;
  title: string;
  status: string;
  desc?: string;
  actors?: string[];
  clips?: string[];
}

export const scripts: Script[] = ${JSON.stringify(updatedScripts, null, 2)};
`;

fs.writeFileSync(SCRIPTS_PATH, output, "utf-8");

console.log("✅ scripts.ts actors updated");
