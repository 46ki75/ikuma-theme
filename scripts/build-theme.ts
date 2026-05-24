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
  amber: "#d48b70",
  gold: "#cdb57b",
  emerald: "#59b57c",
  cyan: "#59a7b5",

  crimsonTransparent: "#c56565c7",
  emeraldTransparent: "#59b57cc5",

  comment: "#546e7a",
  keyword: "#c792ea",
  string: "#c3e88d",
  number: "#f78c6c",
  function: "#82aaff",
  type: "#ffcb6b",
  operator: "#cdb57b",
  tag: "#f07178",
  error: "#c56565",
} as const;

const theme = {
  name: "ikuma-theme",
  type: "dark",
  colors: {
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
      ],
      settings: { foreground: palette.type },
    },
    {
      scope: ["punctuation", "keyword.operator", "keyword.control"],
      settings: { foreground: palette.operator },
    },
    {
      scope: ["entity.name.tag", "entity.other.attribute-name"],
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
};

const out = "themes/ikuma-theme-color-theme.json";
await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(theme, null, 2) + "\n");
console.log(`wrote ${out}`);
function rgbaToHex(arg0: string) {
  throw new Error("Function not implemented.");
}
