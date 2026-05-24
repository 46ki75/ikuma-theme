import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { format, resolveConfig } from "prettier";
import { getTheme, type GetThemeOptions } from "./theme.ts";

async function write(file: string, options: GetThemeOptions) {
  await mkdir(dirname(file), { recursive: true });
  const config = await resolveConfig(file, { editorconfig: true });
  const formatted = await format(JSON.stringify(getTheme(options)), {
    ...config,
    filepath: file,
  });
  await writeFile(file, formatted);
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
