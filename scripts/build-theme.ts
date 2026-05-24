import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { opacify } from "polished";

const palette = {
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

  // Extended UI accents (outside base16; for non-syntax workbench keys)
  bgBrightest: "#454c58",

  primaryDimDim: "#5c5346",
  primaryDim: "#867b64",
  primary: "#ad9f7d",
  primaryBright: "#ddcfb5",

  secondaryDimDim: "#453f39",
  secondaryDim: "#63564a",

  crimson: "#c56565",

  primaryHighlight: "#ad9f7d40",
  crimsonTransparent: "#c56565c7",
  emeraldTransparent: "#59b57cc5",
} as const;

const theme = {
  name: "ikuma-theme",
  type: "dark",
  colors: {
    foreground: palette.base07,
    "textLink.foreground": palette.primary,
    "textLink.activeForeground": palette.primaryBright,
    "list.activeSelectionBackground": palette.secondaryDimDim,
    "list.activeSelectionForeground": palette.primaryBright,
    focusBorder: palette.primaryDimDim,
    "input.background": palette.bgBrightest,

    "chat.linesAddedForeground": palette.emeraldTransparent,
    "chat.linesRemovedForeground": palette.crimsonTransparent,

    "editor.background": palette.base00,
    "editor.foreground": palette.base05,

    "activityBar.background": palette.base02,
    "activityBar.foreground": palette.primaryBright,
    "activityBar.activeBackground": palette.base01,
    "activityBar.activeBorder": palette.primaryBright,

    "sideBarTitle.foreground": palette.base04,
    "sideBar.background": palette.base01,

    "tab.activeBorderTop": palette.primary,
    "editorGroupHeader.tabsBackground": palette.base01,

    "panel.background": palette.base00,

    "button.background": palette.primary,
    "button.foreground": palette.base05,

    "panelTitle.inactiveForeground": palette.primaryDim,
    "panelTitle.activeForeground": palette.primaryBright,

    "menu.background": palette.base00,
    "menu.foreground": palette.base07,

    "scrollbarSlider.background": palette.primaryDim,

    "activityBarBadge.background": palette.secondaryDim,
    "activityBarBadge.foreground": palette.base07,

    "statusBar.background": palette.base02,
    "statusBar.noFolderBackground": palette.base02,
    "statusBar.debuggingBackground": palette.base02,
    "statusBar.foreground": palette.primaryBright,

    "quickInput.background": palette.base01,
    "quickInput.foreground": palette.primaryBright,
    "quickInputList.focusBackground": palette.primaryDimDim,

    "editorBracketHighlight.foreground1": palette.base03,
    "editorBracketHighlight.foreground2": palette.base0F,
    "editorBracketHighlight.foreground3": palette.primaryDim,
    "editorBracketHighlight.foreground4": palette.base03,
    "editorBracketHighlight.foreground5": palette.base0F,
    "editorBracketHighlight.foreground6": palette.primaryDim,
    "editorBracketHighlight.unexpectedBracket.foreground": palette.crimson,

    "editorBracketMatch.background": palette.primaryHighlight,
    "editorBracketMatch.border": palette.primary,

    "editorOverviewRuler.bracketMatchForeground": palette.primaryDim,
  },
  tokenColors: [
    {
      scope: [
        "punctuation.definition.tag", // matches .begin/.end/.html/.tsx/.jsx variants
        "punctuation.definition.typeparameters", // TS generics
      ],
      settings: { foreground: palette.base03 },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: palette.base03, fontStyle: "italic" },
    },
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: palette.base0E },
    },
    {
      scope: ["string", "constant.other.symbol"],
      settings: { foreground: palette.base0B },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "constant.character.escape",
      ],
      settings: { foreground: palette.base09 },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "variable.function",
      ],
      settings: { foreground: palette.base0D },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
        "variable.other.readwrite.alias",
        "support.class.component",
      ],
      settings: { foreground: palette.base0A },
    },
    {
      scope: ["keyword.operator", "keyword.control"],
      settings: { foreground: palette.base0F },
    },
    {
      scope: [
        "entity.name.tag",
        "entity.other.attribute-name",
        "support.type.property-name",
        "meta.object-literal.key",
        "entity.name.tag.yaml",
        "entity.name.tag.toml",
        "support.type.property-name.toml",
        "variable.other.enummember",
      ],
      settings: { foreground: palette.base08 },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: palette.crimson },
    },
    {
      scope: ["variable", "variable.parameter"],
      settings: { foreground: palette.base05 },
    },
  ],
  semanticTokenColors: {
    comment: { foreground: palette.base03, fontStyle: "italic" },

    keyword: palette.base0E,
    operator: palette.base05,

    string: palette.base0B,
    number: palette.base09,
    regexp: palette.base0C,

    variable: palette.base05,
    "variable.readonly": palette.base09,
    parameter: palette.base05,
    property: palette.base08,

    function: palette.base0D,
    method: palette.base0D,
    macro: palette.base0D,
    decorator: palette.base0D,
    event: palette.base0D,
    label: palette.base08,

    class: palette.base0A,
    interface: palette.base0A,
    enum: palette.base0A,
    struct: palette.base0A,
    type: palette.base0A,
    typeParameter: palette.base0A,
    namespace: palette.base0A,
    enumMember: palette.base09,

    "*.defaultLibrary": palette.primaryBright,
    "variable.readonly.defaultLibrary": palette.base09,
    "*.async": { fontStyle: "italic" },
    "*.deprecated": { fontStyle: "strikethrough" },
  },
};

const out = "themes/ikuma-theme-color-theme.json";
await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(theme, null, 2) + "\n");
console.log(`wrote ${out}`);
function rgbaToHex(arg0: string) {
  throw new Error("Function not implemented.");
}
