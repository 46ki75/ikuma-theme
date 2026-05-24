// Raw color tokens — edit here to retint the theme.
export const palette = {
  // base16 — UI scale (dark → light)
  base00: "#393e46", // default background (editor)
  base01: "#31353a", // lighter background (sidebar, tabs)
  base02: "#242629", // selection / status bar background
  base03: "#949ba7", // comments, invisibles, line highlight
  base04: "#a2a8b3", // dim foreground (status bar text)
  base05: "#b0b5be", // default foreground, operators, delimiters
  base06: "#bec2ca", // light foreground
  base07: "#cccfd5", // lightest foreground

  // base16 — syntax accents
  base08: "#dcd1ba", // variables, tags, deletions
  base09: "#d48b70", // numbers, constants, attributes
  base0A: "#d8cbb7", // classes, types, search highlight
  base0B: "#ccaea2", // strings, insertions
  base0C: "#59a7b5", // support, regex, escapes
  base0D: "#cdb57b", // functions, methods, headings
  base0E: "#c0a361", // keywords, storage, selectors
  base0F: "#ac8c71", // deprecated, embedded language tags

  // Extended accents (outside base16)
  bgBrightest: "#454c58",
  primaryDimDim: "#5c5346",
  primaryDim: "#867b64",
  primary: "#ad9f7d",
  primaryBright: "#ddcfb5",
  secondaryDimDim: "#453f39",
  secondaryDim: "#63564a",
  crimson: "#c56565",
  emerald: "#59b57c",
} as const;

// Semantic aliases — what each role looks like.
// Edit here to remap roles to different palette entries without touching the theme builder.
export const tokens = {
  // UI roles
  foreground: palette.base05,
  activeForeground: palette.primaryBright,
  secondaryForeground: palette.base04,
  ignored: palette.base04,
  faded: palette.base03,

  background: palette.base00,
  activeBackground: palette.base01,
  deepBackground: palette.base02,
  bgBrightest: palette.bgBrightest,
  border: palette.base02,

  primary: palette.primary,
  primaryDim: palette.primaryDim,
  primaryDimDim: palette.primaryDimDim,
  primaryBright: palette.primaryBright,
  secondaryDim: palette.secondaryDim,
  secondaryDimDim: palette.secondaryDimDim,

  // Syntax roles (semantic + textmate share these)
  comment: palette.base03,
  string: palette.base0B,
  variable: palette.base05,
  parameter: palette.base05,
  property: palette.base08,
  keyword: palette.base0E,
  storage: palette.base0E,
  operator: palette.base05,
  punctuation: palette.base03,
  number: palette.base09,
  boolean: palette.base09,
  constant: palette.base09,
  function: palette.base0D,
  method: palette.base0D,
  class: palette.base0A,
  interface: palette.base0A,
  type: palette.base0A,
  typeParameter: palette.base0A,
  namespace: palette.base0A,
  enumMember: palette.base09,
  decorator: palette.base0D,
  regex: palette.base0C,
  builtin: palette.primaryBright,
  tag: palette.base08,
  attribute: palette.base08,

  // Status accents
  red: palette.crimson,
  green: palette.emerald,
  orange: palette.primaryBright,
  yellow: palette.base0E,
  blue: palette.primary,
  cyan: palette.base0C,
  magenta: palette.base0F,
} as const;
