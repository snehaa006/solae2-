import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { NewsletterForm, TextField } from "./Form";

const meta = {
  title: "Components/Form",
  component: NewsletterForm,
  tags: ["autodocs"],
  args: { onSubmit: fn(), tone: "default" },
  argTypes: { tone: { control: "inline-radio", options: ["default", "inverse"] } },
  parameters: { docs: { description: { component: "The pill sign-up from Dollop's footer, and a plain labelled text field for checkout-style forms." } } },
} satisfies Meta<typeof NewsletterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Newsletter: Story = {};
export const NewsletterOnLagoon: Story = { args: { tone: "inverse" }, globals: { backgrounds: { value: "lagoon" } } };

export const TextFields: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.25rem", maxWidth: "24rem" }}>
      <TextField label="Full name" placeholder="Ghalia" />
      <TextField label="Email" type="email" hint="We'll send your receipt here." />
      <TextField label="Phone" defaultValue="05" error="Please enter a full Saudi mobile number." />
    </div>
  ),
};
