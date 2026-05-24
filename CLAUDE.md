# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm build:theme` — regenerate all theme JSON files from the TS source. Run this after editing anything under `scripts/` before checking results in VS Code.
- `pnpm build:theme:watch` — same, but re-runs on changes.
- `pnpm build` — package the VS Code extension as `dist/*.vsix` via `vsce`. This **does not** regenerate the theme JSON; run `build:theme` first if `scripts/` changed.
- No test suite, no linter beyond Prettier (the build pipeline runs Prettier on each JSON output).

To install locally for visual testing: `code --install-extension dist/ikuma-theme-<version>.vsix` then reload window.

## Architecture

The repo is a single VS Code theme extension, but the build pipeline emits **three output targets** from one shared color source:

| Target | Output | Purpose |
| --- | --- | --- |
| VS Code | `themes/ikuma-theme-{dark,light}-color-theme.json` | Full UI + syntax theme (~12 KB) |
| Shiki | `themes/shiki/ikuma-{dark,light}.json` | Slim syntax-only payload (~5 KB), drops UI keys |
| Windows Terminal | `themes/windows-terminal/ikuma.json` | Flat color scheme with both modes in `schemes[]` |

### Source-of-truth flow

```
colors.ts ──┐
            ├──► helper.ts ──► theme.ts ──► index.ts ──► themes/*.json
            └────────────────────────────────┘
```

- **`scripts/colors.ts`** — the only file you edit to change colors. Two layers:
  - `palette`: each entry is a `[dark, light]` tuple. All raw hex lives here.
  - `tokens`: semantic aliases (`foreground`, `keyword`, `string`, ...) that point into the palette. Edit `tokens` to remap roles without retinting.
- **`scripts/helper.ts`** — `createTheme(mode)` returns helpers bound to one mode:
  - `v("key", "40")` — semantic token lookup, optional alpha-append (`#ad9f7d40`).
  - `p("paletteKey")` — raw palette access, bypassing the alias layer (use for tokens that have no semantic role, like terminal ANSI colors).
  - `buildAnsi(helpers)` — emits the 16 `terminal.ansi*` keys; VS Code is case-sensitive about these and silently ignores typos.
  - `buildWindowsTerminal(helpers, name)` — emits a flat Windows Terminal scheme (note: WT calls the magenta slot `purple`).
- **`scripts/theme.ts`** — `getTheme(options)` returns the full VS Code theme object; `getShikiTheme(options)` derives a slim version by picking just `tokenColors` + `semanticTokenColors` + two `colors` keys.
- **`scripts/index.ts`** — top-level `await Promise.all([...])` writing all targets in parallel through Prettier.

### Key design choices

- **ANSI palette is decoupled from the UI palette.** The warm-brown UI tokens (`primary`, `keyword`, etc.) and the saturated rainbow ANSI colors (`ansiRed`, `ansiOrange`, ...) live side-by-side in `palette` but never cross-reference. UI status accents (`red`, `green`) use the warm UI palette; terminal output uses the rainbow palette.
- **Solarized convention** for the 8→16 ANSI mapping: orange → `ansiBrightRed`, purple → `ansiBrightMagenta`.
- **Light mode mirrors dark mode's temperature contrast**: cool slate BG + warm gold accents in both. Don't reintroduce warm cream backgrounds on the light side without thinking through the consequence (everything-warm reads as monotone).
- **`primary` vs `primaryHover` vs `primaryBright`** are three distinct accent intensities. `primaryBright` is max-contrast — using it for hover states blows out the UI.

### Native TS, no bundler

`type: module` + `tsconfig` with `NodeNext` and `allowImportingTsExtensions` means `node scripts/index.ts` runs directly with Node's native TS support (Node ≥ 22). Imports must include the `.ts` extension. No `tsc` compile step; `noEmit: true`.

### Distribution

The extension is published to the VS Code Marketplace as `46ki75.ikuma-theme` via `vsce publish` (use the scoped `@vscode/vsce`, not the deprecated unscoped `vsce`). Alternatively, attach the `.vsix` to a GitHub Release for personal-use install.
