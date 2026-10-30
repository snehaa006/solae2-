import type { Meta, StoryObj } from "@storybook/react-vite";
import { stickerSrc } from "../storyAssets";
import { Outfit, Sticker } from "./Sticker";

const colours = ["coral", "tropical", "cerulean", "powder", "cherry", "palm", "willow"];

const meta = {
  title: "Components/Sticker & Outfit",
  component: Sticker,
  tags: ["autodocs"],
  args: { src: stickerSrc("suit-flounce-coral"), rotate: -6, outline: true, float: false },
  decorators: [(Story) => <div style={{ width: "14rem" }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          "Real product cut-outs from the previous draft, recoloured into every collection colour. A `Sticker` gets a white die-cut edge; an `Outfit` lays a one-piece and its shorts together as a set.",
      },
    },
  },
} satisfies Meta<typeof Sticker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnePiece: Story = {};
export const Sunglasses: Story = { args: { src: stickerSrc("sunglasses-coral"), rotate: -12, float: true } };

export const SetOutfit: Story = {
  name: "Outfit · set",
  render: () => <Outfit top={stickerSrc("suit-flounce-palm")} bottom={stickerSrc("shorts-palm")} alt="The Flounce Set in palm" />,
};

export const EveryColour: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))", gap: "1rem", width: "min(100%, 70rem)" }}>
      {colours.map((c) => (
        <figure key={c} style={{ margin: 0, padding: "0.5rem", borderRadius: 16, background: "var(--bg-sunken)", textAlign: "center", fontSize: "var(--step--1)" }}>
          <Outfit top={stickerSrc(`suit-flounce-${c}`)} bottom={stickerSrc(`shorts-${c}`)} />
          <figcaption>{c}</figcaption>
        </figure>
      ))}
    </div>
  ),
};
