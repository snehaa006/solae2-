import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Solae design system",
    brandImage: "./storybook-brand.svg",
    brandTarget: "_self",
    colorPrimary: "#F07167",
    colorSecondary: "#0B6A6F",
    appBg: "#FFFCF0",
    appContentBg: "#FFFFFF",
    appPreviewBg: "#FFFCF0",
    appBorderColor: "rgba(4, 41, 43, 0.12)",
    appBorderRadius: 12,
    textColor: "#04292B",
    textMutedColor: "#0B6A6F",
    barBg: "#FFFCF0",
    barSelectedColor: "#0B6A6F",
    fontBase: '"Jost Variable", "Jost", system-ui, sans-serif',
  }),
});
