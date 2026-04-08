import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");

const skipNames = new Set([
  ".git",
  ".github",
  "node_modules",
  "out",
  "scripts",
  ".server.pid",
  "Thumbs.db",
  ".DS_Store"
]);

const shouldSkip = (name) => {
  if (skipNames.has(name)) return true;
  if (name.startsWith("__chrome_tmp")) return true;
  return false;
};

async function copyEntry(name) {
  if (shouldSkip(name)) return;

  const from = path.join(rootDir, name);
  const to = path.join(outDir, name);
  const entryStat = await stat(from);

  if (entryStat.isDirectory()) {
    await cp(from, to, { recursive: true });
    return;
  }

  await cp(from, to);
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const entries = await readdir(rootDir);
  await Promise.all(entries.map(copyEntry));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
