import type { Preview } from "@storybook/react-vite";
import "../src/styles/global.css";
import { lagoon, coral, sunshine } from "../src/tokens";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: { matchers: { color: /(background|color)$/i }, expanded: true },
    backgrounds: {
      options: {
        canvas: { name: "Canvas (Sunshine 50)", value: sunshine[50] },
        white: { name: "White", value: "#FFFFFF" },
        lagoon: { name: "Lagoon 700", value: lagoon[700] },
        ink: { name: "Ink (Lagoon 950)", value: lagoon[950] },
        coral: { name: "Coral 500", value: coral[500] },
        sunshine: { name: "Sunshine 500", value: sunshine[500] },
      },
    },
    options: {
      storySort: {
        order: ["Introduction", "Foundations", ["Colour", "Typography", "Space & layout", "Shape & motion", "Logo", "Icons"], "Components", "Website", ["Pages", "Layout"]],
      },
    },
    docs: { toc: true },
  },
  initialGlobals: { backgrounds: { value: "canvas" } },
};

export default preview;
