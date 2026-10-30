import type { Meta, StoryObj } from "@storybook/react-vite";
import { WaveRibbon } from "./WaveRibbon";

const meta = {
  title: "Components/WaveRibbon",
  component: WaveRibbon,
  tags: ["autodocs"],
  args: { text: "Made for the sun · true to who you are", tone: "sunshine", speed: 40, swell: 0.6 },
  argTypes: {
    tone: { control: "inline-radio", options: ["coral", "lagoon", "sunshine"] },
    swell: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    speed: { control: { type: "range", min: 0, max: 120, step: 5 } },
  },
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "A ribbon of words drifting along a wave. Place it across the edge between two sections (Kava, Dollop, the gastrobox site)." } },
  },
  render: (args) => (
    <div style={{ background: "linear-gradient(var(--color-lagoon-700) 50%, var(--bg-canvas) 50%)" }}>
      <WaveRibbon {...args} />
    </div>
  ),
} satisfies Meta<typeof WaveRibbon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AcrossTwoSections: Story = {};
export const Coral: Story = { args: { tone: "coral", text: "Newness that will brighten your day", flip: true } };
export const Still: Story = { args: { speed: 0, tone: "lagoon", swell: 0.3 } };
