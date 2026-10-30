import type { Meta, StoryObj } from "@storybook/react-vite";
import { Marquee } from "./Marquee";

const meta = {
  title: "Components/Marquee",
  component: Marquee,
  tags: ["autodocs"],
  args: { items: ["Free shipping over SAR 300", "Drop 01 is here", "Modest · matching · made for summer", "Designed in Saudi Arabia"], tone: "lagoon", speed: 40, size: "sm" },
  argTypes: {
    tone: { control: "inline-radio", options: ["lagoon", "coral", "sunshine", "plain"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: { layout: "fullscreen", docs: { description: { component: "A running line of words with little suns between them (Kava's ticker). Pauses on hover; still for reduced motion." } } },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Announcement: Story = {};
export const Coral: Story = { args: { tone: "coral", size: "md" } };
export const LargeItalic: Story = { args: { tone: "plain", size: "lg", items: ["made for the sun", "true to who you are", "made to match"], speed: 60 } };
