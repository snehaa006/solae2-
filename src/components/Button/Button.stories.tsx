import type { Meta, StoryObj } from "@storybook/react-vite";
import { iconNames } from "../Icon/Icon";
import { Button, IconButton } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Shop the sets", variant: "primary", size: "md" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "accent", "sun", "inverse", "link"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    iconStart: { control: "select", options: [undefined, ...iconNames] },
    iconEnd: { control: "select", options: [undefined, ...iconNames] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Pill buttons in spaced capitals. One `primary` per view; `secondary` is the outline pill from the Thynk Natural pins. Pass `as` to render a link or a router `Link`.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { iconEnd: "arrowRight" } };
export const Secondary: Story = { args: { variant: "secondary", children: "More about Solae" } };
export const Accent: Story = { args: { variant: "accent", iconStart: "bag", children: "Add to bag" } };
export const Sun: Story = { args: { variant: "sun", iconEnd: "arrowRight" }, globals: { backgrounds: { value: "lagoon" } } };
export const Inverse: Story = { args: { variant: "inverse", children: "Our story" }, globals: { backgrounds: { value: "lagoon" } } };
export const Link: Story = { args: { variant: "link", children: "View everything", iconEnd: "arrowRight" } };
export const AsAnchor: Story = { args: { as: "a", href: "#", children: "I am a link" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <Button size={size}>Primary</Button>
          <Button size={size} variant="secondary">
            Secondary
          </Button>
          <Button size={size} variant="accent">
            Accent
          </Button>
          <Button size={size} variant="sun">
            Sun
          </Button>
          <Button size={size} variant="link" iconEnd="arrowRight">
            Link
          </Button>
          <Button size={size} disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <IconButton icon="bag" label="Bag" badge={2} />
      <IconButton icon="heart" label="Save" variant="outline" />
      <IconButton icon="plus" label="Add" variant="solid" />
      <IconButton icon="close" label="Close" size="sm" />
      <IconButton icon="arrowRight" label="Next" variant="outline" size="lg" />
    </div>
  ),
};
