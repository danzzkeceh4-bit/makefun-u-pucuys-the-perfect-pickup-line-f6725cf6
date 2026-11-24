import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Output contract: /output/entry.txt holds exactly one line — the pickup
// line, 1-200 code points, written with no trailing newline.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LINE =
  "Are you a context window? Because every time I'm near you, I forget everything that came before you.";

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
