import { mkdir, copyFile, writeFile, rm, readFile } from "node:fs/promises";
import { format, resolveConfig } from "prettier";

const OUT = "dist/npm";

const root = JSON.parse(await readFile("package.json", "utf8"));

const pkg = {
  name: "@46ki75/ikuma-theme",
  version: root.version,
  description: "Shiki syntax-highlighting themes from ikuma-theme.",
  license: "Apache-2.0",
  author: root.publisher,
  repository: root.repository,
  homepage: "https://github.com/46ki75/ikuma-theme#readme",
  bugs: "https://github.com/46ki75/ikuma-theme/issues",
  keywords: ["shiki", "theme", "syntax-highlighting", "ikuma-theme"],
  type: "module",
  exports: {
    "./dark": "./ikuma-dark.json",
    "./light": "./ikuma-light.json",
    "./package.json": "./package.json",
  },
  files: ["ikuma-dark.json", "ikuma-light.json", "README.md", "LICENSE"],
  publishConfig: {
    access: "public",
  },
};

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const pkgPath = `${OUT}/package.json`;
const config = await resolveConfig(pkgPath, { editorconfig: true });
const formatted = await format(JSON.stringify(pkg), {
  ...config,
  filepath: pkgPath,
});

await Promise.all([
  writeFile(pkgPath, formatted),
  copyFile("themes/shiki/ikuma-dark.json", `${OUT}/ikuma-dark.json`),
  copyFile("themes/shiki/ikuma-light.json", `${OUT}/ikuma-light.json`),
  copyFile("README.md", `${OUT}/README.md`),
  copyFile("LICENSE", `${OUT}/LICENSE`),
]);

console.log(`prepared ${OUT} for npm publish (v${pkg.version})`);
