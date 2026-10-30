import type { Meta, StoryObj } from "@storybook/react-vite";
import { Outfit } from "../Sticker/Sticker";
import { photoSrc, stickerSrc } from "../storyAssets";
import { Frame, type FrameShape } from "./Frame";

const meta = {
  title: "Components/Frame",
  component: Frame,
  tags: ["autodocs"],
  args: { shape: "arch", ratio: "3 / 4", src: photoSrc("36188914"), alt: "Striped towels by a pool", ring: false, tone: "none" },
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "arch", "oval", "ticket", "stamp", "square"] },
    tone: { control: "inline-radio", options: ["none", "lagoon", "coral", "sunshine", "paper"] },
  },
  decorators: [(Story) => <div style={{ width: "min(100%, 18rem)" }}><Story /></div>],
  parameters: {
    docs: { description: { component: "Shapes the edge of a photo or product shot. Each shape comes from a board; use one or two per section." } },
  },
} satisfies Meta<typeof Frame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Arch: Story = {};
export const OvalWithRing: Story = { args: { shape: "oval", ring: true }, decorators: [(Story) => <div style={{ color: "var(--color-coral-500)", padding: 12 }}><Story /></div>] };
export const Stamp: Story = { args: { shape: "stamp", src: photoSrc("27330805") } };

export const WithProduct: Story = {
  args: { shape: "ticket", ratio: "5 / 4", tone: "coral", src: undefined },
  render: (args) => (
    <Frame {...args}>
      <Outfit top={stickerSrc("suit-flounce-coral")} bottom={stickerSrc("shorts-coral")} style={{ position: "absolute", inset: "6% 18%", width: "auto" }} />
    </Frame>
  ),
};

const shapes: FrameShape[] = ["rounded", "arch", "oval", "ticket", "stamp", "square"];
export const AllShapes: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))", gap: "2rem", width: "min(100%, 60rem)" }}>
      {shapes.map((s) => (
        <figure key={s} style={{ margin: 0, display: "grid", gap: "0.5rem", fontSize: "var(--step--1)" }}>
          <Frame shape={s} src={photoSrc("9872701", 500)} />
          <figcaption>{s}</figcaption>
        </figure>
      ))}
    </div>
  ),
};
