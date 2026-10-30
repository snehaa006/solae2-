import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkle, Divider } from "../Sparkle/Sparkle";
import { Starburst } from "./Starburst";

const meta = {
  title: "Components/Starburst & Sparkle",
  component: Starburst,
  tags: ["autodocs"],
  args: { children: "New!", hue: "sunshine", size: "8rem", points: 28, rotate: -8 },
  argTypes: { hue: { control: "inline-radio", options: ["sunshine", "coral", "lagoon"] } },
  parameters: {
    docs: {
      description: {
        component: "The zig-zag seal and the long four-point sparkle from the Thynk Natural pins. Use a seal for prices or \"New!\", one per card at most.",
      },
    },
  },
} satisfies Meta<typeof Starburst>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {};
export const Price: Story = {
  args: { hue: "coral", rotate: 8 },
  render: (args) => (
    <Starburst {...args}>
      <small>SAR</small>319
    </Starburst>
  ),
};
export const Spinning: Story = { args: { spin: true, hue: "lagoon", children: "Drop 01" } };

export const Sparkles: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "3rem" }}>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center", color: "var(--text-strong)" }}>
        <Sparkle size="1.5rem" />
        <Sparkle size="3rem" />
        <Sparkle size="5rem" style={{ color: "var(--color-coral-500)" }} />
      </div>
      <Divider sparkle="end" />
      <Divider sparkle="start" />
      <Divider />
    </div>
  ),
};
