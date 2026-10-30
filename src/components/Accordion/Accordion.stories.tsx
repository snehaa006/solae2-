import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    defaultOpen: 0,
    exclusive: true,
    items: [
      { title: "Details", content: <ul><li>Scoop neck and back</li><li>Soft flower straps</li><li>Shorts with an elastic waist and drawcord</li></ul> },
      { title: "Fabric & care", content: <p>Recycled nylon and elastane, with a soft opaque lining. Rinse in cool water and dry in the shade.</p> },
      { title: "Shipping & returns", content: <p>Free shipping over SAR 300. Unworn pieces can be returned within 14 days.</p> },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: "34rem" }}><Story /></div>],
  parameters: { docs: { description: { component: "Built on `<details>`: works without JavaScript, and find-in-page opens the right item." } } },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductDetails: Story = {};
export const AllowManyOpen: Story = { args: { exclusive: false, defaultOpen: undefined } };
