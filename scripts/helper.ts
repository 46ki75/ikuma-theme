import { palette, tokens } from "./colors.ts";

export type ColorMode = "dark" | "light";

// Returns helpers bound to a single color mode.
//   v('keyword')       -> '#c9af70' (dark) or '#7a6010' (light)
//   v('primary', '40') -> '#ad9f7d40' (alpha-append)
//   p('base03')        -> raw palette access (skip semantic alias layer)
export function createTheme(mode: ColorMode) {
  const idx = mode === "dark" ? 0 : 1;

  const v = (key: keyof typeof tokens, op = ""): string =>
    tokens[key][idx] + op;

  const p = (key: keyof typeof palette, op = ""): string =>
    palette[key][idx] + op;

  return { v, p, mode };
}
