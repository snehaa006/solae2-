import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Text } from "../Typography/Typography";
import { Drawer } from "./Drawer";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: { open: false, title: "Your bag", side: "right", onClose: () => {}, children: null },
  argTypes: { side: { control: "inline-radio", options: ["right", "left"] } },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)} footer={<Button fullWidth>Checkout</Button>}>
          <Text tone="muted">A native dialog: focus stays inside, Escape and the backdrop close it.</Text>
        </Drawer>
      </>
    );
  },
  parameters: { docs: { description: { component: "Side panel for the bag and the mobile menu." } } },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bag: Story = {};
export const Menu: Story = { args: { side: "left", title: "Menu" } };
