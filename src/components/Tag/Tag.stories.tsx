import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: { children: "Natural", variant: "outline", hue: "ink" },
  argTypes: {
    variant: { control: "inline-radio", options: ["outline", "soft", "solid"] },
    hue: { control: "inline-radio", options: ["ink", "lagoon", "coral", "sunshine"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
  parameters: { docs: { description: { component: "Pills for facts, badges and filters (the Thynk Natural \"NATURAL\" pill). Give it `onClick` and it becomes a toggle button." } } },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};
export const Badge: Story = { args: { variant: "solid", hue: "sunshine", size: "sm", children: "New" } };

export const Palette: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      {(["outline", "soft", "solid"] as const).map((v) => (
        <div key={v} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {(["ink", "lagoon", "coral", "sunshine"] as const).map((h) => (
            <Tag key={h} variant={v} hue={h}>
              {v} {h}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Filters: Story = {
  render: function Render() {
    const [on, setOn] = useState("All");
    return (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["All", "Sets", "One-pieces", "Shorts", "Extras"].map((f) => (
          <Tag key={f} onClick={() => setOn(f)} pressed={on === f}>
            {f}
          </Tag>
        ))}
      </div>
    );
  },
};
