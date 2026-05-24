import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { format, resolveConfig } from "prettier";
import { getTheme, type GetThemeOptions } from "./theme.ts";
import { buildWindowsTerminal, createTheme } from "./helper.ts";

async function writeJson(file: string, data: unknown) {
  await mkdir(dirname(file), { recursive: true });
  const config = await resolveConfig(file, { editorconfig: true });
  const formatted = await format(JSON.stringify(data), {
    ...config,
    filepath: file,
  });
  await writeFile(file, formatted);
  console.log(`wrote ${file}`);
}

const targets: GetThemeOptions[] = [
  { color: "dark", name: "ikuma-theme" },
  { color: "light", name: "ikuma-theme light" },
];

const windowsTerminal = {
  schemes: targets.map((t) =>
    buildWindowsTerminal(createTheme(t.color), `Ikuma ${t.color}`),
  ),
};

await Promise.all([
  // VS Code extension themes
  ...targets.map((t) =>
    writeJson(
      `dist/vscode-theme/ikuma-theme-${t.color}-color-theme.json`,
      getTheme(t),
    ),
  ),

  // Windows Terminal: both schemes in one fragment for settings.json
  writeJson("dist/windows-terminal/ikuma.json", windowsTerminal),
]);
