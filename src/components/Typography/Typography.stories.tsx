import type { Meta, StoryObj } from "@storybook/react-vite";
import { Eyebrow, Hand, Heading, Text } from "./Typography";

const meta = {
  title: "Components/Typography",
  component: Heading,
  tags: ["autodocs"],
  args: { size: "6", children: "Made for the sun" },
  argTypes: {
    size: { control: "select", options: ["-2", "-1", "0", "1", "2", "3", "4", "5", "6", "7"] },
    font: { control: "inline-radio", options: ["display", "sans"] },
    tone: { control: "inline-radio", options: ["strong", "inverse", "accent", "sun", "inherit"] },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
  },
  parameters: {
    docs: {
      description: {
        component: "Heading, Text, Eyebrow and Hand. Sizes are steps on the fluid scale, so every heading grows smoothly with the screen.",
      },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeadingStory: Story = { name: "Heading" };

export const WithItalicAccent: Story = {
  render: (args) => (
    <Heading {...args}>
      how we're <em>different</em>
    </Heading>
  ),
};

export const SectionOpener: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "40rem" }}>
      <Eyebrow rule>Hello, we're Solae</Eyebrow>
      <Heading size="5">
        Coverage, comfort and confidence, <em>without</em> giving up on style.
      </Heading>
      <Hand rotate={-3} style={{ fontSize: "var(--step-2)", color: "var(--color-coral-700)" }}>
        made for girls like me. G.
      </Hand>
      <Text tone="muted" measure>
        Solae makes matching swim sets: a one-piece paired with shorts, cut from the same fabric.
      </Text>
    </div>
  ),
};

export const HandOnTape: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", fontSize: "var(--step-2)" }}>
      <Hand tape="lagoon" rotate={-2}>
        Thank you for swimming with us
      </Hand>
      <Hand tape="coral" rotate={2}>
        new!
      </Hand>
      <Hand tape="sunshine">summer '26</Hand>
    </div>
  ),
};
