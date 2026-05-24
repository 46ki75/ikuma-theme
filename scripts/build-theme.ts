import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { opacify } from "polished";

const palette = {
  bgDimDim: "#171819",
  bgDim: "#242629",
  bg: "#31353a",
  bgBlight: "#393e46",
  bgBlightest: "#454c58",

  fgDim: "#b0b5be",
  fg: "#d9dce4",
  fgLight: "#f5f6f8",

  primaryDimDim: "#5c5346",
  primaryDim: "#867b64",
  primary: "#ad9f7d",
  primaryBright: "#ddcfb5",
  primaryBrightest: "#f1e9da",

  secondaryDimDim: "#453f39",
  secondaryDim: "#63564a",
  secondary: "#a17c5b",

  crimson: "#c56565",
  brown: "#967a62",
  amber: "#a97562",
  gold: "#cdb57b",
  emerald: "#59b57c",
  cyan: "#59a7b5",
  slate: "#868e9c",

  crimsonTransparent: "#c56565c7",
  emeraldTransparent: "#59b57cc5",
  primaryHighlight: "#ad9f7d40",

  comment: "#868e9c",
  operator: "#a38c78",
  keyword: "#c0a361",
  function: "#cdb57b",
  type: "#d8cbb7",
  string: "#ccaea2",
  number: "#d48b70",
  tag: "#dcd1ba",

  error: "#c56565",
} as const;

const theme = {
  name: "ikuma-theme",
  type: "dark",
  colors: {
    foreground: palette.primaryBrightest,
    "textLink.foreground": palette.primary,
    "textLink.activeForeground": palette.primaryBright,
    "list.activeSelectionBackground": palette.secondaryDimDim,
    "list.activeSelectionForeground": palette.primaryBright,
    focusBorder: palette.primaryDimDim,
    "input.background": palette.bgBlightest,

    "chat.linesAddedForeground": palette.emeraldTransparent,
    "chat.linesRemovedForeground": palette.crimsonTransparent,

    "editor.background": palette.bgBlight,
    "editor.foreground": palette.fg,

    "activityBar.background": palette.bgDim,
    "activityBar.foreground": palette.primaryBright,
    "activityBar.activeBackground": palette.bg,
    "activityBar.activeBorder": palette.primaryBright,

    "sideBarTitle.foreground": palette.fgDim,
    "sideBar.background": palette.bg,

    "tab.activeBorderTop": palette.primary,
    "editorGroupHeader.tabsBackground": palette.bg,

    "panel.background": palette.bgBlight,

    "button.background": palette.primary,
    "button.foreground": palette.fg,

    "panelTitle.inactiveForeground": palette.primaryDim,
    "panelTitle.activeForeground": palette.primaryBright,

    "menu.background": palette.bgBlight,
    "menu.foreground": palette.primaryBrightest,

    "scrollbarSlider.background": palette.primaryDim,

    "activityBarBadge.background": palette.secondaryDim,
    "activityBarBadge.foreground": palette.primaryBrightest,

    "statusBar.background": palette.bgDim,
    "statusBar.noFolderBackground": palette.bgDim,
    "statusBar.debuggingBackground": palette.bgDim,
    "statusBar.foreground": palette.primaryBright,

    "quickInput.background": palette.bg,
    "quickInput.foreground": palette.primaryBright,
    "quickInputList.focusBackground": palette.primaryDimDim,

    "editorBracketHighlight.foreground1": palette.slate,
    "editorBracketHighlight.foreground2": palette.brown,
    "editorBracketHighlight.foreground3": palette.primaryDim,
    "editorBracketHighlight.foreground4": palette.slate,
    "editorBracketHighlight.foreground5": palette.brown,
    "editorBracketHighlight.foreground6": palette.primaryDim,
    "editorBracketHighlight.unexpectedBracket.foreground": palette.crimson,

    "editorBracketMatch.background": palette.primaryHighlight,
    "editorBracketMatch.border": palette.primary,

    "editorOverviewRuler.bracketMatchForeground": palette.primaryDim,
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: palette.comment, fontStyle: "italic" },
    },
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: palette.keyword },
    },
    {
      scope: ["string", "constant.other.symbol"],
      settings: { foreground: palette.string },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "constant.character.escape",
      ],
      settings: { foreground: palette.number },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "variable.function",
      ],
      settings: { foreground: palette.function },
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
      settings: { foreground: palette.type },
    },
    {
      scope: ["keyword.operator", "keyword.control"],
      settings: { foreground: palette.operator },
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
      settings: { foreground: palette.tag },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: palette.error },
    },
    {
      scope: ["variable", "variable.parameter"],
      settings: { foreground: palette.fg },
    },
  ],
  semanticTokenColors: {
    comment: { foreground: palette.comment, fontStyle: "italic" },

    keyword: palette.keyword,
    operator: palette.operator,

    string: palette.string,
    number: palette.number,
    regexp: palette.string,

    variable: palette.fg,
    "variable.readonly": palette.primary,
    parameter: palette.fg,
    property: palette.tag,

    function: palette.function,
    method: palette.function,
    macro: palette.function,
    decorator: palette.function,
    event: palette.function,
    label: palette.tag,

    class: palette.type,
    interface: palette.type,
    enum: palette.type,
    struct: palette.type,
    type: palette.type,
    typeParameter: palette.type,
    namespace: palette.type,
    enumMember: palette.number,

    "*.defaultLibrary": palette.primaryBright,
    "variable.readonly.defaultLibrary": palette.primary,
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
