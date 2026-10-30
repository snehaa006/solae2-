import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: { variant: "primary", tone: "ink", style: { width: "16rem" } },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "horizontal", "sun", "wordmark"] },
    tone: { control: "inline-radio", options: ["ink", "lagoon", "coral", "sunshine", "paper", "current"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Her logo, vectorised from the logo sheet. The colour comes from `tone`, so one component covers every lockup and colour variation. Use `title=\"\"` when the word Solae already sits next to it.",
      },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Horizontal: Story = { args: { variant: "horizontal", style: { width: "18rem" } } };
export const Sun: Story = { args: { variant: "sun", tone: "coral", style: { width: "10rem" } } };
export const Wordmark: Story = { args: { variant: "wordmark", tone: "lagoon" } };
export const Reversed: Story = {
  args: { tone: "paper" },
  globals: { backgrounds: { value: "lagoon" } },
};
