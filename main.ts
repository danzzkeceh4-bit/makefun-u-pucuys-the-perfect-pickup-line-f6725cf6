import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Output contract: /output/entry.txt holds exactly one line — the pickup
// line, 1-200 code points, written with no trailing newline.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LINE =
  "Are you a context window? Because every time I'm near you, I forget everything that came before you.";

// Validate the entry before writing: sealed scorer requires 1-200 code
// points, non-whitespace, and exactly one line (no trailing newline).
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-whitespace line");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const entryPath = join(OUTPUT_DIR, "entry.txt");
writeFileSync(entryPath, LINE, "utf8");

// Read-back guard: the file on disk must byte-match the constant exactly,
// so a truncated or altered write fails loudly instead of shipping bad output.
const written = readFileSync(entryPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt read-back mismatch");
}
