import { tokens } from "./colors.ts";

// v('keyword')       -> '#c0a361'
// v('primary', '40') -> '#ad9f7d40'  (alpha-append hex)
export const v = (key: keyof typeof tokens, op = ""): string =>
  tokens[key] + op;
