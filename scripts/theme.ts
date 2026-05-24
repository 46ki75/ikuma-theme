import { buildAnsi, createTheme, type ColorMode } from "./helper.ts";

export interface GetThemeOptions {
  color: ColorMode;
  name: string;
}

export function getTheme(options: GetThemeOptions) {
  const helpers = createTheme(options.color);
  const { v, p } = helpers;

  const foreground = v("foreground");
  const secondaryForeground = v("secondaryForeground");
  const activeForeground = v("activeForeground");
  const background = v("background");
  const activeBackground = v("activeBackground");
  const deepBackground = v("deepBackground");
  const border = v("border");
  const primary = v("primary");
  const punctuation = v("punctuation");

  return {
    name: options.name,
    type: options.color,
    semanticHighlighting: true,
    colors: {
      foreground,
      focusBorder: v("primaryDimDim"),

      "textLink.foreground": primary,
      "textLink.activeForeground": v("primaryBright"),

      "input.background": v("bgBrightest"),
      "input.foreground": foreground,
      "input.border": border,
      "input.placeholderForeground": secondaryForeground,

      "button.background": primary,
      "button.foreground": background,
      "button.hoverBackground": p("primaryHover"),

      "badge.background": v("secondaryDim"),
      "badge.foreground": foreground,

      "chat.linesAddedForeground": v("green", "c5"),
      "chat.linesRemovedForeground": v("red", "c7"),

      // editor
      "editor.background": background,
      "editor.foreground": foreground,
      "editor.lineHighlightBackground": activeBackground,
      "editor.selectionBackground": v("primary", "40"),
      "editor.selectionHighlightBackground": v("primary", "22"),
      "editor.wordHighlightBackground": v("primary", "22"),
      "editor.wordHighlightStrongBackground": v("primary", "33"),
      "editor.findMatchBackground": v("primary", "44"),
      "editor.findMatchHighlightBackground": v("primary", "22"),
      "editor.foldBackground": v("primary", "10"),

      "editorLineNumber.foreground": v("ignored"),
      "editorLineNumber.activeForeground": activeForeground,

      "editorCursor.foreground": v("primaryBright"),

      "editorIndentGuide.background1": v("primaryDim", "20"),
      "editorIndentGuide.activeBackground1": v("primaryDim", "60"),
      "editorWhitespace.foreground": v("primaryDim", "20"),

      "editorInlayHint.foreground": punctuation,
      "editorInlayHint.background": activeBackground,

      "editorStickyScroll.background": activeBackground,
      "editorStickyScrollHover.background": activeBackground,
      "editorStickyScroll.shadow": p("transparent"),
      "editorStickyScroll.border": v("primaryDim", "40"),

      "editorWidget.background": activeBackground,
      "editorWidget.border": border,

      "editorBracketHighlight.foreground1": p("base03"),
      "editorBracketHighlight.foreground2": p("base0F"),
      "editorBracketHighlight.foreground3": p("primaryDim"),
      "editorBracketHighlight.foreground4": p("base03"),
      "editorBracketHighlight.foreground5": p("base0F"),
      "editorBracketHighlight.foreground6": p("primaryDim"),
      "editorBracketHighlight.unexpectedBracket.foreground": v("red"),
      "editorBracketMatch.background": v("primary", "40"),
      "editorBracketMatch.border": primary,
      "editorOverviewRuler.bracketMatchForeground": v("primaryDim"),

      // activity bar
      "activityBar.background": deepBackground,
      "activityBar.foreground": v("primaryBright"),
      "activityBar.inactiveForeground": v("ignored"),
      "activityBar.activeBackground": activeBackground,
      "activityBar.activeBorder": v("primaryBright"),
      "activityBar.border": border,
      "activityBarBadge.background": v("secondaryDim"),
      "activityBarBadge.foreground": foreground,

      // side bar
      "sideBar.background": activeBackground,
      "sideBar.foreground": activeForeground,
      "sideBar.border": border,
      "sideBarTitle.foreground": secondaryForeground,
      "sideBarSectionHeader.background": background,
      "sideBarSectionHeader.foreground": foreground,
      "sideBarSectionHeader.border": border,

      // lists / trees
      "list.activeSelectionBackground": v("secondaryDimDim"),
      "list.activeSelectionForeground": v("primaryBright"),
      "list.inactiveSelectionBackground": activeBackground,
      "list.inactiveSelectionForeground": foreground,
      "list.hoverBackground": activeBackground,
      "list.hoverForeground": foreground,
      "list.focusBackground": activeBackground,
      "list.highlightForeground": primary,
      "tree.indentGuidesStroke": v("primaryDim", "40"),

      // tabs
      "tab.activeBorderTop": primary,
      "tab.activeBackground": background,
      "tab.inactiveBackground": background,
      "tab.activeForeground": foreground,
      "tab.inactiveForeground": secondaryForeground,
      "tab.hoverBackground": activeBackground,
      "tab.border": border,
      "editorGroupHeader.tabsBackground": activeBackground,
      "editorGroupHeader.tabsBorder": border,
      "editorGroup.border": border,

      // panel (terminal / problems / output / debug-console container)
      "panel.background": background,
      "panel.border": v("primaryDim"),
      "panelTitle.inactiveForeground": v("primaryDim"),
      "panelTitle.activeForeground": v("primaryBright"),
      "panelTitle.activeBorder": primary,

      // menu
      "menu.background": background,
      "menu.foreground": v("foreground"),
      "menu.separatorBackground": border,

      // status bar
      "statusBar.background": deepBackground,
      "statusBar.foreground": v("primaryBright"),
      "statusBar.noFolderBackground": deepBackground,
      "statusBar.debuggingBackground": deepBackground,
      "statusBar.debuggingForeground": v("primaryBright"),
      "statusBar.border": border,

      // title bar
      "titleBar.activeBackground": background,
      "titleBar.activeForeground": activeForeground,
      "titleBar.inactiveBackground": background,
      "titleBar.inactiveForeground": secondaryForeground,
      "titleBar.border": border,

      // pickers / inputs
      "quickInput.background": activeBackground,
      "quickInput.foreground": v("primaryBright"),
      "quickInputList.focusBackground": v("primaryDimDim"),
      "pickerGroup.border": border,
      "pickerGroup.foreground": foreground,

      // dropdown
      "dropdown.background": background,
      "dropdown.foreground": foreground,
      "dropdown.border": border,
      "dropdown.listBackground": activeBackground,

      // breadcrumbs
      "breadcrumb.foreground": secondaryForeground,
      "breadcrumb.focusForeground": foreground,
      "breadcrumb.background": background,
      "breadcrumbPicker.background": background,

      // scrollbar
      "scrollbarSlider.background": v("primaryDim", "40"),
      "scrollbarSlider.hoverBackground": v("primaryDim", "80"),
      "scrollbarSlider.activeBackground": v("primaryDim"),

      // git
      "gitDecoration.addedResourceForeground": v("green"),
      "gitDecoration.modifiedResourceForeground": v("blue"),
      "gitDecoration.deletedResourceForeground": v("red"),
      "gitDecoration.untrackedResourceForeground": v("cyan"),
      "gitDecoration.ignoredResourceForeground": v("ignored"),
      "gitDecoration.conflictingResourceForeground": v("orange"),
      "gitDecoration.submoduleResourceForeground": secondaryForeground,

      "editorGutter.modifiedBackground": v("blue"),
      "editorGutter.addedBackground": v("green"),
      "editorGutter.deletedBackground": v("red"),
      "editorGutter.commentRangeForeground": v("ignored"),
      "editorGutter.foldingControlForeground": secondaryForeground,

      "diffEditor.insertedTextBackground": v("green", "30"),
      "diffEditor.removedTextBackground": v("red", "30"),

      // problems / diagnostics
      "problemsErrorIcon.foreground": v("red"),
      "problemsWarningIcon.foreground": v("orange"),
      "problemsInfoIcon.foreground": v("blue"),
      "editorError.foreground": v("red"),
      "editorWarning.foreground": v("orange"),
      "editorInfo.foreground": v("blue"),
      "editorHint.foreground": v("green"),

      // notifications
      "notifications.background": background,
      "notifications.foreground": foreground,
      "notifications.border": border,
      "notificationsErrorIcon.foreground": v("red"),
      "notificationsWarningIcon.foreground": v("orange"),
      "notificationsInfoIcon.foreground": v("blue"),

      // terminal
      "terminal.foreground": foreground,
      ...buildAnsi(helpers),
    },
    semanticTokenColors: {
      comment: { foreground: v("comment"), fontStyle: "italic" },
      keyword: v("keyword"),
      operator: v("operator"),
      string: v("string"),
      number: v("number"),
      regexp: v("regex"),
      variable: v("variable"),
      "variable.readonly": v("constant"),
      parameter: v("parameter"),
      property: v("property"),
      function: v("function"),
      method: v("method"),
      macro: v("function"),
      decorator: v("decorator"),
      event: v("function"),
      label: v("property"),
      class: v("class"),
      interface: v("interface"),
      enum: v("type"),
      struct: v("type"),
      type: v("type"),
      typeParameter: v("typeParameter"),
      namespace: v("namespace"),
      enumMember: v("enumMember"),
      "*.defaultLibrary": v("builtin"),
      "variable.readonly.defaultLibrary": v("constant"),
      "*.async": { fontStyle: "italic" },
      "*.deprecated": { fontStyle: "strikethrough" },
    },
    tokenColors: [
      {
        scope: ["comment", "punctuation.definition.comment", "string.comment"],
        settings: { foreground: v("comment"), fontStyle: "italic" },
      },
      {
        scope: [
          "punctuation",
          "punctuation.definition.tag",
          "punctuation.definition.typeparameters",
          "meta.brace",
          "delimiter",
        ],
        settings: { foreground: punctuation },
      },
      {
        scope: ["keyword", "storage", "storage.type", "storage.modifier"],
        settings: { foreground: v("keyword") },
      },
      {
        scope: [
          "keyword.operator",
          "keyword.operator.assignment",
          "keyword.operator.relational",
          "keyword.operator.type",
        ],
        settings: { foreground: v("operator") },
      },
      {
        scope: ["string", "constant.other.symbol", "attribute.value"],
        settings: { foreground: v("string") },
      },
      {
        scope: ["punctuation.definition.string"],
        settings: { foreground: v("string", "77") },
      },
      {
        scope: [
          "constant.numeric",
          "constant.language",
          "constant.character",
          "constant.character.escape",
          "number",
        ],
        settings: { foreground: v("number") },
      },
      {
        scope: ["constant.language.boolean"],
        settings: { foreground: v("boolean") },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "meta.function-call",
          "variable.function",
        ],
        settings: { foreground: v("function") },
      },
      {
        scope: [
          "entity.name.type",
          "entity.name.class",
          "support.type",
          "support.class",
          "support.class.component",
          "type.identifier",
        ],
        settings: { foreground: v("class") },
      },
      {
        scope: ["variable", "identifier", "variable.parameter"],
        settings: { foreground: v("variable") },
      },
      {
        scope: [
          "variable.other.readwrite.alias",
          "variable.other.enummember",
          "constant",
          "entity.name.constant",
          "variable.language",
        ],
        settings: { foreground: v("constant") },
      },
      {
        scope: ["entity.name.tag", "tag.html"],
        settings: { foreground: v("keyword") },
      },
      {
        scope: [
          "entity.other.attribute-name",
          "support.type.property-name",
          "meta.object-literal.key",
          "meta.property-name",
          "entity.name.tag.yaml",
          "entity.name.tag.toml",
          "support.type.property-name.toml",
          "attribute.name",
          "property",
        ],
        settings: { foreground: v("property") },
      },
      {
        scope: ["source.regexp", "string.regexp"],
        settings: { foreground: v("regex") },
      },
      {
        scope: ["invalid", "invalid.illegal"],
        settings: { foreground: v("red") },
      },
      {
        scope: "invalid.deprecated",
        settings: { foreground: v("red"), fontStyle: "italic" },
      },

      // Markdown / markup
      {
        scope: ["markup.heading", "markup.heading entity.name"],
        settings: { foreground: primary, fontStyle: "bold" },
      },
      {
        scope: "markup.italic",
        settings: { foreground, fontStyle: "italic" },
      },
      {
        scope: "markup.bold",
        settings: { foreground, fontStyle: "bold" },
      },
      {
        scope: "markup.quote",
        settings: { foreground: v("interface") },
      },
      {
        scope: "markup.raw",
        settings: { foreground: primary },
      },
      {
        scope: [
          "markup.deleted",
          "meta.diff.header.from-file",
          "punctuation.definition.deleted",
        ],
        settings: { foreground: v("red") },
      },
      {
        scope: [
          "markup.inserted",
          "meta.diff.header.to-file",
          "punctuation.definition.inserted",
        ],
        settings: { foreground: v("green") },
      },
      {
        scope: ["markup.changed", "punctuation.definition.changed"],
        settings: { foreground: v("orange") },
      },
      {
        scope: [
          "markup.underline.link.markdown",
          "markup.underline.link.image.markdown",
        ],
        settings: { foreground: secondaryForeground, fontStyle: "underline" },
      },
    ],
  };
}
