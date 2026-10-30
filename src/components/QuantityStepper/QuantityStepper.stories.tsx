import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { QuantityStepper } from "./QuantityStepper";

const meta = {
  title: "Components/QuantityStepper",
  component: QuantityStepper,
  tags: ["autodocs"],
  args: { value: 1, min: 1, max: 10, size: "md", onChange: () => {} },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
  render: function Render(args) {
    const [v, setV] = useState(args.value);
    return <QuantityStepper {...args} value={v} onChange={setV} />;
  },
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm", value: 2 } };
