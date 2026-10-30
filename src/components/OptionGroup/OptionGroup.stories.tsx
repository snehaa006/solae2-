import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { OptionGroup, type OptionGroupProps } from "./OptionGroup";

const colours = [
  { value: "coral", label: "Coral", hex: "#F07167" },
  { value: "tropical", label: "Tropical", hex: "#17BEBB" },
  { value: "cerulean", label: "Cerulean", hex: "#0E79B2" },
  { value: "powder", label: "Powder blue", hex: "#6699CC" },
  { value: "cherry", label: "Cherry", hex: "#B40421" },
  { value: "palm", label: "Palm", hex: "#337155" },
  { value: "willow", label: "Willow", hex: "#93C186" },
];
const sizes = ["XS", "S", "M", "L", "XL"].map((s) => ({ value: s, label: s, disabled: s === "XL" }));

function Controlled(props: OptionGroupProps) {
  const [value, setValue] = useState(props.value);
  return <OptionGroup {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/OptionGroup",
  component: OptionGroup,
  tags: ["autodocs"],
  args: { legend: "Colour", variant: "swatch", options: colours, value: "coral", onChange: () => {} },
  argTypes: { variant: { control: "inline-radio", options: ["swatch", "chip", "segmented"] } },
  render: (args) => <Controlled {...args} />,
  parameters: {
    docs: { description: { component: "Pick one from a few: colour swatches, sizes or a segmented toggle. Built on native radio buttons, so arrow keys work." } },
  },
} satisfies Meta<typeof OptionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colours: Story = {};
export const Sizes: Story = {
  args: { legend: "Size", variant: "chip", options: sizes, value: "M", aside: <a href="#">Size guide</a> },
};
export const Segmented: Story = {
  args: {
    legend: "Buy as",
    variant: "segmented",
    value: "set",
    options: [
      { value: "set", label: "Full set" },
      { value: "suit", label: "One-piece" },
      { value: "shorts", label: "Shorts" },
    ],
  },
};
