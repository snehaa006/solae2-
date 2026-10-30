import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checker, Edge, Stripes } from "./Band";

const meta = {
  title: "Components/Stripes, checks & edges",
  component: Stripes,
  tags: ["autodocs"],
  args: { hue: "lagoon", height: "auto", labels: ["Modest", "Matching", "Made for summer"] },
  argTypes: { hue: { control: "inline-radio", options: ["lagoon", "coral", "sunshine"] } },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Cabana stripes after the Seaborn Co. card, the check strip from Helm House and Dollop, and shaped edges for where two section colours meet.",
      },
    },
  },
} satisfies Meta<typeof Stripes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CabanaStripes: Story = {};
export const CoralStripes: Story = { args: { hue: "coral", labels: undefined, height: "10rem" } };

export const Checks: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2rem", padding: "2rem 0" }}>
      <Checker hue="coral" />
      <Checker hue="lagoon" rows={1} cell="1.1rem" />
      <Checker hue="sunshine" cell="0.5rem" />
    </div>
  ),
};

export const Edges: Story = {
  render: () => (
    <div>
      <div style={{ height: "6rem", background: "var(--color-lagoon-700)" }} />
      <div style={{ position: "relative", height: "6rem", background: "var(--bg-canvas)" }}>
        <Edge shape="wave" color="var(--bg-canvas)" />
      </div>
      <div style={{ position: "relative", height: "6rem", background: "var(--color-coral-500)" }}>
        <Edge shape="scallop" color="var(--color-coral-500)" />
      </div>
    </div>
  ),
};
