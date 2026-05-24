import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { getTheme } from "./theme.ts";

const out = "themes/ikuma-theme-color-theme.json";
await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(getTheme(), null, 2) + "\n");
console.log(`wrote ${out}`);
