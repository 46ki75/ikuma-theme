import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { getTheme, type GetThemeOptions } from "./theme.ts";

async function write(file: string, options: GetThemeOptions) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(getTheme(options), null, 2) + "\n");
  console.log(`wrote ${file}`);
}

await Promise.all([
  write("themes/ikuma-theme-dark-color-theme.json", {
    color: "dark",
    name: "ikuma-theme",
  }),
  write("themes/ikuma-theme-light-color-theme.json", {
    color: "light",
    name: "ikuma-theme light",
  }),
]);
