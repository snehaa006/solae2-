import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckList, FeatureRow } from "./Feature";

const meta = {
  title: "Components/FeatureRow & CheckList",
  component: FeatureRow,
  tags: ["autodocs"],
  args: {
    hue: "coral",
    items: [
      { icon: "set", title: "Made to match", text: "A one-piece and shorts in the same fabric." },
      { icon: "layers", title: "Fully lined", text: "Opaque in and out of the water." },
      { icon: "sun", title: "UPF 50+", text: "Sun protection woven into the fabric." },
      { icon: "pin", title: "Designed in Saudi Arabia", text: "By a girl who needed it first." },
    ],
  },
  argTypes: { hue: { control: "inline-radio", options: ["coral", "lagoon", "ink"] } },
  parameters: { docs: { description: { component: "Promises with ringed line icons (Kava), and check-mark benefit lists (Thynk Natural)." } } },
} satisfies Meta<typeof FeatureRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Promises: Story = {};
export const Benefits: Story = {
  render: () => <CheckList items={["Matching one-piece and shorts", "Fully lined, never see-through", "UPF 50+ fabric that dries fast"]} />,
};
