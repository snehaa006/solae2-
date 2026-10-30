import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Outfit } from "../Sticker/Sticker";
import { stickerSrc } from "../storyAssets";
import { ProductCard } from "./ProductCard";

const swatches = [
  { name: "Coral", hex: "#F07167" },
  { name: "Tropical", hex: "#17BEBB" },
  { name: "Cerulean", hex: "#0E79B2" },
  { name: "Powder blue", hex: "#6699CC" },
  { name: "Cherry", hex: "#B40421" },
  { name: "Palm", hex: "#337155" },
  { name: "Willow", hex: "#93C186" },
];

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  args: {
    name: "The Flounce Set",
    kind: "Coral · One-piece + matching shorts",
    price: "SAR 319",
    tone: "sunshine",
    swatches,
    badge: "New",
    href: "#",
    media: <Outfit top={stickerSrc("suit-flounce-coral")} bottom={stickerSrc("shorts-coral")} />,
    onQuickAdd: fn(),
  },
  argTypes: { tone: { control: "inline-radio", options: ["lagoon", "coral", "sunshine"] }, media: { control: false } },
  decorators: [(Story) => <div style={{ width: "min(100%, 20rem)" }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component: "A product in the grid. The whole card is the link; the quick-add button sits above it. Pass `linkAs` to use client-side routing.",
      },
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Set: Story = {};
export const OnSale: Story = { args: { badge: "Sale", compareAt: "SAR 319", price: "SAR 259", tone: "coral", media: <Outfit top={stickerSrc("suit-flounce-cherry")} bottom={stickerSrc("shorts-cherry")} /> } };
export const Shorts: Story = {
  args: { name: "The Boardwalk Short", kind: "Swim shorts", price: "SAR 99", badge: undefined, tone: "lagoon", media: <Outfit bottom={stickerSrc("shorts-cerulean")} /> },
};

export const Grid: Story = {
  decorators: [(Story) => <Story />],
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))", gap: "2rem 1rem", width: "min(100%, 64rem)" }}>
      {(["coral", "tropical", "palm"] as const).map((c, i) => (
        <ProductCard
          key={c}
          {...args}
          badge={i === 0 ? "New" : undefined}
          tone={(["sunshine", "coral", "lagoon"] as const)[i]}
          kind={`${c} · One-piece + matching shorts`}
          media={<Outfit top={stickerSrc(`suit-flounce-${c}`)} bottom={stickerSrc(`shorts-${c}`)} />}
        />
      ))}
    </div>
  ),
};
